'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Plus, Search, Filter, Trash2, Edit, Eye, ChevronLeft, ChevronRight,
  ShoppingBag, MoreHorizontal, Download, Archive, Grid3X3, List as ListIcon, Loader2, CheckCircle2, XCircle,
} from 'lucide-react'
import { cn, formatCurrency, formatNumber, getStatusColor, getStatusLabel } from '@/lib/utils'
import type { ProductStatus, ProductCategory } from '@/types'

const statusFilters: { label: string; value: ProductStatus | 'all' }[] = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Đang bán', value: 'active' },
  { label: 'Nháp', value: 'draft' },
  { label: 'Hết hàng', value: 'outOfStock' },
]

const categoryLabels: Record<ProductCategory, string> = {
  laptop: 'Laptop', pc: 'PC & Máy bàn', linhkien: 'Linh kiện',
  ngoaivi: 'Ngoại vi', phanmem: 'Phần mềm', mang: 'Thiết bị mạng',
}

export default function ProductsPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<ProductStatus | 'all'>('all')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const showMsg = (type: 'success' | 'error', text: string) => { setMsg({ type, text }); setTimeout(() => setMsg(null), 3000) }

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/products')
      const json = await res.json()
      if (json.success) {
        setProducts(json.data)
      }
    } catch (err) {
      console.error('Failed to fetch products:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const handleDelete = async (id: string) => {
    if (!confirm('Xác nhận xoá sản phẩm này?')) return
    try {
      const res = await fetch(`/api/admin/products?id=${id}`, { method: 'DELETE' })
      const json = await res.json()
      if (json.success) { showMsg('success', 'Đã xoá sản phẩm!'); fetchProducts() }
      else showMsg('error', json.message || 'DELETE_FAILED')
    } catch { showMsg('error', 'NETWORK_ERROR: Lỗi kết nối') }
  }

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return
    if (!confirm(`Xoá ${selectedIds.length} sản phẩm đã chọn?`)) return
    for (const id of selectedIds) {
      try { await fetch(`/api/admin/products?id=${id}`, { method: 'DELETE' }) } catch {}
    }
    showMsg('success', `Đã xoá ${selectedIds.length} sản phẩm!`)
    setSelectedIds([])
    fetchProducts()
  }

  const filtered = products.filter((p) => {
    if (statusFilter !== 'all' && p.status !== statusFilter) return false
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const allSelected = filtered.length > 0 && selectedIds.length === filtered.length
  const toggleAll = () => setSelectedIds(allSelected ? [] : filtered.map((p) => p.id))
  const toggleOne = (id: string) => setSelectedIds((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id])

  if (loading) return <div className="flex items-center justify-center h-96"><Loader2 className="w-8 h-8 animate-spin text-[#0066cc]" /></div>

  return (
    <div className="space-y-6 animate-fade-in">
      {msg && (
        <div className={cn('flex items-center gap-2 p-3 rounded-lg text-sm fixed top-4 right-4 z-50 shadow-lg', msg.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200')}>
          {msg.type === 'success' ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
          {msg.text}
        </div>
      )}
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Sản phẩm</h1>
          <p className="text-sm text-slate-500 mt-0.5">Quản lý kho hàng và sản phẩm</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
            <Download size={16} />
            Xuất Excel
          </button>
          <Link
            href="/products/new"
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm"
          >
            <Plus size={16} />
            Thêm sản phẩm
          </Link>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Tổng sản phẩm', value: products.length, color: 'text-blue-600 bg-blue-50' },
          { label: 'Đang bán', value: products.filter(p => p.status === 'active').length, color: 'text-emerald-600 bg-emerald-50' },
          { label: 'Hết hàng', value: products.filter(p => p.status === 'outOfStock').length, color: 'text-red-600 bg-red-50' },
          { label: 'Tổng giá trị kho', value: formatCurrency(products.reduce((sum, p) => sum + p.price * (p.stock ?? 0), 0)), color: 'text-purple-600 bg-purple-50' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
            <p className={cn('text-xl font-bold mt-1', stat.color.split(' ')[0])}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm, SKU, thương hiệu..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div className="flex items-center bg-slate-100 rounded-lg p-0.5">
            {statusFilters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setStatusFilter(filter.value)}
                className={cn(
                  'px-3 py-2 rounded-md text-xs font-medium transition-all',
                  statusFilter === filter.value
                    ? 'bg-white text-slate-800 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="flex items-center bg-slate-100 rounded-lg p-0.5">
            <button onClick={() => setViewMode('table')} className={cn('p-2 rounded-md transition-all', viewMode === 'table' ? 'bg-white shadow-sm text-slate-700' : 'text-slate-400')}>
              <ListIcon size={16} />
            </button>
            <button onClick={() => setViewMode('grid')} className={cn('p-2 rounded-md transition-all', viewMode === 'grid' ? 'bg-white shadow-sm text-slate-700' : 'text-slate-400')}>
              <Grid3X3 size={16} />
            </button>
          </div>

          {selectedIds.length > 0 && (
            <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
              <span className="text-sm text-slate-500">{selectedIds.length} đã chọn</span>
              <button onClick={handleBulkDelete} className="p-2 rounded-lg text-red-500 hover:bg-red-50"><Trash2 size={16} /></button>
              <button className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"><Archive size={16} /></button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      {viewMode === 'table' ? (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full admin-table">
              <thead>
                <tr>
                  <th className="w-12">
                    <input type="checkbox" checked={allSelected} onChange={toggleAll} className="w-4 h-4 rounded border-slate-300 text-blue-500" />
                  </th>
                  <th className="text-left">Sản phẩm</th>
                  <th className="text-left">SKU</th>
                  <th className="text-left">Danh mục</th>
                  <th className="text-right">Giá bán</th>
                  <th className="text-center">Tồn kho</th>
                  <th className="text-center">Trạng thái</th>
                  <th className="text-right">Đã bán</th>
                  <th className="w-16"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((product) => {
                  const statusColor = getStatusColor(product.status)
                  const selected = selectedIds.includes(product.id)
                  return (
                    <tr key={product.id} className={cn(selected && 'bg-blue-50/50')}>
                      <td>
                        <input type="checkbox" checked={selected} onChange={() => toggleOne(product.id)} className="w-4 h-4 rounded border-slate-300 text-blue-500" />
                      </td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-slate-50 border border-slate-200 overflow-hidden shrink-0">
                            <Image src={product.image || '/placeholder.png'} alt={product.name} width={48} height={48} className="w-full h-full object-cover" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <Link href={`/products/new?id=${product.id}`} className="font-semibold text-slate-800 hover:text-blue-600 transition-colors truncate">
                                {product.name}
                              </Link>
                              {product.featured && (
                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-700">
                                  Featured
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5">{product.category}</p>
                          </div>
                        </div>
                      </td>
                      <td><span className="text-xs font-mono text-slate-500">{product.sku}</span></td>
                      <td>
                        <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
                          {categoryLabels[product.category as ProductCategory]}
                        </span>
                      </td>
                      <td className="text-right">
                        <div>
                          <span className="font-semibold text-sm">{formatCurrency(product.price)}</span>
                          {product.comparePrice && (
                            <span className="text-xs text-slate-400 line-through ml-2">{formatCurrency(product.comparePrice)}</span>
                          )}
                        </div>
                      </td>
                      <td className="text-center">
                        <span className={cn(
                          'text-sm font-semibold',
                          product.stock === 0 ? 'text-red-500' :
                          product.stock < 10 ? 'text-amber-600' :
                          'text-slate-700'
                        )}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="text-center">
                        <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium', statusColor.bg, statusColor.text)}>
                          <span className={cn('w-1.5 h-1.5 rounded-full', statusColor.dot)} />
                          {getStatusLabel(product.status)}
                        </span>
                      </td>
                      <td className="text-right text-sm text-slate-500">{formatNumber(product.sold ?? 0)}</td>
                      <td>
                        <div className="flex items-center justify-end gap-1">
                          <Link href={`/products/new?id=${product.id}`} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                            <Edit size={14} />
                          </Link>
                          <button onClick={() => handleDelete(product.id)} className="p-1.5 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100">
            <p className="text-sm text-slate-500">Hiển thị <span className="font-medium text-slate-700">{filtered.length}</span> sản phẩm</p>
            <div className="flex items-center gap-1">
              <button className="p-2 rounded-lg border border-slate-200 text-slate-400 disabled:opacity-50" disabled><ChevronLeft size={16} /></button>
              <button className="w-8 h-8 rounded-lg bg-blue-500 text-white text-sm font-medium">1</button>
              <button className="p-2 rounded-lg border border-slate-200 text-slate-400"><ChevronRight size={16} /></button>
            </div>
          </div>
        </div>
      ) : (
        /* Grid view */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((product) => {
            const statusColor = getStatusColor(product.status)
            return (
              <div key={product.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-all group">
                <div className="relative h-48 bg-slate-50">
                  <Image src={product.image || '/placeholder.png'} alt={product.name} fill className="object-cover" />
                  {product.featured && (
                    <span className="absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded-md bg-amber-100 text-amber-700">
                      Featured
                    </span>
                  )}
                  <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href={`/products/new?id=${product.id}`} className="w-8 h-8 bg-white/90 rounded-lg flex items-center justify-center text-slate-600 hover:bg-white shadow-sm">
                      <Edit size={14} />
                    </Link>
                    <button onClick={() => handleDelete(product.id)} className="w-8 h-8 bg-white/90 rounded-lg flex items-center justify-center text-red-500 hover:bg-white shadow-sm">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-medium bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">{categoryLabels[product.category as ProductCategory]}</span>
                    <span className={cn('text-[10px] font-medium px-1.5 py-0.5 rounded-full', statusColor.bg, statusColor.text)}>
                      {getStatusLabel(product.status)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm text-slate-800 line-clamp-1">{product.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">SKU: {product.sku} · Stock: {product.stock}</p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                    <div>
                      <span className="font-bold text-blue-600">{formatCurrency(product.price)}</span>
                      {product.comparePrice && <span className="text-xs text-slate-400 line-through ml-1">{formatCurrency(product.comparePrice)}</span>}
                    </div>
                    <span className="text-xs text-slate-400">{formatNumber(product.sold ?? 0)} đã bán</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
