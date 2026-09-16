initPage("backoffice.html");

document.getElementById("export-all-btn").innerHTML = `Exportar tudo${EXPORT_ICON}`;
document.getElementById("add-member-btn").innerHTML = `Adicionar${PLUS_ICON}`;
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
document.getElementById("sync-push-btn").innerHTML = `Enviar dados deste browser para a nuvem${CLOUD_UPLOAD_ICON}`;
document.getElementById("export-backup-btn").innerHTML = `Exportar Backup${SAVE_ICON}`;
document.getElementById("import-backup-btn").innerHTML = `Importar Backup${IMPORT_ICON}`;
document.getElementById("force-unlock-votacao-btn").innerHTML = `Forçar Desbloqueio da Votação${UNLOCK_ICON}`;

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

/* ---- Votação Semanal — Desbloquear Votação (botão de segurança) ---- */
document.getElementById("force-unlock-votacao-btn").addEventListener("click", () => {
  if (!confirm("Forçar o desbloqueio da votação atual? A tabela volta a ficar editável e o vencedor deixa de estar anunciado. Os votos dados até agora são mantidos.")) return;
  votacao.validado = false;
  votacao.confirmado = false;
  saveStore("votacaoSemanal", votacao);
  renderSlots();
  document.getElementById("force-unlock-msg").textContent = "Votação desbloqueada.";
});

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
  downloadJson("passeios.json", loadStore("eventos"));
  downloadJson("votacao.json", loadStore("votacaoSemanal"));
  downloadJson("historico-vencedores.json", loadStore("historicoVencedores"));
  downloadJson("dia-semana-jogo.json", loadStore("diaSemanaJogo"));
});

/* ---- Cópia de Segurança (Backup) ----
   Ao contrário do "Exportar tudo" acima (pensado para atualizar os
   ficheiros de assets/data/), isto guarda TUDO num único ficheiro,
   pronto a voltar a carregar no site com "Importar Backup" caso alguma
   vez seja preciso repor os dados (ex.: um problema na sincronização, ou
   querer voltar atrás depois de um teste). Usa exatamente as mesmas
   listas que estão sincronizadas com a nuvem (CLOUD_SYNC_KEYS). */
document.getElementById("export-backup-btn").addEventListener("click", () => {
  const backup = {};
  CLOUD_SYNC_KEYS.forEach(key => { backup[key] = loadStore(key); });
  const dataLabel = new Date().toISOString().slice(0, 10);
  downloadJson(`jogos-amigos-backup-${dataLabel}.json`, backup);
});

document.getElementById("import-backup-btn").addEventListener("click", () => {
  document.getElementById("import-backup-input").click();
});

document.getElementById("import-backup-input").addEventListener("change", () => {
  const input = document.getElementById("import-backup-input");
  const msg = document.getElementById("backup-msg");
  const file = input.files[0];
  if (!file) return;

  if (!confirm("Importar este ficheiro? Isto substitui os dados atuais (neste browser e, se a sincronização estiver ativa, também para todos os membros) pelos dados guardados no ficheiro.")) {
    input.value = "";
    return;
  }

  const reader = new FileReader();
  reader.onload = e => {
    let dados;
    try {
      dados = JSON.parse(e.target.result);
    } catch (err) {
      msg.textContent = "Não foi possível ler este ficheiro. Confirma que é um backup exportado por este site.";
      input.value = "";
      return;
    }

    const chavesEncontradas = CLOUD_SYNC_KEYS.filter(key => Object.prototype.hasOwnProperty.call(dados, key));
    if (chavesEncontradas.length === 0) {
      msg.textContent = "Este ficheiro não tem dados reconhecidos. Confirma que é um backup exportado por este site.";
      input.value = "";
      return;
    }

    chavesEncontradas.forEach(key => saveStore(key, dados[key]));
    msg.textContent = `Backup importado (${chavesEncontradas.length} listas). A recarregar a página...`;
    input.value = "";
    setTimeout(() => window.location.reload(), 1200);
  };
  reader.readAsText(file);
});
