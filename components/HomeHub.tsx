"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const worlds = [
  { href: "/web", label: "WEB", note: "interfaces / visual", className: "hub-web" },
  { href: "/apps", label: "APPS", note: "products / software", className: "hub-apps" },
  { href: "/engineering", label: "ENGINEERING", note: "code / experiments", className: "hub-engineering" }
];

export function HomeHub() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from(".home-word span", {
        yPercent: 120,
        opacity: 0,
        stagger: 0.08,
        duration: 1,
        ease: "power4.out"
      });
      gsap.from(".hub-orbit", {
        scale: 0.6,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: "back.out(1.5)",
        delay: 0.3
      });

      const avatar = el.querySelector(".hub-avatar");
      const move = (event: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        gsap.to(avatar, {
          x: x * 22,
          y: y * 18,
          rotate: x * 2,
          duration: 0.5,
          ease: "power3.out"
        });
      };
      el.addEventListener("pointermove", move);
      return () => el.removeEventListener("pointermove", move);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={root} className="home-hub">
      <section className="home-copy">
        <div className="home-word">
          <span>GUILHERME</span>
          <span>SANDIM</span>
        </div>
        <p className="home-subtitle">web · apps · engineering</p>
        <div className="home-small-links">
          <Link href="/about">about.txt</Link>
          <a href="https://github.com/gguisandim" target="_blank" rel="noreferrer">
            github ↗
          </a>
        </div>
      </section>

      <section className="hub-stage" aria-label="Escolha uma área">
        <div className="hub-avatar-wrap">
          <div className="hub-avatar-halo" />
          <Image
            className="hub-avatar"
            src="/avatar.png"
            alt="Ilustração de Guilherme"
            width={430}
            height={430}
            priority
          />
        </div>

        {worlds.map((world) => (
          <Link key={world.href} href={world.href} className={`hub-orbit ${world.className}`}>
            <span>{world.label}</span>
            <small>{world.note}</small>
          </Link>
        ))}

        <Link href="/lab" className="hub-lab">
          LAB.EXE ↗
        </Link>
      </section>
    </main>
  );
}
