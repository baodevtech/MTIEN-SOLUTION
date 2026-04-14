'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Search, Filter, Trash2, RefreshCw, ChevronLeft, ChevronRight,
  CheckCircle2, XCircle, AlertTriangle, Clock, Activity,
  Globe, FileText, ShoppingBag, Package, Mail, Settings, Palette,
  Users, Server, BarChart3, Layers, X, ChevronDown, Download,
  Loader2, Info,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface LogEntry {
  id: string
  action: string
  module: string
  status: 'success' | 'failed' | 'warning'
  message: string
  detail?: Record<string, unknown>
  userId?: string
  userName?: string
  ip?: string
  duration?: number
  createdAt: string
}

interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

interface Stats {
  success: number
  failed: number
  warning: number
  total: number
}

const moduleIcons: Record<string, React.ReactNode> = {
  theme: <Palette size={16} />,
  post: <FileText size={16} />,
  product: <ShoppingBag size={16} />,
  order: <Package size={16} />,
  contact: <Mail size={16} />,
  settings: <Settings size={16} />,
  service: <Server size={16} />,
  project: <Layers size={16} />,
  user: <Users size={16} />,
  media: <Globe size={16} />,
  analytics: <BarChart3 size={16} />,
  system: <Activity size={16} />,
  page: <FileText size={16} />,
  seo: <Search size={16} />,
}

const moduleLabels: Record<string, string> = {
  theme: 'Theme', post: 'Bài viết', product: 'Sản phẩm', order: 'Đơn hàng',
  contact: 'Liên hệ', settings: 'Cài đặt', service: 'Dịch vụ', project: 'Dự án',
  user: 'Người dùng', media: 'Media', analytics: 'Analytics', system: 'Hệ thống',
  page: 'Trang', seo: 'SEO',
}

