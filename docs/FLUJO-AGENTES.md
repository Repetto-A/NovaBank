# Flujo de agentes de NovaBank

Del ticket en Linear al PR revisado, con una persona aprobando en cada compuerta.

```
Linear (Todo, label Agente)
   │  /agentes spec
   ▼
spec-writer ──► spec.md (+ design.md) ──► Linear: Spec en revisión (asignado a vos)
                                              │  VOS: aprobás → Spec aprobada
                                              ▼  /agentes dev
developer (worktree propio) ──► rama + commits + tests ──► PR ──► Linear: In Review
                                              │  automático
                                              ▼
code-reviewer (solo lectura) ──► review en el PR + resumen en Linear
                                              │  VOS: revisás y mergeás
                                              ▼
                                            Done
```

## Por qué SDD

Con agentes escribimos más código del que podemos revisar. El cuello de botella ya no es escribir: es revisar. SDD mueve la revisión **antes** del código: una persona revisa una página de spec, no 400 líneas de diff.

- **Pensar antes de hacer.** La spec obliga a decidir qué queremos, qué queda afuera y cómo sabemos que está bien, antes de que exista una línea.
- **Trazabilidad.** Cada línea de código se puede seguir hacia atrás: PR → tareas → diseño → spec → ticket → milestone → PRD. Si alguien pregunta "¿por qué esto hace así?", la respuesta está escrita.
- **Re-trabajo barato.** Si algo salió mal, se corrige la spec y se vuelve a generar, en vez de parchear el código. El error queda documentado donde nació.

## De la idea al PR: la cadena

```
PRD ──► Milestones ──► Tickets ──► Spec ──► Diseño ──► Tareas ──► PR ──► Review
negocio  planificación  unidad     qué      cómo       pasos      código
```

| Capa | Dónde vive en NovaBank | Responde | ¿Técnico? | La escribe | La aprueba |
|---|---|---|---|---|---|
| PRD | Linear, documento "PRD · NovaBank multi-cuenta" del proyecto | Para quién, qué problema, qué métricas | No | Producto (vos) | Producto |
| Milestones | Linear, M1 · Multi-cuenta base, M2 · La plata se mueve, M3 · Extras | En qué orden se entrega valor | No | Producto (vos) | Producto |
| Ticket | Linear, REP-XX | Una unidad de trabajo que se puede revisar sola | Puede citar código | Vos | Vos |
| Spec | `specs/REP-XX/spec.md` | **Qué** tiene que pasar y cómo sabemos que está bien | **No** | spec-writer | Vos (*Spec aprobada*) |
| Diseño | `specs/REP-XX/design.md` (o al final de la spec si el ticket es chico) | **Cómo**: archivos, tablas, riesgos | Sí | spec-writer | Vos, junto con la spec |
| Tareas | Dentro del diseño | Pasos en orden, cada uno cubre criterios | Sí | spec-writer | Implícito |
| PR | GitHub | El código y la tabla de criterios cumplidos | Sí | developer | code-reviewer y vos |

### ¿La spec es técnica?

No. La spec describe comportamiento observable: "Dado que tengo saldo, cuando transfiero a un alias válido, entonces veo el comprobante y el saldo baja". No nombra archivos, tablas ni funciones. **Prueba rápida:** si cambiás de stack (de JS a React, de Supabase a Postgres propio) y la spec sigue valiendo, está bien escrita. Lo técnico va en el diseño.

Por eso conviene separarlos: la spec la puede revisar alguien de producto, el diseño lo revisa alguien técnico, y cada uno cambia por motivos distintos.

### ¿Y los milestones?

Son planificación, no especificación. Un milestone agrupa tickets que juntos entregan algo que se puede mostrar (M2: "la plata se mueve" = REP-38 + REP-40). La spec no habla del milestone: el milestone ordena **cuándo**, la spec dice **qué**.

### Tamaño proporcional al riesgo

SDD no es waterfall: no se escribe todo antes de empezar, se escribe una spec por ticket, justo antes de hacerlo, y se actualiza si cambia.

- Ticket grande o riesgoso (plata, base de datos, feature nueva): `spec.md` + `design.md`.
- Ticket chico (un bug, un texto, un estilo): un solo `spec.md` con el diseño al final.

### Lo mismo en otros frameworks

| | PRD | Spec (qué) | Diseño (cómo) | Tareas |
|---|---|---|---|---|
| NovaBank | Documento en Linear | `spec.md` | `design.md` | Dentro de `design.md` |
| Spec Kit | Afuera (`constitution.md` fija principios, no negocio) | `spec.md` | `plan.md` | `tasks.md` |
| OpenSpec | Afuera (contexto del proyecto) | `proposal.md` + deltas en `specs/` | `design.md` | `tasks.md` |
| gentle-ai | Afuera | fase *spec* | fase *design* | fase *tasks* (artefactos en engram, en OpenSpec o en ambos) |

Cambian los nombres, la separación es la misma: qué, cómo, pasos. Ninguno trae el PRD: el negocio vive en tu herramienta de producto (acá, Linear) y el framework arranca desde el ticket.

## Quién hace qué

