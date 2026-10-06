'use strict';

/* ============================================================
   CUENTA  (REP-39)
   Elegir con qué cuenta entrar, leer su saldo y movimientos de
   Supabase (solo lectura), llenar DATA y volver a renderizar.

   API pública:
     Cuenta.actual()     -> { id, alias, holder_name, initials, kind, balance, color } | null
     Cuenta.cambiar()    -> vuelve a la pantalla de elegir cuenta (sin recargar)
     Cuenta.reintentar() -> repite la última lectura que falló
   Evento: 'novabank:cuenta' en document (detail = cuenta), al elegir,
   cambiar o restaurar la cuenta al recargar.
   ============================================================ */

const Cuenta = (() => {

  const STORAGE_KEY = 'novabank-cuenta';   // sessionStorage: alias de la cuenta, por pestaña
  const ACCOUNT_COLS = 'id, alias, holder_name, initials, kind, balance, color';
  const MOVEMENT_COLS = 'id, amount, description, category, icon, created_at';

  let current    = null;   // cuenta cargada
  let requestId  = 0;      // descarta respuestas viejas si se cambia de cuenta rápido
  let lastAction = null;   // lo que reintenta el botón "Reintentar"
  let overlay    = null;
  let panel      = null;


  /* ---------- sessionStorage (en try/catch, como el resto del repo) ---------- */

  function readSaved() {
    try { return sessionStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function saveAlias(alias) {
    try { sessionStorage.setItem(STORAGE_KEY, alias); } catch (e) {}
  }
  function clearSaved() {
    try { sessionStorage.removeItem(STORAGE_KEY); } catch (e) {}
  }


  /* ---------- DATA y render ---------- */

  function renderApp() {
    Dashboard.render();
    Movements.render();
  }

  function clearData() {
    current = null;
    DATA.user.name     = '';
    DATA.user.initials = '';
    DATA.user.balance  = 0;
    DATA.movements     = [];
    renderApp();
  }

  function mapMovement(row) {
    const amount = Number(row.amount);
    return {
      id:         row.id,
      name:       row.description || '',
      category:   row.category || '',
      created_at: row.created_at,
      amount:     amount,
      icon:       row.icon || '💳',
      color:      amount < 0 ? '#8E8E93' : '#34C759',   // la base no trae color
    };
  }

  function applyAccount(account, movements) {
    current = {
      id:          account.id,
      alias:       account.alias,
      holder_name: account.holder_name,
      initials:    account.initials,
      kind:        account.kind,
      balance:     Number(account.balance),
      color:       account.color,
    };
    DATA.user.name     = current.holder_name;
    DATA.user.initials = current.initials;
    DATA.user.balance  = current.balance;
    DATA.movements     = movements.map(mapMovement);
    renderApp();
  }


  /* ---------- Overlay (selección, carga y error) ---------- */

  function gate() {
    document.body.classList.add('nb-gate');
    try { Modal.close(); } catch (e) {}
  }

  function ungate() {
    overlay.hidden = true;
    document.body.classList.remove('nb-gate');
  }

  function showPanel(node, focusEl) {
    panel.replaceChildren(node);
    I18n.applyToDOM();
    overlay.hidden = false;
    (focusEl || panel).focus();
  }

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function i18nEl(tag, className, key) {
    const node = el(tag, className);
    node.dataset.i18n = key;
    return node;
  }

  function showLoading() {
    const p = i18nEl('p', 'cuenta-status', 'cuenta.loading');
    p.id = 'cuenta-title';
    p.setAttribute('role', 'status');
    showPanel(p);
  }

  function showError() {
    const box = el('div');
    box.setAttribute('role', 'alert');
    const title = i18nEl('h1', 'cuenta-title', 'cuenta.error_title');
    title.id = 'cuenta-title';
    const msg = i18nEl('p', 'cuenta-subtitle', 'cuenta.error_msg');
    const retry = i18nEl('button', 'btn btn-primary cuenta-retry', 'cuenta.retry');
    retry.type = 'button';
    retry.addEventListener('click', reintentar);
    box.append(title, msg, retry);
    showPanel(box, retry);
  }

  // Texto legible sobre el color de la cuenta
  function textColorFor(hex) {
    if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return '#fff';
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return (0.299 * r + 0.587 * g + 0.114 * b) > 160 ? '#1C1C22' : '#fff';
  }

  function showPicker(accounts) {
    const box = el('div');
    const title = i18nEl('h1', 'cuenta-title', 'cuenta.pick_title');
    title.id = 'cuenta-title';
    const sub = i18nEl('p', 'cuenta-subtitle', 'cuenta.pick_subtitle');
    const list = el('ul', 'cuenta-list');

    let first = null;
    accounts.forEach(acc => {
      const btn = el('button', 'cuenta-card');
      btn.type = 'button';
      const avatar = el('span', 'cuenta-avatar', acc.initials);
      if (/^#[0-9a-fA-F]{6}$/.test(acc.color)) {
        avatar.style.background = acc.color;
        avatar.style.color = textColorFor(acc.color);
      } else {
        avatar.style.background = 'var(--accent)';
      }
      avatar.setAttribute('aria-hidden', 'true');
      const text = el('span');
      text.append(el('span', 'cuenta-holder', acc.holder_name), el('span', 'cuenta-alias', acc.alias));
      btn.append(avatar, text);
      btn.addEventListener('click', () => elegir(acc.alias));
      const li = el('li');
      li.append(btn);
      list.append(li);
      if (!first) first = btn;
    });

    box.append(title, sub, list);
    showPanel(box, first);
  }


  /* ---------- Lecturas ---------- */

  async function cargarCuentas() {
    if (!db) throw new Error('Supabase no disponible');
    const { data, error } = await db.from('accounts').select(ACCOUNT_COLS).order('holder_name');
    if (error) throw error;
    if (!data || data.length === 0) throw new Error('Sin cuentas');
    return data;
  }

  async function mostrarSeleccion() {
    lastAction = mostrarSeleccion;
    const req = ++requestId;
    gate();
    showLoading();
    try {
      const accounts = await cargarCuentas();
      if (req !== requestId) return;
      showPicker(accounts);
    } catch (e) {
      if (req !== requestId) return;
      showError();
    }
  }

  async function cargarCuenta(alias) {
    lastAction = () => cargarCuenta(alias);
    const req = ++requestId;
    clearData();            // nada de la cuenta anterior detrás ni si falla
    gate();
    showLoading();
    try {
      if (!db) throw new Error('Supabase no disponible');

      const accRes = await db.from('accounts').select(ACCOUNT_COLS).eq('alias', alias).maybeSingle();
      if (req !== requestId) return;
      if (accRes.error) throw accRes.error;
      if (!accRes.data) {   // la cuenta ya no existe
        clearSaved();
        return mostrarSeleccion();
      }

      const movRes = await db.from('movements').select(MOVEMENT_COLS)
        .eq('account_id', accRes.data.id)
        .order('created_at', { ascending: false });
      if (req !== requestId) return;
      if (movRes.error) throw movRes.error;

      applyAccount(accRes.data, movRes.data || []);
      saveAlias(accRes.data.alias);
      ungate();
      const pill = document.getElementById('user-pill');
      if (pill) pill.focus();
      document.dispatchEvent(new CustomEvent('novabank:cuenta', { detail: current }));
    } catch (e) {
      if (req !== requestId) return;
      showError();
    }
  }


  /* ---------- API ---------- */

  function elegir(alias)  { return cargarCuenta(alias); }
  function cambiar()      { return mostrarSeleccion(); }
  function reintentar()   { if (lastAction) return lastAction(); }
  function actual()       { return current; }

  function createOverlay() {
    overlay = el('div', 'cuenta-overlay');
    overlay.id = 'cuenta-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'cuenta-title');
    overlay.hidden = true;
    panel = el('div', 'cuenta-panel');
    panel.tabIndex = -1;
    overlay.append(panel);
    document.body.append(overlay);
  }

  function init() {
    createOverlay();
    const saved = readSaved();
    if (saved) cargarCuenta(saved);
    else mostrarSeleccion();
  }

  return { init, actual, cambiar, reintentar };

})();

window.Cuenta = Cuenta;
document.addEventListener('DOMContentLoaded', () => Cuenta.init());
