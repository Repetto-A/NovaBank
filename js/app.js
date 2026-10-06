'use strict';

/* ============================================================
   LOCALES  (T04)
   ============================================================ */

const LOCALES = {
  es: {
    // Navegación
    'nav.dashboard':        'Inicio',
    'nav.movimientos':      'Consumos',
    'nav.beneficios':       'Beneficios',
    'nav.resumen':          'Resumen',
    'nav.configuracion':    'Configuración',
    // Topbar
    'topbar.notifications': 'Notificaciones',
    'topbar.search':        'Búsqueda',
    // Sidebar
    'sidebar.principal':    'Principal',
    'sidebar.cuenta':       'Cuenta',
    // Usuario
    'user.role':            'Caja de ahorro',
    // Dashboard
    'dashboard.greeting':         'Buenos días, {name} 👋',
    'dashboard.balance_label':    'Saldo disponible · Caja de ahorro ARS',
    'dashboard.last_movement':    'Último movimiento:',
    'dashboard.recent_movements': 'Últimos movimientos',
    'dashboard.see_all':          'Ver todos →',
    'dashboard.my_card':          'Mi tarjeta',
    'dashboard.card_limit':       'Límite disponible',
    'dashboard.card_status':      'Al día',
    'dashboard.active_promos':    'Promos activas',
    'dashboard.no_movements':     'Todavía no hay movimientos en esta cuenta.',
    // Acciones rápidas
    'qa.consumos':    'Mis consumos',
    'qa.descargar':   'Descargar resumen',
    'qa.beneficios':  'Beneficios',
    'qa.transferir':  'Transferir',
    // Botones hero
    'hero.ver_consumos':      'Ver consumos',
    'hero.descargar_resumen': 'Descargar resumen',
    'hero.ver_beneficios':    'Ver beneficios',
    // Movimientos
    'mov.title':              'Consumos',
    'mov.subtitle':           'Historial de movimientos de tu cuenta',
    'mov.expenses':           'Gastos este mes',
    'mov.income':             'Ingresos este mes',
    'mov.count':              'Movimientos',
    'mov.search_placeholder': '🔍  Buscar transacción...',
    'mov.all_categories':     'Todas las categorías',
    'mov.download':           'Descargar resumen',
    'mov.col_description':    'Descripción',
    'mov.col_category':       'Categoría',
    'mov.col_date':           'Fecha',
    'mov.col_amount':         'Monto',
    'mov.col_status':         'Estado',
    'mov.empty':              'No se encontraron movimientos.',
    'mov.status_credited':    'Acreditado',
    // Categorías
    'cat.comidas':         'Comidas',
    'cat.supermercado':    'Supermercado',
    'cat.entretenimiento': 'Entretenimiento',
    'cat.transporte':      'Transporte',
    'cat.sueldo':          'Sueldo',
    'cat.tecnologia':      'Tecnología',
    'cat.transferencias':  'Transferencias',
    'cat.ventas':          'Ventas',
    // Cuenta (elegir / cambiar / error)
    'cuenta.pick_title':    'Elegí con qué cuenta entrar',
    'cuenta.pick_subtitle': 'Es una demo: no hace falta contraseña.',
    'cuenta.loading':       'Cargando tu cuenta...',
    'cuenta.error_title':   'No pudimos cargar tus datos',
    'cuenta.error_msg':     'Revisá tu conexión y volvé a intentar.',
    'cuenta.retry':         'Reintentar',
    'cuenta.switch':        'Cambiar de cuenta',
    // Beneficios
    'ben.title':                  'Beneficios exclusivos',
    'ben.subtitle':               'Descuentos y promos para vos por ser cliente NovaBanco',
    'ben.filter_todos':           'Todos',
    'ben.filter_gastronomia':     '🍔 Gastronomía',
    'ben.filter_viajes':          '✈️ Viajes',
    'ben.filter_tech':            '💻 Tecnología',
    'ben.filter_salud':           '🏥 Salud',
    'ben.filter_entretenimiento': '🎬 Entretenimiento',
    'ben.empty':                  'No hay beneficios en esta categoría.',
    // Modal
    'modal.title':           'Descargar resumen',
    'modal.desc':            'Seleccioná el período y el formato que querés descargar.',
    'modal.junio_label':     'Junio 2026',
    'modal.junio_sub':       'Del 1 al 22 de junio',
    'modal.mayo_label':      'Mayo 2026',
    'modal.mayo_sub':        'Mes completo — 38 movimientos',
    'modal.q2_label':        '2do trimestre 2026',
    'modal.q2_sub':          'Abril, Mayo y Junio',
    'modal.cancel':          'Cancelar',
    'modal.download_btn':    'Descargar PDF',
    'modal.generating':      'Generando tu resumen',
    'modal.generating_desc': 'Esto tarda unos segundos...',
    'modal.done_title':      '¡Listo!',
    'modal.done_desc':       'Tu resumen fue descargado correctamente. Lo podés encontrar en tu carpeta de Descargas.',
    'modal.close':           'Cerrar',
    // Pasos de descarga
    'dl.step1': 'Obteniendo movimientos...',
    'dl.step2': 'Aplicando formato...',
    'dl.step3': 'Generando PDF...',
    'dl.step4': 'Verificando documento...',
    'dl.step5': '¡Listo!',
  },

  en: {
    // Navigation
    'nav.dashboard':        'Home',
    'nav.movimientos':      'Expenses',
    'nav.beneficios':       'Benefits',
    'nav.resumen':          'Summary',
    'nav.configuracion':    'Settings',
    // Topbar
    'topbar.notifications': 'Notifications',
    'topbar.search':        'Search',
    // Sidebar
    'sidebar.principal':    'Main',
    'sidebar.cuenta':       'Account',
    // User
    'user.role':            'Savings account',
    // Dashboard
    'dashboard.greeting':         'Good morning, {name} 👋',
    'dashboard.balance_label':    'Available balance · Savings account ARS',
    'dashboard.last_movement':    'Last transaction:',
    'dashboard.recent_movements': 'Recent transactions',
    'dashboard.see_all':          'See all →',
    'dashboard.my_card':          'My card',
    'dashboard.card_limit':       'Available limit',
    'dashboard.card_status':      'Up to date',
    'dashboard.active_promos':    'Active promos',
    'dashboard.no_movements':     'There are no transactions in this account yet.',
    // Quick actions
    'qa.consumos':    'My expenses',
    'qa.descargar':   'Download summary',
    'qa.beneficios':  'Benefits',
    'qa.transferir':  'Transfer',
    // Hero buttons
    'hero.ver_consumos':      'View expenses',
    'hero.descargar_resumen': 'Download summary',
    'hero.ver_beneficios':    'View benefits',
    // Movements
    'mov.title':              'Expenses',
    'mov.subtitle':           'Your account transaction history',
    'mov.expenses':           'Expenses this month',
    'mov.income':             'Income this month',
    'mov.count':              'Transactions',
    'mov.search_placeholder': '🔍  Search transaction...',
    'mov.all_categories':     'All categories',
    'mov.download':           'Download summary',
    'mov.col_description':    'Description',
    'mov.col_category':       'Category',
    'mov.col_date':           'Date',
    'mov.col_amount':         'Amount',
    'mov.col_status':         'Status',
    'mov.empty':              'No transactions found.',
    'mov.status_credited':    'Credited',
    // Categories
    'cat.comidas':         'Food',
    'cat.supermercado':    'Grocery',
    'cat.entretenimiento': 'Entertainment',
    'cat.transporte':      'Transport',
    'cat.sueldo':          'Salary',
    'cat.tecnologia':      'Technology',
    'cat.transferencias':  'Transfers',
    'cat.ventas':          'Sales',
    // Account (pick / switch / error)
    'cuenta.pick_title':    'Choose which account to use',
    'cuenta.pick_subtitle': 'This is a demo: no password needed.',
    'cuenta.loading':       'Loading your account...',
    'cuenta.error_title':   'We could not load your data',
    'cuenta.error_msg':     'Check your connection and try again.',
    'cuenta.retry':         'Retry',
    'cuenta.switch':        'Switch account',
    // Benefits
    'ben.title':                  'Exclusive benefits',
    'ben.subtitle':               'Discounts and promos for you as a NovaBanco customer',
    'ben.filter_todos':           'All',
    'ben.filter_gastronomia':     '🍔 Dining',
    'ben.filter_viajes':          '✈️ Travel',
    'ben.filter_tech':            '💻 Technology',
    'ben.filter_salud':           '🏥 Health',
    'ben.filter_entretenimiento': '🎬 Entertainment',
    'ben.empty':                  'No benefits in this category.',
    // Modal
    'modal.title':           'Download summary',
    'modal.desc':            'Select the period and format you want to download.',
    'modal.junio_label':     'June 2026',
    'modal.junio_sub':       'June 1 to 22',
    'modal.mayo_label':      'May 2026',
    'modal.mayo_sub':        'Full month — 38 transactions',
    'modal.q2_label':        'Q2 2026',
    'modal.q2_sub':          'April, May and June',
    'modal.cancel':          'Cancel',
    'modal.download_btn':    'Download PDF',
    'modal.generating':      'Generating your summary',
    'modal.generating_desc': 'This takes a few seconds...',
    'modal.done_title':      'Done!',
    'modal.done_desc':       'Your summary was downloaded successfully. You can find it in your Downloads folder.',
    'modal.close':           'Close',
    // Download steps
    'dl.step1': 'Fetching transactions...',
    'dl.step2': 'Applying format...',
    'dl.step3': 'Generating PDF...',
    'dl.step4': 'Verifying document...',
    'dl.step5': 'Done!',
  },
};


