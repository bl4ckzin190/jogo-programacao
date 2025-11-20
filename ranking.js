// ------------------------------
// CARREGAR DADOS DO USUÁRIO
// ------------------------------
const respostaEl = document.getElementById("resposta-usuario");
const tempoEl = document.getElementById("tempo-usuario");
const statusEl = document.getElementById("status-usuario");

const resposta = localStorage.getItem("resposta_usuario") || "(nenhuma resposta)";
const tempo = localStorage.getItem("tempo_usuario") || "--:--";
const tempoEsgotado = localStorage.getItem("tempo_esgotado") === "sim";

respostaEl.textContent = resposta;
tempoEl.textContent = tempo;
statusEl.textContent = tempoEsgotado ? "Tempo esgotado" : "Respondido a tempo";
statusEl.style.color = tempoEsgotado ? "#ff4444" : "#44ff66";

// ------------------------------
// RANKING GLOBAL (LOCALSTORAGE)
// ------------------------------
const btnSalvar = document.getElementById("btn-salvar");
const listaRanking = document.getElementById("lista-ranking");

function carregarRanking() {
    const ranking = JSON.parse(localStorage.getItem("ranking_global")) || [];

    listaRanking.innerHTML = "";

    ranking.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `${item.nome} — ${item.tempo}`;
        listaRanking.appendChild(li);
    });
}

carregarRanking();

btnSalvar.addEventListener("click", () => {
    const nome = document.getElementById("nome").value.trim();
    if (nome.length < 1) return alert("Digite um nome válido!");

    const ranking = JSON.parse(localStorage.getItem("ranking_global")) || [];

    ranking.push({ nome, tempo });

    ranking.sort((a, b) => {
        const [ma, sa] = a.tempo.split(":" ).map(Number);
        const [mb, sb] = b.tempo.split(":" ).map(Number);
        return ma * 60 + sa - (mb * 60 + sb);
    });

    localStorage.setItem("ranking_global", JSON.stringify(ranking));
    carregarRanking();

    alert("Registrado no ranking!");
});
