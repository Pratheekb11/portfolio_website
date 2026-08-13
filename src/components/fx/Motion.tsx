"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Honours "reduce motion" at the OS level: transforms are dropped and only
    opacity is animated. CSS alone cannot stop JS-driven animation. */
export default function Motion({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
