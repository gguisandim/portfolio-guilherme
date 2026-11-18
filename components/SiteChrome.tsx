"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useEffect, useRef } from "react";
import gsap from "gsap";

const links = [
  ["/", "Home"],
  ["/web", "Web"],
  ["/apps", "Apps"],
  ["/engineering", "Engineering"],
  ["/lab", "Lab"],
  ["/about", "About"]
] as const;

export function SiteChrome({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const wipeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wipe = wipeRef.current;
    if (!wipe) return;
    gsap.fromTo(
      wipe,
      { scaleY: 1, transformOrigin: "top" },
      { scaleY: 0, duration: 0.65, ease: "power4.inOut" }
    );
  }, [pathname]);

  return (
    <>
      <div ref={wipeRef} className="route-wipe" />
      <header className="global-nav">
        <Link href="/" className="global-brand">
          <Image src="/avatar.png" alt="" width={38} height={38} priority />
          <span>Guilherme Sandim</span>
        </Link>

        <nav aria-label="Navegação principal">
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className={pathname === href ? "active" : ""}
            >
              {label}
            </Link>
          ))}
        </nav>
      </header>
      {children}
    </>
  );
}
