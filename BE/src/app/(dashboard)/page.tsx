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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="apple-card text-[#1d1d1f] p-5 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-[#86868b] font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-[#1d1d1f] mt-1">{stat.value}</p>
              </div>
              <div className={cn('w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center text-white', stat.color)}>
                {stat.icon}
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-3">
              {stat.change > 0 ? (
                <div className="flex items-center gap-0.5 text-[#34c759] bg-[#34c759]/10 px-1.5 py-0.5 rounded-full text-xs font-semibold">
                  <ArrowUpRight size={12} />
                  {stat.change}%
                </div>
              ) : (
                <div className="flex items-center gap-0.5 text-red-600 bg-red-50 px-1.5 py-0.5 rounded-full text-xs font-semibold">
                  <ArrowDownRight size={12} />
                  {Math.abs(stat.change)}%
                </div>
              )}
              <span className="text-xs text-[#86868b]">so với tháng trước</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue chart */}
        <div className="lg:col-span-2 apple-card text-[#1d1d1f] p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-[#1d1d1f]">Doanh thu & Đơn hàng</h3>
              <p className="text-sm text-[#86868b] mt-0.5">Biểu đồ theo thời gian</p>
            </div>
            <div className="flex items-center bg-black/5 rounded-lg p-0.5">
              {(['7d', '30d', '90d'] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setChartPeriod(period)}
                  className={cn(
                    'px-3 py-1.5 text-xs font-medium rounded-md transition-all',
                    chartPeriod === period
                      ? 'bg-white text-[#1d1d1f] shadow-sm'
                      : 'text-[#86868b] hover:text-[#1d1d1f]'
                  )}
                >
                  {period === '7d' ? '7 ngày' : period === '30d' ? '30 ngày' : '90 ngày'}
                </button>
              ))}
            </div>
          </div>
          {/* Chart placeholder - using bars */}
          <div className="h-64 flex items-end gap-2 px-2">
            {(dashboard?.revenueChart || []).map((item, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex flex-col items-center gap-0.5">
                  <div
                    className="w-full bg-[#0066cc] rounded-t-md transition-all duration-500 hover:bg-[#0071e3] cursor-pointer relative group"
                    style={{ height: `${(item.revenue / 140000000) * 200}px` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {formatCurrency(item.revenue)}
                    </div>
                  </div>
                  <div
                    className="w-3/4 bg-[#34c759] rounded-t-sm"
                    style={{ height: `${(item.orders / 70) * 40}px` }}
                  />
                </div>
                <span className="text-[10px] text-[#86868b] mt-1">{item.date}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-black/5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-[#0066cc]" />
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
          <div className="apple-card text-[#1d1d1f] p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-[#1d1d1f]">Liên hệ mới</h3>
                <span className="bg-red-100 text-red-600 text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {contacts.filter(c => c.status === 'new').length}
                </span>
              </div>
              <Link href="/contacts" className="text-xs text-[#0066cc] hover:text-[#0071e3] font-medium">Xem tất cả</Link>
            </div>
            <div className="space-y-3">
              {contacts.slice(0, 4).map((contact) => {
                const statusColor = getStatusColor(contact.status)
                return (
                  <div key={contact.id} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-black/[0.02] transition-colors cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-xs font-bold text-[#424245] shrink-0">
                      {contact.name.split(' ').slice(-1)[0][0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-[#1d1d1f] truncate">{contact.name}</p>
                        <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', statusColor.dot, contact.status === 'new' && 'status-pulse')} />
                      </div>
                      <p className="text-xs text-[#86868b] truncate">{contact.subject}</p>
                      <p className="text-[10px] text-[#86868b] mt-0.5">{formatRelativeTime(contact.createdAt)}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-gradient-to-br from-[#0066cc] to-[#0071e3] rounded-xl p-5 text-white">
            <h3 className="font-semibold mb-3">Thao tác nhanh</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Tạo bài viết', href: '/posts/new', icon: <FileText size={16} /> },
                { label: 'Thêm sản phẩm', href: '/products/new', icon: <Package size={16} /> },
                { label: 'Quản lý đơn hàng', href: '/orders', icon: <ShoppingCart size={16} /> },
                { label: 'Xem Analytics', href: '/analytics', icon: <TrendingUp size={16} /> },
              ].map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
                >
                  {action.icon}
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
