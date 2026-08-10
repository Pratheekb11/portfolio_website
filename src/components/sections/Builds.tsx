"use client";

import { motion } from "motion/react";
import { LOADOUTS, type Loadout } from "@/lib/data";
import IndexRow from "@/components/ui/IndexRow";
import Marquee from "@/components/fx/Marquee";

function Project({ item, flip }: { item: Loadout; flip: boolean }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="border-t py-12 sm:py-16"
      style={{ borderColor: "var(--rail)" }}
    >
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-14">
        <div className={flip ? "lg:order-2" : undefined}>
          <p className="serif-it text-[0.9375rem]" style={{ color: "var(--ash)" }}>
            {item.kind} · {item.year}
          </p>
          <h3 className="d mt-3 text-[clamp(1.75rem,5vw,3.5rem)]" style={{ color: "var(--bone)" }}>
            {item.name}
          </h3>
          <p className="mt-4 max-w-lg text-[1rem] leading-relaxed" style={{ color: "var(--bone)" }}>
            {item.summary}
          </p>

          <ul className="mt-5 space-y-2.5">
            {item.detail.map((d) => (
              <li key={d} className="flex gap-3 text-[0.9375rem] leading-relaxed" style={{ color: "var(--ash)" }}>
                <span className="mt-2 inline-block h-1 w-1 shrink-0" style={{ background: "var(--blaze)" }} />
                <span>{d}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap gap-x-10 gap-y-5">
            {item.figures.map((f) => (
              <div key={f.label}>
                <div className="d text-[clamp(1.5rem,3.6vw,2.25rem)]" style={{ color: "var(--blaze)" }}>
                  {f.value}
                </div>
                <div className="meta mt-1">{f.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            {item.live ? (
              <a
                href={item.live}
                target="_blank"
                rel="noreferrer noopener"
                className="mono px-4 py-2.5 text-[0.6875rem] font-bold tracking-[0.16em] no-underline transition-opacity duration-200 hover:opacity-85"
                style={{ background: "var(--blaze)", color: "var(--void)" }}
              >
                Open live site →
              </a>
            ) : (
              <span className="meta">{item.status}</span>
            )}
            <span className="meta">{item.stack.join(" · ")}</span>
          </div>
        </div>

        <div className={flip ? "lg:order-1" : undefined}>
          {item.shot ? (
            <a
              href={item.live}
              target="_blank"
              rel="noreferrer noopener"
              className="block overflow-hidden border"
              style={{ borderColor: "var(--rail)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.shot}
                alt={`Screenshot of the ${item.name} site`}
                loading="lazy"
                className="block aspect-[16/10] w-full object-cover object-top"
              />
            </a>
          ) : (
            <div
              className="flex aspect-[16/10] w-full items-center justify-center border"
              style={{ borderColor: "var(--rail)", background: "var(--pit)" }}
            >
              <span className="meta">Internal build</span>
            </div>
          )}
        </div>
      </div>
    </motion.article>
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

      <div className="shell mt-8 sm:mt-12">
        {LOADOUTS.map((l, i) => (
          <Project key={l.id} item={l} flip={i % 2 === 1} />
        ))}
        <div className="rule" />
      </div>
    </section>
  );
}
