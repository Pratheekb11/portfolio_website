"use client";

import { useEffect, useRef, useState } from "react";

/* The signature interaction: the pointer becomes a weapon crosshair.
   It lerps toward the real cursor, opens up over interactive targets,
   and fires a hitmarker on click. Fine-pointer devices only. */
export default function Crosshair() {
  const dot = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const target = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });
  const [hot, setHot] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [hits, setHits] = useState<number[]>([]);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || still) return;
    setEnabled(true);
    document.body.classList.add("crosshair-on");

    const move = (e: PointerEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      const el = e.target as HTMLElement | null;
      setHot(!!el?.closest?.("a, button, [data-target]"));
    };
    const click = () => {
      const id = Date.now() + Math.random();
      setHits((h) => [...h, id]);
      setTimeout(() => setHits((h) => h.filter((x) => x !== id)), 320);
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", click);

    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.35;
      pos.current.y += (target.current.y - pos.current.y) * 0.35;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", click);
      cancelAnimationFrame(raf.current);
      document.body.classList.remove("crosshair-on");
    };
  }, []);

  if (!enabled) return null;

  const gap = hot ? 13 : 6;
  const len = hot ? 9 : 7;
  const color = hot ? "var(--signal)" : "var(--sand)";

  return (
    <div
      ref={dot}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[999]"
      style={{ willChange: "transform" }}
    >
      <div className="relative -translate-x-1/2 -translate-y-1/2">
        {/* four arms */}
        {([[0, -1], [0, 1], [-1, 0], [1, 0]] as const).map(([dx, dy], i) => (
          <span
            key={i}
            className="absolute block transition-all duration-150 ease-out"
            style={{
              background: color,
              width: dx ? len : 1.5,
              height: dy ? len : 1.5,
              transform: `translate(${dx * gap - (dx ? (dx < 0 ? len : 0) : 0.75)}px, ${
                dy * gap - (dy ? (dy < 0 ? len : 0) : 0.75)
              }px)`,
            }}
          />
        ))}
        {/* centre pip */}
        <span
          className="absolute block rounded-full transition-all duration-150"
          style={{
            width: hot ? 3 : 2,
            height: hot ? 3 : 2,
            background: color,
            transform: "translate(-50%, -50%)",
            opacity: hot ? 1 : 0.7,
          }}
        />
        {/* target brackets */}
        <span
          className="absolute block transition-all duration-200 ease-out"
          style={{
            width: 34,
            height: 34,
            transform: "translate(-50%, -50%)",
            border: `1px solid ${hot ? "var(--signal)" : "transparent"}`,
            clipPath:
              "polygon(0 0,10px 0,10px 1px,1px 1px,1px 10px,0 10px,0 0,100% 0,100% 10px,calc(100% - 1px) 10px,calc(100% - 1px) 1px,calc(100% - 10px) 1px,calc(100% - 10px) 0,100% 0,100% 100%,calc(100% - 10px) 100%,calc(100% - 10px) calc(100% - 1px),calc(100% - 1px) calc(100% - 1px),calc(100% - 1px) calc(100% - 10px),100% calc(100% - 10px),100% 100%,0 100%,0 calc(100% - 10px),1px calc(100% - 10px),1px calc(100% - 1px),10px calc(100% - 1px),10px 100%,0 100%)",
            opacity: hot ? 1 : 0,
            scale: hot ? "1" : "1.4",
          }}
        />
        {/* hitmarkers */}
        {hits.map((id) => (
          <span
            key={id}
            className="absolute"
            style={{ transform: "translate(-50%,-50%)", animation: "hitpop 300ms ease-out forwards" }}
          >
            {([45, 135, 225, 315] as const).map((deg) => (
              <span
                key={deg}
                className="absolute block"
                style={{
                  width: 1.5,
                  height: 9,
                  background: "var(--hud)",
                  transformOrigin: "center 20px",
                  transform: `rotate(${deg}deg) translateY(-16px)`,
                }}
              />
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
