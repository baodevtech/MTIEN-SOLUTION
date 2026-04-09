import SoftwareBreadcrumb from '@/components/phan-mem/SoftwareBreadcrumb';
import SoftwareFeatures from '@/components/phan-mem/SoftwareFeatures';
import SoftwareEcosystem from '@/components/phan-mem/SoftwareEcosystem';
import SoftwareMarquee from '@/components/phan-mem/SoftwareMarquee';
import SoftwareProcess from '@/components/phan-mem/SoftwareProcess';
import SoftwarePricing from '@/components/phan-mem/SoftwarePricing';
import SoftwareFAQ from '@/components/phan-mem/SoftwareFAQ';

/**
 * Phan Mem Page - Trang dich vu Phat trien phan mem (Inotek-style)
 *
 * Cau truc sections:
 * 1. SoftwareBreadcrumb - Dieu huong breadcrumb
 * 2. SoftwareFeatures - Cac tinh nang noi bat
 * 3. SoftwareEcosystem - He sinh thai phan mem (tab tuong tac + auto-play)
 * 4. SoftwareMarquee - Banner cuon vo han
 * 5. SoftwareProcess - Quy trinh phat trien
 * 6. SoftwarePricing - Bang gia dich vu
 * 7. SoftwareFAQ - Cau hoi thuong gap
 */
export default function PhanMemPage() {
  return (
    <main className="bg-white text-[#616161]">
      {/* 1. Breadcrumb Navigation */}
      <SoftwareBreadcrumb />

      {/* 2. Feature Highlights */}
      <SoftwareFeatures />

      {/* 3. Software Ecosystem (Interactive Tabs) */}
      <SoftwareEcosystem />

      {/* 4. Infinite Marquee */}
      <SoftwareMarquee />

      {/* 5. Development Process */}
      <SoftwareProcess />

      {/* 6. Pricing Plans */}
      <SoftwarePricing />

      {/* 7. FAQ */}
      <SoftwareFAQ />
    </main>
  );
}
