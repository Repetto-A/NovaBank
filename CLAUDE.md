# NovaBank

App de banca digital de demo ("NovaBanco"). Vanilla JS sin build: `index.html`, `js/app.js`, `css/styles.css`. Se abre con doble clic en `index.html`.

## Arquitectura
- `js/app.js` está organizado en módulos IIFE: `I18n`, `Router`, `Theme`, `Dashboard`, `Movements`, `Beneficios`, `Modal`. Cada uno expone lo mínimo.
- Hoy los datos viven en el objeto `DATA` (simula una API). La base real ya existe en Supabase (proyecto `novabank-demo`): esquema, cuentas de ejemplo, `transferir()` y tiempo real están en `docs/SUPABASE.md`.
- Los textos visibles van en `LOCALES`, siempre en `es` **y** en `en`. En el HTML se referencian con `data-i18n="clave"`.
- Las funciones globales que usa el HTML (`navigate`, `openModal`, etc.) se registran al final, en `DOMContentLoaded`.

## Convenciones
- Sin frameworks ni build. La única dependencia de runtime es `supabase-js` por CDN.
- **Una feature nueva, un archivo nuevo** en `js/features/` (por ejemplo `js/features/transferir.js`), y lo mínimo en `index.html` para engancharla. Así varios agentes trabajan en paralelo sin pisarse.
- La plata solo se mueve con `db.rpc('transferir', ...)`. Nunca escribir directo en `accounts`, `movements` ni `transfers`.
- Cambios de esquema: una migración nueva con el MCP de Supabase, nunca editando tablas a mano.
- Nada de datos al DOM con `innerHTML` sin escapar.
- Todo lo clickeable es un `<button>` o un `<a>` con destino real.
- Copy en español rioplatense (voseo), igual que el resto de la app.

## Flujo de trabajo con agentes
El método (spec, desarrollo, review) es el proceso de IT Patagonia y está en las skills `sdd-*`. Acá van solo las reglas de este repo.

El trabajo entra por Linear (proyecto **NovaBank · Demo agéntica**, equipo Repetto-a, responsable humano **Alejandro Repetto**). Los tickets con label **Agente** los ejecutan los agentes; los de label **Humano**, una persona. El dueño de cada ticket siempre es una persona.

Estados, en orden: `Todo` → `Spec en curso` → `Spec en revisión` → `Spec aprobada` → `En desarrollo` → `In Review` → `Done`.

Reglas que no se negocian:
- Sin spec aprobada no se escribe código. La aprobación es mover el ticket a `Spec aprobada`, y eso lo hace una persona.
- Nunca pushear a `main`. Una rama por ticket (el `gitBranchName` que da Linear) y un PR con `REP-XX` en el título.
- Ningún agente mergea, aprueba un PR ni mueve un ticket a `Done`.
- Las specs viven en `specs/REP-XX/spec.md` (qué, no técnica) y, en tickets grandes, `specs/REP-XX/design.md` (cómo). Viajan en el mismo PR que el código. El PRD del proyecto está en Linear.

Estas compuertas no dependen solo de este archivo: el hook `.claude/hooks/compuertas.mjs` bloquea el push a `main`, el merge y la aprobación de PRs, y que un agente mueva un ticket a `Spec aprobada` o `Done`.

## Checklist de review
Lo que `sdd-review` revisa en NovaBank, además del checklist general:
- i18n: textos nuevos sin clave en `LOCALES`, o con clave en `es` pero no en `en`.
- Accesibilidad: elementos clickeables que no son `button` ni `a`, íconos sin nombre accesible.
- Regresiones: funciones globales que usa el HTML (`navigate`, `openModal`, `filterMovements`...) renombradas o borradas.
- Plata: escrituras directas en `accounts`, `movements` o `transfers` en vez de `db.rpc('transferir')`; respuestas `ok: false` de `transferir()` que no se le muestran al usuario.
- Tiempo real: suscripciones que no se cierran al cambiar de cuenta.
- Base: tablas nuevas sin RLS; montos o límites escritos en el código en vez de leerlos de `bank_rules`.

## Tests
Hasta que se cierre REP-29 no hay suite: la verificación es manual y paso a paso en el PR.

Detalle y comandos: `docs/FLUJO-AGENTES.md`.
