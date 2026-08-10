"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { LOADOUTS, type Loadout } from "@/lib/data";
import IndexRow from "@/components/ui/IndexRow";
import Marquee from "@/components/fx/Marquee";

function Panel({ item, i, total }: { item: Loadout; i: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // the panel underneath recedes as the next one slides over it
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.25]);
  const last = i === total - 1;

  return (
    <div ref={ref} className="relative" style={{ minHeight: "min(100svh, 52rem)" }}>
      <motion.article
        style={{
          top: `calc(var(--chrome-top) + 1.25rem + ${i * 10}px)`,
          ...(last ? {} : { scale, opacity }),
        }}
        className="sticky overflow-hidden"
      >
        <div
          className="pointer-events-none absolute inset-0 border"
          style={{ background: "var(--coal)", borderColor: "var(--rail)" }}
        />
        <div className="shell relative grid py-8 sm:py-10 gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-12">
          <div>
            <p className="serif-it text-[0.9375rem]" style={{ color: "var(--ash)" }}>
              {item.kind} · {item.year}
            </p>
            <h3 className="d mt-3 text-[clamp(2rem,6vw,4.25rem)]" style={{ color: "var(--blaze)" }}>
              {item.name}
            </h3>
            <p
              className="serif-it mt-4 max-w-lg text-[1rem] leading-relaxed sm:text-[1.0625rem]"
              style={{ color: "var(--bone)" }}
            >
              {item.summary}
            </p>

            <ul className="mt-6 space-y-2.5">
              {item.detail.map((d) => (
                <li key={d} className="flex gap-3 text-[0.9375rem] leading-relaxed" style={{ color: "var(--ash)" }}>
                  <span className="mt-2 inline-block h-1 w-1 shrink-0" style={{ background: "var(--blaze)" }} />
                  <span>{d}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-x-10 gap-y-5">
              {item.figures.map((f) => (
                <div key={f.label}>
                  <div className="d text-[clamp(1.75rem,4.5vw,2.75rem)]" style={{ color: "var(--blaze)" }}>
                    {f.value}
                  </div>
                  <div className="meta mt-1">{f.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              {item.live ? (
                <a
                  href={item.live}
                  target="_blank"
                  rel="noreferrer noopener"
                  data-target
                  className="mono px-4 py-2.5 text-[0.6875rem] font-bold tracking-[0.16em] no-underline transition-transform duration-200 hover:-translate-y-px"
                  style={{ background: "var(--blaze)", color: "var(--void)" }}
                >
                  OPEN LIVE SITE →
                </a>
              ) : (
                <span className="meta">{item.status}</span>
              )}
              <span className="meta">{item.stack.join(" · ")}</span>
            </div>
          </div>

          <div className="relative">
            {item.shot ? (
              <div className="relative overflow-hidden border" style={{ borderColor: "var(--rail)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.shot}
                  alt={`${item.name} interface`}
                  loading="lazy"
                  className="block aspect-[16/10] w-full object-cover object-top"
                />
              </div>
            ) : (
              <div
                className="flex aspect-[16/10] w-full items-center justify-center border"
                style={{ borderColor: "var(--rail)", background: "var(--pit)" }}
              >
                <span className="meta">INTERNAL · NO PUBLIC BUILD</span>
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
    <section id="builds" className="relative w-full py-20 sm:py-28">
      <div className="shell">
        <IndexRow n="02" right={`${LOADOUTS.length} PROJECTS`} />
      </div>

      <div className="mt-8 sm:mt-12">
        <Marquee text="THINGS I MADE" solid="MADE" speed={280} />
      </div>

      <div className="mt-10 sm:mt-16">
        {LOADOUTS.map((l, i) => (
          <Panel key={l.id} item={l} i={i} total={LOADOUTS.length} />
        ))}
      </div>
    </section>
  );
}
