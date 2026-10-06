# Base de datos de NovaBank (Supabase)

Proyecto Supabase: **novabank-demo** (región São Paulo). Separado de cualquier otro proyecto.

```
URL:              https://vgginqpbmpqqsbxhdeub.supabase.co
Publishable key:  sb_publishable_SM-A-3vCQB847BtdkY2pHg_SI03k0zA
```

La publishable key es pública por diseño: va en el frontend. Lo que protege los datos son las políticas de RLS y la función `transferir()`, no la key.

## Cliente desde el navegador (sin build)

```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="js/config.js"></script>
```

```js
// js/config.js
const db = supabase.createClient(
  'https://vgginqpbmpqqsbxhdeub.supabase.co',
  'sb_publishable_SM-A-3vCQB847BtdkY2pHg_SI03k0zA'
);
```

## Tablas

| Tabla | Qué guarda | Desde el frontend |
|---|---|---|
| `accounts` | `alias`, `holder_name`, `initials`, `kind` (persona/comercio), `balance`, `color` | leer |
| `movements` | `account_id`, `amount` (negativo = débito), `description`, `category`, `icon`, `created_at` | leer |
| `transfers` | **auditoría**: toda transferencia intentada, completada o rechazada, con motivo | leer |
| `bank_rules` | máximo por transferencia, máximo diario, monto desde el que se pide confirmación extra | leer |
| `v_transfers` | vista de `transfers` con alias y nombres de origen y destino | leer |

Nadie escribe directo en las tablas: la única forma de mover plata es `transferir()`.

## Cuentas de ejemplo

| Alias | Titular | Tipo | Saldo inicial |
|---|---|---|---|
| `diego.nova` | Diego García | persona | $1.247.890,32 |
| `ana.nova` | Ana López | persona | $385.000 |
| `lucas.nova` | Lucas Fernández | persona | $92.500 |
| `cafe.patagonia` | Café Patagonia | comercio | $2.150.000 |

Diego tiene movimientos de abril, mayo y junio de 2026 (sirven para el filtro por mes).

## Transferir

```js
const { data, error } = await db.rpc('transferir', {
  p_from_alias: 'diego.nova',
  p_to_alias:   'ana.nova',
  p_amount:     15000,
  p_concept:    'Pizza del viernes',
});
// data = { ok: true, transfer_id, new_balance }
// data = { ok: false, reason: 'saldo_insuficiente' | 'supera_limite_por_transferencia'
//          | 'supera_limite_diario' | 'destinatario_inexistente' | 'misma_cuenta' | 'monto_invalido' }
```

Es atómica: descuenta, acredita, registra la transferencia y crea un movimiento en cada cuenta, o no hace nada. Los rechazos por saldo o límites también quedan registrados en `transfers`, con su motivo.

Las reglas salen de `bank_rules` (hoy: $500.000 por transferencia, $1.000.000 por día, confirmación extra desde $100.000). Son valores provisorios: los define una persona en REP-28.

## Tiempo real

`accounts`, `movements` y `transfers` están publicadas en Supabase Realtime:

```js
db.channel('cuenta-' + accountId)
  .on('postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'movements', filter: `account_id=eq.${accountId}` },
      (payload) => { /* payload.new es el movimiento nuevo */ })
  .subscribe();
```

## Atajos deliberados de la demo

- **No hay login.** Se elige la cuenta en una pantalla y `transferir()` acepta cualquier alias de origen: cualquiera puede mover plata de cualquier cuenta.
- **La lectura está abierta**: cualquiera ve los saldos y movimientos de todos.

Son decisiones conscientes para la clase. El agente revisor y el advisor de seguridad de Supabase los marcan, y está bien que lo hagan: es parte de la demo.
