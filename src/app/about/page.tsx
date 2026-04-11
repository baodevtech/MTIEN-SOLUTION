import AboutHero from '@/components/about/AboutHero';
import VisionMission from '@/components/about/VisionMission';
import StatsCapabilities from '@/components/about/StatsCapabilities';
import Timeline from '@/components/about/Timeline';
import LeadershipTeam from '@/components/about/LeadershipTeam';
import { ThemedPage } from '@/components/theme/ThemedPage';

export default function About() {
  return (
    <div className="pt-20 pb-24 bg-white overflow-hidden">
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
