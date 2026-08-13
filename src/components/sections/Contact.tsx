"use client";

import { useState } from "react";
import { PLAYER } from "@/lib/data";
import { asset } from "@/lib/asset";
import IndexRow from "@/components/ui/IndexRow";
import Scramble from "@/components/ui/Scramble";

const LINKS = [
  { label: "EMAIL", value: PLAYER.email, href: `mailto:${PLAYER.email}` },
  { label: "LINKEDIN", value: "in/bpratheek", href: PLAYER.linkedin },
  { label: "GITHUB", value: "Pratheekb11", href: PLAYER.github },
  { label: "RESUME", value: "One page, PDF", href: asset("/media/Pratheek_B_Resume.pdf") },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async (e: React.MouseEvent) => {
    if (!navigator.clipboard) return; // let the mailto through
    // on a phone, tapping EMAIL should open the mail app; copying is a
    // desktop convenience where there may be no mail client at all
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    e.preventDefault();
    await navigator.clipboard.writeText(PLAYER.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section id="contact" className="relative w-full pt-14 sm:pt-28">
      <div className="shell">
        <IndexRow n="05" right="FOUR WAYS IN" />

        <h2
          className="d mt-8 text-[clamp(2.75rem,15vw,13rem)] sm:mt-14"
          style={{ color: "var(--bone)" }}
        >
          <Scramble text="SAY" speed={60} />
          <span style={{ color: "var(--blaze)" }}>
            {" "}
            <Scramble text="HELLO." speed={60} />
          </span>
        </h2>

        <p
          className="mt-6 max-w-xl text-[1rem] leading-relaxed sm:mt-8"
          style={{ color: "var(--ash)" }}
        >
          Email is the fastest way to reach me. I read everything.
        </p>

        <ul className="mt-9 space-y-3 sm:mt-12">
          {LINKS.map((l) => (
            <li key={l.label} className="card card-invert overflow-hidden">
              <a
                href={l.href}
                target={l.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer noopener"
                onClick={l.label === "EMAIL" ? copyEmail : undefined}
                className="group flex items-center justify-between gap-4 px-5 py-4 no-underline sm:gap-6 sm:px-8 sm:py-6"
              >
                {/* on a phone the value goes under the label instead of
                    disappearing, so the address is actually readable */}
                <span className="min-w-0">
                  <span className="d block text-[clamp(1.375rem,7vw,3.25rem)]" style={{ color: "var(--c-title)" }}>
                    {l.label}
                  </span>
                  <span
                    className="mono mt-1 block truncate text-[0.75rem] sm:hidden"
                    style={{ color: "var(--c-body)" }}
                  >
                    {l.label === "EMAIL" && copied ? "Copied to clipboard" : l.value}
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-5">
                  <span className="mono hidden text-[0.8125rem] sm:inline" style={{ color: "var(--c-body)" }}>
                    {l.label === "EMAIL" && copied ? "Copied to clipboard" : l.value}
                  </span>
                  <span
                    className="mono text-[1.125rem] transition-transform duration-300 group-hover:translate-x-1"
                    style={{ color: "var(--c-accent)" }}
                  >
                    {l.label === "EMAIL" ? (copied ? "✓" : "⧉") : "→"}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center justify-between gap-2 py-8">
          <span className="meta">BUILT BY PRATHEEK B · NEXT.JS · 2026</span>
          <span className="meta">BENGALURU, INDIA</span>
        </div>
      </div>
    </section>
  );
}
