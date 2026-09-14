initPage("backoffice.html");

document.getElementById("export-all-btn").innerHTML = `Exportar tudo${EXPORT_ICON}`;
document.getElementById("add-member-btn").innerHTML = `Adicionar${PLUS_ICON}`;
document.getElementById("add-type-btn").innerHTML = `Adicionar${PLUS_ICON}`;
document.getElementById("add-col-habituais-btn").innerHTML = `Adicionar${PLUS_ICON}`;
document.getElementById("add-col-nao-jogados-btn").innerHTML = `Adicionar${PLUS_ICON}`;
document.getElementById("add-col-wishlist-btn").innerHTML = `Adicionar${PLUS_ICON}`;
document.getElementById("add-col-eventos-btn").innerHTML = `Adicionar${PLUS_ICON}`;
document.getElementById("clear-historico-btn").innerHTML = `Limpar histórico de vencedores${TRASH_ICON}`;
document.getElementById("clear-reactions-btn").innerHTML = `Limpar reações (Likes/Dislikes)${REFRESH_ICON}`;
document.getElementById("empty-wishlist-btn").innerHTML = `Esvaziar lista da Wishlist${TRASH_ICON}`;
document.getElementById("empty-habituais-btn").innerHTML = `Esvaziar Jogos Habituais${TRASH_ICON}`;
document.getElementById("empty-nao-jogados-btn").innerHTML = `Esvaziar Jogos ainda não jogados${TRASH_ICON}`;
document.getElementById("save-password-btn").innerHTML = `Guardar nova password${SAVE_ICON}`;
document.getElementById("save-site-name-btn").innerHTML = `Guardar${SAVE_ICON}`;

/* ---- Sincronização com a nuvem ---- */
document.getElementById("sync-push-btn").addEventListener("click", () => {
  const msg = document.getElementById("sync-msg");
  if (typeof firebase === "undefined") {
    msg.textContent = "A sincronização não está configurada neste site.";
    return;
  }
  if (!_cloudReady) {
    msg.textContent = "Ainda a ligar à nuvem, tenta novamente daqui a alguns segundos.";
    return;
  }
  pushAllToCloud();
  msg.textContent = "Dados enviados para a nuvem.";
});

/* ---- Nome do Site ---- */
document.getElementById("site-name-input").value = loadStore("nomeSite");
document.getElementById("save-site-name-btn").addEventListener("click", () => {
  const val = document.getElementById("site-name-input").value.trim();
  if (!val) { document.getElementById("site-name-msg").textContent = "Escreve um nome."; return; }
  saveStore("nomeSite", val);
  document.getElementById("site-name-msg").textContent = "Nome atualizado.";
});

/* ---- Tema de Cores ---- */
function renderThemes() {
  const activo = getActiveTheme();
  const wrap = document.getElementById("theme-groups");
  wrap.innerHTML = THEME_GROUPS.map(g => `
    <div class="theme-group">
      <h3 class="theme-group-title">${escapeHtml(g.label)}</h3>
      <div class="theme-grid">
        ${THEMES.filter(t => t.group === g.id).map(t => `
          <button type="button" class="theme-swatch ${t.id === activo ? "active" : ""}" data-theme-id="${t.id}">
            <span class="theme-swatch-dots">
              ${t.colors.map(c => `<span style="background:${c}"></span>`).join("")}
            </span>
            <span class="theme-swatch-label">
              <strong>${escapeHtml(t.label)}</strong>
              <span class="theme-swatch-tag">${escapeHtml(t.tag)}</span>
            </span>
          </button>
        `).join("")}
      </div>
    </div>
  `).join("");

  wrap.querySelectorAll(".theme-swatch").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.themeId;
      saveStore("tema", id);
      applyTheme(id);
      renderThemes();
    });
  });
}

renderThemes();

/* ---- Password ---- */
document.getElementById("save-password-btn").addEventListener("click", () => {
  const val = document.getElementById("new-password").value;
  if (!val) { document.getElementById("password-msg").textContent = "Escreve uma password."; return; }
  setActivePassword(val);
  document.getElementById("new-password").value = "";
  document.getElementById("password-msg").textContent = "Password atualizada.";
});

/* ---- Membros ---- */
let membros = loadStore("membros");

function renderMembers() {
  const list = document.getElementById("member-list");
  list.innerHTML = membros.map((m, i) => `
    <span class="type-chip">
      <input type="text" class="member-name-input" data-idx="${i}" value="${escapeHtml(m)}" style="border:none;background:transparent;color:inherit;width:120px;padding:0">
      <button class="remove-member-btn" data-idx="${i}">x</button>
    </span>
  `).join("");

  list.querySelectorAll(".member-name-input").forEach(input => {
    input.addEventListener("change", () => {
      const idx = Number(input.dataset.idx);
      const oldName = membros[idx];
      const newName = input.value.trim();
      if (!newName) { input.value = oldName; return; }
      if (newName === oldName) return;
      if (membros.includes(newName)) { alert("Já existe um membro com esse nome."); input.value = oldName; return; }
      membros[idx] = newName;
      saveStore("membros", membros);
      renameMemberEverywhere(oldName, newName);
    });
  });

  list.querySelectorAll(".remove-member-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.dataset.idx);
      const name = membros[idx];
      if (!confirm(`Remover o membro "${name}"? Os seus votos/reações/respostas também são removidos.`)) return;
      membros.splice(idx, 1);
      saveStore("membros", membros);
      removeMemberEverywhere(name);
      renderMembers();
    });
  });
}

