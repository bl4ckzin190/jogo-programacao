// enigma-final.js
// Lógica para o enigma final com símbolos e timer de 20 minutos

let tempo = 20 * 60; // 20 minutos em segundos
let intervalo;

// Inicia o timer
function iniciarTimer() {
    const timerElemento = document.getElementById('timer');

    intervalo = setInterval(() => {
        let minutos = Math.floor(tempo / 60);
        let segundos = tempo % 60;

        if (segundos < 10) segundos = '0' + segundos;

        timerElemento.textContent = `${minutos}:${segundos}`;

        if (tempo <= 0) {
            clearInterval(intervalo);
            enviarResposta(true);
        }

        tempo--;
    }, 1000);
}

// Envia a resposta para o ranking
function enviarResposta(expirou = false) {
    const nome = localStorage.getItem('nomeJogador') || 'Jogador Anônimo';
    const tempoFinal = 20 * 60 - tempo;
    const resposta = document.getElementById('resposta').value.trim();

    const dados = JSON.parse(localStorage.getItem('rankingGlobal') || '[]');

    dados.push({
        nome: nome,
        tempo: tempoFinal,
        expirou: expirou,
        resposta: resposta
    });

    localStorage.setItem('rankingGlobal', JSON.stringify(dados));

    window.location.href = 'ranking.html';
}

// Evento do botão
function verificarResposta() {
    enviarResposta(false);
}

window.onload = () => {
    iniciarTimer();
};
