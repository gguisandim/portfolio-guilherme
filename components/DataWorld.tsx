"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { dataProjects } from "@/data/projects";
import { AnimatedTitle } from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger, Draggable);

const stages = [
  { label: "SIRG STAGE", x: 20, y: 22, color: "lime", projectIndex: 0 },
  { label: "BI ARENA", x: 67, y: 18, color: "pink", projectIndex: 2 },
  { label: "SQL TENT", x: 74, y: 64, color: "cyan" },
  { label: "ETL GARDEN", x: 35, y: 69, color: "orange", projectIndex: 2 }
];

const crowd = Array.from({ length: 108 }, (_, index) => ({
  left: `${5 + ((index * 37) % 90)}%`,
  top: `${11 + ((index * 23) % 76)}%`
}));

const treeClusters = [
  { x: 7, y: 9, size: "large" },
  { x: 89, y: 7, size: "small" },
  { x: 8, y: 73, size: "small" },
  { x: 86, y: 78, size: "large" },
  { x: 49, y: 7, size: "small" },
  { x: 56, y: 82, size: "small" }
];

const amenities = [
  { label: "FOOD", x: 45, y: 16, kind: "food" },
  { label: "MERCH", x: 58, y: 74, kind: "merch" },
  { label: "REST", x: 14, y: 60, kind: "rest" },
  { label: "INFO", x: 84, y: 47, kind: "info" },
  { label: "WC", x: 39, y: 35, kind: "wc" },
  { label: "LOCK", x: 77, y: 37, kind: "locker" }
];

const trucks = [
  { x: 31, y: 15, tone: "pink" },
  { x: 36, y: 14, tone: "cyan" },
  { x: 40, y: 15, tone: "orange" },
  { x: 80, y: 58, tone: "lime" }
];

const soundTowers = [
  { x: 22, y: 38 },
  { x: 59, y: 28 },
  { x: 77, y: 75 },
  { x: 38, y: 78 }
];

const chartSets = [
  [42, 66, 51, 82, 74, 94, 88],
  [28, 54, 44, 70, 63, 84, 77],
  [36, 49, 68, 57, 79, 72, 91]
];

