/* Telas em Família — Clínica Gattini
   JavaScript puro, sem dependências. */
(function () {
  'use strict';

  var raiz = document.documentElement;

  /* ---------- tema ---------- */
  var btnTema = document.getElementById('tema');
  try {
    var salvo = localStorage.getItem('gattini-tema');
    if (salvo === 'dark' || salvo === 'light') raiz.setAttribute('data-theme', salvo);
  } catch (e) { /* navegação privada ou cookies bloqueados: segue o tema do sistema */ }

  if (btnTema) {
    btnTema.addEventListener('click', function () {
      var atual = raiz.getAttribute('data-theme');
      var sistemaEscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (!atual) atual = sistemaEscuro ? 'dark' : 'light';
      var novo = atual === 'dark' ? 'light' : 'dark';
      raiz.setAttribute('data-theme', novo);
      try { localStorage.setItem('gattini-tema', novo); } catch (e) {}
    });
  }

  /* ---------- abrir / fechar todas as fichas ---------- */
  var fichas = Array.prototype.slice.call(document.querySelectorAll('details.ficha'));
  var btnExpandir = document.getElementById('expandir');

  function rotuloExpandir() {
    if (!btnExpandir) return;
    var algumFechada = fichas.some(function (f) { return !f.open; });
    var texto = btnExpandir.querySelector('span');
    if (!texto) {
      texto = document.createElement('span');
      btnExpandir.appendChild(texto);
    }
    texto.textContent = algumFechada ? 'Abrir todos os passos' : 'Fechar todos os passos';
  }

  if (btnExpandir) {
    // o texto inicial vive no HTML; move para um <span> para poder trocar sem perder o ícone
    var inicial = btnExpandir.lastChild;
    if (inicial && inicial.nodeType === 3) btnExpandir.removeChild(inicial);
    rotuloExpandir();

    btnExpandir.addEventListener('click', function () {
      var abrir = fichas.some(function (f) { return !f.open; });
      fichas.forEach(function (f) { f.open = abrir; });
      rotuloExpandir();
    });
    fichas.forEach(function (f) { f.addEventListener('toggle', rotuloExpandir); });
  }

  /* ---------- imprimir ---------- */
  var btnImprimir = document.getElementById('imprimir');
  if (btnImprimir) {
    btnImprimir.addEventListener('click', function () {
      fichas.forEach(function (f) { f.open = true; });
      rotuloExpandir();
      window.print();
    });
  }

  /* ---------- busca ---------- */
  var campo = document.getElementById('q');
  var vazio = document.getElementById('vazio');

  function normaliza(s) {
    return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  if (campo) {
    campo.addEventListener('input', function () {
      var termo = normaliza(campo.value.trim());
      var visiveis = 0;

      fichas.forEach(function (f) {
        if (!termo) {
          f.hidden = false;
          visiveis++;
          return;
        }
        var alvo = normaliza(
          (f.getAttribute('data-busca') || '') + ' ' + (f.querySelector('summary').textContent || '')
        );
        var achou = alvo.indexOf(termo) !== -1;
        f.hidden = !achou;
        if (achou) visiveis++;
      });

      if (vazio) vazio.hidden = visiveis !== 0;
    });
  }
})();
