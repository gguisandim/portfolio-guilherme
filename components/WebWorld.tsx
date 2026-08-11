"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { webProjects } from "@/data/projects";
import { AnimatedTitle } from "./AnimatedTitle";

const themeClassMap = {
  artistico: "theme-artistico",
  english: "theme-english",
  bolos: "theme-bolos",
  prilei: "theme-prilei",
  luigi: "theme-luigi"
} as const;

export function WebWorld() {
  const root = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const ambienceRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<number | null>(null);
  const isAnimatingRef = useRef(false);
  const wheelLockRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = (index: number) => {
    const total = webProjects.length;
    setActiveIndex((index + total) % total);
  };

  useLayoutEffect(() => {
    const section = root.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    const ctx = gsap.context(() => {
      gsap.from(".web-kicker, .web-note, .web-caption", {
        y: 18,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: "power3.out"
      });

      gsap.from(".web-title", {
        y: 24,
        opacity: 0,
        scale: 0.95,
        duration: 0.9,
        delay: 0.08,
        ease: "power4.out"
      });

      gsap.from(".web-stage-shell", {
        y: 42,
        opacity: 0,
        duration: 0.9,
        delay: 0.16,
        ease: "power3.out"
      });

      gsap.to(".ambient-float-slow", {
        y: -16,
        x: 12,
        duration: 4.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to(".ambient-float-fast", {
        y: 14,
        x: -10,
        duration: 3.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to(".ambient-spin", {
        rotate: 360,
        duration: 16,
        repeat: -1,
        ease: "none"
      });

      gsap.to(".cake-flame", {
        scaleY: 1.18,
        scaleX: 0.92,
        y: -2,
        duration: 0.48,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "center bottom"
      });

      gsap.to(".heart-pop", {
        y: -8,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        stagger: 0.14,
        ease: "sine.inOut"
      });

      const cards = Array.from(section.querySelectorAll<HTMLElement>(".insta-card"));

      cards.forEach((card) => {
        const onMove = (event: PointerEvent) => {
          if (window.matchMedia("(pointer: coarse)").matches) return;

          const rect = card.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;

          gsap.to(card, {
            rotateX: -y * 5.5,
            rotateY: x * 8,
            y: -6,
            duration: 0.28,
            ease: "power2.out",
            transformPerspective: 1200
          });

          gsap.to(card.querySelectorAll("[data-depth]"), {
            x: (i, target) => x * Number((target as HTMLElement).dataset.depth ?? 0),
            y: (i, target) => y * Number((target as HTMLElement).dataset.depth ?? 0) * 0.65,
            duration: 0.32,
            ease: "power2.out",
            stagger: 0.012
          });
        };

        const onLeave = () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            y: 0,
            duration: 0.45,
            ease: "power3.out"
          });

          gsap.to(card.querySelectorAll("[data-depth]"), {
            x: 0,
            y: 0,
            duration: 0.45,
            ease: "power3.out"
          });
        };

        card.addEventListener("pointermove", onMove);
        card.addEventListener("pointerleave", onLeave);

        return () => {
          card.removeEventListener("pointermove", onMove);
          card.removeEventListener("pointerleave", onLeave);
        };
      });

      const onPointerDown = (event: PointerEvent) => {
        dragStartRef.current = event.clientX;
      };

      const onPointerUp = (event: PointerEvent) => {
        if (dragStartRef.current === null || isAnimatingRef.current) return;
        const delta = event.clientX - dragStartRef.current;
        dragStartRef.current = null;

        if (Math.abs(delta) < 48) return;
        if (delta < 0) goTo(activeIndex + 1);
        else goTo(activeIndex - 1);
      };

      const onWheel = (event: WheelEvent) => {
        if (wheelLockRef.current || isAnimatingRef.current) return;
        if (Math.abs(event.deltaX) < 18 && Math.abs(event.deltaY) < 18) return;

        wheelLockRef.current = true;
        if (event.deltaX > 0 || event.deltaY > 0) goTo(activeIndex + 1);
        else goTo(activeIndex - 1);

        window.setTimeout(() => {
          wheelLockRef.current = false;
        }, 620);
      };

      stage.addEventListener("pointerdown", onPointerDown);
      stage.addEventListener("pointerup", onPointerUp);
      stage.addEventListener("wheel", onWheel, { passive: true });

      return () => {
        stage.removeEventListener("pointerdown", onPointerDown);
        stage.removeEventListener("pointerup", onPointerUp);
        stage.removeEventListener("wheel", onWheel);
      };
    }, section);

    return () => ctx.revert();
  }, [activeIndex]);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const track = trackRef.current;
    const ambience = ambienceRef.current;
    if (!stage || !track || !ambience) return;

    const slideWidth = stage.clientWidth;
    isAnimatingRef.current = true;

    gsap.to(track, {
      x: -(slideWidth * activeIndex),
      duration: 0.72,
      ease: "power4.inOut",
      onComplete: () => {
        isAnimatingRef.current = false;
      }
    });

    const activeCard = track.children[activeIndex]?.querySelector<HTMLElement>(".insta-card");
    if (activeCard) {
      gsap.fromTo(
        activeCard,
        { rotateY: 7, rotateX: -2, scale: 0.96, opacity: 0.4, z: -20 },
        { rotateY: 0, rotateX: 0, scale: 1, opacity: 1, z: 0, duration: 0.82, ease: "power3.out" }
      );
    }

    const layers = Array.from(ambience.querySelectorAll<HTMLElement>(".ambient-layer"));
    layers.forEach((layer, index) => {
      const isActive = index === activeIndex;
      gsap.to(layer, {
        autoAlpha: isActive ? 1 : 0,
        scale: isActive ? 1 : 1.06,
        filter: isActive ? "blur(0px)" : "blur(12px)",
        duration: 0.72,
        ease: "power3.inOut"
      });
    });
  }, [activeIndex]);

  return (
    <main ref={root} className="world web-world">
      <section className="web-hero arcade-hero">
        <div className="hero-scanlines" />
        <div className="hero-noise" />
        <div className="hero-outline hero-outline-a" />
        <div className="hero-outline hero-outline-b" />
        <span className="hero-pixel pixel-a" />
        <span className="hero-pixel pixel-b" />
        <span className="hero-pixel pixel-c" />

        <p className="world-code web-kicker">WEB ARCADE // WORLD 01</p>
        <AnimatedTitle lines={["PIXEL", "PORTALS"]} className="web-title" />
        <p className="web-note">arraste para o lado ou use as setas</p>
        <p className="web-caption">
          Cards mais verticais, com atmosfera azul escura e cenário reativo para
          cada site.
        </p>
      </section>

      <section className="web-stage-wrap">
        <div ref={ambienceRef} className="project-ambience" aria-hidden="true">
          <div className="ambient-layer ambience-artistico">
            <span className="ambient-paint paint-a ambient-float-slow" />
            <span className="ambient-paint paint-b ambient-float-fast" />
            <span className="ambient-paint paint-c ambient-float-slow" />
            <span className="ambient-orb orb-a ambient-spin" />
            <span className="ambient-orb orb-b ambient-spin" />
          </div>

          <div className="ambient-layer ambience-english">
            <span className="ambient-record record-a ambient-spin" />
            <span className="ambient-record record-b ambient-spin" />
            <span className="ambient-note note-a ambient-float-fast">♪</span>
            <span className="ambient-note note-b ambient-float-slow">♫</span>
            <span className="ambient-note note-c ambient-float-fast">♪</span>
            <span className="ambient-bubble bubble-a ambient-float-slow" />
            <span className="ambient-bubble bubble-b ambient-float-fast" />
            <span className="ambient-wave wave-a" />
            <span className="ambient-wave wave-b" />
          </div>

          <div className="ambient-layer ambience-bolos">
            <span className="ambient-cake ambient-float-slow">
              <i className="cake-layer layer-1" />
              <i className="cake-layer layer-2" />
              <i className="cake-candle" />
              <i className="cake-flame" />
            </span>
            <span className="ambient-heart heart-pop heart-a">♥</span>
            <span className="ambient-heart heart-pop heart-b">♥</span>
            <span className="ambient-heart heart-pop heart-c">♥</span>
            <span className="ambient-heart heart-pop heart-d">♡</span>
            <span className="ambient-heart heart-pop heart-e">♥</span>
          </div>


          <div className="ambient-layer ambience-prilei">
            <span className="institution-grid" />
            <span className="institution-block block-a ambient-float-slow" />
            <span className="institution-block block-b ambient-float-fast" />
            <span className="institution-block block-c ambient-float-slow" />
            <span className="institution-line line-a" />
            <span className="institution-line line-b" />
            <span className="institution-mark mark-a">UFPA</span>
            <span className="institution-mark mark-b">PRILEI</span>
          </div>

          <div className="ambient-layer ambience-luigi">
            <span className="ambient-trail trail-red" />
            <span className="ambient-trail trail-blue" />
            <span className="ambient-trail trail-violet" />
            <span className="ambient-frame frame-a ambient-float-slow" />
            <span className="ambient-frame frame-b ambient-float-fast" />
          </div>
        </div>

        <div className="starfield" aria-hidden="true">
          {Array.from({ length: 28 }).map((_, i) => (
            <span
              key={i}
              className={`star-pixel star-${(i % 4) + 1}`}
              style={{
                left: `${(i * 17) % 96}%`,
                top: `${(i * 23) % 92}%`
              }}
            />
          ))}
        </div>

        <div className="web-stage-shell">
          <button
            type="button"
            className="stage-arrow stage-arrow-left"
            aria-label="Projeto anterior"
            onClick={() => goTo(activeIndex - 1)}
          >
            ‹
          </button>

          <div className="arcade-stage" ref={stageRef}>
            <div className="stage-glow" />
            <div ref={trackRef} className="arcade-slides">
              {webProjects.map((project, index) => {
                const themeClass = themeClassMap[project.theme ?? "artistico"];

                return (
                  <div className="arcade-slide" key={project.title}>
                    <article className={`insta-card ${themeClass}`}>
                      <div className="card-ghost ghost-red" aria-hidden="true" />
                      <div className="card-ghost ghost-cyan" aria-hidden="true" />

                      <div className="insta-shell">
                        <header className="insta-topbar" data-depth="5">
                          <div className="insta-user">
                            <span className="user-dot" />
                            <div>
                              <strong>{project.title}</strong>
                              <small>{project.kicker}</small>
                            </div>
                          </div>
                          <div className="site-status-wrap">
                            {project.status && (
                              <span className="project-status">{project.status}</span>
                            )}
                            <span className="site-index">site_0{index + 1}</span>
                          </div>
                        </header>

                        <div className="insta-media" data-depth="12">
                          {project.image && (
                            <Image
                              className="project-cover"
                              src={project.image}
                              alt={`Prévia visual de ${project.title}`}
                              fill
                              sizes="(max-width: 760px) 80vw, 420px"
                              priority={index === 0}
                            />
                          )}

                          <div className="cover-tint" />
                          <div className="screen-scanlines" />
                          <div className="screen-noise" />
                          <div className="screen-vignette" />

                          <div className="card-overlay card-overlay-top" data-depth="18">
                            <small>{project.screenTitle}</small>
                          </div>

                          <div className="card-overlay card-overlay-bottom" data-depth="26">
                            <strong>{project.title}</strong>
                            <em>{project.screenCaption}</em>
                          </div>

                          {project.theme === "english" && (
                            <div className="mini-accents" data-depth="20" aria-hidden="true">
                              <span className="mini-note note-1">♪</span>
                              <span className="mini-note note-2">♫</span>
                              <span className="mini-chat chat-1" />
                              <span className="mini-chat chat-2" />
                            </div>
                          )}

                          {project.theme === "bolos" && (
                            <div className="mini-accents" data-depth="20" aria-hidden="true">
                              <span className="mini-heart mh-1">♥</span>
                              <span className="mini-heart mh-2">♥</span>
                              <span className="mini-cake">
                                <i />
                                <i />
                                <i className="mini-candle" />
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="insta-content" data-depth="6">
                          <div className="insta-actions">
                            <span className="action-dot" />
                            <span className="action-dot" />
                            <span className="action-dot" />
                          </div>

                          <p>{project.description}</p>

                          <div className="insta-meta">
                            <div className="paper-tags neon-tags">
                              {project.tags.map((tag) => (
                                <span key={tag}>#{tag.replaceAll(" ", "")}</span>
                              ))}
                            </div>

                            {project.href && (
                              <a href={project.href} target="_blank" rel="noreferrer">
                                OPEN SITE ↗
                              </a>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="wire-object" data-depth="34" aria-hidden="true">
                        <i />
                        <i />
                        <i />
                        <i />
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            className="stage-arrow stage-arrow-right"
            aria-label="Próximo projeto"
            onClick={() => goTo(activeIndex + 1)}
          >
            ›
          </button>
        </div>

        <div className="stage-dots" aria-label="Navegação de cards">
          {webProjects.map((project, index) => (
            <button
              key={project.title}
              type="button"
              aria-label={`Ir para ${project.title}`}
              className={index === activeIndex ? "active" : ""}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
