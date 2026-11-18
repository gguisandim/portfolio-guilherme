"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { GenerativePaper } from "./lab/GenerativePaper";
import { PathfindingPaper } from "./lab/PathfindingPaper";
import { NetworkPaper } from "./lab/NetworkPaper";
import { PipinhoMascot } from "./lab/PipinhoMascot";

gsap.registerPlugin(Draggable);

type FileId = "social" | "portrait" | "terminal" | "about" | "art" | "algorithm" | "network";
type FileInfo = { name: string; label: string; code: string; glyph: string };

const files: Record<FileId, FileInfo> = {
  social: { name: "portals.zip", label: "atalhos e contatos", code: "00", glyph: "↗" },
  portrait: { name: "avatar.bmp", label: "identidade", code: "01", glyph: "▧" },
  terminal: { name: "terminal.exe", label: "linha de comando", code: "02", glyph: ">_" },
  about: { name: "about.txt", label: "sobre mim", code: "03", glyph: "≡" },
  art: { name: "formas.canvas", label: "formas generativas", code: "04", glyph: "✳" },
  algorithm: { name: "caminhos.alg", label: "busca de rotas", code: "05", glyph: "⌗" },
  network: { name: "internet.net", label: "simulador de redes", code: "06", glyph: "◎" },
};

const fileOrder: FileId[] = ["social", "portrait", "terminal", "about", "art", "algorithm", "network"];
const experiments: FileId[] = ["art", "algorithm", "network"];

function Terminal({ openFile }: { openFile: (name: FileId) => void }) {
  const [entries, setEntries] = useState<string[]>([
    "GUILHERME.OS / MURAL — v2.0",
    "Digite 'help' para explorar os arquivos.",
  ]);
  const [command, setCommand] = useState("");
  const outputRef = useRef<HTMLDivElement>(null);

  const runCommand = (raw: string) => {
    const input = raw.trim();
    if (!input) return;
    const [action, ...args] = input.toLowerCase().split(/\s+/);
    const target = args.join(" ");
    const aliases: Record<string, FileId> = {
      arte: "art", art: "art", formas: "art", "formas.canvas": "art",
      algoritmo: "algorithm", caminhos: "algorithm", algo: "algorithm", "caminhos.alg": "algorithm",
      rede: "network", redes: "network", internet: "network", "internet.net": "network",
      avatar: "portrait", "avatar.bmp": "portrait", about: "about", "about.txt": "about",
      contatos: "social", portals: "social", "portals.zip": "social",
      terminal: "terminal", "terminal.exe": "terminal",
    };
    let lines: string[] = [];
    if (action === "clear" || action === "cls") {
      setEntries([]);
      setCommand("");
      return;
    }
    if (action === "help") lines = ["COMANDOS DISPONÍVEIS", "help · ls · projects · skills · about · open [arquivo] · clear", "ex.: open formas  |  open caminhos  |  open redes"];
    else if (action === "ls" || action === "dir") lines = fileOrder.map((id) => `${files[id].name.padEnd(19)} ${files[id].label}`);
    else if (action === "projects") lines = ["web/", "apps/", "engineering/", "lab/  ← você está aqui"];
    else if (action === "skills") lines = ["Python · TypeScript · React · Next.js", "Node.js · SQL · Git · testes automatizados"];
    else if (action === "about") lines = ["Sistemas de Informação / UFPA — 8º semestre", "Desenvolvimento, pesquisa e experiências interativas."];
    else if (action === "open") {
      const id = aliases[target];
      if (id) {
        openFile(id);
        lines = [`Abrindo ${files[id].name}…`];
      } else lines = ["Arquivo não encontrado. Execute 'ls' para listar."];
    } else lines = [`Comando '${action}' não reconhecido. Digite 'help'.`];
    setEntries((current) => [...current, `> ${input}`, ...lines].slice(-70));
    setCommand("");
    requestAnimationFrame(() => { if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight; });
  };

  return (
    <div className="lab-terminal" onClick={(event) => {
      if (event.target === event.currentTarget) event.currentTarget.querySelector("input")?.focus();
    }}>
      <div className="lab-terminal-output" ref={outputRef} role="log" aria-label="Saída do terminal">
        {entries.map((entry, index) => <div key={`${index}-${entry}`} className={entry.startsWith("> ") ? "is-command" : ""}>{entry || "\u00a0"}</div>)}
      </div>
      <form className="lab-terminal-input" onSubmit={(event) => { event.preventDefault(); runCommand(command); }}>
        <label htmlFor="lab-command-input" aria-hidden="true">&gt;</label>
        <input id="lab-command-input" autoComplete="off" spellCheck={false} value={command} onChange={(event) => setCommand(event.target.value)} aria-label="Comando do terminal" placeholder="digite um comando…" />
        <button type="submit" aria-label="Executar comando">↵</button>
      </form>
    </div>
  );
}

