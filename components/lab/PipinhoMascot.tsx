"use client";

import { useEffect, useRef, useState } from "react";

type Operation = "+" | "−" | "×" | "÷";
type CalculatorState = {
  display: string;
  previous: number | null;
  operation: Operation | null;
  replace: boolean;
};

const initial: CalculatorState = { display: "0", previous: null, operation: null, replace: true };
const keys = ["AC", "±", "%", "÷", "7", "8", "9", "×", "4", "5", "6", "−", "1", "2", "3", "+", "0", ",", "⌫", "="];

function operationResult(a: number, b: number, op: Operation) {
  switch (op) {
    case "+": return a + b;
    case "−": return a - b;
    case "×": return a * b;
    case "÷": return b === 0 ? NaN : a / b;
  }
}

function formatNumber(value: number) {
  if (!Number.isFinite(value)) return "Erro";
  return String(Number(value.toPrecision(10)));
}

function applyKey(state: CalculatorState, key: string): CalculatorState {
  const { display, previous, operation } = state;
  if (key === "AC") return initial;
  if (/^\d$/.test(key)) {
    const next = state.replace || display === "Erro" ? key : display === "0" ? key : (display + key).slice(0, 14);
    return { ...state, display: next, replace: false };
  }
  if (key === ",") {
    if (state.replace || display === "Erro") return { ...state, display: "0.", replace: false };
    return display.includes(".") ? state : { ...state, display: `${display}.`, replace: false };
  }
  if (key === "⌫") {
    return { ...state, display: state.replace || display.length < 2 ? "0" : display.slice(0, -1), replace: false };
  }
  if (key === "±") return { ...state, display: formatNumber(-(Number(display) || 0)) };
  if (key === "%") return { ...state, display: formatNumber((Number(display) || 0) / 100) };
  if (key === "=") {
    if (previous === null || !operation || display === "Erro") return state;
    return { display: formatNumber(operationResult(previous, Number(display), operation)), previous: null, operation: null, replace: true };
  }
  if (["+", "−", "×", "÷"].includes(key)) {
    if (display === "Erro") return initial;
    if (previous !== null && operation && !state.replace) {
      const computed = operationResult(previous, Number(display), operation);
      return { display: formatNumber(computed), previous: computed, operation: key as Operation, replace: true };
    }
    return { ...state, previous: previous === null ? Number(display) : previous, operation: key as Operation, replace: true };
  }
  return state;
}

export function PipinhoMascot() {
  const figureRef = useRef<HTMLButtonElement>(null);
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [calculation, setCalculation] = useState<CalculatorState>(initial);
  const press = (key: string) => setCalculation((current) => applyKey(current, key));

  useEffect(() => {
    const figure = figureRef.current;
    if (!figure) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    function move(event: PointerEvent) {
      if (!figure || event.pointerType === "touch") return;
      const bounds = figure.getBoundingClientRect();
      const dx = event.clientX - (bounds.left + bounds.width / 2);
      const dy = event.clientY - (bounds.top + bounds.height / 2);
      const distance = Math.hypot(dx, dy);
      const clamp = (n: number, limit: number) => Math.max(-limit, Math.min(limit, n));
      figure.style.setProperty("--pip-eyes-x", `${clamp(dx / 35, 4)}px`);
      figure.style.setProperty("--pip-eyes-y", `${clamp(dy / 35, 4)}px`);
      const attraction = Math.max(0, 1 - distance / 330);
      figure.style.setProperty("--pip-hop-x", `${clamp(dx / 10, 23) * attraction}px`);
      figure.style.setProperty("--pip-hop-y", `${clamp(dy / 11, 18) * attraction}px`);
      figure.style.setProperty("--pip-tilt", `${clamp(dx / 65, 8) * attraction}deg`);
    }
    const reset = () => {
      figure.style.setProperty("--pip-eyes-x", "0px");
      figure.style.setProperty("--pip-eyes-y", "0px");
      figure.style.setProperty("--pip-hop-x", "0px");
      figure.style.setProperty("--pip-hop-y", "0px");
      figure.style.setProperty("--pip-tilt", "0deg");
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("blur", reset);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("blur", reset);
    };
  }, []);

  useEffect(() => {
    if (!calculatorOpen) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setCalculatorOpen(false);
        figureRef.current?.focus();
        return;
      }
      const target = event.target;
      if (target instanceof HTMLElement && target.closest("input,textarea,[contenteditable='true']")) return;
      let key: string | null = null;
      if (/^\d$/.test(event.key)) key = event.key;
      else if (event.key === "." || event.key === ",") key = ",";
      else if (event.key === "+") key = "+";
      else if (event.key === "-") key = "−";
      else if (event.key === "*") key = "×";
      else if (event.key === "/") key = "÷";
      else if (event.key === "=" || event.key === "Enter") key = "=";
      else if (event.key === "Backspace") key = "⌫";
      if (key) { event.preventDefault(); setCalculation((current) => applyKey(current, key)); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [calculatorOpen]);

  return (
    <aside className={`pipinho-corner ${calculatorOpen ? "is-open" : ""}`} aria-label="Pipinho, calculadora interativa">
      {calculatorOpen && (
        <section className="pipinho-calculator" aria-label="Calculadora do Pipinho">
          <div className="pipinho-calculator-header">
            <div><span>EXPERIMENTO 04</span><strong>PIPINHO / CALC</strong></div>
            <button type="button" onClick={() => setCalculatorOpen(false)} aria-label="Fechar calculadora">×</button>
          </div>
          <output className="pipinho-display" aria-live="polite">{calculation.display.replace(".", ",")}</output>
          <div className="pipinho-keyboard">
            {keys.map((key) => <button key={key} type="button"
              className={`${["+", "−", "×", "÷", "="].includes(key) ? "is-operation" : ""} ${key === "=" ? "is-equals" : ""}`}
              onClick={() => press(key)}>{key}</button>)}
          </div>
          <a href="https://github.com/gguisandim/pipinho-financial" target="_blank" rel="noreferrer">conheça o Pipinho Finance ↗</a>
        </section>
      )}
      <button ref={figureRef} type="button" className="pipinho-mascot" onClick={() => setCalculatorOpen((value) => !value)}
        aria-expanded={calculatorOpen} aria-label={calculatorOpen ? "Fechar calculadora do Pipinho" : "Abrir calculadora do Pipinho"} title="Pipinho — clique para calcular">
        <span className="pipinho-tail" aria-hidden="true" />
        <span className="pipinho-cat-ear is-left" aria-hidden="true" />
        <span className="pipinho-cat-ear is-right" aria-hidden="true" />
        <span className="pipinho-cat-head" aria-hidden="true">
          <span className="pipinho-cat-eyes"><i /><i /></span>
          <span className="pipinho-cat-nose" />
          <span className="pipinho-cat-whisker is-left" />
          <span className="pipinho-cat-whisker is-right" />
        </span>
        <span className="pipinho-cat-body" aria-hidden="true">
          <span className="pipinho-cat-screen">R$  /  =</span>
          <span className="pipinho-cat-buttons">▪ ▪ ▪</span>
        </span>
        <span className="pipinho-sticker">pipinho.exe</span>
      </button>
    </aside>
  );
}
