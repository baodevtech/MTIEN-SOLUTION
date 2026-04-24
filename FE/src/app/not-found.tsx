import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Không tìm thấy trang',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center">
        <p className="text-sm font-semibold text-blue-600">404</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Trang không tồn tại
        </h1>
        <p className="mt-4 text-slate-600">
          Liên kết có thể đã bị thay đổi, xoá hoặc nhập sai.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  )
}
