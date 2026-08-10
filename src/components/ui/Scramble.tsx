"use client";

import { useEffect } from "react";
import useOnScreen from "./useOnScreen";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/#*";

/** Headings decode into place the first time they are seen.
    Writes straight to the node so the shuffle never re-renders React. */
export default function Scramble({
  text,
  className,
  style,
  speed = 32,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  speed?: number;
}) {
  const [ref, seen] = useOnScreen<HTMLSpanElement>("-12% 0px -12% 0px");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!seen) return;

    let frame = 0;
    const total = text.length * 2 + 8;
    const id = setInterval(() => {
      frame += 1;
      const settled = Math.floor(frame / 2);
      node.textContent = text
        .split("")
        .map((ch, i) => (ch === " " || i < settled ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
        .join("");
      if (frame >= total) {
        clearInterval(id);
        node.textContent = text;
      }
    }, speed);
    return () => clearInterval(id);
  }, [seen, text, speed, ref]);

  return (
    <span ref={ref} className={className} style={style}>
      {text}
    </span>
  );
}
