import type { Metadata } from "next";
import { Archivo, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "600", "800", "900"],
});

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Pratheek B, AI Engineer",
  description:
    "AI engineer building production agentic systems across 10 OEM programs. Multi-agent SDLC, RAG at scale, and an out-of-home ad marketplace built solo.",
  openGraph: {
    title: "Pratheek B, AI Engineer",
    description: "Production agentic AI. 250+ developers served. Built solo, shipped for real.",
    type: "profile",
  },
};

export const viewport = { themeColor: "#0B0B0C" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${grotesk.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
