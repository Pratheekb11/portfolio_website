"use client";

import { motion } from "motion/react";
import Halftone from "@/components/fx/Halftone";
import { asset } from "@/lib/asset";

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
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <Halftone
          src={asset("/media/player.jpg")}
          cell={7}
          shape="square"
          region={[0.46, 0.02, 0.58, 0.98]}
          anchor={[0.5, 0.02]}
          focus={[0.77, 0.45]}
          falloff={0.44}
          baseline={0.075}
          className="h-full w-full opacity-70 sm:opacity-100"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, var(--void) 4%, transparent 58%), linear-gradient(to bottom, var(--void) 1%, transparent 12%)",
          }}
        />
      </motion.div>

      <div className="shell relative flex w-full flex-col justify-between py-10 sm:py-14">
        <motion.div custom={0} variants={rise} initial="hidden" animate="shown" className="">
          <p
            className="d text-[clamp(1.125rem,2.4vw,1.625rem)]"
            style={{ color: "var(--bone)", letterSpacing: "0.01em", fontWeight: 600 }}
          >
            GEN AI ENGINEER
          </p>
          <p className="meta mt-2">AGENTIC SYSTEMS · LLM INFRASTRUCTURE · PRODUCT THINKING</p>
        </motion.div>

        <div>
          <h1 className="d select-none text-[clamp(3rem,10vw,8.5rem)]">
            <span className="block overflow-hidden pb-[0.04em]">
              {"PRATHEEK".split("").map((ch, i) => (
                <motion.span
                  key={`${ch}-${i}`}
                  initial={{ y: "108%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.85, delay: 0.14 + i * 0.045, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block"
                  style={{ color: "var(--bone)", fontWeight: 400, letterSpacing: "-0.015em" }}
                >
                  {ch}
                </motion.span>
              ))}
            </span>
            <span className="block overflow-hidden pb-[0.04em]">
              {"B.".split("").map((ch, i) => (
                <motion.span
                  key={`${ch}-${i}`}
                  initial={{ y: "108%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.85, delay: 0.5 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block"
                  style={{ color: "var(--blaze)", fontWeight: 900, letterSpacing: "-0.04em" }}
                >
                  {ch}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            custom={3}
            variants={rise}
            initial="hidden"
            animate="shown"
            className="mt-6 max-w-md text-[1rem] leading-relaxed"
            style={{ color: "var(--ash)" }}
          >
            I talk to the people losing time before I open an editor, then ship the fix they
            actually keep using.
          </motion.p>

          <motion.div
            custom={4}
            variants={rise}
            initial="hidden"
            animate="shown"
            className="mt-7 flex flex-wrap gap-x-7 gap-y-2.5"
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

      <motion.a
        href="#builds"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="meta absolute bottom-6 right-[clamp(1rem,4vw,3.5rem)] hidden items-center gap-2 no-underline sm:flex"
        style={{ color: "var(--ash)" }}
      >
        SCROLL
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ color: "var(--blaze)" }}
        >
          ↓
        </motion.span>
      </motion.a>
    </section>
  );
}
