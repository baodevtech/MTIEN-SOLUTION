import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full text-center">
        <p className="text-sm font-semibold text-indigo-600">404</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Trang không tồn tại</h1>
        <p className="mt-4 text-slate-600">
          Liên kết có thể đã bị thay đổi hoặc không còn tồn tại.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  )
}
