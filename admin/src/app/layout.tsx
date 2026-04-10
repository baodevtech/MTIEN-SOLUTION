import type { Metadata } from 'next'
import './globals.css'

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
    <html lang="vi">
      <body className="antialiased text-slate-800">
        {children}
      </body>
    </html>
  )
}
