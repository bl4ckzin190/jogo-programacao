// desafio-simbolos.js
console.log('[desafio-simbolos.js] carregado');

const respostaCorreta = "xoxo te aguarda"; // normalizada no código
let tempoRestante = 20 * 60; // segundos
let timerInterval = null;

function normalizar(str = "") {
  return String(str)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}

function atualizarDisplayTimer() {
  const el = document.getElementById('timer-display');
  if (!el) return;
  const m = String(Math.floor(Math.max(0, tempoRestante) / 60)).padStart(2, '0');
  const s = String(Math.max(0, tempoRestante) % 60).padStart(2, '0');
  el.textContent = `${m}:${s}`;
}

function iniciarTimer() {
  if (timerInterval) clearInterval(timerInterval);
  atualizarDisplayTimer();
  timerInterval = setInterval(() => {
    tempoRestante--;
    atualizarDisplayTimer();
    if (tempoRestante <= 0) {
      clearInterval(timerInterval);
      console.log('[desafio-simbolos] tempo esgotado');
      salvarResultado(false);
    }
  }, 1000);
}

function mostrarErroLocal(msg) {
  const el = document.getElementById('erro');
  if (!el) {
    alert(msg);
    return;
  }
  el.textContent = msg || '❌ Resposta incorreta!';
  el.style.display = 'block';
  el.style.animation = 'shake .4s';
  setTimeout(() => el.style.animation = '', 400);
}

function esconderErroLocal() {
  const el = document.getElementById('erro');
  if (el) el.style.display = 'none';
}

function verificarResposta() {
  const input = document.getElementById('resposta');
  if (!input) {
    console.error('[desafio-simbolos] #resposta não encontrado');
    return;
  }

  const respostaUsuario = normalizar(input.value);
  console.log('[desafio-simbolos] resposta digitada:', respostaUsuario);

  if (respostaUsuario === normalizar(respostaCorreta)) {
    clearInterval(timerInterval);
    salvarResultado(true);
  } else {
    mostrarErroLocal('❌ Resposta incorreta! Tente novamente.');
  }
}

function salvarResultado(acertou) {
  // salva tempo em segundos (tempo usado)
  const tempoUsado = (20 * 60) - Math.max(0, tempoRestante);
  const tempoFormatado = (() => {
    const m = String(Math.floor(tempoUsado / 60)).padStart(2, '0');
    const s = String(tempoUsado % 60).padStart(2, '0');
    return `${m}:${s}`;
  })();

  const nome = prompt('Digite seu nome para o ranking:') || 'Jogador';

  // gravar em localStorage: ranking-simbolos
  const ranking = JSON.parse(localStorage.getItem('ranking-simbolos') || '[]');
  ranking.push({ nome: nome.trim(), tempoSegundos: tempoUsado, tempo: tempoFormatado, acertou: acertou });
  // ordenar por tempo (os que não acertaram têm tempoSegundos grande)
  ranking.sort((a, b) => (a.acertou ? a.tempoSegundos : Infinity) - (b.acertou ? b.tempoSegundos : Infinity));
  localStorage.setItem('ranking-simbolos', JSON.stringify(ranking));

  // redireciona para a página de ranking
  window.location.href = 'ranking.html';
}

// ligar eventos quando DOM pronto
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('btn-enviar');
  if (!btn) {
    console.error('[desafio-simbolos] botão #btn-enviar não encontrado');
  } else {
    btn.addEventListener('click', verificarResposta);
  }

  const input = document.getElementById('resposta');
  if (input) {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        verificarResposta();
      }
    });
  } else {
    console.warn('[desafio-simbolos] input #resposta não encontrado');
  }

  // iniciar timer só se o elemento do timer existir
  if (document.getElementById('timer-display')) {
    iniciarTimer();
  } else {
    console.warn('[desafio-simbolos] timer-display não encontrado; timer não iniciado');
  }
});
