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
  const seo = settings?.globalSEO
  const siteName = settings?.general?.siteName || 'MTIEN SOLUTION'
  const siteUrl = settings?.general?.siteUrl || BASE_URL
  const adminUrl = process.env.ADMIN_API_URL || ''

  // SEO fields: prioritize globalSEO from SEO settings page, fallback to general settings
  const defaultTitle = seo?.defaultTitle || `${siteName} - Giải pháp Công nghệ Toàn diện`
  const titleTemplate = seo?.titleTemplate || `%s | ${siteName}`
  const description = seo?.defaultDescription || settings?.general?.siteDescription || 'Cung cấp dịch vụ lập trình phần mềm, thiết kế website, cloud server, marketing và thiết bị IT chuyên nghiệp.'
  const keywords = seo?.defaultKeywords
    ? seo.defaultKeywords.split(',').map(k => k.trim()).filter(Boolean)
    : ['thiết kế website', 'phần mềm quản lý bán hàng', 'cloud server', 'giải pháp IT', siteName]

  const ogImagePath = seo?.ogImage || settings?.general?.logo
  const ogImage = ogImagePath
    ? (ogImagePath.startsWith('http') ? ogImagePath : `${adminUrl}${ogImagePath}`)
    : '/og-image.png'

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: defaultTitle,
      template: titleTemplate,
    },
    description,
    keywords,
    authors: [{ name: siteName, url: siteUrl }],
    creator: siteName,
    verification: seo?.googleSearchConsoleId ? { google: seo.googleSearchConsoleId } : undefined,
    openGraph: {
      type: 'website',
      locale: 'vi_VN',
      siteName,
      title: defaultTitle,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: defaultTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: defaultTitle,
      description,
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

  const resolveUrl = (url: string | undefined, fallback: string) => {
    if (!url) return fallback
    if (url.startsWith('http') || url.startsWith('data:')) return url
    return `${adminUrl}${url}`
  }

  const faviconUrl = resolveUrl(settings?.general?.favicon, '/favicon.ico')
  const logoUrl = resolveUrl(settings?.general?.logo, '')

  const gaId = settings?.globalSEO?.googleAnalyticsId
  const fbPixelId = settings?.globalSEO?.facebookPixelId

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
        {/* Google Analytics */}
        {gaId && gaId !== 'G-XXXXXXXXXX' && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`} />
            <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId.replace(/'/g, "\\'")}');` }} />
          </>
        )}
        {/* Facebook Pixel */}
        {fbPixelId && fbPixelId !== 'Pixel ID' && (
          <script dangerouslySetInnerHTML={{ __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${fbPixelId.replace(/'/g, "\\'")}');fbq('track','PageView');` }} />
        )}
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
