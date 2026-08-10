"use client";

import { animate } from "motion/react";
import { useEffect, useMemo } from "react";
import useOnScreen from "./useOnScreen";

const PARTS = /^(\D*?)(\d+)(.*)$/;

/** Counts the number inside a label up on first sight. "+25%" counts the 25.
    Writes straight to the node, so ticking never re-renders React. */
export default function Counter({ value, className }: { value: string; className?: string }) {
  const [ref, seen] = useOnScreen<HTMLSpanElement>("-12% 0px -12% 0px");
  const parts = useMemo(() => value.match(PARTS), [value]);

  useEffect(() => {
    const node = ref.current;
    if (!node || !parts) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!seen) {
      node.textContent = `${parts[1]}0${parts[3]}`;
      return;
    }
    const controls = animate(0, Number(parts[2]), {
      duration: 1.15,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.textContent = `${parts[1]}${Math.round(v)}${parts[3]}`;
      },
    });
    return () => controls.stop();
  }, [seen, parts, ref]);

  return (
    <span
      ref={ref}
      className={className}
      style={{
        display: "inline-block",
        minWidth: `${value.length}ch`,
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {value}
    </span>
  );
}
