initPage("backoffice.html");

document.getElementById("add-member-btn").innerHTML = `Adicionar${PLUS_ICON}`;
document.getElementById("add-col-habituais-btn").innerHTML = `Adicionar${PLUS_ICON}`;
document.getElementById("add-col-nao-jogados-btn").innerHTML = `Adicionar${PLUS_ICON}`;
document.getElementById("add-col-wishlist-btn").innerHTML = `Adicionar${PLUS_ICON}`;
document.getElementById("add-col-eventos-btn").innerHTML = `Adicionar${PLUS_ICON}`;
document.getElementById("add-col-links-btn").innerHTML = `Adicionar${PLUS_ICON}`;
document.getElementById("clear-historico-btn").innerHTML = `Limpar histórico de vencedores${TRASH_ICON}`;
document.getElementById("clear-reactions-btn").innerHTML = `Limpar reações (Likes/Dislikes)${REFRESH_ICON}`;
document.getElementById("empty-wishlist-btn").innerHTML = `Esvaziar lista da Wishlist${TRASH_ICON}`;
document.getElementById("empty-habituais-btn").innerHTML = `Esvaziar Jogos Habituais${TRASH_ICON}`;
document.getElementById("empty-nao-jogados-btn").innerHTML = `Esvaziar Jogos ainda não jogados${TRASH_ICON}`;
document.getElementById("empty-links-btn").innerHTML = `Esvaziar Links${TRASH_ICON}`;
document.getElementById("save-password-btn").innerHTML = `Guardar Alterações${SAVE_ICON}`;

/* Os campos de password ficam com a mesma largura do botão "Guardar
   Alterações" (que varia com o texto/ícone), em vez de ocuparem a
   largura toda do form. */
function syncPasswordFieldWidths() {
  const btn = document.getElementById("save-password-btn");
  const w = btn.getBoundingClientRect().width;
  if (!w) return;
  ["old-password", "new-password"].forEach(id => {
    document.getElementById(id).style.width = w + "px";
  });
}
syncPasswordFieldWidths();
window.addEventListener("resize", syncPasswordFieldWidths);
document.getElementById("save-site-name-btn").innerHTML = `Guardar${SAVE_ICON}`;
document.getElementById("save-horario-jogo-btn").innerHTML = `Guardar${SAVE_ICON}`;
document.getElementById("sync-push-btn").innerHTML = `Enviar dados deste browser para a Nuvem${CLOUD_UPLOAD_ICON}`;
function syncToggleLabel() {
  return isCloudSyncPaused()
    ? `Retomar Ligação com a Nuvem${UNLOCK_ICON}`
    : `Parar Ligação com a Nuvem${STOP_ICON}`;
}
function atualizarBotaoSyncToggle() {
  const btn = document.getElementById("sync-toggle-btn");
  btn.innerHTML = syncToggleLabel();
  btn.classList.toggle("danger", !isCloudSyncPaused());
}
atualizarBotaoSyncToggle();
document.getElementById("export-backup-btn").innerHTML = `Exportar Backup${SAVE_ICON}`;
document.getElementById("import-backup-btn").innerHTML = `Importar Backup${IMPORT_ICON}`;
document.getElementById("force-unlock-votacao-btn").innerHTML = `Forçar Desbloqueio da Votação${UNLOCK_ICON}`;
document.getElementById("clear-votacao-atual-btn").innerHTML = `Limpar Votação Atual${TRASH_ICON}`;

/* ---- Sincronização com a Nuvem ---- */
function atualizarEstadoLigacao() {
  const dot = document.getElementById("sync-status-dot");
  const label = document.getElementById("sync-status-label");
  if (!dot || !label) return;

  if (isCloudSyncPaused()) {
    dot.className = "status-dot status-dot-gray";
    label.textContent = "Ligação interrompida";
    return;
  }
  if (typeof firebase === "undefined" || !firebase.apps || !firebase.apps.length) {
    dot.className = "status-dot status-dot-red";
    label.textContent = "Sincronização não configurada neste site";
    return;
  }
  if (!navigator.onLine) {
    dot.className = "status-dot status-dot-red";
    label.textContent = "Sem ligação à internet";
    return;
  }
  if (_cloudReady) {
    dot.className = "status-dot status-dot-green";
    label.textContent = "Ligado à Nuvem";
    return;
  }
  dot.className = "status-dot status-dot-orange";
  label.textContent = "A ligar à Nuvem...";
}
atualizarEstadoLigacao();
setInterval(atualizarEstadoLigacao, 2000);
window.addEventListener("online", atualizarEstadoLigacao);
window.addEventListener("offline", atualizarEstadoLigacao);

