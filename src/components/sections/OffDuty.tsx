"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "motion/react";
import { OFF_DUTY } from "@/lib/data";
import IndexRow from "@/components/ui/IndexRow";
import Marquee from "@/components/fx/Marquee";

const ROUND_MS = 12000;
type Blip = { id: number; x: number; y: number; born: number };

function FlickTest() {
  const [running, setRunning] = useState(false);
  const [blips, setBlips] = useState<Blip[]>([]);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [reactions, setReactions] = useState<number[]>([]);
  const [left, setLeft] = useState(ROUND_MS);
  const [best, setBest] = useState<number | null>(null);

  useEffect(() => {
    const b = localStorage.getItem("flick-best");
    if (b) setBest(Number(b));
  }, []);

  const spawn = useCallback(() => {
    setBlips((prev) =>
      prev.length >= 3
        ? prev
        : [...prev, { id: Date.now() + Math.random(), x: 8 + Math.random() * 84, y: 12 + Math.random() * 76, born: performance.now() }]
    );
  }, []);

  useEffect(() => {
    if (!running) return;
    const spawner = setInterval(spawn, 620);
    const ticker = setInterval(() => setLeft((v) => Math.max(0, v - 100)), 100);
    const end = setTimeout(() => setRunning(false), ROUND_MS);
    return () => {
      clearInterval(spawner);
      clearInterval(ticker);
      clearTimeout(end);
    };
  }, [running, spawn]);

  useEffect(() => {
    if (running || left === ROUND_MS) return;
    setBlips([]);
    if (hits > Number(localStorage.getItem("flick-best") ?? 0)) {
      localStorage.setItem("flick-best", String(hits));
      setBest(hits);
    }
  }, [running, left, hits]);

  const start = () => {
    setHits(0);
    setMisses(0);
    setReactions([]);
    setLeft(ROUND_MS);
    setBlips([]);
    setRunning(true);
  };

  const hit = (b: Blip, e: React.MouseEvent) => {
    e.stopPropagation();
    setBlips((prev) => prev.filter((x) => x.id !== b.id));
    setHits((h) => h + 1);
    setReactions((r) => [...r, performance.now() - b.born]);
  };

  const avg = reactions.length ? Math.round(reactions.reduce((a, b) => a + b, 0) / reactions.length) : 0;
  const acc = hits + misses > 0 ? Math.round((hits / (hits + misses)) * 100) : 100;

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h3 className="d text-[clamp(1.5rem,4vw,2.5rem)]" style={{ color: "var(--bone)" }}>
            FLICK TEST
          </h3>
          <p className="serif-it mt-1 text-[0.9375rem]" style={{ color: "var(--ash)" }}>
            Twelve seconds. Click the targets. Your best is saved.
          </p>
        </div>
        <div className="text-right">
          <div className="d text-[clamp(1.5rem,4vw,2.5rem)]" style={{ color: running ? "var(--blaze)" : "var(--ash)" }}>
            {(left / 1000).toFixed(1)}
          </div>
          <div className="meta">{best !== null ? `BEST ${best}` : "SECONDS"}</div>
        </div>
      </div>

      <div
        onClick={() => running && setMisses((m) => m + 1)}
        data-target
        className="relative mt-5 aspect-[16/9] w-full overflow-hidden border"
        style={{
          borderColor: running ? "var(--blaze)" : "var(--rail)",
          background: "var(--pit)",
          backgroundImage:
            "linear-gradient(to right, rgba(255,90,31,.13) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,90,31,.13) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      >
        {blips.map((b) => (
          <button
            key={b.id}
            onClick={(e) => hit(b, e)}
            aria-label="target"
            className="absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              background: "color-mix(in oklab, var(--blaze) 26%, transparent)",
              border: "2px solid var(--blaze)",
              animation: "blipIn 140ms ease-out",
            }}
          />
        ))}

        {!running && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-4 text-center"
            style={{ background: "color-mix(in oklab, var(--pit) 80%, transparent)" }}
          >
            {left < ROUND_MS && (
              <p className="mono text-[0.8125rem]" style={{ color: "var(--bone)" }}>
                {hits} hits · {acc}% accuracy · {avg}ms average
              </p>
            )}
            <button
              onClick={start}
              className="mono px-5 py-3 text-[0.6875rem] font-bold tracking-[0.18em]"
              style={{ background: "var(--blaze)", color: "var(--void)", border: 0 }}
            >
              {left < ROUND_MS ? "RUN IT AGAIN" : "START"}
            </button>
          </div>
        )}
      </div>

      <div className="mt-5 grid grid-cols-3 border-t pt-5" style={{ borderColor: "var(--rail)" }}>
        {[
          ["HITS", String(hits)],
          ["ACCURACY", `${acc}%`],
          ["REACTION", avg ? `${avg}ms` : "—"],
        ].map(([k, v]) => (
          <div key={k}>
            <div className="d text-[clamp(1.25rem,3vw,2rem)]" style={{ color: "var(--blaze)" }}>
              {v}
            </div>
            <div className="meta mt-1">{k}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function OffDuty() {
  return (
    <section id="offduty" className="relative w-full py-20 sm:py-28">
      <div className="shell">
        <IndexRow n="04" right="OUTSIDE THE EDITOR" />
      </div>

      <div className="mt-8 sm:mt-12">
        <Marquee text="OFF DUTY HOURS" solid="OFF" speed={260} />
      </div>

      <div className="shell mt-10 grid gap-12 sm:mt-16 lg:grid-cols-2 lg:gap-16">
        <div>
          {OFF_DUTY.map((o, i) => (
            <motion.div
              key={o.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group border-t py-7"
              style={{ borderColor: "var(--rail)" }}
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3
                  className="d text-[clamp(1.5rem,4.5vw,3rem)] transition-colors duration-300 group-hover:text-[var(--blaze)]"
                  style={{ color: "var(--bone)" }}
                >
                  {o.title}
                </h3>
                <span className="meta shrink-0">{o.kind}</span>
              </div>
              <p className="serif-it mt-3 max-w-md text-[1rem] leading-relaxed" style={{ color: "var(--ash)" }}>
                {o.line}
              </p>
            </motion.div>
          ))}
          <div className="rule" />
        </div>

        <FlickTest />
      </div>
    </section>
  );
}
