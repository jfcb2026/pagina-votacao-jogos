
const NAV_ICON_VOTACAO = '<svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><polyline points="8 12 11 15 16 9"></polyline></svg>';
const NAV_ICON_HABITUAIS = '<svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>';
const NAV_ICON_NAO_JOGADOS = '<svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>';
const NAV_ICON_WISHLIST = '<svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 7.5c-1.2-1.5-3-2.5-5-2.5-3.6 0-6.5 3.1-6.5 7s2.9 7 6.5 7c2 0 3.8-1 5-2.5"></path><line x1="3" y1="10" x2="13" y2="10"></line><line x1="3" y1="14" x2="12" y2="14"></line></svg>';
const NAV_ICON_EVENTOS = '<svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11"></path><rect x="3" y="11" width="18" height="6" rx="2"></rect><circle cx="7.5" cy="17.5" r="1.5"></circle><circle cx="16.5" cy="17.5" r="1.5"></circle></svg>';
const NAV_ICON_LINKS = '<svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7-7l-1.5 1.5"></path><path d="M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7 7l1.5-1.5"></path></svg>';
const NAV_ICON_VOTACAO_DIA = '<svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><path d="M8 14l2 2 4-4"></path></svg>';

const NAV_ITEMS = [
  { href: "votacao-semanal.html", label: "Votação do Jogo Semanal", icon: NAV_ICON_VOTACAO },
  { href: "jogos-habituais.html", label: "Jogos Habituais", icon: NAV_ICON_HABITUAIS },
  { href: "jogos-nao-jogados.html", label: "Jogos ainda não jogados", icon: NAV_ICON_NAO_JOGADOS },
  { href: "wishlist.html", label: "Wishlist de Jogos Pagos", icon: NAV_ICON_WISHLIST },
  { href: "votacao-dia.html", label: "Votação do Dia de Jogo", icon: NAV_ICON_VOTACAO_DIA },
  { href: "links.html", label: "Links", icon: NAV_ICON_LINKS },
  { href: "passeios.html", label: "Passeios", icon: NAV_ICON_EVENTOS },
];

const DEFAULT_DATA = {
  membros: [
    "Membro 1", "Membro 2", "Membro 3", "Membro 4",
    "Membro 5", "Membro 6", "Membro 7", "Membro 8",
  ],
  jogosHabituais: [],
  jogosNaoJogados: [],
  wishlist: [],
  eventos: [],
  colunasHabituais: [
    { id: "jogo", label: "Jogo", core: true },
    { id: "jogadores", label: "Jogadores" },
    { id: "dispositivo", label: "Dispositivo" },
    { id: "link", label: "Link" },
  ],
  colunasNaoJogados: [
    { id: "nome", label: "Nome do jogo", core: true },
    { id: "info", label: "Número Jogadores + Informação" },
    { id: "link", label: "Link" },
  ],
  colunasWishlist: [
    { id: "jogo", label: "Jogo", core: true },
    { id: "link", label: "Link" },
  ],
  colunasEventos: [
    { id: "descricao", label: "Descrição", core: true },
  ],
  links: [],
  colunasLinks: [
    { id: "nome", label: "Nome", core: true },
    { id: "link", label: "Link" },
  ],
  passwordOverride: null,
  votacaoSemanal: { slots: 2, votos: {}, validado: false, confirmado: false, vencedorSorteado: null },
  historicoVencedores: [],
  votacaoDia: { voto: {}, aplicado: false },
  horarioJogo: "21h",
  diaSemanaJogo: 4,
  tema: "midnight",
  temaSazonal: "nenhum",
  musicaSazonal: "nenhuma",
  avatares: {},
  nomeSite: "Página De Jogos De Amigos",
};

const THEME_GROUPS = [
  { id: "escuro", label: "Tons Escuros" },
  { id: "vivo", label: "Tons Vivos (alto contraste, cor no cabeçalho/cards)" },
];

const THEMES = [
  { id: "midnight", label: "Midnight", tag: "Padrão", group: "escuro", colors: ["#0f1220", "#6c8cff", "#1c2138"] },
  { id: "aurora", label: "Aurora", tag: "Roxo", group: "escuro", colors: ["#140f24", "#a875ff", "#251d3d"] },
  { id: "ocean", label: "Ocean", tag: "Azul-turquesa", group: "escuro", colors: ["#0a1620", "#33c4d6", "#132a3d"] },
  { id: "sunset", label: "Sunset", tag: "Coral", group: "escuro", colors: ["#1c1210", "#ff7a55", "#33211d"] },
  { id: "forest", label: "Forest", tag: "Verde", group: "escuro", colors: ["#0e1712", "#4fbf76", "#1a2a1f"] },
  { id: "rose", label: "Rosé", tag: "Rosa", group: "escuro", colors: ["#1a0f16", "#ff5fa2", "#2f1c2a"] },
  { id: "frost-vivo", label: "Frost Pop", tag: "Azul", group: "vivo", colors: ["#ffffff", "#264fe0", "#17359a"] },
  { id: "citrus-vivo", label: "Citrus Pop", tag: "Laranja", group: "vivo", colors: ["#ffffff", "#e67700", "#a85800"] },
  { id: "berry-vivo", label: "Berry Pop", tag: "Magenta", group: "vivo", colors: ["#ffffff", "#9c1ec2", "#6e1589"] },
  { id: "mint-vivo", label: "Mint Pop", tag: "Verde", group: "vivo", colors: ["#ffffff", "#00994f", "#00703a"] },
  { id: "coral-vivo", label: "Coral Pop", tag: "Vermelho", group: "vivo", colors: ["#ffffff", "#e8341f", "#a82615"] },
  { id: "graphite-vivo", label: "Graphite Pop", tag: "Roxo", group: "vivo", colors: ["#ffffff", "#4a1adb", "#33109c"] },
];

function getActiveTheme() {
  return loadStore("tema") || "midnight";
}

function applyTheme(themeId) {
  const tema = themeId || getActiveTheme();
  document.documentElement.setAttribute("data-theme", tema);
}

applyTheme();

const SEASONAL_THEMES = [
  { id: "nenhum", label: "Nenhum", icon: "🚫" },
  {
    id: "halloween",
    label: "Halloween",
    icon: "🎃",
    tracks: [
      {
        id: "wtf-ghost",
        title: "WTF! Ghost!",
        author: "Alexandr Zhelanov",
        file: "assets/audio/halloween/wtf-ghost.mp3",
        sourceUrl: "https://opengameart.org/content/wtf-ghost",
        authorUrl: "https://soundcloud.com/alexandr-zhelanov",
        license: "CC BY 3.0",
        licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
      },
    ],
  },
];

function getActiveSeasonalTheme() {
  return loadStore("temaSazonal") || "nenhum";
}

function applySeasonalTheme(temaId) {
  const tema = temaId || getActiveSeasonalTheme();
  if (tema && tema !== "nenhum") {
    document.documentElement.setAttribute("data-season", tema);
  } else {
    document.documentElement.removeAttribute("data-season");
  }
}

applySeasonalTheme();

const WEEKDAY_NAMES = [
  "Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira",
  "Quinta-Feira", "Sexta-Feira", "Sábado",
];

