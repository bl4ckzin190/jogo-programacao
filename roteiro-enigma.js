// Senhas corretas
const senhasCorretas = {
    senha1: 'PROGRAMAR',
    senha2: 'DESIGN',
    senha3: 'FUTURO'
};

let tempo = 0;
let timer;

// Normalização
const normalizar = str =>
    str.normalize("NFD")
       .replace(/[\u0300-\u036f]/g, "")
       .toUpperCase()
       .trim();

// -----------------------------
// VERIFICAÇÃO DAS SENHAS
// -----------------------------
function verificarSenhas() {
    const senha1 = normalizar(document.getElementById('senha1').value);
    const senha2 = normalizar(document.getElementById('senha2').value);
    const senha3 = normalizar(document.getElementById('senha3').value);

    const errorMsg = document.getElementById('error-message');

    if (!senha1 || !senha2 || !senha3) {
        errorMsg.textContent = '⚠️ Preencha todas as 3 senhas!';
        errorMsg.style.display = 'block';
        return;
    }

    if (
        senha1 === senhasCorretas.senha1 &&
        senha2 === senhasCorretas.senha2 &&
        senha3 === senhasCorretas.senha3
    ) {
        errorMsg.style.display = 'none';
        desbloquearEnigma();
    } else {
        errorMsg.innerHTML = `
            <p>❌ ACESSO NEGADO!</p>
            <p>Uma ou mais senhas estão incorretas.</p>
            <p>Verifique os cards e tente novamente.</p>
        `;
        errorMsg.style.display = 'block';
        errorMsg.style.animation = 'shake 0.5s';

        setTimeout(() => {
            errorMsg.style.animation = '';
        }, 500);
    }
}

// -----------------------------
// TELA DO ENIGMA
// -----------------------------
function desbloquearEnigma() {
    document.getElementById("password-screen").style.display = "none";
    document.getElementById("enigma-screen").style.display = "block";

    iniciarTimer();
}

function iniciarTimer() {
    timer = setInterval(() => {
        tempo++;
        atualizarTimer();
    }, 1000);
}

function atualizarTimer() {
    const minutos = String(Math.floor(tempo / 60)).padStart(2, '0');
    const segundos = String(tempo % 60).padStart(2, '0');
    document.getElementById("timer-display").textContent = `${minutos}:${segundos}`;
}

// -----------------------------
// VERIFICAÇÃO DO ENIGMA
// -----------------------------
function verificarEnigma() {
    const r1 = parseInt(document.getElementById("answer1").value);
    const r2 = parseInt(document.getElementById("answer2").value);
    const r3 = parseInt(document.getElementById("answer3").value);

    const erro = document.getElementById("enigma-error");

    if (r1 === 13 && r2 === 21 && r3 === 34) {
        erro.style.display = "none";
        finalizarMissao();
    } else {
        erro.style.display = "block";
        erro.style.animation = "shake 0.5s";

        setTimeout(() => {
            erro.style.animation = "";
        }, 500);
    }
}

// -----------------------------
// TELA DE VITÓRIA
// -----------------------------
function finalizarMissao() {
    clearInterval(timer);

    document.getElementById("enigma-screen").style.display = "none";
    document.getElementById("victory-screen").style.display = "block";

    const minutos = String(Math.floor(tempo / 60)).padStart(2, '0');
    const segundos = String(tempo % 60).padStart(2, '0');
    
    document.getElementById("final-time").textContent = `${minutos}:${segundos}`;
}


