/* ============================
   CONFIGURAÇÕES DO ENIGMA  
============================ */

const respostaCorreta = "xoxo te aguarda"; // resposta final da frase codificada

let tempoRestante = 20 * 60; // 20 minutos em segundos (1200)
let timerInterval = null;

/* ============================
   NORMALIZAR TEXTO
============================ */

function normalizar(str = "") {
    return String(str)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // remove acentos
        .toLowerCase()
        .trim()
        .replace(/\s+/g, " "); // normaliza espaços múltiplos
}

/* ============================
   INICIAR TIMER
============================ */

function iniciarTimer() {
    const timerDisplay = document.getElementById("timer-display");

    timerInterval = setInterval(() => {
        tempoRestante--;

        let minutos = Math.floor(tempoRestante / 60);
        let segundos = tempoRestante % 60;

        timerDisplay.textContent =
            String(minutos).padStart(2, "0") + ":" +
            String(segundos).padStart(2, "0");

        if (tempoRestante <= 0) {
            clearInterval(timerInterval);
            salvarResultado(false); // tempo acabou → derrota
        }

    }, 1000);
}

/* ============================
   VERIFICAR RESPOSTA
============================ */

function verificarResposta() {
    const respostaJogador = normalizar(
        document.getElementById("resposta").value
    );

    if (respostaJogador === normalizar(respostaCorreta)) {
        clearInterval(timerInterval);
        salvarResultado(true);
    } else {
        mostrarErro();
    }
}

/* ============================
   MOSTRAR ERRO VISUAL
============================ */

function mostrarErro() {
    const box = document.getElementById("erro");
    box.style.display = "block";
    box.style.animation = "shake 0.4s";

    setTimeout(() => {
        box.style.animation = "";
    }, 400);
}

/* ============================
   SALVAR RESULTADO E IR PARA O RANKING
============================ */

function salvarResultado(acertou) {
    let nome = prompt("Insira seu nome para o ranking:");

    if (!nome || nome.trim() === "") {
        nome = "Jogador Desconhecido";
    }

    const tempoUsado = (20 * 60) - tempoRestante;

    const dados = {
        nome: nome.trim(),
        tempo: acertou ? tempoUsado : null,
        status: acertou ? "✔ Acertou" : "✘ Tempo Esgotado"
    };

    // salva no localStorage (um array)
    let ranking = JSON.parse(localStorage.getItem("ranking-simbolos") || "[]");
    ranking.push(dados);

    // salvar de volta
    localStorage.setItem("ranking-simbolos", JSON.stringify(ranking));

    // ir para ranking
    window.location.href = "ranking.html";
}

/* ============================
   INICIAR AUTOMATICAMENTE
============================ */

window.onload = () => {
    iniciarTimer();

    document.getElementById("btn-enviar")
        .addEventListener("click", verificarResposta);
};
