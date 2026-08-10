import Chrome from "@/components/hud/Chrome";
import SideBadge from "@/components/hud/SideBadge";
import LightBand from "@/components/fx/LightBand";
import Intro from "@/components/sections/Intro";
import Work from "@/components/sections/Work";
import Builds from "@/components/sections/Builds";
import Product from "@/components/sections/Product";
import Stack from "@/components/sections/Stack";
import Beyond from "@/components/sections/Beyond";
import Contact from "@/components/sections/Contact";

const BAND = [
  "PYTHON",
  "LANGGRAPH",
  "AZURE OPENAI",
  "FASTAPI",
  "CLAUDE CODE",
  "VECTOR DBS",
  "KNOWLEDGE GRAPHS",
  "OPENTELEMETRY",
];

export default function Home() {
  return (
    <>
      <Chrome />
      <SideBadge />
      <main className="relative">
        <Intro />
        <LightBand items={BAND} />
        <Work />
        <Builds />
        <Product />
        <Stack />
        <Beyond />
        <Contact />
      </main>
    </>
  );
}
