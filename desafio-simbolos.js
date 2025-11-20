// ------------------------------
// TIMER DE 20 MINUTOS
// ------------------------------
let tempoRestante = 20 * 60; // 20 minutos em segundos
const timerEl = document.getElementById("timer");

function atualizarTimer() {
    let minutos = Math.floor(tempoRestante / 60);
    let segundos = tempoRestante % 60;

    timerEl.textContent = `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;

    if (tempoRestante <= 0) {
        finalizarEnigma(true);
    } else {
        tempoRestante--;
        setTimeout(atualizarTimer, 1000);
    }
    function finalizarDesafio() {
    // aqui você pode validar ou não a resposta
    window.location.href = "ranking.html"; // 👉 redireciona para a página 3
}

}

atualizarTimer();

// ------------------------------
// ENVIO DA RESPOSTA
// ------------------------------
const botaoEnviar = document.getElementById("btn-enviar");
botaoEnviar.addEventListener("click", () => finalizarEnigma(false));

function finalizarEnigma(porTempoEsgotado) {
    const resposta = document.getElementById("resposta").value.trim();
    const tempoFinal = timerEl.textContent;

    // Salvar localmente para usar na página de ranking
    localStorage.setItem("resposta_usuario", resposta);
    localStorage.setItem("tempo_usuario", tempoFinal);
    localStorage.setItem("tempo_esgotado", porTempoEsgotado ? "sim" : "nao");

    // Redirecionar para o ranking
    window.location.href = "ranking.html";
}
