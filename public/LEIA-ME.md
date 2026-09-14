# Arquivos da marca

Esta pasta guarda as imagens do site. Os nomes abaixo são exatamente os que o
`index.html` procura — se um arquivo mudar de nome, ele deixa de aparecer.

## `logo-gattini-dark.png` e `logo-gattini-white.png`

As duas artes do logo da clínica, 1841×683 e 915×307.

- **`logo-gattini-dark.png`** — logo em tinta escura. Usado no tema claro e em
  tudo que é impresso.
- **`logo-gattini-white.png`** — logo em branco. Usado no tema escuro.

A troca entre os dois é feita só por CSS (classes `.logo-claro` e
`.logo-escuro` em `assets/styles.css`), sem JavaScript, e cobre os três estados
de tema: seguir o sistema, claro forçado e escuro forçado.

No cabeçalho o logo aparece com 38 px de altura; no rodapé, com 290 px de
largura. Como as duas artes têm proporções ligeiramente diferentes (2,70 contra
2,98), a largura no cabeçalho muda alguns pixels ao alternar o tema — nada
visível, mas se quiser eliminar, exporte as duas com a mesma margem.

## `capa.png` — 1200×630

A imagem que aparece como cartão quando alguém cola o link numa conversa do
WhatsApp, num e-mail ou numa rede social. Fundo areia, título em serifada e o
logo assinando embaixo.

Foi gerada a partir de `logo-gattini-dark.png`. Para refazer com outro texto,
edite e rode de novo o trecho em `docs/gerar-capa.ps1`.

O endereço dela está declarado como **URL absoluta** no `index.html`
(`og:image`). Se o site mudar de domínio, essa linha precisa ser atualizada
junto — caminho relativo não funciona no WhatsApp.

## `logos/` — marcas dos aplicativos

As logos oficiais das empresas citadas no guia, em SVG, vindas do projeto
Simple Icons: Apple, Android, Google, TP-Link, NextDNS, YouTube, Netflix,
App Store e Google Play.

Elas são aplicadas por `mask-image` no CSS, não por `<img>`. Isso permite
pintá-las na cor oficial de cada marca sem tocar no arquivo, e mantém tudo
nítido em qualquer tela. As classes ficam em `assets/styles.css`, no bloco
"marcas dos aplicativos" — para acrescentar uma, basta o arquivo SVG aqui e
uma classe `.g-nome` lá.

Três marcas do guia **não** têm logo oficial disponível para redistribuição:

- **Microsoft** — o quadrado de quatro cores é desenhado direto em HTML e CSS
  (`.ms-quad`), nas cores oficiais.
- **Qustodio** — representada pela letra "Q" na tipografia do site.
- **Vivo, Claro, TIM e Oi** — o cartão trata das operadoras em conjunto, então
  usa o ícone de Wi-Fi em vez de uma marca específica.

Se você conseguir os arquivos oficiais dessas marcas, coloque-os aqui e troque
o elemento correspondente no `index.html`.

## `favicon.png` — 256×256

O ícone da aba do navegador: o "G" do logo recortado sobre fundo areia. Também
gerado a partir da arte escura.
