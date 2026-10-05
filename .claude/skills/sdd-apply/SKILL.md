---
name: sdd-apply
description: Proceso de IT Patagonia para implementar un ticket cuya spec ya fue aprobada, tarea por tarea, verificando cada criterio de aceptación. Usala solo cuando existe specs/<TICKET>/spec.md aprobada (y design.md, si el ticket es grande).
user-invocable: false
---

# Implementar una spec aprobada

La spec (`specs/<TICKET>/spec.md`) es el contrato: dice **qué** tiene que pasar. El diseño dice **cómo**: está en `specs/<TICKET>/design.md` o, en tickets chicos, en la sección `## Diseño (técnico)` de la spec. Si algo no está en la spec, no se hace.

Las convenciones del proyecto están en su `CLAUDE.md`. Esta skill es el método; el `CLAUDE.md`, las reglas de la casa.

## Pasos

1. **Leer la spec y el diseño enteros**, en especial "Fuera de alcance" y "Tareas". Si el diseño no alcanza para cumplir un criterio, frená y avisá: no improvises otro diseño.
2. **Rama.** Trabajá en la rama que te indican (el `gitBranchName` de Linear). Nunca en `main`.
3. **Implementar tarea por tarea**, en el orden del diseño. Un commit por tarea, con mensaje convencional (`fix:`, `feat:`, `refactor:`, `test:`) y el identificador del ticket al final.
4. **Tests.** Si el proyecto tiene suite, agregá o actualizá tests que cubran los criterios y corréla. Si no tiene, describí la verificación manual paso a paso.
5. **Verificar contra la spec, no contra el código.** Recorré cada criterio y marcalo como cumplido con su evidencia (el test que lo cubre o el paso manual). Si uno no se cumple, no lo des por cumplido: volvé a implementar o reportalo.
6. **Respetar el `CLAUDE.md`** del repo: convenciones, dependencias permitidas, lo que no se toca.
7. **Guardar lo aprendido.** Si hay memoria conectada (engram) y descubriste algo que no estaba escrito, `mem_save` con un `topic_key` estable, por ejemplo `<proyecto>/<tema>`.

## Salida
Un resumen para el PR con:
- Qué cambió, archivo por archivo.
- La tabla de criterios: CA, cumplido sí/no, evidencia.
- Lo que no se pudo hacer y por qué.

## No hacer
- No tocar archivos fuera del impacto del diseño.
- No pushear a `main`, no mergear, no cerrar el ticket.
- No "mejorar de paso" cosas que la spec no pide: anotalas como sugerencia en el resumen.
