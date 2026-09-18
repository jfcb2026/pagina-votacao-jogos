initPage("jogos-nao-jogados.html");

document.getElementById("import-btn").innerHTML = `Importar de Excel${IMPORT_ICON}`;

let jogos = loadStore("jogosNaoJogados");
let membros = loadStore("membros");
let colunas = loadStore("colunasNaoJogados");
let editingLink = {};

function persist() { saveStore("jogosNaoJogados", jogos); }

function coreCol() { return colunas.find(c => c.core) || colunas[0]; }

function normalizeLinkUrl(valor) {
  const v = (valor || "").trim();
  if (!v) return v;
  return /^https?:\/\//i.test(v) ? v : "https://" + v;
}

function renderColCell(c, jogo, idx) {
  const val = jogo[c.id] ?? "";
  if (c.id === "link") {
    if (editingLink[idx] || !val) {
      return `<td><input type="text" class="link-input" data-field="link" data-idx="${idx}" value="${escapeHtml(val)}" placeholder="Cola aqui o link"></td>`;
    }
    return `
      <td>
        <div class="link-cell">
          <button type="button" class="small link-open-btn" data-idx="${idx}">Abrir Link${EXTERNAL_LINK_ICON}</button>
          <button type="button" class="icon-btn link-edit-btn" data-idx="${idx}" title="Editar link">${EDIT_ICON}</button>
        </div>
      </td>
    `;
  }
  return `<td><input type="text" data-field="${c.id}" value="${escapeHtml(val)}"></td>`;
}

function countReactions(reacoes) {
  const vals = Object.values(reacoes || {});
  return {
    likes: vals.filter(v => v === "like").length,
    dislikes: vals.filter(v => v === "dislike").length,
  };
}

function updateHint() {
  document.getElementById("import-hint").textContent =
    `A importação de Excel acrescenta jogos novos e atualiza os existentes (por "${coreCol().label}"). Usa estes cabeçalhos na 1ª linha da folha: ${colunas.map(c => c.label).join(", ")}.`;
}

function renderHead() {
  const table = document.getElementById("nao-jogados-table");
  let colgroup = table.querySelector("colgroup");
  if (!colgroup) {
    colgroup = document.createElement("colgroup");
    table.insertBefore(colgroup, table.firstChild);
  }
  colgroup.innerHTML = colunas.map(() => `<col style="width:220px">`).join("") +
    membros.map(() => `<col style="width:110px">`).join("") +
    `<col style="width:130px"><col class="col-actions" style="width:290px">`;

  document.getElementById("table-head").innerHTML =
    colunas.map(c => `<th>${escapeHtml(c.label)}</th>`).join("") +
    membros.map(m => `<th class="text-center">${escapeHtml(m)}</th>`).join("") +
    `<th class="text-center">Votação</th><th class="col-actions"></th>`;
}

function render() {
  updateHint();
  renderHead();
  const body = document.getElementById("table-body");
  body.innerHTML = jogos.map((j, i) => {
    if (!j.reacoes) j.reacoes = {};
    const { likes, dislikes } = countReactions(j.reacoes);
    return `
      <tr data-idx="${i}">
        ${colunas.map(c => renderColCell(c, j, i)).join("")}
        ${membros.map(m => {
          const reacao = j.reacoes[m] || "";
          return `
            <td>
              <div class="reaction-btns">
                <button class="small like ${reacao === "like" ? "active" : ""}" data-idx="${i}" data-membro="${escapeHtml(m)}" data-valor="like">👍</button>
                <button class="small dislike ${reacao === "dislike" ? "active" : ""}" data-idx="${i}" data-membro="${escapeHtml(m)}" data-valor="dislike">👎</button>
              </div>
            </td>
          `;
        }).join("")}
        <td class="text-center"><span class="pill">👍 ${likes} &nbsp; 👎 ${dislikes}</span></td>
        <td class="col-actions">
          <button class="small migrate-btn" data-idx="${i}">Migrar p/ Habituais${MIGRATE_ICON}</button>
          <button class="small danger remove-btn" data-idx="${i}">Remover${TRASH_ICON}</button>
        </td>
      </tr>
    `;
  }).join("");

  body.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", () => {
      const idx = Number(input.closest("tr").dataset.idx);
      jogos[idx][input.dataset.field] = input.value;
      persist();
    });
  });

  body.querySelectorAll(".link-input").forEach(input => {
    function sair() {
      const idx = Number(input.dataset.idx);
      if ((jogos[idx].link || "").trim()) {
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
      const url = normalizeLinkUrl(jogos[idx].link);
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
      if (!confirm(`Remover "${jogos[idx][coreCol().id]}"?`)) return;
      jogos.splice(idx, 1);
      editingLink = {};
      persist();
      render();
    });
  });

  body.querySelectorAll(".migrate-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.dataset.idx);
      const jogo = jogos[idx];
      const nome = jogo[coreCol().id];
      if (!confirm(`Migrar "${nome}" para Jogos Habituais?`)) return;
      const habituais = loadStore("jogosHabituais");
      habituais.push({ jogo: nome, jogadores: jogo.info || "", dispositivo: "", link: jogo.link || "" });
      saveStore("jogosHabituais", habituais);
      jogos.splice(idx, 1);
      editingLink = {};
      persist();
      render();
    });
  });

  body.querySelectorAll(".reaction-btns button").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.dataset.idx);
      const membro = btn.dataset.membro;
      const valor = btn.dataset.valor;
      const reacoes = jogos[idx].reacoes || (jogos[idx].reacoes = {});
      reacoes[membro] = reacoes[membro] === valor ? undefined : valor;
      if (reacoes[membro] === undefined) delete reacoes[membro];
      persist();
      render();
    });
  });

  initColumnResize(document.getElementById("nao-jogados-table"), "colWidthsNaoJogados");
}

document.getElementById("add-jogo-btn").addEventListener("click", () => {
  const novo = { reacoes: {} };
  colunas.forEach(c => novo[c.id] = "");
  jogos.push(novo);
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
      let target = jogos.find(j => String(j[core.id] ?? "").trim().toLowerCase() === nome.toLowerCase());
      if (!target) {
        target = { reacoes: {} };
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
