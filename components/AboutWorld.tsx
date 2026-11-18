"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

/**
 * About is an editorial collage. The portrait uses the unchanged /avatar.png
 * asset used across the rest of the site; only the surrounding layout changes.
 */
export function AboutWorld() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(".about-sticker", {
        y: 24,
        rotate: (i: number) => (i % 2 ? 2 : -2),
        opacity: 0,
        stagger: 0.085,
        duration: 0.6,
        ease: "power3.out",
        clearProps: "transform,opacity"
      });
      gsap.from(".about-portrait-card", {
        y: 38,
        rotate: 4,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        clearProps: "transform,opacity"
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={root} className="world about-world" id="main-content">
      <section className="about-left" aria-labelledby="about-title">
        <p className="about-code">[ ACCESS CODE // 02_ABOUT_ME ]</p>

        <h1 className="about-headline" id="about-title" aria-label="Código, experimento e um pouco de arte.">
          <span className="about-line about-line-code" aria-hidden="true">
            <span className="about-sticker about-paper">CÓDIGO,</span>
            <span className="about-sparks">✳</span>
          </span>
          <span className="about-line" aria-hidden="true">
            <span className="about-sticker about-green about-sticker-wide">EXPERIMENTO</span>
          </span>
          <span className="about-line" aria-hidden="true">
            <span className="about-sticker about-paper about-sticker-mid">E UM POUCO DE</span>
          </span>
          <span className="about-line about-line-last" aria-hidden="true">
            <span className="about-sticker about-green about-sticker-art">ARTE.</span>
            <span className="about-doodle" aria-hidden="true">✳</span>
          </span>
        </h1>

        <p className="about-intro">
          Graduando em Sistemas de Informação pela UFPA. Trabalho entre
          desenvolvimento web, organização de dados, suporte e arquitetura de
          sistemas — tentando fazer a interface explicar o que existe por trás.
        </p>

        <div className="about-links" aria-label="Perfis profissionais">
          <a href="https://github.com/gguisandim" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
          <a href="https://linkedin.com/in/guilherme-sandim" target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section className="about-right" aria-label="Retrato ilustrado e áreas de atuação">
        <div className="about-back-sheet" aria-hidden="true" />
        <figure className="about-portrait-card">
          <Image
            src="/avatar.png"
            alt="Avatar original: desenho em preto e branco de um rosto com cabelo escuro e óculos redondos"
            width={400}
            height={400}
            className="about-portrait"
            priority
          />
        </figure>
        <div className="about-cutout" aria-hidden="true">
          <span>WEB</span>
          <span>APPS</span>
          <span>ENGINEERING</span>
        </div>
        <div className="about-brush" aria-hidden="true" />
      </section>
    </main>
  );
}
