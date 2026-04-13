'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Upload, Search, Grid3X3, List, Image as ImageIcon, FileText, Film,
  Trash2, Download, Eye, X, Check, Folder, Filter, Loader2,
} from 'lucide-react'
import { cn, formatFileSize, formatDate } from '@/lib/utils'

const typeFilters = [
  { label: 'Tất cả', value: 'all', icon: <Folder size={14} /> },
  { label: 'Ảnh', value: 'image', icon: <ImageIcon size={14} /> },
  { label: 'Video', value: 'video', icon: <Film size={14} /> },
  { label: 'Tài liệu', value: 'document', icon: <FileText size={14} /> },
]

const folderFilters = ['Tất cả', 'banners', 'products', 'blog', 'about', 'seo', 'documents']

export default function MediaPage() {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [folderFilter, setFolderFilter] = useState('Tất cả')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [showUpload, setShowUpload] = useState(false)
  const [previewItem, setPreviewItem] = useState<any | null>(null)
  const [media, setMedia] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchMedia = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/media')
      const json = await res.json()
      if (json.success) setMedia(json.data)
    } catch (err) {
      console.error('Failed to fetch media:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMedia()
  }, [fetchMedia])

  const filtered = media.filter((m) => {
    if (typeFilter !== 'all' && m.type !== typeFilter) return false
    if (folderFilter !== 'Tất cả' && m.folder !== folderFilter) return false
    if (search && !m.filename.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }

  if (loading) return <div className="flex items-center justify-center h-96"><Loader2 className="w-8 h-8 animate-spin text-[#0066cc]" /></div>

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Thư viện Media</h1>
          <p className="text-sm text-slate-500 mt-0.5">{media.length} tệp tin · {formatFileSize(media.reduce((sum, m) => sum + m.size, 0))} dung lượng</p>
        </div>
        <button onClick={() => setShowUpload(true)} className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-sm">
          <Upload size={16} /> Tải lên
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Tìm kiếm tệp tin..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
          </div>
          <div className="flex items-center bg-slate-100 rounded-lg p-0.5">
            {typeFilters.map((f) => (
              <button key={f.value} onClick={() => setTypeFilter(f.value)} className={cn('flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium transition-all', typeFilter === f.value ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500')}>
                {f.icon} {f.label}
              </button>
            ))}
          </div>
          <select value={folderFilter} onChange={(e) => setFolderFilter(e.target.value)} className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none">
            {folderFilters.map((f) => <option key={f} value={f}>{f === 'Tất cả' ? '📁 Tất cả thư mục' : `📂 ${f}`}</option>)}
          </select>
          <div className="flex items-center bg-slate-100 rounded-lg p-0.5">
            <button onClick={() => setViewMode('grid')} className={cn('p-2 rounded-md', viewMode === 'grid' ? 'bg-white shadow-sm text-slate-700' : 'text-slate-400')}><Grid3X3 size={16} /></button>
            <button onClick={() => setViewMode('list')} className={cn('p-2 rounded-md', viewMode === 'list' ? 'bg-white shadow-sm text-slate-700' : 'text-slate-400')}><List size={16} /></button>
          </div>
          {selectedIds.length > 0 && (
            <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
              <span className="text-sm text-slate-500">{selectedIds.length} đã chọn</span>
              <button className="p-2 rounded-lg text-red-500 hover:bg-red-50"><Trash2 size={16} /></button>
              <button className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"><Download size={16} /></button>
            </div>
          )}
        </div>
      </div>

      {/* Grid view */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filtered.map((item) => {
            const selected = selectedIds.includes(item.id)
            return (
              <div key={item.id} className={cn('relative rounded-xl border-2 overflow-hidden group cursor-pointer transition-all', selected ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-slate-200 hover:border-slate-300')} onClick={() => setPreviewItem(item)}>
                <div className="aspect-square bg-slate-50">
                  {item.type === 'image' ? (
                    <img src={item.url} alt={item.alt} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <FileText size={32} className="text-slate-300" />
                      <span className="text-xs text-slate-400 uppercase font-bold">{item.filename.split('.').pop()}</span>
                    </div>
                  )}
                </div>
                {/* Select checkbox */}
                <button className={cn('absolute top-2 left-2 w-6 h-6 rounded-md flex items-center justify-center transition-all', selected ? 'bg-blue-500 text-white' : 'bg-white/80 border border-slate-300 opacity-0 group-hover:opacity-100')} onClick={(e) => { e.stopPropagation(); toggleSelect(item.id) }}>
                  {selected && <Check size={14} />}
                </button>
                <div className="p-2.5">
                  <p className="text-xs font-medium text-slate-700 truncate">{item.filename}</p>
                  <p className="text-[10px] text-slate-400">{formatFileSize(item.size)}</p>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full admin-table">
            <thead>
              <tr>
                <th className="w-12"><input type="checkbox" className="w-4 h-4 rounded" /></th>
                <th className="text-left">Tệp tin</th>
                <th className="text-left">Thư mục</th>
                <th className="text-left">Loại</th>
                <th className="text-right">Kích thước</th>
                <th className="text-left">Người tải</th>
                <th className="text-right">Ngày tải</th>
                <th className="w-16"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td><input type="checkbox" checked={selectedIds.includes(item.id)} onChange={() => toggleSelect(item.id)} className="w-4 h-4 rounded" /></td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 overflow-hidden shrink-0">
                        {item.type === 'image' ? <img src={item.url} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><FileText size={16} className="text-slate-400" /></div>}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-700">{item.filename}</p>
                        {item.width && <p className="text-xs text-slate-400">{item.width}×{item.height}px</p>}
                      </div>
                    </div>
                  </td>
                  <td><span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded">{item.folder}</span></td>
                  <td className="text-xs text-slate-500 uppercase">{item.filename.split('.').pop()}</td>
                  <td className="text-right text-sm text-slate-500">{formatFileSize(item.size)}</td>
                  <td className="text-sm text-slate-500">{item.uploadedBy || 'Unknown'}</td>
                  <td className="text-right text-sm text-slate-400">{formatDate(item.createdAt)}</td>
                  <td>
                    <div className="flex items-center gap-1">
                      <button onClick={() => setPreviewItem(item)} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"><Eye size={14} /></button>
                      <button className="p-1.5 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Upload modal */}
      {showUpload && (
        <>
          <div className="fixed inset-0 bg-black/30 z-50" onClick={() => setShowUpload(false)} />
          <div className="fixed inset-x-4 top-[10%] max-w-lg mx-auto bg-white rounded-2xl shadow-2xl z-50 p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-800">Tải tệp lên</h2>
              <button onClick={() => setShowUpload(false)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400"><X size={18} /></button>
            </div>
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-12 text-center hover:border-blue-400 transition-colors cursor-pointer">
              <Upload size={40} className="mx-auto text-slate-300 mb-3" />
              <p className="font-medium text-slate-600">Kéo thả tệp vào đây</p>
              <p className="text-sm text-slate-400 mt-1">hoặc click để chọn tệp từ máy tính</p>
              <p className="text-xs text-slate-400 mt-3">JPG, PNG, PDF, DOCX — Tối đa 10MB</p>
            </div>
          </div>
        </>
      )}

      {/* Preview panel */}
      {previewItem && (
        <>
          <div className="fixed inset-0 bg-black/30 z-50" onClick={() => setPreviewItem(null)} />
          <div className="fixed right-0 top-0 h-screen w-96 bg-white shadow-2xl z-50 animate-fade-in overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-100 px-5 py-4 flex items-center justify-between">
              <h3 className="font-semibold text-slate-800">Chi tiết tệp</h3>
              <button onClick={() => setPreviewItem(null)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400"><X size={18} /></button>
            </div>
            <div className="p-5 space-y-5">
              {previewItem.type === 'image' ? (
                <img src={previewItem.url} alt="" className="w-full rounded-lg" />
              ) : (
                <div className="w-full aspect-video bg-slate-50 rounded-lg flex items-center justify-center"><FileText size={48} className="text-slate-300" /></div>
              )}
              <div className="space-y-3">
                {[
                  { label: 'Tên tệp', value: previewItem.filename },
                  { label: 'Tên gốc', value: previewItem.originalName },
                  { label: 'Loại', value: previewItem.filename.split('.').pop()?.toUpperCase() },
                  { label: 'Kích thước', value: formatFileSize(previewItem.size) },
                  ...(previewItem.width ? [{ label: 'Độ phân giải', value: `${previewItem.width}×${previewItem.height}px` }] : []),
                  { label: 'Thư mục', value: previewItem.folder },
                  { label: 'Người tải', value: previewItem.uploadedBy || 'Unknown' },
                  { label: 'Ngày tải', value: formatDate(previewItem.createdAt) },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">{row.label}</span>
                    <span className="text-sm font-medium text-slate-700">{row.value}</span>
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Alt text</label>
                <input type="text" defaultValue={previewItem.alt} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">URL</label>
                <div className="flex items-center gap-2">
                  <input type="text" value={previewItem.url} readOnly className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono" />
                  <button className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 text-xs font-medium">Copy</button>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
                  <Download size={14} /> Tải xuống
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-red-200 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50">
                  <Trash2 size={14} /> Xoá
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
