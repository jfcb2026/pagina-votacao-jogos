/* common.js — dados partilhados, autenticação, navegação e utilitários,
   usados em todas as páginas do site. */

/* Ícones do menu principal (definidos aqui em cima para poderem ser usados
   já em NAV_ITEMS, mais abaixo) */
const NAV_ICON_VOTACAO = '<svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><polyline points="8 12 11 15 16 9"></polyline></svg>';
const NAV_ICON_HABITUAIS = '<svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>';
const NAV_ICON_NAO_JOGADOS = '<svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>';
const NAV_ICON_WISHLIST = '<svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 7.5c-1.2-1.5-3-2.5-5-2.5-3.6 0-6.5 3.1-6.5 7s2.9 7 6.5 7c2 0 3.8-1 5-2.5"></path><line x1="3" y1="10" x2="13" y2="10"></line><line x1="3" y1="14" x2="12" y2="14"></line></svg>';
const NAV_ICON_EVENTOS = '<svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>';

const NAV_ITEMS = [
  { href: "votacao-semanal.html", label: "Votação Semanal", icon: NAV_ICON_VOTACAO },
  { href: "jogos-habituais.html", label: "Jogos Habituais", icon: NAV_ICON_HABITUAIS },
  { href: "jogos-nao-jogados.html", label: "Jogos ainda não jogados", icon: NAV_ICON_NAO_JOGADOS },
  { href: "wishlist.html", label: "Wishlist de Jogos Pagos", icon: NAV_ICON_WISHLIST },
  { href: "eventos.html", label: "Eventos", icon: NAV_ICON_EVENTOS },
];

/* ---------- Dados de exemplo (seed inicial), usados só se ainda não
   existir nada guardado no browser. Espelham o que vai para os
   ficheiros JSON em assets/data/ quando a lista for exportada. ---------- */
const DEFAULT_DATA = {
  membros: [
    "Membro 1", "Membro 2", "Membro 3", "Membro 4",
    "Membro 5", "Membro 6", "Membro 7", "Membro 8",
  ],
  jogosHabituais: [
    { jogo: "Repo", jogadores: "6 + mods", dispositivo: "", link: "" },
    { jogo: "Peak", jogadores: "4 + mods", dispositivo: "", link: "" },
    { jogo: "Caravana", jogadores: "4 + mods", dispositivo: "", link: "" },
    { jogo: "Scribble", jogadores: "", dispositivo: "", link: "" },
    { jogo: "Among Us", jogadores: "", dispositivo: "Pc/Telefone", link: "" },
    { jogo: "Invokyr", jogadores: "4", dispositivo: "", link: "" },
    { jogo: "Dodgy Deliveries", jogadores: "", dispositivo: "", link: "" },
    { jogo: "Bombanana", jogadores: "3", dispositivo: "", link: "" },
    { jogo: "Sneak Out", jogadores: "", dispositivo: "", link: "" },
    { jogo: "Camaleão", jogadores: "", dispositivo: "", link: "" },
  ],
  jogosNaoJogados: [
    { nome: "Fall Guys", info: "Máx 32", link: "https://store.epicgames.com/p/fall-guys" },
    { nome: "WhoIs", info: "", link: "https://store.steampowered.com/app/3984630/WhoIs/" },
    { nome: "Arena Breakout: Infinite", info: "", link: "https://store.steampowered.com/app/2073620/Arena_Breakout_Infinite/" },
    { nome: "The Seven Deadly Sins: Origin", info: "", link: "https://store.steampowered.com/app/3679080/The_Seven_Deadly_Sins_Origin/" },
    { nome: "Cheese Rolling", info: "", link: "https://store.steampowered.com/app/3809440/Cheese_Rolling/" },
    { nome: "Catan Universe", info: "", link: "https://store.steampowered.com/app/544730/Catan_Universe/" },
    { nome: "Ghostbane: Prologue", info: "1-4 Enimigo capta som", link: "https://store.steampowered.com/app/2962750/Ghostbane_Prologue/" },
    { nome: "GameLib", info: "", link: "https://store.steampowered.com/app/3005690/GameLib/" },
    { nome: "Grapples Galore", info: "", link: "https://store.steampowered.com/app/2239140/Grapples_Galore/" },
    { nome: "Heartopia", info: "", link: "https://store.steampowered.com/app/4025700/Heartopia/" },
    { nome: "MONOPOLY Poker", info: "", link: "https://store.steampowered.com/app/1474700/MONOPOLY_Poker/" },
    { nome: "Whos who", info: "", link: "https://store.steampowered.com/app/3391260/WHOS_WHO_20/" },
    { nome: "Paint Warfare", info: "", link: "https://store.steampowered.com/app/1190150/Paint_Warfare/" },
    { nome: "Jigsaw Puzzle Dreams", info: "", link: "https://store.steampowered.com/app/1653970/Jigsaw_Puzzle_Dreams/" },
    { nome: "Bloons TD 6", info: "", link: "https://store.epicgames.com/p/bloons-td-6-bf95a0" },
  ],
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
    { id: "tipo", label: "Tipo", core: true, type: "select" },
    { id: "descricao", label: "Descrição", type: "textarea" },
    { id: "data", label: "Data", type: "date" },
  ],
  tiposEvento: ["Escape Room", "Passeio", "Almoço", "Jantar"],
  votacaoSemanal: { slots: 2, votos: {}, validado: false },
  historicoVencedores: [],
  diaSemanaJogo: 4, // 0 = Domingo ... 4 = Quinta-Feira
  tema: "midnight",
  nomeSite: "Página De Jogos De Amigos",
};

