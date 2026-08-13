"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

/* Full-bleed band of outline type that slides as you pass it.
   One word per band is filled solid: the word that carries the section. */
export default function Marquee({
  text,
  solid,
  speed = 320,
}: {
  text: string;
  solid: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [speed * 0.25, -speed]);

  const run = (key: string) => (
    <span key={key} className="flex shrink-0 items-center gap-[0.22em] pr-[0.22em]">
      {text.split(" ").map((word, i) => (
        <span
          key={`${key}-${i}`}
          style={
            word === solid
              ? { color: "var(--bone)" }
              : {
                  color: "transparent",
                  WebkitTextStroke: "1.2px color-mix(in oklab, var(--blaze) 55%, transparent)",
                }
          }
        >
          {word}
        </span>
      ))}
    </span>
  );

  return (
    <div ref={ref} className="relative w-full overflow-hidden py-2" aria-hidden>
      <motion.div
        style={{ x }}
        className="d flex w-max items-center whitespace-nowrap text-[clamp(3.25rem,15vw,13rem)] leading-[0.8]"
      >
        {run("a")}
        {run("b")}
        {run("c")}
      </motion.div>
    </div>
  );
}
