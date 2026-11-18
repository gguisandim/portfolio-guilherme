"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { engineeringProjects, type EngineeringProject } from "@/data/projects";

/** Images are illustrative studies from the approved design reference, not outputs from the linked repository. */
function ImageExperiment() {
  const [amount, setAmount] = useState(65);
  return (
    <div className="eng-experiment eng-images">
      <div className="eng-experiment-note"><span>01 / VISÃO COMPUTACIONAL</span><span>ESTUDO DE IMAGEM</span></div>
      <div className="eng-image-pair">
        <figure>
          <div className="eng-image-viewport">
            <Image src="/engineering/leaf-original.webp" alt="Textura e nervuras de uma folha alaranjada" fill sizes="(max-width: 650px) 45vw, (max-width: 1180px) 30vw, 24vw" />
          </div>
          <figcaption><span className="eng-caption-dot" />01 / AMOSTRA</figcaption>
        </figure>
        <figure>
          <div className="eng-image-viewport">
            <Image src="/engineering/leaf-edges.webp" alt="Interpretação visual em preto e branco das nervuras de uma folha" fill sizes="(max-width: 650px) 45vw, (max-width: 1180px) 30vw, 24vw" style={{ filter: `contrast(${0.7 + amount / 100})` }} />
          </div>
          <figcaption><span className="eng-caption-dot" />02 / ESTUDO DE BORDAS</figcaption>
        </figure>
      </div>
      <div className="eng-process-line" aria-hidden="true"><span>ENTRADA</span><b>→</b><span>TRANSFORMAÇÃO</span><b>→</b><span>SAÍDA</span></div>
      <div className="eng-control-row">
        <label htmlFor="eng-contrast">CONTRASTE DA SAÍDA</label>
        <input id="eng-contrast" type="range" min="0" max="100" value={amount} onChange={e => setAmount(Number(e.target.value))} />
        <output htmlFor="eng-contrast">{amount}%</output>
      </div>
      <p className="eng-experiment-help">Estudo visual ilustrativo, não é uma execução do algoritmo do repositório. O controle ajusta o contraste da imagem de saída.</p>
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

function StudyIcon({ id }: { id: EngineeringProject["id"] }) {
  if (id === "images") return (
    <svg viewBox="0 0 76 68" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.15">
      <path d="M9 54C11 30 32 14 65 8c-2 29-25 49-56 46Z" />
      <path d="M8 60C27 42 41 28 64 9M27 43l-4-16M27 43l20 1M42 28l-2-12M42 28l15-2" />
      <path d="M7 62h25" strokeDasharray="2 3" />
    </svg>
  );
  if (id === "umbra") return (
    <svg viewBox="0 0 76 68" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.15">
      <path d="M4 56 31 10 44 28 53 16 74 56ZM31 10l5 31 8-13M53 16l-6 28M4 56l25-10 16 10 29 0" />
      <path d="M16 56c14-5 25-7 40-6" strokeDasharray="2 4" />
    </svg>
  );
  if (id === "distributed") return (
    <svg viewBox="0 0 76 68" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.15">
      <path d="M12 16 37 7 61 20 65 49 35 60 10 44 12 16M12 16l23 24 26-20M35 40l30 9M35 40v20M10 44l25-4M37 7l-2 33" />
      {[[12,16],[37,7],[61,20],[65,49],[35,60],[10,44],[35,40]].map(([cx,cy],i)=><circle key={i} cx={cx} cy={cy} r="3.3" fill="currentColor" stroke="none" />)}
    </svg>
  );
  return (
    <svg viewBox="0 0 76 68" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.15">
      <path d="M12 17 40 5 65 21 37 35 12 17ZM12 17v32l25 15V35M37 64l28-17V21M12 49l27-15M65 47 39 33" />
      <path d="M12 17 37 35 65 21M40 5l-3 30" strokeDasharray="3 3" />
    </svg>
  );
}

function HeroEngraving() {
  return (
    <svg className="eng-hero-engraving" viewBox="0 0 360 260" aria-hidden="true" fill="none" stroke="currentColor">
      <path d="M28 208C62 105 196 28 319 22c-7 111-110 229-291 186Z" strokeWidth="1.7" />
      <path d="M20 240C106 156 205 74 319 22" strokeWidth="1.9" />
      {Array.from({length:9},(_,i)=>{
        const x=63+i*25;
        const y=194-i*18;
        return <path key={i} d={`M${x} ${y} Q${x+14} ${y-42} ${x+9} ${Math.max(30,y-71)} M${x} ${y} Q${x-39} ${y-12} ${Math.max(27,x-65)} ${y-32}`} strokeWidth="1" opacity=".68" />;
      })}
    </svg>
  );
}

export function EngineeringWorld() {
  const [selected, setSelected] = useState(0);
  const project = engineeringProjects[selected];
  const changeProject = (direction: number) => setSelected(current => (current + direction + engineeringProjects.length) % engineeringProjects.length);
  return (
    <main className="world engineering-world" id="main-content">
      <header className="eng-hero">
        <div className="eng-hero-meta"><span>PORTFÓLIO / 03 — ENGENHARIA</span><span>FIELD NOTES / VOL. 01</span></div>
        <div className="eng-hero-copy">
          <div className="eng-hero-titles">
            <h1>ENGINEERING</h1>
            <p className="eng-hero-subtitle">Caderno de processos</p>
          </div>
          <p className="eng-hero-description">Uma coleção de sistemas, algoritmos e experimentos. Aqui, a ideia é abrir o processo e entender como as coisas funcionam — da concepção à implementação.</p>
          <HeroEngraving />
        </div>
      </header>

      <section className="eng-library" aria-label="Explorador de projetos de engenharia">
        <aside className="eng-index">
          <div className="eng-index-heading"><span>ÍNDICE DE ESTUDOS</span><span>0{engineeringProjects.length} ENTRADAS</span></div>
          <div className="eng-index-list" role="group" aria-label="Selecionar experimento">
            {engineeringProjects.map((entry, index) => (
              <button key={entry.id} type="button" onClick={() => setSelected(index)} aria-pressed={selected === index} className={`eng-index-item ${index === selected ? "is-selected" : ""}`}>
                <span className="eng-index-icon"><StudyIcon id={entry.id} /></span>
                <span className="eng-index-number">0{index + 1}</span>
                <span className="eng-index-text"><strong>{entry.title}</strong><small>{entry.discipline}</small></span>
                <span className="eng-index-arrow" aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
          <p className="eng-index-note"><span aria-hidden="true">＋</span> Cada demonstração representa um conceito com código acessível no respectivo repositório.</p>
        </aside>

        <div className="eng-sheet" key={project.id}>
          <div className="eng-sheet-number"><span>EXPERIMENTO 0{selected + 1} / {project.discipline.toUpperCase()}</span><span>ENG — 0{selected + 1}</span></div>
          <div className="eng-sheet-main">
            <div className="eng-sheet-figure"><Specimen project={project} /></div>
            <div className="eng-sheet-caption"><span>FIG. 0{selected + 1} — NOTAS VISUAIS / {project.discipline.toUpperCase()}</span><span>ESTUDO INTERATIVO</span></div>
          </div>
          <div className="eng-sheet-aside">
            <div className="eng-sheet-intro">
              <span className="eng-side-count">0{selected + 1} / <small>0{engineeringProjects.length}</small></span>
              <h2>{project.title}</h2>
              <p className="eng-observation">{project.observation}</p>
              <p className="eng-description">{project.description}</p>
            </div>
            <div className="eng-sheet-info">
              <span className="eng-field-label">FERRAMENTAS / TEMAS</span>
              <div className="eng-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
            </div>
            <a href={project.href} target="_blank" rel="noopener noreferrer" className="eng-repo-link">EXPLORAR CÓDIGO-FONTE <span aria-hidden="true">↗</span></a>
          </div>
          <div className="eng-sheet-navigation">
            <span>CADERNO DE ESTUDOS — 2026</span>
            <div className="eng-nav-controls">
              <button type="button" onClick={() => changeProject(-1)} aria-label="Experimento anterior">← <span>ANTERIOR</span></button>
              <button type="button" onClick={() => changeProject(1)} aria-label="Próximo experimento"><span>PRÓXIMO</span> →</button>
            </div>
          </div>
        </div>
      </section>
      <footer className="eng-outro"><span>FIM DAS NOTAS / 01</span><Link href="/web">Explorar o mundo WEB <span aria-hidden="true">↗</span></Link></footer>
    </main>
  );
}