document.getElementById("sync-push-btn").addEventListener("click", () => {
  const msg = document.getElementById("sync-msg");
  if (typeof firebase === "undefined") {
    msg.textContent = "A sincronização não está configurada neste site.";
    return;
  }
  if (isCloudSyncPaused()) {
    msg.textContent = "A ligação com a Nuvem está interrompida. Clica em \"Retomar Ligação com a Nuvem\" primeiro.";
    return;
  }
  if (!_cloudReady) {
    msg.textContent = "Ainda a ligar à Nuvem, tenta novamente daqui a alguns segundos.";
    return;
  }
  pushAllToCloud();
  msg.textContent = "Dados enviados para a Nuvem.";
});

document.getElementById("sync-toggle-btn").addEventListener("click", () => {
  const msg = document.getElementById("sync-msg");
  if (isCloudSyncPaused()) {
    resumeCloudSync();
    return;
  }
  if (!confirm("Isto interrompe a sincronização com a Nuvem neste browser: as alterações feitas aqui deixam de ser enviadas ou recebidas até retomares. Continuar?")) return;
  pauseCloudSync();
  atualizarBotaoSyncToggle();
  msg.textContent = "Ligação com a Nuvem interrompida neste browser.";
  atualizarEstadoLigacao();
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
document.getElementById("save-password-btn").addEventListener("click", async () => {
  const oldInput = document.getElementById("old-password");
  const newInput = document.getElementById("new-password");
  const msg = document.getElementById("password-msg");
  const oldVal = oldInput.value;
  const newVal = newInput.value;

  if (!oldVal) { msg.textContent = "Escreve a password atual."; return; }
  if (!newVal) { msg.textContent = "Escreve a nova password."; return; }

  msg.textContent = "A verificar...";
  const correta = await verifyActivePassword(oldVal);
  if (!correta) { msg.textContent = "Password atual incorreta."; return; }

  await setActivePassword(newVal);
  oldInput.value = "";
  newInput.value = "";
  msg.textContent = "Password atualizada.";
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

/* ---- Votação do Dia de Jogo — Horário ---- */
document.getElementById("horario-jogo-input").value = loadStore("horarioJogo");
document.getElementById("save-horario-jogo-btn").addEventListener("click", () => {
  const val = document.getElementById("horario-jogo-input").value.trim();
  if (!val) { document.getElementById("horario-jogo-msg").textContent = "Escreve um horário."; return; }
  saveStore("horarioJogo", val);
  document.getElementById("horario-jogo-msg").textContent = "Horário atualizado.";
});

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

document.getElementById("clear-votacao-atual-btn").addEventListener("click", () => {
  if (!confirm("Limpar por completo a votação atual? Todos os votos dados são apagados (o histórico de vencedores anteriores não é afetado) e a tabela volta a ficar editável para uma nova ronda.")) return;
  votacao.validado = false;
  votacao.confirmado = false;
  Object.keys(votacao.votos).forEach(m => {
    votacao.votos[m] = votacao.votos[m].map(() => "");
  });
  saveStore("votacaoSemanal", votacao);
  renderSlots();
  document.getElementById("clear-votacao-atual-msg").textContent = "Votação atual limpa.";
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

document.getElementById("empty-links-btn").addEventListener("click", () => {
  if (!confirm("Esvaziar por completo a lista de Links? Esta ação não pode ser desfeita.")) return;
  emptyStore("links", []);
  alert("Links esvaziados.");
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
initColumnManager("colunasLinks", "cols-links", "new-col-links", "add-col-links-btn");

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
