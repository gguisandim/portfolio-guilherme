"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { appsProjects, type AppProject } from "@/data/projects";
import { ProjectReadingDialog } from "@/components/ProjectReadingDialog";

/**
 * Digital art studies created for this portfolio. They are not screenshots of
 * the applications, and no real user or financial information is represented.
 */
const artworks: Record<AppProject["id"], {
  src: string;
  description: string;
  title: string;
  interpretation: string;
  accent: string;
  accentSoft: string;
}> = {
  sirg: {
    src: "/artworks/sirg-painting.webp",
    description: "Pintura abstrata de formas curvas azul-marinho e laranja que reinterpretam o símbolo do SIRG sobre fundo de textura creme.",
    title: "Forma e organização",
    interpretation: "Um estudo de ordem, movimento e estrutura.",
    accent: "#ad4b2e",
    accentSoft: "#ecd6bf",
  },
  wedding: {
    src: "/artworks/wedding-painting.webp",
    description: "Duas alianças abstratas sobre pinceladas em tons de terracota, rosa antigo, dourado e ameixa.",
    title: "Laços e encontros",
    interpretation: "O encontro entre duas formas como metáfora de conexão.",
    accent: "#a14b51",
    accentSoft: "#ead3cf",
  },
  pipinho: {
    src: "/artworks/pipinho-painting.webp",
    description: "Pintura geométrica de um gato em tom creme, com círculo dourado e planos abstratos em verde petróleo e terracota.",
    title: "Ritmo e cotidiano",
    interpretation: "O cotidiano financeiro traduzido em uma forma familiar.",
    accent: "#3b6c61",
    accentSoft: "#d5dfd2",
  },
  electionops: {
    src: "/artworks/electionops-painting.webp",
    description: "Composição abstrata com grades, círculos, arcos e um gesto que lembra urna e cédula, em azul profundo, ferrugem, ocre e creme.",
    title: "Coordenação e decisão",
    interpretation: "Fluxos, governança e operação organizados em tensão geométrica.",
    accent: "#8f5433",
    accentSoft: "#e6d5be",
  },
};

function exhibitNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

function appsSummary(count: number) {
  const words: Record<number, string> = {
    1: "Uma",
    2: "Duas",
    3: "Três",
    4: "Quatro",
    5: "Cinco",
    6: "Seis",
  };
  const numberWord = words[count] ?? String(count);
  return `${numberWord} aplicações. ${numberWord} formas de resolver problemas reais.`;
}

