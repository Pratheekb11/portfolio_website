"use client";

export type FeedKind = "unlock" | "objective" | "intel";
export type FeedEvent = { id: number; kind: FeedKind; actor: string; verb: string; target: string };

type Listener = (e: FeedEvent) => void;

const listeners = new Set<Listener>();
const fired = new Set<string>();
let seq = 0;

/** Push a feed line. `once` key prevents the same unlock firing twice per session. */
export function pushFeed(e: Omit<FeedEvent, "id">, once?: string) {
  if (once) {
    if (fired.has(once)) return;
    fired.add(once);
  }
  const evt = { ...e, id: ++seq };
  listeners.forEach((l) => l(evt));
}

export function onFeed(l: Listener) {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}
