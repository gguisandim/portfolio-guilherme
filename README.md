# Guilherme Sandim — portfólio

Projeto Next.js 16 com React 19, TypeScript, CSS e GSAP. Esta edição mantém as áreas **WEB**, **APPS**, **ENGINEERING**, **LAB** e **ABOUT**.

## Executar localmente

Requisitos: Node.js compatível com Next.js 16 (20.9+), npm.

```bash
npm ci
npm run dev
```

Abra `http://localhost:3000`. Para verificar antes de publicar:

```bash
npm run typecheck
npm run build
```

## Rotas

- `/` — página inicial
- `/web` — projetos de interfaces e sites
- `/apps` — Museu de Software: SIRG, Wedding BF e Pipinho Finance
- `/engineering` — experimentos de computação e engenharia
- `/lab` — desktop experimental
- `/about` — apresentação
- `/dados` → `/engineering` (redirecionamento de compatibilidade)
- `/system` → `/apps` (redirecionamento de compatibilidade)

## Conteúdo e personalização

- `data/projects.ts`: projetos, descrições e links.
- `components/AppsWorld.tsx`: Museu de Software; peças visuais conceituais, não capturas do software real.
- `components/EngineeringWorld.tsx`: experimentos visuais didáticos; não executam o código dos repositórios.
- `components/WebWorld.tsx`: mundo WEB.
- `components/LabWorld.tsx` e `components/AboutWorld.tsx`: seções pessoais.
- `app/globals.css`: estilos e breakpoints.
- `public/projects/`: imagens dos projetos WEB.
- `public/og.png` e `public/favicon.svg`: compartilhamento e favicon. O endereço base dos metadados pode ser ajustado em `app/layout.tsx`.

O link específico do Pipinho Finance não estava confirmado no material: a exposição abre uma pesquisa de repositórios no perfil. Substitua por um `href` real em `data/projects.ts` quando disponível.

## Limpeza realizada

Foram removidos componentes desativados do antigo DATA/SYSTEM e arquivos não utilizados da estrutura paralela de Vite, Vinext, Cloudflare Worker, Drizzle e autenticação ChatGPT. Foi removida a configuração PostCSS/Tailwind, não usada pelo CSS do portfólio. O CSS recebeu deduplicação nas media queries de WEB, remoção de regras de APPS legadas e correção da animação de ENGINEERING.

**Observação:** este pacote não inclui `node_modules`, caches nem segredos. Rode `npm ci` depois de extrair. A compilação completa depende das dependências instaladas localmente.

## APPS — Museu de Software (edição pictórica)

A página `/apps` apresenta os projetos como obras de um acervo digital.
Cada projeto possui uma pintura conceitual própria, independente de capturas reais
ou dados de usuários:

- `public/artworks/sirg-painting.webp`: reinterpretação pictórica do símbolo do SIRG;
- `public/artworks/wedding-painting.webp`: composição abstrata com alianças;
- `public/artworks/pipinho-painting.webp`: gato geométrico com elementos circulares.

O componente `components/AppsWorld.tsx` controla a seleção das obras e os metadados
visuais. O conteúdo técnico continua em `data/projects.ts`. É possível navegar
pelos botões, pelo índice ou pelas setas ← → quando o foco não está em controles.

O link público direto do repositório Pipinho Finance ainda não foi confirmado;
por isso o botão desse projeto abre uma pesquisa no perfil GitHub, sem supor URL.
