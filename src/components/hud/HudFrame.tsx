"use client";

import { useEffect, useState } from "react";
import { SECTIONS, PLAYER } from "@/lib/data";
import { pushFeed } from "./feed";

function useSessionClock() {
  const [t, setT] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setT((v) => v + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const m = String(Math.floor(t / 60)).padStart(2, "0");
  const s = String(t % 60).padStart(2, "0");
  return `${m}:${s}`;
}

export default function HudFrame() {
  const clock = useSessionClock();
  const [active, setActive] = useState(SECTIONS[0].id);
  const [progress, setProgress] = useState(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const move = (e: PointerEvent) =>
      setPointer({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!vis) return;
        const id = vis.target.id;
        setActive(id);
        const label = SECTIONS.find((s) => s.id === id)?.label ?? id;
        pushFeed({ kind: "objective", actor: PLAYER.callsign, verb: "reached", target: label }, `sector:${id}`);
      },
      { threshold: [0, 0.15, 0.4], rootMargin: "-45% 0px -45% 0px" }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  const pct = Math.round(progress * 100);

  return (
    <>
      {/* corner brackets — the frame of the game client */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-30">
        {(["left-3 top-12 border-l border-t", "right-3 top-12 border-r border-t", "left-3 bottom-12 border-l border-b", "right-3 bottom-12 border-r border-b"] as const).map(
          (c) => (
            <span key={c} className={`absolute h-5 w-5 ${c}`} style={{ borderColor: "var(--rail)" }} />
          )
        )}
      </div>

      {/* top status bar */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-10 items-center justify-between gap-3 border-b px-3 sm:px-5"
        style={{ borderColor: "var(--rail)", background: "color-mix(in oklab, var(--void) 82%, transparent)", backdropFilter: "blur(10px)" }}>
        <a href="#player" className="flex items-center gap-2.5 no-underline">
          <span className="block h-3 w-3" style={{ background: "var(--signal)", clipPath: "polygon(50% 0,100% 50%,50% 100%,0 50%)" }} />
          <span className="t-data text-[0.6875rem] font-bold tracking-[0.2em]" style={{ color: "var(--hud)" }}>
            {PLAYER.handle}
          </span>
          <span className="t-label hidden sm:inline" style={{ fontSize: "0.625rem" }}>
            {PLAYER.class}
          </span>
        </a>
        <div className="flex items-center gap-3 sm:gap-5">
          <span className="t-data hidden items-center gap-1.5 text-[0.6875rem] sm:flex" style={{ color: "var(--pitch)" }}>
            <span className="block h-1.5 w-1.5 rounded-full blink" style={{ background: "var(--pitch)" }} />
            LIVE
          </span>
          <span className="t-data hidden text-[0.6875rem] md:inline" style={{ color: "var(--ghost)" }}>
            CRSR <span style={{ color: "var(--sand)" }}>{pointer.x.toFixed(3)}</span> /{" "}
            <span style={{ color: "var(--sand)" }}>{pointer.y.toFixed(3)}</span>
          </span>
          <span className="t-data text-[0.6875rem]" style={{ color: "var(--ghost)" }}>
            SESSION <span style={{ color: "var(--sand)" }}>{clock}</span>
          </span>
        </div>
      </header>

      {/* right rail: sector nav */}
      <nav
        aria-label="Sections"
        className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-2.5 lg:flex"
      >
        {SECTIONS.map((s) => {
          const on = active === s.id;
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="group flex items-center gap-2 no-underline"
              aria-current={on ? "true" : undefined}
            >
              <span
                className="t-data text-[0.625rem] tracking-[0.18em] transition-all duration-200"
                style={{ color: on ? "var(--sand)" : "var(--ghost)", opacity: on ? 1 : 0.35 }}
              >
                {s.label}
              </span>
              <span
                className="block transition-all duration-200"
                style={{
                  width: on ? 22 : 12,
                  height: 2,
                  background: on ? "var(--signal)" : "var(--rail)",
                }}
              />
            </a>
          );
        })}
      </nav>

      {/* bottom status bar */}
      <footer
        className="fixed inset-x-0 bottom-0 z-40 flex h-10 items-center justify-between gap-4 border-t px-3 sm:px-5"
        style={{ borderColor: "var(--rail)", background: "color-mix(in oklab, var(--void) 82%, transparent)", backdropFilter: "blur(10px)" }}
      >
        <span className="t-data text-[0.6875rem] tracking-[0.18em]" style={{ color: "var(--ghost)" }}>
          SECTOR <span style={{ color: "var(--sand)" }}>{SECTIONS.find((s) => s.id === active)?.label}</span>
        </span>
        <div className="flex flex-1 items-center gap-2.5">
          <div className="relative h-[3px] flex-1" style={{ background: "var(--rail)" }}>
            <div
              className="absolute inset-y-0 left-0"
              style={{ width: `${pct}%`, background: "var(--signal)", transition: "width 90ms linear" }}
            />
          </div>
          <span className="t-data w-9 text-right text-[0.6875rem]" style={{ color: "var(--sand)" }}>
            {pct}%
          </span>
        </div>
      </footer>
    </>
  );
}
