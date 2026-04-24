export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div
        role="status"
        aria-label="Đang tải"
        className="h-8 w-8 rounded-full border-4 border-slate-200 border-t-indigo-600 animate-spin"
      />
    </div>
  )
}
