import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dự án tiêu biểu',
  description: 'Các dự án tiêu biểu của MTIEN SOLUTION: ERP, E-commerce, Cloud, Branding và hạ tầng IT.',
  openGraph: {
    title: 'Dự án tiêu biểu | MTIEN SOLUTION',
    description: 'Các dự án tiêu biểu: ERP, E-commerce, Cloud, Branding.',
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
