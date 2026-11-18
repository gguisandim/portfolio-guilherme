# Guilherme Sandim — Portfólio multipágina

Portfólio Next.js com três áreas de projetos e duas seções pessoais.

## Iniciar

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Rotas

| Rota | Conteúdo |
| --- | --- |
| `/` | Hub de navegação |
| `/web` | Projetos visuais, preservados da versão original |
| `/apps` | Museu de Software: SIRG, Wedding BF e Pipinho Finance |
| `/engineering` | Field Notes: Processamento de Imagens, Umbra Trail, Sistema Distribuído e Computação Gráfica |
| `/lab` | Desktop experimental |
| `/about` | Página de apresentação |
| `/dados` | Redirecionamento para `/engineering` |
| `/system` | Redirecionamento para `/apps` |

## O que foi alterado

- Criados `components/AppsWorld.tsx` e `components/EngineeringWorld.tsx`.
- Home e navegação atualizadas para WEB / APPS / ENGINEERING.
- Atualizada a curadoria em `data/projects.ts`.
- Adicionados estilos específicos ao final de `app/globals.css`, removidos os estilos obsoletos de DATA e SYSTEM.
- Removidos `components/DataWorld.tsx` e `components/SystemWorld.tsx`.
- Mantidas as áreas WEB, LAB e ABOUT.

## Interações

**APPS** é uma exposição minimalista de três aplicações: índice de obras, visualização editorial específica de cada produto, descrição, funcionalidades, tecnologias e navegação anterior/próximo. Os visuais são **estudos conceituais**, não screenshots reais.

**ENGINEERING** mostra uma ficha para cada estudo, com um pequeno experimento ilustrativo: filtro de imagem, variantes visuais de um tilemap, passos da troca de mensagens e rotação de um wireframe. Essas demonstrações **não executam o código dos repositórios** nem representam resultados verificados.

## Personalização

- Dados e links: `data/projects.ts`.
- Museu de Software e estudos visuais APPS: `components/AppsWorld.tsx`.
- Experimentos ENGINEERING: `components/EngineeringWorld.tsx`.
- Layout e responsividade: final de `app/globals.css`.
- Outros projetos visuais: `public/projects/`.

Para substituir um estudo conceitual por uma captura real de aplicação, adicione a imagem em `public/projects/` e adapte a função `MuseumArtwork` no `components/AppsWorld.tsx` para utilizar `Image` do Next.js. O link direto do GitHub do Pipinho Finance não foi confirmado; ajuste o campo `href` em `data/projects.ts` quando tiver o endereço.

## APPS — Museu de Software (edição visual 02)

A seção `/apps` usa uma galeria editorial de três aplicações (SIRG, Wedding BF e Pipinho Finance). Cada obra possui uma representação visual **conceitual**, não uma captura real da aplicação. A seleção funciona pela lista lateral, pelos indicadores, pelos botões anterior/próximo e pelas teclas de seta esquerda/direita. O layout possui versão responsiva e respeita `prefers-reduced-motion`.

Para editar a página: `components/AppsWorld.tsx`; estilos específicos de APPS ficam no fim de `app/globals.css`, no bloco identificado por `APPS / MUSEU DE SOFTWARE — edição 02`. As demais páginas permanecem como antes.
