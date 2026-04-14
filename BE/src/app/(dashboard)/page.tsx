'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import {
  DollarSign, ShoppingCart, Eye, Package, TrendingUp, TrendingDown,
  ArrowRight, MoreHorizontal, FileText, Mail, Users, Clock,
  ArrowUpRight, ArrowDownRight, Plus, Filter, Calendar, Loader2,
} from 'lucide-react'
import { cn, formatCurrency, formatNumber, formatRelativeTime, getStatusColor, getStatusLabel } from '@/lib/utils'

interface DashboardData {
  totalRevenue: number
  revenueChange: number
  totalOrders: number
  ordersChange: number
  totalVisitors: number
  visitorsChange: number
  totalProducts: number
  productsChange: number
  revenueChart: { date: string; revenue: number; orders: number }[]
  topProducts: { name: string; sold: number; revenue: number }[]
  trafficSources: { source: string; visitors: number; percentage: number }[]
}

interface OrderData {
  id: string
  orderNumber: string
  customer: { name: string; email: string; phone: string }
  total: number
  status: string
  paymentStatus: string
  createdAt: string
}

interface ContactData {
  id: string
  name: string
  subject: string
  status: string
  createdAt: string
}

export default function DashboardPage() {
  const [chartPeriod, setChartPeriod] = useState<'7d' | '30d' | '90d'>('7d')
  const [dashboard, setDashboard] = useState<DashboardData | null>(null)
  const [orders, setOrders] = useState<OrderData[]>([])
  const [contacts, setContacts] = useState<ContactData[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(async () => {
    try {
      const [dashRes, ordersRes, contactsRes] = await Promise.all([
        fetch('/api/admin/dashboard'),
        fetch('/api/admin/orders'),
        fetch('/api/admin/contacts'),
      ])
      const dashJson = await dashRes.json()
      const ordersJson = await ordersRes.json()
      const contactsJson = await contactsRes.json()
      if (dashJson.success) setDashboard(dashJson.data)
      if (ordersJson.success) setOrders((ordersJson.data as OrderData[]).slice(0, 5))
      if (contactsJson.success) setContacts(contactsJson.data as ContactData[])
    } catch (e) {
      console.error('Dashboard fetch error:', e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const stats = dashboard ? [
    {
      label: 'Tổng doanh thu',
      value: formatCurrency(dashboard.totalRevenue),
      change: dashboard.revenueChange,
      icon: <DollarSign size={20} />,
      color: 'from-[#0066cc] to-[#0071e3]',
      bgLight: 'bg-[#0066cc]/5',
    },
    {
      label: 'Đơn hàng',
      value: formatNumber(dashboard.totalOrders),
      change: dashboard.ordersChange,
      icon: <ShoppingCart size={20} />,
      color: 'from-[#34c759] to-[#30b753]',
      bgLight: 'bg-[#34c759]/10',
    },
    {
      label: 'Lượt truy cập',
      value: formatNumber(dashboard.totalVisitors),
      change: dashboard.visitorsChange,
      icon: <Eye size={20} />,
      color: 'from-violet-500 to-violet-600',
      bgLight: 'bg-violet-50',
    },
    {
      label: 'Sản phẩm',
      value: formatNumber(dashboard.totalProducts),
      change: dashboard.productsChange,
      icon: <Package size={20} />,
      color: 'from-amber-500 to-amber-600',
      bgLight: 'bg-amber-50',
    },
  ] : []

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-[#0066cc]" />
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1d1d1f]">Dashboard</h1>
          <p className="text-sm text-[#86868b] mt-0.5">Tổng quan hoạt động hệ thống</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 apple-card rounded-[12px] text-[#1d1d1f] px-3 py-2 text-sm text-[#424245]">
            <Calendar size={16} />
            <span>Hôm nay, 10/04/2026</span>
          </div>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="elegant-card relative overflow-hidden group"
          >
            <div className="flex items-start justify-between relative z-10">
              <div>
                <p className="text-[0.75rem] text-slate-500 font-bold uppercase tracking-widest font-heading">{stat.label}</p>
                <p className="text-3xl font-bold text-slate-800 mt-2 tracking-tight">{stat.value}</p>
              </div>
              <div className={cn('w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3', stat.color)}>
                {stat.icon}
              </div>
            </div>
            <div className="flex items-center gap-2 mt-5 relative z-10">
              {stat.change > 0 ? (
                <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50/80 px-2 py-0.5 rounded-md text-[0.75rem] font-bold shadow-sm">
                  <ArrowUpRight size={14} />
                  {stat.change}%
                </div>
              ) : (
                <div className="flex items-center gap-1 text-rose-600 bg-rose-50/80 px-2 py-0.5 rounded-md text-[0.75rem] font-bold shadow-sm">
                  <ArrowDownRight size={14} />
                  {Math.abs(stat.change)}%
                </div>
              )}
              <span className="text-[0.75rem] text-slate-400 font-medium">so với tháng trước</span>
            </div>
            {/* Ambient Background Glow */}
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-slate-100 rounded-full blur-2xl opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue chart */}
        <div className="lg:col-span-2 elegant-card p-6 flex flex-col relative overflow-hidden group/chart">
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div>
              <h3 className="font-bold text-[1.125rem] text-slate-800 tracking-tight font-heading">Doanh thu & Đơn hàng</h3>
              <p className="text-[0.8125rem] font-medium text-slate-500 mt-1">Biểu đồ biến động theo thời gian</p>
            </div>
            <div className="flex items-center bg-slate-100/80 rounded-xl p-1 shadow-inner border border-slate-200/50">
              {(['7d', '30d', '90d'] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setChartPeriod(period)}
                  className={cn(
                    'px-4 py-1.5 text-[0.75rem] font-bold uppercase tracking-wider rounded-lg transition-all duration-300',
                    chartPeriod === period
                      ? 'bg-white text-indigo-600 shadow-[0_2px_8px_rgba(15,23,42,0.06)]'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
                  )}
                >
                  {period === '7d' ? '7 ngày' : period === '30d' ? '30 ngày' : '90 ngày'}
                </button>
              ))}
            </div>
          </div>
          {/* Ambient Background Gradient for chart */}
          <div className="absolute left-0 bottom-0 w-full h-[60%] bg-gradient-to-t from-indigo-50/50 to-transparent pointer-events-none z-0" />
          
          {/* Chart placeholder - using bars */}
          <div className="h-64 flex items-end gap-3 px-2 relative z-10 mt-auto">
            {(dashboard?.revenueChart || []).map((item, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group/bar cursor-pointer">
                <div className="w-full flex items-end justify-center gap-1.5 h-48 relative">
                  {/* Tooltip */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-800/95 backdrop-blur-md text-white text-[0.75rem] px-3 py-1.5 rounded-lg opacity-0 group-hover/bar:opacity-100 group-hover/bar:-translate-y-2 transition-all duration-300 whitespace-nowrap shadow-xl pointer-events-none z-20 font-medium">
                    <div className="font-bold text-indigo-300 mb-0.5">{formatCurrency(item.revenue)}</div>
                    <div className="text-slate-300 text-[0.6875rem]">{item.orders} Đơn hàng</div>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800/95" />
                  </div>
                  
                  {/* Bars */}
                  <div
                    className="w-[60%] max-w-[24px] bg-indigo-500 group-hover/bar:bg-indigo-400 rounded-t-md transition-all duration-500 shadow-[0_0_12px_rgba(79,70,229,0.3)] group-hover/bar:shadow-[0_0_20px_rgba(79,70,229,0.6)]"
                    style={{ height: `${(item.revenue / 140000000) * 100}%` }}
                  />
                  <div
                    className="w-[40%] max-w-[16px] bg-emerald-400 group-hover/bar:bg-emerald-300 rounded-t-md transition-all duration-500 opacity-80"
                    style={{ height: `${(item.orders / 70) * 100}%` }}
                  />
                </div>
                <span className="text-[0.6875rem] font-bold text-slate-400 group-hover/bar:text-slate-600 transition-colors uppercase tracking-wider">{item.date}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-8 mt-6 pt-5 border-t border-slate-100 relative z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-md bg-indigo-500 shadow-[0_0_8px_rgba(79,70,229,0.4)]" />
              <span className="text-xs text-[#86868b]">Doanh thu</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-[#34c759]" />
              <span className="text-xs text-[#86868b]">Đơn hàng</span>
            </div>
          </div>
        </div>

        {/* Traffic sources */}
        <div className="apple-card text-[#1d1d1f] p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-[#1d1d1f]">Nguồn truy cập</h3>
              <p className="text-sm text-[#86868b] mt-0.5">Phân bổ traffic</p>
            </div>
          </div>
          <div className="space-y-4">
            {(dashboard?.trafficSources || []).map((source) => (
              <div key={source.source}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-[#424245] font-medium">{source.source}</span>
                  <span className="text-[#86868b]">{formatNumber(source.visitors)}</span>
                </div>
                <div className="h-2 bg-black/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-700"
                    style={{ width: `${source.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-black/5 text-center">
            <span className="text-2xl font-bold text-[#1d1d1f]">{formatNumber(dashboard?.totalVisitors || 0)}</span>
            <p className="text-xs text-[#86868b] mt-1">Tổng lượt truy cập tháng này</p>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent orders */}
        <div className="lg:col-span-2 apple-card text-[#1d1d1f]">
          <div className="flex items-center justify-between p-5 border-b border-black/5">
            <div>
              <h3 className="font-semibold text-[#1d1d1f]">Đơn hàng gần đây</h3>
              <p className="text-sm text-[#86868b] mt-0.5">{orders.length} đơn hàng mới nhất</p>
            </div>
            <Link href="/orders" className="text-sm text-[#0066cc] hover:text-[#0071e3] font-medium flex items-center gap-1">
              Xem tất cả <ArrowRight size={14} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full admin-table">
              <thead>
                <tr>
                  <th className="text-left">Mã đơn</th>
                  <th className="text-left">Khách hàng</th>
                  <th className="text-right">Tổng tiền</th>
                  <th className="text-center">Trạng thái</th>
                  <th className="text-center">Thanh toán</th>
                  <th className="text-right">Thời gian</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  const statusColor = getStatusColor(order.status)
                  const paymentColor = getStatusColor(order.paymentStatus)
                  return (
                    <tr key={order.id} className="cursor-pointer">
                      <td>
                        <span className="font-semibold text-[#0066cc] text-sm">{order.orderNumber}</span>
                      </td>
                      <td>
                        <div>
                          <div className="font-medium text-[#1d1d1f] text-sm">{order.customer.name}</div>
                          <div className="text-xs text-[#86868b]">{order.customer.phone}</div>
                        </div>
                      </td>
                      <td className="text-right font-semibold text-sm">{formatCurrency(order.total)}</td>
                      <td className="text-center">
                        <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium', statusColor.bg, statusColor.text)}>
                          <span className={cn('w-1.5 h-1.5 rounded-full', statusColor.dot)} />
                          {getStatusLabel(order.status)}
                        </span>
                      </td>
                      <td className="text-center">
                        <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium', paymentColor.bg, paymentColor.text)}>
                          {getStatusLabel(order.paymentStatus)}
                        </span>
                      </td>
                      <td className="text-right text-xs text-[#86868b]">{formatRelativeTime(order.createdAt)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right column: Quick stats + Recent contacts */}
        <div className="space-y-6">
          {/* Top Products */}
          <div className="apple-card text-[#1d1d1f] p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#1d1d1f]">Sản phẩm bán chạy</h3>
              <Link href="/products" className="text-xs text-[#0066cc] hover:text-[#0071e3] font-medium">Xem tất cả</Link>
            </div>
            <div className="space-y-3">
              {(dashboard?.topProducts || []).map((product, i) => (
                <div key={product.name} className="flex items-center gap-3">
                  <span className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold',
                    i === 0 ? 'bg-amber-100 text-amber-700' :
                    i === 1 ? 'bg-black/5 text-[#424245]' :
                    i === 2 ? 'bg-orange-100 text-orange-700' :
                    'bg-black/[0.02] text-[#86868b]'
                  )}>
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#1d1d1f] truncate">{product.name}</p>
                    <p className="text-xs text-[#86868b]">{formatNumber(product.sold)} đã bán</p>
                  </div>
                  <span className="text-sm font-semibold text-[#1d1d1f]">{formatCurrency(product.revenue)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent contacts */}
          <div className="elegant-card p-6 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-full blur-3xl opacity-50 z-0 pointer-events-none" />
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className="flex items-center gap-3">
                <h3 className="font-bold text-[1rem] text-slate-800 tracking-tight">Liên hệ mới</h3>
                <span className="bg-rose-100 text-rose-600 text-[0.6875rem] font-bold px-2 py-0.5 rounded-md shadow-sm">
                  {contacts.filter(c => c.status === 'new').length} mới
                </span>
              </div>
              <Link href="/contacts" className="text-[0.75rem] font-bold text-indigo-600 hover:text-indigo-700 transition-colors uppercase tracking-wider">Xem tất cả</Link>
            </div>
            <div className="space-y-4 relative z-10">
              {contacts.slice(0, 4).map((contact) => {
                const statusColor = getStatusColor(contact.status)
                return (
                  <div key={contact.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50/80 transition-all duration-300 cursor-pointer group border border-transparent hover:border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-200 to-slate-100 border border-slate-200/50 flex items-center justify-center text-[0.875rem] font-bold text-slate-600 shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                      {contact.name.split(' ').slice(-1)[0][0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-[0.875rem] font-bold text-slate-800 truncate group-hover:text-indigo-600 transition-colors">{contact.name}</p>
                        <span className={cn('w-2 h-2 rounded-full shrink-0 shadow-sm', statusColor.bg, contact.status === 'new' && 'animate-pulse')} />
                      </div>
                      <p className="text-[0.8125rem] text-slate-500 truncate mt-0.5 font-medium">{contact.subject}</p>
                      <p className="text-[0.6875rem] font-bold text-slate-400 mt-1.5 uppercase tracking-wider">{formatRelativeTime(contact.createdAt)}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-gradient-to-br from-indigo-600 to-blue-600 rounded-3xl p-6 text-white shadow-[0_8px_30px_rgba(79,70,229,0.3)] relative overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
            
            <h3 className="font-bold text-[1.125rem] mb-5 tracking-tight relative z-10 font-heading">Thao tác nhanh</h3>
            <div className="grid grid-cols-2 gap-3 relative z-10">
              {[
                { label: 'Tạo bài viết', href: '/posts/new', icon: <FileText size={18} /> },
                { label: 'Thêm thiết bị', href: '/products/new', icon: <Package size={18} /> },
                { label: 'Xử lý đơn', href: '/orders', icon: <ShoppingCart size={18} /> },
                { label: 'Analytics', href: '/analytics', icon: <TrendingUp size={18} /> },
              ].map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/5 hover:border-white/20 rounded-xl px-4 py-3 text-[0.8125rem] font-bold shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <span className="text-indigo-200">{action.icon}</span>
                  {action.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
