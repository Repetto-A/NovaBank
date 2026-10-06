'use strict';

/* Cliente de Supabase (proyecto novabank-demo). La publishable key es publica
   por diseno; ver docs/SUPABASE.md. Si el CDN no cargo, db queda en null y
   Cuenta lo trata como error de carga. */
const db = (() => {
  try {
    if (typeof supabase === 'undefined') return null;
    return supabase.createClient(
      'https://vgginqpbmpqqsbxhdeub.supabase.co',
      'sb_publishable_SM-A-3vCQB847BtdkY2pHg_SI03k0zA'
    );
  } catch (e) {
    return null;
  }
})();
