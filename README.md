# Guilherme Portfolio — Multipage Interactive GSAP

Recomeço do projeto como **portfólio multipágina**, inspirado na lógica de experiências interativas de referências como Creative Ed, mas com identidade e organização próprias.

## Rotas

```text
/          hub principal
/web       projetos visuais com cards pendurados e arrastáveis
/dados     laboratório de dados com gráfico controlado pelo scroll
/system    arquitetura interativa + projetos full-stack / infra
/lab       desktop explorável com janelas arrastáveis
/about     página editorial / colagem
```

## Rodando

```bash
npm install
npm run dev
```

Abra:

```text
http://localhost:3000
```

## Principais interações

### Home
- avatar reage ao mouse;
- cards/orbitas levam para mundos diferentes;
- entrada tipográfica com GSAP.

### Web
- card por vez na tela;
- botões prev/next + dots de navegação;
- estética synth/Atari com scanlines, glow e starfield;
- cards 2.5D com tilt no hover;
- cada card customizado para um site específico.

### Dados
- entrada como festival / vista aérea de drone;
- mapa top-down mais detalhado, com palcos, caminhos, público, árvores, food trucks, estacionamento, POIs e roda-gigante;
- câmera aproxima via `ScrollTrigger`, mas o mapa também pode ser arrastado manualmente;
- controles de zoom, reset e filtros de POI/rota;
- SIRG STAGE leva diretamente ao card do projeto;
- projetos aparecem como passes/cartas de festival;
- gráficos e contadores animados dentro dos cards;
- números marcados como demonstração visual, não métricas reais.

### System
- seção pinada no desktop;
- arquitetura Browser → Next → API → Supabase → PostgreSQL;
- nós clicáveis;
- packet animado;
- Wedding BF destacado como plataforma full-stack.

### Lab
- desktop próprio (`GUILHERME.OS`);
- janelas arrastáveis;
- apps/atalhos;
- terminal visual;
- links sociais.

### About
- estética de recorte editorial;
- stickers;
- composição preto/vermelho;
- avatar como pôster.

## Onde editar

Projetos:
```text
data/projects.ts
```

Componentes:
```text
components/HomeHub.tsx
components/WebWorld.tsx
components/DataWorld.tsx
components/SystemWorld.tsx
components/LabWorld.tsx
components/AboutWorld.tsx
```

Estética:
```text
app/globals.css
```

Identidade:
```text
public/avatar.png
```

## Referências incluídas

As imagens que você enviou foram copiadas apenas como referência visual:

```text
public/references/about-reference.png
public/references/web-reference.png
public/references/lab-reference.png
```

Elas não são usadas diretamente no layout.

## Próximas melhorias sugeridas

- GSAP Flip para transições de cards → página de projeto;
- screenshots reais dos projetos;
- rota `/project/[slug]`;
- transição de página mais elaborada;
- terminal realmente interativo no `/lab`;
- salvar posição das janelas do LAB;
- animação compartilhada do avatar entre Home e About;
- integração opcional com GitHub API em build time.


## Imagens dos cards WEB

As imagens reais usadas nos cards ficam em `public/projects/`.
