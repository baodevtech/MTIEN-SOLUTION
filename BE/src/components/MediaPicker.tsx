'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import {
  Upload, Search, X, Check, Image as ImageIcon, FileText,
  Loader2, Grid3X3, Folder,
} from 'lucide-react'
import { cn, formatFileSize } from '@/lib/utils'

interface MediaPickerProps {
  open: boolean
  onClose: () => void
  onSelect: (item: MediaItem) => void
  accept?: 'image' | 'video' | 'document' | 'all'
  multiple?: boolean
  onSelectMultiple?: (items: MediaItem[]) => void
}

interface MediaItem {
  id: string
  filename: string
  originalName: string
  url: string
  type: string
  size: number
  width?: number
  height?: number
  alt?: string
  folder?: string
}

export default function MediaPicker({ open, onClose, onSelect, accept = 'all', multiple = false, onSelectMultiple }: MediaPickerProps) {
  const [media, setMedia] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const [tab, setTab] = useState<'library' | 'upload'>('library')
  const inputRef = useRef<HTMLInputElement>(null)

  const fetchMedia = useCallback(async () => {
    try {
      setLoading(true)
      const params = accept !== 'all' ? `?type=${accept}` : ''
      const res = await fetch(`/api/admin/media${params}`)
      const json = await res.json()
      if (json.success) setMedia(json.data)
    } catch {} finally {
      setLoading(false)
    }
  }, [accept])

  useEffect(() => {
    if (open) {
      fetchMedia()
      setSelectedIds([])
    }
  }, [open, fetchMedia])

  const handleUpload = async (files: FileList) => {
    setUploading(true)
    const formData = new FormData()
    Array.from(files).forEach(f => formData.append('files', f))
    formData.append('folder', 'uploads')

    try {
      const res = await fetch('/api/admin/media/upload', { method: 'POST', body: formData })
      const json = await res.json()
      if (json.success) {
        await fetchMedia()
        setTab('library')
        // Auto-select uploaded files
        if (json.data?.length === 1 && !multiple) {
          onSelect(json.data[0])
          onClose()
        }
      }
    } catch {} finally {
      setUploading(false)
    }
  }

  const handleConfirm = () => {
    if (multiple && onSelectMultiple) {
      const items = media.filter(m => selectedIds.includes(m.id))
      onSelectMultiple(items)
    } else {
      const item = media.find(m => m.id === selectedIds[0])
      if (item) onSelect(item)
    }
    onClose()
  }

  const filtered = media.filter(m => !search || m.filename.toLowerCase().includes(search.toLowerCase()))

  if (!open) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-50" onClick={onClose} />
      <div className="fixed inset-4 md:inset-[5%] bg-white rounded-2xl shadow-2xl z-50 flex flex-col animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800">Chọn tệp tin</h2>
          <div className="flex items-center gap-3">
            <div className="flex bg-slate-100 rounded-lg p-0.5">
              <button onClick={() => setTab('library')} className={cn('px-3 py-1.5 rounded-md text-xs font-medium', tab === 'library' ? 'bg-white shadow-sm text-slate-700' : 'text-slate-500')}>Thư viện</button>
              <button onClick={() => setTab('upload')} className={cn('px-3 py-1.5 rounded-md text-xs font-medium', tab === 'upload' ? 'bg-white shadow-sm text-slate-700' : 'text-slate-500')}>Tải lên</button>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400"><X size={18} /></button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {tab === 'library' ? (
            <>
              <div className="relative mb-4">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="Tìm kiếm..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none" />
              </div>
              {loading ? (
                <div className="flex items-center justify-center h-48"><Loader2 className="w-6 h-6 animate-spin text-blue-500" /></div>
              ) : filtered.length === 0 ? (
                <div className="text-center py-16 text-slate-400">
                  <Folder size={40} className="mx-auto mb-2" />
                  <p className="text-sm">Chưa có tệp tin nào</p>
                  <button onClick={() => setTab('upload')} className="text-sm text-blue-600 hover:underline mt-2">Tải lên ngay</button>
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                  {filtered.map(item => {
                    const selected = selectedIds.includes(item.id)
                    return (
                      <div
                        key={item.id}
                        className={cn('relative rounded-xl border-2 overflow-hidden cursor-pointer transition-all', selected ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-slate-200 hover:border-slate-300')}
                        onClick={() => {
                          if (multiple) {
                            setSelectedIds(prev => prev.includes(item.id) ? prev.filter(i => i !== item.id) : [...prev, item.id])
                          } else {
                            setSelectedIds([item.id])
                          }
                        }}
                      >
                        <div className="aspect-square bg-slate-50">
                          {item.type === 'image' ? (
                            <img src={item.url} alt={item.alt || ''} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center gap-1">
                              <FileText size={24} className="text-slate-300" />
                              <span className="text-[10px] text-slate-400 uppercase font-bold">{item.filename.split('.').pop()}</span>
                            </div>
                          )}
                        </div>
                        {selected && (
                          <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <Check size={14} className="text-white" />
                          </div>
                        )}
                        <div className="p-1.5">
                          <p className="text-[10px] font-medium text-slate-600 truncate">{item.filename}</p>
                          <p className="text-[9px] text-slate-400">{formatFileSize(item.size)}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </>
          ) : (
            <div
              className="border-2 border-dashed border-slate-200 rounded-xl p-12 text-center hover:border-blue-400 transition-colors cursor-pointer"
              onClick={() => inputRef.current?.click()}
            >
              {uploading ? (
                <Loader2 size={40} className="mx-auto text-blue-500 animate-spin mb-3" />
              ) : (
                <Upload size={40} className="mx-auto text-slate-300 mb-3" />
              )}
              <p className="font-medium text-slate-600">{uploading ? 'Đang tải lên...' : 'Kéo thả tệp vào đây'}</p>
              <p className="text-sm text-slate-400 mt-1">hoặc click để chọn tệp từ máy tính</p>
              <input
                ref={inputRef}
                type="file"
                multiple
                accept={accept === 'image' ? 'image/*' : accept === 'video' ? 'video/*' : '*/*'}
                className="hidden"
                onChange={(e) => { if (e.target.files) handleUpload(e.target.files); e.target.value = '' }}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100">
          <p className="text-xs text-slate-500">{selectedIds.length} đã chọn</p>
          <div className="flex gap-2">
            <button onClick={onClose} className="px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">Huỷ</button>
            <button onClick={handleConfirm} disabled={selectedIds.length === 0} className="px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-semibold disabled:opacity-50">
              Chọn
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
