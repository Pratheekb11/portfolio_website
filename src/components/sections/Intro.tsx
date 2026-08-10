"use client";

import { motion } from "motion/react";
import Halftone from "@/components/fx/Halftone";

const CHIPS = ["2.5 years in production", "Bengaluru, India", "Bosch Global Software Technologies"];

const rise = {
  hidden: { opacity: 0, y: 24 },
  shown: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.08 + i * 0.07, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function Intro() {
  return (
    <section
      id="intro"
      className="relative flex w-full items-stretch overflow-hidden"
      style={{ minHeight: "100svh", paddingTop: "var(--chrome-top)", paddingBottom: "var(--chrome-bot)" }}
    >
      {/* one continuous dot field across the whole screen; he resolves out of the left of it */}
      <div className="pointer-events-none absolute inset-0">
        <Halftone
          src="/media/player.jpg"
          cell={6}
          region={[-0.04, 0.02, 0.56, 0.98]}
          anchor={[0.5, 0.02]}
          focus={[0.2, 0.44]}
          falloff={0.62}
          baseline={0.085}
          className="h-full w-full"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to left, var(--void) 4%, transparent 58%), linear-gradient(to bottom, var(--void) 1%, transparent 12%)",
          }}
        />
      </div>

      <div className="shell relative flex w-full flex-col justify-between py-10 sm:py-14">
        <motion.div custom={0} variants={rise} initial="hidden" animate="shown" className="sm:text-right">
          <p
            className="d text-[clamp(1.125rem,2.4vw,1.625rem)]"
            style={{ color: "var(--bone)", letterSpacing: "0.01em", fontWeight: 600 }}
          >
            GEN AI ENGINEER
          </p>
          <p className="meta mt-2">AGENTIC SYSTEMS · LLM INFRASTRUCTURE · RAG AT SCALE</p>
        </motion.div>

        <div className="sm:text-right">
          <h1 className="d select-none text-[clamp(3rem,10vw,8.5rem)]">
            <motion.span
              custom={1}
              variants={rise}
              initial="hidden"
              animate="shown"
              className="block"
              style={{ color: "var(--bone)", fontWeight: 400, letterSpacing: "-0.015em" }}
            >
              PRATHEEK
            </motion.span>
            <motion.span
              custom={2}
              variants={rise}
              initial="hidden"
              animate="shown"
              className="block"
              style={{ color: "var(--blaze)", fontWeight: 900, letterSpacing: "-0.04em" }}
            >
              B.
            </motion.span>
          </h1>

          <motion.p
            custom={3}
            variants={rise}
            initial="hidden"
            animate="shown"
            className="mt-6 max-w-md text-[1rem] leading-relaxed sm:ml-auto sm:text-right"
            style={{ color: "var(--ash)" }}
          >
            I look for the friction before I look for the tool, then ship the fix teams actually
            keep using.
          </motion.p>

          <motion.div
            custom={4}
            variants={rise}
            initial="hidden"
            animate="shown"
            className="mt-7 flex flex-wrap gap-x-7 gap-y-2.5 sm:justify-end"
          >
            {CHIPS.map((c) => (
              <span key={c} className="meta flex items-center gap-2.5" style={{ textTransform: "none" }}>
                <span className="inline-block h-1.5 w-1.5" style={{ background: "var(--blaze)" }} />
                {c}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
