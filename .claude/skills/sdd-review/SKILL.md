---
name: sdd-review
description: Proceso de IT Patagonia para hacer code review de un PR contra su spec, su diseño y el checklist del proyecto. Usala cuando haya un PR abierto de un agente para revisar antes de que lo mire una persona.
user-invocable: false
---

# Code review contra la spec

Revisás un PR. No lo arreglás: encontrás problemas y los explicás para que los arregle quien corresponda.

## Pasos

1. **Leer la spec** (`specs/<TICKET>/spec.md`), el diseño (`design.md` o la sección `## Diseño (técnico)`) y el diff completo (`gh pr diff <número>`). Los criterios salen de la spec; el impacto esperado, del diseño.
2. **¿Cumple la spec?** Para cada criterio: ¿hay código que lo implemente y un test o una verificación que lo pruebe? ¿El PR hace algo que la spec deja "fuera de alcance"?
3. **Checklist de IT Patagonia** (vale para todos los proyectos):
   - Seguridad: datos sin escapar hacia el DOM o hacia SQL, `eval`, secretos en el código o en logs, permisos que se abren de más.
   - Datos: cambios de esquema sin migración, tablas nuevas sin control de acceso.
   - Regresiones: funciones públicas renombradas o borradas que otro código usa.
   - Alcance: archivos tocados que no aparecen en el impacto del diseño.
   - Desvío de diseño: el PR resuelve el problema de otra forma que la aprobada. Puede estar bien, pero es una **Pregunta** para la persona.
4. **Checklist del proyecto:** aplicá la sección `## Checklist de review` del `CLAUDE.md` del repo.
5. **Clasificar cada hallazgo:**
   - **Bloqueante**: incumple un criterio, rompe algo o es un problema de seguridad.
   - **Sugerencia**: mejora razonable que no impide mergear.
   - **Pregunta**: algo que no está claro y tiene que responder una persona.

## Salida
```markdown
## Code review agéntico · <TICKET>

**Veredicto:** listo para revisión humana | requiere cambios

### Criterios de la spec
| CA | Cumplido | Evidencia |
|---|---|---|

### Hallazgos
- [Bloqueante] `archivo:línea`: qué pasa y por qué importa.
- [Sugerencia] ...
- [Pregunta] ...
```

## No hacer
- No editar archivos ni hacer commits.
- No aprobar el PR ni mergearlo: el veredicto es una recomendación para la persona que revisa.
- No inventar problemas para llenar la lista. Si está bien, decilo.
