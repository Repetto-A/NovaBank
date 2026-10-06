# REP-39 · Diseño

Spec: `specs/REP-39/spec.md`

## Enfoque
Un cliente `db` en `js/config.js` y un módulo nuevo `js/features/cuenta.js` (`Cuenta`) que lee la cuenta y sus movimientos, llena el objeto `DATA` existente y vuelve a renderizar con `Dashboard.render()` y `Movements.render()`. Así `Dashboard` y `Movements` casi no cambian. Pantalla de selección y error son overlays que viven en el JS/HTML del feature. Sin migraciones: las políticas de lectura abierta (SELECT para `anon`) ya existen en `accounts` y `movements`.

## Impacto
**Archivos nuevos**
- `js/config.js`: `const db = supabase.createClient(URL, KEY)` (valores de `docs/SUPABASE.md`). Si `supabase` no cargó (CDN caído), `db = null` y `Cuenta` lo trata como error de carga (CA8).
- `js/features/cuenta.js`: el módulo. Expone `window.Cuenta = { actual, cambiar, reintentar }`.

**`index.html`** (mínimo)
- `<script>` de `supabase-js` por CDN, luego `js/config.js`, `js/app.js` y `js/features/cuenta.js` (en ese orden; `app.js` define los `const` globales `DATA`, `Dashboard`, `Movements`, `I18n`, accesibles desde scripts clásicos posteriores).
- `.user-pill` pasa de `div` a `<button>` ("cambiar de cuenta"), con `aria-label` por `data-i18n`-aria o texto oculto; nombre e iniciales con ids para llenarlos desde JS (hoy fijos "DG" / "Diego García").
- Saludo `dashboard.greeting`: hoy fijo "Buenos días, Diego". Cambiar a clave con parámetro (`Buenos días, {name} 👋`) y que `Dashboard.render` lo arme con el primer nombre.
- "Último movimiento: Hoy — Mercado Pago $12.500" (línea 152) está fijo: se llena desde `DATA.movements[0]` o se oculta si no hay.
- Tarjeta: número, vencimiento, marca y límite quedan fijos (decisión del humano). El titular `DIEGO GARCÍA` (línea 249) pasa a salir del nombre de la cuenta en mayúsculas (ver pregunta abierta en la spec).
- Contenedores del overlay de selección y del de error (pueden crearse desde `cuenta.js` para no tocar más el HTML).

**`js/app.js`**
- `DATA.user` y `DATA.movements` dejan de tener datos de Diego: `user = { name:'', initials:'', balance:0, card:{...fija} }`, `movements = []`. Los datos de la tarjeta (`last4`, `expiry`, `brand`, `limit`) se mantienen.
- `Dashboard.renderRecentMovements` y `Movements.renderTable`: hoy insertan `m.name`, `m.category`, `m.icon`, `m.color` en `innerHTML` sin escapar. Con datos de la base esto es obligatorio escaparlo (regla del repo). Agregar `escapeHTML()` en UTILS y usarla en esos campos; `m.color` solo si matchea `^#[0-9a-fA-F]{6}$`.
- `LOCALES`: claves nuevas en `es` y en `en` (selección, cambiar cuenta, error, reintentar, cargando, sin movimientos si hace falta, saludo con nombre). Para el select de categorías: la base trae `Transferencias` y `Ventas`, que hoy no existen en el filtro: agregar `cat.transferencias`, `cat.ventas` y sus `<option>`.
- `I18n.setLocale` ya llama a `Dashboard.render` y `Movements.render`; `Cuenta` debe re-renderizar textos propios (pantalla de selección visible, error) en un listener o exponiendo un `render()` que se llame desde ahí.
- `DOMContentLoaded`: el render inicial con `DATA` vacío no debe mostrar la app; el arranque lo hace `Cuenta.init()` (se registra desde `cuenta.js` con su propio `DOMContentLoaded`, sin tocar los globales existentes).

**Dependientes**: REP-38 (transferir) y REP-40 (tiempo real) leen `Cuenta.actual()` (`{ id, alias, holder_name, initials, kind, balance, color }`) y escuchan el evento `novabank:cuenta` (`CustomEvent` en `document`, `detail` = cuenta, disparado al elegir/cambiar, también al restaurar al recargar). REP-40 debe cerrar su suscripción al recibir un cambio de cuenta.