function WindowContent({ id, openFile }: { id: FileId; openFile: (id: FileId) => void }) {
  if (id === "social") return (
    <div className="lab-paper-links">
      <a href="https://github.com/gguisandim" target="_blank" rel="noopener noreferrer"><span>01 / código</span><strong>GitHub ↗</strong></a>
      <a href="https://www.linkedin.com/in/guilherme-sandim-54116221a/" target="_blank" rel="noopener noreferrer"><span>02 / trajetória</span><strong>LinkedIn ↗</strong></a>
      <a href="mailto:guilhermesandim.gs@gmail.com"><span>03 / contato</span><strong>Email ↗</strong></a>
    </div>
  );
  if (id === "portrait") return (
    <div className="lab-paper-portrait">
      <div className="lab-paper-avatar"><Image src="/avatar.png" width={210} height={210} alt="Avatar ilustrado do autor" /></div>
      <div><span>FICHA DE IDENTIDADE / GS</span><strong>Guilherme<br />Sandim.</strong><small>uma marca, várias ideias.</small></div>
    </div>
  );
  if (id === "about") return (
    <div className="lab-paper-about">
      <span>ANOTAÇÃO 03 / SOBRE</span>
      <p>Graduando em Sistemas de Informação pela UFPA, no 8º semestre. Desenvolvo projetos web, aplicações e experimentos de engenharia de software.</p>
      <button type="button" onClick={() => openFile("terminal")}>explorar no terminal ↗</button>
    </div>
  );
  if (id === "terminal") return <Terminal openFile={openFile} />;
  if (id === "art") return (
    <div className="lab-experiment-content">
      <h2>Máquina de <em>formas.</em></h2>
      <p>Desenhos que mudam a cada tentativa.</p>
      <GenerativePaper />
    </div>
  );
  if (id === "algorithm") return (
    <div className="lab-experiment-content">
      <h2>Caminhos <em>possíveis.</em></h2>
      <p>Um labirinto, três maneiras de pensar.</p>
      <PathfindingPaper />
    </div>
  );
  return (
    <div className="lab-experiment-content">
      <h2>Internet <em>de papel.</em></h2>
      <p>Desligue um nó. Veja a rota mudar.</p>
      <NetworkPaper />
    </div>
  );
}