function formatDatePT(date) {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

function nextGameDateLabel(diaSemana, fromDate) {
  const d = fromDate ? new Date(fromDate) : new Date();
  d.setHours(0, 0, 0, 0);
  for (let i = 0; i < 7; i++) {
    if (d.getDay() === diaSemana) break;
    d.setDate(d.getDate() + 1);
  }
  return `${WEEKDAY_NAMES[d.getDay()]}, ${formatDatePT(d)}`;
}

function storageKey(name) { return "jogosAmigos_" + name; }

const _memoryStore = {};

function loadStore(name) {
  try {
    const raw = localStorage.getItem(storageKey(name));
    if (raw !== null) {
      try { return JSON.parse(raw); } catch (e) { }
    }
  } catch (e) {
    if (name in _memoryStore) return _memoryStore[name];
  }
  const seed = JSON.parse(JSON.stringify(DEFAULT_DATA[name]));
  try {
    localStorage.setItem(storageKey(name), JSON.stringify(seed));
  } catch (e) {
    _memoryStore[name] = seed;
  }
  return seed;
}

function saveStore(name, data) {
  try {
    localStorage.setItem(storageKey(name), JSON.stringify(data));
  } catch (e) {
    _memoryStore[name] = data;
  }
  pushToCloud(name, data);
}

function resetStore(name) {
  saveStore(name, JSON.parse(JSON.stringify(DEFAULT_DATA[name])));
}

function emptyStore(name, emptyValue) {
  saveStore(name, emptyValue);
}

const CLOUD_SYNC_KEYS = [
  "membros", "jogosHabituais", "jogosNaoJogados", "wishlist", "eventos", "links",
  "colunasHabituais", "colunasNaoJogados", "colunasWishlist", "colunasEventos", "colunasLinks",
  "votacaoSemanal", "historicoVencedores", "votacaoDia", "diaSemanaJogo", "horarioJogo",
  "nomeSite", "passwordOverride", "temaSazonal", "musicaSazonal", "avatares",
];

let _cloudReady = false;

const _lastPushedAt = {};

const _ownTimestamps = {};

function registerOwnTimestamp(name, ts) {
  _lastPushedAt[name] = ts;
  const lista = _ownTimestamps[name] || (_ownTimestamps[name] = []);
  lista.push(ts);
  if (lista.length > 30) lista.shift();
}

function isOwnTimestamp(name, ts) {
  const lista = _ownTimestamps[name];
  return !!lista && lista.includes(ts);
}

function pushToCloud(name, data) {
  if (!CLOUD_SYNC_KEYS.includes(name)) return;
  if (!_cloudReady || typeof firebase === "undefined") return;
  const ts = Date.now();
  registerOwnTimestamp(name, ts);
  firebase.firestore().collection("jogosAmigos").doc(name)
    .set({ value: data, updatedAt: ts })
    .catch(() => { });
}

const _mergeInflight = {};

function saveStoreMerged(name, data, mutator) {
  try {
    localStorage.setItem(storageKey(name), JSON.stringify(data));
  } catch (e) {
    _memoryStore[name] = data;
  }
  if (!CLOUD_SYNC_KEYS.includes(name)) return;
  if (!_cloudReady || typeof firebase === "undefined") return;
  const db = firebase.firestore();
  const ref = db.collection("jogosAmigos").doc(name);
  const ts = Date.now();
  registerOwnTimestamp(name, ts);
  _mergeInflight[name] = (_mergeInflight[name] || 0) + 1;
  db.runTransaction(tx => tx.get(ref).then(snap => {
    const merged = snap.exists ? snap.data().value : JSON.parse(JSON.stringify(data));
    mutator(merged);
    tx.set(ref, { value: merged, updatedAt: ts });
    return merged;
  })).then(merged => {
    _mergeInflight[name]--;
    if (_mergeInflight[name] > 0) return;
    const json = JSON.stringify(merged);
    let atual = null;
    try { atual = localStorage.getItem(storageKey(name)); } catch (e) { }
    if (json !== atual) {
      try { localStorage.setItem(storageKey(name), json); } catch (e) { _memoryStore[name] = merged; }
      refreshFromCloud();
    }
  }).catch(() => {
    _mergeInflight[name]--;
    pushToCloud(name, data);
  });
}

function refreshFromCloud() {
  if (typeof reloadFromStore === "function") { try { reloadFromStore(); } catch (e) { } }
  if (typeof render === "function") { try { render(); } catch (e) { } }
}

const _cloudUnsubscribers = {};

function watchCloudKey(name) {
  _cloudUnsubscribers[name] = firebase.firestore().collection("jogosAmigos").doc(name).onSnapshot(snap => {
    if (!snap.exists) return;
    if (snap.metadata && snap.metadata.hasPendingWrites) return;
    const remote = snap.data();
    if (remote.updatedAt && isOwnTimestamp(name, remote.updatedAt)) return;
    localStorage.setItem(storageKey(name), JSON.stringify(remote.value));
    if (name === "temaSazonal") applySeasonalTheme(remote.value);
    if (name === "temaSazonal" || name === "musicaSazonal") updateSeasonalMusic();
    refreshFromCloud();
  }, () => { });
}

function isCloudSyncPaused() {
  try { return sessionStorage.getItem("jogosAmigos_cloudPaused") === "1"; } catch (e) { return false; }
}

function pauseCloudSync() {
  Object.keys(_cloudUnsubscribers).forEach(name => {
    try { _cloudUnsubscribers[name](); } catch (e) { }
  });
  _cloudReady = false;
  try { sessionStorage.setItem("jogosAmigos_cloudPaused", "1"); } catch (e) { }
}

function resumeCloudSync() {
  try { sessionStorage.removeItem("jogosAmigos_cloudPaused"); } catch (e) { }
  window.location.reload();
}

function initCloudSync() {
  try {
    if (isCloudSyncPaused()) return;
    if (typeof firebase === "undefined") return;
    if (!firebase.apps || !firebase.apps.length) return;
    const autenticado = isAuthenticated();
    firebase.auth().onAuthStateChanged(user => {
      if (!user) return;
      _cloudReady = true;
      if (autenticado) CLOUD_SYNC_KEYS.forEach(watchCloudKey);
    });
    firebase.auth().signInAnonymously().catch(() => { });

    try {
      if (autenticado && !sessionStorage.getItem("jogosAmigos_autoReloadDados")) {
        sessionStorage.setItem("jogosAmigos_autoReloadDados", "1");
        const main = document.querySelector("main");
        if (main) main.style.visibility = "hidden";
        window.addEventListener("load", () => {
          setTimeout(() => window.location.reload(), 900);
        });
      }
    } catch (e) { }
  } catch (e) { }
}

function pushAllToCloud() {
  CLOUD_SYNC_KEYS.forEach(name => pushToCloud(name, loadStore(name)));
}

initCloudSync();

async function sha256Hex(texto) {
  const bytes = new TextEncoder().encode(texto);
  const buffer = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, "0")).join("");
}

function getActivePassword() {
  const override = loadStore("passwordOverride");
  if (override) return override;
  return (typeof SITE_PASSWORD !== "undefined") ? SITE_PASSWORD : "alterar123";
}

async function setActivePassword(newPassword) {
  const hash = await sha256Hex(newPassword);
  saveStore("passwordOverride", hash);
}

async function verifyActivePassword(candidata) {
  const stored = loadStore("passwordOverride");
  const defaultPassword = "alterar123";
  try {
    const digest = await sha256Hex(candidata);
    const esperado = stored ? stored : await sha256Hex(defaultPassword);
    if (digest === esperado) return true;
    const pareceHash = v => /^[0-9a-f]{64}$/i.test(v);
    if (stored && !pareceHash(stored)) return candidata === stored;
    if (!stored) return candidata === defaultPassword;
    return false;
  } catch (e) {
    const legado = stored ? stored : defaultPassword;
    return candidata === legado;
  }
}

function isAuthenticated() {
  return sessionStorage.getItem("jogosAmigos_auth") === "ok";
}

function currentPageFile() {
  const path = window.location.pathname.split("/").pop();
  return path || "votacao-semanal.html";
}

function requireAuth() {
  if (!isAuthenticated()) {
    sessionStorage.setItem("jogosAmigos_redirect", currentPageFile());
    window.location.href = "index.html";
  }
}

function logout() {
  sessionStorage.removeItem("jogosAmigos_auth");
  window.location.href = "index.html";
}

