import Chrome from "@/components/hud/Chrome";
import Motion from "@/components/fx/Motion";
import LightBand from "@/components/fx/LightBand";
import Intro from "@/components/sections/Intro";
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
    <Motion>
      <Chrome />
      <main className="relative">
        <Intro />
        <LightBand items={BAND} />
        <Builds />
        <Product />
        <Stack />
        <Beyond />
        <Contact />
      </main>
    </Motion>
  );
}
