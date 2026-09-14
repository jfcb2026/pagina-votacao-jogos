initPage("votacao-semanal.html");

let membros = loadStore("membros");
let jogosHabituais = loadStore("jogosHabituais");
let votacao = loadStore("votacaoSemanal");
if (typeof votacao.validado !== "boolean") votacao.validado = false;

document.getElementById("dia-jogo-label").innerHTML =
  `<strong>Próxima Sessão de Jogo:</strong> ${escapeHtml(nextGameDateLabel(loadStore("diaSemanaJogo")))}`;

document.getElementById("validar-btn").innerHTML = `Validar Votos${CHECK_ICON}`;
document.getElementById("reiniciar-btn").innerHTML = `Reiniciar Votos${REFRESH_ICON}`;

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
  jogosHabituais.forEach(j => {
    const sel = j.jogo === selected ? "selected" : "";
    html += `<option value="${escapeHtml(j.jogo)}" ${sel}>${escapeHtml(j.jogo)}</option>`;
  });
  return html;
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
    });
  });

  document.getElementById("validar-btn").style.display = votacao.validado ? "none" : "";
  document.getElementById("reiniciar-btn").style.display = votacao.validado ? "" : "none";
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

  if (!votacao.validado) {
    list.innerHTML = `<li class="placeholder"><span>Os resultados aparecem depois de clicares em "Validar Votos".</span></li>`;
    winnerBox.innerHTML = "";
    return;
  }

  const ranking = currentRanking();
  list.innerHTML = ranking.map(([jogo, n]) => `
    <li><span>${escapeHtml(jogo)}</span><span class="pill">${n} voto${n === 1 ? "" : "s"}</span></li>
  `).join("") || `<li class="placeholder"><span>Ainda sem votos.</span></li>`;

  if (ranking.length === 0) {
    winnerBox.innerHTML = "";
    return;
  }
  const topCount = ranking[0][1];
  const topGames = ranking.filter(([, n]) => n === topCount);
  if (topGames.length > 1) {
    winnerBox.innerHTML = `
      <div class="winner-box tie">
        Há empate!
        <div style="margin-top:10px">
          <button class="primary small" id="desbloquear-btn">Desbloquear Votos${UNLOCK_ICON}</button>
        </div>
      </div>
    `;
    document.getElementById("desbloquear-btn").addEventListener("click", () => {
      votacao.validado = false;
      persist();
      render();
    });
  } else {
    winnerBox.innerHTML = `<div class="winner-box">🏆 Jogo vencedor:<br><span class="winner-name">${escapeHtml(topGames[0][0])}</span></div>`;
  }
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

document.getElementById("validar-btn").addEventListener("click", () => {
  if (!hasAnyVote()) {
    document.getElementById("validar-erro").textContent = "Não há nenhum voto para validar.";
    return;
  }
  if (!confirm("Validar os votos? A tabela deixa de poder ser editada até reiniciares a votação.")) return;
  votacao.validado = true;
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

document.getElementById("reiniciar-btn").addEventListener("click", () => {
  if (!confirm("Reiniciar a votação? Os votos atuais são apagados e a tabela volta a ficar editável.")) return;
  votacao.validado = false;
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
