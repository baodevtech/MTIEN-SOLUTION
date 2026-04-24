'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error('[site:global-error]', error)
  }, [error])

  return (
    <html lang="vi">
      <body style={{ fontFamily: 'system-ui, sans-serif', margin: 0 }}>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#fff',
            padding: '1rem',
          }}
        >
          <div style={{ maxWidth: 420, textAlign: 'center' }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a' }}>
              Hệ thống đang gặp sự cố
            </h1>
            <p style={{ marginTop: 12, color: '#475569' }}>
              Vui lòng tải lại trang hoặc quay lại sau.
            </p>
            <button
              onClick={() => reset()}
              style={{
                marginTop: 20,
                padding: '8px 16px',
                background: '#2563eb',
                color: 'white',
                border: 0,
                borderRadius: 6,
                cursor: 'pointer',
              }}
            >
              Thử lại
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
