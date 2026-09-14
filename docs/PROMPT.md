# Prompt completo — Site "Telas em Família" · Clínica Gattini

> Cole este prompt inteiro em um agente de código (Claude Code, Cursor, v0, Lovable, Bolt).
> Ele foi escrito para ser autossuficiente: não depende de contexto anterior.

---

## Papel

Você é um engenheiro front-end sênior e designer de produto. Construa um site
institucional de conteúdo, completo e pronto para produção, para a **Clínica
Gattini** (psicologia). O site é um guia de controles parentais entregue aos
clientes da clínica após a consulta.

Entregue o projeto inteiro, com todos os arquivos, pronto para `npm install &&
npm run build`. Não deixe TODOs, placeholders de texto (`lorem ipsum`) nem
seções vazias.

---

## Stack obrigatória

- **Astro 5** com TypeScript em modo `strict`. Astro porque o site é
  majoritariamente conteúdo estático: ele entrega HTML puro com zero JavaScript
  por padrão, o que dá nota máxima de performance e SEO.
- **Tailwind CSS 4** via `@tailwindcss/vite`, com os tokens da marca definidos
  em `@theme`.
- **Astro Content Collections** com schema Zod para as fichas de tutorial —
  cada ferramenta é um arquivo Markdown tipado em `src/content/ferramentas/`,
  não HTML solto. Isso permite adicionar uma ferramenta nova sem tocar em código.
- **astro-icon** + pacote `@iconify-json/simple-icons` para os logos de marca.
- **@fontsource-variable** para as fontes (auto-hospedadas, sem chamada externa
  ao Google Fonts — é mais rápido e evita questões de privacidade/LGPD).
- **Zero dependência de runtime no cliente.** Acordeões com `<details>` nativo.
  Nada de React, nada de framework de UI.
- Saída `output: 'static'`. Deploy na Vercel.

---

## Identidade visual

Paleta bege e marrom, quente e calma — deve parecer material de consultório de
psicologia, não manual de TI. Defina como tokens em `@theme`:

```
--color-areia:      #f0e7d8   /* fundo da página */
--color-creme:      #faf5ec   /* fundo dos cartões */
--color-creme-2:    #e8dcc8   /* fundo sutil, tabelas */
--color-tinta:      #2f2118   /* texto principal */
--color-tinta-suave:#5f4b3b   /* texto secundário */
--color-tinta-fraca:#8b7561   /* legendas, rótulos */
--color-linha:      #ddcfb9   /* bordas */
--color-linha-forte:#c4b096   /* bordas com ênfase */
--color-terra:      #8a5524   /* cor de destaque */
--color-terra-esc:  #6d4119   /* destaque sobre claro */
```

Tema escuro obrigatório, com a mesma paleta invertida em tons de marrom
escuro (fundo `#191310`, cartões `#221a15`, texto `#f0e5d7`, destaque `#d09a63`).
Implemente com `prefers-color-scheme` **e** um atributo `data-theme` no `<html>`,
para que um botão de alternância funcione nas duas direções.

**Tipografia:** `Newsreader` (serifada, variável) nos títulos; `Karla` no corpo
e na interface. Escala tipográfica definida, texto corrido em torno de 65
caracteres de largura, `text-wrap: balance` nos títulos.

**Regras de composição:** nada de gradiente roxo, nada de emoji como marcador de
seção, nada de sombra genérica em tudo. Borda, preenchimento e sombra são gastos
por função — só o que precisa de destaque recebe destaque.

---

## Estrutura de arquivos

```
├── public/
│   ├── logo-gattini.svg        ← o cliente coloca o logo da clínica aqui
│   ├── capa.png                ← 1200×630, prévia do WhatsApp
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Cabecalho.astro     ← header fixo: logo + navegação + tema
│   │   ├── Heroi.astro
│   │   ├── NotaClinica.astro   ← o enquadramento psicológico de abertura
│   │   ├── CartaoFerramenta.astro  ← recomendação com logo, prós, contras, links
│   │   ├── TabelaComparativa.astro
│   │   ├── FichaTutorial.astro ← acordeão <details> com o passo a passo
│   │   ├── Passo.astro         ← um passo numerado
│   │   ├── Tecla.astro         ← o texto literal da tela, estilo tecla
│   │   ├── Combinado.astro     ← o contrato familiar imprimível
│   │   └── Rodape.astro
│   ├── content/
│   │   ├── config.ts           ← schema Zod das coleções
│   │   └── ferramentas/*.md    ← uma ficha por ferramenta
│   ├── layouts/Base.astro
│   ├── pages/index.astro
│   └── styles/global.css
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── README.md
```

