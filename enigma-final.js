// Lista de senhas válidas (uma de cada cartão)
const senhasValidas = [
  "aurora",
  "neon",
  "circuito",
  "vector",
  "atlas",
  "sigma"
];

// Normaliza: remove acentos, espaços extras e deixa minúsculo
function normalizar(str = "") {
  return String(str)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

// Mensagem de erro
function mostrarErro(msg) {
  const el = document.getElementById("error-message");
  el.innerHTML = msg;
  el.style.display = "block";
  el.style.animation = "shake 0.4s";
  setTimeout(() => (el.style.animation = ""), 400);
}

function esconderErro() {
  document.getElementById("error-message").style.display = "none";
}

// Verificar senha
function verificarSenha() {
  const senhaDigitada = normalizar(document.getElementById("senha-final").value);

  if (!senhaDigitada) {
    mostrarErro("⚠️ Digite a senha para continuar!");
    return;
  }

  function verificarSenhas() {
    const senhasValidas = [
        "crimsonfox",
        "digitalblade",
        "redcipher",
        "starencode",
        "nightfox",
        "safecode"
    ];

    const input = document.getElementById("senha").value.trim().toLowerCase();

    if (senhasValidas.includes(input)) {
        window.location.href = "desafio-simbolos.html"; // 👉 redireciona para página 2
    } else {
        document.getElementById("erro").innerText = "Senha incorreta!";
        document.getElementById("erro").style.display = "block";
    }
}


  const acertou = senhasValidas.includes(senhaDigitada);

  if (acertou) {
    esconderErro();
    setTimeout(() => {
      window.location.href = "desafio-simbolos.html";
    }, 300);
  } else {
    mostrarErro(`
      ❌ Senha incorreta!<br>
      Verif
