initPage("votacao-dia.html");

let membros = loadStore("membros");
let votacaoDia = loadStore("votacaoDia");
if (!votacaoDia.voto) votacaoDia.voto = {};

const DIAS = ["2f", "3f", "4f", "5f", "6f"];
const DIAS_LABEL = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];
/* Índice correspondente em WEEKDAY_NAMES / diaSemanaJogo (0 = Domingo). */
const DIAS_WEEKDAY_INDEX = [1, 2, 3, 4, 5];

function ensureVotoStructure() {
  membros.forEach(m => {
    if (!Array.isArray(votacaoDia.voto[m])) votacaoDia.voto[m] = [];
    while (votacaoDia.voto[m].length < DIAS.length) votacaoDia.voto[m].push(false);
    votacaoDia.voto[m] = votacaoDia.voto[m].slice(0, DIAS.length);
  });
  Object.keys(votacaoDia.voto).forEach(m => {
    if (!membros.includes(m)) delete votacaoDia.voto[m];
  });
}

function persist() { saveStore("votacaoDia", votacaoDia); }

function computeTotals() {
  return DIAS.map((_, i) => membros.reduce((soma, m) => soma + (votacaoDia.voto[m][i] ? 1 : 0), 0));
}

function renderHead() {
  const table = document.getElementById("votacao-dia-table");
  let colgroup = table.querySelector("colgroup");
  if (!colgroup) {
    colgroup = document.createElement("colgroup");
    table.insertBefore(colgroup, table.firstChild);
  }
  colgroup.innerHTML = `<col style="width:180px">` +
    DIAS.map(() => `<col style="width:120px">`).join("");

  document.getElementById("votacao-dia-head").innerHTML = `<th>Membro</th>` +
    DIAS.map((d, i) => `<th title="${escapeHtml(DIAS_LABEL[i])}-feira">${d}</th>`).join("");
}

function syncTableWidth() {
  const table = document.getElementById("votacao-dia-table");
  const cols = table.querySelectorAll("colgroup col");
  let total = 0;
  cols.forEach(col => { total += parseFloat(col.style.width) || 0; });
  if (total > 0) table.style.width = total + "px";
}

function render() {
  ensureVotoStructure();

  const horario = loadStore("horarioJogo");
  document.getElementById("horario-label").innerHTML =
    horario ? `<strong>Horário:</strong> ${escapeHtml(horario)}` : "";

  renderHead();

  const body = document.getElementById("votacao-dia-body");
  body.innerHTML = membros.map(m => `
    <tr data-membro="${escapeHtml(m)}">
      <td>${escapeHtml(m)}</td>
      ${DIAS.map((_, i) => `
        <td class="text-center"><input type="checkbox" data-membro="${escapeHtml(m)}" data-idx="${i}" ${votacaoDia.voto[m][i] ? "checked" : ""}></td>
      `).join("")}
    </tr>
  `).join("");

  body.querySelectorAll("input[type=checkbox]").forEach(cb => {
    cb.addEventListener("change", () => {
      const m = cb.dataset.membro, i = Number(cb.dataset.idx);
      votacaoDia.voto[m][i] = cb.checked;
      persist();
      renderTotals();
      renderResultadoDia();
    });
  });

  syncTableWidth();
  renderTotals();
  renderResultadoDia();
}

function renderTotals() {
  const totals = computeTotals();
  const max = Math.max(...totals, 0);
  const row = document.getElementById("votacao-dia-total");
  row.innerHTML = `<td>Total</td>` +
    totals.map(n => `<td class="text-center dia-total${n === max && max > 0 ? " dia-total-max" : ""}">${n}</td>`).join("");
}

/* Mostra qual o dia com mais votos e permite aplicá-lo como "Dia de Jogo"
   (usado na Votação do Jogo Semanal para calcular a próxima sessão). Em
   caso de empate, deixa escolher qual dos dias empatados aplicar. */
function renderResultadoDia() {
  const totals = computeTotals();
  const max = Math.max(...totals, 0);
  const card = document.getElementById("resultado-dia-card");
  const box = document.getElementById("resultado-dia-box");

  if (max === 0) {
    card.style.display = "none";
    return;
  }
  card.style.display = "";
  if (typeof syncCardWidths === "function") setTimeout(syncCardWidths, 0);

  const empatados = DIAS.map((_, i) => ({ i, n: totals[i] })).filter(x => x.n === max);

  function aplicarDia(idx) {
    saveStore("diaSemanaJogo", DIAS_WEEKDAY_INDEX[idx]);
    const msg = document.getElementById("aplicar-dia-msg");
    if (msg) msg.textContent = `Dia da semana atualizado para ${DIAS_LABEL[idx]}-Feira.`;
  }

  if (empatados.length === 1) {
    const dia = empatados[0];
    box.innerHTML = `
      <p style="margin:0 0 10px">🏆 <strong>${escapeHtml(DIAS_LABEL[dia.i])}-Feira</strong> é o dia com mais votos (${dia.n} de ${membros.length}).</p>
      <div class="actions-row" style="margin-bottom:0; justify-content:center">
        <button class="primary" id="aplicar-dia-btn">Aplicar como Dia da Semana${CALENDAR_ICON}</button>
      </div>
      <p class="hint" id="aplicar-dia-msg" style="text-align:center"></p>
    `;
    document.getElementById("aplicar-dia-btn").addEventListener("click", () => aplicarDia(dia.i));
  } else {
    box.innerHTML = `
      <p style="margin:0 0 10px">Há empate entre ${empatados.length} dias (${empatados.map(x => escapeHtml(DIAS_LABEL[x.i]) + "-Feira").join(", ")}), com ${max} voto${max === 1 ? "" : "s"} cada. Escolhe um deles para desempatar:</p>
      <div class="inline-form" style="justify-content:center">
        <select id="desempate-select">${empatados.map(x => `<option value="${x.i}">${escapeHtml(DIAS_LABEL[x.i])}-Feira</option>`).join("")}</select>
        <button class="primary" id="aplicar-dia-btn">Aplicar como Dia da Semana${CALENDAR_ICON}</button>
      </div>
      <p class="hint" id="aplicar-dia-msg" style="text-align:center"></p>
    `;
    document.getElementById("aplicar-dia-btn").addEventListener("click", () => {
      aplicarDia(Number(document.getElementById("desempate-select").value));
    });
  }
}

function syncCardWidths() {
  const master = document.querySelector(".card-fit");
  if (!master) return;
  const w = master.getBoundingClientRect().width;
  document.querySelectorAll(".card-sync").forEach(el => {
    el.style.width = w + "px";
  });
}

render();
syncCardWidths();
window.addEventListener("resize", syncCardWidths);
