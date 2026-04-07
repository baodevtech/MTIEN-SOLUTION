import ProjectsHeader from '@/components/projects/ProjectsHeader';
import FeaturedProject from '@/components/projects/FeaturedProject';
import ProjectGrid from '@/components/projects/ProjectGrid';
import ProjectsCTA from '@/components/projects/ProjectsCTA';

/**
 * Projects Page - Trang ho so nang luc / portfolio
 *
 * Cau truc sections:
 * 1. ProjectsHeader - Tieu de va mo ta trang
 * 2. FeaturedProject - Du an noi bat (ERP VinaCorp)
 * 3. ProjectGrid - Luoi cac du an khac
 * 4. ProjectsCTA - Keu goi hanh dong
 */
export default function Projects() {
  return (
    <div className="pt-20 pb-24 bg-white">
      {/* 1. Header */}
      <ProjectsHeader />

      {/* 2. Du an noi bat */}
      <FeaturedProject />

      {/* 3. Cac du an khac */}
      <ProjectGrid />

      {/* 4. Keu goi hanh dong */}
      <ProjectsCTA />
    </div>
  );
}
