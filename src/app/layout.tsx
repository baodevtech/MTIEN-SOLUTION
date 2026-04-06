import type { Metadata, Viewport } from 'next';
import { Manrope, Noto_Sans } from 'next/font/google';
import './globals.css';
import './inotek-clone.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const BASE_URL = process.env.APP_URL || 'https://mtiensolution.vn';

const manrope = Manrope({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-manrope',
});

const notoSans = Noto_Sans({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-noto-sans',
});

export const viewport: Viewport = {
  themeColor: '#0066FF',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'MTIEN SOLUTION - Giải pháp Công nghệ Toàn diện',
    template: '%s | MTIEN SOLUTION',
  },
  description:
    'Cung cấp dịch vụ lập trình phần mềm, thiết kế website, cloud server, marketing và thiết bị IT chuyên nghiệp. Hơn 230.000 khách hàng tin dùng.',
  keywords: [
    'thiết kế website',
    'phần mềm quản lý bán hàng',
    'cloud server',
    'giải pháp IT',
    'MTIEN SOLUTION',
    'chuyển đổi số',
    'phần mềm doanh nghiệp',
  ],
  authors: [{ name: 'MTIEN SOLUTION', url: BASE_URL }],
  creator: 'MTIEN SOLUTION',
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: 'MTIEN SOLUTION',
    title: 'MTIEN SOLUTION - Giải pháp Công nghệ Toàn diện',
    description:
      'Cung cấp dịch vụ lập trình, thiết kế, cloud, và thiết bị IT chuyên nghiệp cho hơn 230.000 doanh nghiệp.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MTIEN SOLUTION - Giải pháp Công nghệ Toàn diện',
    description:
      'Cung cấp dịch vụ lập trình, thiết kế, cloud, và thiết bị IT chuyên nghiệp.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: BASE_URL },
};

function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'MTIEN SOLUTION',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description:
      'Công ty TNHH Giải pháp Công nghệ Minh Tiến - Cung cấp dịch vụ IT toàn diện.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Tầng 6, tòa nhà Ladeco, 266 Đội Cấn',
      addressLocality: 'Hà Nội',
      addressCountry: 'VN',
    },
    contactPoint: [
      { '@type': 'ContactPoint', telephone: '+84-1800-6750', contactType: 'customer service' },
      { '@type': 'ContactPoint', telephone: '+84-1900-6750', contactType: 'technical support' },
    ],
    sameAs: [
      'https://www.facebook.com/mtiensolution',
      'https://www.youtube.com/mtiensolution',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="vi"
      className={`scroll-smooth ${manrope.variable} ${notoSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <JsonLd />
      </head>
      <body
        className="bg-white text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900"
        suppressHydrationWarning
      >
        {/* Skip to main content - Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-white focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:text-blue-700 focus:outline-2 focus:outline-blue-500"
        >
          Bỏ qua điều hướng
        </a>
        <Navbar />
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
