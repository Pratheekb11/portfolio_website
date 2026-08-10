"use client";

import { motion } from "motion/react";

/** Segmented meter — reads as a weapon attribute, not a progress bar. */
export default function StatBar({
  value,
  color = "var(--signal)",
  segments = 20,
}: {
  value: number;
  color?: string;
  segments?: number;
}) {
  const filled = Math.round((value / 100) * segments);
  return (
    <div className="flex gap-[2px]" aria-hidden>
      {Array.from({ length: segments }).map((_, i) => (
        <motion.span
          key={i}
          className="h-2 flex-1"
          initial={{ opacity: 0.12, scaleY: 0.5 }}
          whileInView={{ opacity: i < filled ? 1 : 0.12, scaleY: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.25, delay: i * 0.018 }}
          style={{ background: i < filled ? color : "var(--rail)" }}
        />
      ))}
    </div>
  );
}
