/* firebase-config.js — configuração pública do projeto Firebase usado para
   sincronizar os dados entre todos os membros do grupo em tempo real. Estes
   valores não são secretos (são normais de ver no código de qualquer site
   que use Firebase); a proteção real está nas regras do Firestore. Sem
   este ficheiro, o site continua a funcionar normalmente, mas cada pessoa
   passa a ver só os dados guardados no seu próprio browser (sem
   sincronização), tal como acontecia antes desta funcionalidade existir. */

const firebaseConfig = {
  apiKey: "AIzaSyA9CYvjQMFnZyFlpC9boCXDWcrq1T_sl2w",
  authDomain: "pagina-jogos-votacao.firebaseapp.com",
  projectId: "pagina-jogos-votacao",
  storageBucket: "pagina-jogos-votacao.firebasestorage.app",
  messagingSenderId: "304461250588",
  appId: "1:304461250588:web:1533a3591d21798fff9fd9",
};

if (typeof firebase !== "undefined") {
  firebase.initializeApp(firebaseConfig);
}
