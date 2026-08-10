/** Section number on the left, a rule across, a short label on the right. */
export default function IndexRow({ n, right }: { n: string; right: string }) {
  return (
    <div className="index-row">
      <span className="mono text-[0.6875rem] tracking-[0.2em]" style={{ color: "var(--bone)" }}>
        {n}
      </span>
      <span className="rule flex-1" />
      <span className="meta">{right}</span>
    </div>
  );
}