| Pieza | Archivo | Puede | No puede |
|---|---|---|---|
| Orquestador | `.claude/skills/agentes/SKILL.md` | Leer y mover tickets en Linear, lanzar subagentes, publicar reviews | Aprobar specs, mergear, cerrar tickets |
| spec-writer | `.claude/agents/spec-writer.md` | Leer el código, escribir `specs/` | Tocar código de la app, tocar Linear |
| developer | `.claude/agents/developer.md` | Editar código en su worktree, commitear, abrir PR | Pushear a `main`, mergear, tocar Linear |
| code-reviewer | `.claude/agents/code-reviewer.md` | Leer el PR y la spec, correr tests | Editar archivos, aprobar, tocar Linear |
| Hook de compuertas | `.claude/hooks/compuertas.mjs` | Frenar push a `main`, `--force`, merge, aprobación de PRs y tickets movidos a *Spec aprobada* o *Done* | Ser salteado por un prompt |
| Vos | | Aprobar specs, revisar y mergear PRs, decidir reglas de negocio | |

El método de cada fase está en una skill (`sdd-spec`, `sdd-apply`, `sdd-review`) que el subagente carga al arrancar. Las skills son el **proceso de IT Patagonia** y sirven para cualquier repo; lo propio de NovaBank (convenciones, checklist de review, reglas de la plata) está en `CLAUDE.md`. Cada subagente carga el `CLAUDE.md` al arrancar, pero no la conversación del orquestador: todo lo demás viaja por archivos.

### Skill, hook o integración

**Si tiene que pasar siempre, hook o integración. Si requiere criterio, skill.**

| Qué | Quién lo hace | Por qué ahí |
|---|---|---|
| Mover el ticket a *In Review* al abrir el PR y a *Done* al mergear | Integración Linear ↔ GitHub | Es mecánico: no gasta tokens ni depende del modelo |
| Escribir el comentario con la tabla de criterios | Orquestador (`/agentes`) | Requiere leer y resumir |
| Que ningún agente mergee, apruebe ni pushee a `main` | Hook de compuertas + `main` protegida en GitHub | Un prompt se puede ignorar; un hook no |

## Preparación (una vez)

1. **REP-26:** NovaBank en GitHub, `main` protegida, `gh auth status` OK, integración Linear ↔ GitHub.
2. **REP-27:** los cuatro estados nuevos en Linear, con los nombres exactos.
3. Linear MCP en Claude Code, con este nombre (las restricciones de los subagentes lo usan):
   ```
   claude mcp add --transport http linear-server https://mcp.linear.app/mcp
   ```
   Después `/mcp` dentro de Claude Code para autorizar.
4. Supabase MCP en Claude Code, apuntado solo al proyecto de la demo (los agentes crean migraciones con él):
   ```
   claude mcp add --transport http supabase "https://mcp.supabase.com/mcp?project_ref=vgginqpbmpqqsbxhdeub"
   ```
   La base, las cuentas de ejemplo y `transferir()` ya están creadas: ver `docs/SUPABASE.md`.
5. Opcional: engram conectado. Las skills lo usan si está (`mem_search` antes de escribir la spec, `mem_save` al terminar).
6. El hook de compuertas ya está en `.claude/settings.json`; necesita `node`. Al abrir Claude Code en NovaBank, `/hooks` lo muestra. Ojo: también te frena a vos si le pedís al agente que mergee; las compuertas se abren en GitHub y en Linear, a mano.
7. Para la slide 15: codebase-memory-mcp con la variante de UI, indexado **de antemano** sobre un repo grande (por ejemplo harness-loop-academy, no NovaBank). El visor queda en `localhost:9749`.

## Comandos

Desde la carpeta de NovaBank, en Claude Code:

| Comando | Qué hace |
|---|---|
| `/agentes` | Muestra el tablero: qué espera a una persona y qué pueden tomar los agentes |
| `/agentes spec` | Toma el ticket más prioritario de Todo y escribe su spec |
| `/agentes spec REP-30` | Lo mismo, con un ticket puntual |
| `/agentes dev` | Toma el próximo ticket con spec aprobada, lo implementa, abre el PR y encadena el review |
| `/agentes review 12` | Code review agéntico del PR #12 |
| `/agentes ciclo` | Una pasada completa: reviews, desarrollos y specs pendientes |

## Guion para la demo en vivo (intercalada con la charla)

**Antes de la clase:**
- REP-26 (GitHub), REP-27 (estados) y REP-45 (Vercel) hechos.
- La base ya está en Supabase. El repo, limpio: la app original, `.claude/`, `CLAUDE.md` y `docs/`.
- **Ensayo completo el día anterior.** Corré la hora entera una vez y guardá el resultado en una rama `demo-final` desplegada en Vercel. Si en vivo algo se demora, pasás a esa rama y seguís: los agentes no son deterministas y la clase no puede depender de eso.

**En vivo: los agentes trabajan mientras das la charla.** No hay una hora muerta mirando la terminal: lanzás un ciclo, das teoría, y en cada checkpoint volvés a Linear a abrir compuertas. Los números de slide son del deck `ITPatagonia_SDD_Memoria_Grafos`.

