import DesignHero from '@/components/design/DesignHero';
import DesignVision from '@/components/design/DesignVision';
import DesignCoreValues from '@/components/design/DesignCoreValues';
import DesignServiceWeb from '@/components/design/DesignServiceWeb';
import DesignServiceBrand from '@/components/design/DesignServiceBrand';
import DesignSystem from '@/components/design/DesignSystem';
import DesignProcess from '@/components/design/DesignProcess';
import DesignTestimonials from '@/components/design/DesignTestimonials';
import DesignPricing from '@/components/design/DesignPricing';
import { ThemedPage } from '@/components/theme/ThemedPage';

export default function MarketingDesignPage() {
  return (
    <main className="bg-[#FAFAFC] text-[#111] antialiased selection:bg-indigo-500 selection:text-white min-h-screen overflow-hidden">
      <ThemedPage
        pageId="design"
        sections={{
          hero: <DesignHero />,
          vision: <DesignVision />,
          coreValues: <DesignCoreValues />,
          serviceWeb: <DesignServiceWeb />,
          serviceBrand: <DesignServiceBrand />,
          designSystem: <DesignSystem />,
          process: <DesignProcess />,
          testimonials: <DesignTestimonials />,
          pricing: <DesignPricing />,
        }}
      />
    </main>
  );
}
