# Specs

Una carpeta por ticket. La escribe el agente de specs, la aprueba una persona en Linear (moviendo el ticket a *Spec aprobada*) y viaja en el mismo PR que el código.

| Archivo | Dice | ¿Técnico? |
|---|---|---|
| `specs/REP-XX/spec.md` | Qué tiene que pasar y para qué. Criterios de aceptación. | No |
| `specs/REP-XX/design.md` | Cómo: archivos, tablas, riesgos y tareas en orden. Solo en tickets grandes (plata, base de datos, feature nueva). | Sí |

En los tickets chicos, el diseño va al final de `spec.md`, bajo `## Diseño (técnico)`.

La plantilla y las reglas están en `.claude/skills/sdd-spec/SKILL.md`. La cadena completa (PRD, milestones, tickets, spec, diseño, tareas) está explicada en `docs/FLUJO-AGENTES.md`.
