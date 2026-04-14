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
    <header className="h-[64px] bg-white/70 backdrop-blur-2xl border-b border-slate-200/60 flex items-center justify-between px-6 sticky top-0 z-30 transition-all shadow-[0_2px_20px_rgba(15,23,42,0.02)]">
      {/* Left: Breadcrumb */}
      <div className="flex items-center gap-2 min-w-0">
        <nav className="flex items-center gap-2 text-[0.875rem]">
          {breadcrumbs.map((item, i) => (
            <div key={item.href} className="flex items-center gap-2">
              {i > 0 && <ChevronRight size={14} className="text-slate-400" />}
              {i === breadcrumbs.length - 1 ? (
                <span className="font-bold text-slate-800 tracking-tight lowercase font-heading">{item.label}</span>
              ) : (
                <a href={item.href} className="text-slate-500 hover:text-indigo-600 font-semibold transition-colors truncate tracking-wide text-[0.8125rem] uppercase">
                  {item.label}
                </a>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-indigo-600 transition-all duration-300"
        >
          <Search size={18} />
        </button>

        {/* Refresh */}
        <button className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-indigo-600 transition-all duration-300">
          <RefreshCw size={18} />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false) }}
            className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-indigo-600 transition-all duration-300 relative group"
          >
            <Bell size={18} className="transition-transform group-hover:scale-110 group-active:scale-95" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full shadow-[0_0_0_2px_rgba(255,255,255,1)]">
              </span>
            )}
          </button>

          {showNotifications && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
              <div className="absolute right-0 top-full mt-3 w-96 bg-white/95 backdrop-blur-3xl rounded-2xl shadow-[0_12px_40px_rgba(15,23,42,0.08)] border border-slate-200/60 z-50 overflow-hidden animate-fade-in ring-1 ring-slate-900/5">
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/50">
                  <h3 className="font-bold text-[0.875rem] tracking-wide text-slate-800 font-heading uppercase">Thông báo</h3>
                  <button className="text-[0.75rem] text-indigo-600 hover:text-indigo-700 font-bold transition-colors">Đánh dấu đã đọc</button>
                </div>
                <div className="max-h-[360px] overflow-y-auto custom-scrollbar">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={cn(
                        'px-5 py-4 border-b border-slate-50 hover:bg-slate-50/80 cursor-pointer transition-colors',
                        !n.read && 'bg-indigo-50/30 hover:bg-indigo-50/50'
                      )}
                    >
                      <div className="flex items-start gap-4">
                        {!n.read && <div className="w-2 h-2 rounded-full bg-indigo-600 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(79,70,229,0.4)]" />}
                        <div className={cn('min-w-0', n.read && 'ml-6')}>
                          <p className="text-[0.875rem] font-bold text-slate-800 truncate tracking-tight">{n.title}</p>
                          <p className="text-[0.8125rem] text-slate-600 mt-1 line-clamp-2 leading-relaxed">{n.message}</p>
                          <p className="text-[0.6875rem] text-slate-400 mt-2 font-medium bg-slate-100/50 inline-block px-2 py-0.5 rounded-md">{formatRelativeTime(n.time)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-5 py-3 border-t border-slate-100 text-center bg-slate-50/50 hover:bg-slate-100/50 transition-colors cursor-pointer block">
                  <a href="#" className="text-[0.8125rem] text-indigo-600 font-bold tracking-wide">Xem tất cả thông báo</a>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Separator */}
        <div className="w-px h-6 bg-slate-200/80 mx-2" />

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotifications(false) }}
            className="flex items-center gap-3 p-1.5 pr-3 rounded-2xl hover:bg-slate-100 transition-all duration-300 cursor-pointer border border-transparent hover:border-slate-200/80 group"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white text-[14px] font-bold shadow-[0_2px_8px_rgba(79,70,229,0.3)] transition-transform group-hover:scale-105">
              MT
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-[0.875rem] font-bold text-slate-800 leading-tight tracking-tight">Minh Tiến</div>
              <div className="text-[0.6875rem] font-semibold text-slate-500 leading-tight uppercase tracking-wider mt-0.5">Administrator</div>
            </div>
            <ChevronDown size={14} className="text-slate-400 hidden sm:block transition-transform duration-300 group-hover:text-slate-600" />
          </button>

          {showProfile && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowProfile(false)} />
              <div className="absolute right-0 top-full mt-3 w-[240px] bg-white/95 backdrop-blur-3xl rounded-2xl shadow-[0_12px_40px_rgba(15,23,42,0.08)] border border-slate-200/60 z-50 overflow-hidden animate-fade-in p-2 ring-1 ring-slate-900/5">
                <div className="px-4 py-3 mb-2 border-b border-slate-100 bg-slate-50/50 rounded-lg">
                  <div className="font-bold text-[0.875rem] text-slate-800 tracking-tight">Nguyễn Minh Tiến</div>
                  <div className="text-[0.75rem] font-medium text-slate-500 mt-1">tien@mtiensolution.vn</div>
                </div>
                <div className="space-y-1 mb-2">
                  <a href="/settings" className="flex items-center gap-3 px-3 py-2 text-[0.8125rem] font-semibold text-slate-600 rounded-xl hover:bg-indigo-50 hover:text-indigo-700 transition-colors">
                    <User size={16} className="text-slate-400" />
                    Hồ sơ cá nhân
                  </a>
                  <a href="/settings" className="flex items-center gap-3 px-3 py-2 text-[0.8125rem] font-semibold text-slate-600 rounded-xl hover:bg-indigo-50 hover:text-indigo-700 transition-colors">
                    <Settings size={16} className="text-slate-400" />
                    Cài đặt hệ thống
                  </a>
                  <a href="#" className="flex items-center gap-3 px-3 py-2 text-[0.8125rem] font-semibold text-slate-600 rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-colors">
                    <HelpCircle size={16} className="text-slate-400" />
                    Trợ giúp & Hỗ trợ
                  </a>
                </div>
                <div className="border-t border-slate-100 pt-2">
                  <button
                    onClick={() => {
                      document.cookie = 'admin_token=; path=/; max-age=0'
                      localStorage.removeItem('admin_token')
                      localStorage.removeItem('admin_user')
                      window.location.href = '/login'
                    }}
                    className="flex items-center gap-3 px-3 py-2 text-[0.8125rem] font-bold text-rose-600 rounded-xl hover:bg-rose-50 transition-colors w-full"
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
          <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-50 transition-opacity" onClick={() => setShowSearch(false)} />
          <div className="fixed top-24 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 animate-fade-in p-4">
            <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-[0_20px_60px_-15px_rgba(15,23,42,0.15)] ring-1 ring-slate-900/5 overflow-hidden">
              <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 bg-white/50">
                <Search size={22} className="text-slate-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm bài viết, sản phẩm, đơn hàng..."
                  className="flex-1 text-[1rem] bg-transparent outline-none placeholder:text-slate-400 text-slate-800 font-medium"
                  autoFocus
                />
                <kbd className="text-[0.6875rem] text-slate-500 bg-slate-100 border border-slate-200 px-2 py-1 rounded-md font-mono font-bold shadow-sm cursor-pointer hover:bg-slate-200 transition-colors" onClick={() => setShowSearch(false)}>ESC</kbd>
              </div>
              <div className="p-8 text-center text-[0.875rem] text-slate-500 font-medium tracking-wide">
                Nhập từ khoá để tìm kiếm kết quả trên toàn hệ thống...
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  )
}
