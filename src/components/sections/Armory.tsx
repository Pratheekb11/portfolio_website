import { ARMORY, CREDENTIALS } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";

export default function Armory() {
  return (
    <section id="armory" className="relative mx-auto w-full max-w-6xl px-4 py-24 sm:px-8 sm:py-32">
      <SectionHeader
        index="03"
        kicker="ARMORY"
        title="TOOLS I ACTUALLY USE"
        blurb="Not a list of everything I've touched. This is what's in rotation."
      />

      <div className="grid gap-5 lg:grid-cols-3">
        {ARMORY.map((g, gi) => (
          <Reveal key={g.group} delay={gi * 0.07}>
            <div className="panel h-full p-5 sm:p-6">
              <div className="flex items-center gap-2.5">
                <span className="block h-2.5 w-2.5" style={{ background: g.accent, clipPath: "polygon(50% 0,100% 50%,50% 100%,0 50%)" }} />
                <h3 className="t-data text-[0.75rem] font-bold tracking-[0.2em]" style={{ color: "var(--hud)" }}>
                  {g.group}
                </h3>
              </div>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {g.items.map((it) => (
                  <li
                    key={it}
                    className="panel-sm border px-2.5 py-1.5 text-[0.8125rem] transition-colors duration-200 hover:border-current"
                    style={{ borderColor: "var(--rail)", color: "var(--ghost)", background: "var(--deck-2)" }}
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="panel mt-5 p-5 sm:p-6">
          <h3 className="t-data text-[0.75rem] font-bold tracking-[0.2em]" style={{ color: "var(--hud)" }}>
            CREDENTIALS
          </h3>
          <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {CREDENTIALS.map((c) => (
              <li key={c.name} className="flex items-baseline justify-between gap-4 border-b pb-2.5" style={{ borderColor: "var(--rail)" }}>
                <span className="text-[0.875rem]" style={{ color: "var(--hud)" }}>
                  {c.name}
                </span>
                <span className="t-data shrink-0 text-[0.6875rem]" style={{ color: "var(--ghost)" }}>
                  {c.meta}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
