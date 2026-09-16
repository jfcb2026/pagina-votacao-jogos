initPage("links.html");

document.getElementById("import-btn").innerHTML = `Importar de Excel${IMPORT_ICON}`;

let links = loadStore("links");
let colunas = loadStore("colunasLinks");

function persist() { saveStore("links", links); }

function coreCol() { return colunas.find(c => c.core) || colunas[0]; }

function updateHint() {
  document.getElementById("import-hint").textContent =
    `A importação de Excel acrescenta links novos e atualiza os existentes (por "${coreCol().label}"). Usa estes cabeçalhos na 1ª linha da folha: ${colunas.map(c => c.label).join(", ")}.`;
}

function renderHead() {
  const table = document.getElementById("links-table");
  let colgroup = table.querySelector("colgroup");
  if (!colgroup) {
    colgroup = document.createElement("colgroup");
    table.insertBefore(colgroup, table.firstChild);
  }
  colgroup.innerHTML = colunas.map(() => `<col style="width:330px">`).join("") +
    `<col class="col-actions" style="width:150px">`;

  document.getElementById("table-head").innerHTML =
    colunas.map(c => `<th>${escapeHtml(c.label)}</th>`).join("") +
    `<th class="col-actions"></th>`;
}

function render() {
  updateHint();
  renderHead();
  const body = document.getElementById("table-body");
  body.innerHTML = links.map((l, i) => `
    <tr data-idx="${i}">
      ${colunas.map(c => `<td><input type="text" data-field="${c.id}" value="${escapeHtml(l[c.id] ?? "")}"></td>`).join("")}
      <td class="col-actions">
        <button class="small danger remove-btn" data-idx="${i}">Remover${TRASH_ICON}</button>
      </td>
    </tr>
  `).join("");

  body.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", () => {
      const idx = Number(input.closest("tr").dataset.idx);
      links[idx][input.dataset.field] = input.value;
      persist();
    });
  });

  body.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.dataset.idx);
      if (!confirm(`Remover "${links[idx][coreCol().id]}"?`)) return;
      links.splice(idx, 1);
      persist();
      render();
    });
  });

  initColumnResize(document.getElementById("links-table"), "colWidthsLinks");
  syncTableWidth();
}

function syncTableWidth() {
  const table = document.getElementById("links-table");
  const cols = table.querySelectorAll("colgroup col");
  let total = 0;
  cols.forEach(col => { total += parseFloat(col.style.width) || 0; });
  if (total > 0) table.style.width = total + "px";
}

document.getElementById("add-link-btn").addEventListener("click", () => {
  const novo = {};
  colunas.forEach(c => novo[c.id] = "");
  links.push(novo);
  persist();
  render();
});

document.getElementById("import-btn").addEventListener("click", () => {
  document.getElementById("import-input").click();
});

document.getElementById("import-input").addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;
  readExcelFile(file, rows => {
    const core = coreCol();
    rows.forEach(row => {
      const nome = String(row[core.label] ?? row[core.id] ?? "").trim();
      if (!nome) return;
      let target = links.find(l => String(l[core.id] ?? "").trim().toLowerCase() === nome.toLowerCase());
      if (!target) {
        target = {};
        colunas.forEach(c => target[c.id] = "");
        links.push(target);
      }
      colunas.forEach(c => {
        if (c.id === core.id) { target[c.id] = nome; return; }
        const val = String(row[c.label] ?? row[c.id] ?? "");
        if (val) target[c.id] = val;
      });
    });
    persist();
    render();
    e.target.value = "";
  });
});

render();
