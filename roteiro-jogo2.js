let questoes = {};
let questaoAtual = null;
let codificacaoEscolhida = null;

// Verificar se é card bônus
const urlParams = new URLSearchParams(window.location.search);
const isBonus = urlParams.get('bonus') === 'true';

// Carregar questões do JSON
async function carregarQuestoes() {
    try {
        const response = await fetch('questoes-jogo2.json');
        const data = await response.json();
        questoes = data;
        
        console.log('Questões carregadas:', questoes);
        
        // Se for bônus, mostrar direto
        if (isBonus) {
            mostrarBonus();
        }
    } catch (error) {
        console.error('Erro ao carregar questões:', error);
        alert('Erro ao carregar questões: ' + error.message);
    }
}

// Selecionar codificação (cor do botão)
function selectCoding(numero) {
    console.log('Codificação selecionada:', numero);
    
    codificacaoEscolhida = numero;
    
    const tiposCodificacao = {
        1: 'codificacao1',
        2: 'codificacao2',
        3: 'codificacao3'
    };
    
    const tipo = tiposCodificacao[numero];
    const questoesDoCodigo = questoes[tipo];
    
    if (!questoesDoCodigo || questoesDoCodigo.length === 0) {
        alert('Nenhuma pergunta disponível para esta codificação!');
        return;
    }
    
    // Selecionar pergunta aleatória
    const indiceAleatorio = Math.floor(Math.random() * questoesDoCodigo.length);
    questaoAtual = questoesDoCodigo[indiceAleatorio];
    
    console.log('Pergunta selecionada:', questaoAtual);
    
    mostrarQuestao();
}

// Mostrar questão
function mostrarQuestao() {
    document.getElementById('color-selection').style.display = 'none';
    document.getElementById('question-container').style.display = 'block';
    
    // Badge da codificação
    const cores = {
        1: {nome: 'CODIFICAÇÃO 1', classe: 'red', emoji: '🔴'},
        2: {nome: 'CODIFICAÇÃO 2', classe: 'blue', emoji: '🔵'},
        3: {nome: 'CODIFICAÇÃO 3', classe: 'green', emoji: '🟢'}
    };
    
    const cor = cores[codificacaoEscolhida];
    const badge = document.getElementById('coding-badge');
    badge.innerHTML = `${cor.emoji} ${cor.nome}`;
    badge.className = `coding-badge ${cor.classe}`;
    
    // Pergunta
    document.getElementById('question-text').textContent = questaoAtual.pergunta;
    
    // Alternativas
    const container = document.getElementById('alternatives-container');
    container.innerHTML = '';
    
    questaoAtual.alternativas.forEach((alt, index) => {
        const button = document.createElement('button');
        button.className = 'alternative-btn';
        button.textContent = `${String.fromCharCode(65 + index)}) ${alt}`;
        button.onclick = function() {
            verificarResposta(index);
        };
        container.appendChild(button);
    });
}

// Verificar resposta (só 1 tentativa!)
function verificarResposta(indiceEscolhido) {
    console.log('Resposta escolhida:', indiceEscolhido);
    console.log('Resposta correta:', questaoAtual.resposta_correta);
    
    const acertou = indiceEscolhido === questaoAtual.resposta_correta;
    mostrarResultado(acertou);
}

// Mostrar resultado
function mostrarResultado(acertou) {
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
    
    const resultContent = document.getElementById('result-content');
    
    if (acertou) {
        const simbolo = questaoAtual.simbolo_revelado;
        resultContent.innerHTML = `
            <div class="result-box success-decode">
                <h2>🎯 ATAQUE BEM-SUCEDIDO!</h2>
                <p class="result-message">Você quebrou um fragmento da criptografia!</p>
                <div class="symbol-revealed">
                    <h3>SÍMBOLO REVELADO:</h3>
                    <div class="symbol-box">
                        <span class="symbol-letter">${simbolo.letra}</span>
                        <span class="symbol-equals">=</span>
                        <span class="symbol-emoji">${simbolo.emoji}</span>
                    </div>
                </div>
                <p class="decode-instruction">📝 ANOTE ESTE SÍMBOLO NA SUA FOLHA!</p>
            </div>
        `;
    } else {
        resultContent.innerHTML = `
            <div class="result-box bug-screen">
                <div class="glitch-effect">
                    <h2>🐛 BUG DETECTADO! 🐛</h2>
                </div>
                <p class="bug-message">O sistema ativou o protocolo de defesa!</p>
                <div class="bug-animation">
                    <p class="bug-code">ERROR 404: ACCESS_DENIED</p>
                    <p class="bug-code">FIREWALL_ACTIVATED</p>
                    <p class="bug-code">RETRYING_CONNECTION...</p>
                    <p class="bug-code">CONNECTION_FAILED</p>
                </div>
                <p class="consequence">❌ NENHUM SÍMBOLO REVELADO</p>
                <p class="hint">💡 Tente outro card de pergunta!</p>
            </div>
        `;
    }
}

// Sistema de bônus
function mostrarBonus() {
    const codigos = ['codificacao1', 'codificacao2', 'codificacao3'];
    const codigoAleatorio = codigos[Math.floor(Math.random() * codigos.length)];
    
    const questoesCodigo = questoes[codigoAleatorio];
    
    if (!questoesCodigo || questoesCodigo.length === 0) {
        alert('Erro ao carregar bônus!');
        return;
    }
    
    const questaoAleatoria = questoesCodigo[Math.floor(Math.random() * questoesCodigo.length)];
    
    document.getElementById('color-selection').style.display = 'none';
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
    
    const simbolo = questaoAleatoria.simbolo_revelado;
    const cores = {
        'codificacao1': {nome: 'CODIFICAÇÃO 1', emoji: '🔴'},
        'codificacao2': {nome: 'CODIFICAÇÃO 2', emoji: '🔵'},
        'codificacao3': {nome: 'CODIFICAÇÃO 3', emoji: '🟢'}
    };
    const cor = cores[codigoAleatorio];
    
    document.getElementById('result-content').innerHTML = `
        <div class="result-box success-decode">
            <h2>⭐ BÔNUS ATIVADO! ⭐</h2>
            <p class="result-message">Você ganhou um símbolo gratuito!</p>
            <div class="symbol-revealed">
                <h3>${cor.emoji} ${cor.nome}</h3>
                <div class="symbol-box">
                    <span class="symbol-letter">${simbolo.letra}</span>
                    <span class="symbol-equals">=</span>
                    <span class="symbol-emoji">${simbolo.emoji}</span>
                </div>
            </div>
            <p class="decode-instruction">📝 ANOTE NA SUA FOLHA!</p>
        </div>
    `;
}

// Iniciar quando página carregar
window.addEventListener('DOMContentLoaded', carregarQuestoes);