/* ============================================================
   I18n  (T05)
   ============================================================ */

const I18n = (() => {

  let activeLocale = 'es';

  function t(key, params) {
    const text = (LOCALES[activeLocale] && LOCALES[activeLocale][key]) ||
                 LOCALES.es[key] ||
                 key;
    if (!params) return text;
    return text.replace(/\{(\w+)\}/g, (m, k) => (k in params ? params[k] : m));
  }

  function getLocale() { return activeLocale; }

  function applyToDOM() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      el.placeholder = t(el.dataset.i18nPlaceholder);
    });
  }

  function setLocale(lang) {
    if (!LOCALES[lang]) return;
    activeLocale = lang;
    try { localStorage.setItem('novabanco-locale', lang); } catch(e) {}

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    applyToDOM();
    Dashboard.render();
    Movements.render();
    Beneficios.filter(Beneficios.getActiveCategory());
    Router.refreshTitle();
  }

  function init() {
    try {
      const saved = localStorage.getItem('novabanco-locale');
      if (saved && LOCALES[saved]) activeLocale = saved;
    } catch(e) {}
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === activeLocale);
    });
    applyToDOM();
  }

  return { t, getLocale, setLocale, applyToDOM, init };

})();


/* ============================================================
   DATA
   En un proyecto real esto vendría de una API REST.
   ============================================================ */

