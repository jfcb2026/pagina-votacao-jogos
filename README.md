# Página De Jogos De Amigos

Site partilhado do grupo para votar jogos semanalmente, gerir listas de jogos e organizar eventos.

## Como testar localmente

Os ficheiros JSON em `assets/data/` só são carregados por `fetch`, que os browsers bloqueiam ao abrir os
ficheiros HTML diretamente (`file://`). Por isso, para já, o site guarda os dados no armazenamento local do
browser (`localStorage`), semeado a partir de valores de exemplo. Podes simplesmente abrir `index.html`
diretamente no browser para testar — não precisas de correr nenhum servidor.

Sugestão, se preferires mesmo assim correr um servidor local (por exemplo, para testar em mais do que um
browser/dispositivo ao mesmo tempo): usa a extensão "Live Server" do VS Code, ou corre `python -m http.server`
dentro desta pasta e abre `http://localhost:8000`.

## Password de acesso

A password inicial está definida em `assets/js/auth.js` (ficheiro que fica fora do repositório — ver
`.gitignore` — e que deves criar localmente a partir de `assets/js/auth.example.js`). Depois de publicado,
a password pode ser alterada em qualquer altura na página `backoffice.html`, na secção "Password de Acesso".

## Estrutura

- `index.html` — ecrã de acesso (password)
- `votacao-semanal.html` — votação semanal de jogos
- `jogos-habituais.html` — lista de jogos habituais do grupo
- `jogos-nao-jogados.html` — lista de jogos ainda não jogados
- `wishlist.html` — wishlist de jogos pagos, com reações Like/Dislike
- `eventos.html` — escape rooms, passeios, almoços e jantares
- `backoffice.html` — gestão do site (não está no menu principal)
- `assets/css/style.css` — estilos (usados por todas as páginas)
- `assets/js/common.js` — dados partilhados, autenticação, navegação e utilitários
- `assets/js/auth.js` — password inicial (gitignored, não vai para o repositório)
- `assets/data/*.json` — dados de exemplo/seed; podem ser atualizados a partir do botão
  "Exportar dados" no Backoffice e depois enviados (commit) para o repositório

## Nota sobre persistência de dados

Por agora, os dados (votos, jogos, reações, eventos) ficam guardados no `localStorage` do browser de cada
pessoa — não são partilhados automaticamente entre membros diferentes. O Backoffice tem um botão para
exportar o estado atual como ficheiros JSON, que podem ser colocados manualmente em `assets/data/` e
enviados para o repositório. Uma solução de sincronização automática entre todos os membros (por exemplo,
via GitHub API ou um serviço gratuito como Firebase) fica em aberto para uma fase seguinte.
