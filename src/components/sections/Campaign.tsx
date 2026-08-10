"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { MISSIONS, PLAYER, type Mission } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import { pushFeed } from "@/components/hud/feed";

function Briefing({ m, n }: { m: Mission; n: number }) {
  const ref = useRef<HTMLElement>(null);

  return (
    <motion.article
      ref={ref}
      data-target
      onViewportEnter={() =>
        pushFeed({ kind: "intel", actor: PLAYER.callsign, verb: "unlocked", target: m.op.replace("OPERATION: ", "") }, m.id)
      }
      viewport={{ once: true, margin: "-25% 0px -25% 0px" }}
      className="relative pl-10 sm:pl-16"
    >
      {/* node on the spine */}
      <motion.span
        aria-hidden
        initial={{ scale: 0.4, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-30% 0px -30% 0px" }}
        transition={{ duration: 0.4, ease: [0.2, 0.8, 0.25, 1] }}
        className="absolute left-[7px] top-6 block h-3.5 w-3.5 sm:left-[15px]"
        style={{
          background: m.status === "ACTIVE" ? "var(--signal)" : "var(--rail)",
          clipPath: "polygon(50% 0,100% 50%,50% 100%,0 50%)",
        }}
      />

      <Reveal>
        <div className="panel p-5 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2.5">
                <span className="t-data text-[0.625rem] tracking-[0.2em]" style={{ color: "var(--signal)" }}>
                  {String(n).padStart(2, "0")}
                </span>
                <span
                  className="t-data px-1.5 py-0.5 text-[0.5625rem] font-bold tracking-[0.18em]"
                  style={{
                    color: m.status === "ACTIVE" ? "var(--pitch)" : "var(--ghost)",
                    border: `1px solid ${m.status === "ACTIVE" ? "var(--pitch)" : "var(--rail)"}`,
                  }}
                >
                  {m.status}
                </span>
              </div>
              <h3 className="t-display mt-2 text-[clamp(1.25rem,3.4vw,1.875rem)]" style={{ color: "var(--sand)" }}>
                {m.op}
              </h3>
              <p className="t-data mt-1.5 text-[0.75rem]" style={{ color: "var(--ghost)" }}>
                {m.role} · {m.org}
              </p>
              <p className="t-data mt-0.5 text-[0.6875rem]" style={{ color: "var(--rail)" }}>
                {m.period}
              </p>
            </div>

            <div className="shrink-0 text-left sm:text-right">
              <div className="t-data text-[clamp(1.5rem,4vw,2rem)] font-bold leading-none" style={{ color: "var(--hud)" }}>
                {m.metric.value}
              </div>
              <div className="t-label mt-1" style={{ fontSize: "0.5625rem" }}>
                {m.metric.label}
              </div>
            </div>
          </div>

          <dl className="mt-6 space-y-4">
            {(
              [
                ["FRICTION", m.objective, "var(--frag)"],
                ["BUILT", m.engagement, "var(--comms)"],
                ["RESULT", m.outcome, "var(--pitch)"],
              ] as const
            ).map(([k, v, c]) => (
              <div key={k} className="grid gap-1.5 sm:grid-cols-[6.5rem_1fr] sm:gap-4">
                <dt className="t-data pt-0.5 text-[0.625rem] tracking-[0.18em]" style={{ color: c }}>
                  {k}
                </dt>
                <dd className="text-[0.9375rem] leading-relaxed" style={{ color: k === "FRICTION" ? "var(--ghost)" : "var(--hud)" }}>
                  {v}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex flex-wrap gap-1.5 border-t pt-4" style={{ borderColor: "var(--rail)" }}>
            {m.stack.map((s) => (
              <span
                key={s}
                className="t-data px-2 py-1 text-[0.625rem] tracking-wide"
                style={{ color: "var(--ghost)", background: "var(--deck-2)" }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </motion.article>
  );
}

export default function Campaign() {
  const track = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: track, offset: ["start 65%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });

  return (
    <section id="campaign" className="relative mx-auto w-full max-w-5xl px-4 py-24 sm:px-8 sm:py-32">
      <SectionHeader
        index="01"
        kicker="CAMPAIGN"
        title="THE WORK, IN ORDER"
        blurb="Every one of these started as a complaint someone kept repeating. Scroll to advance — the spine tracks how far into the campaign you are."
      />

      <div ref={track} className="relative">
        {/* spine */}
        <div aria-hidden className="absolute bottom-0 left-3 top-0 w-px sm:left-[22px]" style={{ background: "var(--rail)" }}>
          <motion.div className="h-full w-full origin-top" style={{ scaleY: fill, background: "var(--signal)" }} />
        </div>

        <div className="space-y-6 sm:space-y-8">
          {MISSIONS.map((m, i) => (
            <Briefing key={m.id} m={m} n={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
