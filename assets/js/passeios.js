initPage("passeios.html");

let eventos = loadStore("eventos");
let membros = loadStore("membros").sort((a, b) => a.localeCompare(b, "pt"));
let colunas = loadStore("colunasEventos");
let editingLink = {};

function atribuirIds(lista) {
  const vistos = {};
  let mudou = false;
  lista.forEach(ev => {
    if (ev.id) return;
    const base = String(ev.descricao ?? "").trim().toLowerCase();
    let h = 0;
    for (let i = 0; i < base.length; i++) h = (h * 31 + base.charCodeAt(i)) | 0;
    vistos[h] = (vistos[h] || 0) + 1;
    ev.id = "p" + (h >>> 0).toString(36) + "_" + vistos[h];
    mudou = true;
  });
  return mudou;
}

function novoIdEvento() {
  return "p" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function persistMerged(fn) {
  saveStoreMerged("eventos", eventos, lista => { atribuirIds(lista); fn(lista); });
}

atribuirIds(eventos);

function reloadFromStore() {
  eventos = loadStore("eventos");
  membros = loadStore("membros").sort((a, b) => a.localeCompare(b, "pt"));
  colunas = loadStore("colunasEventos");
  garantirColunaDescricao(false);
  atribuirIds(eventos);
}

function normalizeLinkUrl(valor) {
  const v = (valor || "").trim();
  if (!v) return v;
  return /^https?:\/\//i.test(v) ? v : "https://" + v;
}

function persist() { saveStore("eventos", eventos); }

function linkColId() {
  const c = colunas.find(isLinkCol);
  return c ? c.id : "link";
}

function garantirColunaDescricao(salvar) {
  let mudou = false;
  const descricao = colunas.find(c => c.id === "descricao");
  if (descricao) {
    if (!descricao.core) { descricao.core = true; mudou = true; }
    if (descricao.type === "textarea") { delete descricao.type; mudou = true; }
  } else {
    colunas.unshift({ id: "descricao", label: "Descrição", core: true });
    mudou = true;
  }

  if (mudou && salvar) {
    saveStore("colunasEventos", colunas);
  }
}

garantirColunaDescricao(true);

function defaultColWidth(c) {
  if (c.type === "textarea") return "260px";
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

function isLinkCol(c) {
  return c.id === "link" || (c.label || "").trim().toLowerCase() === "link";
}

function fieldHtml(c, ev, idx) {
  const val = ev[c.id] ?? "";
  if (isLinkCol(c)) {
    if (editingLink[idx] || !val) {
      return `<input type="text" class="link-input" data-field="${c.id}" data-idx="${idx}" value="${escapeHtml(val)}" placeholder="Cola aqui o link">`;
    }
    return `
      <div class="link-cell">
        <button type="button" class="small link-open-btn" data-idx="${idx}">Abrir Link${EXTERNAL_LINK_ICON}</button>
        <button type="button" class="icon-btn link-edit-btn" data-idx="${idx}" title="Editar link">${EDIT_ICON}</button>
      </div>
    `;
  }
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
        ${colunas.map(c => `<td>${fieldHtml(c, ev, i)}</td>`).join("")}
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

  body.querySelectorAll(".link-input").forEach(input => {
    function sair() {
      const idx = Number(input.dataset.idx);
      if ((eventos[idx][linkColId()] || "").trim()) {
        delete editingLink[idx];
        render();
      }
    }
    input.addEventListener("blur", sair);
    input.addEventListener("keydown", e => { if (e.key === "Enter") input.blur(); });
  });

  body.querySelectorAll(".link-open-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.dataset.idx);
      const url = normalizeLinkUrl(eventos[idx][linkColId()]);
      if (url) window.open(url, "_blank", "noopener");
    });
  });

  body.querySelectorAll(".link-edit-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.dataset.idx);
      editingLink[idx] = true;
      render();
      const input = body.querySelector(`.link-input[data-idx="${idx}"]`);
      if (input) input.focus();
    });
  });

  body.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.dataset.idx);
      if (!confirm("Remover este passeio?")) return;
      const id = eventos[idx].id;
      eventos.splice(idx, 1);
      persistMerged(lista => {
        const i = lista.findIndex(e => e.id === id);
        if (i >= 0) lista.splice(i, 1);
      });
      render();
    });
  });

  body.querySelectorAll(".member-response-btns button").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.dataset.idx);
      const membro = btn.dataset.membro;
      const valor = btn.dataset.valor;
      const id = eventos[idx].id;
      const respostas = eventos[idx].respostas || (eventos[idx].respostas = {});
      const novoValor = respostas[membro] === valor ? undefined : valor;
      if (novoValor === undefined) delete respostas[membro]; else respostas[membro] = novoValor;
      persistMerged(lista => {
        const alvo = lista.find(e => e.id === id);
        if (!alvo) return;
        if (!alvo.respostas) alvo.respostas = {};
        if (novoValor === undefined) delete alvo.respostas[membro]; else alvo.respostas[membro] = novoValor;
      });
      render();
    });
  });

  initColumnResize(document.getElementById("eventos-table"), "colWidthsEventos");
}

document.getElementById("add-evento-btn").addEventListener("click", () => {
  openFormModal({
    title: "Novo Passeio",
    fields: colunas.map(c => ({ id: c.id, label: c.label, required: c.core })),
    submitLabel: "Adicionar",
    onSubmit: dados => {
      const novo = { id: novoIdEvento(), respostas: {} };
      colunas.forEach(c => novo[c.id] = dados[c.id] || "");
      eventos.push(novo);
      persistMerged(lista => {
        if (!lista.some(e => e.id === novo.id)) lista.push(JSON.parse(JSON.stringify(novo)));
      });
      render();
    }
  });
});

render();
