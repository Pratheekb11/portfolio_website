"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PLAYER } from "@/lib/data";
import { pushFeed } from "./feed";

const LINES = [
  "init runtime .......... ok",
  "mount memory layers ... intent / decisions / deltas",
  "load agent graph ...... 6 nodes, 0 orphans",
  "index missions ........ 6 records",
  "verify loadout ........ 5 builds, 2 live",
  "handshake ............. ready",
];

export default function BootSequence({ children }: { children: React.ReactNode }) {
  const [booted, setBooted] = useState(true); // assume booted until we know otherwise
  const [step, setStep] = useState(0);
  const [ready, setReady] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const seen = sessionStorage.getItem("booted") === "1";
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || still) {
      setBooted(true);
      return;
    }
    setBooted(false);
    document.body.style.overflow = "hidden";
    LINES.forEach((_, i) => {
      timers.current.push(
        window.setTimeout(() => {
          setStep(i + 1);
          if (i === LINES.length - 1) setReady(true);
        }, 260 + i * 190)
      );
    });
    return () => {
      timers.current.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  const start = useCallback(() => {
    sessionStorage.setItem("booted", "1");
    document.body.style.overflow = "";
    setBooted(true);
    pushFeed({ kind: "unlock", actor: PLAYER.callsign, verb: "deployed", target: "PORTFOLIO" }, "boot");
  }, []);

  useEffect(() => {
    if (booted) return;
    const key = () => (ready ? start() : setStep(LINES.length));
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [booted, ready, start]);

  return (
    <>
      {!booted && (
        <div
          className="fixed inset-0 z-[500] flex flex-col items-center justify-center px-6"
          style={{ background: "var(--void)" }}
        >
          <div className="w-full max-w-lg">
            <div className="mb-6 flex items-baseline justify-between border-b pb-3" style={{ borderColor: "var(--rail)" }}>
              <span className="t-display text-2xl" style={{ color: "var(--sand)" }}>
                {PLAYER.handle}
              </span>
              <span className="t-label">{PLAYER.class}</span>
            </div>
            <div className="t-data space-y-1 text-[0.75rem] leading-relaxed" style={{ color: "var(--ghost)" }}>
              {LINES.slice(0, step).map((l) => {
                const [k, v] = l.split(/\s\.+\s/);
                return (
                  <div key={l} className="flex gap-2">
                    <span style={{ color: "var(--comms)" }}>›</span>
                    <span className="flex-1">{k}</span>
                    <span style={{ color: "var(--pitch)" }}>{v}</span>
                  </div>
                );
              })}
              {step < LINES.length && <span className="blink" style={{ color: "var(--signal)" }}>█</span>}
            </div>

            <button
              onClick={start}
              disabled={!ready}
              className="panel-sm mt-8 w-full border py-3 text-center transition-colors duration-200 disabled:opacity-30"
              style={{
                borderColor: ready ? "var(--signal)" : "var(--rail)",
                background: "transparent",
                color: ready ? "var(--signal)" : "var(--ghost)",
              }}
            >
              <span className="t-data text-[0.75rem] font-bold tracking-[0.3em]">
                {ready ? "PRESS START" : "LOADING"}
              </span>
            </button>
            <p className="t-label mt-3 text-center" style={{ fontSize: "0.625rem" }}>
              or hit any key
            </p>
          </div>
        </div>
      )}
      {children}
    </>
  );
}
