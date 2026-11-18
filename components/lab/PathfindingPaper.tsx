"use client";

import { useEffect, useRef, useState } from "react";

type Algorithm = "BFS" | "DFS" | "A*";
const ROWS = 9;
const COLS = 13;
const START = 1 * COLS + 1;
const END = 7 * COLS + 11;

const initialWalls = [
  [1, 4], [2, 4], [3, 4], [4, 4], [6, 4],
  [2, 7], [3, 7], [4, 7], [5, 7], [6, 7],
  [3, 10], [4, 10], [5, 10], [6, 10],
  [5, 2], [5, 3], [7, 8], [7, 9],
].map(([row, col]) => row * COLS + col);

function solve(walls: Set<number>, algorithm: Algorithm) {
  const parent = new Map<number, number>();
  const discovered = new Set<number>([START]);
  const bestCost = new Map<number, number>([[START, 0]]);
  const processed = new Set<number>();
  const order: number[] = [];
  const heuristic = (index: number) => Math.abs(Math.floor(index / COLS) - Math.floor(END / COLS)) + Math.abs(index % COLS - END % COLS);
  const fringe: Array<{ node: number; cost: number }> = [{ node: START, cost: 0 }];

  while (fringe.length) {
    if (algorithm === "A*") fringe.sort((a, b) => (b.cost + heuristic(b.node)) - (a.cost + heuristic(a.node)));
    const item = algorithm === "BFS" ? fringe.shift()! : fringe.pop()!;
    const node = item.node;
    if (processed.has(node)) continue;
    processed.add(node);
    order.push(node);
    if (node === END) break;
    const row = Math.floor(node / COLS);
    const col = node % COLS;
    const neighbors = [[row - 1, col], [row, col + 1], [row + 1, col], [row, col - 1]];

    for (const [r, c] of neighbors) {
      if (r < 0 || c < 0 || r >= ROWS || c >= COLS) continue;
      const next = r * COLS + c;
      if (walls.has(next) || processed.has(next)) continue;
      const candidate = item.cost + 1;
      if (algorithm === "A*") {
        if (candidate >= (bestCost.get(next) ?? Infinity)) continue;
        bestCost.set(next, candidate);
      } else {
        if (discovered.has(next)) continue;
        discovered.add(next);
      }
      parent.set(next, node);
      fringe.push({ node: next, cost: candidate });
    }
  }

  const path: number[] = [];
  if (processed.has(END)) {
    let current = END;
    path.push(current);
    while (current !== START) {
      const previous = parent.get(current);
      if (previous === undefined) break;
      current = previous;
      path.push(current);
    }
    path.reverse();
  }
  return { order, path };
}

export function PathfindingPaper() {
  const [algorithm, setAlgorithm] = useState<Algorithm>("BFS");
  const [walls, setWalls] = useState<Set<number>>(() => new Set(initialWalls));
  const [visited, setVisited] = useState<Set<number>>(new Set());
  const [route, setRoute] = useState<Set<number>>(new Set());
  const [status, setStatus] = useState("selecione um algoritmo e execute");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function stop() {
    if (timerRef.current !== null) clearInterval(timerRef.current);
    timerRef.current = null;
  }

  useEffect(() => () => {
    if (timerRef.current !== null) clearInterval(timerRef.current);
  }, []);

  function resetVisualization() {
    stop();
    setVisited(new Set());
    setRoute(new Set());
    setStatus("selecione um algoritmo e execute");
  }

  function toggleCell(index: number) {
    if (index === START || index === END) return;
    resetVisualization();
    setWalls((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  function execute() {
    resetVisualization();
    const result = solve(walls, algorithm);
    const total = result.order.length + result.path.length;
    const summary = result.path.length ? `${result.order.length} células exploradas · rota com ${result.path.length - 1} passos` : "nenhum caminho encontrado";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisited(new Set(result.order));
      setRoute(new Set(result.path));
      setStatus(summary);
      return;
    }
    let frame = 0;
    setStatus(`executando ${algorithm.toLowerCase()}...`);
    timerRef.current = setInterval(() => {
      frame += 1;
      if (frame <= result.order.length) {
        setVisited(new Set(result.order.slice(0, frame)));
      } else {
        setRoute(new Set(result.path.slice(0, frame - result.order.length)));
      }
      if (frame >= total) {
        stop();
        setStatus(summary);
      }
    }, 27);
  }

  return (
    <div className="mural-experiment mural-path-experiment">
      <div className="mural-tool-row">
        <div className="mural-segmented" aria-label="Algoritmo de busca">
          {(["BFS", "DFS", "A*"] as Algorithm[]).map((name) => (
            <button key={name} type="button" aria-pressed={algorithm === name} className={algorithm === name ? "is-selected" : ""}
              onClick={() => { resetVisualization(); setAlgorithm(name); }}>{name}</button>
          ))}
        </div>
        <span className="mural-hint">clique nas células para criar paredes</span>
      </div>
      <div className="mural-path-grid" role="group" aria-label="Labirinto editável">
        {Array.from({ length: ROWS * COLS }, (_, index) => {
          const row = Math.floor(index / COLS) + 1;
          const col = index % COLS + 1;
          const kind = index === START ? "start" : index === END ? "end" : walls.has(index) ? "wall" : route.has(index) ? "route" : visited.has(index) ? "visited" : "empty";
          return <button key={index} type="button" className={`mural-path-cell is-${kind}`}
            aria-label={`Linha ${row}, coluna ${col}: ${kind === "wall" ? "parede" : kind === "start" ? "início" : kind === "end" ? "destino" : kind === "route" ? "caminho" : kind === "visited" ? "explorada" : "livre"}`}
            aria-pressed={kind === "wall"} disabled={index === START || index === END} onClick={() => toggleCell(index)} />;
        })}
      </div>
      <div className="mural-tool-row mural-tool-actions">
        <button type="button" className="mural-action" onClick={execute}>executar busca →</button>
        <button type="button" className="mural-action is-quiet" onClick={() => { resetVisualization(); setWalls(new Set(initialWalls)); }}>reiniciar mapa</button>
      </div>
      <p className="mural-experiment-status" role="status" aria-live="polite">{status}</p>
    </div>
  );
}
