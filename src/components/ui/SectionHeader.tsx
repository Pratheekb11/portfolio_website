import Reveal from "./Reveal";

export default function SectionHeader({
  index,
  kicker,
  title,
  blurb,
}: {
  index: string;
  kicker: string;
  title: string;
  blurb?: string;
}) {
  return (
    <header className="relative mb-10 sm:mb-14">
      <span
        aria-hidden
        className="t-display pointer-events-none absolute -top-6 left-0 select-none whitespace-nowrap text-[clamp(4rem,14vw,10rem)] leading-none"
        style={{
          color: "transparent",
          WebkitTextStroke: "1px var(--rail)",
          opacity: 0.5,
          maskImage: "linear-gradient(to bottom, #000 10%, transparent 78%)",
        }}
      >
        {kicker}
      </span>
      <div className="relative">
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="t-data text-[0.6875rem] tracking-[0.2em]" style={{ color: "var(--signal)" }}>
            {index}
          </span>
          <span className="t-label">{kicker}</span>
          <span className="h-px flex-1" style={{ background: "var(--rail)" }} />
        </div>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="t-display mt-3 text-[clamp(2rem,6vw,3.75rem)]" style={{ color: "var(--hud)" }}>
          {title}
        </h2>
      </Reveal>
      {blurb && (
        <Reveal delay={0.12}>
          <p className="mt-4 max-w-2xl text-[0.9375rem] leading-relaxed" style={{ color: "var(--ghost)" }}>
            {blurb}
          </p>
        </Reveal>
      )}
      </div>
    </header>
  );
}
