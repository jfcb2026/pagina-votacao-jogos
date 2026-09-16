initPage("votacao-semanal.html");

let membros = loadStore("membros");
let jogosHabituais = loadStore("jogosHabituais");
let jogosNaoJogados = loadStore("jogosNaoJogados");
let votacao = loadStore("votacaoSemanal");
if (typeof votacao.validado !== "boolean") votacao.validado = false;
if (typeof votacao.confirmado !== "boolean") votacao.confirmado = false;

document.getElementById("dia-jogo-label").innerHTML =
  `<strong>Próxima Sessão de Jogo:</strong> ${escapeHtml(nextGameDateLabel(loadStore("diaSemanaJogo")))}`;

document.getElementById("fechar-votacao-btn").innerHTML = `Fechar Votação${LOCK_ICON}`;
document.getElementById("desbloquear-votos-btn").innerHTML = `Reabrir Votação${UNLOCK_ICON}`;
document.getElementById("validar-btn").innerHTML = `Validar Votos${CHECK_ICON}`;
document.getElementById("reiniciar-votacao-btn").innerHTML = `Reiniciar Votação${REFRESH_ICON}`;

function ensureVotosStructure() {
  membros.forEach(m => {
    if (!Array.isArray(votacao.votos[m])) votacao.votos[m] = [];
    while (votacao.votos[m].length < votacao.slots) votacao.votos[m].push("");
    votacao.votos[m] = votacao.votos[m].slice(0, votacao.slots);
  });
  Object.keys(votacao.votos).forEach(m => {
    if (!membros.includes(m)) delete votacao.votos[m];
  });
}

function persist() {
  saveStore("votacaoSemanal", votacao);
}

function hasAnyVote() {
  return Object.values(votacao.votos).some(votos => votos.some(v => v));
}

function gameOptionsHtml(selected) {
  let html = `<option value="">—</option>`;

  if (jogosHabituais.length) {
    html += `<optgroup label="Jogos Habituais">`;
    jogosHabituais.forEach(j => {
      const sel = j.jogo === selected ? "selected" : "";
      html += `<option value="${escapeHtml(j.jogo)}" ${sel}>${escapeHtml(j.jogo)}</option>`;
    });
    html += `</optgroup>`;
  }

  if (jogosNaoJogados.length) {
    html += `<optgroup label="Jogos ainda não jogados">`;
    jogosNaoJogados.forEach(j => {
      const sel = j.nome === selected ? "selected" : "";
      html += `<option value="${escapeHtml(j.nome)}" ${sel}>${escapeHtml(j.nome)}</option>`;
    });
    html += `</optgroup>`;
  }

  return html;
}

/* Mensagem breve confirmando qual "coluna" de jogo (Jogo 1, Jogo 2, ...)
   acabou de ser votada, para dar confirmação imediata ao clicar. */
let votoFeedbackTimer = null;

function showVotoFeedback(idx) {
  const el = document.getElementById("voto-feedback");
  if (!el) return;
  el.textContent = `Jogo ${idx + 1} votado com sucesso!`;
  if (votoFeedbackTimer) clearTimeout(votoFeedbackTimer);
  votoFeedbackTimer = setTimeout(() => { el.textContent = ""; }, 2500);
}

function clearVotoFeedback() {
  const el = document.getElementById("voto-feedback");
  if (!el) return;
  if (votoFeedbackTimer) clearTimeout(votoFeedbackTimer);
  el.textContent = "";
}

function render() {
  ensureVotosStructure();

  const head = document.getElementById("votacao-head");
  head.innerHTML = `<th>Membro</th>` +
    Array.from({ length: votacao.slots }).map((_, i) => `<th>Jogo ${i + 1}</th>`).join("");

  const body = document.getElementById("votacao-body");
  body.innerHTML = membros.map(m => `
    <tr data-membro="${escapeHtml(m)}">
      <td>${escapeHtml(m)}</td>
      ${votacao.votos[m].map((v, i) => `
        <td><select data-membro="${escapeHtml(m)}" data-idx="${i}" ${votacao.validado ? "disabled" : ""}>${gameOptionsHtml(v)}</select></td>
      `).join("")}
    </tr>
  `).join("");

  body.querySelectorAll("select").forEach(sel => {
    sel.addEventListener("change", () => {
      const m = sel.dataset.membro, i = Number(sel.dataset.idx);
      votacao.votos[m][i] = sel.value;
      persist();
      renderResults();
      if (sel.value) {
        showVotoFeedback(i);
      } else {
        clearVotoFeedback();
      }
    });
  });

  const votosAbertos = !votacao.validado;
  const fechadaNaoConfirmada = !votosAbertos && !votacao.confirmado;
  document.getElementById("fechar-votacao-btn").style.display = votosAbertos ? "" : "none";
  document.getElementById("desbloquear-votos-btn").style.display = fechadaNaoConfirmada ? "" : "none";
  document.getElementById("validar-btn").style.display = fechadaNaoConfirmada ? "" : "none";
  /* "Reiniciar Votação" só aparece quando já há um vencedor único anunciado
     (decidido em renderResults, que tem a informação do ranking); nos
     outros casos fica escondido por omissão. */
  document.getElementById("reiniciar-votacao-btn").style.display = "none";
  document.getElementById("validar-erro").textContent = "";

  renderResults();
}