export function DataWorld() {
  const root = useRef<HTMLElement>(null);
  const mapViewportRef = useRef<HTMLDivElement>(null);
  const mapCanvasRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<Draggable | null>(null);
  const zoomRef = useRef(1);

  const [showPois, setShowPois] = useState(true);
  const [showRoute, setShowRoute] = useState(true);

  const jumpToProject = (projectIndex?: number) => {
    if (projectIndex === undefined) return;

    const card = document.getElementById(`data-project-${projectIndex}`);
    if (!card) return;

    card.scrollIntoView({ behavior: "smooth", block: "center" });

    window.setTimeout(() => {
      gsap.fromTo(
        card,
        { scale: 0.98 },
        {
          scale: 1,
          duration: 0.42,
          repeat: 1,
          yoyo: true,
          ease: "power2.inOut"
        }
      );

      gsap.fromTo(
        card,
        { outlineColor: "rgba(23,20,29,0)", outlineWidth: 0 },
        {
          outlineColor: "rgba(23,20,29,.9)",
          outlineWidth: 8,
          duration: 0.42,
          repeat: 1,
          yoyo: true
        }
      );
    }, 520);
  };

  const setMapZoom = (nextZoom: number) => {
    const map = mapCanvasRef.current;
    if (!map) return;

    const clamped = gsap.utils.clamp(0.82, 1.42, nextZoom);
    zoomRef.current = clamped;

    gsap.to(map, {
      scale: clamped,
      duration: 0.38,
      ease: "power2.out"
    });
  };

  const resetMap = () => {
    const map = mapCanvasRef.current;
    if (!map) return;

    zoomRef.current = 1;
    gsap.to(map, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: "power3.out"
    });
  };

  useLayoutEffect(() => {
    const el = root.current;
    const mapViewport = mapViewportRef.current;
    const mapCanvas = mapCanvasRef.current;
    if (!el || !mapViewport || !mapCanvas) return;

    const ctx = gsap.context(() => {
      gsap.from(".festival-kicker, .festival-sub, .festival-entry-chip", {
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.75,
        ease: "power3.out"
      });

      gsap.from(".data-title", {
        yPercent: 20,
        opacity: 0,
        duration: 1,
        delay: 0.1,
        ease: "power4.out"
      });

      gsap.to(".festival-sun", {
        rotate: 360,
        duration: 22,
        repeat: -1,
        ease: "none"
      });

      gsap.to(".festival-ribbon", {
        xPercent: 8,
        duration: 4.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to(".floating-sticker", {
        y: -12,
        rotate: 2,
        stagger: 0.12,
        duration: 2.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      const droneTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".drone-section",
          start: "top top",
          end: "+=520",
          scrub: 0.7,
          pin: ".drone-pin"
        }
      });

      droneTimeline
        .fromTo(
          ".map-camera",
          { scale: 0.90, rotate: -0.6, xPercent: 0, yPercent: -1 },
          { scale: 0.98, rotate: 0, xPercent: 0, yPercent: 0, ease: "none" },
          0
        )
        .fromTo(
          ".drone-shadow",
          { xPercent: -35, yPercent: -20, rotate: -8, opacity: 0 },
          { xPercent: 38, yPercent: 28, rotate: 10, opacity: 0.34, ease: "none" },
          0.08
        )
        .fromTo(
          ".map-stage",
          { scale: 0.76, opacity: 0 },
          { scale: 1, opacity: 1, stagger: 0.07, ease: "back.out(1.5)" },
          0.2
        );

      draggableRef.current = Draggable.create(mapCanvas, {
        type: "x,y",
        bounds: {
          minX: -135,
          maxX: 135,
          minY: -85,
          maxY: 85
        },
        edgeResistance: 0.72,
        cursor: "grab",
        activeCursor: "grabbing",
        onPress() {
          gsap.to(".map-help", { opacity: 0.25, duration: 0.2 });
        },
        onRelease() {
          gsap.to(".map-help", { opacity: 1, duration: 0.25 });
        }
      })[0];

      const onMapWheel = (event: WheelEvent) => {
        if (!event.ctrlKey && !event.metaKey) return;
        event.preventDefault();

        const direction = event.deltaY > 0 ? -0.08 : 0.08;
        setMapZoom(zoomRef.current + direction);
      };

      mapViewport.addEventListener("wheel", onMapWheel, { passive: false });

      gsap.to(".crowd-dot", {
        scale: 1.65,
        opacity: 0.32,
        stagger: {
          each: 0.018,
          repeat: -1,
          yoyo: true,
          from: "random"
        },
        duration: 0.8,
        ease: "sine.inOut"
      });

      gsap.to(".festival-flag", {
        rotate: 5,
        transformOrigin: "bottom center",
        stagger: 0.08,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to(".map-wheel", {
        rotate: 360,
        duration: 18,
        repeat: -1,
        ease: "none"
      });

      gsap.to(".sound-wave", {
        scale: 1.7,
        opacity: 0,
        stagger: {
          each: 0.18,
          repeat: -1
        },
        duration: 1.5,
        ease: "power1.out",
        transformOrigin: "center center"
      });

      gsap.from(".festival-card", {
        y: 90,
        rotate: (index) => (index % 2 ? 4 : -4),
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".festival-cards",
          start: "top 78%"
        }
      });

      gsap.utils.toArray<SVGPathElement>(".festival-line").forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length
        });

        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: path.closest(".festival-card"),
            start: "top 82%",
            once: true
          }
        });
      });

      gsap.from(".festival-bar", {
        scaleY: 0,
        transformOrigin: "bottom",
        stagger: 0.05,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".festival-cards",
          start: "top 76%"
        }
      });

      gsap.utils.toArray<HTMLElement>("[data-festival-count]").forEach((counter) => {
        const target = Number(counter.dataset.festivalCount ?? "0");
        const state = { value: 0 };

        gsap.to(state, {
          value: target,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: counter,
            start: "top 88%",
            once: true
          },
          onUpdate: () => {
            counter.textContent = Math.round(state.value).toString();
          }
        });
      });

      const cards = gsap.utils.toArray<HTMLElement>(".festival-card");
      const cleanups: Array<() => void> = [];

      cards.forEach((card) => {
        const onMove = (event: PointerEvent) => {
          if (window.matchMedia("(pointer: coarse)").matches) return;
          const rect = card.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;

          gsap.to(card, {
            rotateX: -y * 5,
            rotateY: x * 7,
            y: -8,
            duration: 0.3,
            transformPerspective: 1000,
            ease: "power2.out"
          });
        };

        const onLeave = () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            y: 0,
            duration: 0.4,
            ease: "power3.out"
          });
        };

        card.addEventListener("pointermove", onMove);
        card.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          card.removeEventListener("pointermove", onMove);
          card.removeEventListener("pointerleave", onLeave);
        });
      });

      return () => {
        cleanups.forEach((cleanup) => cleanup());
        mapViewport.removeEventListener("wheel", onMapWheel);
        draggableRef.current?.kill();
        draggableRef.current = null;
      };
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={root} className="world data-world">
      <section className="data-festival-hero">
        <div className="festival-sun" aria-hidden="true" />
        <div className="festival-ribbon ribbon-a" aria-hidden="true" />
        <div className="festival-ribbon ribbon-b" aria-hidden="true" />
        <span className="floating-sticker sticker-a">SQL</span>
        <span className="floating-sticker sticker-b">BI</span>
        <span className="floating-sticker sticker-c">PYTHON</span>

        <p className="world-code festival-kicker">DATA FEST // WORLD 02</p>
        <AnimatedTitle lines={["DATA", "FESTIVAL"]} className="data-title" />
        <p className="festival-sub">
          gráficos, indicadores e projetos apresentados como um festival de dados.
        </p>

        <div className="festival-entry-chip">
          <span>GATES OPEN</span>
          <strong>DRONE VIEW ↓</strong>
        </div>
      </section>

      <section className="drone-section">
        <div className="drone-pin">
          <div className="drone-hud">
            <span className="hud-rec">REC</span>
            <span>ALT 118M</span>
            <span>DATA FESTIVAL // AERIAL VIEW</span>
            <span>GPS LOCK</span>
          </div>

          <div className="drone-hud-corners" aria-hidden="true">
            <i className="corner tl" />
            <i className="corner tr" />
            <i className="corner bl" />
            <i className="corner br" />
          </div>

          <div className="drone-side-telemetry" aria-hidden="true">
            <span>BAT 78%</span>
            <span>WIND 09 KM/H</span>
            <span>VISUAL MODE</span>
          </div>

          <div className="map-toolbar">
            <div className="map-zoom-controls">
              <button type="button" onClick={() => setMapZoom(zoomRef.current + 0.12)} aria-label="Aumentar zoom">+</button>
              <button type="button" onClick={() => setMapZoom(zoomRef.current - 0.12)} aria-label="Diminuir zoom">−</button>
              <button type="button" onClick={resetMap}>reset</button>
            </div>

            <div className="map-layer-controls">
              <button
                type="button"
                className={showPois ? "active" : ""}
                aria-pressed={showPois}
                onClick={() => setShowPois((current) => !current)}
              >
                POI
              </button>
              <button
                type="button"
                className={showRoute ? "active" : ""}
                aria-pressed={showRoute}
                onClick={() => setShowRoute((current) => !current)}
              >
                ROUTE
              </button>
            </div>

            <span className="map-help">arraste suavemente · ctrl + scroll para zoom · reset volta ao centro</span>
          </div>

          <div className="drone-reticle" aria-hidden="true">
            <span />
          </div>

          <div className="map-camera">
            <div ref={mapViewportRef} className="map-viewport">
              <div
                ref={mapCanvasRef}
                className={`festival-map ${showPois ? "show-pois" : "hide-pois"} ${showRoute ? "show-route" : "hide-route"}`}
              >
                <div className="map-ground ground-a" />
                <div className="map-ground ground-b" />
                <div className="map-ground ground-c" />

                <div className="map-floating-layer">
                  {treeClusters.map((tree, index) => (
                    <div
                      key={`tree-${index}`}
                      className={`tree-cluster tree-${tree.size}`}
                      style={{ left: `${tree.x}%`, top: `${tree.y}%` }}
                    >
                      <i /><i /><i /><i /><i />
                    </div>
                  ))}
                </div>

                <div className="festival-zone zone-chill">
                  <span>CHILL ZONE</span>
                  <i /><i /><i />
                </div>

                <div className="festival-zone zone-food">
                  <span>FOOD COURT</span>
                  <i /><i /><i /><i />
                </div>

                <div className="festival-path path-a" />
                <div className="festival-path path-b" />
                <div className="festival-path path-c" />
                <div className="festival-path path-d" />

                <svg className="data-route-overlay" viewBox="0 0 1000 650" aria-hidden="true">
                  <path
                    id="data-route-main"
                    className="data-route-line"
                    d="M90 480 C210 360, 290 145, 430 190 S650 350, 765 215 S890 220, 925 385"
                  />
                  <circle className="data-route-node" cx="90" cy="480" r="10" />
                  <circle className="data-route-node" cx="430" cy="190" r="10" />
                  <circle className="data-route-node" cx="765" cy="215" r="10" />
                  <circle className="data-route-node" cx="925" cy="385" r="10" />
                  <circle className="data-packet" r="8">
                    <animateMotion dur="7.5s" repeatCount="indefinite">
                      <mpath href="#data-route-main" />
                    </animateMotion>
                  </circle>
                  <circle className="data-packet packet-two" r="7">
                    <animateMotion dur="7.5s" begin="2.5s" repeatCount="indefinite">
                      <mpath href="#data-route-main" />
                    </animateMotion>
                  </circle>
                </svg>

                <div className="map-lake" />

                <div className="map-wheel">
                  <i /><i /><i /><i />
                </div>

                <div className="parking-zone">
                  <span>PARK + DROP</span>
                  <i /><i /><i /><i /><i />
                </div>

                <div className="bus-stop">
                  <span>SHUTTLE</span>
                  <i />
                </div>

                {stages.map((stage, index) => (
                  <button
                    type="button"
                    className={`map-stage stage-${stage.color} ${stage.projectIndex !== undefined ? "stage-project-link" : ""}`}
                    key={stage.label}
                    style={{ left: `${stage.x}%`, top: `${stage.y}%` }}
                    onClick={() => jumpToProject(stage.projectIndex)}
                    aria-label={
                      stage.projectIndex !== undefined
                        ? `${stage.label}: abrir projeto relacionado`
                        : stage.label
                    }
                  >
                    <span className="stage-roof" />
                    <strong>{stage.label}</strong>
                    <small>
                      {stage.projectIndex !== undefined ? "VER PROJETO ↘" : `AREA 0${index + 1}`}
                    </small>
                  </button>
                ))}

                <div className="poi-layer">
                  {amenities.map((item) => (
                    <div
                      className={`map-amenity amenity-${item.kind}`}
                      key={item.label}
                      style={{ left: `${item.x}%`, top: `${item.y}%` }}
                    >
                      <i />
                      <span>{item.label}</span>
                    </div>
                  ))}

                  {trucks.map((truck, index) => (
                    <div
                      className={`food-truck truck-${truck.tone}`}
                      key={`truck-${index}`}
                      style={{ left: `${truck.x}%`, top: `${truck.y}%` }}
                    >
                      <i />
                    </div>
                  ))}

                  {soundTowers.map((tower, index) => (
                    <div
                      className="sound-tower"
                      key={`tower-${index}`}
                      style={{ left: `${tower.x}%`, top: `${tower.y}%` }}
                    >
                      <i />
                      <span className="sound-wave" />
                      <span className="sound-wave wave-two" />
                    </div>
                  ))}
                </div>

                <div className="festival-gate">
                  <span>DATA FEST</span>
                  <strong>MAIN GATE</strong>
                  <i className="gate-left" />
                  <i className="gate-right" />
                </div>

                <div className="you-are-here">
                  <i />
                  <span>YOU ARE HERE</span>
                </div>

                <div className="festival-tents tents-a">
                  <i /><i /><i /><i />
                </div>

                <div className="festival-tents tents-b">
                  <i /><i /><i />
                </div>

                <div className="audience-cluster audience-sirg">
                  {Array.from({ length: 24 }).map((_, index) => <i key={index} />)}
                </div>

                <div className="audience-cluster audience-bi">
                  {Array.from({ length: 28 }).map((_, index) => <i key={index} />)}
                </div>

                <div className="audience-cluster audience-sql">
                  {Array.from({ length: 20 }).map((_, index) => <i key={index} />)}
                </div>

                {crowd.map((dot, index) => (
                  <span
                    key={index}
                    className={`crowd-dot crowd-${(index % 4) + 1}`}
                    style={{ left: dot.left, top: dot.top }}
                  />
                ))}

                <span className="festival-flag flag-a" />
                <span className="festival-flag flag-b" />
                <span className="festival-flag flag-c" />
                <span className="festival-flag flag-d" />

                <div className="drone-shadow" aria-hidden="true">
                  <i className="drone-body" />
                  <i className="prop prop-1" />
                  <i className="prop prop-2" />
                  <i className="prop prop-3" />
                  <i className="prop prop-4" />
                </div>
              </div>
            </div>
          </div>

          <div className="drone-copy">
            <div className="drone-copy-top">
              <span>01 / ENTRADA</span>
              <strong>INTERACTIVE MAP</strong>
            </div>

            <h2>agora o mapa também funciona como navegação.</h2>
            <p>
              Clique no SIRG STAGE para ir direto ao projeto. Arraste para explorar
              e use os controles para abrir ou fechar detalhes.
            </p>

            <div className="map-legend">
              <span><i className="legend lime" /> processamento</span>
              <span><i className="legend pink" /> análise</span>
              <span><i className="legend cyan" /> consulta</span>
              <span><i className="legend orange" /> transformação</span>
            </div>
          </div>
        </div>
      </section>

      <section className="festival-lineup-section">
        <div className="lineup-heading">
          <span>02 / LINEUP</span>
          <h2>os projetos entram como atrações.</h2>
          <p>
            As visualizações abaixo são demonstrativas: servem para mostrar a
            linguagem de gráficos e interação, não métricas reais dos projetos.
          </p>
        </div>

        <div className="festival-cards">
          {dataProjects.map((project, index) => {
            const values = chartSets[index % chartSets.length];

            return (
              <article
                id={`data-project-${index}`}
                className={`festival-card festival-card-${index + 1}`}
                key={project.title}
              >
                <div className="ticket-notch notch-left" />
                <div className="ticket-notch notch-right" />

                <header className="festival-card-header">
                  <span>DATA FEST PASS</span>
                  <strong>DAY 0{index + 1}</strong>
                </header>

                <div className="festival-poster">
                  <div className="poster-stamp">STAGE 0{index + 1}</div>
                  <span className="poster-kicker">{project.kicker}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>

                  <div className="festival-mini-metrics">
                    <div>
                      <strong data-festival-count={values[3]}>0</strong>
                      <span>signal</span>
                    </div>
                    <div>
                      <strong data-festival-count={values[5]}>0</strong>
                      <span>flow</span>
                    </div>
                    <div>
                      <strong data-festival-count={values[1]}>0</strong>
                      <span>read</span>
                    </div>
                  </div>

                  <div className="festival-chart">
                    <svg viewBox="0 0 420 170" role="img">
                      <title>Gráfico demonstrativo do card</title>
                      <path
                        className="festival-line"
                        d={`M18 ${150 - values[0]} C72 ${155 - values[1]}, 112 ${150 - values[2]}, 158 ${148 - values[3]} S250 ${155 - values[4]}, 292 ${148 - values[5]} S360 ${155 - values[6]}, 402 52`}
                      />
                    </svg>

                    <div className="festival-bars">
                      {values.map((value, valueIndex) => (
                        <i
                          className="festival-bar"
                          key={valueIndex}
                          style={{ height: `${Math.max(18, value)}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <footer className="festival-card-footer">
                  <div className="festival-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  {project.href ? (
                    <a href={project.href} target="_blank" rel="noreferrer">
                      OPEN PROJECT ↗
                    </a>
                  ) : (
                    <span className="festival-skill-note">SKILL / PRACTICE</span>
                  )}
                </footer>
              </article>
            );
          })}
        </div>
      </section>

      <section className="festival-exit">
        <div className="exit-wristband">
          <span>DATA FESTIVAL</span>
          <strong>SEE YOU AT THE NEXT STAGE</strong>
          <i />
        </div>
      </section>
    </main>
  );
}
