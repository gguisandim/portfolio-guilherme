"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import { appsProjects, type AppProject } from "@/data/projects";

/**
 * The artworks are original editorial interpretations of the products,
 * not screenshots, live interfaces or representations of real user data.
 */
function MuseumArtwork({ project }: { project: AppProject }) {
  if (project.id === "sirg") {
    return (
      <div className="museum-artwork museum-artwork--sirg" aria-label="Estudo gráfico conceitual dos módulos do SIRG">
        <span className="museum-artwork-label">01 / SISTEMA DE INFORMAÇÃO</span>
        <span className="museum-stage-type" aria-hidden="true">S</span>
        <div className="museum-ledger">
          <div className="museum-ledger-top"><strong>SIRG<span>↗</span></strong><span>AMBIENTE ACADÊMICO</span></div>
          <div className="museum-ledger-body">
            <span className="museum-ledger-kicker">ORGANIZAÇÃO QUE FAZ DIFERENÇA</span>
            <h3>Menos ruído.<br /><em>Mais controle.</em></h3>
            <div className="museum-ledger-rows" aria-hidden="true">
              {[["01", "Registros"], ["02", "Frequência"], ["03", "Relatórios"]].map(([number, label]) => (
                <div className="museum-ledger-row" key={number}><small>{number}</small><strong>{label}</strong><span>↗</span></div>
              ))}
            </div>
          </div>
          <div className="museum-ledger-bottom"><span>GESTÃO ACADÊMICA</span><span>01 — 03</span></div>
        </div>
        <span className="museum-artwork-index" aria-hidden="true">ACERVO / 001</span>
      </div>
    );
  }

  if (project.id === "wedding") {
    return (
      <div className="museum-artwork museum-artwork--wedding" aria-label="Estudo gráfico conceitual de convites e confirmações do Wedding BF">
        <span className="museum-artwork-label">02 / EXPERIÊNCIA & CONEXÃO</span>
        <span className="museum-stage-type" aria-hidden="true">W</span>
        <div className="museum-invitation">
          <div className="museum-invitation-top"><span>WEDDING / BF</span><span>✳</span></div>
          <div className="museum-invitation-center">
            <small>UM CONVITE. TANTAS HISTÓRIAS.</small>
            <strong>O especial<br />é estar <i>junto.</i></strong>
            <p>Uma experiência feita para reunir pessoas.</p>
          </div>
          <div className="museum-invitation-footer"><span>CONVIDAR</span><span>CONFIRMAR</span><span>CELEBRAR</span></div>
        </div>
        <div className="museum-wedding-stamp" aria-hidden="true"><span>RSVP</span><small>↗</small></div>
        <span className="museum-artwork-index" aria-hidden="true">ACERVO / 002</span>
      </div>
    );
  }

  return (
    <div className="museum-artwork museum-artwork--pipinho" aria-label="Estudo gráfico conceitual do fluxo Telegram, inteligência artificial e histórico financeiro do Pipinho Finance">
      <span className="museum-artwork-label">03 / FINANÇAS & TECNOLOGIA</span>
      <span className="museum-stage-type" aria-hidden="true">P</span>
      <div className="museum-pipinho">
        <div className="museum-pipinho-top"><strong>pipinho<span>.</span></strong><span>FINANCE / 01</span></div>
        <div className="museum-pipinho-main">
          <h3>Suas finanças.<br /><i>No seu ritmo.</i></h3>
          <div className="museum-pipinho-dialog" aria-hidden="true">
            <span className="museum-dialog-source">TELEGRAM / MENSAGEM</span>
            <div className="museum-dialog-bubble"><span>↗</span> Registrar uma despesa</div>
            <div className="museum-dialog-response"><span className="museum-response-dot" /> Interpretar e organizar com IA</div>
          </div>
        </div>
        <div className="museum-pipinho-flow" aria-hidden="true">
          <span>01 / CONVERSAR</span><b>→</b><span>02 / INTERPRETAR</span><b>→</b><span>03 / ORGANIZAR</span>
        </div>
      </div>
      <span className="museum-artwork-index" aria-hidden="true">ACERVO / 003</span>
    </div>
  );
}

const museumThemes: Record<AppProject["id"], CSSProperties> = {
  sirg: { "--museum-accent": "#ccf05c", "--museum-accent-strong": "#285c4a", "--museum-accent-light": "#e3efb9" } as CSSProperties,
  wedding: { "--museum-accent": "#e78c7b", "--museum-accent-strong": "#a64539", "--museum-accent-light": "#f9ddd2" } as CSSProperties,
  pipinho: { "--museum-accent": "#e9f18f", "--museum-accent-strong": "#2f5940", "--museum-accent-light": "#edf3c9" } as CSSProperties,
};

