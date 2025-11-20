// Pegar parâmetros da URL
const urlParams = new URLSearchParams(window.location.search);
const difficulty = urlParams.get('dif') || 'faceis'; // faceis, medias, dificeis

let questoes = [];
let questaoAtual = null;
let timerInterval;
let timeLeft = 30;

// Carregar questões do JSON
async function carregarQuestoes() {
    try {
        const response = await fetch('questoes-jogo1.json');
        const data = await response.json();
        questoes = data[difficulty];
        
        if (!questoes || questoes.length === 0) {
            throw new Error('Nenhuma questão encontrada');
        }
        
        selecionarQuestaoAleatoria();
    } catch (error) {
        document.getElementById('loading').innerHTML = `
            <p style="color: red;">❌ Erro ao carregar questões!</p>
            <p>${error.message}</p>
        `;
    }
}

// Selecionar questão aleatória
function selecionarQuestaoAleatoria() {
    const indiceAleatorio = Math.floor(Math.random() * questoes.length);
    questaoAtual = questoes[indiceAleatorio];
    mostrarQuestao();
}

// Mostrar questão na tela
function mostrarQuestao() {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('question-container').style.display = 'block';
    
    // Badge de dificuldade
    const badge = document.getElementById('difficulty-badge');
    badge.textContent = difficulty.toUpperCase();
    badge.className = `difficulty-badge ${difficulty}`;
    
    // Texto da pergunta
    document.getElementById('question-text').textContent = questaoAtual.pergunta;
    
    // Alternativas
    const container = document.getElementById('alternatives-container');
    container.innerHTML = '';
    
    questaoAtual.alternativas.forEach((alt, index) => {
        const button = document.createElement('button');
        button.className = 'alternative-btn';
        button.textContent = `${String.fromCharCode(65 + index)}) ${alt}`;
        button.onclick = () => verificarResposta(index);
        container.appendChild(button);
    });
    
    // Iniciar timer
    iniciarTimer();
}

// Timer de 30 segundos
function iniciarTimer() {
    timeLeft = 30;
    document.getElementById('timer').textContent = timeLeft;
    
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            mostrarResultado(false, true); // timeout
        }
    }, 1000);
}

// Verificar resposta
function verificarResposta(indiceEscolhido) {
    clearInterval(timerInterval);
    
    const acertou = indiceEscolhido === questaoAtual.resposta_correta;
    mostrarResultado(acertou, false);
}

// Mostrar resultado
function mostrarResultado(acertou, timeout) {
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
    
    const resultContent = document.getElementById('result-content');
    
    if (timeout) {
        resultContent.innerHTML = `
            <div class="result-box timeout">
                <h2>⏰ TEMPO ESGOTADO!</h2>
                <p class="result-message">Você demorou muito para responder.</p>
                <p class="consequence">➡️ VOLTE 2 CASAS</p>
            </div>
        `;
    } else if (acertou) {
        resultContent.innerHTML = `
            <div class="result-box success">
                <h2>✅ RESPOSTA CORRETA!</h2>
                <p class="result-message">Parabéns! Você domina este conceito.</p>
                <p class="consequence">➡️ PERMANEÇA NA CASA</p>
            </div>
        `;
    } else {
        resultContent.innerHTML = `
            <div class="result-box error">
                <h2>❌ RESPOSTA INCORRETA!</h2>
                <p class="result-message">A resposta correta era: <strong>${questaoAtual.alternativas[questaoAtual.resposta_correta]}</strong></p>
                <p class="consequence">➡️ VOLTE 2 CASAS</p>
            </div>
        `;
    }
}

// Iniciar quando página carregar
window.onload = carregarQuestoes;