const statusConfig = {
  success: { icon: <CheckCircle2 size={16} />, label: 'Thành công', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200', dot: 'bg-emerald-500' },
  failed: { icon: <XCircle size={16} />, label: 'Thất bại', color: 'text-red-600', bg: 'bg-red-50 border-red-200', dot: 'bg-red-500' },
  warning: { icon: <AlertTriangle size={16} />, label: 'Cảnh báo', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200', dot: 'bg-amber-500' },
}

const allModules = ['all', 'theme', 'post', 'product', 'order', 'contact', 'service', 'project', 'settings', 'user', 'media', 'page', 'seo', 'system']

function formatDuration(ms?: number) {
  if (!ms) return '—'
  if (ms < 1000) return `${ms}ms`
  return `${(ms / 1000).toFixed(1)}s`
}

function formatTime(iso: string) {
  const d = new Date(iso)
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  if (diff < 60000) return 'Vừa xong'
  if (diff < 3600000) return `${Math.floor(diff / 60000)} phút trước`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)} giờ trước`
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default function LogsPage() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 50, total: 0, totalPages: 0 })
  const [stats, setStats] = useState<Stats>({ success: 0, failed: 0, warning: 0, total: 0 })
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [moduleFilter, setModuleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const showMsg = (type: 'success' | 'error', text: string) => { setMsg({ type, text }); setTimeout(() => setMsg(null), 3000) }

  const fetchLogs = useCallback(async (page = 1) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page: String(page), limit: '50' })
      if (search) params.set('search', search)
      if (moduleFilter !== 'all') params.set('module', moduleFilter)
      if (statusFilter !== 'all') params.set('status', statusFilter)
      const res = await fetch(`/api/admin/logs?${params}`)
      const json = await res.json()
      if (json.success) {
        setLogs(json.data)
        setPagination(json.pagination)
        setStats(json.stats)
      }
    } catch {
      showMsg('error', 'Không thể tải logs')
    } finally {
      setLoading(false)
    }
  }, [search, moduleFilter, statusFilter])

  useEffect(() => { fetchLogs() }, [fetchLogs])

  const handleClearAll = async () => {
    if (!confirm('Xóa toàn bộ logs? Thao tác này không thể hoàn tác.')) return
    try {
      const res = await fetch('/api/admin/logs', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) })
      const json = await res.json()
      if (json.success) {
        showMsg('success', `Đã xóa ${json.deleted} logs`)
        fetchLogs()
      }
    } catch { showMsg('error', 'Xóa thất bại') }
  }

  const handleClearOld = async () => {
    const date = new Date()
    date.setDate(date.getDate() - 30)
    if (!confirm('Xóa logs cũ hơn 30 ngày?')) return
    try {
      const res = await fetch('/api/admin/logs', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ olderThan: date.toISOString() }),
      })
      const json = await res.json()
      if (json.success) {
        showMsg('success', `Đã xóa ${json.deleted} logs cũ`)
        fetchLogs()
      }
    } catch { showMsg('error', 'Xóa thất bại') }
  }

  const exportLogs = () => {
    const csv = [
      'Thời gian,Module,Hành động,Trạng thái,Tin nhắn,Chi tiết,Người dùng,IP,Thời lượng(ms)',
      ...logs.map(l => [
        new Date(l.createdAt).toLocaleString('vi-VN'),
        l.module, l.action, l.status, `"${l.message}"`,
        l.detail ? `"${JSON.stringify(l.detail).replace(/"/g, '""')}"` : '',
        l.userName || '', l.ip || '', l.duration || '',
      ].join(',')),
    ].join('\n')
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `activity-logs-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Toast */}
      {msg && (
        <div className={cn(
          'fixed top-4 right-4 z-50 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium flex items-center gap-2',
          msg.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-red-50 border-red-200 text-red-700'
        )}>
          {msg.type === 'success' ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
          {msg.text}
          <button onClick={() => setMsg(null)} className="ml-2 opacity-50 hover:opacity-100"><X size={14} /></button>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-semibold text-[#1d1d1f] tracking-tight flex items-center gap-3">
            <Activity className="text-[#0066cc]" size={24} />
            Activity Logs
          </h1>
          <p className="text-[13px] text-[#86868b] mt-1">Lịch sử hoạt động hệ thống — lưu DB trước, gửi FE sau</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => fetchLogs()} disabled={loading}
            className="apple-btn h-9 px-4 text-[13px] font-medium border border-[#d2d2d7] text-[#424245] hover:bg-[#f5f5f7] gap-2">
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Làm mới
          </button>
          <button onClick={exportLogs} className="apple-btn h-9 px-4 text-[13px] font-medium border border-[#d2d2d7] text-[#424245] hover:bg-[#f5f5f7] gap-2">
            <Download size={14} /> Xuất CSV
          </button>
          <button onClick={handleClearOld} className="apple-btn h-9 px-4 text-[13px] font-medium border border-amber-300 text-amber-700 hover:bg-amber-50 gap-2">
            <Clock size={14} /> Xóa cũ (&gt;30d)
          </button>
          <button onClick={handleClearAll} className="apple-btn h-9 px-4 text-[13px] font-medium border border-red-300 text-red-700 hover:bg-red-50 gap-2">
            <Trash2 size={14} /> Xóa tất cả
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Tổng logs', value: stats.total, icon: <Activity size={20} />, color: 'text-[#0066cc]', bg: 'bg-blue-50' },
          { label: 'Thành công', value: stats.success, icon: <CheckCircle2 size={20} />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Thất bại', value: stats.failed, icon: <XCircle size={20} />, color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'Cảnh báo', value: stats.warning, icon: <AlertTriangle size={20} />, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map(s => (
          <div key={s.label} className="apple-card p-4 flex items-center gap-4">
            <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', s.bg, s.color)}>{s.icon}</div>
            <div>
              <p className="text-[22px] font-semibold text-[#1d1d1f]">{s.value.toLocaleString()}</p>
              <p className="text-[12px] text-[#86868b]">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="apple-card p-4">
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#86868b]" />
            <input type="text" placeholder="Tìm theo hành động, nội dung, người dùng..."
              value={search} onChange={e => setSearch(e.target.value)}
              className="w-full h-9 pl-9 pr-3 text-[13px] border border-[#d2d2d7] rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc]" />
          </div>
          {/* Module filter */}
          <div className="relative">
            <select value={moduleFilter} onChange={e => setModuleFilter(e.target.value)}
              className="h-9 pl-3 pr-8 text-[13px] font-medium border border-[#d2d2d7] rounded-lg bg-white appearance-none cursor-pointer hover:bg-[#f5f5f7]">
              {allModules.map(m => (
                <option key={m} value={m}>{m === 'all' ? 'Tất cả modules' : moduleLabels[m] || m}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#86868b] pointer-events-none" />
          </div>
          {/* Status filter */}
          <div className="flex items-center gap-1 bg-[#f5f5f7] rounded-lg p-1">
            {(['all', 'success', 'failed', 'warning'] as const).map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={cn(
                  'px-3 py-1.5 text-[12px] font-medium rounded-md transition-all',
                  statusFilter === s ? 'bg-white shadow-sm text-[#1d1d1f]' : 'text-[#86868b] hover:text-[#424245]'
                )}>
                {s === 'all' ? 'Tất cả' : statusConfig[s].label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Log Table */}
      <div className="apple-card overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-[#0066cc]" size={24} />
            <span className="ml-2 text-[13px] text-[#86868b]">Đang tải...</span>
          </div>
        ) : logs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-[#86868b]">
            <Activity size={40} className="mb-3 opacity-30" />
            <p className="text-[15px] font-medium">Chưa có hoạt động nào</p>
            <p className="text-[12px] mt-1">Logs sẽ xuất hiện khi bạn thao tác trên hệ thống</p>
          </div>
        ) : (
          <div className="divide-y divide-[#f0f0f0]">
            {/* Table Header */}
            <div className="grid grid-cols-[40px_1fr_140px_100px_90px_80px] gap-3 px-4 py-2.5 bg-[#fafafa] text-[11px] font-semibold text-[#86868b] uppercase tracking-wider">
              <div></div>
              <div>Hành động</div>
              <div>Module</div>
              <div>Trạng thái</div>
              <div>Thời gian</div>
              <div className="text-right">Duration</div>
            </div>

            {/* Rows */}
            {logs.map(log => {
              const sc = statusConfig[log.status] || statusConfig.warning
              const isExpanded = expanded === log.id
              return (
                <div key={log.id}>
                  <button onClick={() => setExpanded(isExpanded ? null : log.id)}
                    className={cn(
                      'w-full grid grid-cols-[40px_1fr_140px_100px_90px_80px] gap-3 px-4 py-3 text-left hover:bg-[#fafafa] transition-colors items-center',
                      isExpanded && 'bg-[#f5f5f7]'
                    )}>
                    {/* Status dot */}
                    <div className="flex justify-center">
                      <div className={cn('w-2.5 h-2.5 rounded-full', sc.dot)} />
                    </div>
                    {/* Action / message */}
                    <div className="min-w-0">
                      <p className="text-[13px] font-medium text-[#1d1d1f] truncate">{log.message}</p>
                      <p className="text-[11px] text-[#86868b] font-mono truncate">{log.action}</p>
                    </div>
                    {/* Module */}
                    <div className="flex items-center gap-2 text-[12px] text-[#424245]">
                      <span className="opacity-60">{moduleIcons[log.module] || <Activity size={16} />}</span>
                      {moduleLabels[log.module] || log.module}
                    </div>
                    {/* Status badge */}
                    <div>
                      <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border', sc.bg, sc.color)}>
                        {sc.icon} {sc.label}
                      </span>
                    </div>
                    {/* Time */}
                    <div className="text-[12px] text-[#86868b]" title={new Date(log.createdAt).toLocaleString('vi-VN')}>
                      {formatTime(log.createdAt)}
                    </div>
                    {/* Duration */}
                    <div className="text-[12px] text-[#86868b] text-right font-mono">
                      {formatDuration(log.duration)}
                    </div>
                  </button>

                  {/* Expanded detail */}
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1 bg-[#f9f9fb] border-t border-[#f0f0f0]">
                      <div className="grid grid-cols-3 gap-4 text-[12px]">
                        <div>
                          <p className="text-[#86868b] font-medium mb-1">Thông tin</p>
                          <div className="space-y-1 text-[#424245]">
                            <p><span className="text-[#86868b]">Action:</span> <code className="bg-white px-1.5 py-0.5 rounded text-[11px] border border-[#e5e5e5]">{log.action}</code></p>
                            <p><span className="text-[#86868b]">Module:</span> {log.module}</p>
                            <p><span className="text-[#86868b]">ID:</span> <code className="text-[11px] text-[#86868b]">{log.id}</code></p>
                          </div>
                        </div>
                        <div>
                          <p className="text-[#86868b] font-medium mb-1">Người thực hiện</p>
                          <div className="space-y-1 text-[#424245]">
                            <p><span className="text-[#86868b]">User:</span> {log.userName || '—'}</p>
                            <p><span className="text-[#86868b]">IP:</span> {log.ip || '—'}</p>
                            <p><span className="text-[#86868b]">Thời gian:</span> {new Date(log.createdAt).toLocaleString('vi-VN')}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-[#86868b] font-medium mb-1">Thời lượng</p>
                          <div className="space-y-1 text-[#424245]">
                            <p>{formatDuration(log.duration)}</p>
                          </div>
                        </div>
                      </div>
                      {log.detail && (
                        <div className="mt-3">
                          <p className="text-[12px] text-[#86868b] font-medium mb-1">Chi tiết (JSON)</p>
                          <pre className="text-[11px] bg-[#1d1d1f] text-[#e5e5e7] p-3 rounded-lg overflow-x-auto max-h-48">
                            {JSON.stringify(log.detail, null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-[#f0f0f0] bg-[#fafafa]">
            <p className="text-[12px] text-[#86868b]">
              Hiển thị {(pagination.page - 1) * pagination.limit + 1}–{Math.min(pagination.page * pagination.limit, pagination.total)} / {pagination.total}
            </p>
            <div className="flex items-center gap-1">
              <button onClick={() => fetchLogs(pagination.page - 1)} disabled={pagination.page <= 1}
                className="h-8 w-8 flex items-center justify-center rounded-lg border border-[#d2d2d7] text-[#424245] hover:bg-[#f5f5f7] disabled:opacity-30 disabled:cursor-not-allowed">
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => {
                const start = Math.max(1, Math.min(pagination.page - 2, pagination.totalPages - 4))
                const p = start + i
                return (
                  <button key={p} onClick={() => fetchLogs(p)}
                    className={cn(
                      'h-8 w-8 flex items-center justify-center rounded-lg text-[12px] font-medium',
                      p === pagination.page ? 'bg-[#0066cc] text-white' : 'border border-[#d2d2d7] text-[#424245] hover:bg-[#f5f5f7]'
                    )}>
                    {p}
                  </button>
                )
              })}
              <button onClick={() => fetchLogs(pagination.page + 1)} disabled={pagination.page >= pagination.totalPages}
                className="h-8 w-8 flex items-center justify-center rounded-lg border border-[#d2d2d7] text-[#424245] hover:bg-[#f5f5f7] disabled:opacity-30 disabled:cursor-not-allowed">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
