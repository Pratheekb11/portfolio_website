"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { OFF_DUTY, PLAYER } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import { pushFeed } from "@/components/hud/feed";

const ROUND_MS = 12000;

type Blip = { id: number; x: number; y: number; born: number };

function FlickTest() {
  const arena = useRef<HTMLDivElement>(null);
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
    setBlips((prev) => {
      if (prev.length >= 3) return prev;
      return [
        ...prev,
        { id: Date.now() + Math.random(), x: 8 + Math.random() * 84, y: 12 + Math.random() * 76, born: performance.now() },
      ];
    });
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
    if (hits > 0) {
      const stored = Number(localStorage.getItem("flick-best") ?? 0);
      if (hits > stored) {
        localStorage.setItem("flick-best", String(hits));
        setBest(hits);
        pushFeed({ kind: "unlock", actor: "you", verb: "set record", target: `${hits} HITS` });
      }
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
    <div className="panel flex h-full flex-col p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="t-data text-[0.75rem] font-bold tracking-[0.2em]" style={{ color: "var(--hud)" }}>
            FLICK TEST
          </h3>
          <p className="t-label mt-1" style={{ fontSize: "0.5625rem" }}>
            12 SECONDS · CLICK THE TARGETS
          </p>
        </div>
        <div className="text-right">
          <div className="t-data text-lg font-bold" style={{ color: running ? "var(--signal)" : "var(--ghost)" }}>
            {(left / 1000).toFixed(1)}s
          </div>
          {best !== null && (
            <div className="t-label" style={{ fontSize: "0.5625rem" }}>
              BEST {best}
            </div>
          )}
        </div>
      </div>

      <div
        ref={arena}
        onClick={() => running && setMisses((m) => m + 1)}
        data-target
        className="relative mt-4 aspect-[16/10] w-full overflow-hidden"
        style={{
          clipPath: "var(--clip-sm)",
          background: "var(--void)",
          border: `1px solid ${running ? "var(--signal)" : "var(--rail)"}`,
          backgroundImage:
            "linear-gradient(to right, rgba(95,168,255,.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(95,168,255,.10) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      >
        {blips.map((b) => (
          <button
            key={b.id}
            onClick={(e) => hit(b, e)}
            aria-label="target"
            className="absolute h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              background: "color-mix(in oklab, var(--signal) 22%, transparent)",
              border: "2px solid var(--signal)",
              animation: "blipIn 140ms ease-out",
            }}
          />
        ))}

        {!running && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-center"
            style={{ background: "color-mix(in oklab, var(--void) 78%, transparent)" }}>
            {left < ROUND_MS && (
              <div className="t-data text-[0.75rem]" style={{ color: "var(--sand)" }}>
                {hits} hits · {acc}% accuracy · {avg}ms avg
              </div>
            )}
            <button
              onClick={start}
              className="panel-sm border px-5 py-2.5"
              style={{ borderColor: "var(--signal)", color: "var(--signal)" }}
            >
              <span className="t-data text-[0.6875rem] font-bold tracking-[0.22em]">
                {left < ROUND_MS ? "RUN AGAIN" : "START ROUND"}
              </span>
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 border-t pt-4" style={{ borderColor: "var(--rail)" }}>
        {[
          ["HITS", String(hits), "var(--signal)"],
          ["ACC", `${acc}%`, "var(--pitch)"],
          ["AVG", avg ? `${avg}ms` : "—", "var(--comms)"],
        ].map(([k, v, c]) => (
          <div key={k}>
            <div className="t-data text-base font-bold" style={{ color: c }}>
              {v}
            </div>
            <div className="t-label" style={{ fontSize: "0.5625rem" }}>
              {k}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function OffDuty() {
  return (
    <section id="offduty" className="relative mx-auto w-full max-w-6xl px-4 py-24 sm:px-8 sm:py-32">
      <SectionHeader
        index="04"
        kicker="OFF-DUTY"
        title="WHEN I'M NOT SHIPPING"
        blurb={`Same instincts, different arena. ${PLAYER.callsign} spends the rest of the week here.`}
      />

      <div className="grid gap-5 lg:grid-cols-[1fr_1.1fr]">
        <div className="flex flex-col gap-3">
          {OFF_DUTY.map((o, i) => (
            <Reveal key={o.id} delay={i * 0.07}>
              <div
                data-target
                className="panel group flex items-start gap-4 p-5 transition-colors duration-300"
                style={{ borderColor: "var(--rail)" }}
              >
                <span className="mt-1 block h-8 w-1 shrink-0" style={{ background: o.color }} />
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="t-data text-[0.8125rem] font-bold tracking-[0.16em]" style={{ color: "var(--hud)" }}>
                      {o.title}
                    </h3>
                    <span className="t-data text-[0.5625rem] tracking-[0.2em]" style={{ color: o.color }}>
                      {o.kind}
                    </span>
                  </div>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed" style={{ color: "var(--ghost)" }}>
                    {o.line}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <FlickTest />
        </Reveal>
      </div>
    </section>
  );
}