## Datos
Sin cambios en la base. Columnas reales (verificadas contra `novabank-demo`; ojo, difieren de lo que dice `docs/SUPABASE.md`):
- `accounts`: `id` (uuid), `alias`, `holder_name`, `initials`, `kind` (`persona`|`comercio`; la doc dice "tipo" pero la columna es `kind`), `balance` (numeric), `color` (hex), `created_at`.
- `movements`: `id`, `account_id`, `amount` (negativo = débito), `description`, `category`, `icon` (nullable), `transfer_id` (nullable), `created_at`. **No tiene `name`, `date` ni `color`.**

Consultas (lectura con `db.from(...).select()`, nunca escritura):
- Lista: `accounts` ordenada con un orden estable y explícito (`order('holder_name')`).
- Cuenta elegida: `accounts` por `alias` (`.eq('alias', x).single()`).
- Movimientos: `movements` con `.eq('account_id', cuenta.id).order('created_at', { ascending:false })`. Son 27 filas en total, sin paginación en este ticket.

Mapeo a lo que ya consume el render: `name ← description`, `date ← created_at` formateado "dd mmm" según el idioma activo (los datos van de abril a octubre 2026), `icon` con fallback si es null, `color` ← un color fijo por signo (verde crédito, neutro débito) porque la base no lo trae. `amount` viene como numeric: convertir con `Number()`.

Persistencia: `sessionStorage['novabank-cuenta'] = alias`, en try/catch como el resto del repo. Se guarda el alias (estable y es lo que usa `transferir()`), no el id. Al restaurar, si el alias ya no existe en la base, se borra la clave y se muestra la selección (CA10).

## Riesgos
- **Respuestas fuera de orden**: si se cambia de cuenta rápido, la respuesta de la anterior puede llegar después y pisar a la nueva. Mitigar con un contador de pedido (descartar respuestas cuyo número no sea el último). Se nota: nombre de una cuenta con movimientos de otra.
- **Datos viejos tras un error** (CA8): al empezar a cargar una cuenta, vaciar `DATA` y ocultar la app antes de pedir; no reusar lo anterior si falla.
- **Saldo y movimientos desactualizados**: sin tiempo real (REP-40), si otra pestaña transfiere, esta no se entera hasta recargar o volver a elegir. Es esperado en este ticket.
- **CA5**: `sessionStorage` es por pestaña, pero una pestaña duplicada hereda el valor. Aceptable. Con `file://` Chrome lo mantiene por pestaña; verificar también en Firefox.
- **CDN**: si `supabase-js` no carga, `supabase` es undefined y todo falla; cubierto por el estado de error.
- **Inconsistencia de la doc**: `docs/SUPABASE.md` dice "tipo" por `kind`; corregir en un ticket aparte o en este PR (una línea).
- **Datos de prueba cambiantes**: el saldo de Ana hoy es 384.999 (hubo una transferencia de prueba), no 385.000. La verificación compara contra la base, no contra valores fijos.
- Marcado como atajo deliberado de la demo (sin login, lectura abierta): no se corrige acá (REP-46).

## Tareas
1. `js/config.js` + scripts en `index.html`; confirmar que `db` existe y lee `accounts` desde consola. (CA11)
2. Vaciar `DATA.user`/`DATA.movements`, agregar `escapeHTML` y usarla en los dos renders; fallback de `icon` y `color`. (CA2, seguridad)
3. `js/features/cuenta.js`: `cargarCuentas`, `cargarCuenta(alias)` con contador de pedido, mapeo a `DATA`, re-render y evento `novabank:cuenta`. (CA2, CA3)
4. Pantalla de selección: tarjetas `<button>` con avatar, nombre y alias; foco inicial y teclado. Claves en `LOCALES` es y en. (CA1, CA6, CA7)
5. Menú lateral: `.user-pill` como `<button>` que vuelve a la selección sin recargar; llenar nombre, iniciales, saludo, "último movimiento" y titular de tarjeta. (CA3, CA2)
6. Persistencia en `sessionStorage` y restauración al cargar, con alias inexistente. (CA4, CA5, CA10)
7. Estados de carga, error con "Reintentar" y cuenta sin movimientos. (CA8, CA9)
8. Categorías `Transferencias` y `Ventas` en el filtro y claves i18n; re-render de textos propios al cambiar idioma. (CA6)
9. Verificación manual paso a paso de CA1-CA11 en el PR (no hay suite hasta REP-29), incluida la prueba con red cortada y dos pestañas.
