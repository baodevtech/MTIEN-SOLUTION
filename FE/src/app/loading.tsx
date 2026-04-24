export default function Loading() {
  return (
    <div className="min-h-[40vh] flex items-center justify-center">
      <div
        role="status"
        aria-label="Đang tải"
        className="h-8 w-8 rounded-full border-4 border-slate-200 border-t-blue-600 animate-spin"
      />
    </div>
  )
}
