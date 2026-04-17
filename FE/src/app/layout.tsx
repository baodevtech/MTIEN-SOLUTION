import type { Metadata, Viewport } from 'next';
import { Manrope, Noto_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ThemeProvider } from '@/lib/theme-context';
import { SettingsProvider } from '@/lib/settings-context';
import { getTheme, getSettings } from '@/lib/theme-fetcher';
import type { SiteSettings } from '@/lib/theme-fetcher';

const BASE_URL = process.env.APP_URL || 'https://mtiensolution.vn';

const manrope = Manrope({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-manrope',
});

const notoSans = Noto_Sans({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-noto-sans',
});

export const viewport: Viewport = {
  themeColor: '#0066FF',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings()
  const siteName = settings?.general?.siteName || 'MTIEN SOLUTION'
  const siteDescription = settings?.general?.siteDescription || 'Cung cấp dịch vụ lập trình phần mềm, thiết kế website, cloud server, marketing và thiết bị IT chuyên nghiệp. Hơn 230.000 khách hàng tin dùng.'
  const siteUrl = settings?.general?.siteUrl || BASE_URL
  const adminUrl = process.env.ADMIN_API_URL || ''
  const logoPath = settings?.general?.logo
  const ogImage = logoPath
    ? (logoPath.startsWith('http') ? logoPath : `${adminUrl}${logoPath}`)
    : '/og-image.png'

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${siteName} - Giải pháp Công nghệ Toàn diện`,
      template: `%s | ${siteName}`,
    },
    description: siteDescription,
    keywords: [
      'thiết kế website',
      'phần mềm quản lý bán hàng',
      'cloud server',
      'giải pháp IT',
      siteName,
      'chuyển đổi số',
      'phần mềm doanh nghiệp',
    ],
    authors: [{ name: siteName, url: siteUrl }],
    creator: siteName,
    openGraph: {
      type: 'website',
      locale: 'vi_VN',
      siteName,
      title: `${siteName} - Giải pháp Công nghệ Toàn diện`,
      description: siteDescription,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${siteName} - Giải pháp Công nghệ Toàn diện`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${siteName} - Giải pháp Công nghệ Toàn diện`,
      description: siteDescription,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
    alternates: { canonical: siteUrl },
  }
}

function JsonLd({ settings }: { settings: SiteSettings | null }) {
  const siteName = settings?.general?.siteName || 'MTIEN SOLUTION'
  const siteUrl = settings?.general?.siteUrl || BASE_URL
  const siteDescription = settings?.general?.siteDescription || 'Công ty TNHH Giải pháp Công nghệ Minh Tiến - Cung cấp dịch vụ IT toàn diện.'
  const company = settings?.company || {}
  const social = settings?.social || {}

  const sameAs = [social.facebook, social.youtube, social.instagram, social.linkedin, social.tiktok].filter(Boolean)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.name || siteName,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: siteDescription,
    address: company.address ? {
      '@type': 'PostalAddress',
      streetAddress: company.address,
      addressCountry: 'VN',
    } : undefined,
    contactPoint: company.phone ? [
      { '@type': 'ContactPoint', telephone: company.phone, contactType: 'customer service' },
    ] : undefined,
    sameAs: sameAs.length > 0 ? sameAs : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = await getTheme()
  const settings = await getSettings()
  const adminUrl = process.env.ADMIN_API_URL || ''
  const faviconUrl = settings?.general?.favicon
    ? (settings.general.favicon.startsWith('http') ? settings.general.favicon : `${adminUrl}${settings.general.favicon}`)
    : '/favicon.ico'
  const logoUrl = settings?.general?.logo
    ? (settings.general.logo.startsWith('http') ? settings.general.logo : `${adminUrl}${settings.general.logo}`)
    : ''

  return (
    <html
      lang="vi"
      className={`scroll-smooth ${manrope.variable} ${notoSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href={faviconUrl} />
        <link rel="dns-prefetch" href="https://picsum.photos" />
        <link rel="preconnect" href="https://picsum.photos" crossOrigin="anonymous" />
        <JsonLd settings={settings} />
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
        <ThemeProvider initialTheme={theme}>
          <SettingsProvider settings={{
            shopMaintenance: settings?.general?.shopMaintenance === true,
            maintenance: settings?.general?.maintenance === true,
          }}>
            <Navbar />
            <main id="main-content" className="min-h-screen">
              {children}
            </main>
            <Footer />
          </SettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
