---
name: agentes
description: Orquesta el flujo de agentes de NovaBank sobre Linear. Toma tickets, lanza los subagentes de spec, desarrollo y review, y mueve los estados.
argument-hint: "[estado | spec | dev | review | ciclo] [REP-XX]"
disable-model-invocation: true
---

# Orquestador de agentes de NovaBank

Sos el único que habla con Linear (MCP `linear-server`). Los subagentes trabajan sobre archivos y git; vos movés estados, publicás y avisás.

Proyecto, equipo y responsable humano: los dice el `CLAUDE.md` del repo.

La cadena: el **PRD** del proyecto (documento del proyecto en Linear) define el negocio; los **milestones** ordenan las entregas; cada **ticket** se convierte en **spec** (qué), **diseño** (cómo) y **tareas**; de ahí sale el **PR**.

Modo pedido: `$ARGUMENTS` (si está vacío, usá `estado`).

## Reglas
- Solo tomás tickets con label **Agente**. Los de label **Humano** no se tocan.
- Nunca movés un ticket a `Spec aprobada` ni a `Done`. Eso es de una persona.
- Bloqueos:
  - Para escribir la **spec**, solo frenan los bloqueos por tickets **Humano** que no están en `Done` (falta una decisión). Un bloqueo técnico por otro ticket de agente no impide especificar: la spec se puede escribir por adelantado.
  - Para **desarrollar**, frena cualquier bloqueo que no esté en `Done`.
  - Cuando frenás, decís qué ticket bloquea y quién lo tiene que resolver.
- Cada vez que movés un ticket, dejás un comentario que explica qué pasó.
- Si un estado del flujo no existe en Linear, frená y avisá (en NovaBank, es REP-27).

## `estado`
Listá con `list_issues` los tickets del proyecto con label Agente, agrupados por estado. Señalá qué está esperando a una persona (`Spec en revisión`, `In Review`) y qué podés tomar vos (`Todo`, `Spec aprobada`). Proponé el próximo paso. No muevas nada.

## `spec [REP-XX]`
1. Si no viene un ticket, tomá el de mayor prioridad en `Todo` con label Agente que no esté frenado por un ticket Humano.
2. `get_issue` (con relaciones y milestone) y `list_comments` para tener el contexto completo. Con `list_documents` del proyecto buscá el PRD y leelo con `get_document`.
3. `save_issue`: estado `Spec en curso`. Comentario: "Agente de spec trabajando."
4. Lanzá el subagente **spec-writer** con el ticket completo (título, descripción, comentarios, bloqueos, milestone) y el texto del PRD. El subagente no tiene acceso a Linear: todo lo que necesita se lo pasás vos.
5. Con su respuesta:
   - Si la spec quedó **lista**: publicá la spec entera como comentario en el ticket (y el diseño, si hay `design.md`, en un segundo comentario), `save_issue` con estado `Spec en revisión` y asignado a Alejandro Repetto. Comentario final: "Spec lista para revisar. Si la aprobás, mové el ticket a *Spec aprobada*. Si no, comentá qué cambiar y volvelo a *Todo*."
   - Si quedó **bloqueada**: publicá las preguntas abiertas, devolvé el ticket a `Todo` y asignalo a Alejandro.

## `dev [REP-XX]`
1. Si no viene un ticket, tomá el de mayor prioridad en `Spec aprobada` con label Agente.
2. `get_issue` para obtener el `gitBranchName`. Confirmá que existe `specs/REP-XX/spec.md` (y `design.md`, si la spec lo menciona).
3. `save_issue`: estado `En desarrollo`. Comentario: "Agente de desarrollo trabajando en la rama `<rama>`."
4. Lanzá el subagente **developer** con `REP-XX`, la rama y la ruta de la spec.
5. Con su respuesta: `save_issue` con estado `In Review` y asignado a Alejandro, agregando el link al PR. Comentario con la tabla de criterios.
6. Encadená el review: corré el modo `review` sobre ese PR.

## `review <PR | REP-XX>`
1. Lanzá el subagente **code-reviewer** con el número de PR y el ticket.
2. Publicá su review en el PR: `gh pr review <número> --comment --body-file <archivo>`. Nunca `--approve`.
3. Comentá en Linear el veredicto y la cantidad de bloqueantes.
4. Si hay bloqueantes, decíselo a Alejandro y proponé correr `dev REP-XX` de nuevo con los hallazgos como entrada. No lo hagas sin su OK.

## `ciclo`
Una pasada completa, en este orden: `review` de los PRs de agentes que todavía no tienen review, `dev` de los tickets en `Spec aprobada`, `spec` de los tickets en `Todo`. Los desarrollos pueden ir en paralelo (cada developer trabaja en su worktree). Al final mostrá el resumen de `estado`.

## Lo que no depende de vos
Un hook (`.claude/hooks/compuertas.mjs`) frena el push a `main`, `gh pr merge`, `gh pr review --approve` y cualquier `save_issue` que mueva un ticket a `Spec aprobada` o `Done`. Si te frena, no busques otro camino: avisale a la persona.
