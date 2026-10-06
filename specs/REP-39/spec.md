# REP-39 · Conectar NovaBank a la base real: elegir cuenta al entrar y leer saldo y movimientos

Estado: lista para revisar
PRD: Alcance "elegir una cuenta (sin login, es una demo)". Es la base del Milestone 1 y destraba las transferencias, el tiempo real y los extras: sin cuentas reales no hay transferencia de punta a punta (meta de la clase: transferir en menos de 15 s sin errores).

## Problema
La app muestra siempre los mismos datos fijos, como si todos fueran Diego. Aunque la base real ya tiene cuatro cuentas con sus movimientos, nadie puede entrar como otra persona ni ver su saldo verdadero.

## Para qué
Cada persona de la clase entra con su cuenta y ve su propio nombre, saldo y movimientos. Es el requisito previo para que dos personas se transfieran plata y cada una vea lo suyo desde su celular.

## Alcance
- Una pantalla inicial para elegir con qué cuenta entrar, con las cuentas que existen (hoy: Diego García, Ana López, Lucas Fernández y Café Patagonia). Cada una muestra su avatar (iniciales y color), el nombre del titular y su alias. No pide contraseña.
- Nombre, iniciales, saldo y movimientos de la cuenta elegida salen de la base, en el menú lateral, el saludo, el Inicio y la pantalla de Consumos (con sus totales).
- Poder cambiar de cuenta desde el menú lateral, sin recargar.
- Recordar la cuenta elegida al recargar la página. El recuerdo es por pestaña: una pestaña nueva vuelve a la pantalla de elegir cuenta.
- Mostrar un mensaje claro, con opción de reintentar, si no se pueden leer los datos.
- Todo texto nuevo disponible en español rioplatense (voseo) y en inglés.

## Fuera de alcance
- Transferir, tiempo real (que el saldo se actualice solo) y login real: son otros tickets.
- Los datos de la tarjeta (número, vencimiento, límite) no están en la base y siguen fijos. Sin cambios en la base en este ticket.
- Beneficios y promos: siguen como están.
- Filtro por mes de Consumos.

## Criterios de aceptación
- [ ] CA1: Dado que se abre la app en una pestaña nueva, cuando termina de cargar, entonces se ve la pantalla de elegir cuenta con las cuatro cuentas, cada una con avatar, nombre y alias, y sin ningún dato de otra cuenta detrás.
- [ ] CA2: Dada la pantalla de elegir cuenta, cuando se elige una cuenta, entonces se entra a la app y el nombre y las iniciales (menú lateral y saludo), el saldo y los movimientos (Inicio y Consumos, con sus totales) son los de esa cuenta tal como están en la base.
- [ ] CA3: Dado que se entró con una cuenta, cuando se usa el cambio de cuenta del menú lateral y se elige otra, entonces la página no se recarga y todo lo del CA2 pasa a mostrar la cuenta nueva, sin restos de la anterior.
- [ ] CA4: Dado que se entró con una cuenta, cuando se recarga la página, entonces se sigue en esa misma cuenta, sin pasar por la pantalla de elegir.
- [ ] CA5: Dadas dos pestañas abiertas, cuando una entra como una cuenta y la otra como otra distinta, entonces cada una muestra y conserva (también al recargar) su propia cuenta, sin pisar a la otra.
- [ ] CA6: Dado que se cambia el idioma a inglés, cuando se ve la pantalla de elegir cuenta, el cambio de cuenta y el mensaje de error, entonces están todos en inglés; en español, en voseo.
- [ ] CA7: Dada la pantalla de elegir cuenta y el cambio de cuenta, cuando se usan solo con teclado, entonces se puede llegar a cada cuenta y elegirla.
- [ ] CA8: Dado que la base no responde, cuando se abre o se recarga la app, o se elige una cuenta, entonces se ve un mensaje claro con la opción de reintentar (no una pantalla vacía ni datos de la cuenta anterior), y al reintentar con la base disponible se continúa normalmente.
- [ ] CA9: Dada una cuenta sin movimientos, cuando se entra con ella, entonces se ve el saldo y un aviso de que no hay movimientos, sin errores.
- [ ] CA10: Dado que se recuerda una cuenta que ya no existe, cuando se recarga la página, entonces se vuelve a la pantalla de elegir cuenta.
- [ ] CA11: Dado que la app se abre con doble clic en el archivo de la página, sin servidor ni instalación, entonces funciona igual.

## Preguntas abiertas
Ninguna bloquea la spec. Para confirmar al revisar:
- El titular que aparece en la tarjeta ("DIEGO GARCÍA"): el diseño propone que siga al nombre de la cuenta elegida, mientras que número, vencimiento y límite quedan fijos. ¿Está bien, o la tarjeta entera queda como hoy?
