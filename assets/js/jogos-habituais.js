initPage("jogos-habituais.html");

document.getElementById("import-btn").innerHTML = `Importar de Excel${IMPORT_ICON}`;

let jogos = loadStore("jogosHabituais");
let colunas = loadStore("colunasHabituais");

function persist() { saveStore("jogosHabituais", jogos); }

function coreCol() { return colunas.find(c => c.core) || colunas[0]; }

function updateHint() {
  document.getElementById("import-hint").textContent =
    `A importação de Excel acrescenta jogos novos e atualiza os existentes (por "${coreCol().label}"), sem apagar os restantes. Usa estes cabeçalhos na 1ª linha da folha: ${colunas.map(c => c.label).join(", ")}.`;
}

function renderHead() {
  const table = document.getElementById("habituais-table");
  let colgroup = table.querySelector("colgroup");
  if (!colgroup) {
    colgroup = document.createElement("colgroup");
    table.insertBefore(colgroup, table.firstChild);
  }
  colgroup.innerHTML = colunas.map(() => `<col style="width:200px">`).join("") +
    `<col class="col-actions" style="width:100px">`;

  document.getElementById("table-head").innerHTML =
    colunas.map(c => `<th>${escapeHtml(c.label)}</th>`).join("") +
    `<th class="col-actions"></th>`;
}

function render() {
  const core = coreCol();
  jogos.sort((a, b) => String(a[core.id] ?? "").localeCompare(String(b[core.id] ?? ""), "pt", { sensitivity: "base" }));
  updateHint();
  renderHead();
  const body = document.getElementById("table-body");
  body.innerHTML = jogos.map((j, i) => `
    <tr data-idx="${i}">
      ${colunas.map(c => `<td><input type="text" data-field="${c.id}" value="${escapeHtml(j[c.id] ?? "")}"></td>`).join("")}
      <td class="col-actions"><button class="small danger remove-btn" data-idx="${i}">Remover${TRASH_ICON}</button></td>
    </tr>
  `).join("");

  body.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", () => {
      const idx = Number(input.closest("tr").dataset.idx);
      jogos[idx][input.dataset.field] = input.value;
      persist();
    });
  });

  body.querySelectorAll(`input[data-field="${core.id}"]`).forEach(input => {
    input.addEventListener("blur", () => render());
  });

  body.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.dataset.idx);
      if (!confirm(`Remover "${jogos[idx][coreCol().id]}"?`)) return;
      jogos.splice(idx, 1);
      persist();
      render();
    });
  });

  initColumnResize(document.getElementById("habituais-table"), "colWidthsHabituais");
}

document.getElementById("add-jogo-btn").addEventListener("click", () => {
  openFormModal({
    title: "Novo Jogo",
    fields: colunas.map(c => ({ id: c.id, label: c.label, required: c.core })),
    submitLabel: "Adicionar",
    onSubmit: dados => {
      const novo = {};
      colunas.forEach(c => novo[c.id] = dados[c.id] || "");
      jogos.push(novo);
      persist();
      render();
    }
  });
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
      let target = jogos.find(j => String(j[core.id] ?? "").trim().toLowerCase() === nome.toLowerCase());
      if (!target) {
        target = {};
        colunas.forEach(c => target[c.id] = "");
        jogos.push(target);
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