export function AppsWorld() {
  const [selected, setSelected] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const readingButtonRef = useRef<HTMLButtonElement>(null);
  const count = appsProjects.length;
  const project = appsProjects[selected];
  const artwork = artworks[project.id];
  const choose = (index: number) => setSelected((index + count) % count);
  const theme = {
    "--museum-accent": artwork.accent,
    "--museum-accent-soft": artwork.accentSoft,
  } as CSSProperties;

  useEffect(() => {
    if (isReading) return;
    const handleArrow = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      const target = event.target;
      if (target instanceof HTMLElement && target.closest("input, textarea, select, button, a, [contenteditable='true']")) return;
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      setSelected((index) => (index + (event.key === "ArrowRight" ? 1 : -1) + appsProjects.length) % appsProjects.length);
    };
    window.addEventListener("keydown", handleArrow);
    return () => window.removeEventListener("keydown", handleArrow);
  }, [isReading]);

  return (
    <main className="world apps-world museum-world" id="main-content" style={theme}>
      <header className="museum-hero">
        <div className="museum-hero-main">
          <p className="museum-overline">PORTFÓLIO / 02 — COLEÇÃO DIGITAL</p>
          <h1>Software <em>em exposição.</em></h1>
          <p className="museum-hero-undertext">Projetos que existem além do código.</p>
        </div>
        <div className="museum-hero-side">
          <span className="museum-hero-side-number">{exhibitNumber(count)}</span>
          <p>{appsSummary(count)}</p>
          <span className="museum-hero-side-caption">ACERVO DIGITAL / 2026</span>
        </div>
      </header>

      <section className="museum-gallery" aria-label="Exposição de aplicações">
        <aside className="museum-index">
          <div className="museum-index-heading">
            <span>ESCOLHA UMA OBRA</span>
            <span>{exhibitNumber(count)} PROJETOS</span>
          </div>
          <nav aria-label="Obras do acervo" className="museum-index-list">
            {appsProjects.map((entry, index) => (
              <button
                key={entry.id}
                type="button"
                className={`museum-index-item ${selected === index ? "is-current" : ""}`}
                onClick={() => choose(index)}
                aria-pressed={selected === index}
                aria-label={`Exibir obra ${exhibitNumber(index)}: ${entry.title}`}
              >
                <span className="museum-index-thumbnail">
                  <Image src={artworks[entry.id].src} alt="" fill sizes="(max-width: 640px) 48px, 64px" />
                </span>
                <span className="museum-index-text">
                  <span className="museum-index-title"><small>{exhibitNumber(index)}</small>{entry.title}</span>
                  <span className="museum-index-category">{entry.category}</span>
                </span>
                <span className="museum-index-marker" aria-hidden="true">{selected === index ? "●" : ""}</span>
              </button>
            ))}
          </nav>
          <div className="museum-index-note">
            <span>EXPOSIÇÃO INTERATIVA</span>
            <p>Uma coleção de aplicações com propósitos distintos e identidades próprias.</p>
          </div>
        </aside>

        <div className="museum-room">
          <div className="museum-room-header">
            <span>COLEÇÃO / {exhibitNumber(selected)} — {exhibitNumber(count)}</span>
            <div className="museum-progress" aria-label={`Projeto ${selected + 1} de ${count}`}>
              {appsProjects.map((entry, index) => (
                <button key={entry.id} type="button" onClick={() => choose(index)}
                  className={selected === index ? "is-on" : ""}
                  aria-label={`Selecionar ${entry.title}`} aria-pressed={selected === index} />
              ))}
            </div>
          </div>

          <div key={project.id} className="museum-room-content">
            <figure className="museum-artwork-frame">
              <div className="museum-painting-wrap">
                <Image
                  src={artwork.src}
                  alt={artwork.description}
                  fill
                  priority={selected === 0}
                  sizes="(max-width: 780px) 92vw, (max-width: 1130px) 55vw, 42vw"
                  className="museum-painting"
                />
              </div>
              <figcaption>
                <span>FIG. {exhibitNumber(selected)} — {artwork.title.toUpperCase()}, 2026</span>
                <span>ESTUDO PICTÓRICO DIGITAL</span>
              </figcaption>
            </figure>

            <article className="museum-plaque" aria-labelledby="museum-project-title">
              <div className="museum-plaque-main">
                <span className="museum-plaque-kicker">OBRA {exhibitNumber(selected)} / {project.category.toUpperCase()}</span>
                <h2 id="museum-project-title">{project.title}</h2>
                <p className="museum-plaque-lead">{project.focus}</p>
                <p className="museum-plaque-description">{project.description}</p>
                <p className="museum-art-interpretation">“{artwork.interpretation}”</p>
                <div className="museum-feature-area">
                  <h3>POR DENTRO DO PROJETO</h3>
                  <ol>
                    {project.features.map((feature, index) => (
                      <li key={feature}><span>{exhibitNumber(index)}</span>{feature}</li>
                    ))}
                  </ol>
                </div>
              </div>
              <div className="museum-plaque-bottom">
                <div className="museum-technologies" aria-label="Tecnologias utilizadas">
                  {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <div className="museum-project-actions">
                  <button
                    ref={readingButtonRef}
                    type="button"
                    className="museum-read-button"
                    onClick={() => setIsReading(true)}
                  >
                    Ler sobre o projeto <span aria-hidden="true">→</span>
                  </button>
                  <a className="museum-project-link"
                    href={project.href ?? "https://github.com/gguisandim?tab=repositories&q=pipinho"}
                    target="_blank" rel="noopener noreferrer">
                    {project.href ? "Explorar repositório" : "Buscar no GitHub"}
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </article>
          </div>
          <div className="museum-room-navigation">
            <span>OBRA {exhibitNumber(selected)} DE {exhibitNumber(count)} <small>USE ← → PARA NAVEGAR</small></span>
            <div className="museum-navigation-buttons">
              <button type="button" onClick={() => choose(selected - 1)} aria-label="Exposição anterior">← <span>ANTERIOR</span></button>
              <button type="button" onClick={() => choose(selected + 1)} aria-label="Próxima exposição"><span>PRÓXIMA</span> →</button>
            </div>
          </div>
        </div>
      </section>
      <footer className="museum-footer"><span>FIM DA EXPOSIÇÃO / 02</span><Link href="/engineering">Próxima coleção: Engineering ↗</Link></footer>
      <ProjectReadingDialog
        open={isReading}
        onClose={() => setIsReading(false)}
        returnFocusRef={readingButtonRef}
        variant="museum"
        indexLabel={`CATÁLOGO / OBRA ${exhibitNumber(selected)}`}
        eyebrow={project.category}
        title={project.title}
        lead={project.focus}
        paragraphs={project.longDescription}
        tags={project.tags}
        href={project.href}
      />
    </main>
  );
}
