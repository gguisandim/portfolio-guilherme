"use client";

import { useEffect, useRef, useState } from "react";

type Pattern = "tramas" | "orbitas";

function pseudoRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

const palette = ["#243f37", "#ae5d40", "#d8ad74", "#738f7e", "#d5cbb4"];

export function GenerativePaper() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [seed, setSeed] = useState(11);
  const [density, setDensity] = useState(7);
  const [pattern, setPattern] = useState<Pattern>("tramas");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const width = canvas.width;
    const height = canvas.height;
    const random = pseudoRandom(seed);

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#f1ebdb";
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "rgba(42,66,53,.085)";
    ctx.lineWidth = 1;
    for (let x = 24; x < width; x += 26) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
    }
    for (let y = 24; y < height; y += 26) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
    }

    if (pattern === "tramas") {
      for (let i = 0; i < density * 9; i++) {
        const x = 42 + random() * (width - 84);
        const y = 42 + random() * (height - 84);
        const radius = 16 + random() * 45;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(random() * Math.PI);
        ctx.globalAlpha = .78;
        ctx.strokeStyle = palette[i % palette.length];
        ctx.lineWidth = 1.5 + random() * 2.5;
        for (let j = 0; j < 5; j++) {
          const offset = (j - 2) * 6;
          ctx.beginPath();
          ctx.moveTo(-radius, offset);
          ctx.bezierCurveTo(-radius * .25, offset - radius, radius * .3, offset + radius, radius, offset);
          ctx.stroke();
        }
        if (i % 4 === 0) {
          ctx.fillStyle = palette[(i + 2) % palette.length];
          ctx.beginPath(); ctx.arc(0, 0, radius * .17, 0, Math.PI * 2); ctx.fill();
        }
        ctx.restore();
      }
    } else {
      const centerX = width * .52;
      const centerY = height * .5;
      for (let i = 0; i < density * 4; i++) {
        const rx = 20 + i * 6.8;
        const ry = 14 + i * 4.1;
        ctx.save();
        ctx.translate(centerX + (random() - .5) * 70, centerY + (random() - .5) * 46);
        ctx.rotate(random() * 1.4);
        ctx.strokeStyle = palette[i % palette.length];
        ctx.globalAlpha = .7;
        ctx.lineWidth = 1.3 + (i % 3);
        ctx.beginPath(); ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2); ctx.stroke();
        const theta = random() * Math.PI * 2;
        ctx.fillStyle = palette[(i + 1) % palette.length];
        ctx.beginPath(); ctx.arc(Math.cos(theta) * rx, Math.sin(theta) * ry, 3 + random() * 8, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      }
    }

    ctx.fillStyle = "#516b5b";
    ctx.font = "12px ui-monospace, monospace";
    ctx.fillText(`ESTUDO ${String(seed).padStart(3, "0")} / ${pattern.toUpperCase()}`, 22, height - 18);
  }, [seed, density, pattern]);

  function savePng() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `mural-arte-${seed}.png`;
    link.href = url;
    link.click();
  }

  return (
    <div className="mural-experiment mural-art-experiment">
      <canvas ref={canvasRef} width={640} height={356} aria-label="Composição de formas generativas desenhada em Canvas" />
      <div className="mural-tool-row">
        <div className="mural-segmented" aria-label="Tipo de arte">
          <button type="button" className={pattern === "tramas" ? "is-selected" : ""} aria-pressed={pattern === "tramas"} onClick={() => setPattern("tramas")}>tramas</button>
          <button type="button" className={pattern === "orbitas" ? "is-selected" : ""} aria-pressed={pattern === "orbitas"} onClick={() => setPattern("orbitas")}>órbitas</button>
        </div>
        <label className="mural-range">densidade <input type="range" aria-label="Densidade da arte" min="3" max="12" value={density} onChange={(event) => setDensity(Number(event.target.value))} /></label>
      </div>
      <div className="mural-tool-row mural-tool-actions">
        <button type="button" className="mural-action" onClick={() => setSeed((value) => value + 1)}>nova composição ↗</button>
        <button type="button" className="mural-action is-quiet" onClick={savePng}>salvar PNG ↓</button>
      </div>
    </div>
  );
}
