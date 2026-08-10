import BootSequence from "@/components/hud/BootSequence";
import Crosshair from "@/components/hud/Crosshair";
import SmoothScroll from "@/components/hud/SmoothScroll";
import HudFrame from "@/components/hud/HudFrame";
import KillFeed from "@/components/hud/KillFeed";
import Player from "@/components/sections/Player";
import Campaign from "@/components/sections/Campaign";
import Loadout from "@/components/sections/Loadout";
import Armory from "@/components/sections/Armory";
import OffDuty from "@/components/sections/OffDuty";
import Comms from "@/components/sections/Comms";

export default function Home() {
  return (
    <BootSequence>
      <SmoothScroll />
      <Crosshair />
      <HudFrame />
      <KillFeed />
      <main className="relative z-10">
        <Player />
        <Campaign />
        <Loadout />
        <Armory />
        <OffDuty />
        <Comms />
      </main>
    </BootSequence>
  );
}
