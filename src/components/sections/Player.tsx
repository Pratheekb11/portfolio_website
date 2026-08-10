"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { PLAYER } from "@/lib/data";
import AgentField from "@/components/hud/AgentField";
import Counter from "@/components/ui/Counter";

export default function Player() {
  const [imgOk, setImgOk] = useState(true);

  return (
    <section id="player" className="relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden pt-16 sm:pt-20">
      <div className="absolute inset-0 opacity-70">
        <AgentField />
      </div>
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40"
        style={{ background: "linear-gradient(to bottom, transparent, var(--void))" }}
      />

      <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 pb-14 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14 lg:pb-16">
        {/* identity */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.25, 1] }}
            className="flex flex-wrap items-center gap-2.5"
          >
            <span
              className="panel-sm border px-2.5 py-1"
              style={{ borderColor: "var(--signal)", background: "color-mix(in oklab, var(--signal) 12%, transparent)" }}
            >
              <span className="t-data text-[0.625rem] font-bold tracking-[0.2em]" style={{ color: "var(--signal)" }}>
                ONLINE · {PLAYER.location}
              </span>
            </span>
            <span className="t-label">{PLAYER.spec}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.2, 0.8, 0.25, 1] }}
            className="t-display mt-4 text-[clamp(2.75rem,10vw,7rem)]"
            style={{ color: "var(--hud)" }}
          >
            PRATHEEK
            <span className="mt-1 flex items-center gap-4 sm:gap-5">
              <span style={{ color: "var(--sand)" }}>B</span>
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, delay: 0.35, ease: [0.2, 0.8, 0.25, 1] }}
                className="h-[3px] flex-1"
                style={{ transformOrigin: "left", background: "var(--signal)" }}
              />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.62 }}
                className="t-data hidden shrink-0 text-[0.6875rem] font-bold tracking-[0.2em] sm:block sm:text-[0.75rem]"
                style={{ color: "var(--ghost)" }}
              >
                BUILDS AGENTS
                <br />
                THAT SHIP
              </motion.span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.34 }}
            className="mt-7 max-w-xl text-[1rem] leading-relaxed sm:text-[1.0625rem]"
            style={{ color: "var(--ghost)" }}
          >
            {PLAYER.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.44 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href="#loadout"
              data-target
              className="panel-sm flex-1 border px-5 py-3 text-center no-underline transition-all duration-200 hover:brightness-125 sm:flex-none"
              style={{ borderColor: "var(--signal)", background: "var(--signal)", color: "var(--void)" }}
            >
              <span className="t-data text-[0.75rem] font-bold tracking-[0.2em]">SEE THE BUILDS</span>
            </a>
            <a
              href="#campaign"
              data-target
              className="panel-sm flex-1 border px-5 py-3 text-center no-underline transition-colors duration-200 hover:border-[var(--sand)] sm:flex-none"
              style={{ borderColor: "var(--rail)", color: "var(--hud)" }}
            >
              <span className="t-data text-[0.75rem] font-bold tracking-[0.2em]">RUN THE CAMPAIGN</span>
            </a>
          </motion.div>
        </div>

        {/* player portrait card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.2, ease: [0.2, 0.8, 0.25, 1] }}
          className="panel relative mx-auto w-full max-w-sm p-3"
          data-target
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden" style={{ clipPath: "var(--clip-md)", background: "var(--deck-2)" }}>
            {imgOk ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/media/player.jpg"
                alt="Pratheek B"
                onError={() => setImgOk(false)}
                className="h-full w-full object-cover"
                style={{ filter: "saturate(0.85) contrast(1.05)" }}
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2">
                <span className="t-label">AWAITING UPLINK</span>
                <span className="t-data text-[0.625rem]" style={{ color: "var(--rail)" }}>
                  /media/player.jpg
                </span>
              </div>
            )}
            {/* HUD overlay on the portrait */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <span className="absolute left-2 top-2 h-4 w-4 border-l border-t" style={{ borderColor: "var(--signal)" }} />
              <span className="absolute right-2 top-2 h-4 w-4 border-r border-t" style={{ borderColor: "var(--signal)" }} />
              <span className="absolute bottom-2 left-2 h-4 w-4 border-b border-l" style={{ borderColor: "var(--signal)" }} />
              <span className="absolute bottom-2 right-2 h-4 w-4 border-b border-r" style={{ borderColor: "var(--signal)" }} />
              <div
                className="absolute inset-x-0 h-16"
                style={{
                  background: "linear-gradient(to bottom, transparent, color-mix(in oklab, var(--comms) 14%, transparent), transparent)",
                  animation: "scanY 5.5s linear infinite",
                }}
              />
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between border-t pt-3" style={{ borderColor: "var(--rail)" }}>
            <div>
              <div className="t-data text-[0.8125rem] font-bold tracking-[0.12em]" style={{ color: "var(--hud)" }}>
                {PLAYER.class}
              </div>
              <div className="t-label mt-1" style={{ fontSize: "0.625rem" }}>
                BOSCH GLOBAL SOFTWARE TECHNOLOGIES
              </div>
            </div>
            <div className="text-right">
              <div className="t-data text-2xl font-bold" style={{ color: "var(--signal)" }}>
                2.5
              </div>
              <div className="t-label" style={{ fontSize: "0.5625rem" }}>
                YRS IN PROD
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* scoreboard strip */}
      <div className="relative border-y" style={{ borderColor: "var(--rail)", background: "color-mix(in oklab, var(--deck) 60%, transparent)" }}>
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x px-4 sm:px-8 lg:grid-cols-4" style={{ borderColor: "var(--rail)" }}>
          {PLAYER.stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
              className="px-4 py-5 first:pl-0 sm:px-6"
              style={{ borderColor: "var(--rail)" }}
            >
              <div className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold leading-none" style={{ color: "var(--sand)", fontFamily: "var(--font-data)" }}>
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="t-label mt-2" style={{ fontSize: "0.625rem" }}>
                {s.label}
              </div>
              <div className="mt-1 text-[0.6875rem]" style={{ color: "var(--rail)" }}>
                {s.note}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
