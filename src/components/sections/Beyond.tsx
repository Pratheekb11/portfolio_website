"use client";

import { motion } from "motion/react";
import { OFF_DUTY } from "@/lib/data";
import IndexRow from "@/components/ui/IndexRow";

export default function Beyond() {
  return (
    <section id="beyond" className="relative w-full py-20 sm:py-28">
      <div className="shell">
        <IndexRow n="04" right="AWAY FROM THE EDITOR" />

        <div className="mt-10 grid gap-10 sm:mt-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <h2 className="d text-[clamp(2rem,6vw,4rem)]" style={{ color: "var(--bone)" }}>
            WHAT I DO
            <span className="block" style={{ color: "var(--blaze)" }}>
              WITH THE REST
            </span>
          </h2>

          <div className="space-y-3">
            {OFF_DUTY.map((o, i) => (
              <motion.div
                key={o.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="card card-invert p-6 sm:p-7"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="d text-[clamp(1.25rem,3.4vw,2.25rem)]" style={{ color: "var(--c-title)" }}>
                    {o.title}
                  </h3>
                  <span className="meta shrink-0">{o.kind}</span>
                </div>
                <p className="mt-3 max-w-lg text-[0.9375rem] leading-relaxed" style={{ color: "var(--c-body)" }}>
                  {o.line}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