export function AppsWorld() {
  const [selected, setSelected] = useState(0);
  const project = appsProjects[selected];
  const count = appsProjects.length;
  const choose = (index: number) => setSelected((index + count) % count);
  const number = (index: number) => String(index + 1).padStart(2, "0");

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable='true']")) return;
      if (event.key === "ArrowRight") choose(selected + 1);
      if (event.key === "ArrowLeft") choose(selected - 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected, count]);

  return (
    <main className="world apps-world museum-world" id="main-content" style={museumThemes[project.id]}>
      <header className="museum-hero">
        <div className="museum-hero-main">
          <p className="museum-overline">PORTFÓLIO / 02 — COLEÇÃO DIGITAL</p>
          <h1>Software <em>em exposição.</em></h1>
          <span className="museum-hero-undertext">Projetos que existem além do código.</span>
        </div>
        <div className="museum-hero-side">
          <span className="museum-hero-side-number" aria-hidden="true">03<span>✳</span></span>
          <p>Três aplicações. Três formas de resolver problemas reais.</p>
          <span className="museum-hero-side-caption">ACERVO DE PRODUTOS DIGITAIS</span>
        </div>
      </header>

      <section className="museum-gallery" aria-label="Museu de software: seleção de projetos">
        <aside className="museum-index">
          <div className="museum-index-heading"><span>ESCOLHA UMA OBRA</span><span>0{count} PROJETOS</span></div>
          <nav aria-label="Projetos da exposição" className="museum-index-list">
            {appsProjects.map((entry, index) => (
              <button key={entry.id} type="button" className={`museum-index-item museum-index-item--${entry.id} ${index === selected ? "is-current" : ""}`}
                onClick={() => choose(index)} aria-pressed={index === selected}
                aria-label={`Ver projeto ${number(index)}: ${entry.title}`}>
                <span className="museum-index-num">{number(index)}</span>
                <span className="museum-index-info"><strong>{entry.title}</strong><small>{entry.category}</small></span>
                <span className="museum-index-symbol" aria-hidden="true">{index === selected ? "●" : "↗"}</span>
              </button>
            ))}
          </nav>
          <div className="museum-index-tail" aria-hidden="true"><span>EXPOSIÇÃO INTERATIVA</span><span className="museum-index-tail-line" /></div>
        </aside>

        <div className="museum-room" aria-label={`Sala ${number(selected)}: ${project.title}`}>
          <div className="museum-room-header">
            <span>COLEÇÃO / <strong>{number(selected)}</strong> <span className="museum-room-fraction">— {number(count)}</span></span>
            <div className="museum-progress" aria-label={`Projeto ${selected + 1} de ${count}`}>
              {appsProjects.map((entry, i) => <button key={entry.id} className={i === selected ? "is-on" : ""} onClick={() => choose(i)} type="button" aria-label={`Ir para ${entry.title}`} aria-pressed={i === selected} />)}
            </div>
          </div>
          <div className="museum-room-content" key={project.id}>
            <figure className="museum-artwork-frame">
              <MuseumArtwork project={project} />
              <figcaption><span>FIG. {number(selected)}</span> ESTUDO GRÁFICO CONCEITUAL · NÃO É A INTERFACE REAL</figcaption>
            </figure>
            <div className="museum-plaque">
              <div className="museum-plaque-main">
                <span className="museum-plaque-kicker"><i aria-hidden="true" /> OBRA {number(selected)} / {project.category.toUpperCase()}</span>
                <h2>{project.title}</h2>
                <p className="museum-plaque-lead">{project.focus}</p>
                <p className="museum-plaque-description">{project.description}</p>
                <div className="museum-feature-area">
                  <span className="museum-small-label">POR DENTRO DO PROJETO</span>
                  <ul>{project.features.map((feature, i) => <li key={feature}><span>0{i + 1}</span>{feature}</li>)}</ul>
                </div>
              </div>
              <div className="museum-plaque-bottom">
                <div className="museum-technologies" aria-label="Tecnologias utilizadas">
                  {project.tags.map(tag => <span key={tag}>{tag}</span>)}
                </div>
                {project.href ? (
                  <a className="museum-project-link" href={project.href} target="_blank" rel="noopener noreferrer">Explorar repositório <span aria-hidden="true">↗</span></a>
                ) : (
                  <a className="museum-project-link" href="https://github.com/gguisandim?tab=repositories&q=pipinho" target="_blank" rel="noopener noreferrer">Buscar no GitHub <span aria-hidden="true">↗</span></a>
                )}
              </div>
            </div>
          </div>
          <div className="museum-room-navigation">
            <span>0{selected + 1} <i>/</i> 0{count} <small>USE ← → PARA NAVEGAR</small></span>
            <div className="museum-navigation-buttons">
              <button onClick={() => choose(selected - 1)} type="button" aria-label="Projeto anterior"><span aria-hidden="true">←</span> ANTERIOR</button>
              <button className="museum-next-button" onClick={() => choose(selected + 1)} type="button" aria-label="Próximo projeto">PRÓXIMO <span aria-hidden="true">→</span></button>
            </div>
          </div>
        </div>
      </section>

      <footer className="museum-footer"><span>FIM DA EXPOSIÇÃO / 02</span><Link href="/engineering">Próxima coleção: Engineering <span aria-hidden="true">↗</span></Link></footer>
    </main>
  );
}
