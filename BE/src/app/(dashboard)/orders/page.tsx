'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Search, Filter, Eye, ChevronLeft, ChevronRight, Package,
  Truck, CheckCircle, XCircle, Clock, CreditCard, MapPin,
  Phone, Mail, ChevronDown, MoreHorizontal, Printer, Download, Loader2,
} from 'lucide-react'
import { cn, formatCurrency, formatDate, formatRelativeTime, getStatusColor, getStatusLabel } from '@/lib/utils'
import type { OrderStatus } from '@/types'

const statusFilters: { label: string; value: OrderStatus | 'all'; icon: React.ReactNode }[] = [
  { label: 'Tất cả', value: 'all', icon: <Package size={14} /> },
  { label: 'Chờ xử lý', value: 'pending', icon: <Clock size={14} /> },
  { label: 'Đã xác nhận', value: 'confirmed', icon: <CheckCircle size={14} /> },
  { label: 'Đang xử lý', value: 'processing', icon: <Package size={14} /> },
  { label: 'Đang giao', value: 'shipped', icon: <Truck size={14} /> },
  { label: 'Đã giao', value: 'delivered', icon: <CheckCircle size={14} /> },
  { label: 'Đã huỷ', value: 'cancelled', icon: <XCircle size={14} /> },
]

export default function OrdersPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all')
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null)
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/orders')
      const json = await res.json()
      if (json.success) {
        setOrders(json.data)
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  if (loading) return <div className="flex items-center justify-center h-96"><Loader2 className="w-8 h-8 animate-spin text-[#0066cc]" /></div>

  const filtered = orders.filter((o) => {
    if (statusFilter !== 'all' && o.status !== statusFilter) return false
    if (search && !o.orderNumber.toLowerCase().includes(search.toLowerCase()) && !o.customer.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const orderStats = [
    { label: 'Tổng đơn', value: orders.length, color: 'text-slate-700' },
    { label: 'Chờ xử lý', value: orders.filter(o => o.status === 'pending').length, color: 'text-amber-600' },
    { label: 'Đang giao', value: orders.filter(o => ['processing', 'shipped', 'confirmed'].includes(o.status)).length, color: 'text-blue-600' },
    { label: 'Hoàn thành', value: orders.filter(o => o.status === 'delivered').length, color: 'text-emerald-600' },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Đơn hàng</h1>
          <p className="text-sm text-slate-500 mt-0.5">Quản lý và theo dõi đơn hàng</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
          <Download size={16} /> Xuất báo cáo
        </button>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-4 gap-4">
        {orderStats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-slate-200 p-4 text-center">
            <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
            <p className={cn('text-2xl font-bold mt-1', stat.color)}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Tìm mã đơn, tên khách hàng..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
          </div>
          <div className="flex items-center bg-slate-100 rounded-lg p-0.5 overflow-x-auto">
            {statusFilters.map((f) => (
              <button key={f.value} onClick={() => setStatusFilter(f.value)} className={cn('flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium transition-all whitespace-nowrap', statusFilter === f.value ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500')}>
                {f.icon} {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders list */}
        <div className={cn('bg-white rounded-xl border border-slate-200 overflow-hidden', selectedOrder ? 'lg:col-span-2' : 'lg:col-span-3')}>
          <div className="overflow-x-auto">
            <table className="w-full admin-table">
              <thead>
                <tr>
                  <th className="text-left">Mã đơn</th>
                  <th className="text-left">Khách hàng</th>
                  <th className="text-left">Sản phẩm</th>
                  <th className="text-right">Tổng tiền</th>
                  <th className="text-center">Trạng thái</th>
                  <th className="text-center">Thanh toán</th>
                  <th className="text-right">Ngày đặt</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((order) => {
                  const statusColor = getStatusColor(order.status)
                  const paymentColor = getStatusColor(order.paymentStatus)
                  const active = selectedOrder?.id === order.id
                  return (
                    <tr key={order.id} className={cn('cursor-pointer', active && 'bg-blue-50')} onClick={() => setSelectedOrder(order)}>
                      <td><span className="font-bold text-blue-600 text-sm">{order.orderNumber}</span></td>
                      <td>
                        <div className="font-medium text-sm text-slate-700">{order.customer.name}</div>
                        <div className="text-xs text-slate-400">{order.customer.phone}</div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                            {order.items.slice(0, 2).map((item, i) => (
                              <div key={i} className="w-8 h-8 rounded-md bg-slate-100 border-2 border-white overflow-hidden">
                                <Image src={item.image} alt="" width={32} height={32} className="w-full h-full object-cover" />
                              </div>
                            ))}
                          </div>
                          <span className="text-xs text-slate-500">{order.items.length} sản phẩm</span>
                        </div>
                      </td>
                      <td className="text-right font-bold text-sm">{formatCurrency(order.total)}</td>
                      <td className="text-center">
                        <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium', statusColor.bg, statusColor.text)}>
                          <span className={cn('w-1.5 h-1.5 rounded-full', statusColor.dot)} />
                          {getStatusLabel(order.status)}
                        </span>
                      </td>
                      <td className="text-center">
                        <span className={cn('text-xs font-medium px-2 py-1 rounded-full', paymentColor.bg, paymentColor.text)}>
                          {getStatusLabel(order.paymentStatus)}
                        </span>
                      </td>
                      <td className="text-right text-xs text-slate-400">{formatRelativeTime(order.createdAt)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order detail panel */}
        {selectedOrder && (
          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-800">{selectedOrder.orderNumber}</h3>
              <button onClick={() => setSelectedOrder(null)} className="p-1 rounded hover:bg-slate-100 text-slate-400"><XCircle size={18} /></button>
            </div>
            {/* Status */}
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">Cập nhật trạng thái</label>
              <select defaultValue={selectedOrder.status} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20">
                {statusFilters.filter(f => f.value !== 'all').map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
              </select>
            </div>
            {/* Customer */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-slate-500 uppercase">Khách hàng</h4>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm"><span className="font-medium">{selectedOrder.customer.name}</span></div>
                <div className="flex items-center gap-2 text-sm text-slate-500"><Phone size={13} />{selectedOrder.customer.phone}</div>
                <div className="flex items-center gap-2 text-sm text-slate-500"><Mail size={13} />{selectedOrder.customer.email}</div>
                <div className="flex items-center gap-2 text-sm text-slate-500"><MapPin size={13} />{selectedOrder.shippingAddress}</div>
              </div>
            </div>
            {/* Items */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-slate-500 uppercase">Sản phẩm</h4>
              {selectedOrder.items.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg">
                  <Image src={item.image} alt="" width={40} height={40} className="w-10 h-10 rounded-md object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-700 truncate">{item.name}</p>
                    <p className="text-xs text-slate-400">x{item.quantity}</p>
                  </div>
                  <span className="text-sm font-semibold">{formatCurrency(item.total)}</span>
                </div>
              ))}
            </div>
            {/* Summary */}
            <div className="space-y-2 pt-3 border-t border-slate-100">
              <div className="flex justify-between text-sm"><span className="text-slate-500">Tạm tính</span><span>{formatCurrency(selectedOrder.subtotal)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-slate-500">Phí ship</span><span>{formatCurrency(selectedOrder.shippingFee)}</span></div>
              {selectedOrder.discount > 0 && <div className="flex justify-between text-sm"><span className="text-slate-500">Giảm giá</span><span className="text-red-500">-{formatCurrency(selectedOrder.discount)}</span></div>}
              <div className="flex justify-between text-base font-bold pt-2 border-t border-slate-100"><span>Tổng cộng</span><span className="text-blue-600">{formatCurrency(selectedOrder.total)}</span></div>
            </div>
            {selectedOrder.notes && (
              <div className="p-3 bg-amber-50 rounded-lg">
                <p className="text-xs font-medium text-amber-700">Ghi chú: {selectedOrder.notes}</p>
              </div>
            )}
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-blue-500 text-white rounded-lg text-sm font-semibold hover:bg-blue-600">
                <CheckCircle size={14} /> Cập nhật
              </button>
              <button className="p-2.5 border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50"><Printer size={16} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
