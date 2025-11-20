
let timerIniciado = false;
let timerInterval;
let segundosDecorridos = 0;

// Senhas corretas (baseadas no questoes-jogo2.json)
const senhasCorretas = {
    senha1: 'CODIGO',
    senha2: 'HACKER',
    senha3: 'BUG'
};

// Verificar senhas digitadas
function verificarSenhas() {
    const senha1 = document.getElementById('senha1').value.toUpperCase().trim();
    const senha2 = document.getElementById('senha2').value.toUpperCase().trim();
    const senha3 = document.getElementById('senha3').value.toUpperCase().trim();
    
    const errorMsg = document.getElementById('error-message');
    
    console.log('Senhas digitadas:', senha1, senha2, senha3);
    console.log('Senhas corretas:', senhasCorretas);
    
    // Verificar se todos os campos foram preenchidos
    if (!senha1 || !senha2 || !senha3) {
        errorMsg.textContent = '⚠️ Preencha todas as 3 senhas!';
        errorMsg.style.display = 'block';
        return;
    }
    
    // Verificar se as senhas estão corretas
    if (senha1 === senhasCorretas.senha1 && 
        senha2 === senhasCorretas.senha2 && 
        senha3 === senhasCorretas.senha3) {
        
        console.log('Senhas corretas! Desbloqueando enigma...');
        desbloquearEnigma();
        
    } else {
        errorMsg.innerHTML = `
            <p>❌ ACESSO NEGADO!</p>
            <p>Uma ou mais senhas estão incorretas.</p>
            <p>Decodifique mais cards antes de tentar novamente.</p>
        `;
        errorMsg.style.display = 'block';
        errorMsg.style.animation = 'shake 0.5s';
        
        setTimeout(() => {
            errorMsg.style.animation = '';
        }, 500);
    }
}

// Desbloquear o enigma
function desbloquearEnigma() {
    document.getElementById('password-screen').style.display = 'none';
    document.getElementById('enigma-screen').style.display = 'block';
    iniciarTimer();
}

// Iniciar timer
function iniciarTimer() {
    if (timerIniciado) return;
    timerIniciado = true;
    segundosDecorridos = 0;
    
    timerInterval = setInterval(() => {
        segundosDecorridos++;
        atualizarDisplayTimer();
    }, 1000);
}

// Atualizar display do timer
function atualizarDisplayTimer() {
    const minutos = Math.floor(segundosDecorridos / 60);
    const segundos = segundosDecorridos % 60;
    const display = `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
    document.getElementById('timer-display').textContent = display;
}

// Verificar resposta do enigma
function verificarEnigma() {
    const resposta1 = parseInt(document.getElementById('answer1').value);
    const resposta2 = parseInt(document.getElementById('answer2').value);
    const resposta3 = parseInt(document.getElementById('answer3').value);
    
    console.log('Respostas:', resposta1, resposta2, resposta3);
    
    // Respostas corretas da sequência de Fibonacci: 13, 21, 34
    if (resposta1 === 13 && resposta2 === 21 && resposta3 === 34) {
        clearInterval(timerInterval);
        mostrarVitoria();
    } else {
        alert('❌ Sequência incorreta! Continue tentando...\n\nDica: Fibonacci - cada número é a soma dos dois anteriores.');
    }
}

// Mostrar tela de vitória
function mostrarVitoria() {
    document.getElementById('enigma-screen').style.display = 'none';
    document.getElementById('victory-screen').style.display = 'flex';
    
    const minutos = Math.floor(segundosDecorridos / 60);
    const segundos = segundosDecorridos % 60;
    const tempoFinal = `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
    
    document.getElementById('final-time').textContent = tempoFinal;
    
    salvarRecorde(segundosDecorridos);
    celebrarVitoria();
}

