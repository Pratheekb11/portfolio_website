"use client";

import useOnScreen from "./useOnScreen";

/** Section number on the left, a rule that draws across, an optional label. */
export default function IndexRow({ n, right }: { n: string; right?: string }) {
  const [ref, seen] = useOnScreen<HTMLDivElement>("-8% 0px -8% 0px");
  const ease = "cubic-bezier(0.16, 1, 0.3, 1)";

  return (
    <div ref={ref} className="index-row">
      <span
        className="mono text-[0.6875rem] tracking-[0.2em]"
        style={{
          color: "var(--bone)",
          opacity: seen ? 1 : 0,
          transform: seen ? "none" : "translateX(-8px)",
          transition: `opacity 0.4s ${ease}, transform 0.4s ${ease}`,
        }}
      >
        {n}
      </span>
      <span
        className="rule-dot flex-1"
        style={{
          transformOrigin: "left",
          transform: seen ? "scaleX(1)" : "scaleX(0)",
          transition: `transform 0.9s ${ease} 0.08s`,
        }}
      />
      {right && (
        <span
          className="meta"
          style={{
            opacity: seen ? 1 : 0,
            transition: `opacity 0.5s ${ease} 0.45s`,
          }}
        >
          {right}
        </span>
      )}
    </div>
  );
}
