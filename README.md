# Arthur Kudo — Salesforce Portfolio

Portfólio profissional com tema Salesforce.

## Stack

Vite + React 19 + TypeScript + Tailwind CSS v4 + shadcn/ui (componentes em `src/components/ui`).

## Estrutura

Página única e contínua, pensada para recrutadores: Hero → Experience → Certifications → Skills → Work (só aparece se houver projetos) → Contact.

```
Portfolio/
├── index.html                      # Entrada do Vite (fontes, meta tags)
├── components.json                 # Configuração do shadcn
├── public/assets/certs/            # Badges oficiais das certificações (WebP)
├── public/assets/skills/           # Ícones oficiais de produto Salesforce (orbital)
├── public/assets/projects/<slug>/  # Mídias de cada projeto
└── src/
    ├── App.tsx                     # Ordem das seções + rolagem suave (Lenis)
    ├── index.css                   # Tailwind + tokens shadcn + cores Salesforce
    ├── styles/portfolio.css        # Estilos do portfólio (@layer components)
    ├── lib/lenis.ts                # Rolagem suave, âncoras com offset e trava de scroll dos modais
    ├── data/profile.ts             # Perfil, destaques, experiências, certificações, skills
    ├── data/projects.ts            # Projetos (tipados) + exemplos do ?demo
    ├── components/ui/              # shadcn + 21st.dev: timeline (Aceternity), radial-orbital-timeline, works-wheel (sem uso),
    │                               # stacked-gallery-card, blur-text, marquee, badge, button, card
    └── components/sections/        # Header, Hero, Experience, Certifications, Projects (+ CaseDrawer), Skills, Contact, Backdrop
```

> Evite nomear classes do CSS do portfólio com nomes de utilities do Tailwind (`block`, `container`, `hidden`…): as utilities são aplicadas pelos componentes do 21st/shadcn e os estilos colidem.

## Rodar localmente

```bash
npm install
npm run dev
```

Abrir http://localhost:5173 — `?lang=pt` abre em português.

## Build e publicação

Site publicado em **https://arthurkudo.github.io/SalesforcePortfolio/** (GitHub Pages, branch `gh-pages`).

```bash
npm run deploy
```

Gera o build (`dist/`, com `base: "./"`) e publica na branch `gh-pages`. O código-fonte fica na branch `main`.

## Adicionar componentes do 21st.dev / shadcn

Colar o componente em `src/components/ui/<nome>.tsx` e instalar as dependências citadas. Componentes base do shadcn:

```bash
npx shadcn@latest add <componente>
```

As classes do Tailwind v4 (`animate-pulse`, `scale-*`, `bg-white/50` etc.) já existem — não é preciso redefini-las no CSS.

## Idiomas (EN / PT)

- Textos de interface: `src/i18n.tsx` (objeto `ui.en` / `ui.pt`).
- Conteúdo: qualquer campo em `src/data/*.ts` aceita uma string simples (igual nos dois idiomas) ou `{ en: "...", pt: "..." }`.
- O idioma escolhido fica salvo no navegador; `?lang=pt` abre direto em português.

## Adicionar um projeto

1. Colocar as mídias em `public/assets/projects/<slug>/`.
2. Adicionar um objeto em `projects` no arquivo `src/data/projects.ts`:

```ts
export const projects: Project[] = [
  {
    id: "service-cloud-case-revamp",
    title: { en: "Service Cloud case management revamp", pt: "Reestruturação do atendimento no Service Cloud" },
    clouds: ["Service Cloud"],
    summary: { en: "One sentence about the project.", pt: "Uma frase sobre o projeto." },
    cover: "assets/projects/service-cloud-case-revamp/cover.png",
    tags: ["Flow Builder", "Omni-Channel"],
    facts: [
      { label: { en: "Role", pt: "Papel" }, value: "Tech Lead" },
      { label: { en: "Industry", pt: "Setor" }, value: { en: "Banking", pt: "Bancário" } },
    ],
    challenge: { en: "...", pt: "..." },
    solution: { en: "...", pt: "..." },
    highlights: [{ en: "Measurable result", pt: "Resultado mensurável" }],
    video: { type: "youtube", src: "https://www.youtube.com/watch?v=..." },
    slides: { type: "google", src: "https://docs.google.com/presentation/d/.../pub" },
    gallery: [{ src: "assets/projects/service-cloud-case-revamp/screen-1.png", caption: { en: "Case console", pt: "Console de casos" } }],
  },
];
```

| Campo | Valores aceitos |
|-------|-----------------|
| `video.type` | `youtube`, `loom`, `vimeo` (URL normal de compartilhamento) ou `file` (caminho para `.mp4`) |
| `slides.type` | `google` (Google Slides publicado), `pdf` (caminho para PDF) ou `embed` (qualquer URL embutível: Canva, SlideShare) |

**Cases de exemplo:** `showExampleProjects = true` em `src/data/projects.ts` exibe 8 cases de exemplo (marcados como "Sample case study") com mockups gerados em `src/data/mockups.ts`. Troque para `false` quando publicar com os cases reais.

## Skills (orbital)

Os nós ficam em `skillOrbit` dentro de `src/data/profile.ts` (`image` aponta para `public/assets/skills`, `relatedIds` define as conexões, `energy` é a proficiência exibida no card). A faixa compacta de carreira fica em `careerPath`.

## Projetos (scroll storytelling)

- **Desktop:** painel fixo à esquerda com o case ativo (contador, cloud, resumo, 2 resultados, tags, "Abrir case" e atalhos 01–08); à direita, capa grande + a primeira tela da galeria sobreposta, animadas pela rolagem.
- **Celular:** cards verticais.
- **Detalhe:** painel lateral (`CaseDrawer`) com ‹ Anterior / Próximo › e setas do teclado; cada case tem link direto `/#project-<id>`.
- Para o painel mostrar resultados, preencha `highlights` (os 2 primeiros aparecem no painel). A primeira imagem de `gallery` vira a tela sobreposta.
- `src/components/ui/works-wheel.tsx` (roda do 21st) continua disponível, mas não está em uso.
