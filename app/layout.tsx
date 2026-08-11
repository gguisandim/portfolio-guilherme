import type { Metadata } from "next";
import "./globals.css";
import { SiteChrome } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Guilherme Sandim — Portfolio",
  description: "Portfólio interativo dividido entre Web, Dados e Systems."
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
