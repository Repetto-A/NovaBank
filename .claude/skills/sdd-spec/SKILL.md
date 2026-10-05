---
name: sdd-spec
description: Proceso de IT Patagonia para convertir un ticket en spec (qué) y, si es grande, en diseño (cómo), a partir del ticket y del PRD del proyecto. Usala antes de tocar código, cuando haya que convertir un ticket en criterios de aceptación verificables.
user-invocable: false
---

# De ticket a spec: el proceso de IT Patagonia

Esta skill es el método de la empresa y sirve para cualquier repo. Lo propio de cada proyecto (stack, convenciones, reglas que no se negocian) está en su `CLAUDE.md`: no lo repetimos acá.

## De dónde viene el trabajo

```
PRD  ->  milestones  ->  ticket  ->  spec.md  ->  design.md  ->  tareas  ->  PR
```

| Capa | La escribe | Dónde vive | Dice |
|---|---|---|---|
| PRD | Producto | Documento del proyecto en Linear | Para quién, qué problema, qué métricas |
| Milestones | Producto con el Tech Lead | Linear | En qué orden se entrega valor |
| Ticket | Tech Lead | Linear | Una unidad de trabajo que se revisa sola |
| **Spec** | **Vos** | `specs/<TICKET>/spec.md` | **Qué** tiene que pasar. No es técnica |
| **Diseño** | **Vos** | `specs/<TICKET>/design.md` | **Cómo**: archivos, datos, riesgos, tareas |

El orquestador te pasa el ticket (con comentarios, bloqueos y milestone) y el texto del PRD. No tenés acceso a Linear.

- **La spec dice qué y para qué**, en el idioma del usuario. Prueba: si cambiás de stack y la spec sigue valiendo, está bien escrita. Nada de nombres de archivos, tablas ni funciones.
- **El diseño dice cómo.** Ahí van los archivos, los datos, los riesgos técnicos y las tareas en orden.
- **El milestone no va en la spec.** Es planificación: dice cuándo, no qué.

## Tamaño: proporcional al riesgo

| El ticket... | Salida |
|---|---|
| Mueve plata o datos sensibles, cambia el esquema de la base, toca permisos o es una feature nueva | **Dos archivos:** `spec.md` y `design.md` |
| Es chico: un bug acotado, un texto, un estilo, accesibilidad | **Un archivo:** `spec.md` con el diseño al final, bajo `## Diseño (técnico)` |

Si dudás, dos archivos.

## Pasos

1. **Leer el PRD.** Ubicá qué objetivo o métrica sirve el ticket y citálo en "Para qué". Si no sirve a ninguno, decilo en "Preguntas abiertas".
2. **Leer el ticket entero**, incluidos los comentarios: si es una segunda vuelta, ahí está lo que la persona pidió cambiar.
3. **Buscar contexto previo.** Si hay memoria conectada (engram), `mem_search` con el tema del ticket. Usá lo que encuentres y citálo.
4. **Leer el `CLAUDE.md` del repo y mirar el código** que cita el ticket. Anotá qué más toca el cambio. Esto va al diseño, no a la spec.
5. **Chequear bloqueos.** Si falta una decisión de producto o un ticket del que depende, **no la inventes**: va a "Preguntas abiertas" y la spec queda `bloqueada`.
6. **Escribir la spec** y, según el tamaño, el diseño.

## Plantilla: `spec.md` (qué, no técnica)

```markdown
# <TICKET> · <título>

Estado: lista para revisar | bloqueada
PRD: <objetivo o métrica que sirve>

## Problema
Una o dos oraciones, en términos del usuario.

## Para qué
Qué cambia para el usuario o el negocio cuando esto existe.

## Alcance
- Qué entra.

## Fuera de alcance
- Qué NO entra, aunque esté cerca. Evita que el desarrollo se extienda.

## Criterios de aceptación
- [ ] CA1: Dado <contexto>, cuando <acción>, entonces <resultado observable>.
- [ ] CA2: ...

## Preguntas abiertas
Lo que necesita una decisión humana. Vacío si no hay.
```

## Plantilla: `design.md` (cómo, técnico)

```markdown
# <TICKET> · Diseño

Spec: `specs/<TICKET>/spec.md`

## Enfoque
En tres a cinco líneas: cómo se resuelve y por qué así.

## Impacto
Archivos, funciones y datos que cambian, y qué otras partes dependen de ellos.

## Datos
Migraciones, tablas nuevas con sus permisos, cambios en funciones de la base. "Sin cambios" si no hay.

## Riesgos
Lo que podría salir mal, y cómo se nota.

## Tareas
1. Pasos chicos y en orden. Cada uno se revisa solo y cubre uno o más CA (indicá cuáles).
```

## No hacer
- No escribir ni modificar código de la app.
- No inventar reglas de negocio, límites ni montos: salen del PRD, del ticket o de la base.
- No meter detalles técnicos en la spec: si un criterio nombra un archivo o una tabla, va al diseño.
- No pasar de una página por archivo: si no entra, el ticket es grande y conviene partirlo.
