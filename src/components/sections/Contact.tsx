"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { PLAYER } from "@/lib/data";
import IndexRow from "@/components/ui/IndexRow";

const MESSAGE =
  "I want the job where a problem shows up vague, I go talk to the people living with it, and then I ship the thing that fixes it. If that's the role you're filling, say hello.";

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
    }, 30);
    return () => clearInterval(id);
  }, [inView, text]);

  return (
    <p
      ref={ref}
      className="serif-it min-h-[7rem] max-w-3xl text-[clamp(1.125rem,2.6vw,1.75rem)] leading-snug"
      style={{ color: "var(--bone)" }}
    >
      {out}
      {out.length < text.length && (
        <span className="blink" style={{ color: "var(--blaze)" }}>
          ▍
        </span>
      )}
    </p>
  );
}

const LINKS = [
  { label: "EMAIL", value: PLAYER.email, href: `mailto:${PLAYER.email}` },
  { label: "LINKEDIN", value: "in/bpratheek", href: PLAYER.linkedin },
  { label: "GITHUB", value: "Pratheekb11", href: PLAYER.github },
  { label: "RESUME", value: "One page, PDF", href: "/media/Pratheek_B_Resume.pdf" },
];

export default function Contact() {
  return (
    <section id="contact" className="relative w-full pt-20 sm:pt-28">
      <div className="shell">
        <IndexRow n="05" right="OPEN TO NEW ROLES" />

        <h2
          className="d mt-10 text-[clamp(3rem,15vw,13rem)] sm:mt-14"
          style={{ color: "var(--bone)" }}
        >
          SAY
          <span style={{ color: "var(--blaze)" }}> HELLO.</span>
        </h2>

        <div className="mt-10">
          <Stream text={MESSAGE} />
        </div>

        <ul className="mt-14">
          {LINKS.map((l) => (
            <li key={l.label} className="border-t" style={{ borderColor: "var(--rail)" }}>
              <a
                href={l.href}
                target={l.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer noopener"
                data-target
                className="group flex items-center justify-between gap-6 py-6 no-underline"
              >
                <span
                  className="d text-[clamp(1.5rem,5vw,3.25rem)] transition-colors duration-300 group-hover:text-[var(--blaze)]"
                  style={{ color: "var(--bone)" }}
                >
                  {l.label}
                </span>
                <span className="flex items-center gap-5">
                  <span className="mono hidden text-[0.8125rem] sm:inline" style={{ color: "var(--ash)" }}>
                    {l.value}
                  </span>
                  <span
                    className="mono text-[1.125rem] transition-transform duration-300 group-hover:translate-x-1"
                    style={{ color: "var(--blaze)" }}
                  >
                    →
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="rule" />

        <div className="flex flex-wrap items-center justify-between gap-3 py-8">
          <span className="meta">BUILT BY PRATHEEK B · NEXT.JS · 2026</span>
          <span className="meta">BENGALURU, INDIA</span>
        </div>
      </div>
    </section>
  );
}
