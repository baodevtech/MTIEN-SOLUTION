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
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Left: Breadcrumb */}
      <div className="flex items-center gap-2 min-w-0">
        <nav className="flex items-center gap-1 text-sm">
          {breadcrumbs.map((item, i) => (
            <div key={item.href} className="flex items-center gap-1">
              {i > 0 && <ChevronRight size={14} className="text-slate-300" />}
              {i === breadcrumbs.length - 1 ? (
                <span className="font-semibold text-slate-800 truncate">{item.label}</span>
              ) : (
                <a href={item.href} className="text-slate-400 hover:text-slate-600 transition-colors truncate">
                  {item.label}
                </a>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1">
        {/* Search */}
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="p-2.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
        >
          <Search size={18} />
        </button>

        {/* Refresh */}
        <button className="p-2.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
          <RefreshCw size={18} />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false) }}
            className="p-2.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors relative"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
              <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden animate-fade-in">
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                  <h3 className="font-semibold text-sm">Thông báo</h3>
                  <button className="text-xs text-blue-500 hover:text-blue-700 font-medium">Đánh dấu đã đọc</button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={cn(
                        'px-4 py-3 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors',
                        !n.read && 'bg-blue-50/50'
                      )}
                    >
                      <div className="flex items-start gap-3">
                        {!n.read && <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />}
                        <div className={cn('min-w-0', n.read && 'ml-5')}>
                          <p className="text-sm font-medium text-slate-700 truncate">{n.title}</p>
                          <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{n.message}</p>
                          <p className="text-[10px] text-slate-400 mt-1">{formatRelativeTime(n.time)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2.5 border-t border-slate-100 text-center">
                  <a href="#" className="text-xs text-blue-500 hover:text-blue-700 font-medium">Xem tất cả thông báo</a>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Separator */}
        <div className="w-px h-8 bg-slate-200 mx-2" />

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotifications(false) }}
            className="flex items-center gap-2.5 p-1.5 pr-3 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
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
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden animate-fade-in">
                <div className="px-4 py-3 border-b border-slate-100">
                  <div className="font-semibold text-sm">Nguyễn Minh Tiến</div>
                  <div className="text-xs text-slate-400">tien@mtiensolution.vn</div>
                </div>
                <div className="p-1.5">
                  <a href="/settings" className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
                    <User size={16} />
                    Hồ sơ cá nhân
                  </a>
                  <a href="/settings" className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
                    <Settings size={16} />
                    Cài đặt
                  </a>
                  <a href="#" className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
                    <HelpCircle size={16} />
                    Trợ giúp
                  </a>
                </div>
                <div className="p-1.5 border-t border-slate-100">
                  <button
                    onClick={() => {
                      document.cookie = 'admin_token=; path=/; max-age=0'
                      localStorage.removeItem('admin_token')
                      localStorage.removeItem('admin_user')
                      window.location.href = '/login'
                    }}
                    className="flex items-center gap-2.5 px-3 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50 transition-colors w-full"
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
          <div className="fixed inset-0 bg-black/30 z-50" onClick={() => setShowSearch(false)} />
          <div className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-xl z-50 animate-fade-in">
            <div className="bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100">
                <Search size={18} className="text-slate-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm bài viết, sản phẩm, đơn hàng..."
                  className="flex-1 text-sm outline-none placeholder:text-slate-400"
                  autoFocus
                />
                <kbd className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded font-mono">ESC</kbd>
              </div>
              <div className="p-4 text-center text-sm text-slate-400">
                Nhập từ khoá để tìm kiếm...
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  )
}
