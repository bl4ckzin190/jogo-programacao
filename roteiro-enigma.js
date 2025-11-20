// 🟩 SENHAS CERTAS DO ENIGMA
const senhaCorreta1 = "vento";
const senhaCorreta2 = "folha";

// 🔍 Função que confere as duas senhas
function conferirSenhas() {
    const s1 = document.getElementById("senha1").value.trim().toLowerCase();
    const s2 = document.getElementById("senha2").value.trim().toLowerCase();
    const msg = document.getElementById("mensagem");
    const botaoRefazer = document.getElementById("refazer");

    // Se ambos estiverem certos
    if (s1 === senhaCorreta1 && s2 === senhaCorreta2) {
        msg.style.color = "#2bff73";
        msg.innerText = "✔ Senhas corretas! Enigma concluído!";
        botaoRefazer.style.display = "block";
        return;
    }

    // Mensagem de erro personalizada
    msg.style.color = "#ff3b3b";

    if (s1 !== senhaCorreta1 && s2 !== senhaCorreta2) {
        msg.innerText = "❌ Ambas as senhas estão erradas.";
    } else if (s1 !== senhaCorreta1) {
        msg.innerText = "❌ A primeira senha está incorreta.";
    } else if (s2 !== senhaCorreta2) {
        msg.innerText = "❌ A segunda senha está incorreta.";
    }
}

// 🔄 Função para limpar e reiniciar o enigma
function refazerEnigma() {
    document.getElementById("senha1").value = "";
    document.getElementById("senha2").value = "";
    document.getElementById("mensagem").innerText = "";
    document.getElementById("refazer").style.display = "none";
}
