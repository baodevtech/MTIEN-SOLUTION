import ServicesHero from '@/components/services/ServicesHero';
import ServicesGrid from '@/components/services/ServicesGrid';
import ServicesShowcase from '@/components/services/ServicesShowcase';
import ServicesCTA from '@/components/services/ServicesCTA';

/**
 * Services Page - Trang dich vu tong hop
 *
 * Cau truc sections:
 * 1. ServicesHero - Hero banner deep blue
 * 2. ServicesGrid - Luoi 4 nhom dich vu chinh
 * 3. ServicesShowcase - Dashboard mockup va floating badges
 * 4. ServicesCTA - Keu goi hanh dong (nhap SDT)
 */
export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FBFBFD] overflow-hidden">
      {/* 1. Hero Section - Deep Blue Tech Theme */}
      <ServicesHero />

      {/* 2. Core Services Grid - Overlapping Hero */}
      <ServicesGrid />

      {/* 3. Visual Showcase - Dashboard & Floating Badges */}
      <ServicesShowcase />

      {/* 4. Apple-Style CTA */}
      <ServicesCTA />
    </div>
  );
}