document.getElementById("add-member-btn").addEventListener("click", () => {
  const input = document.getElementById("new-member");
  const name = input.value.trim();
  if (!name) return;
  if (membros.includes(name)) { alert("Esse membro já existe."); return; }
  membros.push(name);
  saveStore("membros", membros);
  input.value = "";
  renderMembers();
});

renderMembers();

/* ---- Votação Semanal — Dia de Jogo ---- */
let diaSemanaJogo = loadStore("diaSemanaJogo");

function renderDiaJogo() {
  const select = document.getElementById("dia-jogo-select");
  select.innerHTML = WEEKDAY_NAMES.map((nome, i) => `<option value="${i}" ${i === diaSemanaJogo ? "selected" : ""}>${nome}</option>`).join("");
}

document.getElementById("dia-jogo-select").addEventListener("change", e => {
  diaSemanaJogo = Number(e.target.value);
  saveStore("diaSemanaJogo", diaSemanaJogo);
});

renderDiaJogo();

/* ---- Votação Semanal — Slots de Jogo ---- */
let votacao = loadStore("votacaoSemanal");

function renderSlots() {
  document.getElementById("slot-count").textContent = `${votacao.slots} jogo${votacao.slots === 1 ? "" : "s"} por membro`;
  const locked = !!votacao.validado;
  document.getElementById("add-slot-btn").disabled = locked;
  document.getElementById("remove-slot-btn").disabled = locked || votacao.slots <= 1;
  const msg = document.getElementById("slot-msg");
  msg.className = locked ? "login-error" : "hint";
  msg.textContent = locked
    ? "Não é possível alterar os slots enquanto a votação estiver validada. Reinicia os votos na Votação Semanal primeiro."
    : "";
}

function blockIfValidado() {
  if (!votacao.validado) return false;
  renderSlots();
  return true;
}

document.getElementById("add-slot-btn").addEventListener("click", () => {
  if (blockIfValidado()) return;
  votacao.slots += 1;
  Object.keys(votacao.votos).forEach(m => votacao.votos[m].push(""));
  saveStore("votacaoSemanal", votacao);
  renderSlots();
});

document.getElementById("remove-slot-btn").addEventListener("click", () => {
  if (blockIfValidado()) return;
  if (votacao.slots <= 1) return;
  if (!confirm("Remover o último slot de jogo? Os votos aí colocados perdem-se.")) return;
  votacao.slots -= 1;
  Object.keys(votacao.votos).forEach(m => votacao.votos[m] = votacao.votos[m].slice(0, votacao.slots));
  saveStore("votacaoSemanal", votacao);
  renderSlots();
});

renderSlots();

/* ---- Histórico de Vencedores ---- */
document.getElementById("clear-historico-btn").addEventListener("click", () => {
  if (!confirm("Limpar o histórico de jogos vencedores e a votação atual (votos e validação)? Esta ação não pode ser desfeita.")) return;
  emptyStore("historicoVencedores", []);

  votacao.validado = false;
  Object.keys(votacao.votos).forEach(m => {
    votacao.votos[m] = votacao.votos[m].map(() => "");
  });
  saveStore("votacaoSemanal", votacao);
  renderSlots();

  alert("Histórico de vencedores e votação atual limpos.");
});

/* ---- Tipos de evento ---- */
let tipos = loadStore("tiposEvento");

function renderTypes() {
  const list = document.getElementById("type-list");
  list.innerHTML = tipos.map((t, i) => `
    <span class="type-chip">${escapeHtml(t)} <button class="remove-type-btn" data-idx="${i}">x</button></span>
  `).join("");
  list.querySelectorAll(".remove-type-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      tipos.splice(Number(btn.dataset.idx), 1);
      saveStore("tiposEvento", tipos);
      renderTypes();
    });
  });
}

document.getElementById("add-type-btn").addEventListener("click", () => {
  const input = document.getElementById("new-type");
  const val = input.value.trim();
  if (!val) return;
  tipos.push(val);
  saveStore("tiposEvento", tipos);
  input.value = "";
  renderTypes();
});

renderTypes();

/* ---- Wishlist ---- */
document.getElementById("clear-reactions-btn").addEventListener("click", () => {
  if (!confirm("Limpar todas as reações (Likes/Dislikes) da Wishlist?")) return;
  const wishlist = loadStore("wishlist");
  wishlist.forEach(j => { j.reacoes = {}; });
  saveStore("wishlist", wishlist);
  alert("Reações limpas.");
});

