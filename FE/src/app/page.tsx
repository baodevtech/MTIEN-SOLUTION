import dynamic from 'next/dynamic';
import HeroSection from '@/components/sections/HeroSection';
import StatsSection from '@/components/sections/StatsSection';
import { ThemedPage } from '@/components/theme/ThemedPage';

// Lazy load below-fold sections to reduce initial JS bundle → faster LCP on mobile
const FeaturesSection = dynamic(() => import('@/components/sections/FeaturesSection'));
const DashboardSection = dynamic(() => import('@/components/sections/DashboardSection'));
const TemplatesSection = dynamic(() => import('@/components/sections/TemplatesSection'));
const AppStoreSection = dynamic(() => import('@/components/sections/AppStoreSection'));
const PricingSection = dynamic(() => import('@/components/sections/PricingSection'));
const IndustrySection = dynamic(() => import('@/components/sections/IndustrySection'));
const TrustSection = dynamic(() => import('@/components/sections/TrustSection'));
const FAQSection = dynamic(() => import('@/components/sections/FAQSection'));
const CTASection = dynamic(() => import('@/components/sections/CTASection'));

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <ThemedPage
        pageId="home"
        sections={{
          hero: <HeroSection />,
          stats: <StatsSection />,
          appstore: <AppStoreSection />,
          dashboard: <DashboardSection />,
          features: <FeaturesSection />,
          templates: <TemplatesSection />,
          pricing: <PricingSection />,
          industry: <IndustrySection />,
          trust: <TrustSection />,
          faq: <FAQSection />,
          cta: <CTASection />,
        }}
      />
    </div>
  );
}
