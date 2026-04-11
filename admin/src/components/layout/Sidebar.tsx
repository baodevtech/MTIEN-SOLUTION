'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard, FileText, ShoppingBag, Package, Image, Users,
  Settings, Search, TrendingUp, Mail, FolderKanban, Globe,
  ChevronLeft, ChevronDown, Layers, Server, PanelLeftClose, PanelLeft,
  Palette, Megaphone, ClipboardList, BarChart3, LogOut, ExternalLink,
} from 'lucide-react'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  badge?: number
  children?: { label: string; href: string }[]
}

interface NavGroup {
  title: string
  items: NavItem[]
}

const navigation: NavGroup[] = [
  {
    title: 'TỔNG QUAN',
    items: [
      { label: 'Dashboard', href: '/', icon: <LayoutDashboard size={20} /> },
    ],
  },
  {
    title: 'NỘI DUNG',
    items: [
      { label: 'Bài viết', href: '/posts', icon: <FileText size={20} />, badge: 48 },
      { label: 'Trang', href: '/site-pages', icon: <Layers size={20} /> },
      { label: 'Thư viện Media', href: '/media', icon: <Image size={20} /> },
    ],
  },
  {
    title: 'THƯƠNG MẠI',
    items: [
      { label: 'Sản phẩm', href: '/products', icon: <ShoppingBag size={20} />, badge: 156 },
      { label: 'Đơn hàng', href: '/orders', icon: <Package size={20} />, badge: 5 },
    ],
  },
  {
    title: 'DỊCH VỤ',
    items: [
      { label: 'Quản lý dịch vụ', href: '/services', icon: <Server size={20} /> },
      { label: 'Dự án', href: '/projects', icon: <FolderKanban size={20} /> },
    ],
  },
  {
    title: 'TIẾP CẬN',
    items: [
      { label: 'Liên hệ', href: '/contacts', icon: <Mail size={20} />, badge: 12 },
    ],
  },
  {
    title: 'GIAO DIỆN',
    items: [
      { label: 'Theme Builder', href: '/theme-editor', icon: <Palette size={20} /> },
    ],
  },
  {
    title: 'HỆ THỐNG',
    items: [
      { label: 'Người dùng', href: '/users', icon: <Users size={20} /> },
      { label: 'SEO & Meta', href: '/seo', icon: <Search size={20} /> },
      { label: 'Analytics', href: '/analytics', icon: <BarChart3 size={20} /> },
      { label: 'Cài đặt', href: '/settings', icon: <Settings size={20} /> },
    ],
  },
]

export default function AdminSidebar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean
  onToggle: () => void
}) {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label]
    )
  }

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 h-screen z-40 flex flex-col sidebar-transition border-r backdrop-blur-3xl',
        collapsed ? 'w-[72px]' : 'w-[260px]',
        'bg-[#fbfbfd]/70 border-black/5'
      )}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-black/5 shrink-0">
        <div className="flex items-center gap-3 min-w-0 px-1">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0066cc] to-[#3694f4] flex items-center justify-center shrink-0 shadow-sm">
            <span className="text-white font-semibold text-sm">M</span>
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="text-[#1d1d1f] font-semibold text-[15px] leading-tight truncate tracking-tight">MTIEN</div>
              <div className="text-[#86868b] text-[11px] leading-tight mt-0.5">Admin Workspace</div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto custom-scrollbar py-4 px-3 space-y-4">
        {navigation.map((group) => (
          <div key={group.title}>
            {!collapsed && (
              <div className="text-[11px] font-semibold text-[#86868b] px-3 mb-1.5 tracking-tight">
                {group.title}
              </div>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active = isActive(item.href)
                const hasChildren = item.children && item.children.length > 0
                const expanded = expandedItems.includes(item.label)

                return (
                  <div key={item.href}>
                    <Link
                      href={hasChildren ? '#' : item.href}
                      onClick={hasChildren ? (e) => { e.preventDefault(); toggleExpand(item.label) } : undefined}
                      className={cn(
                        'flex items-center gap-3 rounded-xl px-3 py-2 text-[14px] font-medium transition-all duration-200 group relative',
                        active
                          ? 'bg-black/5 text-[#1d1d1f]'
                          : 'text-[#424245] hover:bg-black/[0.03]',
                        collapsed && 'justify-center px-0'
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      {/* Active indicator */}
                      {active && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-blue-500 rounded-r-full" />
                      )}

                      <span className={cn('shrink-0', active ? 'text-[#0066cc]' : 'text-[#86868b]')}>
                        {item.icon}
                      </span>

                      {!collapsed && (
                        <>
                          <span className="flex-1 truncate">{item.label}</span>
                          {item.badge && (
                            <span className={cn(
                              'text-[10px] font-semibold px-1.5 py-0.5 rounded-full',
                              active
                                ? 'bg-[#0066cc]/10 text-[#0066cc]'
                                : 'bg-black/5 text-[#86868b]'
                            )}>
                              {item.badge}
                            </span>
                          )}
                          {hasChildren && (
                            <ChevronDown
                              size={14}
                              className={cn(
                                'transition-transform duration-200',
                                expanded && 'rotate-180'
                              )}
                            />
                          )}
                        </>
                      )}
                    </Link>

                    {/* Sub-items */}
                    {hasChildren && expanded && !collapsed && (
                      <div className="ml-8 mt-1 space-y-0.5">
                        {item.children!.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              'block px-3 py-2 text-[13px] rounded-lg transition-colors font-medium',
                              isActive(child.href)
                                ? 'text-[#0066cc] bg-[#0066cc]/5'
                                : 'text-[#86868b] hover:text-[#1d1d1f] hover:bg-black/[0.03]'
                            )}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-black/5 p-3 space-y-1 shrink-0">
        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'flex items-center justify-start gap-3 rounded-xl px-3 py-2.5 text-[14px] font-medium text-[#86868b] hover:bg-black/[0.03] hover:text-[#1d1d1f] transition-colors',
            collapsed && 'justify-center px-0'
          )}
          title="Xem website"
        >
          <ExternalLink size={18} className="shrink-0" />
          {!collapsed && <span>Xem website</span>}
        </a>

        {/* Collapse toggle */}
        <button
          onClick={onToggle}
          className={cn(
            'flex items-center justify-start gap-3 rounded-xl px-3 py-2.5 text-[14px] font-medium text-[#86868b] hover:bg-black/[0.03] hover:text-[#1d1d1f] transition-colors w-full',
            collapsed && 'justify-center px-0'
          )}
        >
          {collapsed ? <PanelLeft size={18} className="shrink-0" /> : <PanelLeftClose size={18} className="shrink-0" />}
          {!collapsed && <span>Thu gọn</span>}
        </button>
      </div>
    </aside>
  )
}
