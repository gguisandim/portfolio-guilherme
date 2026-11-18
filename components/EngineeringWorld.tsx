"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { engineeringProjects, type EngineeringProject } from "@/data/projects";

function SpecimenArt() {
  return (
    <svg viewBox="0 0 320 194" role="img" aria-label="Composição de exemplo com formas geométricas e cores" className="eng-specimen-art">
      <rect width="320" height="194" fill="#e9ceb0" />
      <circle cx="87" cy="87" r="59" fill="#c56946" />
      <path d="M165 0 L300 0 L300 194 L132 194Z" fill="#536f66" />
      <path d="M177 160 C205 108 240 105 281 128 L320 160 L320 194 L177 194Z" fill="#303f40" />
      <circle cx="231" cy="63" r="31" fill="#c6bc78" />
      <rect x="34" y="134" width="109" height="15" rx="2" fill="#f0e5ca" />
      <rect x="34" y="157" width="75" height="9" rx="2" fill="#f0e5ca" />
      <path d="M0 32L320 32M0 96L320 96M0 161L320 161M80 0V194M160 0V194M240 0V194" fill="none" stroke="#fff" strokeOpacity=".12" />
    </svg>
  );
}

function ImageExperiment() {
  const [amount, setAmount] = useState(65);
  return (
    <div className="eng-experiment eng-images">
      <div className="eng-experiment-note">EXPERIMENTO 01 / TRANSFORMAÇÃO VISUAL</div>
      <div className="eng-image-pair">
        <figure><SpecimenArt /><figcaption>01 / ENTRADA</figcaption></figure>
        <figure><div style={{ filter: `grayscale(1) contrast(${1 + amount / 65})` }}><SpecimenArt /></div><figcaption>02 / SAÍDA ILUSTRATIVA</figcaption></figure>
      </div>
      <div className="eng-control-row">
        <label htmlFor="eng-contrast">CONTRASTE APLICADO</label>
        <input id="eng-contrast" type="range" min="0" max="100" value={amount} onChange={e => setAmount(Number(e.target.value))} />
        <output htmlFor="eng-contrast">{amount}%</output>
      </div>
      <p className="eng-experiment-help">Ajuste o contraste de uma amostra vetorial. Demonstração conceitual, sem executar o código do repositório.</p>
    </div>
  );
}

const tileMap = [
  "ttttwttttttt",
  "tttppppwtttt",
  "tttpttpppttt",
  "wtpptttppttt",
  "ttppppttpttw",
  "tttttpptpppt",
  "wtttttpppttt",
];

function MapExperiment() {
  const [corrupt, setCorrupt] = useState(false);
  return (
    <div className="eng-experiment eng-map-exp">
      <div className="eng-experiment-note">EXPERIMENTO 02 / ESTRUTURA DE FASE</div>
      <div className="eng-map-toolbar">
        <span>MAP / 12 × 07</span>
        <div role="group" aria-label="Alternar variante de cenário">
          <button type="button" className={!corrupt ? "is-active" : ""} aria-pressed={!corrupt} onClick={() => setCorrupt(false)}>NATURAL</button>
          <button type="button" className={corrupt ? "is-active" : ""} aria-pressed={corrupt} onClick={() => setCorrupt(true)}>CORROMPIDA</button>
        </div>
      </div>
      <div className={`eng-tile-board ${corrupt ? "is-corrupt" : ""}`} role="img" aria-label={`Exemplo esquemático de mapa em grade, variante ${corrupt ? "corrompida" : "natural"}`}>
        {tileMap.join("").split("").map((tile, index) => <span key={index} className={`eng-tile eng-tile-${tile}`} />)}
        <span className="eng-map-pin eng-map-pin-start" aria-hidden="true">A</span>
        <span className="eng-map-pin eng-map-pin-end" aria-hidden="true">B</span>
      </div>
      <div className="eng-map-legend"><span><i className="eng-legend-path" />CAMINHO</span><span><i className="eng-legend-nature" />AMBIENTE</span><span><i className="eng-legend-water" />ÁGUA</span></div>
      <p className="eng-experiment-help">Diagrama didático de tiles e variantes visuais, não o mapa real de uma fase do jogo.</p>
    </div>
  );
}

const phases = [
  { text: "Pronto para iniciar uma troca de mensagens.", state: "IDLE" },
  { text: "O nó A prepara uma mensagem.", state: "PREPARE" },
  { text: "Mensagem segue pelo canal de comunicação.", state: "TRANSFER" },
  { text: "O nó B recebe a mensagem.", state: "RECEIVE" },
];

function NetworkExperiment() {
  const [phase, setPhase] = useState(0);
  return (
    <div className="eng-experiment eng-network-exp">
      <div className="eng-experiment-note">EXPERIMENTO 03 / PASSAGEM DE MENSAGEM</div>
      <div className="eng-network-flow">
        <div className={`eng-network-node ${phase >= 1 ? "is-sending" : ""}`}><small>PROCESSO / 01</small><strong>NÓ A</strong><span>emissor</span></div>
        <div className="eng-network-link"><div className="eng-network-track"><span className={`eng-network-packet eng-packet-${phase}`}>MSG</span></div><small>CANAL</small></div>
        <div className={`eng-network-node ${phase === 3 ? "is-received" : ""}`}><small>PROCESSO / 02</small><strong>NÓ B</strong><span>receptor</span></div>
      </div>
      <div className="eng-network-state"><span>ESTADO / {phases[phase].state}</span><p aria-live="polite">{phases[phase].text}</p></div>
      <button type="button" className="eng-advance" onClick={() => setPhase(prev => (prev + 1) % phases.length)}>{phase === 3 ? "REINICIAR SIMULAÇÃO" : "PRÓXIMA ETAPA"} <span aria-hidden="true">→</span></button>
      <p className="eng-experiment-help">Fluxo esquemático de comunicação; não há comunicação de rede real nesta demonstração.</p>
    </div>
  );
}

