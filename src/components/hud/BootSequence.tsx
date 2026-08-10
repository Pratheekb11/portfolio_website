"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* A loader, not a cutscene: a counter runs to 100 while the page settles,
   then the panel splits and gets out of the way. Once per session. */
export default function BootSequence({ children }: { children: React.ReactNode }) {
  const [booted, setBooted] = useState(true);
  const [pct, setPct] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const raf = useRef(0);

  useEffect(() => {
    const seen = sessionStorage.getItem("booted") === "1";
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || still) return;

    setBooted(false);
    document.body.style.overflow = "hidden";

    const start = performance.now();
    const DUR = 1500;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / DUR);
      // ease out so the last numbers land slowly, like a real load
      setPct(Math.round((1 - Math.pow(1 - p, 2.2)) * 100));
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else finish();
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf.current);
      document.body.style.overflow = "";
    };
  }, []);

  const finish = useCallback(() => {
    sessionStorage.setItem("booted", "1");
    setLeaving(true);
    setTimeout(() => {
      document.body.style.overflow = "";
      setBooted(true);
    }, 720);
  }, []);

  return (
    <>
      {!booted && (
        <div className="fixed inset-0 z-[500] overflow-hidden" aria-hidden>
          {/* two halves that part when loading completes */}
          {([0, 1] as const).map((half) => (
            <div
              key={half}
              className="absolute inset-x-0 h-1/2 transition-transform duration-700"
              style={{
                background: "var(--void)",
                top: half === 0 ? 0 : "50%",
                transform: leaving ? `translateY(${half === 0 ? "-100%" : "100%"})` : "translateY(0)",
                transitionTimingFunction: "cubic-bezier(0.76, 0, 0.24, 1)",
              }}
            />
          ))}

          <div
            className="shell absolute inset-0 flex flex-col justify-end pb-10 transition-opacity duration-300"
            style={{ opacity: leaving ? 0 : 1 }}
          >
            <div className="flex items-end justify-between gap-6">
              <span className="d text-[clamp(2rem,9vw,7rem)]" style={{ color: "var(--bone)" }}>
                PRATHEEK B.
              </span>
              <span className="d text-[clamp(2rem,9vw,7rem)]" style={{ color: "var(--blaze)" }}>
                {String(pct).padStart(3, "0")}
              </span>
            </div>
            <div className="mt-6 h-px w-full" style={{ background: "var(--rail)" }}>
              <div
                className="h-full"
                style={{ width: `${pct}%`, background: "var(--blaze)" }}
              />
            </div>
          </div>
        </div>
      )}
      {children}
    </>
  );
}