// Salvar recorde
function salvarRecorde(tempo) {
    try {
        const recordeAtual = localStorage.getItem('recorde_ciphercode');
        
        if (!recordeAtual || tempo < parseInt(recordeAtual)) {
            localStorage.setItem('recorde_ciphercode', tempo);
            
            const victoryContent = document.querySelector('.victory-content');
            const recordeBadge = document.createElement('div');
            recordeBadge.className = 'new-record-badge';
            recordeBadge.innerHTML = '🏆 NOVO RECORDE! 🏆';
            victoryContent.insertBefore(recordeBadge, victoryContent.children[2]);
        }
    } catch (e) {
        console.log('LocalStorage não disponível');
    }
}

// Animação de celebração
function celebrarVitoria() {
    const victoryScreen = document.getElementById('victory-screen');
    const cores = ['#FF0040', '#00D9FF', '#39FF14', '#FFD700'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.backgroundColor = cores[Math.floor(Math.random() * cores.length)];
        victoryScreen.appendChild(confetti);
    }
}

// Carregar recorde ao iniciar
window.addEventListener('DOMContentLoaded', function() {
    try {
        const recorde = localStorage.getItem('recorde_ciphercode');
        if (recorde) {
            const min = Math.floor(recorde / 60);
            const seg = recorde % 60;
            const recordeElement = document.getElementById('record-time');
            if (recordeElement) {
                recordeElement.textContent = `${String(min).padStart(2, '0')}:${String(seg).padStart(2, '0')}`;
            }
        }
    } catch (e) {
        console.log('LocalStorage não disponível');
    }
});
```

---

## PROBLEMA 2: SISTEMA DE BÔNUS

### ✅ RESPOSTA: NÃO PRECISA DE ARQUIVO PRÓPRIO!

O sistema de bônus **já está incluído** no arquivo `script-jogo2.js` que você acabou de criar acima.

### Como funciona:

**CARDS DE PERGUNTA NORMAL:**
- URL: `https://seu-username.github.io/jogo-programacao-multimidia/jogo2.html`
- Jogador escolhe a cor (vermelho, azul ou verde)
- Responde pergunta
- Se acertar: revela símbolo
- Se errar: mostra BUG

**CARDS DE BÔNUS:**
- URL: `https://seu-username.github.io/jogo-programacao-multimidia/jogo2.html?bonus=true`
- NÃO precisa escolher cor
- NÃO precisa responder pergunta
- Revela um símbolo ALEATÓRIO automaticamente

### QR Codes necessários para Jogo 2:

**QR Code 1 (Cards de Pergunta - maioria dos cards):**
```
https://seu-username.github.io/jogo-programacao-multimidia/jogo2.html
```

**QR Code 2 (Cards de Bônus - 8-12 cards especiais):**
```
https://seu-username.github.io/jogo-programacao-multimidia/jogo2.html?bonus=true
```

---

## PASSO A PASSO PARA CORRIGIR TUDO

### 1. Substituir os arquivos JavaScript

1. Vá no repositório no GitHub
2. Clique em `script-jogo1.js`
3. Clique no ícone de lápis ✏️
4. **DELETE TODO o conteúdo**
5. Cole o novo código que passei acima
6. Clique em **"Commit changes"**
7. Repita para `script-jogo2.js` e `script-enigma.js`

### 2. Aguardar atualização

Aguarde **2-3 minutos** para o GitHub Pages atualizar.

### 3. Testar novamente

Acesse cada URL e teste:

**Teste 1:**
```
https://seu-username.github.io/jogo-programacao-multimidia/jogo1.html?dif=faceis
```
- Clique nas alternativas
- Deve mostrar se acertou ou errou

**Teste 2:**
```
https://seu-username.github.io/jogo-programacao-multimidia/jogo2.html
```
- Clique nos botões coloridos
- Deve aparecer uma pergunta

**Teste 3 (BÔNUS):**
```
https://seu-username.github.io/jogo-programacao-multimidia/jogo2.html?bonus=true
```
- Deve mostrar DIRETO um símbolo revelado
- SEM precisar responder pergunta

**Teste 4:**
```
https://seu-username.github.io/jogo-programacao-multimidia/enigma-final.html