function GraphicsExperiment() {
  const [angle, setAngle] = useState(35);
  const lines = useMemo(() => {
    const rad = (angle * Math.PI) / 180;
    const vertices = [
      [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
      [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
    ];
    const projected = vertices.map(([x, y, z]) => {
      const rotatedX = x * Math.cos(rad) - z * Math.sin(rad);
      const rotatedZ = x * Math.sin(rad) + z * Math.cos(rad);
      return [180 + (rotatedX - rotatedZ * 0.40) * 54, 106 + (y + rotatedZ * 0.33) * 48];
    });
    return [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]].map(([a,b]) => ({x1:projected[a][0],y1:projected[a][1],x2:projected[b][0],y2:projected[b][1]}));
  }, [angle]);
  return (
    <div className="eng-experiment eng-graphics-exp">
      <div className="eng-experiment-note">EXPERIMENTO 04 / PROJEÇÃO GEOMÉTRICA</div>
      <div className="eng-graphics-canvas">
        <svg viewBox="0 0 360 215" role="img" aria-label={`Representação de um cubo em linhas, rotação ${angle} graus`}>
          <path d="M0 106H360M180 0V215" stroke="currentColor" strokeOpacity=".14" strokeDasharray="3 6" />
          {lines.map((line, index) => <line key={index} {...line} stroke="currentColor" strokeWidth="1.8" />)}
          {lines.flatMap((line, index) => [<circle key={`${index}-a`} cx={line.x1} cy={line.y1} r="2.6" fill="currentColor"/>])}
        </svg>
        <span>WIREFRAME / ORTHOGRAPHIC STUDY</span>
      </div>
      <div className="eng-control-row"><label htmlFor="eng-angle">ROTAÇÃO</label><input id="eng-angle" type="range" min="0" max="180" value={angle} onChange={e=>setAngle(Number(e.target.value))}/><output htmlFor="eng-angle">{angle}°</output></div>
      <p className="eng-experiment-help">Projeção geométrica calculada nesta página para ilustrar transformação espacial, não uma reprodução do repositório.</p>
    </div>
  );
}

function Specimen({ project }: {project: EngineeringProject}) {
  if (project.id === "images") return <ImageExperiment />;
  if (project.id === "umbra") return <MapExperiment />;
  if (project.id === "distributed") return <NetworkExperiment />;
  return <GraphicsExperiment />;
}

export function EngineeringWorld() {
  const [selected, setSelected] = useState(0);
  const project = engineeringProjects[selected];
  return (
    <main className="world engineering-world" id="main-content">
      <header className="eng-hero">
        <div className="eng-hero-meta"><span>PORTFÓLIO / 03</span><span>ESTUDOS DE COMPUTAÇÃO</span><span>FIELD NOTES — VOL. 01</span></div>
        <div className="eng-hero-copy"><h1>WORK IN<br/><em>PROGRESS.</em></h1><p>Uma coleção de sistemas, algoritmos e experimentos. Aqui, a ideia é abrir o processo e entender como as coisas funcionam.</p></div>
      </header>

      <section className="eng-library" aria-label="Explorador de projetos de engenharia">
        <aside className="eng-index">
          <div className="eng-index-heading"><span>ÍNDICE DE ESTUDOS</span><span>0{engineeringProjects.length} ENTRADAS</span></div>
          <div role="group" aria-label="Selecionar experimento">
            {engineeringProjects.map((entry, index) => (
              <button key={entry.id} type="button" onClick={() => setSelected(index)} aria-pressed={selected === index} className={`eng-index-item ${index === selected ? "is-selected" : ""}`}>
                <span>0{index+1}</span><span><strong>{entry.title}</strong><small>{entry.discipline}</small></span><span aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
          <p className="eng-index-note">Cada demonstração representa um conceito; o código completo está disponível no respectivo repositório.</p>
        </aside>
        <div className="eng-sheet" key={project.id}>
          <div className="eng-sheet-number"><span>FICHA TÉCNICA / 0{selected + 1}</span><span>ENG — 0{selected + 1}</span></div>
          <div className="eng-sheet-intro"><span className="eng-discipline">{project.discipline}</span><h2>{project.title}</h2><p>{project.observation}</p></div>
          <div className="eng-sheet-figure"><Specimen project={project}/></div>
          <div className="eng-sheet-description"><div><span className="eng-field-label">SOBRE O PROJETO</span><p>{project.description}</p></div><div><span className="eng-field-label">FERRAMENTAS / TEMAS</span><div className="eng-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div></div>
          <a href={project.href} target="_blank" rel="noopener noreferrer" className="eng-repo-link">EXPLORAR CÓDIGO-FONTE <span aria-hidden="true">↗</span></a>
        </div>
      </section>
      <footer className="eng-outro"><span>FIM DAS NOTAS / 01</span><Link href="/web">Voltar ao mundo WEB <span aria-hidden="true">↗</span></Link></footer>
    </main>
  );
}