document.getElementById("empty-wishlist-btn").addEventListener("click", () => {
  if (!confirm("Esvaziar por completo a lista da Wishlist? Esta ação não pode ser desfeita.")) return;
  emptyStore("wishlist", []);
  alert("Wishlist esvaziada.");
});

/* ---- Esvaziar listas de jogos ---- */
document.getElementById("empty-habituais-btn").addEventListener("click", () => {
  if (!confirm("Esvaziar por completo a lista de Jogos Habituais? Esta ação não pode ser desfeita.")) return;
  emptyStore("jogosHabituais", []);
  alert("Jogos Habituais esvaziados.");
});

document.getElementById("empty-nao-jogados-btn").addEventListener("click", () => {
  if (!confirm("Esvaziar por completo a lista de Jogos ainda não jogados? Esta ação não pode ser desfeita.")) return;
  emptyStore("jogosNaoJogados", []);
  alert("Jogos ainda não jogados esvaziados.");
});

/* ---- Colunas das tabelas de jogos ---- */
function initColumnManager(storageName, listElId, inputElId, addBtnId) {
  let colunas = loadStore(storageName);

  function persist() { saveStore(storageName, colunas); }

  function render() {
    const list = document.getElementById(listElId);
    list.innerHTML = colunas.map((c, i) => `
      <div class="column-row" data-idx="${i}">
        <button type="button" class="small col-move-up" data-idx="${i}" ${i === 0 ? "disabled" : ""} aria-label="Mover coluna para cima">↑</button>
        <button type="button" class="small col-move-down" data-idx="${i}" ${i === colunas.length - 1 ? "disabled" : ""} aria-label="Mover coluna para baixo">↓</button>
        <input type="text" class="col-label-input" data-idx="${i}" value="${escapeHtml(c.label)}">
        <button type="button" class="small danger col-remove-btn" data-idx="${i}" ${c.core ? `disabled title="Coluna de identificação do jogo, não pode ser removida"` : ""}>Remover${TRASH_ICON}</button>
      </div>
    `).join("");

    list.querySelectorAll(".col-label-input").forEach(input => {
      input.addEventListener("change", () => {
        const idx = Number(input.dataset.idx);
        const val = input.value.trim();
        if (!val) { input.value = colunas[idx].label; return; }
        colunas[idx].label = val;
        persist();
      });
    });

    list.querySelectorAll(".col-move-up").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.dataset.idx);
        if (idx === 0) return;
        [colunas[idx - 1], colunas[idx]] = [colunas[idx], colunas[idx - 1]];
        persist();
        render();
      });
    });

    list.querySelectorAll(".col-move-down").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.dataset.idx);
        if (idx === colunas.length - 1) return;
        [colunas[idx + 1], colunas[idx]] = [colunas[idx], colunas[idx + 1]];
        persist();
        render();
      });
    });

    list.querySelectorAll(".col-remove-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.dataset.idx);
        if (colunas[idx].core) return;
        if (!confirm(`Remover a coluna "${colunas[idx].label}"? Deixa de aparecer na tabela (os dados que já lá estavam não são apagados).`)) return;
        colunas.splice(idx, 1);
        persist();
        render();
      });
    });
  }

  document.getElementById(addBtnId).addEventListener("click", () => {
    const input = document.getElementById(inputElId);
    const label = input.value.trim();
    if (!label) return;
    const id = uniqueColId(slugifyColId(label), colunas);
    colunas.push({ id, label });
    persist();
    input.value = "";
    render();
  });

  render();
}

initColumnManager("colunasHabituais", "cols-habituais", "new-col-habituais", "add-col-habituais-btn");
initColumnManager("colunasNaoJogados", "cols-nao-jogados", "new-col-nao-jogados", "add-col-nao-jogados-btn");
initColumnManager("colunasWishlist", "cols-wishlist", "new-col-wishlist", "add-col-wishlist-btn");
initColumnManager("colunasEventos", "cols-eventos", "new-col-eventos", "add-col-eventos-btn");

/* ---- Exportar dados ---- */
document.getElementById("export-all-btn").addEventListener("click", () => {
  downloadJson("membros.json", loadStore("membros"));
  downloadJson("jogos-habituais.json", loadStore("jogosHabituais"));
  downloadJson("jogos-nao-jogados.json", loadStore("jogosNaoJogados"));
  downloadJson("wishlist.json", loadStore("wishlist"));
  downloadJson("eventos.json", loadStore("eventos"));
  downloadJson("tipos-evento.json", loadStore("tiposEvento"));
  downloadJson("votacao.json", loadStore("votacaoSemanal"));
  downloadJson("historico-vencedores.json", loadStore("historicoVencedores"));
  downloadJson("dia-semana-jogo.json", loadStore("diaSemanaJogo"));
});
