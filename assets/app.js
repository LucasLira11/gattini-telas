/* Telas em Família — Clínica Gattini
   JavaScript puro, sem dependências. Progressivo: sem JS, todo o
   conteúdo continua legível e as fichas continuam abrindo. */
(function () {
  'use strict';

  var raiz = document.documentElement;
  var guardar = function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} };
  var ler = function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } };

  /* ---------- tema ---------- */
  var salvo = ler('gattini-tema');
  if (salvo === 'dark' || salvo === 'light') raiz.setAttribute('data-theme', salvo);

  var btnTema = document.getElementById('tema');
  if (btnTema) {
    btnTema.addEventListener('click', function () {
      var atual = raiz.getAttribute('data-theme');
      if (!atual) atual = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      var novo = atual === 'dark' ? 'light' : 'dark';
      raiz.setAttribute('data-theme', novo);
      guardar('gattini-tema', novo);
    });
  }

  /* ---------- índice compacto ---------- */
  var indiceMovel = document.getElementById('indice-movel');
  if (indiceMovel) {
    indiceMovel.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') indiceMovel.open = false;
    });
    document.addEventListener('click', function (e) {
      if (indiceMovel.open && !indiceMovel.contains(e.target)) indiceMovel.open = false;
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && indiceMovel.open) indiceMovel.open = false;
    });
  }

  /* ---------- seção ativa no índice lateral ---------- */
  var linksIndice = Array.prototype.slice.call(document.querySelectorAll('#indice-nav a'));
  var alvos = linksIndice
    .map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); })
    .filter(Boolean);

  if (alvos.length && 'IntersectionObserver' in window) {
    var visiveis = {};
    var marcarAtivo = function () {
      var ativo = null;
      for (var i = 0; i < alvos.length; i++) {
        if (visiveis[alvos[i].id]) { ativo = alvos[i].id; break; }
      }
      linksIndice.forEach(function (a) {
        var ehEste = a.getAttribute('href') === '#' + ativo;
        if (ehEste) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    };
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) { visiveis[en.target.id] = en.isIntersecting; });
      marcarAtivo();
    }, { rootMargin: '-72px 0px -55% 0px', threshold: 0 });
    alvos.forEach(function (s) { obs.observe(s); });
  }

  /* ---------- fichas: progresso por etapa ---------- */
  var fichas = Array.prototype.slice.call(document.querySelectorAll('details.ficha'));

  fichas.forEach(function (ficha, iFicha) {
    var passos = Array.prototype.slice.call(ficha.querySelectorAll('ol.passos > li'));
    var barra = ficha.querySelector('.progresso .trilho i');
    var contador = ficha.querySelector('.progresso .cont');
    if (!passos.length) return;

    var chave = 'gattini-passos-' + iFicha;

    function pintar() {
      var feitos = passos.filter(function (li) { return li.classList.contains('feito'); }).length;
      if (barra) barra.style.width = (feitos / passos.length * 100) + '%';
      if (contador) contador.textContent = feitos + ' de ' + passos.length;
      guardar(chave, passos.map(function (li) { return li.classList.contains('feito') ? '1' : '0'; }).join(''));
    }

    var estado = ler(chave) || '';

    passos.forEach(function (li, iPasso) {
      var rotulo = document.createElement('label');
      rotulo.className = 'marcar';

      var caixa = document.createElement('input');
      caixa.type = 'checkbox';
      caixa.id = 'p-' + iFicha + '-' + iPasso;
      caixa.checked = estado.charAt(iPasso) === '1';

      var texto = document.createElement('span');
      texto.textContent = 'Marcar como feito';

      rotulo.appendChild(caixa);
      rotulo.appendChild(texto);
      li.appendChild(rotulo);

      if (caixa.checked) li.classList.add('feito');

      caixa.addEventListener('change', function () {
        li.classList.toggle('feito', caixa.checked);
        pintar();
      });
    });

    pintar();
  });

  /* ---------- link direto para um tutorial ----------
     O botão do herói aponta para #tutorial-iphone. Abrir a ficha e rolar
     até ela evita que a pessoa caia numa ficha fechada sem entender. */
  function abrirPeloEndereco() {
    var id = (location.hash || '').slice(1);
    if (!id) return;
    var alvo = document.getElementById(id);
    if (!alvo || alvo.tagName !== 'DETAILS') return;
    alvo.open = true;
    alvo.hidden = false;
    requestAnimationFrame(function () {
      alvo.scrollIntoView({ block: 'start', behavior: 'smooth' });
    });
  }
  window.addEventListener('hashchange', abrirPeloEndereco);
  abrirPeloEndereco();

  /* ---------- abrir e fechar todas as fichas ---------- */
  var btnExpandir = document.getElementById('expandir');
  var textoExpandir = btnExpandir ? btnExpandir.querySelector('span') : null;

  function rotularExpandir() {
    if (!textoExpandir) return;
    var algumaFechada = fichas.some(function (f) { return !f.open; });
    textoExpandir.textContent = algumaFechada ? 'Abrir todos os passos' : 'Fechar todos os passos';
  }

  if (btnExpandir) {
    btnExpandir.addEventListener('click', function () {
      var abrir = fichas.some(function (f) { return !f.open; });
      fichas.forEach(function (f) { f.open = abrir; });
      rotularExpandir();
    });
    fichas.forEach(function (f) { f.addEventListener('toggle', rotularExpandir); });
    rotularExpandir();
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
        if (!termo) { f.hidden = false; visiveis++; return; }
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
