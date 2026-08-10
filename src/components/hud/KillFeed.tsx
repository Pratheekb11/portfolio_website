"use client";

import { useEffect, useState } from "react";
import { onFeed, type FeedEvent } from "./feed";

const TINT: Record<FeedEvent["kind"], string> = {
  unlock: "var(--signal)",
  objective: "var(--comms)",
  intel: "var(--sand)",
};

/* Bottom-right feed. Reads like a match kill feed; carries progress
   through the page so scrolling has consequences. */
export default function KillFeed() {
  const [items, setItems] = useState<FeedEvent[]>([]);
  const [past, setPast] = useState(false);

  // The hero owns the bottom-right corner. Feed starts once you leave it.
  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(
    () =>
      onFeed((e) => {
        setItems((prev) => [...prev, e].slice(-2));
        setTimeout(() => setItems((prev) => prev.filter((i) => i.id !== e.id)), 4200);
      }),
    []
  );

  if (!past) return null;

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed bottom-16 right-3 z-40 flex w-[min(90vw,21rem)] flex-col items-end gap-1 sm:bottom-14 sm:right-5"
    >
      {items.map((i) => (
        <div
          key={i.id}
          className="panel-sm flex items-center gap-2 border px-2.5 py-1.5 text-[0.6875rem]"
          style={{
            background: "var(--deck-2)",
            borderColor: "color-mix(in oklab, " + TINT[i.kind] + " 45%, var(--rail))",
            animation: "feedIn 220ms cubic-bezier(.2,.9,.3,1)",
          }}
        >
          <span className="t-data font-bold tracking-wider" style={{ color: "var(--hud)" }}>
            {i.actor}
          </span>
          <span
            className="t-data uppercase tracking-[0.16em]"
            style={{ color: TINT[i.kind], fontSize: "0.625rem" }}
          >
            {i.verb}
          </span>
          <span className="t-data tracking-wide" style={{ color: "var(--ghost)" }}>
            {i.target}
          </span>
        </div>
      ))}
    </div>
  );
}
