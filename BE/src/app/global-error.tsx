'use client'

import { useEffect } from 'react'
import Link from 'next/link'

/**
 * global-error handles errors in the root layout itself. Must define its own
 * <html> and <body>. Client component only.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error('[admin:global-error]', error)
  }, [error])

  return (
    <html lang="vi">
      <body style={{ fontFamily: 'system-ui, sans-serif', margin: 0, padding: 0 }}>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f8fafc',
            padding: '1rem',
          }}
        >
          <div style={{ maxWidth: 420, textAlign: 'center' }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a' }}>
              Hệ thống đang gặp sự cố
            </h1>
            <p style={{ marginTop: 12, color: '#475569' }}>
              Vui lòng tải lại trang hoặc thử lại sau.
            </p>
            <div style={{ marginTop: 20, display: 'flex', gap: 8, justifyContent: 'center' }}>
              <button
                onClick={() => reset()}
                style={{
                  padding: '8px 16px',
                  background: '#4f46e5',
                  color: 'white',
                  border: 0,
                  borderRadius: 6,
                  cursor: 'pointer',
                }}
              >
                Thử lại
              </button>
              <Link
                href="/"
                style={{
                  padding: '8px 16px',
                  background: 'white',
                  color: '#334155',
                  border: '1px solid #cbd5e1',
                  borderRadius: 6,
                  textDecoration: 'none',
                }}
              >
                Về trang chủ
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
