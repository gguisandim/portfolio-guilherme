import type { Metadata } from "next";
import "./globals.css";
import { SiteChrome } from "@/components/SiteChrome";

export const metadata: Metadata = {
  metadataBase: new URL("https://guilherme-sandim.vercel.app"),
  title: "Guilherme Sandim — Portfolio",
  description: "Portfólio interativo com projetos Web, aplicações e experimentos de engenharia.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Guilherme Sandim — Portfólio",
    description: "Projetos Web, aplicações e experimentos de engenharia.",
    images: ["/og.png"]
  }
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