export function LabWorld() {
  const workspaceRef = useRef<HTMLDivElement>(null);
  const orderRef = useRef(60);
  const [opened, setOpened] = useState<FileId[]>(["social", "terminal"]);

  const open = (id: FileId) => {
    setOpened((current) => current.includes(id) ? [...current.filter((item) => item !== id), id] : [...current, id]);
  };
  const close = (id: FileId) => setOpened((current) => current.filter((item) => item !== id));
  const bringFront = (window: HTMLElement) => { window.style.zIndex = String(++orderRef.current); };

  useLayoutEffect(() => {
    const workspace = workspaceRef.current;
    if (!workspace) return;
    const media = window.matchMedia("(min-width: 981px) and (pointer: fine)");
    let instances: Draggable[] = [];
    const refreshDrag = () => {
      instances.forEach((instance) => instance.kill());
      instances = [];
      if (!media.matches) return;
      const windows = Array.from(workspace.querySelectorAll<HTMLElement>(".lab-mural-window"));
      instances = windows.flatMap((element) => Draggable.create(element, {
        type: "x,y",
        trigger: element.querySelector(".lab-window-handle") as HTMLElement,
        bounds: workspace,
        edgeResistance: 0.75,
        cursor: "grab",
        activeCursor: "grabbing",
        onPress() { bringFront(element); },
      }));
    };
    refreshDrag();
    media.addEventListener("change", refreshDrag);
    return () => {
      media.removeEventListener("change", refreshDrag);
      instances.forEach((instance) => instance.kill());
    };
  }, [opened]);

  return (
    <main className="world lab-world lab-mural-world" id="main-content">
      <div className="lab-mural-workspace" ref={workspaceRef}>
        <div className="lab-mural-backdrop" aria-hidden="true">
          <span>GUILHERME.OS / EXPERIMENTAL ARCHIVE / 2026</span>
          <h1>Mural<span>.</span></h1>
          <p>abra os arquivos · mova as folhas · faça seus testes</p>
        </div>

        <aside className="lab-mural-index" aria-label="Arquivos do mural">
          <header className="lab-index-header"><span>ÍNDICE / LAB</span><span>07 ARQUIVOS</span></header>
          <div className="lab-mural-filelist">
            {fileOrder.map((id) => (
              <button type="button" key={id} onClick={() => open(id)} className={`lab-mural-file ${opened.includes(id) ? "is-open" : ""}`} aria-label={`Abrir ${files[id].name}`}>
                <span className="lab-file-glyph" aria-hidden="true">{files[id].glyph}</span>
                <span className="lab-file-title">{files[id].name}<small>{files[id].label}</small></span>
                <span className="lab-file-arrow" aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
          <p className="lab-index-footnote">CLIQUE PARA ABRIR / ARRASTE PELA ABA</p>
        </aside>

        <div className="lab-mural-sample-list" aria-label="Experimentos disponíveis">
          <div className="lab-mural-sample-label">ESTUDOS DISPONÍVEIS <span>01 — 03</span></div>
          {experiments.map((id, index) => (
            <button key={id} type="button" onClick={() => open(id)} className="lab-mural-sample">
              <span className="lab-sample-number">{String(index + 1).padStart(2, "0")}</span>
              <span><strong>{id === "art" ? "Máquina de formas" : id === "algorithm" ? "Caminhos possíveis" : "Internet de papel"}</strong><small>{files[id].label}</small></span>
              <span className="lab-sample-open">ABRIR ↗</span>
            </button>
          ))}
        </div>

        <div className="lab-mural-stamp" aria-hidden="true"><span>LAB</span><strong>04</strong><small>experimentos</small></div>
        <div className="lab-mural-cornerlabel" aria-hidden="true">01 / 01 — O MURAL ESTÁ VIVO</div>

        {opened.map((id, index) => (
          <section key={id} className={`lab-mural-window lab-mural-window-${id}`} style={{ zIndex: index + 20 }} aria-label={files[id].name} onPointerDown={(event) => bringFront(event.currentTarget)}>
            <div className="lab-window-top">
              <div className="lab-window-handle">
                <span className="lab-window-category">{files[id].code} / {files[id].label}</span>
                <strong>{files[id].name}</strong>
              </div>
              <button type="button" className="lab-window-close" onClick={() => close(id)} aria-label={`Fechar ${files[id].name}`}>×</button>
            </div>
            <div className="lab-window-main"><WindowContent id={id} openFile={open} /></div>
            <div className="lab-window-footer"><span>GUILHERME.OS / LAB</span><span>FOLHA {files[id].code} ↗</span></div>
          </section>
        ))}
      </div>
      <PipinhoMascot />
    </main>
  );
}
