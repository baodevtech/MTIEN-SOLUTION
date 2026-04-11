import MarketingHero from '@/components/marketing/MarketingHero';
import MarketingVisionProblem from '@/components/marketing/MarketingVisionProblem';
import MarketingCoreValues from '@/components/marketing/MarketingCoreValues';
import MarketingServices from '@/components/marketing/MarketingServices';
import MarketingFunnel from '@/components/marketing/MarketingFunnel';
import MarketingTechProcess from '@/components/marketing/MarketingTechProcess';
import MarketingSocialProof from '@/components/marketing/MarketingSocialProof';
import MarketingPricing from '@/components/marketing/MarketingPricing';
import MarketingCTA from '@/components/marketing/MarketingCTA';
import { ThemedPage } from '@/components/theme/ThemedPage';

export default function MarketingPage() {
  return (
    <main className="bg-neutral-50 text-neutral-900 antialiased selection:bg-blue-600 selection:text-white min-h-screen overflow-hidden">
      <ThemedPage
        pageId="marketing"
        sections={{
          hero: <MarketingHero />,
          vision: <MarketingVisionProblem />,
          coreValues: <MarketingCoreValues />,
          services: <MarketingServices />,
          funnel: <MarketingFunnel />,
          techProcess: <MarketingTechProcess />,
          socialProof: <MarketingSocialProof />,
          pricing: <MarketingPricing />,
          cta: <MarketingCTA />,
        }}
      />
    </main>
  );
}
