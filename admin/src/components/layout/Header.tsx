'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import {
  Bell, Search, ChevronDown, User, Settings, LogOut, Sun, Moon,
  HelpCircle, RefreshCw, ChevronRight,
} from 'lucide-react'
import { cn, formatRelativeTime } from '@/lib/utils'

const breadcrumbMap: Record<string, string> = {
  '/': 'Dashboard',
  '/posts': 'Bài viết',
  '/posts/new': 'Tạo bài viết',
  '/products': 'Sản phẩm',
  '/products/new': 'Thêm sản phẩm',
  '/orders': 'Đơn hàng',
  '/media': 'Thư viện Media',
  '/site-pages': 'Quản lý trang',
  '/contacts': 'Liên hệ',
  '/users': 'Người dùng',
  '/services': 'Dịch vụ',
  '/projects': 'Dự án',
  '/seo': 'SEO & Meta',
  '/analytics': 'Analytics',
  '/settings': 'Cài đặt',
}

const notifications = [
  { id: 1, title: 'Đơn hàng mới #ORD-2026-0850', message: 'Hoàng Đức Thịnh vừa đặt 2x Dell XPS 15', time: '2026-04-10T09:10:00Z', read: false },
  { id: 2, title: 'Liên hệ mới', message: 'Nguyễn Thành Trung gửi yêu cầu tư vấn website', time: '2026-04-10T08:15:00Z', read: false },
  { id: 3, title: 'Bình luận bài viết', message: 'Có 3 bình luận mới cần duyệt', time: '2026-04-09T16:30:00Z', read: true },
  { id: 4, title: 'Sản phẩm hết hàng', message: 'VGA RTX 4070 Super đã hết stock', time: '2026-04-09T14:00:00Z', read: true },
]

