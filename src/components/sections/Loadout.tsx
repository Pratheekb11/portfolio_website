"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { LOADOUTS, type Loadout } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import StatBar from "@/components/ui/StatBar";

const TIER_TINT: Record<Loadout["tier"], string> = {
  PRIMARY: "var(--signal)",
  SECONDARY: "var(--comms)",
  UTILITY: "var(--sand)",
};

function Card({ item }: { item: Loadout }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [4.5, -4.5]), { stiffness: 220, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-5.5, 5.5]), { stiffness: 220, damping: 20 });
  const glareX = useTransform(mx, (v) => `${v * 100}%`);
  const glareY = useTransform(my, (v) => `${v * 100}%`);

  const track = (e: React.PointerEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  const tint = TIER_TINT[item.tier];
  const wide = item.tier === "PRIMARY";
  const glare = useTransform(
    [glareX, glareY],
    ([x, y]) =>
      `radial-gradient(240px circle at ${x} ${y}, color-mix(in oklab, ${tint} 16%, transparent), transparent 70%)`
  );

  return (
    <Reveal className={wide ? "lg:col-span-3" : "lg:col-span-2"}>
      <motion.div
        ref={ref}
        data-target
        onPointerMove={track}
        onPointerLeave={reset}
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
        className="panel group relative h-full overflow-hidden p-5 transition-colors duration-300 sm:p-6"
      >
        {/* inspect glare — follows the pointer, like turning a skin in the light */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glare }}
        />

        <div className="relative flex h-full flex-col">
          <div className="flex items-center justify-between gap-3">
            <span className="t-data text-[0.5625rem] font-bold tracking-[0.22em]" style={{ color: tint }}>
              {item.tier}
            </span>
            <span className="t-label" style={{ fontSize: "0.5625rem" }}>
              {item.tag}
            </span>
          </div>

          <h3
            className="t-display mt-3 text-[clamp(1.375rem,3vw,2rem)]"
            style={{ color: "var(--hud)" }}
          >
            {item.name}
          </h3>

          {item.shot && (
            <div
              className="relative mt-4 aspect-[16/10] w-full overflow-hidden"
              style={{ clipPath: "var(--clip-sm)", border: "1px solid var(--rail)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.shot}
                alt={`${item.name} interface`}
                loading="lazy"
                className="h-full w-full object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 transition-opacity duration-500 group-hover:opacity-0"
                style={{
                  background: `linear-gradient(to bottom, transparent 35%, color-mix(in oklab, var(--void) 88%, transparent)), color-mix(in oklab, ${tint} 8%, transparent)`,
                }}
              />
              <span
                className="t-data absolute bottom-2 left-2.5 text-[0.5625rem] tracking-[0.2em]"
                style={{ color: "var(--hud)" }}
              >
                LIVE BUILD
              </span>
            </div>
          )}

          <p className="mt-3 text-[0.9375rem] leading-relaxed" style={{ color: "var(--sand)" }}>
            {item.summary}
          </p>

          <ul className="mt-4 space-y-2">
            {item.detail.map((d) => (
              <li key={d} className="flex gap-2.5 text-[0.875rem] leading-relaxed" style={{ color: "var(--ghost)" }}>
                <span aria-hidden style={{ color: tint }}>
                  ▸
                </span>
                <span>{d}</span>
              </li>
            ))}
          </ul>

          <div className="mb-6 mt-6 grid gap-2.5">
            {item.attrs.map((a) => (
              <div key={a.label} className="grid grid-cols-[7rem_1fr] items-center gap-3">
                <span className="t-data text-[0.625rem] tracking-[0.16em]" style={{ color: "var(--ghost)" }}>
                  {a.label}
                </span>
                <StatBar value={a.value} color={tint} segments={wide ? 24 : 16} />
              </div>
            ))}
          </div>

          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t pt-4" style={{ borderColor: "var(--rail)" }}>
            <div className="flex flex-wrap gap-1.5">
              {item.stack.map((s) => (
                <span key={s} className="t-data px-2 py-1 text-[0.625rem]" style={{ color: "var(--ghost)", background: "var(--deck-2)" }}>
                  {s}
                </span>
              ))}
            </div>
            {item.live ? (
              <a
                href={item.live}
                target="_blank"
                rel="noreferrer noopener"
                className="panel-sm border px-3.5 py-2 no-underline transition-colors duration-200"
                style={{ borderColor: tint, color: tint }}
              >
                <span className="t-data text-[0.6875rem] font-bold tracking-[0.16em]">OPEN ↗</span>
              </a>
            ) : (
              <span className="t-data text-[0.6875rem]" style={{ color: "var(--rail)" }}>
                {item.status}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
}

export default function LoadoutSection() {
  return (
    <section id="loadout" className="relative mx-auto w-full max-w-6xl px-4 py-24 sm:px-8 sm:py-32">
      <SectionHeader
        index="02"
        kicker="LOADOUT"
        title="WHAT I'VE SHIPPED"
        blurb="Two of these are live right now — open them. The rest run inside Bosch, in production, on real programs."
      />
      <div className="grid gap-5 lg:grid-cols-6">
        {LOADOUTS.map((l) => (
          <Card key={l.id} item={l} />
        ))}
      </div>
    </section>
  );
}