function currentRanking() {
  const counts = {};
  Object.values(votacao.votos).forEach(votos => {
    votos.forEach(v => { if (v) counts[v] = (counts[v] || 0) + 1; });
  });
  return Object.entries(counts).sort((a, b) => b[1] - a[1]);
}

function renderResults() {
  const list = document.getElementById("results-list");
  const winnerBox = document.getElementById("winner-box");
  const winnerCard = document.getElementById("winner-card");
  const reabrirBtn = document.getElementById("desbloquear-votos-btn");
  const reiniciarBtn = document.getElementById("reiniciar-votacao-btn");

  if (!votacao.validado) {
    list.innerHTML = `<li class="placeholder"><span>Os resultados aparecem depois de clicares em "Fechar Votação".</span></li>`;
    winnerBox.innerHTML = "";
    winnerCard.style.display = "none";
    return;
  }

  const ranking = currentRanking();
  list.innerHTML = ranking.map(([jogo, n]) => `
    <li><span>${escapeHtml(jogo)}</span><span class="pill">${n} voto${n === 1 ? "" : "s"}</span></li>
  `).join("") || `<li class="placeholder"><span>Ainda sem votos.</span></li>`;

  if (ranking.length === 0 || !votacao.confirmado) {
    /* O vencedor só é anunciado depois de os votos serem validados
       ("Validar Votos"); fechar a votação só fecha a tabela e mostra a
       contagem, sem ainda anunciar quem ganhou. */
    winnerBox.innerHTML = "";
    winnerCard.style.display = "none";
    return;
  }
  const topCount = ranking[0][1];
  const topGames = ranking.filter(([, n]) => n === topCount);
  if (topGames.length > 1) {
    /* Empate: não há vencedor para anunciar, por isso mantém-se a opção
       de reabrir a votação (sem apagar os votos) para se poder desempatar. */
    winnerBox.innerHTML = `<div class="winner-box tie">Há empate! Usa "Reabrir Votação" para desempatar.</div>`;
    reabrirBtn.style.display = "";
    reiniciarBtn.style.display = "none";
  } else {
    /* Há um vencedor único anunciado: reabrir deixa de fazer sentido (não
       há nada para desempatar), por isso o botão passa a ser "Reiniciar
       Votação", para começar uma nova ronda de raiz. */
    winnerBox.innerHTML = `<div class="winner-box">🏆 Jogo vencedor:<br><span class="winner-name">${escapeHtml(topGames[0][0])}</span></div>`;
    reabrirBtn.style.display = "none";
    reiniciarBtn.style.display = "";
  }
  winnerCard.style.display = "";
}

function renderHistory() {
  const historico = loadStore("historicoVencedores");
  const list = document.getElementById("historico-list");
  if (!list) return;
  const ordenado = [...historico].reverse().filter(entry => !entry.empate);
  list.innerHTML = ordenado.map(entry => {
    const dataLabel = entry.dataJogoLabel || "";
    const nome = `🏆 ${escapeHtml(entry.vencedor)}`;
    return `<li><span class="historico-jogo">${nome}</span> <span class="historico-data">— ${dataLabel}</span></li>`;
  }).join("") || `<li class="placeholder"><span>Ainda sem histórico.</span></li>`;
}

document.getElementById("fechar-votacao-btn").addEventListener("click", () => {
  if (!hasAnyVote()) {
    document.getElementById("validar-erro").textContent = "Não há nenhum voto para fechar.";
    return;
  }
  votacao.validado = true;
  persist();
  render();
});

document.getElementById("desbloquear-votos-btn").addEventListener("click", () => {
  votacao.validado = false;
  votacao.confirmado = false;
  persist();
  render();
});

document.getElementById("validar-btn").addEventListener("click", () => {
  if (!hasAnyVote()) {
    document.getElementById("validar-erro").textContent = "Não há nenhum voto para validar.";
    return;
  }
  if (!confirm("Validar os votos? A votação será finalizada. O jogo vencedor será anunciado!")) return;
  votacao.validado = true;
  votacao.confirmado = true;
  persist();

  const ranking = currentRanking();
  const topCount = ranking[0][1];
  const topGames = ranking.filter(([, n]) => n === topCount);
  if (topGames.length === 1) {
    const historico = loadStore("historicoVencedores");
    historico.push({
      data: new Date().toISOString(),
      dataJogoLabel: nextGameDateLabel(loadStore("diaSemanaJogo")),
      empate: false,
      vencedor: topGames[0][0],
      ranking: ranking.map(([jogo, votos]) => ({ jogo, votos })),
    });
    saveStore("historicoVencedores", historico);
  }

  render();
  renderHistory();
});

document.getElementById("reiniciar-votacao-btn").addEventListener("click", () => {
  if (!confirm("Reiniciar a votação? Os votos atuais são apagados e a tabela volta a ficar editável para uma nova ronda.")) return;
  votacao.validado = false;
  votacao.confirmado = false;
  Object.keys(votacao.votos).forEach(m => {
    votacao.votos[m] = votacao.votos[m].map(() => "");
  });
  persist();
  render();
});

function syncCardWidths() {
  const master = document.querySelector(".card-fit");
  if (!master) return;
  const w = master.getBoundingClientRect().width;
  document.querySelectorAll(".card-sync").forEach(el => {
    el.style.width = w + "px";
  });
}

render();
renderHistory();
syncCardWidths();
window.addEventListener("resize", syncCardWidths);