const DATA = {

  user: {
    // name, initials y balance los llena Cuenta (js/features/cuenta.js) desde Supabase.
    name:    '',
    initials:'',
    account: 'Caja de ahorro',
    balance: 0,
    card: {
      last4:  '4821',
      expiry: '09/28',
      brand:  'VISA',
      limit:  850000,
    },
  },

  // Cada item: { id, name, category, created_at, amount, icon, color } (lo arma Cuenta).
  movements: [],

  beneficios: [
    {
      id:1, title:'30% OFF todos los pedidos',
      desc:'Descuento exclusivo para clientes NovaBanco pagando con tu tarjeta Visa.',
      tag:'Gastronomía', emoji:'🍔', bg:'#1a0a00', vto:'Vence 30 jun',
      category:'gastronomia', badge:'badge-success', badgeText:'Activo',
    },
    {
      id:2, title:'Puntos dobles en vuelos',
      desc:'Acumulá el doble de puntos en todas tus compras de vuelos durante julio.',
      tag:'Viajes', emoji:'✈️', bg:'#000a1a', vto:'Todo julio',
      category:'viajes', badge:'badge-info', badgeText:'Nuevo',
    },
    {
      id:3, title:'15% OFF en Frávega',
      desc:'Comprá electrónica y electrodomésticos con descuento directo.',
      tag:'Tecnología', emoji:'💻', bg:'#0a0a1a', vto:'Vence 15 jul',
      category:'tech', badge:'badge-success', badgeText:'Activo',
    },
    {
      id:4, title:'2x1 en Cinemark',
      desc:'Llevate dos entradas al precio de una los días martes y miércoles.',
      tag:'Entretenimiento', emoji:'🎬', bg:'#1a000a', vto:'Permanente',
      category:'entretenimiento', badge:'badge-success', badgeText:'Activo',
    },
    {
      id:5, title:'Consultas médicas sin costo',
      desc:'Accedé a teleconsultas ilimitadas con médicos clínicos y especialistas.',
      tag:'Salud', emoji:'🏥', bg:'#001a0a', vto:'Incluido en tu cuenta',
      category:'salud', badge:'badge-success', badgeText:'Activo',
    },
    {
      id:6, title:'20% en restaurantes adheridos',
      desc:'Más de 500 restaurantes en todo el país con descuento directo.',
      tag:'Gastronomía', emoji:'🍽️', bg:'#1a0a00', vto:'Vence 31 jul',
      category:'gastronomia', badge:'badge-warning', badgeText:'Por vencer',
    },
    {
      id:7, title:'Seguro de viaje gratis',
      desc:'Cobertura internacional sin costo adicional al comprar tu pasaje con tu tarjeta.',
      tag:'Viajes', emoji:'🌎', bg:'#000a1a', vto:'Siempre activo',
      category:'viajes', badge:'badge-success', badgeText:'Activo',
    },
    {
      id:8, title:'HBO Max incluido',
      desc:'3 meses de HBO Max sin costo al activar tu tarjeta NovaBanco Black.',
      tag:'Entretenimiento', emoji:'📱', bg:'#0a001a', vto:'Oferta limitada',
      category:'entretenimiento', badge:'badge-danger', badgeText:'Últimas unidades',
    },
  ],

};


