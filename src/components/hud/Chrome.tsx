"use client";

import { useEffect, useState } from "react";
import { SECTIONS } from "@/lib/data";
import Magnetic from "@/components/ui/Magnetic";

export default function Chrome() {
  const [active, setActive] = useState(SECTIONS[0]);
  const [scrl, setScrl] = useState(0);
  const [crsr, setCrsr] = useState(0);
  const [clock, setClock] = useState("--:--:--");

  useEffect(() => {
    const tick = () =>
      setClock(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Asia/Kolkata",
        }).format(new Date())
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrl(max > 0 ? window.scrollY / max : 0);
    };
    const onMove = (e: PointerEvent) => setCrsr(e.clientY / window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!vis) return;
        const s = SECTIONS.find((x) => x.id === vis.target.id);
        if (s) setActive(s);
      },
      { threshold: [0, 0.2, 0.5], rootMargin: "-40% 0px -40% 0px" }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <>
      <header
        className="shell fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-4 border-b"
        style={{
          height: "var(--chrome-top)",
          borderColor: "var(--rail)",
          background: "color-mix(in oklab, var(--void) 88%, transparent)",
          backdropFilter: "blur(12px)",
        }}
      >
        <a href="#intro" className="flex items-baseline gap-2 no-underline">
          <span className="d text-[0.9375rem]" style={{ color: "var(--bone)" }}>
            PRATHEEK B.
          </span>
          <span className="meta hidden sm:inline">PORTFOLIO/2026</span>
        </a>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Sections">
          {SECTIONS.slice(1).map((s) => {
            const on = active.id === s.id;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="mono relative text-[0.6875rem] tracking-[0.16em] no-underline transition-colors duration-200"
                style={{ color: on ? "var(--blaze)" : "var(--ash)" }}
                aria-current={on ? "true" : undefined}
              >
                <span
                  aria-hidden
                  className="absolute -left-2.5 top-1/2 -translate-y-1/2 transition-opacity duration-200"
                  style={{ opacity: on ? 1 : 0 }}
                >
                  (
                </span>
                {s.n}/{s.label}
                <span
                  aria-hidden
                  className="absolute -bottom-1.5 left-0 h-px w-full origin-left transition-transform duration-300"
                  style={{
                    background: "var(--blaze)",
                    transform: on ? "scaleX(1)" : "scaleX(0)",
                    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
                <span
                  aria-hidden
                  className="absolute -right-2.5 top-1/2 -translate-y-1/2 transition-opacity duration-200"
                  style={{ opacity: on ? 1 : 0 }}
                >
                  )
                </span>
              </a>
            );
          })}
        </nav>

        <Magnetic strength={0.35}>
          <a
            href="#contact"
            className="mono inline-block px-3 py-1.5 text-[0.6875rem] font-bold tracking-[0.16em] no-underline"
            style={{ background: "var(--blaze)", color: "var(--void)" }}
          >
            GET IN TOUCH
          </a>
        </Magnetic>
      </header>

      <footer
        className="shell fixed inset-x-0 bottom-0 z-50 flex items-center justify-between gap-4 border-t"
        style={{
          height: "var(--chrome-bot)",
          borderColor: "var(--rail)",
          background: "color-mix(in oklab, var(--void) 88%, transparent)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="mono flex items-center gap-4 text-[0.625rem] tracking-[0.16em]" style={{ color: "var(--ash)" }}>
          <span>
            SCRL <span style={{ color: "var(--bone)" }}>{scrl.toFixed(2)}</span>
          </span>
          <span className="hidden sm:inline">
            CRSR <span style={{ color: "var(--bone)" }}>{crsr.toFixed(1)}</span>
          </span>
        </div>

        <span className="mono text-[0.625rem] tracking-[0.16em]" style={{ color: "var(--bone)" }}>
          {active.n} / {active.label}
        </span>

        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left"
          style={{ background: "var(--blaze)", transform: `scaleX(${scrl})` }}
        />
        <div className="mono flex items-center gap-4 text-[0.625rem] tracking-[0.16em]" style={{ color: "var(--ash)" }}>
          <span className="hidden items-center gap-1.5 sm:flex">
            ACCENT
            <span className="inline-block h-2.5 w-2.5" style={{ background: "var(--blaze)" }} />
            <span style={{ color: "var(--blaze)" }}>#FF5A1F</span>
          </span>
          <span style={{ color: "var(--bone)" }}>{clock} IST</span>
        </div>
      </footer>
    </>
  );
}
