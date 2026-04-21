import AboutHero from '@/components/about/AboutHero';
import VisionMission from '@/components/about/VisionMission';
import StatsCapabilities from '@/components/about/StatsCapabilities';
import Timeline from '@/components/about/Timeline';
import LeadershipTeam from '@/components/about/LeadershipTeam';
import { ThemedPage } from '@/components/theme/ThemedPage';

export default function About() {
  return (
    <div className="bg-[#f8f9fa] text-zinc-900 overflow-hidden font-sans selection:bg-rose-200 selection:text-zinc-900">
      <ThemedPage
        pageId="about"
        sections={{
          hero: <AboutHero />,
          visionMission: <VisionMission />,
          statsCapabilities: <StatsCapabilities />,
          timeline: <Timeline />,
          team: <LeadershipTeam />,
        }}
      />
    </div>
  );
}