function renameMemberEverywhere(oldName, newName) {
  const avatares = loadStore("avatares") || {};
  if (oldName in avatares) {
    avatares[newName] = avatares[oldName];
    delete avatares[oldName];
    saveStore("avatares", avatares);
  }
  const votacao = loadStore("votacaoSemanal");
  if (votacao.votos && oldName in votacao.votos) {
    votacao.votos[newName] = votacao.votos[oldName];
    delete votacao.votos[oldName];
    if (votacao.desempate && Array.isArray(votacao.desempate.membros)) {
      votacao.desempate.membros = votacao.desempate.membros.map(m => m === oldName ? newName : m);
    }
    saveStore("votacaoSemanal", votacao);
  }
  const votacaoDia = loadStore("votacaoDia");
  if (votacaoDia.voto && oldName in votacaoDia.voto) {
    votacaoDia.voto[newName] = votacaoDia.voto[oldName];
    delete votacaoDia.voto[oldName];
    saveStore("votacaoDia", votacaoDia);
  }
  const wishlist = loadStore("wishlist");
  wishlist.forEach(j => {
    if (j.reacoes && oldName in j.reacoes) {
      j.reacoes[newName] = j.reacoes[oldName];
      delete j.reacoes[oldName];
    }
  });
  saveStore("wishlist", wishlist);

  const eventos = loadStore("eventos");
  eventos.forEach(ev => {
    if (ev.respostas && oldName in ev.respostas) {
      ev.respostas[newName] = ev.respostas[oldName];
      delete ev.respostas[oldName];
    }
  });
  saveStore("eventos", eventos);
}

function removeMemberEverywhere(name) {
  const avatares = loadStore("avatares") || {};
  if (name in avatares) { delete avatares[name]; saveStore("avatares", avatares); }

  const votacao = loadStore("votacaoSemanal");
  if (votacao.votos) { delete votacao.votos[name]; saveStore("votacaoSemanal", votacao); }

  const votacaoDia = loadStore("votacaoDia");
  if (votacaoDia.voto) { delete votacaoDia.voto[name]; saveStore("votacaoDia", votacaoDia); }

  const wishlist = loadStore("wishlist");
  wishlist.forEach(j => { if (j.reacoes) delete j.reacoes[name]; });
  saveStore("wishlist", wishlist);

  const eventos = loadStore("eventos");
  eventos.forEach(ev => { if (ev.respostas) delete ev.respostas[name]; });
  saveStore("eventos", eventos);
}

function renderHeader(activeHref) {
  const header = document.createElement("header");
  header.className = "site-header";

  header.innerHTML = `
    <div class="header-top">
      <button type="button" class="menu-toggle" id="menu-toggle" aria-label="Abrir menu" aria-expanded="false">${MENU_ICON}</button>
      <a href="votacao-semanal.html" class="site-title">🎮 ${escapeHtml(loadStore("nomeSite"))}</a>
      <div class="member-picker">
        <a href="backoffice.html" class="btn small">Backoffice${SETTINGS_ICON}</a>
        <button id="logout-btn" class="small">Sair${LOGOUT_ICON}</button>
      </div>
    </div>
    <nav class="main-nav" id="main-nav"></nav>
  `;

  const nav = header.querySelector(".main-nav");
  NAV_ITEMS.forEach(item => {
    const a = document.createElement("a");
    a.href = item.href;
    a.innerHTML = `${item.icon}${escapeHtml(item.label)}`;
    if (item.href === activeHref) a.classList.add("active");
    nav.appendChild(a);
  });

  const menuToggle = header.querySelector("#menu-toggle");
  const closeMenu = () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.innerHTML = MENU_ICON;
  };
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    menuToggle.innerHTML = isOpen ? CLOSE_ICON : MENU_ICON;
  });
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));

  header.querySelector("#logout-btn").addEventListener("click", logout);

  document.body.prepend(header);
}

function renderBackofficeHeader() {
  const header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML = `
    <div class="header-top">
      <span class="site-title">🛠️ Backoffice</span>
      <div class="member-picker">
        <a href="votacao-semanal.html" class="btn small">← Voltar ao site</a>
        <button id="logout-btn" class="small">Sair${LOGOUT_ICON}</button>
      </div>
    </div>
  `;
  header.querySelector("#logout-btn").addEventListener("click", logout);
  document.body.prepend(header);
}

function localPrefGet(chave) {
  try { return localStorage.getItem("jogosAmigos_local_" + chave); } catch (e) { return null; }
}

function localPrefSet(chave, valor) {
  try { localStorage.setItem("jogosAmigos_local_" + chave, valor); } catch (e) { }
}

let _seasonAudio = null;
let _seasonTrackId = null;
let _seasonPlayerEl = null;
let _seasonPosBound = false;

function getSeasonalTrack() {
  const tema = SEASONAL_THEMES.find(t => t.id === getActiveSeasonalTheme());
  if (!tema || !tema.tracks) return null;
  const id = loadStore("musicaSazonal");
  return tema.tracks.find(t => t.id === id) || null;
}

function seasonalCreditHtml(track) {
  const link = (url, texto) => `<a href="${escapeHtml(url)}" target="_blank" rel="noopener">${escapeHtml(texto)}</a>`;
  return `♪ ${link(track.sourceUrl, track.title)} · ${link(track.authorUrl, track.author)} · ${link(track.licenseUrl, track.license)}`;
}

function saveSeasonalPos() {
  if (!_seasonAudio || !_seasonTrackId) return;
  localPrefSet("musicaPos", JSON.stringify({
    id: _seasonTrackId,
    t: _seasonAudio.currentTime,
    at: Date.now(),
    tocava: !_seasonAudio.paused,
  }));
}

function setSeasonalPlayerState(aTocar) {
  if (!_seasonPlayerEl) return;
  const btn = _seasonPlayerEl.querySelector(".season-player-btn");
  const texto = aTocar ? "Silenciar música" : "Ativar música";
  btn.innerHTML = aTocar ? VOLUME_ICON : VOLUME_X_ICON;
  btn.setAttribute("aria-label", texto);
  btn.setAttribute("aria-pressed", aTocar ? "true" : "false");
  btn.title = texto;
}

function removeSeasonalPlayer() {
  if (_seasonAudio) { try { _seasonAudio.pause(); } catch (e) { } }
  if (_seasonPlayerEl) _seasonPlayerEl.remove();
  document.body.classList.remove("has-season-player");
  _seasonAudio = null;
  _seasonTrackId = null;
  _seasonPlayerEl = null;
}

function updateSeasonalMusic() {
  const track = getSeasonalTrack();
  if (!track) { removeSeasonalPlayer(); return; }
  if (_seasonTrackId === track.id && _seasonPlayerEl && document.body.contains(_seasonPlayerEl)) return;

  removeSeasonalPlayer();
  _seasonTrackId = track.id;

  const audio = new Audio(track.file);
  audio.loop = true;
  audio.volume = 0.3;
  audio.preload = "metadata";
  _seasonAudio = audio;

  const el = document.createElement("div");
  el.className = "season-player";
  el.innerHTML = `<button type="button" class="season-player-btn"></button><span class="season-player-credit">${seasonalCreditHtml(track)}</span>`;
  document.body.appendChild(el);
  document.body.classList.add("has-season-player");
  _seasonPlayerEl = el;
  setSeasonalPlayerState(false);

  audio.addEventListener("play", () => setSeasonalPlayerState(true));
  audio.addEventListener("pause", () => setSeasonalPlayerState(false));

  el.querySelector(".season-player-btn").addEventListener("click", () => {
    if (audio.paused) {
      audio.play().then(() => localPrefSet("musicaLigada", "1")).catch(() => { });
    } else {
      audio.pause();
      localPrefSet("musicaLigada", "0");
    }
  });

  if (localPrefGet("musicaLigada") === "1") {
    let pos = null;
    try { pos = JSON.parse(localPrefGet("musicaPos")); } catch (e) { }
    const iniciar = () => {
      if (pos && pos.id === track.id && isFinite(audio.duration) && audio.duration > 0) {
        const extra = pos.tocava ? (Date.now() - pos.at) / 1000 : 0;
        audio.currentTime = (pos.t + extra) % audio.duration;
      }
      audio.play().catch(() => { });
    };
    if (audio.readyState >= 1) iniciar();
    else audio.addEventListener("loadedmetadata", iniciar, { once: true });
  }

  if (!_seasonPosBound) {
    _seasonPosBound = true;
    window.addEventListener("pagehide", saveSeasonalPos);
    document.addEventListener("visibilitychange", () => { if (document.hidden) saveSeasonalPos(); });
  }
}

