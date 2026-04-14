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
  Activity,
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
      { label: 'Activity Logs', href: '/logs', icon: <Activity size={20} /> },
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
        'bg-white/60 border-slate-200/80 shadow-[1px_0_40px_rgba(15,23,42,0.02)]'
      )}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-slate-200/60 shrink-0">
        <div className="flex items-center gap-3 min-w-0 px-1">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center shrink-0 shadow-[0_4px_12px_rgba(79,70,229,0.3)]">
            <span className="text-white font-bold text-[15px] font-heading tracking-tight">M</span>
          </div>
          {!collapsed && (
            <div className="min-w-0 animate-fade-in flex flex-col justify-center">
              <div className="text-slate-900 font-bold text-[15px] leading-none truncate tracking-tight font-heading block">MTIEN</div>
              <div className="text-slate-500 font-medium text-[11px] leading-tight mt-1">Admin Workspace</div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto custom-scrollbar py-6 px-4 space-y-6">
        {navigation.map((group) => (
          <div key={group.title} className="relative">
            {!collapsed && (
              <div className="text-[11px] font-bold text-slate-400/80 px-2 mb-2 tracking-widest uppercase font-heading">
                {group.title}
              </div>
            )}
            <div className="space-y-1">
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
                        'flex items-center gap-3.5 rounded-xl px-3 py-2.5 text-[0.875rem] font-medium transition-all duration-300 group relative',
                        active
                          ? 'bg-indigo-50/80 text-indigo-700 shadow-sm ring-1 ring-indigo-100/50'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
                        collapsed && 'justify-center px-0'
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      {/* Active indicator */}
                      {active && !collapsed && (
                        <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full shadow-[0_0_8px_rgba(79,70,229,0.5)]" />
                      )}

                      <span className={cn('shrink-0 transition-colors duration-300 py-0.5', active ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600')}>
                        {item.icon}
                      </span>

                      {!collapsed && (
                        <>
                          <span className="flex-1 truncate">{item.label}</span>
                          {item.badge && (
                            <span className={cn(
                              'text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm',
                              active
                                ? 'bg-indigo-100 text-indigo-700'
                                : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                            )}>
                              {item.badge}
                            </span>
                          )}
                          {hasChildren && (
                            <ChevronDown
                              size={14}
                              className={cn(
                                'transition-transform duration-300 text-slate-400',
                                expanded && 'rotate-180 text-slate-600'
                              )}
                            />
                          )}
                        </>
                      )}
                    </Link>

                    {/* Sub-items */}
                    {hasChildren && expanded && !collapsed && (
                      <div className="ml-[2.25rem] mt-1.5 border-l-2 border-slate-100 pl-3 space-y-1 py-1">
                        {item.children!.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              'block px-3 py-2 text-[0.8125rem] rounded-lg transition-all duration-300 font-medium',
                              isActive(child.href)
                                ? 'text-indigo-700 bg-indigo-50/50 font-semibold'
                                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
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
      <div className="border-t border-slate-200/60 p-4 space-y-1.5 shrink-0 bg-slate-50/50">
        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'flex items-center justify-start gap-3.5 rounded-xl px-3 py-2.5 text-[0.875rem] font-medium text-slate-500 hover:bg-slate-100/80 hover:text-indigo-600 transition-all duration-300 group',
            collapsed && 'justify-center px-0 gap-0'
          )}
          title="Xem website"
        >
          <ExternalLink size={18} className="shrink-0 transition-transform group-hover:scale-105" />
          {!collapsed && <span>Xem website</span>}
        </a>

        {/* Collapse toggle */}
        <button
          onClick={onToggle}
          className={cn(
            'flex items-center justify-start gap-3.5 rounded-xl px-3 py-2.5 text-[0.875rem] font-medium text-slate-500 hover:bg-slate-100/80 hover:text-slate-900 transition-all duration-300 w-full group',
            collapsed && 'justify-center px-0 gap-0'
          )}
        >
          {collapsed ? <PanelLeft size={18} className="shrink-0 transition-transform group-hover:scale-105" /> : <PanelLeftClose size={18} className="shrink-0 transition-transform group-hover:scale-105" />}
          {!collapsed && <span>Thu gọn sidebar</span>}
        </button>
      </div>
    </aside>
  )
}
