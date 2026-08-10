import BootSequence from "@/components/hud/BootSequence";
import Crosshair from "@/components/hud/Crosshair";
import SmoothScroll from "@/components/hud/SmoothScroll";
import Chrome from "@/components/hud/Chrome";
import Intro from "@/components/sections/Intro";
import Work from "@/components/sections/Work";
import Builds from "@/components/sections/Builds";
import Stack from "@/components/sections/Stack";
import OffDuty from "@/components/sections/OffDuty";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <BootSequence>
      <SmoothScroll />
      <Crosshair />
      <Chrome />
      <main className="relative">
        <Intro />
        <Work />
        <Builds />
        <Stack />
        <OffDuty />
        <Contact />
      </main>
    </BootSequence>
  );
}