| Cuándo | Qué hacés vos | Qué hacen los agentes |
|---|---|---|
| Slide 3 · agenda (min 3) | Mostrás el repo limpio y el tablero, y lanzás `/agentes ciclo` | Specs de REP-39 (conectar), REP-41 (auditoría) y REP-38 (transferir). **REP-38 frena**: le falta REP-28 |
| Slides 4 a 15 · bloques 1 y 2 | Contexto, memoria y grafos | Siguen escribiendo specs |
| **Checkpoint 1** · después de la 15 (min ~30) | Leés y aprobás las specs de REP-39 y REP-41. En REP-39 mostrás los dos archivos: `spec.md` (qué, se entiende sin saber código) y `design.md` (cómo). Resolvés REP-28 comentando las reglas. `/agentes ciclo` | REP-39 y REP-41 se desarrollan en paralelo, cada uno en su worktree. Salen las specs de REP-38 y REP-40 |
| Slides 16 a 26 · bloque 3 | SDD, las piezas, permisos, el tablero. En la 17 abrís el PRD y los milestones del proyecto en Linear: la cadena entera, de punta a punta | Desarrollo, PRs y review encadenado |
| **Checkpoint 2** · slide 27, Demo (min ~60) | Revisás los PRs, mergeás REP-39 y abrís el panel de auditoría. Aprobás REP-38 y REP-40. `/agentes ciclo` | REP-38 (transferir) y REP-40 (tiempo real) en paralelo |
| Slides 28 y 29 · checklist y actividad (15 min) | La clase escribe su skill de spec | Siguen REP-38 y REP-40 |
| Slide 31 · Review agéntico (min ~80) | Mostrás el review real del PR de REP-38: **marca REP-46**, cualquiera puede transferir desde cualquier cuenta. Mergeás | |
| Cierre (min ~85) | Tres ventanas: Diego, Ana y el panel. Diego transfiere y Ana ve entrar la plata. QR: la clase entra desde el celular y transfiere | |

REP-42 (pedir plata), REP-43 (gráfico) y REP-44 (comprobante) quedan de reserva: si sobra tiempo, o para la rama `demo-final`.

## Cómo mostrar todo

Un escritorio con cuatro cosas abiertas antes de empezar, y nada más:

| Ventana | Qué tiene | Cuándo la mostrás |
|---|---|---|
| Diapositivas | El deck en modo presentador | Siempre de fondo |
| Terminal | Claude Code en la carpeta de NovaBank, con letra grande (al menos 18 pt) | Al lanzar `/agentes` y en cada checkpoint |
| Navegador, pestaña 1 | Linear: vista del proyecto agrupada por estado, filtrada por label Agente | Checkpoints: es la vista que "se mueve sola" |
| Navegador, pestaña 2 | GitHub: lista de PRs de NovaBank | Checkpoint 2 y slide 31 |
| Navegador, pestaña 3 | La app: el preview de Vercel y, al lado, `admin.html` | Cuando se mergea una feature: el momento wow |
| Navegador, pestaña 4 | El PRD y los milestones en Linear | Slide 17 |
| Navegador, pestaña 5 | codebase-memory-mcp en `localhost:9749` | Slide 15 |
| Editor | `specs/` y `.claude/` abiertos | Slides 21 y 22, y para leer specs en el checkpoint 1 |

Reglas para que se vea bien:
- **Lo que se mueve se muestra en Linear, no en la terminal.** La terminal es ruido para la clase; el tablero cambiando de columna es la historia.
- **Transferencias con dos cuentas a la vista.** Abrí la app dos veces (diego.nova y ana.nova, una al lado de la otra): transferís en una y el saldo cambia en la otra en tiempo real.
- **Una sola cosa por vez.** Cambiás de ventana, decís qué mirar, esperás dos segundos.
- **La rama `demo-final` desplegada en otra URL**, en una pestaña escondida. Si algo se demora, pasás a esa y seguís.

## Si sobra tiempo

En este orden:

1. **Cerrar REP-46 en vivo (10 a 15 min).** El review marcó que cualquiera puede transferir desde cualquier cuenta. Movés REP-46 a Todo con label Agente y corrés `/agentes spec REP-46`: la clase ve el ciclo entero sobre un problema que encontró el propio sistema.
2. **HumanLayer (5 min, sin instalar nada).** Abrís su repo en GitHub, `.claude/commands/create_plan.md` e `implement_plan.md`: su flujo research → plan → implement también es Markdown versionado. Cierra la idea de las slides 21 y 22: un framework es una carpeta. Dejá los links abiertos de antemano.

## Si algo falla
- *"No existe el estado Spec en curso"*: falta REP-27.
- *El developer no puede pushear*: falta REP-26 o `gh auth login`.
- *El subagente igual usa Linear*: el MCP no se llama `linear-server`; renombralo o ajustá `disallowedTools` en `.claude/agents/`.
- *El worktree molesta en la demo*: sacá `isolation: worktree` de `developer.md` y trabaja en la carpeta principal.
- *"Compuerta humana: ..."*: es el hook haciendo su trabajo. Si lo dispara algo legítimo, la acción la hacés vos a mano.
