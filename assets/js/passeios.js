initPage("passeios.html");

let eventos = loadStore("eventos");
let membros = loadStore("membros");
let tipos = loadStore("tiposEvento");
let colunas = loadStore("colunasEventos");

function persist() { saveStore("eventos", eventos); }

function tipoOptionsHtml(selected) {
  let html = `<option value="">—</option>`;
  tipos.forEach(t => {
    const sel = t === selected ? "selected" : "";
    html += `<option value="${escapeHtml(t)}" ${sel}>${escapeHtml(t)}</option>`;
  });
  return html;
}

function defaultColWidth(c) {
  if (c.type === "textarea") return "260px";
  if (c.type === "select") return "160px";
  return "200px";
}

function renderHead() {
  const table = document.getElementById("eventos-table");
  let colgroup = table.querySelector("colgroup");
  if (!colgroup) {
    colgroup = document.createElement("colgroup");
    table.insertBefore(colgroup, table.firstChild);
  }
  colgroup.innerHTML = colunas.map(c => `<col style="width:${defaultColWidth(c)}">`).join("") +
    membros.map(() => `<col style="width:90px">`).join("") +
    `<col style="width:140px"><col class="col-actions" style="width:110px">`;

  document.getElementById("table-head").innerHTML =
    colunas.map(c => `<th>${escapeHtml(c.label)}</th>`).join("") +
    membros.map(m => `<th class="text-center">${escapeHtml(m)}</th>`).join("") +
    `<th class="text-center">Total Aderentes</th>` +
    `<th class="col-actions"></th>`;
}

function totalAderentes(ev) {
  return Object.values(ev.respostas || {}).filter(v => v === "adere").length;
}

function fieldHtml(c, ev) {
  const val = ev[c.id] ?? "";
  if (c.type === "select") return `<select data-field="${c.id}">${tipoOptionsHtml(val)}</select>`;
  if (c.type === "textarea") return `<textarea rows="2" data-field="${c.id}">${escapeHtml(val)}</textarea>`;
  return `<input type="text" data-field="${c.id}" value="${escapeHtml(val)}">`;
}

function render() {
  renderHead();
  const body = document.getElementById("table-body");
  body.innerHTML = eventos.map((ev, i) => {
    if (!ev.respostas) ev.respostas = {};
    return `
      <tr data-idx="${i}">
        ${colunas.map(c => `<td>${fieldHtml(c, ev)}</td>`).join("")}
        ${membros.map(m => {
          const resposta = ev.respostas[m] || "";
          return `
            <td class="text-center">
              <div class="member-response-btns">
                <button class="icon-btn adere ${resposta === "adere" ? "active" : ""}" data-idx="${i}" data-membro="${escapeHtml(m)}" data-valor="adere" title="Adere">✓</button>
                <button class="icon-btn nao-adere ${resposta === "nao-adere" ? "active" : ""}" data-idx="${i}" data-membro="${escapeHtml(m)}" data-valor="nao-adere" title="Não adere">✕</button>
              </div>
            </td>
          `;
        }).join("")}
        <td class="text-center">${totalAderentes(ev)}</td>
        <td class="col-actions"><button class="small danger remove-btn" data-idx="${i}">Remover${TRASH_ICON}</button></td>
      </tr>
    `;
  }).join("");

  body.querySelectorAll("input, select, textarea").forEach(field => {
    field.addEventListener("input", () => {
      const idx = Number(field.closest("tr").dataset.idx);
      eventos[idx][field.dataset.field] = field.value;
      persist();
    });
    field.addEventListener("change", () => {
      const idx = Number(field.closest("tr").dataset.idx);
      eventos[idx][field.dataset.field] = field.value;
      persist();
    });
  });

  body.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.dataset.idx);
      if (!confirm("Remover este passeio?")) return;
      eventos.splice(idx, 1);
      persist();
      render();
    });
  });

  body.querySelectorAll(".member-response-btns button").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.dataset.idx);
      const membro = btn.dataset.membro;
      const valor = btn.dataset.valor;
      const respostas = eventos[idx].respostas || (eventos[idx].respostas = {});
      respostas[membro] = respostas[membro] === valor ? undefined : valor;
      if (respostas[membro] === undefined) delete respostas[membro];
      persist();
      render();
    });
  });

  initColumnResize(document.getElementById("eventos-table"), "colWidthsEventos");
}

document.getElementById("add-evento-btn").addEventListener("click", () => {
  const novo = { respostas: {} };
  colunas.forEach(c => novo[c.id] = "");
  eventos.push(novo);
  persist();
  render();
});

render();
