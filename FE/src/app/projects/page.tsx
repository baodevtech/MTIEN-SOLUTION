import ProjectsHeader from '@/components/projects/ProjectsHeader';
import FeaturedProject from '@/components/projects/FeaturedProject';
import ProjectGrid from '@/components/projects/ProjectGrid';
import ProjectsCTA from '@/components/projects/ProjectsCTA';
import { ThemedPage } from '@/components/theme/ThemedPage';

export default function Projects() {
  return (
    <div className="pt-20 pb-24 bg-white">
      <ThemedPage
        pageId="projects"
        sections={{
          header: <ProjectsHeader />,
          featured: <FeaturedProject />,
          grid: <ProjectGrid />,
          cta: <ProjectsCTA />,
        }}
      />
    </div>
  );
}