function initPage(activeHref) {
  requireAuth();
  if (activeHref === "backoffice.html") {
    renderBackofficeHeader();
  } else {
    renderHeader(activeHref);
  }
  initFreezePanes();
  updateSeasonalMusic();
}

function updateFreezePanesHeight() {
  document.querySelectorAll(".table-scroll.freeze-panes").forEach(el => {
    const top = el.getBoundingClientRect().top + window.scrollY;
    const h = Math.max(260, Math.round(window.innerHeight - top - 40));
    const atual = parseInt(el.style.maxHeight, 10);
    if (atual !== h) el.style.maxHeight = h + "px";
  });
}

function initFreezePanes() {
  if (!document.querySelector(".table-scroll.freeze-panes")) return;
  updateFreezePanesHeight();
  window.addEventListener("resize", updateFreezePanesHeight);
  window.addEventListener("load", updateFreezePanesHeight);
  if (typeof ResizeObserver !== "undefined") {
    let pendente = false;
    new ResizeObserver(() => {
      if (pendente) return;
      pendente = true;
      requestAnimationFrame(() => { pendente = false; updateFreezePanesHeight(); });
    }).observe(document.querySelector("main"));
  }
}

const TRASH_ICON = '<svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path></svg>';

const LOGOUT_ICON = '<svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>';

const SETTINGS_ICON = '<svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>';

const MENU_ICON = '<svg class="menu-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
const CLOSE_ICON = '<svg class="menu-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';

const CHECK_ICON = '<svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>';

const REFRESH_ICON = '<svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>';

const UNLOCK_ICON = '<svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path></svg>';

const LOCK_ICON = '<svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>';

const IMPORT_ICON = '<svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>';

const EXPORT_ICON = '<svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>';

const PLUS_ICON = '<svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';

const SAVE_ICON = '<svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>';

const MIGRATE_ICON = '<svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>';

const CALENDAR_ICON = '<svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>';

const DICE_ICON = '<svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3" ry="3"></rect><circle cx="8" cy="8" r="1.2" fill="currentColor" stroke="none"></circle><circle cx="16" cy="8" r="1.2" fill="currentColor" stroke="none"></circle><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"></circle><circle cx="8" cy="16" r="1.2" fill="currentColor" stroke="none"></circle><circle cx="16" cy="16" r="1.2" fill="currentColor" stroke="none"></circle></svg>';

const CLOUD_UPLOAD_ICON = '<svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 18H6a4 4 0 0 1-1-7.87A5.5 5.5 0 0 1 15.9 6.34 4.5 4.5 0 0 1 19 15h0"></path><polyline points="12 12 12 21"></polyline><polyline points="9 15 12 12 15 15"></polyline></svg>';
const ROTATE_ICON = '<svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"></path><path d="M21 3v5h-5"></path></svg>';

const STOP_ICON = '<svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><rect x="9" y="9" width="6" height="6" fill="currentColor" stroke="none"></rect></svg>';
const EXTERNAL_LINK_ICON = '<svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>';
const VOLUME_ICON = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>';

const VOLUME_X_ICON = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>';

const EDIT_ICON = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>';

const X_ICON = '<svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>';

function escapeHtml(str) {
  return String(str ?? "").replace(/[&<>"']/g, s => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[s]));
}

function downloadJson(filename, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
}

function getSavedColWidths(key) {
  try {
    const raw = localStorage.getItem(storageKey(key));
    return raw ? JSON.parse(raw) : null;
  } catch (e) { return null; }
}

function saveColWidths(key, widths) {
  localStorage.setItem(storageKey(key), JSON.stringify(widths));
}

function memberViewStorageKey() {
  return "jogosAmigos_local_vistaMembros_" + currentPageFile();
}

function getMemberView() {
  try { return localStorage.getItem(memberViewStorageKey()) || "todos"; } catch (e) { return "todos"; }
}

function setMemberView(valor) {
  try { localStorage.setItem(memberViewStorageKey(), valor); } catch (e) { }
}

function filterVisibleMembers(lista) {
  const vista = getMemberView();
  if (vista === "nenhum") return [];
  if (vista !== "todos" && lista.includes(vista)) return [vista];
  return lista;
}

function memberViewWidthsKey(base, lista) {
  const n = filterVisibleMembers(lista).length;
  if (n === lista.length) return base;
  return base + (n === 0 ? "_semMembros" : "_umMembro");
}

function applyMemberViewTableWidth(table, lista) {
  if (!table) return;
  const filtrado = filterVisibleMembers(lista).length !== lista.length;
  table.style.width = filtrado ? "auto" : "";
  const wrap = table.closest(".table-scroll");
  if (wrap) {
    wrap.style.width = filtrado ? "fit-content" : "";
    wrap.style.maxWidth = filtrado ? "100%" : "";
  }
  const card = table.closest(".card");
  if (card) card.classList.toggle("card-fit-table", filtrado);
}

function renderMemberViewSelect(lista) {
  const row = document.querySelector(".actions-row-top");
  if (!row) return;
  let sel = document.getElementById("member-view-select");
  if (!sel) {
    const label = document.createElement("label");
    label.htmlFor = "member-view-select";
    label.className = "sr-only";
    label.textContent = "Membros visíveis na tabela";
    sel = document.createElement("select");
    sel.id = "member-view-select";
    sel.className = "member-view-select";
    row.insertBefore(sel, row.firstChild);
    row.insertBefore(label, sel);
    sel.addEventListener("change", () => {
      setMemberView(sel.value);
      if (typeof render === "function") render();
    });
  }
  const chave = JSON.stringify(lista);
  if (sel.dataset.membros !== chave) {
    sel.dataset.membros = chave;
    sel.innerHTML = `<option value="todos">Ver todos os membros</option>` +
      `<option value="nenhum">Ocultar membros</option>` +
      `<optgroup label="Ver só um membro">${lista.map(m => `<option value="${escapeHtml(m)}">${escapeHtml(m)}</option>`).join("")}</optgroup>`;
  }
  const vista = getMemberView();
  sel.value = (vista === "todos" || vista === "nenhum" || lista.includes(vista)) ? vista : "todos";
}

function initColumnResize(table, storageName) {
  if (!table) return;
  const cols = table.querySelectorAll("colgroup col");
  const ths = table.querySelectorAll("thead th");
  if (!cols.length || cols.length !== ths.length) return;

  const saved = getSavedColWidths(storageName);
  if (saved) {
    cols.forEach((col, i) => {
      if (saved[i]) col.style.width = saved[i] + "px";
    });
  }

  function persistWidths() {
    const widths = Array.from(cols).map(col => col.getBoundingClientRect().width);
    saveColWidths(storageName, widths);
  }

  ths.forEach((th, i) => {
    if (i === ths.length - 1) return;
    const handle = document.createElement("span");
    handle.className = "col-resizer";
    th.appendChild(handle);

    let startX = 0;
    let startWidth = 0;

    function onMove(e) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const newWidth = Math.max(50, startWidth + (clientX - startX));
      cols[i].style.width = newWidth + "px";
    }

    function onUp() {
      handle.classList.remove("resizing");
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", onUp);
      persistWidths();
    }

    function onDown(e) {
      e.preventDefault();
      startX = e.touches ? e.touches[0].clientX : e.clientX;
      startWidth = cols[i].getBoundingClientRect().width;
      handle.classList.add("resizing");
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
      document.addEventListener("touchmove", onMove, { passive: false });
      document.addEventListener("touchend", onUp);
    }

    handle.addEventListener("mousedown", onDown);
    handle.addEventListener("touchstart", onDown, { passive: false });
  });
}

function slugifyColId(label) {
  return String(label)
    .trim()
    .toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "") || "coluna";
}