/* ============================================================
   UTILS
   ============================================================ */

function formatARS(amount) {
  return '$' + Math.abs(amount).toLocaleString('es-AR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

function formatAmountSigned(amount) {
  return (amount < 0 ? '-' : '+') + formatARS(amount);
}

function escapeHTML(value) {
  return String(value == null ? '' : value).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

function safeColor(value, fallback) {
  return /^#[0-9a-fA-F]{6}$/.test(value) ? value : fallback;
}

// created_at (ISO) -> "22 jun" / "22 Jun" según el idioma activo
function formatMovDate(iso) {
  const d = new Date(iso);
  if (isNaN(d)) return '';
  const tag = I18n.getLocale() === 'en' ? 'en-GB' : 'es-AR';
  const parts = new Intl.DateTimeFormat(tag, { day: '2-digit', month: 'short' }).formatToParts(d);
  const day   = (parts.find(p => p.type === 'day')   || {}).value || '';
  const month = (parts.find(p => p.type === 'month') || {}).value || '';
  return `${day} ${month.replace('.', '')}`.trim();
}

function getTodayLabel() {
  return new Date().toLocaleDateString('es-AR', {
    weekday: 'long',
    day:     'numeric',
    month:   'long',
    year:    'numeric',
  });
}


/* ============================================================
   ROUTER  (T09 — usa I18n.t() para títulos)
   ============================================================ */

const Router = (() => {

  const VIEW_TITLE_KEYS = {
    dashboard:   'nav.dashboard',
    movimientos: 'nav.movimientos',
    beneficios:  'nav.beneficios',
  };

  let currentView = 'dashboard';

  function navigate(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.nav-item[data-view]').forEach(n => n.classList.remove('active'));

    const view = document.getElementById('view-' + viewId);
    if (!view) { console.warn(`Router: vista "${viewId}" no encontrada`); return; }
    view.classList.add('active');

    const navItem = document.querySelector(`.nav-item[data-view="${viewId}"]`);
    if (navItem) navItem.classList.add('active');

    currentView = viewId;
    const titleEl = document.getElementById('topbar-title');
    if (titleEl) titleEl.textContent = I18n.t(VIEW_TITLE_KEYS[viewId] || viewId);
  }

  function refreshTitle() {
    const titleEl = document.getElementById('topbar-title');
    if (titleEl) titleEl.textContent = I18n.t(VIEW_TITLE_KEYS[currentView] || currentView);
  }

  return { navigate, refreshTitle };

})();


/* ============================================================
   THEME  (T02)
   ============================================================ */

const Theme = (() => {

  const MOON_SVG = `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>`;

  const SUN_SVG = `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>`;

  function getTheme() {
    return document.documentElement.dataset.theme || 'dark';
  }

  function updateIcon() {
    const btn = document.getElementById('theme-toggle-btn');
    if (!btn) return;
    btn.innerHTML = getTheme() === 'dark' ? MOON_SVG : SUN_SVG;
  }

  function toggle() {
    const next = getTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('novabanco-theme', next); } catch(e) {}
    updateIcon();
  }

  function init() {
    updateIcon();
  }

  return { init, toggle };

})();


/* ============================================================
   DASHBOARD MODULE  (T08 — render() usa I18n.t())
   ============================================================ */

const Dashboard = (() => {

  function renderBalance() {
    const el = document.getElementById('balance-amount');
    if (!el) return;
    const [int, dec] = DATA.user.balance.toLocaleString('es-AR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).split(',');
    el.innerHTML = `<span class="balance-currency">$</span>${int}<span style="font-size:24px;opacity:.5">,${dec}</span>`;
  }

  function renderTarjeta() {
    const el = document.getElementById('tarjeta-limit');
    if (el) el.textContent = formatARS(DATA.user.card.limit);
  }

  function renderUser() {
    const u = DATA.user;
    const setText = (id, text) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    };
    setText('user-initials', u.initials);
    setText('user-name', u.name);
    setText('dashboard-greeting', I18n.t('dashboard.greeting', { name: u.name.split(' ')[0] }));
    setText('tarjeta-holder', u.name.toUpperCase());

    const last = DATA.movements[0];
    const wrap = document.getElementById('last-movement');
    if (wrap) {
      wrap.hidden = !last;
      setText('last-movement-text', last
        ? `${formatMovDate(last.created_at)} — ${last.name} ${formatAmountSigned(last.amount)}`
        : '');
    }
  }

  function renderRecentMovements() {
    const container = document.getElementById('recent-movements');
    if (!container) return;

    if (DATA.movements.length === 0) {
      container.innerHTML = `<p class="movement-empty">${escapeHTML(I18n.t('dashboard.no_movements'))}</p>`;
      return;
    }

    container.innerHTML = DATA.movements.slice(0, 5).map(m => `
      <div class="movement-item">
        <div class="movement-icon" style="background:${safeColor(m.color, '#8E8E93')}22">${escapeHTML(m.icon)}</div>
        <div class="movement-info">
          <div class="movement-name">${escapeHTML(m.name)}</div>
          <div class="movement-date">${escapeHTML(m.category)} · ${escapeHTML(formatMovDate(m.created_at))}</div>
        </div>
        <div class="movement-amount ${m.amount < 0 ? 'debit' : 'credit'}">
          ${formatAmountSigned(m.amount)}
        </div>
      </div>
    `).join('');
  }

  function render() {
    const subtitleEl = document.getElementById('dashboard-date');
    if (subtitleEl) subtitleEl.textContent = getTodayLabel();
    renderUser();
    renderBalance();
    renderTarjeta();
    renderRecentMovements();
  }

  return { render };

})();


/* ============================================================
   MOVEMENTS MODULE  (T09 — renderTable/renderStats usan I18n.t())
   ============================================================ */

const Movements = (() => {

  let filterText     = '';
  let filterCategory = '';

  function getFiltered() {
    return DATA.movements.filter(m => {
      const matchText = !filterText ||
        m.name.toLowerCase().includes(filterText.toLowerCase()) ||
        m.category.toLowerCase().includes(filterText.toLowerCase());
      const matchCat = !filterCategory || m.category === filterCategory;
      return matchText && matchCat;
    });
  }

  function renderTable(data) {
    const tbody = document.getElementById('movements-tbody');
    if (!tbody) return;

    if (data.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align:center;padding:40px;color:var(--text-muted)">
            ${I18n.t('mov.empty')}
          </td>
        </tr>`;
      return;
    }

    tbody.innerHTML = data.map(m => `
      <tr>
        <td class="tx-icon-cell">
          <div class="tx-icon" style="background:${safeColor(m.color, '#8E8E93')}22">${escapeHTML(m.icon)}</div>
        </td>
        <td><div class="tx-name">${escapeHTML(m.name)}</div></td>
        <td><span class="badge badge-info">${escapeHTML(m.category)}</span></td>
        <td class="tx-date">${escapeHTML(formatMovDate(m.created_at))}</td>
        <td style="text-align:right">
          <span class="tx-amount ${m.amount < 0 ? 'debit' : 'credit'}">
            ${formatAmountSigned(m.amount)}
          </span>
        </td>
        <td style="text-align:center">
          <span class="badge badge-success">${I18n.t('mov.status_credited')}</span>
        </td>
      </tr>
    `).join('');
  }

  function renderStats() {
    const debits  = DATA.movements.filter(m => m.amount < 0).reduce((s, m) => s + m.amount, 0);
    const credits = DATA.movements.filter(m => m.amount > 0).reduce((s, m) => s + m.amount, 0);

    const debitsEl  = document.getElementById('stats-debits');
    const creditsEl = document.getElementById('stats-credits');
    const countEl   = document.getElementById('stats-count');

    if (debitsEl)  debitsEl.textContent  = formatAmountSigned(debits);
    if (creditsEl) creditsEl.textContent = formatAmountSigned(credits);
    if (countEl)   countEl.textContent   = DATA.movements.length;
  }

  function onSearchInput(value) {
    filterText = value;
    renderTable(getFiltered());
  }

  function onCategoryChange(value) {
    filterCategory = value;
    renderTable(getFiltered());
  }

  function render() {
    renderStats();
    renderTable(getFiltered());
  }

  return { render, onSearchInput, onCategoryChange };

})();


/* ============================================================
   BENEFICIOS MODULE  (T09 — empty state usa I18n.t(); expone getActiveCategory)
   ============================================================ */

const Beneficios = (() => {

  let activeCategory = 'todos';

  function renderGrid(cat) {
    const grid = document.getElementById('beneficios-grid');
    if (!grid) return;

    const data = (cat === 'todos')
      ? DATA.beneficios
      : DATA.beneficios.filter(b => b.category === cat);

    if (data.length === 0) {
      grid.innerHTML = `<p style="color:var(--text-muted);padding:20px 0">${I18n.t('ben.empty')}</p>`;
      return;
    }

    grid.innerHTML = data.map(b => `
      <div class="beneficio-card">
        <div class="beneficio-img" style="background:${b.bg}">${b.emoji}</div>
        <div class="beneficio-body">
          <div class="beneficio-tag">${b.tag}</div>
          <div class="beneficio-title">${b.title}</div>
          <div class="beneficio-desc">${b.desc}</div>
          <div class="beneficio-footer">
            <span class="beneficio-vto">⏱ ${b.vto}</span>
            <span class="badge ${b.badge}">${b.badgeText}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  function filter(cat) {
    activeCategory = cat;

    document.querySelectorAll('.beneficios-filter-bar .btn').forEach(btn => {
      btn.className = 'btn btn-secondary';
    });
    const activeBtn = document.getElementById('filter-' + cat);
    if (activeBtn) activeBtn.className = 'btn btn-primary';

    renderGrid(cat);
  }

  function getActiveCategory() { return activeCategory; }

  function init() {
    renderGrid('todos');
  }

  return { init, filter, getActiveCategory };

})();


/* ============================================================
   MODAL MODULE  (T09 — pasos de descarga usan I18n.t() en tiempo de ejecución)
   ============================================================ */

const Modal = (() => {

  function getDownloadSteps() {
    return [
      { pct: 15,  text: I18n.t('dl.step1') },
      { pct: 40,  text: I18n.t('dl.step2') },
      { pct: 65,  text: I18n.t('dl.step3') },
      { pct: 85,  text: I18n.t('dl.step4') },
      { pct: 100, text: I18n.t('dl.step5') },
    ];
  }

  function open() {
    showSection('modal-form-content');
    document.getElementById('modal-overlay').classList.add('open');
  }

  function close() {
    document.getElementById('modal-overlay').classList.remove('open');
  }

  function closeOnOverlayClick(event) {
    if (event.target === document.getElementById('modal-overlay')) close();
  }

  function showSection(id) {
    ['modal-form-content', 'modal-download-content', 'modal-done-content']
      .forEach(sId => {
        const el = document.getElementById(sId);
        if (el) el.style.display = (sId === id ? 'block' : 'none');
      });
  }

  function startDownload() {
    showSection('modal-download-content');

    const fill  = document.getElementById('progress-fill');
    const label = document.getElementById('progress-label');
    const steps = getDownloadSteps();
    let step    = 0;

    fill.style.width = '0%';

    function tick() {
      if (step >= steps.length) {
        setTimeout(() => showSection('modal-done-content'), 400);
        return;
      }
      fill.style.width  = steps[step].pct + '%';
      label.textContent = steps[step].text;
      step++;
      setTimeout(tick, 600);
    }

    setTimeout(tick, 200);
  }

  return { open, close, closeOnOverlayClick, startDownload };

})();


/* ============================================================
   INIT  (T10 — incluye I18n.init(), Theme.init(), window.toggleTheme, window.switchLocale)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  I18n.init();
  Theme.init();
  Dashboard.render();
  Movements.render();
  Beneficios.init();

  window.navigate          = (v)   => Router.navigate(v);
  window.openModal         = ()    => Modal.open();
  window.closeModal        = ()    => Modal.close();
  window.closeModalOutside = (e)   => Modal.closeOnOverlayClick(e);
  window.startDownload     = ()    => Modal.startDownload();
  window.filterMovements   = (v)   => Movements.onSearchInput(v);
  window.filterByCategory  = (v)   => Movements.onCategoryChange(v);
  window.filterBeneficios  = (cat) => Beneficios.filter(cat);
  window.toggleTheme       = ()    => Theme.toggle();
  window.switchLocale      = (l)   => I18n.setLocale(l);

});
