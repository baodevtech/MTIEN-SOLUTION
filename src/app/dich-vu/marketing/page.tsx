import MarketingHero from '@/components/marketing/MarketingHero';
import MarketingVisionProblem from '@/components/marketing/MarketingVisionProblem';
import MarketingCoreValues from '@/components/marketing/MarketingCoreValues';
import MarketingServices from '@/components/marketing/MarketingServices';
import MarketingFunnel from '@/components/marketing/MarketingFunnel';
import MarketingTechProcess from '@/components/marketing/MarketingTechProcess';
import MarketingSocialProof from '@/components/marketing/MarketingSocialProof';
import MarketingPricing from '@/components/marketing/MarketingPricing';
import MarketingCTA from '@/components/marketing/MarketingCTA';

/**
 * Marketing Page - Trang dich vu Marketing so (Digital Marketing)
 *
 * Cau truc sections:
 * 1. MarketingHero - Hero banner voi tieu de chinh va the analytics
 * 2. MarketingVisionProblem - Tam nhin thuong hieu va van de lang phi ngan sach
 * 3. MarketingCoreValues - DNA tang truong (Data-Driven, Funnel, Toc do, Omni-channel)
 * 4. MarketingServices - Cac dich vu (SEO, Ads, Social Media, Email & CRM)
 * 5. MarketingFunnel - Mo hinh tang truong AARRR
 * 6. MarketingTechProcess - Cong nghe Tracking va Quy trinh trien khai
 * 7. MarketingSocialProof - Chi so va Danh gia khach hang
 * 8. MarketingPricing - Goi giai phap tang truong
 * 9. MarketingCTA - Loi keu goi hanh dong cuoi trang
 */
export default function MarketingPage() {
  return (
    <main className="bg-neutral-50 text-neutral-900 antialiased selection:bg-blue-600 selection:text-white min-h-screen overflow-hidden">

      {/* 1. Hero Section */}
      <MarketingHero />

      {/* 2. Vision & Problem Statement */}
      <MarketingVisionProblem />

      {/* 3. Core Values - DNA Tang Truong */}
      <MarketingCoreValues />

      {/* 4. Dich vu Marketing (SEO, Ads, Social, Email) */}
      <MarketingServices />

      {/* 5. Mo hinh Pheu AARRR */}
      <MarketingFunnel />

      {/* 6. Cong nghe & Quy trinh */}
      <MarketingTechProcess />

      {/* 7. Chi so & Nhan xet khach hang */}
      <MarketingSocialProof />

      {/* 8. Bang gia Giai phap */}
      <MarketingPricing />

      {/* 9. Loi keu goi hanh dong */}
      <MarketingCTA />

    </main>
  );
}
