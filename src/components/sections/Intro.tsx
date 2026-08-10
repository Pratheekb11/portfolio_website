"use client";

import { motion } from "motion/react";
import Halftone from "@/components/fx/Halftone";

const CHIPS = ["2.5 YRS IN PRODUCTION", "BENGALURU, INDIA", "OPEN TO NEW ROLES"];

const rise = {
  hidden: { opacity: 0, y: 34 },
  shown: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.1 + i * 0.09, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function Intro() {
  return (
    <section
      id="intro"
      className="relative flex w-full flex-col justify-between overflow-hidden"
      style={{ minHeight: "100svh", paddingTop: "var(--chrome-top)", paddingBottom: "var(--chrome-bot)" }}
    >
      {/* portrait resolves out of the right edge */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-full sm:w-[62%] lg:w-[52%]">
        <Halftone
          src="/media/player.jpg"
          cell={6}
          focus={[0.5, 0.34]}
          falloff={0.78}
          className="h-full w-full opacity-60 sm:opacity-90"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, var(--void) 2%, transparent 55%), linear-gradient(to top, var(--void) 4%, transparent 40%)",
          }}
        />
      </div>

      <div className="shell relative pt-10 sm:pt-14">
        <motion.p
          custom={0}
          variants={rise}
          initial="hidden"
          animate="shown"
          className="d text-[clamp(1.125rem,2.6vw,1.75rem)]"
          style={{ color: "var(--bone)", letterSpacing: "0.02em", fontWeight: 600 }}
        >
          GEN AI ENGINEER
        </motion.p>
        <motion.p custom={1} variants={rise} initial="hidden" animate="shown" className="meta mt-2.5">
          AGENTIC SYSTEMS · LLM INFRASTRUCTURE · RAG AT SCALE
        </motion.p>
      </div>

      <div className="shell relative pb-8 sm:pb-12">
        <h1 className="d select-none text-[clamp(3.5rem,17vw,15rem)]">
          <motion.span
            custom={2}
            variants={rise}
            initial="hidden"
            animate="shown"
            className="block"
            style={{ color: "var(--bone)", fontWeight: 400, letterSpacing: "-0.01em" }}
          >
            PRATHEEK
          </motion.span>
          <motion.span
            custom={3}
            variants={rise}
            initial="hidden"
            animate="shown"
            className="flex items-end justify-between gap-8"
            style={{ color: "var(--blaze)", fontWeight: 900, letterSpacing: "-0.04em" }}
          >
            <span>B.</span>
            <span className="hidden shrink-0 flex-col items-end gap-2 pb-[0.14em] sm:flex">
              {CHIPS.map((c) => (
                <span key={c} className="meta flex items-center gap-2.5">
                  {c}
                  <span className="inline-block h-1.5 w-1.5" style={{ background: "var(--blaze)" }} />
                </span>
              ))}
            </span>
          </motion.span>
        </h1>

        <motion.div
          custom={4}
          variants={rise}
          initial="hidden"
          animate="shown"
          className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 sm:hidden"
        >
          {CHIPS.map((c) => (
            <span key={c} className="meta flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5" style={{ background: "var(--blaze)" }} />
              {c}
            </span>
          ))}
        </motion.div>
      </div>

      <motion.a
        href="#work"
        custom={5}
        variants={rise}
        initial="hidden"
        animate="shown"
        className="meta absolute bottom-8 right-4 hidden items-center gap-2 no-underline sm:flex sm:right-[clamp(1rem,4vw,3.5rem)]"
        style={{ color: "var(--ash)" }}
      >
        <span className="blink" style={{ color: "var(--blaze)" }}>
          ▼
        </span>
        SCROLL
      </motion.a>
    </section>
  );
}
