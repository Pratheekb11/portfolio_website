"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { LOADOUTS, type Loadout } from "@/lib/data";
import IndexRow from "@/components/ui/IndexRow";
import Magnetic from "@/components/ui/Magnetic";
import Marquee from "@/components/fx/Marquee";
import useMedia from "@/components/ui/useMedia";

function Corner({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      className={`absolute h-3 w-3 ${className}`}
      style={{ borderColor: "color-mix(in oklab, var(--bone) 45%, transparent)" }}
    />
  );
}

function Project({ item, i, last }: { item: Loadout; i: number; last: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // the card underneath settles back as the next one arrives over it
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.965]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.45]);

  // On a phone a card is taller than the screen, so stacking them stickily
  // hides their own bottom half. Below lg they are plain stacked cards.
  const stack = useMedia("(min-width: 1024px)");

  return (
    <div
      ref={ref}
      className="relative pb-4 sm:pb-5"
      style={{ minHeight: stack && !last ? "min(94svh, 46rem)" : undefined }}
    >
      <motion.article
        style={{
          ...(stack ? { top: `calc(var(--chrome-top) + 1rem + ${i * 8}px)` } : {}),
          ...(stack && !last ? { scale, opacity } : {}),
        }}
        className={`card overflow-hidden ${stack ? "sticky" : ""}`}
      >
        <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
          <div className="p-5 sm:p-9">
            <p className="serif-it text-[0.9375rem]" style={{ color: "var(--ash)" }}>
              {item.kind} · {item.year}
            </p>
            <h3 className="d mt-2.5 text-[clamp(1.625rem,7vw,3.5rem)]" style={{ color: "var(--blaze)" }}>
              {item.name}
            </h3>
            <p
              className="serif-it mt-4 max-w-lg text-[1rem] leading-relaxed"
              style={{ color: "var(--bone)" }}
            >
              {item.summary}
            </p>

            <ul className="mt-5 space-y-3">
              {item.detail.map((d) => (
                <li key={d} className="flex gap-3 text-[0.9375rem] leading-relaxed" style={{ color: "var(--ash)" }}>
                  <span className="mt-2 inline-block h-1 w-1 shrink-0" style={{ background: "var(--blaze)" }} />
                  <span>{d}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap gap-x-8 gap-y-5 sm:mt-8 sm:gap-x-9">
              {item.figures.map((f) => (
                <div key={f.label}>
                  <div className="d text-[clamp(1.5rem,6vw,2.5rem)]" style={{ color: "var(--blaze)" }}>
                    {f.value}
                  </div>
                  <div className="meta mt-1">{f.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4 sm:mt-8">
              {item.live ? (
                <Magnetic>
                  <a
                    href={item.live}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mono inline-flex min-h-[2.75rem] items-center px-5 text-[0.6875rem] font-bold tracking-[0.16em] no-underline transition-opacity duration-200 hover:opacity-85 sm:min-h-[2.5rem] sm:px-4"
                    style={{ background: "var(--blaze)", color: "var(--void)", borderRadius: 6 }}
                  >
                    Open live site →
                  </a>
                </Magnetic>
              ) : (
                <span className="meta">{item.status}</span>
              )}
              <span className="meta">{item.stack.join(" · ")}</span>
            </div>
          </div>

          <div
            className="relative flex items-center border-t p-3 sm:p-6 lg:border-l lg:border-t-0"
            style={{ borderColor: "var(--rail)" }}
          >
            <Corner className="left-6 top-8 border-l border-t" />
            <Corner className="right-6 top-8 border-r border-t" />
            <Corner className="bottom-8 left-6 border-b border-l" />
            <Corner className="bottom-8 right-6 border-b border-r" />
            {item.shot ? (
              <a
                href={item.live}
                target="_blank"
                rel="noreferrer noopener"
                className="group/shot block aspect-[16/10] w-full overflow-hidden"
                style={{ borderRadius: 8 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.shot}
                  alt={`Screenshot of the ${item.name} site`}
                  loading="lazy"
                  className="block h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover/shot:scale-[1.05]"
                />
              </a>
            ) : (
              <div
                className="flex aspect-[16/10] w-full items-center justify-center"
                style={{ background: "var(--pit)", borderRadius: 8 }}
              >
                <span className="meta">Internal build</span>
              </div>
            )}
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function Builds() {
  return (
    <section id="builds" className="relative w-full py-14 sm:py-28">
      {/* the section title is drawn by the marquee, which is decorative;
          this keeps the heading outline unbroken for screen readers */}
      <h2 className="sr-only">Things I made</h2>

      <div className="shell">
        <IndexRow n="01" right={`${LOADOUTS.length} PROJECTS`} />
      </div>

      <div className="mt-8 sm:mt-12">
        <Marquee text="THINGS I MADE" solid="MADE" speed={280} />
      </div>

      <div className="shell mt-8 sm:mt-12">
        {LOADOUTS.map((l, i) => (
          <Project key={l.id} item={l} i={i} last={i === LOADOUTS.length - 1} />
        ))}
      </div>
    </section>
  );
}
