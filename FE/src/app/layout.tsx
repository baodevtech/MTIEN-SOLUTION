import React from 'react'
import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingContact from '@/components/layout/FloatingContact';
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

  const rawFavicon = settings?.general?.favicon
  const faviconUrl = rawFavicon
    ? (rawFavicon.startsWith('http') ? rawFavicon : `${adminUrl}${rawFavicon.startsWith('/') ? '' : '/'}${rawFavicon}`)
    : '/favicon.ico'

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
    icons: {
      icon: faviconUrl,
      shortcut: faviconUrl,
      apple: faviconUrl,
    },
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
  const trackingScripts = (settings?.trackingScripts || []).filter((s) => s.active)

  // Build all head scripts (GTM, GA4, GSC, FB Pixel, TikTok, custom_head)
  // from the new tracking scripts system, falling back to old globalSEO fields
  const headScripts: Array<React.ReactNode> = []
  const bodyScripts: Array<React.ReactNode> = []

  if (trackingScripts.length > 0) {
    trackingScripts.forEach((s, i) => {
      switch (s.type) {
        case 'gtm':
          headScripts.push(
            <script key={`${s.id}-h`} dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${s.value.replace(/'/g, "\\'")}');` }} />
          )
          bodyScripts.push(
            <noscript key={`${s.id}-b`}><iframe src={`https://www.googletagmanager.com/ns.html?id=${s.value}`} height="0" width="0" style={{ display: 'none', visibility: 'hidden' }} /></noscript>
          )
          break
        case 'ga4':
          headScripts.push(
            <React.Fragment key={`${s.id}-h`}>
              <script async src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(s.value)}`} />
              <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${s.value.replace(/'/g, "\\'")}');` }} />
            </React.Fragment>
          )
          break
        case 'gsc':
          headScripts.push(
            <meta key={`${s.id}-h`} name="google-site-verification" content={s.value} />
          )
          break
        case 'fb_pixel':
          headScripts.push(
            <script key={`${s.id}-h`} dangerouslySetInnerHTML={{ __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${s.value.replace(/'/g, "\\'")}');fbq('track','PageView');` }} />
          )
          break
        case 'tiktok':
          headScripts.push(
            <script key={`${s.id}-h`} dangerouslySetInnerHTML={{ __html: `!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=i;ttq._t=ttq._t||{};ttq._t[e]=+new Date;ttq._o=ttq._o||{};ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript";o.async=!0;o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};ttq.load('${s.value.replace(/'/g, "\\'")}');ttq.page();}(window,document,'ttq');` }} />
          )
          break
        case 'custom_head':
          headScripts.push(
            <div key={`${s.id}-h-${i}`} dangerouslySetInnerHTML={{ __html: s.value }} />
          )
          break
        case 'custom_body':
          bodyScripts.push(
            <div key={`${s.id}-b-${i}`} dangerouslySetInnerHTML={{ __html: s.value }} />
          )
          break
      }
    })
  } else {
    // Fallback: old globalSEO-based tracking
    if (gaId && gaId !== 'G-XXXXXXXXXX') {
      headScripts.push(
        <React.Fragment key="ga-legacy">
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`} />
          <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId.replace(/'/g, "\\'")}');` }} />
        </React.Fragment>
      )
    }
    if (fbPixelId && fbPixelId !== 'Pixel ID') {
      headScripts.push(
        <script key="fb-legacy" dangerouslySetInnerHTML={{ __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${fbPixelId.replace(/'/g, "\\'")}');fbq('track','PageView');` }} />
      )
    }
    // Default hardcoded GTM (kept for backward compat until migrated to tracking manager)
    headScripts.push(
      <script key="gtm-default" dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-MWC4BFF5');` }} />
    )
    bodyScripts.push(
      <noscript key="gtm-default-ns"><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MWC4BFF5" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }} /></noscript>
    )
  }

  return (
    <html
      lang="vi"
      className={`scroll-smooth ${manrope.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href={faviconUrl} />
        <link rel="dns-prefetch" href="https://portal.minhtiensolutions.cloud" />
        <link rel="preconnect" href="https://portal.minhtiensolutions.cloud" crossOrigin="anonymous" />
        <JsonLd settings={settings} />
        {headScripts}
      </head>
      <body
        className="bg-white text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900"
        suppressHydrationWarning
      >
        {/* Skip to main content - Accessibility */}
        {bodyScripts}
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
            <FloatingContact 
              enabled={settings?.floatContact?.enabled}
              brandName={settings?.floatContact?.brandName}
              brandDesc={settings?.floatContact?.brandDesc}
              tooltipText={settings?.floatContact?.tooltipText}
              avatar={settings?.floatContact?.avatar}
              phone={settings?.floatContact?.phone || settings?.company?.phone}
              email={settings?.floatContact?.email || settings?.company?.email}
              zaloUrl={settings?.floatContact?.zalo || settings?.social?.zalo}
              facebookUrl={settings?.floatContact?.messenger || settings?.social?.facebook}
              iconPhone={settings?.floatContact?.iconPhone}
              iconZalo={settings?.floatContact?.iconZalo}
              iconMessenger={settings?.floatContact?.iconMessenger}
              iconEmail={settings?.floatContact?.iconEmail}
            />
          </SettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
