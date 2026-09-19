initPage("votacao-semanal.html");

let membros = loadStore("membros").sort((a, b) => a.localeCompare(b, "pt"));
let jogosHabituais = loadStore("jogosHabituais");
let jogosNaoJogados = loadStore("jogosNaoJogados");
let votacao = loadStore("votacaoSemanal");
if (typeof votacao.validado !== "boolean") votacao.validado = false;
if (typeof votacao.confirmado !== "boolean") votacao.confirmado = false;
if (typeof votacao.vencedorSorteado === "undefined") votacao.vencedorSorteado = null;

(function renderDiaJogoLabel() {
  const dataLabel = nextGameDateLabel(loadStore("diaSemanaJogo"));
  const horario = loadStore("horarioJogo");
  document.getElementById("dia-jogo-label").innerHTML =
    `<strong>Próxima Sessão de Jogo:</strong> ${escapeHtml(dataLabel)}${horario ? ` às ${escapeHtml(horario)}` : ""}`;
})();

document.getElementById("fechar-votacao-btn").innerHTML = `Fechar Votação${LOCK_ICON}`;
document.getElementById("desbloquear-votos-btn").innerHTML = `Reabrir Votação${UNLOCK_ICON}`;
document.getElementById("validar-btn").innerHTML = `Validar Votos${CHECK_ICON}`;
document.getElementById("reiniciar-votacao-btn").innerHTML = `Reiniciar Votação${REFRESH_ICON}`;
document.getElementById("sortear-vencedor-btn").innerHTML = `Sortear Vencedor${DICE_ICON}`;

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
  document.getElementById("reiniciar-votacao-btn").style.display = "none";
  document.getElementById("sortear-vencedor-btn").style.display = "none";
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
  const sortearBtn = document.getElementById("sortear-vencedor-btn");

  if (!votacao.validado) {
    list.innerHTML = `<li class="placeholder"><span>Os resultados aparecem depois de clicares em "Fechar Votação".</span></li>`;
    winnerBox.innerHTML = "";
    winnerCard.style.display = "none";
    sortearBtn.style.display = "none";
    return;
  }

  const ranking = currentRanking();
  list.innerHTML = ranking.map(([jogo, n]) => `
    <li><span>${escapeHtml(jogo)}</span><span class="pill">${n} voto${n === 1 ? "" : "s"}</span></li>
  `).join("") || `<li class="placeholder"><span>Ainda sem votos.</span></li>`;

  if (ranking.length === 0 || !votacao.confirmado) {
    winnerBox.innerHTML = "";
    winnerCard.style.display = "none";
    sortearBtn.style.display = "none";
    return;
  }

  const topCount = ranking[0][1];
  const topGames = ranking.filter(([, n]) => n === topCount);

  if (votacao.vencedorSorteado) {
    winnerBox.innerHTML = `<div class="winner-box">🎲 Jogo vencedor (sorteado):<br><span class="winner-name">${escapeHtml(votacao.vencedorSorteado)}</span></div>`;
    reabrirBtn.style.display = "none";
    reiniciarBtn.style.display = "";
    sortearBtn.style.display = "none";
  } else if (topGames.length > 1) {
    winnerBox.innerHTML = `<div class="winner-box tie">Há empate! Usa "Reabrir Votação" para desempatar, ou "Sortear Vencedor" para decidir ao acaso.</div>`;
    reabrirBtn.style.display = "";
    reiniciarBtn.style.display = "none";
    sortearBtn.style.display = "";
  } else {
    winnerBox.innerHTML = `<div class="winner-box">🏆 Jogo vencedor:<br><span class="winner-name">${escapeHtml(topGames[0][0])}</span></div>`;
    reabrirBtn.style.display = "none";
    reiniciarBtn.style.display = "";
    sortearBtn.style.display = "none";
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
    const nome = `${entry.sorteio ? "🎲" : "🏆"} ${escapeHtml(entry.vencedor)}`;
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
  votacao.vencedorSorteado = null;
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

document.getElementById("sortear-vencedor-btn").addEventListener("click", () => {
  const ranking = currentRanking();
  if (!ranking.length) return;
  const topCount = ranking[0][1];
  const topGames = ranking.filter(([, n]) => n === topCount);
  if (topGames.length < 2) return;

  const nomes = topGames.map(([jogo]) => jogo);
  if (!confirm(`Sortear o jogo vencedor entre os jogos empatados (${nomes.join(", ")})?`)) return;

  const escolhido = nomes[Math.floor(Math.random() * nomes.length)];
  votacao.vencedorSorteado = escolhido;
  votacao.confirmado = true;
  persist();

  const historico = loadStore("historicoVencedores");
  historico.push({
    data: new Date().toISOString(),
    dataJogoLabel: nextGameDateLabel(loadStore("diaSemanaJogo")),
    empate: false,
    sorteio: true,
    vencedor: escolhido,
    ranking: ranking.map(([jogo, votos]) => ({ jogo, votos })),
  });
  saveStore("historicoVencedores", historico);

  render();
  renderHistory();
});

document.getElementById("reiniciar-votacao-btn").addEventListener("click", () => {
  if (!confirm("Reiniciar a votação? Os votos atuais são apagados e a tabela volta a ficar editável para uma nova ronda.")) return;
  votacao.validado = false;
  votacao.confirmado = false;
  votacao.vencedorSorteado = null;
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
