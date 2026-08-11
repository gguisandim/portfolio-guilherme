"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { AnimatedTitle } from "./AnimatedTitle";

export function AboutWorld() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from(".about-sticker", {
        scale: 0.7,
        rotate: (i) => (i % 2 ? 6 : -6),
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "back.out(1.6)"
      });

      gsap.from(".about-poster", {
        x: 120,
        rotate: 8,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={root} className="world about-world">
      <section className="about-left">
        <p className="about-code">[ ACCESS CODE // 02_ABOUT_ME ]</p>

        <div className="sticker-stack">
          <span className="about-sticker white">BUILDER</span>
          <span className="about-sticker red small">BY</span>
          <span className="about-sticker black">CURIOSITY.</span>
          <span className="about-sticker white">CODER</span>
          <span className="about-sticker red small">BY</span>
          <span className="about-sticker black">TRADE.</span>
        </div>

        <h2>STUDIED SYSTEMS, KEPT THE PLAY.</h2>
        <p>
          Graduando em Sistemas de Informação pela UFPA. Trabalho entre
          desenvolvimento web, organização de dados, suporte e arquitetura de
          sistemas — tentando fazer a interface explicar o que existe por trás.
        </p>

        <div className="about-links">
          <a href="https://github.com/gguisandim" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href="https://linkedin.com/in/guilherme-sandim" target="_blank" rel="noreferrer">LinkedIn ↗</a>
        </div>
      </section>

      <section className="about-right">
        <div className="about-poster poster-back" />
        <div className="about-poster poster-main">
          <Image src="/avatar.png" width={520} height={520} alt="Ilustração de Guilherme" />
        </div>
        <div className="about-cutout">
          <AnimatedTitle lines={["WEB", "DATA", "SYSTEM"]} />
        </div>
      </section>
    </main>
  );
}
