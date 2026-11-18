"use client";

import { useMemo, useState } from "react";

type NodeName = "A" | "B" | "C" | "D" | "E" | "F";
const positions: Record<NodeName, { x: number; y: number; label: string }> = {
  A: { x: 40, y: 128, label: "origem" },
  B: { x: 138, y: 47, label: "B" },
  C: { x: 138, y: 205, label: "C" },
  D: { x: 278, y: 53, label: "D" },
  E: { x: 278, y: 207, label: "E" },
  F: { x: 383, y: 128, label: "destino" },
};
const edges: Array<{ a: NodeName; b: NodeName; cost: number }> = [
  { a: "A", b: "B", cost: 4 },
  { a: "A", b: "C", cost: 3 },
  { a: "B", b: "C", cost: 3 },
  { a: "B", b: "D", cost: 3 },
  { a: "B", b: "E", cost: 7 },
  { a: "C", b: "E", cost: 3 },
  { a: "D", b: "E", cost: 2 },
  { a: "D", b: "F", cost: 4 },
  { a: "E", b: "F", cost: 5 },
];
const togglable: NodeName[] = ["B", "C", "D", "E"];

function findRoute(offline: Set<NodeName>) {
  const costs = new Map<NodeName, number>();
  const previous = new Map<NodeName, NodeName>();
  const visited = new Set<NodeName>();
  (Object.keys(positions) as NodeName[]).forEach((id) => costs.set(id, Infinity));
  costs.set("A", 0);

  while (visited.size < 6) {
    const current = (Object.keys(positions) as NodeName[])
      .filter((id) => !visited.has(id) && !offline.has(id))
      .sort((a, b) => (costs.get(a) ?? Infinity) - (costs.get(b) ?? Infinity))[0];
    if (!current || !Number.isFinite(costs.get(current))) break;
    visited.add(current);
    if (current === "F") break;
    for (const edge of edges) {
      const neighbor = edge.a === current ? edge.b : edge.b === current ? edge.a : null;
      if (!neighbor || visited.has(neighbor) || offline.has(neighbor)) continue;
      const candidate = (costs.get(current) ?? Infinity) + edge.cost;
      if (candidate < (costs.get(neighbor) ?? Infinity)) {
        costs.set(neighbor, candidate);
        previous.set(neighbor, current);
      }
    }
  }

  if (!Number.isFinite(costs.get("F"))) return { path: [] as NodeName[], cost: 0 };
  const path: NodeName[] = ["F"];
  let cursor: NodeName = "F";
  while (cursor !== "A") {
    const parent = previous.get(cursor);
    if (!parent) return { path: [] as NodeName[], cost: 0 };
    path.unshift(parent);
    cursor = parent;
  }
  return { path, cost: costs.get("F") ?? 0 };
}

export function NetworkPaper() {
  const [offline, setOffline] = useState<Set<NodeName>>(new Set(["D"]));
  const route = useMemo(() => findRoute(offline), [offline]);
  const activeEdges = new Set<string>();
  for (let index = 0; index < route.path.length - 1; index++) {
    activeEdges.add([route.path[index], route.path[index + 1]].sort().join(""));
  }

  function toggle(id: NodeName) {
    if (id === "A" || id === "F") return;
    setOffline((current) => {
      const copy = new Set(current);
      if (copy.has(id)) copy.delete(id);
      else copy.add(id);
      return copy;
    });
  }

  return (
    <div className="mural-experiment mural-network-experiment">
      <svg viewBox="0 0 423 260" className="mural-network-svg" role="img" aria-label="Rede fictícia com seis nós. Nós intermediários podem ser desligados nos controles abaixo.">
        <defs>
          <pattern id="muralNetworkGrid" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M16 0 H0 V16" fill="none" stroke="#d9d5c8" strokeWidth=".8" />
          </pattern>
        </defs>
        <rect width="423" height="260" fill="url(#muralNetworkGrid)" />
        {edges.map(({ a, b, cost }) => {
          const active = activeEdges.has([a, b].sort().join(""));
          const blocked = offline.has(a) || offline.has(b);
          return (
            <g key={`${a}-${b}`}>
              <line x1={positions[a].x} y1={positions[a].y} x2={positions[b].x} y2={positions[b].y}
                className={`mural-network-edge ${active ? "is-active" : blocked ? "is-offline" : ""}`} />
              <text className="mural-network-cost" x={(positions[a].x + positions[b].x) / 2} y={(positions[a].y + positions[b].y) / 2 - 7}>{cost}</text>
            </g>
          );
        })}
        {(Object.keys(positions) as NodeName[]).map((id) => (
          <g key={id} className={`mural-network-node ${offline.has(id) ? "is-offline" : ""} ${id === "A" || id === "F" ? "is-fixed" : ""}`}>
            <circle cx={positions[id].x} cy={positions[id].y} r="21" />
            <text x={positions[id].x} y={positions[id].y + 6} textAnchor="middle">{id}</text>
          </g>
        ))}
      </svg>
      <div className="mural-network-toggles" aria-label="Alternar nós da rede">
        {togglable.map((id) => (
          <button key={id} type="button" className={offline.has(id) ? "is-offline" : ""}
            aria-pressed={!offline.has(id)} onClick={() => toggle(id)}>
            <span className="mural-node-led" /> nó {id} {offline.has(id) ? "off" : "on"}
          </button>
        ))}
      </div>
      <div className="mural-tool-row mural-tool-actions">
        <span className="mural-network-route" aria-live="polite">{route.path.length ? `${route.path.join(" → ")} · custo ${route.cost}` : "sem rota disponível"}</span>
        <button type="button" className="mural-action is-quiet" onClick={() => setOffline(new Set(["D"]))}>reiniciar</button>
      </div>
      <p className="mural-experiment-status">Modelo fictício · roteamento pelo menor custo (Dijkstra)</p>
    </div>
  );
}
