"use client";

import { useEffect, useId, useRef, type RefObject } from "react";

type ProjectReadingDialogProps = {
  open: boolean;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLElement | null>;
  variant: "museum" | "engineering";
  indexLabel: string;
  eyebrow: string;
  title: string;
  lead: string;
  paragraphs: string[];
  tags: string[];
  href?: string;
};

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export function ProjectReadingDialog({
  open,
  onClose,
  returnFocusRef,
  variant,
  indexLabel,
  eyebrow,
  title,
  lead,
  paragraphs,
  tags,
  href,
}: ProjectReadingDialogProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const closeHandlerRef = useRef(onClose);

  useEffect(() => {
    closeHandlerRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeHandlerRef.current();
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      window.requestAnimationFrame(() => returnFocusRef.current?.focus());
    };
  }, [open, returnFocusRef]);

  if (!open) return null;

  return (
    <div
      className={`project-reading-overlay ${variant}-reading`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        ref={dialogRef}
        className="project-reading-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="project-reading-toolbar">
          <span>{indexLabel}</span>
          <button ref={closeButtonRef} type="button" onClick={onClose}>
            Fechar <span aria-hidden="true">×</span>
          </button>
        </div>

        <div className="project-reading-layout">
          <aside className="project-reading-meta" aria-label="Ficha do projeto">
            <span className="project-reading-index">{indexLabel}</span>
            <p>{eyebrow}</p>
            <div className="project-reading-tags" aria-label="Tecnologias e temas">
              {tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            {href && (
              <a href={href} target="_blank" rel="noopener noreferrer">
                Consultar código-fonte <span aria-hidden="true">↗</span>
              </a>
            )}
          </aside>

          <article className="project-reading-article">
            <header>
              <span>{eyebrow}</span>
              <h2 id={titleId}>{title}</h2>
              <p>{lead}</p>
            </header>
            <div className="project-reading-copy">
              {paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </div>
            <footer>
              <span>Fim da leitura</span>
              <button type="button" onClick={onClose}>
                Fechar e voltar ao projeto <span aria-hidden="true">↑</span>
              </button>
            </footer>
          </article>
        </div>
      </section>
    </div>
  );
}
