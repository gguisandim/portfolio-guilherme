"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

type AppName = "social" | "portrait" | "terminal" | "about";

const apps: Record<AppName, { title: string; body: ReactNode }> = {
  social: {
    title: "portals.zip",
    body: (
      <div className="portal-grid">
        <a href="https://github.com/gguisandim" target="_blank" rel="noreferrer">GitHub ↗</a>
        <a href="https://linkedin.com/in/guilherme-sandim" target="_blank" rel="noreferrer">LinkedIn ↗</a>
        <a href="mailto:guilhermesandim.gs@gmail.com">Email ↗</a>
      </div>
    )
  },
  portrait: {
    title: "avatar.bmp",
    body: (
      <div className="portrait-app">
        <Image src="/avatar.png" width={260} height={260} alt="Avatar de Guilherme" />
        <span>identity mark / 1-bit-ish</span>
      </div>
    )
  },
  terminal: {
    title: "terminal.exe",
    body: (
      <pre>{`GUILHERME.OS 1.0

> help
about
projects
skills
github

> projects
web/
dados/
system/

> _`}</pre>
    )
  },
  about: {
    title: "about.txt",
    body: (
      <p>
        Graduando em Sistemas de Informação pela UFPA, com experiência em
        desenvolvimento web, dados, suporte e sistemas.
      </p>
    )
  }
};

export function LabWorld() {
  const root = useRef<HTMLElement>(null);
  const [opened, setOpened] = useState<AppName[]>(["social", "portrait", "terminal"]);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const windows = gsap.utils.toArray<HTMLElement>(".lab-window");
      windows.forEach((windowEl) => {
        Draggable.create(windowEl, {
          type: "x,y",
          trigger: windowEl.querySelector(".window-titlebar") as HTMLElement,
          bounds: ".lab-desktop",
          edgeResistance: 0.75,
          cursor: "grab",
          activeCursor: "grabbing",
          onPress() {
            windows.forEach(w => w.style.zIndex = "4");
            windowEl.style.zIndex = "20";
          }
        });
      });

      gsap.from(".lab-icon", {
        x: -20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6
      });

      gsap.from(windows, {
        scale: 0.86,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: "back.out(1.4)"
      });
    }, el);

    return () => ctx.revert();
  }, [opened]);

  const open = (name: AppName) => {
    setOpened((current) => current.includes(name) ? current : [...current, name]);
  };

  const close = (name: AppName) => {
    setOpened((current) => current.filter((item) => item !== name));
  };

  return (
    <main ref={root} className="world lab-world">
      <div className="lab-desktop">
        <div className="lab-wallpaper-copy">
          <span>GUILHERME.OS // LAB</span>
          <h1>PLAYGROUND</h1>
          <p>arraste as janelas · abra os arquivos · fuce sem medo</p>
        </div>

        <aside className="lab-icons">
          {(["social", "portrait", "terminal", "about"] as AppName[]).map((name) => (
            <button className="lab-icon" key={name} onDoubleClick={() => open(name)} onClick={() => open(name)}>
              <span>{name === "terminal" ? ">_" : name === "portrait" ? "▧" : name === "social" ? "◉" : "▤"}</span>
              {apps[name].title}
            </button>
          ))}
        </aside>

        {opened.map((name, index) => (
          <section
            key={name}
            className={`lab-window window-${name}`}
            style={{ zIndex: 5 + index }}
          >
            <div className="window-titlebar">
              <span>{apps[name].title}</span>
              <button onClick={() => close(name)} aria-label={`Fechar ${apps[name].title}`}>×</button>
            </div>
            <div className="lab-window-body">{apps[name].body}</div>
          </section>
        ))}

        <footer className="lab-taskbar">
          <span>GUILHERME.OS</span>
          <span>{new Date().getFullYear()}</span>
        </footer>
      </div>
    </main>
  );
}
