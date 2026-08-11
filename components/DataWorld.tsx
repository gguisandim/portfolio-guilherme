"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { dataProjects } from "@/data/projects";
import { AnimatedTitle } from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

export function DataWorld() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const path = el.querySelector<SVGPathElement>(".data-line");
      if (path) {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".data-chart-panel",
            start: "top 78%",
            end: "bottom 40%",
            scrub: 1
          }
        });
      }

      gsap.from(".data-bar", {
        scaleY: 0,
        transformOrigin: "bottom",
        stagger: 0.06,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".data-chart-panel",
          start: "top 72%"
        }
      });

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((counter) => {
        const state = { value: 0 };
        const end = Number(counter.dataset.count || "0");
        gsap.to(state, {
          value: end,
          duration: 1.7,
          ease: "power2.out",
          scrollTrigger: { trigger: counter, start: "top 85%", once: true },
          onUpdate: () => (counter.textContent = Math.round(state.value).toString())
        });
      });

      gsap.from(".data-sheet", {
        y: 70,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".data-sheets",
          start: "top 82%"
        }
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={root} className="world data-world">
      <section className="data-hero">
        <p className="world-code">DATA LAB // WORLD 02</p>
        <AnimatedTitle lines={["MAKE DATA", "TELL SOMETHING"]} className="data-title" />
        <p className="data-handnote">scroll to build the graph ↓</p>
      </section>

      <section className="data-chart-panel">
        <aside className="data-side-copy">
          <span>01 / transform</span>
          <h2>dados deixam de ser planilha quando viram leitura.</h2>
          <p>
            Aqui a rolagem desenha a visualização. Os números abaixo são apenas
            demonstrativos para o efeito visual.
          </p>
        </aside>

        <div className="data-board">
          <div className="data-metrics">
            <div><strong data-count="82">0</strong><span>frequência</span></div>
            <div><strong data-count="49">0</strong><span>reuniões</span></div>
            <div><strong data-count="94">0</strong><span>registros</span></div>
          </div>

          <svg viewBox="0 0 800 380" className="data-graph" role="img">
            <title>Gráfico demonstrativo animado</title>
            <g className="data-gridlines">
              <line x1="60" y1="70" x2="740" y2="70" />
              <line x1="60" y1="150" x2="740" y2="150" />
              <line x1="60" y1="230" x2="740" y2="230" />
              <line x1="60" y1="310" x2="740" y2="310" />
            </g>
            <path
              className="data-line"
              d="M65 300 C130 245, 180 280, 235 210 S340 250, 390 155 S490 205, 555 128 S660 140, 735 72"
            />
            {[120, 175, 90, 220, 150, 255].map((h, i) => (
              <rect
                key={i}
                className="data-bar"
                x={105 + i * 95}
                y={330 - h}
                width="26"
                height={h}
                rx="6"
              />
            ))}
          </svg>
          <span className="data-demo">DEMO VISUAL — não são métricas reais</span>
        </div>
      </section>

      <section className="data-sheets">
        {dataProjects.map((project, index) => (
          <article className="data-sheet" key={project.title}>
            <div className="sheet-header">
              <span>DATA SHEET 0{index + 1}</span>
              <span>{project.kicker}</span>
            </div>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <div className="sheet-table">
              {project.tags.map((tag, tagIndex) => (
                <div key={tag}>
                  <span>0{tagIndex + 1}</span>
                  <strong>{tag}</strong>
                </div>
              ))}
            </div>
            {project.href && (
              <a href={project.href} target="_blank" rel="noreferrer">
                OPEN REPOSITORY ↗
              </a>
            )}
          </article>
        ))}
      </section>
    </main>
  );
}
