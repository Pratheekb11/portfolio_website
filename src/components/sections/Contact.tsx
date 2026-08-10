import { PLAYER } from "@/lib/data";
import IndexRow from "@/components/ui/IndexRow";

const LINKS = [
  { label: "EMAIL", value: PLAYER.email, href: `mailto:${PLAYER.email}` },
  { label: "LINKEDIN", value: "in/bpratheek", href: PLAYER.linkedin },
  { label: "GITHUB", value: "Pratheekb11", href: PLAYER.github },
  { label: "RESUME", value: "One page, PDF", href: "/media/Pratheek_B_Resume.pdf" },
];

export default function Contact() {
  return (
    <section id="contact" className="relative w-full pt-20 sm:pt-28">
      <div className="shell">
        <IndexRow n="05" right="FOUR WAYS IN" />

        <h2
          className="d mt-10 text-[clamp(3rem,15vw,13rem)] sm:mt-14"
          style={{ color: "var(--bone)" }}
        >
          SAY
          <span style={{ color: "var(--blaze)" }}> HELLO.</span>
        </h2>

        <p
          className="mt-8 max-w-xl text-[1rem] leading-relaxed"
          style={{ color: "var(--ash)" }}
        >
          Email is the fastest way to reach me. I read everything.
        </p>

        <ul className="mt-12">
          {LINKS.map((l) => (
            <li key={l.label} className="border-t" style={{ borderColor: "var(--rail)" }}>
              <a
                href={l.href}
                target={l.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer noopener"
                className="group flex items-center justify-between gap-6 py-6 no-underline"
              >
                <span
                  className="d text-[clamp(1.5rem,5vw,3.25rem)] transition-colors duration-300 group-hover:text-[var(--blaze)]"
                  style={{ color: "var(--bone)" }}
                >
                  {l.label}
                </span>
                <span className="flex items-center gap-5">
                  <span className="mono hidden text-[0.8125rem] sm:inline" style={{ color: "var(--ash)" }}>
                    {l.value}
                  </span>
                  <span
                    className="mono text-[1.125rem] transition-transform duration-300 group-hover:translate-x-1"
                    style={{ color: "var(--blaze)" }}
                  >
                    →
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="rule" />

        <div className="flex flex-wrap items-center justify-between gap-3 py-8">
          <span className="meta">BUILT BY PRATHEEK B · NEXT.JS · 2026</span>
          <span className="meta">BENGALURU, INDIA</span>
        </div>
      </div>
    </section>
  );
}