function uniqueColId(base, colunas) {
  let id = base;
  let n = 2;
  while (colunas.some(c => c.id === id)) { id = `${base}_${n}`; n++; }
  return id;
}

function readExcelFile(file, callback) {
  const reader = new FileReader();
  reader.onload = e => {
    const wb = XLSX.read(new Uint8Array(e.target.result), { type: "array" });
    const sheet = wb.Sheets[wb.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });
    callback(rows);
  };
  reader.readAsArrayBuffer(file);
}

const AVATARS = [
  { id: "padrao" },
  { id: "a1", bg: "#6c8cff", skin: "#f1c7a3", hair: "#3b2a20", style: "curto", shirt: "#1f2a5c" },
  { id: "a2", bg: "#ff8fa3", skin: "#f5d0b5", hair: "#5a3825", style: "comprido", shirt: "#7a2e47" },
  { id: "a3", bg: "#4fbf76", skin: "#c68b5e", hair: "#1c1c1c", style: "curto", shirt: "#f4f1e8", beard: true },
  { id: "a4", bg: "#f0b429", skin: "#e8b48d", hair: "#c25b2a", style: "coque", shirt: "#3d4f8f" },
  { id: "a5", bg: "#33c4d6", skin: "#8d5a3b", hair: "#1c1c1c", style: "encaracolado", shirt: "#ff7a55" },
  { id: "a6", bg: "#a875ff", skin: "#f3d2b8", hair: "#e3c16f", style: "franja", shirt: "#ffffff" },
  { id: "a7", bg: "#ff7a55", skin: "#f1c7a3", hair: "#6b4a33", style: "careca", shirt: "#2f3b52", beard: true },
  { id: "a8", bg: "#2f3b52", skin: "#d9a07b", hair: "#1c1c1c", style: "rabo", shirt: "#ff5fa2" },
  { id: "a9", bg: "#ffd166", skin: "#f5d0b5", hair: "#8a5a3b", style: "curto", shirt: "#2b9348", glasses: true },
  { id: "a10", bg: "#06d6a0", skin: "#6b3f26", hair: "#1c1c1c", style: "coque", shirt: "#f0b429" },
  { id: "a11", bg: "#ef476f", skin: "#f1c7a3", hair: "#2a2a2a", style: "comprido", shirt: "#ffd166", glasses: true },
  { id: "a12", bg: "#118ab2", skin: "#e8b48d", hair: "#d9d9d9", style: "curto", shirt: "#9d4edd", beard: true },
  { id: "a13", bg: "#9d4edd", skin: "#c68b5e", hair: "#3b2a20", style: "rabo", shirt: "#06d6a0" },
  { id: "a14", bg: "#ff9f1c", skin: "#f3d2b8", hair: "#b5651d", style: "encaracolado", shirt: "#118ab2" },
  { id: "a15", bg: "#8ac926", skin: "#8d5a3b", hair: "#1c1c1c", style: "careca", shirt: "#ef476f", glasses: true },
  { id: "a16", bg: "#ff5fa2", skin: "#f5d0b5", hair: "#1c1c1c", style: "franja", shirt: "#2f3b52" },
  { id: "a17", bg: "#4361ee", skin: "#d9a07b", hair: "#5a3825", style: "curto", shirt: "#ff9f1c" },
  { id: "a18", bg: "#e76f51", skin: "#6b3f26", hair: "#2a2a2a", style: "comprido", shirt: "#8ac926" },
  { id: "a19", bg: "#2a9d8f", skin: "#f1c7a3", hair: "#e3c16f", style: "coque", shirt: "#e76f51", glasses: true },
];

const ANIMAL_AVATARS = [
  { id: "b1", nome: "Gato", bg: "#7cc6fe" },
  { id: "b2", nome: "Cão", bg: "#ffd166" },
  { id: "b3", nome: "Raposa", bg: "#2a9d8f" },
  { id: "b4", nome: "Urso", bg: "#a8dadc" },
  { id: "b5", nome: "Panda", bg: "#8ac926" },
  { id: "b6", nome: "Coelho", bg: "#ff8fa3" },
  { id: "b7", nome: "Porco", bg: "#4361ee" },
  { id: "b8", nome: "Vaca", bg: "#06d6a0" },
  { id: "b9", nome: "Leão", bg: "#e76f51" },
  { id: "b10", nome: "Tigre", bg: "#264653" },
  { id: "b11", nome: "Coala", bg: "#f4a261" },
  { id: "b12", nome: "Rato", bg: "#9d4edd" },
  { id: "b13", nome: "Sapo", bg: "#ffafcc" },
  { id: "b14", nome: "Coruja", bg: "#118ab2" },
  { id: "b15", nome: "Pinguim", bg: "#90e0ef" },
  { id: "b16", nome: "Macaco", bg: "#ffbe0b" },
  { id: "b17", nome: "Guaxinim", bg: "#ef476f" },
  { id: "b18", nome: "Pintainho", bg: "#3a86ff" },
  { id: "b19", nome: "Ovelha", bg: "#52b788" },
  { id: "b20", nome: "Lobo", bg: "#4cc9f0" },
];