/* ---------- Temas de cores ---------- */
/* "midnight" é o tema padrão (o que já existia); os restantes ficam
   disponíveis no Backoffice, em "Tema de Cores". */

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

/* ---------- Dia de jogo (dia da semana) ---------- */

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

/* ---------- Armazenamento local (localStorage) ---------- */
/* Cada "store" fica cacheado no browser. No Backoffice há um botão para
   exportar tudo para ficheiros JSON, prontos a colocar em assets/data/
   e a serem enviados (commit) para o repositório do GitHub. */

function storageKey(name) { return "jogosAmigos_" + name; }

function loadStore(name) {
  const raw = localStorage.getItem(storageKey(name));
  if (raw !== null) {
    try { return JSON.parse(raw); } catch (e) { /* segue para o default */ }
  }
  const seed = JSON.parse(JSON.stringify(DEFAULT_DATA[name]));
  saveStore(name, seed);
  return seed;
}

function saveStore(name, data) {
  localStorage.setItem(storageKey(name), JSON.stringify(data));
  pushToCloud(name, data);
}

function resetStore(name) {
  saveStore(name, JSON.parse(JSON.stringify(DEFAULT_DATA[name])));
}

function emptyStore(name, emptyValue) {
  saveStore(name, emptyValue);
}

/* ---------- Sincronização com a nuvem (Firebase Firestore) ---------- */
/* Cada membro do grupo guarda os dados localmente (localStorage, como
   antes), mas as listas abaixo passam também a ser escritas/lidas no
   Firestore, para que uma alteração feita por um membro apareça
   automaticamente no ecrã dos outros, sem recarregar a página. Se o
   ficheiro assets/js/firebase-config.js não existir (ou a ligação
   falhar), o site continua a funcionar apenas com o localStorage, tal
   como antes desta funcionalidade existir. */

const CLOUD_SYNC_KEYS = [
  "membros", "jogosHabituais", "jogosNaoJogados", "wishlist", "eventos",
  "colunasHabituais", "colunasNaoJogados", "colunasWishlist", "colunasEventos",
  "tiposEvento", "votacaoSemanal", "historicoVencedores", "diaSemanaJogo",
  "nomeSite",
];

let _cloudReady = false;

/* Guarda, por lista, o instante da última escrita feita a partir deste
   browser. Serve para reconhecer o "eco" dessa mesma escrita quando ela
   volta pelo onSnapshot (que dispara sempre, mesmo para quem a fez) e
   assim evitar voltar a desenhar o ecrã nesse caso — sem isto, cada
   letra escrita num campo de texto disparava um re-render completo da
   tabela e o campo perdia o foco a cada carácter. */
const _lastPushedAt = {};

function pushToCloud(name, data) {
  if (!CLOUD_SYNC_KEYS.includes(name)) return;
  if (!_cloudReady || typeof firebase === "undefined") return;
  const ts = Date.now();
  _lastPushedAt[name] = ts;
  firebase.firestore().collection("jogosAmigos").doc(name)
    .set({ value: data, updatedAt: ts })
    .catch(() => { /* falha silenciosa: fica só localStorage até à próxima escrita */ });
}

function refreshFromCloud() {
  if (typeof render === "function") { try { render(); } catch (e) { /* página sem render() */ } }
}

function watchCloudKey(name) {
  firebase.firestore().collection("jogosAmigos").doc(name).onSnapshot(snap => {
    if (!snap.exists) return;
    const remote = snap.data();
    if (remote.updatedAt && remote.updatedAt === _lastPushedAt[name]) return; // eco da nossa própria escrita
    localStorage.setItem(storageKey(name), JSON.stringify(remote.value));
    refreshFromCloud();
  }, () => { /* sem permissão ou sem ligação: ignora, mantém o que está local */ });
}

