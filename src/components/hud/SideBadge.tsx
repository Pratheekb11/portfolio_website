/* Pinned to the right edge, the way a certification seal sits on a page. */
export default function SideBadge() {
  return (
    <aside
      className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 select-none flex-col items-center overflow-hidden xl:flex"
      style={{ background: "var(--bone)", color: "var(--void)", borderRadius: "8px 0 0 8px" }}
    >
      <span className="d px-3 pb-1 pt-3 text-[1.25rem] leading-none">IREB</span>
      <span
        className="mono px-3 pb-4 pt-2 text-[0.625rem] tracking-[0.18em]"
        style={{ writingMode: "vertical-rl" }}
      >
        CPRE CERTIFIED
      </span>
    </aside>
  );
}
