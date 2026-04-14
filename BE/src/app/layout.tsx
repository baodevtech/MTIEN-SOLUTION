import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
import './globals.css'

const fontHeading = Plus_Jakarta_Sans({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-heading',
});

const fontBody = Inter({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: {
    template: '%s | MTIEN Admin',
    default: 'MTIEN Admin - Quản trị hệ thống',
  },
  description: 'Hệ thống quản trị nội dung MTIEN SOLUTION',
  robots: { index: false, follow: false },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${fontHeading.variable} ${fontBody.variable}`}>
      <body className="antialiased text-slate-800 font-sans selection:bg-indigo-500/30 selection:text-indigo-900">
        {children}
      </body>
    </html>
  )
}
