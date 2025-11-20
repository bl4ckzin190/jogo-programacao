// Senhas corretas
const senhasCorretas = {
    senha1: 'PROGRAMAR',
    senha2: 'DESIGN',
    senha3: 'FUTURO'
};

// Verificar senhas digitadas
function verificarSenhas() {
    const normalizar = str =>
        str.normalize("NFD")         // remove acentos
           .replace(/[\u0300-\u036f]/g, "")
           .toUpperCase()
           .trim();

    const senha1 = normalizar(document.getElementById('senha1').value);
    const senha2 = normalizar(document.getElementById('senha2').value);
    const senha3 = normalizar(document.getElementById('senha3').value);

    const errorMsg = document.getElementById('error-message');

    // Verificar se todos os campos foram preenchidos
    if (!senha1 || !senha2 || !senha3) {
        errorMsg.textContent = '⚠️ Preencha todas as 3 senhas!';
        errorMsg.style.display = 'block';
        return;
    }

    // Verificação das senhas
    if (
        senha1 === senhasCorretas.senha1 &&
        senha2 === senhasCorretas.senha2 &&
        senha3 === senhasCorretas.senha3
    ) {
        console.log('Senhas corretas! Desbloqueando enigma...');
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

