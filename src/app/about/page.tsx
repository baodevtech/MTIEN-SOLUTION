import AboutHero from '@/components/about/AboutHero';
import VisionMission from '@/components/about/VisionMission';
import StatsCapabilities from '@/components/about/StatsCapabilities';
import Timeline from '@/components/about/Timeline';
import LeadershipTeam from '@/components/about/LeadershipTeam';

/**
 * About Page - Trang giới thiệu công ty
 * 
 * Cấu trúc sections:
 * 1. AboutHero - Hero banner với tiêu đề và mô tả
 * 2. VisionMission - Tầm nhìn & Sứ mệnh (Bento Grid)
 * 3. StatsCapabilities - Năng lực triển khai & thống kê
 * 4. Timeline - Hành trình phát triển (2016-2026)
 * 5. LeadershipTeam - Đội ngũ lãnh đạo
 */
export default function About() {
  return (
    <div className="pt-20 pb-24 bg-white overflow-hidden">
      {/* 1. Hero Section */}
      <AboutHero />

      {/* 2. Tầm nhìn & Sứ mệnh */}
      <VisionMission />

      {/* 3. Năng lực triển khai & Thống kê */}
      <StatsCapabilities />

      {/* 4. Hành trình phát triển */}
      <Timeline />

      {/* 5. Đội ngũ Lãnh đạo */}
      <LeadershipTeam />
    </div>
  );
}
