"use client";

import { motion } from "motion/react";
import { ARMORY, CREDENTIALS, PLAYER } from "@/lib/data";
import IndexRow from "@/components/ui/IndexRow";
import Marquee from "@/components/fx/Marquee";
import Halftone from "@/components/fx/Halftone";

export default function Stack() {
  return (
    <section id="stack" className="relative w-full py-20 sm:py-28">
      <div className="shell">
        <IndexRow n="04" right="WHAT IS IN ROTATION" />
      </div>

      <div className="mt-8 sm:mt-12">
        <Marquee text="THE TOOLS I KEEP" solid="TOOLS" speed={300} />
      </div>

      <div className="shell mt-10 grid gap-12 sm:mt-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <div
            className="relative aspect-[4/5] w-full max-w-sm overflow-hidden border"
            style={{ borderColor: "var(--rail)", background: "var(--pit)" }}
          >
            <Halftone
              src="/media/player.jpg"
              cell={5}
              mode="duotone"
              fill="var(--blaze)"
              anchor={[0.5, 0.05]}
              className="h-full w-full"
            />
          </div>
          <p
            className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed"
            style={{ color: "var(--ash)" }}
          >
            {PLAYER.bio}
          </p>
          <p className="serif-it mt-4 max-w-sm text-[0.9375rem]" style={{ color: "var(--bone)" }}>
            Claude Code and Cursor are in my daily loop, and I hold an IREB CPRE certification.
            The product half of the job is not a side interest.
          </p>
        </div>

        <div>
          {ARMORY.map((g, gi) => (
            <motion.div
              key={g.group}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ duration: 0.6, delay: gi * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="border-t py-7"
              style={{ borderColor: "var(--rail)" }}
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="d text-[clamp(1.25rem,3.4vw,2.25rem)]" style={{ color: "var(--bone)" }}>
                  {g.group}
                </h3>
                <span className="mono text-[0.6875rem]" style={{ color: "var(--ash)" }}>
                  [{String(g.items.length).padStart(2, "0")}]
                </span>
              </div>
              <p className="mt-3 text-[0.9375rem] leading-relaxed" style={{ color: "var(--ash)" }}>
                {g.items.map((it, i) => (
                  <span key={it}>
                    <span
                      className="transition-colors duration-200 hover:text-[var(--blaze)]"
                      style={{ color: i < 3 ? "var(--bone)" : undefined }}
                    >
                      {it}
                    </span>
                    {i < g.items.length - 1 && <span style={{ color: "var(--rail)" }}> / </span>}
                  </span>
                ))}
              </p>
            </motion.div>
          ))}

          <div className="border-t py-7" style={{ borderColor: "var(--rail)" }}>
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="d text-[clamp(1.25rem,3.4vw,2.25rem)]" style={{ color: "var(--bone)" }}>
                CREDENTIALS
              </h3>
              <span className="mono text-[0.6875rem]" style={{ color: "var(--ash)" }}>
                [{String(CREDENTIALS.length).padStart(2, "0")}]
              </span>
            </div>
            <ul className="mt-4 space-y-2.5">
              {CREDENTIALS.map((c) => (
                <li key={c.name} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <span className="text-[0.9375rem]" style={{ color: "var(--bone)" }}>
                    {c.name}
                  </span>
                  <span className="mono text-[0.6875rem]" style={{ color: "var(--ash)" }}>
                    {c.meta}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rule" />
        </div>
      </div>
    </section>
  );
}
