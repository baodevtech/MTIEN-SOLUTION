'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error('[admin:error]', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full text-center">
        <p className="text-sm font-semibold text-indigo-600">Đã có lỗi</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Rất tiếc, có gì đó không ổn</h1>
        <p className="mt-4 text-slate-600">
          Hệ thống gặp sự cố khi xử lý yêu cầu của bạn. Vui lòng thử lại.
        </p>
        {error.digest && (
          <p className="mt-2 text-xs text-slate-400">Mã lỗi: {error.digest}</p>
        )}
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Thử lại
          </button>
          <Link
            href="/"
            className="inline-flex items-center rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  )
}
