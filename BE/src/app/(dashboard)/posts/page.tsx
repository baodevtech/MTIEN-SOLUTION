'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Plus, Search, Filter, MoreHorizontal, Trash2, Edit, Eye,
  ChevronDown, ChevronLeft, ChevronRight, FileText, Check,
  Download, Archive, Copy,
} from 'lucide-react'
import { cn, formatDate, formatNumber, getStatusColor, getStatusLabel, truncate } from '@/lib/utils'
import type { PostStatus } from '@/types'

const statusFilters: { label: string; value: PostStatus | 'all' }[] = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Đã xuất bản', value: 'published' },
  { label: 'Nháp', value: 'draft' },
  { label: 'Đã lên lịch', value: 'scheduled' },
  { label: 'Lưu trữ', value: 'archived' },
]

const categoryFilters = ['Tất cả', 'Thiết kế', 'Cloud', 'Marketing', 'E-commerce', 'AI', 'Bảo mật', 'Chuyển đổi số']

export default function PostsPage() {
  const [posts, setPosts] = useState<Array<{ id: string; title: string; slug: string; excerpt?: string | null; content?: string | null; coverImage?: string | null; category?: string | null; tags: string[]; author?: string | null; status: string; views: number; publishedAt?: string | null; createdAt: string; updatedAt: string }>>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<PostStatus | 'all'>('all')
  const [categoryFilter, setCategoryFilter] = useState('Tất cả')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  const fetchPosts = useCallback(async () => {
    try {
      const params = new URLSearchParams()
      if (statusFilter !== 'all') params.set('status', statusFilter)
      if (search) params.set('search', search)
      params.set('limit', '50')
      const res = await fetch(`/api/admin/posts?${params}`)
      const json = await res.json()
      setPosts(json.data || [])
    } catch { /* ignore */ } finally { setLoading(false) }
  }, [statusFilter, search])

  useEffect(() => { fetchPosts() }, [fetchPosts])

  const filtered = posts.filter((post) => {
    if (categoryFilter !== 'Tất cả' && post.category !== categoryFilter) return false
    return true
  })

  const allSelected = filtered.length > 0 && selectedIds.length === filtered.length
  const toggleAll = () => {
    setSelectedIds(allSelected ? [] : filtered.map((p) => p.id))
  }
  const toggleOne = (id: string) => {
    setSelectedIds((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id])
  }

  const statusCounts = {
    all: posts.length,
    published: posts.filter((p) => p.status === 'published').length,
    draft: posts.filter((p) => p.status === 'draft').length,
    scheduled: posts.filter((p) => p.status === 'scheduled').length,
    archived: posts.filter((p) => p.status === 'archived').length,
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" /></div>

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Bài viết</h1>
          <p className="text-sm text-slate-500 mt-0.5">Quản lý tất cả bài viết và tin tức</p>
        </div>
        <Link
          href="/posts/new"
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm"
        >
          <Plus size={16} />
          Tạo bài viết
        </Link>
      </div>

      {/* Status tabs */}
      <div className="flex items-center gap-1 bg-white rounded-lg border border-slate-200 p-1">
        {statusFilters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setStatusFilter(filter.value)}
            className={cn(
              'px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2',
              statusFilter === filter.value
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
            )}
          >
            {filter.label}
            <span className={cn(
              'text-[10px] px-1.5 py-0.5 rounded-full font-bold',
              statusFilter === filter.value ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
            )}>
              {statusCounts[filter.value]}
            </span>
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Category filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm appearance-none cursor-pointer outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            {categoryFilters.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Bulk actions */}
          {selectedIds.length > 0 && (
            <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
              <span className="text-sm text-slate-500">{selectedIds.length} đã chọn</span>
              <button className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors" title="Xoá">
                <Trash2 size={16} />
              </button>
              <button className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors" title="Lưu trữ">
                <Archive size={16} />
              </button>
              <button className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors" title="Nhân bản">
                <Copy size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full admin-table">
            <thead>
              <tr>
                <th className="w-12">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    className="w-4 h-4 rounded border-slate-300 text-blue-500 focus:ring-blue-500"
                  />
                </th>
                <th className="text-left">Bài viết</th>
                <th className="text-left">Chuyên mục</th>
                <th className="text-center">Trạng thái</th>
                <th className="text-left">Tác giả</th>
                <th className="text-right">Lượt xem</th>
                <th className="text-right">Ngày tạo</th>
                <th className="w-16"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((post) => {
                const statusColor = getStatusColor(post.status)
                const selected = selectedIds.includes(post.id)
                return (
                  <tr key={post.id} className={cn(selected && 'bg-blue-50/50')}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => toggleOne(post.id)}
                        className="w-4 h-4 rounded border-slate-300 text-blue-500 focus:ring-blue-500"
                      />
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        {post.coverImage ? (
                          <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                            <Image
                              src={post.coverImage}
                              alt={post.title}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                            <FileText size={18} className="text-slate-400" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <Link href={`/posts/new?id=${post.id}`} className="font-semibold text-slate-800 hover:text-blue-600 transition-colors line-clamp-1">
                            {post.title}
                          </Link>
                          <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{post.excerpt}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
                        {post.category || 'Chưa phân loại'}
                      </span>
                    </td>
                    <td className="text-center">
                      <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium', statusColor.bg, statusColor.text)}>
                        <span className={cn('w-1.5 h-1.5 rounded-full', statusColor.dot)} />
                        {getStatusLabel(post.status)}
                      </span>
                    </td>
                    <td>
                      <span className="text-sm text-slate-600">{post.author || '—'}</span>
                    </td>
                    <td className="text-right text-sm text-slate-500">{formatNumber(post.views)}</td>
                    <td className="text-right text-sm text-slate-400">{formatDate(post.createdAt)}</td>
                    <td>
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/posts/new?id=${post.id}`}
                          className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                        >
                          <Edit size={14} />
                        </Link>
                        <button className="p-1.5 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors">
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

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100">
          <p className="text-sm text-slate-500">
            Hiển thị <span className="font-medium text-slate-700">{filtered.length}</span> / {posts.length} bài viết
          </p>
          <div className="flex items-center gap-1">
            <button className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 transition-colors disabled:opacity-50" disabled>
              <ChevronLeft size={16} />
            </button>
            <button className="w-8 h-8 rounded-lg bg-blue-500 text-white text-sm font-medium">1</button>
            <button className="w-8 h-8 rounded-lg text-slate-500 hover:bg-slate-100 text-sm font-medium transition-colors">2</button>
            <button className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
