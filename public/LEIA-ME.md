# Coloque aqui os arquivos da marca

Esta pasta guarda as imagens do site. Os nomes abaixo são exatamente os que o
`index.html` procura — se o arquivo tiver outro nome, ele não aparece.

## 1. `logo-gattini.svg` — obrigatório

O logo da clínica, usado no cabeçalho fixo e no rodapé.

- **Formato ideal:** SVG. Se só tiver PNG, use PNG com fundo transparente e pelo
  menos 120 px de altura — e troque a extensão nas duas ocorrências de
  `logo-gattini.svg` dentro do `index.html`.
- **Proporção:** o site desenha o logo com 30 px de altura no topo e 26 px no
  rodapé, com a largura livre. Um logo quadrado ou levemente horizontal fica
  melhor; um logo muito largo espreme a navegação.
- **Cor:** o logo aparece sobre fundo areia (`#f0e7d8`) no tema claro e sobre
  marrom quase preto (`#191310`) no tema escuro. Se o seu logo for escuro
  demais para o tema escuro, a solução mais simples é usar um SVG com
  `fill="currentColor"` nos traços — aí ele acompanha a cor do texto sozinho.

Enquanto o arquivo não existir, o site simplesmente esconde a imagem e mostra só
o nome "Clínica Gattini" escrito. Nada quebra.

## 2. `capa.png` — recomendado

A imagem que aparece como cartão quando alguém cola o link do site numa conversa
do WhatsApp, num e-mail ou numa rede social. Sem ela, o link funciona, mas
aparece sem imagem — o que faz diferença na impressão de profissionalismo.

- **Tamanho exato:** 1200 × 630 pixels.
- **Conteúdo sugerido:** fundo areia `#f0e7d8`, o logo da Gattini, o título
  "Telas em Família" em serifada, e uma linha menor com "Guia de controles
  parentais · Clínica Gattini".
- Deixe as bordas com margem: alguns aplicativos cortam as pontas da imagem.

## 3. `favicon.svg` — já incluído

O ícone que aparece na aba do navegador. Já existe um provisório (escudo sobre
fundo terra). Substitua por uma versão simplificada do logo da clínica quando
quiser — precisa funcionar legível a 16 × 16 pixels, então esqueça detalhes
finos e texto.