function animalFace(id) {
  const D = "#1c1c1c";
  const eyes = (y = 33, dx = 6, r = 2.2) => `<circle cx="${32 - dx}" cy="${y}" r="${r}" fill="${D}"></circle><circle cx="${32 + dx}" cy="${y}" r="${r}" fill="${D}"></circle>`;
  switch (id) {
    case "b1": return `<path d="M17 26 L20 10 L31 20 Z M47 26 L44 10 L33 20 Z" fill="#f4a259"></path><path d="M20 22 L21.5 14 L27 19 Z M44 22 L42.5 14 L37 19 Z" fill="#ffb4b4"></path><circle cx="32" cy="35" r="16" fill="#f4a259"></circle>${eyes(33)}<path d="M30.5 38 L33.5 38 L32 40 Z" fill="#e5737a"></path><path d="M32 40 Q30 43 28 42 M32 40 Q34 43 36 42" fill="none" stroke="${D}" stroke-width="1.2" stroke-linecap="round"></path><path d="M14 37 L24 38 M14 41 L24 40 M50 37 L40 38 M50 41 L40 40" stroke="#5a3a1a" stroke-width="1" stroke-linecap="round"></path>`;
    case "b2": return `<ellipse cx="17" cy="33" rx="6" ry="12" fill="#7a4b2a"></ellipse><ellipse cx="47" cy="33" rx="6" ry="12" fill="#7a4b2a"></ellipse><circle cx="32" cy="33" r="15" fill="#c8915a"></circle><ellipse cx="32" cy="41" rx="8" ry="6" fill="#f1d3b0"></ellipse>${eyes(31)}<ellipse cx="32" cy="38" rx="3.2" ry="2.2" fill="${D}"></ellipse><path d="M30 44 Q32 49 34 44 Z" fill="#e5737a"></path>`;
    case "b3": return `<path d="M15 28 L18 10 L29 21 Z M49 28 L46 10 L35 21 Z" fill="#e8742a"></path><path d="M18 23 L19.5 15 L25 20 Z M46 23 L44.5 15 L39 20 Z" fill="#3a2010"></path><path d="M13 28 C13 22 21 19 32 19 C43 19 51 22 51 28 C51 38 41 48 32 53 C23 48 13 38 13 28 Z" fill="#e8742a"></path><path d="M13 29 C20 33 26 41 32 53 C23 48 15 40 13 29 Z M51 29 C44 33 38 41 32 53 C41 48 49 40 51 29 Z" fill="#fff4e6"></path>${eyes(32, 7)}<circle cx="32" cy="50" r="2.6" fill="${D}"></circle>`;
    case "b4": return `<circle cx="18" cy="20" r="6.5" fill="#8b5a3c"></circle><circle cx="46" cy="20" r="6.5" fill="#8b5a3c"></circle><circle cx="18" cy="20" r="3.2" fill="#c89574"></circle><circle cx="46" cy="20" r="3.2" fill="#c89574"></circle><circle cx="32" cy="35" r="16" fill="#8b5a3c"></circle><ellipse cx="32" cy="41" rx="7.5" ry="6" fill="#c89574"></ellipse>${eyes(32)}<ellipse cx="32" cy="38.5" rx="3.2" ry="2.2" fill="${D}"></ellipse><path d="M30 42 Q32 44 34 42" fill="none" stroke="${D}" stroke-width="1.2" stroke-linecap="round"></path>`;
    case "b5": return `<circle cx="18" cy="20" r="6.5" fill="${D}"></circle><circle cx="46" cy="20" r="6.5" fill="${D}"></circle><circle cx="32" cy="35" r="16" fill="#ffffff"></circle><ellipse cx="25" cy="33" rx="4.5" ry="5.5" transform="rotate(-25 25 33)" fill="${D}"></ellipse><ellipse cx="39" cy="33" rx="4.5" ry="5.5" transform="rotate(25 39 33)" fill="${D}"></ellipse><circle cx="25.5" cy="32.5" r="1.4" fill="#ffffff"></circle><circle cx="38.5" cy="32.5" r="1.4" fill="#ffffff"></circle><ellipse cx="32" cy="40" rx="3" ry="2" fill="${D}"></ellipse><path d="M30 43 Q32 45 34 43" fill="none" stroke="${D}" stroke-width="1.2" stroke-linecap="round"></path>`;
    case "b6": return `<ellipse cx="25" cy="15" rx="4.8" ry="12" fill="#f2f2f2"></ellipse><ellipse cx="39" cy="15" rx="4.8" ry="12" fill="#f2f2f2"></ellipse><ellipse cx="25" cy="15" rx="2.3" ry="8.5" fill="#ffb4c6"></ellipse><ellipse cx="39" cy="15" rx="2.3" ry="8.5" fill="#ffb4c6"></ellipse><circle cx="32" cy="38" r="14" fill="#f2f2f2"></circle>${eyes(36)}<ellipse cx="32" cy="41" rx="2.2" ry="1.6" fill="#ff8fab"></ellipse><rect x="30.3" y="44" width="3.4" height="3.6" rx="0.8" fill="#ffffff" stroke="#c9c9c9" stroke-width="0.6"></rect>`;
    case "b7": return `<path d="M18 24 L19 13 L28 19 Z M46 24 L45 13 L36 19 Z" fill="#f48fb1"></path><circle cx="32" cy="35" r="16" fill="#f8a5c2"></circle>${eyes(31)}<ellipse cx="32" cy="40" rx="7" ry="5" fill="#f06292"></ellipse><ellipse cx="29.5" cy="40" rx="1.4" ry="2" fill="#8a2a4f"></ellipse><ellipse cx="34.5" cy="40" rx="1.4" ry="2" fill="#8a2a4f"></ellipse>`;
    case "b8": return `<path d="M20 20 Q16 11 21 9 M44 20 Q48 11 43 9" fill="none" stroke="#e9d8a6" stroke-width="3" stroke-linecap="round"></path><ellipse cx="13" cy="28" rx="7" ry="3.5" fill="#f2f2f2"></ellipse><ellipse cx="51" cy="28" rx="7" ry="3.5" fill="#f2f2f2"></ellipse><ellipse cx="32" cy="34" rx="14" ry="17" fill="#f2f2f2"></ellipse><path d="M20 22 C24 18 30 20 28 26 C26 30 20 29 20 22 Z" fill="${D}"></path>${eyes(31)}<ellipse cx="32" cy="44" rx="10" ry="6.5" fill="#f4a6b5"></ellipse><ellipse cx="28.5" cy="44" rx="1.5" ry="2" fill="#8a2a4f"></ellipse><ellipse cx="35.5" cy="44" rx="1.5" ry="2" fill="#8a2a4f"></ellipse>`;
    case "b9": return `<circle cx="32" cy="33" r="21" fill="#b5651d"></circle><circle cx="20" cy="21" r="4" fill="#f2b84b"></circle><circle cx="44" cy="21" r="4" fill="#f2b84b"></circle><circle cx="32" cy="34" r="14" fill="#f2b84b"></circle><ellipse cx="32" cy="40" rx="7" ry="5" fill="#fbe3a8"></ellipse>${eyes(32)}<path d="M29.5 37 L34.5 37 L32 40 Z" fill="#6b3a1a"></path><path d="M32 40 Q30 43 28 42 M32 40 Q34 43 36 42" fill="none" stroke="${D}" stroke-width="1.2" stroke-linecap="round"></path>`;
    case "b10": return `<circle cx="18" cy="20" r="6" fill="#f08a24"></circle><circle cx="46" cy="20" r="6" fill="#f08a24"></circle><circle cx="18" cy="20" r="3" fill="#fff4e6"></circle><circle cx="46" cy="20" r="3" fill="#fff4e6"></circle><circle cx="32" cy="35" r="16" fill="#f08a24"></circle><path d="M32 19 L30 25 L34 25 Z M24 21 L25 27 M40 21 L39 27 M16 33 L22 34 M16 38 L22 38 M48 33 L42 34 M48 38 L42 38" stroke="${D}" stroke-width="1.8" stroke-linecap="round" fill="${D}"></path><ellipse cx="32" cy="42" rx="9" ry="6.5" fill="#fff4e6"></ellipse>${eyes(32)}<path d="M29.5 38 L34.5 38 L32 41 Z" fill="#e5737a"></path>`;
    case "b11": return `<circle cx="15" cy="26" r="9" fill="#9aa5b1"></circle><circle cx="49" cy="26" r="9" fill="#9aa5b1"></circle><circle cx="15" cy="26" r="5" fill="#f2c6d0"></circle><circle cx="49" cy="26" r="5" fill="#f2c6d0"></circle><circle cx="32" cy="35" r="15" fill="#b8c1cc"></circle>${eyes(32, 7)}<ellipse cx="32" cy="38" rx="4.5" ry="6" fill="#3a3f47"></ellipse>`;
    case "b12": return `<circle cx="18" cy="21" r="9" fill="#a3a8b3"></circle><circle cx="46" cy="21" r="9" fill="#a3a8b3"></circle><circle cx="18" cy="21" r="5.5" fill="#ffb4c6"></circle><circle cx="46" cy="21" r="5.5" fill="#ffb4c6"></circle><circle cx="32" cy="37" r="13" fill="#bfc4cd"></circle>${eyes(35, 5)}<circle cx="32" cy="41" r="2" fill="#ff8fab"></circle><path d="M18 40 L27 41 M18 44 L27 43 M46 40 L37 41 M46 44 L37 43" stroke="#6b7280" stroke-width="1" stroke-linecap="round"></path>`;
    case "b13": return `<circle cx="22" cy="24" r="7.5" fill="#57cc99"></circle><circle cx="42" cy="24" r="7.5" fill="#57cc99"></circle><ellipse cx="32" cy="38" rx="19" ry="13" fill="#57cc99"></ellipse><circle cx="22" cy="24" r="4.5" fill="#ffffff"></circle><circle cx="42" cy="24" r="4.5" fill="#ffffff"></circle><circle cx="22.5" cy="24.5" r="2.2" fill="${D}"></circle><circle cx="41.5" cy="24.5" r="2.2" fill="${D}"></circle><path d="M21 40 Q32 48 43 40" fill="none" stroke="#1f6f4a" stroke-width="2" stroke-linecap="round"></path><circle cx="18" cy="38" r="2.2" fill="#ff8fab" opacity="0.7"></circle><circle cx="46" cy="38" r="2.2" fill="#ff8fab" opacity="0.7"></circle>`;
    case "b14": return `<path d="M18 22 L16 11 L26 18 Z M46 22 L48 11 L38 18 Z" fill="#8d6346"></path><ellipse cx="32" cy="36" rx="16" ry="17" fill="#8d6346"></ellipse><ellipse cx="32" cy="42" rx="10" ry="10" fill="#d9b08c"></ellipse><circle cx="25" cy="31" r="7" fill="#ffffff"></circle><circle cx="39" cy="31" r="7" fill="#ffffff"></circle><circle cx="25" cy="31" r="3.2" fill="${D}"></circle><circle cx="39" cy="31" r="3.2" fill="${D}"></circle><path d="M29.5 36 L34.5 36 L32 41 Z" fill="#f4a261"></path>`;
    case "b15": return `<circle cx="32" cy="34" r="17" fill="#2b2d42"></circle><path d="M32 28 C29 21 18 22 19 32 C19 42 26 48 32 48 C38 48 45 42 45 32 C46 22 35 21 32 28 Z" fill="#ffffff"></path>${eyes(32, 6, 2.3)}<path d="M28.5 37 L35.5 37 L32 41.5 Z" fill="#f4a261"></path><circle cx="23" cy="39" r="2" fill="#ffafcc" opacity="0.8"></circle><circle cx="41" cy="39" r="2" fill="#ffafcc" opacity="0.8"></circle>`;
    case "b16": return `<circle cx="15" cy="33" r="6.5" fill="#7a4b2a"></circle><circle cx="49" cy="33" r="6.5" fill="#7a4b2a"></circle><circle cx="15" cy="33" r="3.5" fill="#e0b48a"></circle><circle cx="49" cy="33" r="3.5" fill="#e0b48a"></circle><circle cx="32" cy="33" r="16" fill="#7a4b2a"></circle><path d="M32 27 C30 22 22 23 22 30 C22 33 23 35 24 36 C21 39 22 47 32 47 C42 47 43 39 40 36 C41 35 42 33 42 30 C42 23 34 22 32 27 Z" fill="#e0b48a"></path>${eyes(30, 5)}<circle cx="30.5" cy="37" r="0.9" fill="${D}"></circle><circle cx="33.5" cy="37" r="0.9" fill="${D}"></circle><path d="M27.5 41 Q32 44.5 36.5 41" fill="none" stroke="${D}" stroke-width="1.3" stroke-linecap="round"></path>`;
    case "b17": return `<path d="M17 26 L19 12 L29 20 Z M47 26 L45 12 L35 20 Z" fill="#8d99ae"></path><path d="M20 22 L21 16 L26 20 Z M44 22 L43 16 L38 20 Z" fill="#2b2d42"></path><circle cx="32" cy="35" r="16" fill="#8d99ae"></circle><path d="M15 33 C18 27 26 27 32 31 C38 27 46 27 49 33 C45 37 38 37 32 34 C26 37 19 37 15 33 Z" fill="#2b2d42"></path><circle cx="25" cy="32" r="2" fill="#ffffff"></circle><circle cx="39" cy="32" r="2" fill="#ffffff"></circle><ellipse cx="32" cy="43" rx="8" ry="6" fill="#edf2f4"></ellipse><ellipse cx="32" cy="40.5" rx="2.8" ry="2" fill="${D}"></ellipse>`;
    case "b18": return `<path d="M30 18 Q29 12 32 11 Q31 15 34 16 Q33 12 36 13 Q34 16 34 19 Z" fill="#ffd60a"></path><circle cx="32" cy="35" r="16" fill="#ffd60a"></circle>${eyes(32)}<path d="M28 37 L36 37 L32 42 Z" fill="#f77f00"></path><circle cx="21.5" cy="38" r="2.6" fill="#ff8fab" opacity="0.8"></circle><circle cx="42.5" cy="38" r="2.6" fill="#ff8fab" opacity="0.8"></circle>`;
    case "b19": return `<g fill="#ffffff"><circle cx="21" cy="25" r="7"></circle><circle cx="28" cy="19" r="7"></circle><circle cx="36" cy="19" r="7"></circle><circle cx="43" cy="25" r="7"></circle><circle cx="20" cy="33" r="6"></circle><circle cx="44" cy="33" r="6"></circle></g><ellipse cx="14" cy="33" rx="6" ry="3" fill="#6b4f3a"></ellipse><ellipse cx="50" cy="33" rx="6" ry="3" fill="#6b4f3a"></ellipse><ellipse cx="32" cy="37" rx="11" ry="14" fill="#8a6a52"></ellipse><circle cx="32" cy="22" r="6" fill="#ffffff"></circle>${eyes(34, 5)}<ellipse cx="32" cy="43" rx="3" ry="2" fill="#4a3426"></ellipse>`;
    case "b20": return `<path d="M15 27 L17 9 L29 20 Z M49 27 L47 9 L35 20 Z" fill="#7d8597"></path><path d="M18 22 L19 13 L25 19 Z M46 22 L45 13 L39 19 Z" fill="#33415c"></path><path d="M13 30 C13 22 22 19 32 19 C42 19 51 22 51 30 C51 39 42 48 32 51 C22 48 13 39 13 30 Z" fill="#7d8597"></path><path d="M32 30 C27 34 25 40 26 45 C28 48 30 50 32 51 C34 50 36 48 38 45 C39 40 37 34 32 30 Z" fill="#e9ecef"></path>${eyes(32, 7)}<ellipse cx="32" cy="45" rx="3" ry="2.2" fill="${D}"></ellipse>`;
  }
  return "";
}

