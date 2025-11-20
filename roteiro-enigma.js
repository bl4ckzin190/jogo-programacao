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
        
        // Senhas corretas! Mostrar enigma
        desbloquearEnigma();
        
    } else {
        // Senhas incorretas
        errorMsg.innerHTML = `
            <p>❌ ACESSO NEGADO!</p>
            <p>Uma ou mais senhas estão incorretas.</p>
            <p>Decodifique mais cards antes de tentar novamente.</p>
        `;
        errorMsg.style.display = 'block';
        errorMsg.style.animation = 'shake 0.5s';
        
        // Remover animação após completar
        setTimeout(() => {
            errorMsg.style.animation = '';
        }, 500);
    }
}

// Desbloquear o enigma
function desbloquearEnigma() {
    document.getElementById('password-screen').style.display = 'none';
    document.getElementById('enigma-screen').style.display = 'block';
    
    // Iniciar timer
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
    
    // Respostas corretas da sequência de Fibonacci
    // 0, 1, 1, 2, 3, 5, 8, [13], [21], [34]
    const respostasCorretas = {
        answer1: 13,
        answer2: 21,
        answer3: 34
    };
    
    if (resposta1 === respostasCorretas.answer1 && 
        resposta2 === respostasCorretas.answer2 && 
        resposta3 === respostasCorretas.answer3) {
        
        // VITÓRIA!
        clearInterval(timerInterval);
        mostrarVitoria();
        
    } else {
        // Resposta errada
        alert('❌ Sequência incorreta! Continue tentando...');
    }
}

// Mostrar tela de vitória
function mostrarVitoria() {
    document.getElementById('enigma-screen').style.display = 'none';
    document.getElementById('victory-screen').style.display = 'flex';
    
    // Mostrar tempo final
    const minutos = Math.floor(segundosDecorridos / 60);
    const segundos = segundosDecorridos % 60;
    const tempoFinal = `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
    
    document.getElementById('final-time').textContent = tempoFinal;
    
    // Salvar recorde no localStorage
    salvarRecorde(segundosDecorridos);
    
    // Animação de confete (opcional, com CSS)
    celebrarVitoria();
}

// Salvar recorde
function salvarRecorde(tempo) {
    const recordeAtual = localStorage.getItem('recorde_ciphercode');
    
    if (!recordeAtual || tempo < parseInt(recordeAtual)) {
        localStorage.setItem('recorde_ciphercode', tempo);
        
        // Mostrar que é um novo recorde
        const victoryContent = document.querySelector('.victory-content');
        const recordeBadge = document.createElement('div');
        recordeBadge.className = 'new-record-badge';
        recordeBadge.innerHTML = '🏆 NOVO RECORDE! 🏆';
        victoryContent.insertBefore(recordeBadge, victoryContent.children[2]);
    }
}

// Animação de celebração
function celebrarVitoria() {
    // Criar efeito de confete simples com CSS
    const victoryScreen = document.getElementById('victory-screen');
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.backgroundColor = ['#FF0040', '#00D9FF', '#39FF14', '#FFD700'][Math.floor(Math.random() * 4)];
        victoryScreen.appendChild(confetti);
    }
}
