"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { systemProjects } from "@/data/projects";
import { AnimatedTitle } from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const nodes = [
  ["CLIENT", "Interface e entrada do usuário."],
  ["NEXT", "Aplicação, rotas e lógica de interface."],
  ["API", "Validação e regras de negócio."],
  ["SUPABASE", "Auth, serviços e persistência."],
  ["POSTGRES", "Dados de convidados, RSVP e configurações."]
] as const;

export function SystemWorld() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (window.matchMedia("(min-width: 980px)").matches) {
        ScrollTrigger.create({
          trigger: ".system-architecture",
          start: "top 12%",
          end: "+=900",
          pin: ".system-pin"
        });
      }

      gsap.from(".sys-wire", {
        strokeDasharray: 400,
        strokeDashoffset: 400,
        stagger: 0.08,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".system-map",
          start: "top 76%"
        }
      });

      gsap.from(".sys-node", {
        scale: 0.7,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "back.out(1.6)",
        scrollTrigger: {
          trigger: ".system-map",
          start: "top 74%"
        }
      });

      gsap.to(".sys-packet", {
        x: 500,
        duration: 2.4,
        repeat: -1,
        ease: "none"
      });

      gsap.from(".system-project-card", {
        y: 60,
        opacity: 0,
        stagger: 0.11,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".system-project-grid",
          start: "top 82%"
        }
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={root} className="world system-world">
      <section className="system-intro">
        <p className="world-code">SYSTEM CORE // WORLD 03</p>
        <AnimatedTitle lines={["UNDER", "THE INTERFACE"]} className="system-title" />
        <p>plataformas · serviços · infraestrutura</p>
      </section>

      <section className="system-architecture">
        <div className="system-pin">
          <div className="system-map">
            <svg viewBox="0 0 900 320" aria-hidden="true">
              <path className="sys-wire" d="M115 160 H245" />
              <path className="sys-wire" d="M330 160 H455" />
              <path className="sys-wire" d="M540 160 H665" />
              <path className="sys-wire" d="M750 160 H845" />
            </svg>

            <span className="sys-packet" />

            {nodes.map(([label], index) => (
              <button
                key={label}
                type="button"
                className={`sys-node node-${index + 1} ${active === index ? "active" : ""}`}
                onClick={() => setActive(index)}
              >
                <small>0{index + 1}</small>
                <strong>{label}</strong>
              </button>
            ))}
          </div>

          <div className="sys-detail">
            <span>INSPECT NODE</span>
            <h2>{nodes[active][0]}</h2>
            <p>{nodes[active][1]}</p>
          </div>

          <div className="sys-terminal">
            <div>&gt; boot system.core</div>
            <div>[ ok ] interface</div>
            <div>[ ok ] api</div>
            <div>[ ok ] database</div>
            <div className="caret">&gt; _</div>
          </div>
        </div>
      </section>

      <section className="system-project-grid">
        {systemProjects.map((project, index) => (
          <article
            className={`system-project-card ${index === 0 ? "featured-system" : ""}`}
            key={project.title}
          >
            {index === 0 && <span className="featured-chip">PLATFORM / FULL STACK</span>}
            <span className="sys-index">0{index + 1}</span>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <div className="system-tags">
              {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            {project.href && (
              <a href={project.href} target="_blank" rel="noreferrer">
                OPEN ↗
              </a>
            )}
          </article>
        ))}
      </section>
    </main>
  );
}
