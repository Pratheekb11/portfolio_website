import Chrome from "@/components/hud/Chrome";
import Intro from "@/components/sections/Intro";
import Work from "@/components/sections/Work";
import Builds from "@/components/sections/Builds";
import Stack from "@/components/sections/Stack";
import Beyond from "@/components/sections/Beyond";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Chrome />
      <main className="relative">
        <Intro />
        <Work />
        <Builds />
        <Stack />
        <Beyond />
        <Contact />
      </main>
    </>
  );
}
