import { Manrope } from 'next/font/google';
import DesignHero from '@/components/design/DesignHero';
import DesignVision from '@/components/design/DesignVision';
import DesignCoreValues from '@/components/design/DesignCoreValues';
import DesignServiceWeb from '@/components/design/DesignServiceWeb';
import DesignServiceBrand from '@/components/design/DesignServiceBrand';
import DesignSystem from '@/components/design/DesignSystem';
import DesignProcess from '@/components/design/DesignProcess';
import DesignTestimonials from '@/components/design/DesignTestimonials';
import DesignPricing from '@/components/design/DesignPricing';

const manrope = Manrope({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800'] });

/**
 * Marketing Design Page - Trang dich vu Thiet ke & UX/UI
 *
 * Cau truc sections:
 * 1. DesignHero - Hero banner voi parallax va mockup noi
 * 2. DesignVision - Tam nhin thiet ke va ly do thiet ke quan trong
 * 3. DesignCoreValues - Luoi Bento triet ly thiet ke
 * 4. DesignServiceWeb - Dich vu Website UI/UX va Mobile App
 * 5. DesignServiceBrand - Dich vu Thuong hieu va An pham Marketing
 * 6. DesignSystem - He thong Design System va ban giao Developer
 * 7. DesignProcess - Quy trinh trien khai va chi so tac dong
 * 8. DesignTestimonials - Nhan xet tu doi tac
 * 9. DesignPricing - Bang gia va CTA cuoi trang
 */
export default function MarketingDesignPage() {
  return (
    <main className={`${manrope.className} bg-[#FAFAFC] text-[#111] antialiased selection:bg-indigo-500 selection:text-white min-h-screen overflow-hidden`}>
      {/* 1. Hero Section */}
      <DesignHero />

      {/* 2. Vision & Why Design Matters */}
      <DesignVision />

      {/* 3. Core Values Bento Grid */}
      <DesignCoreValues />

      {/* 4. Services - Web UX/UI & Mobile App */}
      <DesignServiceWeb />

      {/* 5. Services - Brand Identity & Marketing Assets */}
      <DesignServiceBrand />

      {/* 6. Design System & Dev Handoff */}
      <DesignSystem />

      {/* 7. Process Timeline & Metrics */}
      <DesignProcess />

      {/* 8. Testimonials */}
      <DesignTestimonials />

      {/* 9. Pricing & Final CTA */}
      <DesignPricing />
    </main>
  );
}
