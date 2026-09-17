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
