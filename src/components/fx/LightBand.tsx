"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

/* One light strip breaking the black. It slides past as you scroll,
   the way a client-logo band would. */
export default function LightBand({ items }: { items: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -520]);

  const run = (key: string) => (
    <span key={key} className="flex shrink-0 items-center">
      {items.map((it, i) => (
        <span key={`${key}-${i}`} className="flex items-center">
          <span className="d px-7 text-[clamp(1.125rem,2.4vw,1.75rem)] sm:px-10">{it}</span>
          <span
            aria-hidden
            className="h-1.5 w-1.5 rotate-45"
            style={{ background: "#0B0B0C", opacity: 0.35 }}
          />
        </span>
      ))}
    </span>
  );

  return (
    <div ref={ref} className="w-full overflow-hidden py-7 sm:py-9" style={{ background: "#ECE9E4" }}>
      <motion.div style={{ x, color: "#0B0B0C" }} className="flex w-max items-center whitespace-nowrap">
        {run("a")}
        {run("b")}
      </motion.div>
    </div>
  );
}
