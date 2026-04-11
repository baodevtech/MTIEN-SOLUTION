import SoftwareBreadcrumb from '@/components/phan-mem/SoftwareBreadcrumb';
import SoftwareFeatures from '@/components/phan-mem/SoftwareFeatures';
import SoftwareEcosystem from '@/components/phan-mem/SoftwareEcosystem';
import SoftwareMarquee from '@/components/phan-mem/SoftwareMarquee';
import SoftwareProcess from '@/components/phan-mem/SoftwareProcess';
import SoftwarePricing from '@/components/phan-mem/SoftwarePricing';
import SoftwareFAQ from '@/components/phan-mem/SoftwareFAQ';
import { ThemedPage } from '@/components/theme/ThemedPage';

export default function PhanMemPage() {
  return (
    <main className="bg-white text-[#616161]">
      <ThemedPage
        pageId="software"
        sections={{
          breadcrumb: <SoftwareBreadcrumb />,
          features: <SoftwareFeatures />,
          ecosystem: <SoftwareEcosystem />,
          marquee: <SoftwareMarquee />,
          process: <SoftwareProcess />,
          pricing: <SoftwarePricing />,
          faq: <SoftwareFAQ />,
        }}
      />
    </main>
  );
}