function avatarSvg(id, size = 32) {
  const animal = ANIMAL_AVATARS.find(x => x.id === id);
  if (animal) {
    return `<svg class="avatar-svg" xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="32" fill="${animal.bg}"></circle>${animalFace(id)}</svg>`;
  }
  const a = AVATARS.find(x => x.id === id) || AVATARS[0];
  const open = `<svg class="avatar-svg" xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64" aria-hidden="true">`;
  if (a.id === "padrao") {
    return open + `<circle cx="32" cy="32" r="32" fill="#cfd5de"></circle><circle cx="32" cy="25" r="11" fill="#8b95a5"></circle><path d="M12 56 C14 44 22 39 32 39 C42 39 50 44 52 56 C46 61 39 64 32 64 C25 64 18 61 12 56 Z" fill="#8b95a5"></path></svg>`;
  }
  const h = a.hair;
  const back = {
    comprido: `<path d="M18 30 C17 16 25 12 32 12 C39 12 47 16 46 30 L47 50 L17 50 Z" fill="${h}"></path>`,
    rabo: `<path d="M41 22 C50 24 52 36 47 44 C46 36 44 30 40 27 Z" fill="${h}"></path>`,
    coque: `<circle cx="32" cy="12" r="6" fill="${h}"></circle>`,
  }[a.style] || "";
  const cap = `<path d="M21 27 C21 18 26 15 32 15 C38 15 43 18 43 27 C40 22 36 20 32 20 C28 20 24 22 21 27 Z" fill="${h}"></path>`;
  const front = {
    curto: `<path d="M21 28 C20 17 26 14 32 14 C38 14 44 17 43 28 C41 22 37 20 32 20 C27 20 23 22 21 28 Z" fill="${h}"></path>`,
    comprido: `<path d="M21 28 C21 18 26 15 32 15 C38 15 43 18 43 28 C39 23 35 20 30 21 C27 22 24 24 21 28 Z" fill="${h}"></path>`,
    coque: cap,
    rabo: cap,
    encaracolado: `<g fill="${h}"><circle cx="23" cy="22" r="5"></circle><circle cx="28" cy="17" r="5"></circle><circle cx="34" cy="16" r="5"></circle><circle cx="40" cy="19" r="5"></circle><circle cx="42" cy="25" r="4"></circle><circle cx="22" cy="27" r="3.5"></circle></g>`,
    franja: `<path d="M20 30 C19 17 26 14 32 14 C38 14 45 17 44 30 L44 37 L40 37 L40 24 C35 25 29 23 24 21 L24 37 L20 37 Z" fill="${h}"></path>`,
  }[a.style] || "";
  const beard = a.beard ? `<path d="M21 29 C22 38 27 41 32 41 C37 41 42 38 43 29 C40 34 36 35 32 35 C28 35 24 34 21 29 Z" fill="${h}"></path>` : "";
  const glasses = a.glasses ? `<g fill="none" stroke="#1c1c1c" stroke-width="1.6"><circle cx="27.5" cy="28.5" r="3.6"></circle><circle cx="36.5" cy="28.5" r="3.6"></circle><path d="M31.1 28.5 L32.9 28.5"></path></g>` : "";
  const smile = a.beard ? "" : `<path d="M28.5 33.5 Q32 36 35.5 33.5" fill="none" stroke="#1c1c1c" stroke-width="1.4" stroke-linecap="round"></path>`;
  return open +
    `<circle cx="32" cy="32" r="32" fill="${a.bg}"></circle>` +
    back +
    `<path d="M12 58 C14 46 22 42 32 42 C42 42 50 46 52 58 C46 62 39 64 32 64 C25 64 18 62 12 58 Z" fill="${a.shirt}"></path>` +
    `<rect x="28" y="36" width="8" height="8" rx="3" fill="${a.skin}"></rect>` +
    `<circle cx="32" cy="28" r="11" fill="${a.skin}"></circle>` +
    front + beard +
    `<circle cx="27.5" cy="28.5" r="1.4" fill="#1c1c1c"></circle><circle cx="36.5" cy="28.5" r="1.4" fill="#1c1c1c"></circle>` +
    smile + glasses + `</svg>`;
}

