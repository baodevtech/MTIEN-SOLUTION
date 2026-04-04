import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dịch vụ Phần mềm & App',
  description: 'Dịch vụ phát triển phần mềm, ứng dụng web, mobile app, ERP/CRM và API Cloud chuyên nghiệp.',
  openGraph: {
    title: 'Dịch vụ Phần mềm & App | MTIEN SOLUTION',
    description: 'Phát triển phần mềm, ứng dụng web, mobile app, ERP/CRM và API Cloud.',
  },
};

export default function PhanMemLayout({ children }: { children: React.ReactNode }) {
  return children;
}
