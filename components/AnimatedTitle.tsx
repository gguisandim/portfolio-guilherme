"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export function AnimatedTitle({
  lines,
  className = ""
}: {
  lines: string[];
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from(".title-line", {
        yPercent: 110,
        rotate: 2,
        opacity: 0,
        stagger: 0.08,
        duration: 0.95,
        ease: "power4.out"
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <h1 ref={ref} className={className}>
      {lines.map((line) => (
        <span className="title-mask" key={line}>
          <span className="title-line">{line}</span>
        </span>
      ))}
    </h1>
  );
}
