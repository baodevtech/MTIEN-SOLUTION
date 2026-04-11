import ServicesHero from '@/components/services/ServicesHero';
import ServicesGrid from '@/components/services/ServicesGrid';
import ServicesShowcase from '@/components/services/ServicesShowcase';
import ServicesCTA from '@/components/services/ServicesCTA';
import { ThemedPage } from '@/components/theme/ThemedPage';

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FBFBFD] overflow-hidden">
      <ThemedPage
        pageId="services"
        sections={{
          hero: <ServicesHero />,
          grid: <ServicesGrid />,
          showcase: <ServicesShowcase />,
          cta: <ServicesCTA />,
        }}
      />
    </div>
  );
}