### Schema das fichas (`src/content/config.ts`)

```ts
const ferramenta = z.object({
  nome: z.string(),
  subtitulo: z.string(),
  camada: z.enum(['wifi', 'aparelho', 'aplicativo']),
  destaque: z.enum(['comece-aqui', 'melhor-wifi', 'melhor-total', 'melhor-preco']).optional(),
  icone: z.string(),                  // nome do ícone simple-icons
  custo: z.string(),
  tempoInstalacao: z.string(),
  dificuldade: z.enum(['baixa', 'media', 'alta']),
  suporta: z.object({
    horarios: z.boolean(),
    tempoPorApp: z.boolean(),
    filtroSites: z.boolean(),
    funcionaNo4G: z.boolean(),
  }),
  links: z.array(z.object({
    rotulo: z.string(),
    url: z.string().url(),
    tipo: z.enum(['site', 'app-store', 'play-store', 'painel']),
  })),
  pros: z.array(z.string()),
  contras: z.array(z.string()),
  preRequisitos: z.array(z.string()),
  passos: z.array(z.string()),        // Markdown inline permitido
  comoSaber: z.string(),
  naoResolve: z.array(z.string()),
});
```

---

## Conteúdo (use exatamente este, não invente)

### Abertura — nota clínica

> **Antes de instalar qualquer coisa:** controle parental é apoio a um combinado,
> não substituto dele. O efeito é muito melhor quando a criança ou o adolescente
> sabe o que foi ativado e por quê — inclusive porque a configuração feita às
> escondidas, quando descoberta (e costuma ser), custa mais confiança do que o
> problema que tentava resolver.
>
> Ajuste a intensidade à idade: até 8 anos, ambiente fechado e acompanhado; dos
> 9 aos 12, limites claros com espaço para negociação; a partir dos 13, o
> combinado pesa mais que o bloqueio — o filtro vira rede de proteção, não muro.

### As três camadas

1. **Na casa (Wi-Fi)** — cobre tudo que se conecta, inclusive TV e videogame.
   Não alcança o 4G nem o Wi-Fi da escola.
2. **No aparelho** — viaja junto com a criança. É a única camada que limita
   tempo por aplicativo.
3. **Dentro do app** — perfil infantil, modo restrito, PIN. Os outros filtros
   não enxergam o que acontece dentro de um app já liberado.

### Ferramentas recomendadas (quatro cartões, nesta ordem)

| Ferramenta | Selo | Camada | Custo | Instalação | Dificuldade |
|---|---|---|---|---|---|
| App da operadora (Vivo, Claro, TIM, Oi) | Comece por aqui | wifi | incluso | 5 min | baixa |
| TP-Link Deco + HomeShield | Melhor Wi-Fi | wifi | aparelho + anual | 30 min | baixa |
| Qustodio | Melhor no total | aparelho | anual | 15 min/aparelho | baixa |
| NextDNS | Melhor preço | wifi | anual barato | 20 min | média |

E mais quatro fichas sem selo: **Tempo de Uso (iPhone/iPad)**, **Family Link
(Android)**, **Segurança da Família (Windows)**, **Tempo de Uso (Mac)**, e uma
ficha final **YouTube e Netflix**.

### Links de instalação

Para cada ferramenta, inclua o site oficial e os links de loja. **Use links de
busca nas lojas** (`apps.apple.com/br/search?term=...` e
`play.google.com/store/search?q=...&c=apps`) em vez de IDs de aplicativo: IDs
mudam e quebram, a busca nunca dá 404.

