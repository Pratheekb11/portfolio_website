"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { PLAYER } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";

const MESSAGE =
  "Looking for someone who can take a vague problem, talk to the people living with it, and ship the thing that fixes it. That's the job I want. If that's the role you're filling, open a channel.";

/* Token-by-token reveal. Reads the way a good model answers: it arrives,
   it doesn't appear. Skipped entirely under reduced motion. */
function Stream({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const [out, setOut] = useState("");

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOut(text);
      return;
    }
    const tokens = text.split(/(\s+)/);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setOut(tokens.slice(0, i).join(""));
      if (i >= tokens.length) clearInterval(id);
    }, 34);
    return () => clearInterval(id);
  }, [inView, text]);

  return (
    <p ref={ref} className="min-h-[6.5rem] text-[1rem] leading-relaxed sm:text-[1.0625rem]" style={{ color: "var(--hud)" }}>
      {out}
      {out.length < text.length && <span className="blink" style={{ color: "var(--signal)" }}>▍</span>}
    </p>
  );
}

const CHANNELS = [
  { label: "EMAIL", value: PLAYER.email, href: `mailto:${PLAYER.email}`, tint: "var(--signal)" },
  { label: "LINKEDIN", value: "in/bpratheek", href: PLAYER.linkedin, tint: "var(--comms)" },
  { label: "GITHUB", value: "Pratheekb11", href: PLAYER.github, tint: "var(--sand)" },
];

export default function Comms() {
  return (
    <section id="comms" className="relative mx-auto w-full max-w-5xl px-4 py-24 sm:px-8 sm:py-32">
      <SectionHeader index="05" kicker="COMMS" title="OPEN A CHANNEL" />

      <Reveal>
        <div className="panel p-6 sm:p-10">
          <div className="flex items-center gap-2 border-b pb-4" style={{ borderColor: "var(--rail)" }}>
            <span className="block h-1.5 w-1.5 rounded-full blink" style={{ background: "var(--pitch)" }} />
            <span className="t-data text-[0.625rem] tracking-[0.2em]" style={{ color: "var(--ghost)" }}>
              CHANNEL OPEN · {PLAYER.location.toUpperCase()}
            </span>
          </div>

          <div className="mt-6">
            <Stream text={MESSAGE} />
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {CHANNELS.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer noopener"
                className="panel-sm group border p-4 no-underline transition-all duration-200 hover:-translate-y-0.5"
                style={{ borderColor: "var(--rail)", background: "var(--deck-2)" }}
              >
                <div className="t-data text-[0.5625rem] tracking-[0.22em]" style={{ color: c.tint }}>
                  {c.label}
                </div>
                <div className="t-data mt-1.5 truncate text-[0.8125rem]" style={{ color: "var(--hud)" }}>
                  {c.value}
                </div>
              </a>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="/media/Pratheek_B_Resume.pdf"
              target="_blank"
              rel="noreferrer noopener"
              className="panel-sm border px-5 py-3 no-underline"
              style={{ borderColor: "var(--signal)", background: "var(--signal)", color: "var(--void)" }}
            >
              <span className="t-data text-[0.75rem] font-bold tracking-[0.2em]">DOWNLOAD DOSSIER</span>
            </a>
            <span className="t-label" style={{ fontSize: "0.625rem" }}>
              PDF · one page
            </span>
          </div>
        </div>
      </Reveal>

      <footer className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t pt-6" style={{ borderColor: "var(--rail)" }}>
        <span className="t-data text-[0.6875rem]" style={{ color: "var(--rail)" }}>
          BUILT BY {PLAYER.handle} · NEXT.JS
        </span>
        <span className="t-data text-[0.6875rem]" style={{ color: "var(--rail)" }}>
          GG WP
        </span>
      </footer>
    </section>
  );
}