function initCloudSync() {
  /* Se o Firebase não estiver disponível (SDK não carregado) ou não tiver
     sido inicializado (falta assets/js/firebase-config.js, por exemplo
     numa cópia do site sem esse ficheiro, que fica fora do repositório
     por conter a configuração do projeto), o site tem de continuar a
     funcionar normalmente em modo só-local, exatamente como antes desta
     funcionalidade existir — daí o try/catch: um erro aqui nunca pode
     impedir o resto deste ficheiro (cabeçalho, tabelas, etc.) de correr. */
  try {
    if (typeof firebase === "undefined") return;
    if (!firebase.apps || !firebase.apps.length) return; // sem firebase-config.js, nenhuma app inicializada
    firebase.auth().onAuthStateChanged(user => {
      if (!user) return;
      _cloudReady = true;
      CLOUD_SYNC_KEYS.forEach(watchCloudKey);
    });
    firebase.auth().signInAnonymously().catch(() => { /* sem sincronização, fica só local */ });
  } catch (e) { /* sem sincronização, fica só local */ }
}

/* Envia para o Firestore o valor atual (guardado localmente) de todas as
   listas sincronizáveis. Usado no Backoffice para "publicar" os dados já
   existentes no browser de quem carrega no botão, na primeira vez que se
   liga a sincronização. */
function pushAllToCloud() {
  CLOUD_SYNC_KEYS.forEach(name => pushToCloud(name, loadStore(name)));
}

initCloudSync();

/* ---------- Autenticação (password partilhada) ---------- */
/* A password por defeito vem de auth.js (fora do repositório público).
   O Backoffice permite mudar a password guardando uma versão nova no
   localStorage, que passa a ter prioridade sobre a de auth.js. */

function getActivePassword() {
  const override = localStorage.getItem(storageKey("passwordOverride"));
  if (override !== null) return override;
  return (typeof SITE_PASSWORD !== "undefined") ? SITE_PASSWORD : "alterar123";
}

function setActivePassword(newPassword) {
  localStorage.setItem(storageKey("passwordOverride"), newPassword);
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

/* ---------- Gestão de membros (usada pelo Backoffice) ---------- */
/* Mantém sincronizados os dados de outros ecrãs que guardam informação
   por membro (votos, reações da wishlist, respostas a eventos) quando
   um membro é mudado de nome ou removido. */

function renameMemberEverywhere(oldName, newName) {
  const votacao = loadStore("votacaoSemanal");
  if (votacao.votos && oldName in votacao.votos) {
    votacao.votos[newName] = votacao.votos[oldName];
    delete votacao.votos[oldName];
    saveStore("votacaoSemanal", votacao);
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
  const votacao = loadStore("votacaoSemanal");
  if (votacao.votos) { delete votacao.votos[name]; saveStore("votacaoSemanal", votacao); }

  const wishlist = loadStore("wishlist");
  wishlist.forEach(j => { if (j.reacoes) delete j.reacoes[name]; });
  saveStore("wishlist", wishlist);

  const eventos = loadStore("eventos");
  eventos.forEach(ev => { if (ev.respostas) delete ev.respostas[name]; });
  saveStore("eventos", eventos);
}

/* ---------- Navegação / cabeçalho comum ---------- */

function renderHeader(activeHref) {
  const header = document.createElement("header");
  header.className = "site-header";

  header.innerHTML = `
    <div class="header-top">
      <button type="button" class="menu-toggle" id="menu-toggle" aria-label="Abrir menu" aria-expanded="false">${MENU_ICON}</button>
      <a href="votacao-semanal.html" class="site-title">🎮 ${escapeHtml(loadStore("nomeSite"))}</a>
      <div class="member-picker">
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

function initPage(activeHref) {
  requireAuth();
  if (activeHref === "backoffice.html") {
    renderBackofficeHeader();
  } else {
    renderHeader(activeHref);
  }
}

/* ---------- Utilitários ---------- */

const TRASH_ICON = '<svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path></svg>';

const LOGOUT_ICON = '<svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>';

/* Ícone do menu hamburger (mobile) e do respetivo estado aberto (X) */
const MENU_ICON = '<svg class="menu-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
const CLOSE_ICON = '<svg class="menu-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';

const CHECK_ICON = '<svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>';

const REFRESH_ICON = '<svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>';

const UNLOCK_ICON = '<svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path></svg>';

const IMPORT_ICON = '<svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>';

const EXPORT_ICON = '<svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>';

const PLUS_ICON = '<svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';

const SAVE_ICON = '<svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>';

const MIGRATE_ICON = '<svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>';

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

/* ---------- Redimensionar colunas de tabelas (arrastar o limite direito
   de cada cabeçalho). As larguras ficam guardadas no browser, por tabela,
   e aplicam-se logo que a página volta a ser aberta. ---------- */

function getSavedColWidths(key) {
  try {
    const raw = localStorage.getItem(storageKey(key));
    return raw ? JSON.parse(raw) : null;
  } catch (e) { return null; }
}

function saveColWidths(key, widths) {
  localStorage.setItem(storageKey(key), JSON.stringify(widths));
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
    if (i === ths.length - 1) return; // a última coluna (ações) não é redimensionável
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

/* ---------- Colunas configuráveis das tabelas de jogos (Backoffice) ---------- */

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