Sites oficiais:
- Qustodio — https://www.qustodio.com/pt/
- NextDNS — https://nextdns.io
- TP-Link Deco — https://www.tp-link.com/br/deco/
- Google Family Link — https://families.google/intl/pt-BR/familylink/
- Microsoft Family Safety — https://family.microsoft.com
- Apple, controles para famílias — https://www.apple.com/br/families/
- YouTube Kids — https://www.youtubekids.com
- Netflix, conta — https://www.netflix.com/account

### Anatomia de cada ficha de tutorial

Obrigatoriamente, nesta ordem:

1. **Antes de começar** — lista de pré-requisitos, em bloco destacado em âmbar.
   É onde as pessoas travam, então vem antes do passo 1.
2. **Passos numerados** — no máximo 9. O texto que aparece na tela do aparelho
   vem marcado com o componente `<Tecla>`, renderizado como uma tecla física
   (fundo sutil, borda inferior mais grossa). Exemplo:
   `toque em <Tecla>Tempo Longe da Tela</Tecla>`.
3. **Como saber que deu certo** — bloco em tom de destaque, descrevendo o que a
   pessoa deve ver na tela para ter certeza de que funcionou.
4. **O que isso não resolve** — bloco neutro, em lista. Não é rodapé legal: é o
   que evita falsa sensação de segurança (VPN, dados móveis, filtro que só vale
   em um navegador).

### Seções finais

- **Por onde começar** — seis passos ordenados por retorno sobre esforço.
- **Combinado de uso de telas** — contrato familiar de seis linhas com espaços
  pontilhados para preencher à mão e campos de assinatura da criança e do
  responsável. Deve ficar perfeito impresso.

---

## Requisitos funcionais

- **Navegação fixa** no topo, com o logo da Gattini à esquerda, links de âncora
  para as seções e alternância de tema. Em telas pequenas, vira um menu enxuto.
- **Botão "Abrir todos os passos"** que expande e recolhe todas as fichas.
- **Botão "Salvar em PDF"** que abre todas as fichas e chama `window.print()`.
- **Folha de estilo de impressão** dedicada: fundo branco, tinta preta, fichas
  todas abertas, navegação e botões ocultos, sem quebrar cartão no meio
  (`break-inside: avoid`), URLs dos links impressas por extenso.
- **Busca por texto** opcional: um campo que filtra as fichas visíveis conforme
  a pessoa digita, em JavaScript puro, sem biblioteca.

## Requisitos de qualidade

- **Acessibilidade:** meta 100 no Lighthouse. Contraste AA nos dois temas,
  navegação completa por teclado com foco visível, `<details>`/`<summary>`
  nativos, landmarks semânticos, `lang="pt-BR"`, `prefers-reduced-motion`
  respeitado.
- **Performance:** meta 100 no Lighthouse. Fontes auto-hospedadas com
  `font-display: swap` e preload da variável principal. Nenhum JavaScript
  bloqueante. CSS crítico embutido.
- **SEO e compartilhamento:** `<title>`, meta description, canonical, Open Graph
  completo (`og:title`, `og:description`, `og:image` 1200×630, `og:locale`
  `pt_BR`), Twitter card, `sitemap.xml` via `@astrojs/sitemap`, e JSON-LD do
  tipo `Article` com `publisher` sendo a Clínica Gattini.
- **Responsivo** de 360px a 1920px. Tabela comparativa com rolagem horizontal
  no próprio contêiner — a página nunca rola de lado.
- **Rodapé** com nome da clínica, espaço para nome e CRP do profissional, aviso
  de que nenhuma ferramenta citada tem relação comercial com a clínica, e
  aviso de que é material de orientação geral que não substitui avaliação
  individual.

## Deploy

Inclua um `README.md` com: como rodar localmente, como publicar na Vercel
(import do GitHub, preset `Astro`, sem configuração extra), e como apontar um
subdomínio como `telas.gattini.com.br` via CNAME.

---

## Como você deve trabalhar

1. Crie o projeto, instale as dependências e confirme que `npm run build` passa.
2. Rode o site e verifique visualmente a home nos dois temas.
3. Só então me entregue, com um resumo do que foi construído e o que falta eu
   fornecer (logo, capa, nome e CRP do profissional).

Não peça confirmação no meio do caminho. Tome as decisões de design você mesmo,
dentro das regras acima.