export default function AdminHeader() {
  const pathname = usePathname()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbs = [
    { label: 'Dashboard', href: '/' },
    ...segments.map((_, i) => {
      const path = '/' + segments.slice(0, i + 1).join('/')
      return { label: breadcrumbMap[path] || segments[i], href: path }
    }),
  ].filter((b, i, arr) => i === 0 ? true : b.label !== arr[0].label)

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <header className="h-[64px] bg-[rgba(251,251,253,0.8)] backdrop-blur-2xl border-b border-black/5 flex items-center justify-between px-6 sticky top-0 z-30 transition-all">
      {/* Left: Breadcrumb */}
      <div className="flex items-center gap-2 min-w-0">
        <nav className="flex items-center gap-1.5 text-[14px]">
          {breadcrumbs.map((item, i) => (
            <div key={item.href} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight size={14} className="text-[#86868b]" />}
              {i === breadcrumbs.length - 1 ? (
                <span className="font-semibold text-[#1d1d1f] truncate tracking-tight">{item.label}</span>
              ) : (
                <a href={item.href} className="text-[#86868b] hover:text-[#1d1d1f] font-medium transition-colors truncate tracking-tight">
                  {item.label}
                </a>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1.5">
        {/* Search */}
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="p-2 rounded-xl text-[#86868b] hover:bg-black/5 hover:text-[#1d1d1f] transition-colors"
        >
          <Search size={18} />
        </button>

        {/* Refresh */}
        <button className="p-2 rounded-xl text-[#86868b] hover:bg-black/5 hover:text-[#1d1d1f] transition-colors">
          <RefreshCw size={18} />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false) }}
            className="p-2 rounded-xl text-[#86868b] hover:bg-black/5 hover:text-[#1d1d1f] transition-colors relative"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1.5 w-2 h-2 bg-[#ff3b30] shadow-[0_0_0_2px_rgba(251,251,253,1)] rounded-full">
              </span>
            )}
          </button>

          {showNotifications && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
              <div className="absolute right-0 top-full mt-3 w-96 bg-[rgba(255,255,255,0.85)] backdrop-blur-3xl rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-black/5 z-50 overflow-hidden animate-fade-in">
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-black/5 bg-white/50">
                  <h3 className="font-semibold text-[15px] tracking-tight text-[#1d1d1f]">Thông báo</h3>
                  <button className="text-[12px] text-[#0066cc] hover:text-[#0071e3] font-medium transition-colors">Đánh dấu đã đọc</button>
                </div>
                <div className="max-h-[360px] overflow-y-auto custom-scrollbar">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={cn(
                        'px-5 py-3.5 border-b border-black/[0.03] hover:bg-black/[0.02] cursor-pointer transition-colors',
                        !n.read && 'bg-[#0066cc]/[0.03] hover:bg-[#0066cc]/[0.05]'
                      )}
                    >
                      <div className="flex items-start gap-3">
                        {!n.read && <div className="w-2 h-2 rounded-full bg-[#0066cc] mt-1.5 shrink-0 shadow-[0_0_8px_rgba(0,102,204,0.4)]" />}
                        <div className={cn('min-w-0', n.read && 'ml-5')}>
                          <p className="text-[14px] font-semibold text-[#1d1d1f] truncate tracking-tight">{n.title}</p>
                          <p className="text-[13px] text-[#424245] mt-0.5 line-clamp-2 leading-relaxed">{n.message}</p>
                          <p className="text-[11px] text-[#86868b] mt-1.5 font-medium">{formatRelativeTime(n.time)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-5 py-3 border-t border-black/5 text-center bg-white/50 hover:bg-white/80 transition-colors cursor-pointer">
                  <a href="#" className="text-[13px] text-[#0066cc] font-medium tracking-tight">Xem tất cả thông báo</a>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Separator */}
        <div className="w-px h-5 bg-black/10 mx-2" />

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotifications(false) }}
            className="flex items-center gap-2.5 p-1.5 pr-3 rounded-2xl hover:bg-black/5 transition-colors cursor-pointer border border-transparent hover:border-black/5"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0066cc] to-[#3694f4] flex items-center justify-center text-white text-[13px] font-semibold shadow-sm">
              MT
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-sm font-semibold text-slate-700 leading-tight">Minh Tiến</div>
              <div className="text-[10px] text-slate-400 leading-tight">Administrator</div>
            </div>
            <ChevronDown size={14} className="text-slate-400 hidden sm:block" />
          </button>

          {showProfile && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowProfile(false)} />
              <div className="absolute right-0 top-full mt-3 w-[220px] bg-[rgba(255,255,255,0.85)] backdrop-blur-3xl rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-black/5 z-50 overflow-hidden animate-fade-in p-1.5">
                <div className="px-3.5 py-3 mb-1.5 border-b border-black/5">
                  <div className="font-semibold text-[14px] text-[#1d1d1f] tracking-tight">Nguyễn Minh Tiến</div>
                  <div className="text-[12px] text-[#86868b] mt-0.5">tien@mtiensolution.vn</div>
                </div>
                <div className="space-y-0.5 mb-1.5">
                  <a href="/settings" className="flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium text-[#424245] rounded-xl hover:bg-black/5 hover:text-[#1d1d1f] transition-colors">
                    <User size={16} className="text-[#86868b]" />
                    Hồ sơ cá nhân
                  </a>
                  <a href="/settings" className="flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium text-[#424245] rounded-xl hover:bg-black/5 hover:text-[#1d1d1f] transition-colors">
                    <Settings size={16} className="text-[#86868b]" />
                    Cài đặt
                  </a>
                  <a href="#" className="flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium text-[#424245] rounded-xl hover:bg-black/5 hover:text-[#1d1d1f] transition-colors">
                    <HelpCircle size={16} className="text-[#86868b]" />
                    Trợ giúp
                  </a>
                </div>
                <div className="border-t border-black/5 pt-1.5">
                  <button
                    onClick={() => {
                      document.cookie = 'admin_token=; path=/; max-age=0'
                      localStorage.removeItem('admin_token')
                      localStorage.removeItem('admin_user')
                      window.location.href = '/login'
                    }}
                    className="flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium text-[#ff3b30] rounded-xl hover:bg-[#ff3b30]/10 transition-colors w-full"
                  >
                    <LogOut size={16} />
                    Đăng xuất
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Global Search Modal */}
      {showSearch && (
        <>
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 transition-opacity" onClick={() => setShowSearch(false)} />
          <div className="fixed top-32 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 animate-fade-in">
            <div className="bg-[rgba(255,255,255,0.85)] backdrop-blur-3xl rounded-3xl shadow-[0_16px_64px_rgba(0,0,0,0.12)] border border-black/[0.05] overflow-hidden">
              <div className="flex items-center gap-3 px-5 py-4 border-b border-black/[0.05]">
                <Search size={22} className="text-[#86868b]" />
                <input
                  type="text"
                  placeholder="Tìm kiếm bài viết, sản phẩm, đơn hàng..."
                  className="flex-1 text-[17px] bg-transparent outline-none placeholder:text-[#86868b] text-[#1d1d1f] font-medium"
                  autoFocus
                />
                <kbd className="text-[12px] text-[#86868b] bg-black/5 px-2 py-1 rounded-md font-mono font-medium shadow-sm">ESC</kbd>
              </div>
              <div className="p-8 text-center text-[14px] text-[#86868b] font-medium tracking-tight">
                Nhập từ khoá để tìm kiếm kết quả trên toàn hệ thống...
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  )
}
