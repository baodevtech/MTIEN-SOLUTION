import CloudHero from '@/components/cloud-server/CloudHero';
import EnterpriseTrust from '@/components/cloud-server/EnterpriseTrust';
import BentoFeatures from '@/components/cloud-server/BentoFeatures';
import ControlPanel from '@/components/cloud-server/ControlPanel';
import HardwareSpecs from '@/components/cloud-server/HardwareSpecs';
import NetworkTopology from '@/components/cloud-server/NetworkTopology';
import MigrationSupport from '@/components/cloud-server/MigrationSupport';
import CloudPricing from '@/components/cloud-server/CloudPricing';
import { ThemedPage } from '@/components/theme/ThemedPage';

export default function CloudServerPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FBFBFD] overflow-hidden">
      <ThemedPage
        pageId="cloud-server"
        sections={{
          hero: <CloudHero />,
          trust: <EnterpriseTrust />,
          features: <BentoFeatures />,
          controlPanel: <ControlPanel />,
          specs: <HardwareSpecs />,
          network: <NetworkTopology />,
          migration: <MigrationSupport />,
          pricing: <CloudPricing />,
        }}
      />
    </div>
  );
}