function getAvatarId(membro) {
  const mapa = loadStore("avatares") || {};
  return mapa[membro] || "padrao";
}

function setAvatarId(membro, id) {
  const mapa = loadStore("avatares") || {};
  mapa[membro] = id;
  saveStoreMerged("avatares", mapa, remoto => {
    if (id !== "padrao" && Object.entries(remoto).some(([m, v]) => m !== membro && v === id)) return;
    remoto[membro] = id;
  });
}

const AVATAR_CATEGORIES = [
  { id: "pessoas", label: "Pessoas", lista: AVATARS },
  { id: "animais", label: "Animais", lista: ANIMAL_AVATARS },
];

function openAvatarPicker(membro, onPick) {
  const atual = getAvatarId(membro);
  const membrosAtuais = loadStore("membros") || [];
  const ocupados = {};
  Object.entries(loadStore("avatares") || {}).forEach(([m, id]) => {
    if (m !== membro && id !== "padrao" && membrosAtuais.includes(m)) ocupados[id] = m;
  });
  let categoria = (AVATAR_CATEGORIES.find(c => c.lista.some(a => a.id === atual)) || AVATAR_CATEGORIES[0]).id;
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.innerHTML = `
    <div class="modal avatar-modal">
      <div class="modal-header">
        <h2>Avatar de ${escapeHtml(membro)}</h2>
        <button type="button" class="modal-close" aria-label="Fechar">&times;</button>
      </div>
      <div class="avatar-tabs" role="tablist">
        ${AVATAR_CATEGORIES.map(c => `<button type="button" class="avatar-tab" role="tab" data-cat="${c.id}">${escapeHtml(c.label)}</button>`).join("")}
      </div>
      <div class="avatar-grid"></div>
    </div>
  `;
  document.body.appendChild(overlay);
  function close() { overlay.remove(); }
  overlay.querySelector(".modal-close").addEventListener("click", close);
  overlay.addEventListener("click", e => { if (e.target === overlay) close(); });
  document.addEventListener("keydown", function onEsc(e) {
    if (e.key === "Escape") { close(); document.removeEventListener("keydown", onEsc); }
  });

  const grid = overlay.querySelector(".avatar-grid");
  function desenhar() {
    overlay.querySelectorAll(".avatar-tab").forEach(t => {
      const ativa = t.dataset.cat === categoria;
      t.classList.toggle("active", ativa);
      t.setAttribute("aria-selected", ativa ? "true" : "false");
    });
    const cat = AVATAR_CATEGORIES.find(c => c.id === categoria);
    grid.innerHTML = cat.lista.map((a, i) => {
      const dono = ocupados[a.id];
      const titulo = dono ? `Já escolhido por ${dono}` : (a.nome || "");
      return `<button type="button" class="avatar-option ${a.id === atual ? "active" : ""} ${dono ? "taken" : ""}" data-id="${a.id}" title="${escapeHtml(titulo)}" aria-label="${escapeHtml(dono ? titulo : (a.nome || `Avatar ${i + 1}`))}" ${dono ? "disabled" : ""}>${avatarSvg(a.id, 52)}</button>`;
    }).join("");
    grid.querySelectorAll(".avatar-option:not(.taken)").forEach(btn => {
      btn.addEventListener("click", () => {
        close();
        onPick(btn.dataset.id);
      });
    });
  }
  overlay.querySelectorAll(".avatar-tab").forEach(t => {
    t.addEventListener("click", () => { categoria = t.dataset.cat; desenhar(); });
  });
  desenhar();
}

function closeAllModals() {
  document.querySelectorAll(".modal-overlay").forEach(o => o.remove());
}

function openFormModal({ title, fields, values = {}, submitLabel = "Adicionar", onSubmit, importar = null }) {
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <h2>${escapeHtml(title)}</h2>
        <button type="button" class="modal-close" aria-label="Fechar">&times;</button>
      </div>
      <form>
        ${fields.map(f => `
          <label class="modal-field">
            <span>${escapeHtml(f.label)}</span>
            <input type="text" name="${escapeHtml(f.id)}" value="${escapeHtml(values[f.id] ?? "")}" ${f.required ? "required" : ""}>
          </label>
        `).join("")}
        <div class="modal-actions">
          <button type="button" class="modal-cancel">Cancelar</button>
          <button type="submit" class="primary">${escapeHtml(submitLabel)}</button>
        </div>
      </form>
      ${importar ? `
        <div class="modal-import">
          <div class="modal-divider"><span>ou</span></div>
          <p class="modal-import-title">Adicionar vários de uma vez</p>
          <p class="hint">${escapeHtml(importar.hint || "")}</p>
          <button type="button" class="modal-import-btn">Importar de Excel${IMPORT_ICON}</button>
        </div>
      ` : ""}
    </div>
  `;
  document.body.appendChild(overlay);
  if (importar) {
    overlay.querySelector(".modal-import-btn").addEventListener("click", () => importar.onClick());
  }

  function close() { overlay.remove(); }

  overlay.querySelector(".modal-close").addEventListener("click", close);
  overlay.querySelector(".modal-cancel").addEventListener("click", close);
  overlay.addEventListener("click", e => { if (e.target === overlay) close(); });
  document.addEventListener("keydown", function onEsc(e) {
    if (e.key === "Escape") { close(); document.removeEventListener("keydown", onEsc); }
  });

  const form = overlay.querySelector("form");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const dados = {};
    fields.forEach(f => { dados[f.id] = form.elements[f.id].value; });
    close();
    onSubmit(dados);
  });

  const firstInput = form.querySelector("input");
  if (firstInput) firstInput.focus();
}
