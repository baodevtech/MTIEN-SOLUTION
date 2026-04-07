import CloudHero from '@/components/cloud-server/CloudHero';
import EnterpriseTrust from '@/components/cloud-server/EnterpriseTrust';
import BentoFeatures from '@/components/cloud-server/BentoFeatures';
import ControlPanel from '@/components/cloud-server/ControlPanel';
import HardwareSpecs from '@/components/cloud-server/HardwareSpecs';
import NetworkTopology from '@/components/cloud-server/NetworkTopology';
import MigrationSupport from '@/components/cloud-server/MigrationSupport';
import CloudPricing from '@/components/cloud-server/CloudPricing';

/**
 * Cloud Server Page - Trang dich vu Cloud Server Doanh Nghiep
 *
 * Cau truc sections:
 * 1. CloudHero - Hero banner voi tieu de chinh
 * 2. EnterpriseTrust - Thanh tin nhiem doanh nghiep (chung chi & doi tac)
 * 3. BentoFeatures - Luoi Bento cac tinh nang noi bat
 * 4. ControlPanel - Giao dien quan ly truc quan
 * 5. HardwareSpecs - Thong so phan cung cap doanh nghiep
 * 6. NetworkTopology - Mo hinh mang va ha tang
 * 7. MigrationSupport - Ho tro di chuyen va van hanh 24/7
 * 8. CloudPricing - Bang gia cac goi dich vu
 */
export default function CloudServerPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FBFBFD] overflow-hidden">
      {/* 1. Hero Section */}
      <CloudHero />

      {/* 2. Enterprise Trust Bar */}
      <EnterpriseTrust />

      {/* 3. Bento Features Grid */}
      <BentoFeatures />

      {/* 4. Control Panel Showcase */}
      <ControlPanel />

      {/* 5. Hardware Specifications */}
      <HardwareSpecs />

      {/* 6. Network Topology */}
      <NetworkTopology />

      {/* 7. Migration & Support */}
      <MigrationSupport />

      {/* 8. Pricing Plans */}
      <CloudPricing />
    </div>
  );
}
