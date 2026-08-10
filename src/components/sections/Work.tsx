"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MISSIONS } from "@/lib/data";
import IndexRow from "@/components/ui/IndexRow";

export default function Work() {
  const [open, setOpen] = useState<string | null>(MISSIONS[0].id);

  return (
    <section id="work" className="relative w-full py-20 sm:py-28">
      <div className="shell">
        <IndexRow n="01" />

        <ul className="mt-8 space-y-3 sm:mt-12">
          {MISSIONS.map((m, i) => {
            const on = open === m.id;
            return (
              <motion.li
                key={m.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="card card-invert overflow-hidden"
                style={on ? { borderColor: "color-mix(in oklab, var(--blaze) 45%, var(--rail))" } : undefined}
              >
                <button
                  onClick={() => setOpen(on ? null : m.id)}
                  aria-expanded={on}
                  className="grid w-full grid-cols-1 gap-4 p-5 text-left sm:grid-cols-[8.5rem_1fr_auto] sm:gap-6 sm:p-7"
                  style={{ background: "transparent", border: 0 }}
                >
                  <div className="mono flex gap-4 text-[0.625rem] leading-relaxed tracking-[0.16em] sm:flex-col sm:gap-0">
                    <span style={{ color: on ? "var(--c-accent)" : "var(--c-title)" }}>
                      {String(i + 1).padStart(3, "0")}
                    </span>
                    <span style={{ color: "var(--c-body)" }}>
                      {m.period.replace(" to ", " / ").toUpperCase()}
                    </span>
                    <span className="hidden sm:inline" style={{ color: "var(--c-body)" }}>
                      BOSCH
                    </span>
                  </div>

                  <div className="min-w-0">
                    <h3
                      className="d text-[clamp(1.5rem,4.6vw,3rem)] transition-colors duration-300"
                      style={{ color: on ? "var(--c-accent)" : "var(--c-title)" }}
                    >
                      {m.op}
                    </h3>
                    <p className="serif-it mt-2 text-[0.9375rem]" style={{ color: "var(--c-body)" }}>
                      {m.short}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-baseline gap-4 sm:flex-col sm:items-end sm:gap-1">
                    <span className="d text-[clamp(1.25rem,3vw,2rem)]" style={{ color: "var(--c-title)" }}>
                      {m.metric.value}
                    </span>
                    <span className="meta" style={{ fontSize: "0.5625rem" }}>
                      {m.metric.label}
                    </span>
                    <span
                      className="mono ml-auto text-[0.6875rem] sm:ml-0 sm:mt-2"
                      style={{ color: "var(--c-accent)" }}
                    >
                      {on ? "CLOSE −" : "DETAIL +"}
                    </span>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="border-t px-5 pb-7 pt-6 sm:px-7" style={{ borderColor: "var(--c-line)" }}>
                        <div className="grid gap-7 lg:grid-cols-3">
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
                                  style={{ background: j === 2 ? "var(--c-accent)" : "var(--c-line)" }}
                                />
                                <span className="meta">{k}</span>
                              </div>
                              <p
                                className="mt-3 text-[0.9375rem] leading-relaxed"
                                style={{ color: j === 0 ? "var(--c-body)" : "var(--c-title)" }}
                              >
                                {v}
                              </p>
                            </div>
                          ))}
                        </div>
                        <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
                          {m.stack.map((s) => (
                            <span key={s} className="meta">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
