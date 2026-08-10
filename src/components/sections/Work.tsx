"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MISSIONS } from "@/lib/data";
import IndexRow from "@/components/ui/IndexRow";
import Marquee from "@/components/fx/Marquee";

export default function Work() {
  const [open, setOpen] = useState<string | null>(MISSIONS[0].id);

  return (
    <section id="work" className="relative w-full py-20 sm:py-28">
      <div className="shell">
        <IndexRow n="01" right="WHAT I BUILT AT BOSCH" />
      </div>

      <div className="mt-8 sm:mt-12">
        <Marquee text="SHIPPED IN PRODUCTION" solid="SHIPPED" />
      </div>

      <div className="shell mt-10 sm:mt-16">
        <ul>
          {MISSIONS.map((m, i) => {
            const on = open === m.id;
            return (
              <motion.li
                key={m.id}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12%" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="border-t"
                style={{ borderColor: "var(--rail)" }}
              >
                <button
                  data-target
                  onClick={() => setOpen(on ? null : m.id)}
                  aria-expanded={on}
                  className="group flex w-full items-start justify-between gap-6 py-6 text-left sm:items-end sm:py-8"
                  style={{ background: "transparent", border: 0 }}
                >
                  <div className="min-w-0">
                    <span
                      className="mono block text-[0.625rem] tracking-[0.2em]"
                      style={{ color: on ? "var(--blaze)" : "var(--ash)" }}
                    >
                      {String(i + 1).padStart(3, "0")}
                    </span>
                    <h3
                      className="d mt-2 text-[clamp(1.75rem,6.5vw,4.5rem)] transition-colors duration-300"
                      style={{ color: on ? "var(--blaze)" : "var(--bone)" }}
                    >
                      {m.op}
                    </h3>
                    <p className="serif-it mt-2 text-[0.9375rem] sm:text-[1.0625rem]" style={{ color: "var(--ash)" }}>
                      {m.short}
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-2 pt-1">
                    <span className="mono text-[0.6875rem] tracking-[0.14em]" style={{ color: "var(--ash)" }}>
                      [{m.period.replace(" — ", "–").replace("Present", "NOW").toUpperCase()}]
                    </span>
                    <span
                      className="d text-[clamp(1.25rem,3.5vw,2.25rem)]"
                      style={{ color: on ? "var(--bone)" : "var(--ash)" }}
                    >
                      {m.metric.value}
                    </span>
                    <span className="meta" style={{ fontSize: "0.5625rem" }}>
                      {m.metric.label}
                    </span>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-8 pb-10 lg:grid-cols-3">
                        {(
                          [
                            ["THE FRICTION", m.objective],
                            ["WHAT I BUILT", m.engagement],
                            ["WHAT CHANGED", m.outcome],
                          ] as const
                        ).map(([k, v], j) => (
                          <div key={k}>
                            <div className="flex items-center gap-2">
                              <span
                                className="inline-block h-1.5 w-1.5"
                                style={{ background: j === 2 ? "var(--blaze)" : "var(--rail)" }}
                              />
                              <span className="meta">{k}</span>
                            </div>
                            <p
                              className="mt-3 text-[0.9375rem] leading-relaxed sm:text-[1rem]"
                              style={{ color: j === 0 ? "var(--ash)" : "var(--bone)" }}
                            >
                              {v}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-x-6 gap-y-2 pb-10">
                        {m.stack.map((s) => (
                          <span key={s} className="meta">
                            {s}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
        <div className="rule" />
      </div>
    </section>
  );
}
