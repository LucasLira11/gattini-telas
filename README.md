# Telas em Família — Clínica Gattini

Site de conteúdo com o guia de controles parentais entregue aos clientes da
clínica. HTML, CSS e JavaScript puros: **sem build, sem dependências, sem
`npm install`**. Qualquer hospedagem estática serve.

```
gattini-telas/
├── index.html            ← o site inteiro
├── assets/
│   ├── styles.css        ← paleta areia e terra, tema claro e escuro, impressão
│   └── app.js            ← tema, busca, abrir/fechar fichas, PDF
├── public/
│   ├── logo-gattini-dark.png   ← logo em tinta, para o tema claro e a impressão
│   ├── logo-gattini-white.png  ← logo em branco, para o tema escuro
│   ├── capa.png                ← 1200×630, cartão do WhatsApp
│   └── favicon.png             ← o "G" do logo
└── docs/
    ├── PROMPT.md               ← especificação para regerar o site em Astro
    └── gerar-capa.ps1          ← refaz capa.png e favicon.png a partir do logo
```

**No ar em:** <https://lucaslira11.github.io/gattini-telas/>

Leia `public/LEIA-ME.md` para as especificações do logo e da capa.

---

## Rodar no seu computador

Abra `index.html` com duplo clique. É só isso — não precisa de servidor.

---

## Publicar

### Netlify Drop — o mais rápido, sem instalar nada

1. Abra <https://app.netlify.com/drop>
2. Arraste a pasta `gattini-telas` inteira para a área indicada.
3. O link sai na hora. Crie uma conta gratuita para manter o site no ar e
   escolher um endereço melhor.

Para atualizar depois, arraste a pasta de novo no painel.

### Vercel pelo GitHub — o mais profissional

1. Crie um repositório em <https://github.com/new>. Pode ser privado.
2. Na página do repositório vazio, clique em **uploading an existing file** e
   arraste os arquivos desta pasta. (Mantenha a estrutura: `assets/` e
   `public/` precisam continuar como pastas.)
3. Em <https://vercel.com/new>, importe o repositório.
4. Em *Framework Preset*, escolha **Other**. Deixe os campos de build vazios —
   não há build.
5. **Deploy**.

A partir daí, qualquer alteração no GitHub republica o site sozinho.

### Vercel pelo terminal

Requer Node.js instalado. Dentro desta pasta:

```bash
npx vercel --prod
```

---

## Domínio próprio

1. **Já existe site da clínica:** use um subdomínio. Na Vercel, em
   *Settings → Domains*, digite `telas.gattini.com.br`. Ela mostra o registro
   CNAME a cadastrar no provedor do domínio.
2. **Ainda não tem domínio:** registre em <https://registro.br> (`.com.br` sai
   por volta de R$ 40 por ano) e siga o passo acima.

O certificado HTTPS é emitido automaticamente. Você não faz nada.

Depois de configurar o domínio, atualize a linha `<link rel="canonical">` no
`index.html` com o endereço final.

---

## Antes de divulgar

- [x] Colocar o logo, a capa e o favicon em `public/`
- [ ] Preencher nome e CRP do responsável técnico no rodapé do `index.html`
      (procure por `[nome]` e `CRP [número]`)
- [ ] Ao trocar de domínio, atualizar as três linhas do `index.html` que trazem
      o endereço por extenso: `canonical`, `og:url` e `og:image`
- [ ] Abrir o link no celular e conferir o tema escuro
- [ ] Testar o botão **Salvar em PDF**
- [ ] Colar o link numa conversa do WhatsApp e ver se o cartão aparece certo

---

## Manutenção

**Adicionar uma ferramenta nova:** copie um bloco `<details class="ficha">`
inteiro no `index.html`, troque o conteúdo e atualize o atributo `data-busca`
com as palavras pelas quais ela deve ser encontrada.

**Trocar as cores:** todas vivem no topo de `assets/styles.css`, no bloco
`:root`. O tema escuro repete os mesmos nomes mais abaixo — mude nos dois
lugares.

**Os ícones das ferramentas** são desenhos genéricos feitos para este site, não
as marcas oficiais dos produtos. Se quiser usar os logos reais, coloque os
arquivos em `public/logos/` e troque o `<svg><use .../></svg>` de cada cartão
por `<img src="public/logos/nome.svg" alt="">`.

**Os links das lojas** apontam para a busca (`/search?term=...`) em vez do ID do
aplicativo. É de propósito: IDs de app mudam e quebram, a busca nunca dá 404.
