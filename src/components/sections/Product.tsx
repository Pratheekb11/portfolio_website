"use client";

import { motion } from "motion/react";
import { PRODUCT } from "@/lib/data";
import IndexRow from "@/components/ui/IndexRow";
import Counter from "@/components/ui/Counter";
import Scramble from "@/components/ui/Scramble";

export default function Product() {
  return (
    <section id="product" className="relative w-full py-14 sm:py-28">
      <div className="shell">
        <IndexRow n="02" right="HOW I DECIDE WHAT TO BUILD" />

        <div className="mt-8 grid gap-7 sm:mt-14 sm:gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div className="lg:sticky lg:top-[calc(var(--chrome-top)+3rem)] lg:self-start">
            <h2 className="d text-[clamp(2rem,8vw,4rem)]" style={{ color: "var(--bone)" }}>
              <Scramble text="I WANT THE" />
              <span className="block" style={{ color: "var(--blaze)" }}>
                <Scramble text="PRODUCT SEAT" speed={38} />
              </span>
            </h2>
            <p className="serif-it mt-5 max-w-md text-[1rem] leading-relaxed" style={{ color: "var(--ash)" }}>
              Engineering is how I build. Product is why I build. The work below is the half of my
              job that starts before any code exists, and it is the half I want to grow into.
            </p>
          </div>

          <div className="space-y-3">
            {PRODUCT.map((p, i) => (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="card card-invert p-5 sm:p-8"
              >
                {/* the figure sits beside the title on a wide screen and drops
                    under it on a phone, where side by side squeezes both */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <div className="min-w-0">
                    <span className="mono text-[0.625rem] tracking-[0.2em]" style={{ color: "var(--c-accent)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="d mt-2 text-[clamp(1.375rem,5.5vw,2rem)]" style={{ color: "var(--c-title)" }}>
                      {p.title}
                    </h3>
                  </div>
                  <div className="flex shrink-0 items-baseline gap-2.5 sm:block sm:text-right">
                    <div className="d text-[clamp(1.25rem,5vw,2rem)]" style={{ color: "var(--c-accent)" }}>
                      <Counter value={p.figure.value} />
                    </div>
                    <div className="meta sm:mt-1" style={{ fontSize: "0.5625rem" }}>
                      {p.figure.label}
                    </div>
                  </div>
                </div>

                <p className="serif-it mt-4 text-[1rem] leading-relaxed" style={{ color: "var(--c-title)" }}>
                  {p.lead}
                </p>
                <p className="mt-3 text-[0.9375rem] leading-relaxed" style={{ color: "var(--c-body)" }}>
                  {p.body}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
