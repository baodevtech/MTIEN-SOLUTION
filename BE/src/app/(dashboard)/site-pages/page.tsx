'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2, Eye, Layers, GripVertical, ExternalLink, X, Save, Loader2 } from 'lucide-react'
import { cn, formatDate, getStatusColor, getStatusLabel, slugify } from '@/lib/utils'

interface PageData {
  id: string; title: string; slug: string; content: string; template: string
  status: string; seo: unknown; order: number; parentId?: string | null
  createdAt: string; updatedAt: string
}

export default function SitePagesPage() {
  const [pages, setPages] = useState<PageData[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editPage, setEditPage] = useState<PageData | null>(null)
  const [form, setForm] = useState({ title: '', slug: '', template: 'default', status: 'published', content: '' })
  const [saving, setSaving] = useState(false)
  const [frontendUrl, setFrontendUrl] = useState('http://localhost:3000')

  const fetchPages = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/pages')
      const json = await res.json()
      setPages(json.data || [])
    } catch {} finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchPages() }, [fetchPages])

  useEffect(() => {
    fetch('/api/admin/settings').then(r => r.json()).then(json => {
      const url = json.data?.connection?.frontendUrl || json.data?.general?.siteUrl
      if (url) setFrontendUrl(url.replace(/\/$/, ''))
    }).catch(() => {})
  }, [])

  const openNew = () => {
    setEditPage(null)
    setForm({ title: '', slug: '', template: 'default', status: 'published', content: '' })
    setShowModal(true)
  }

  const openEdit = (page: PageData) => {
    setEditPage(page)
    setForm({ title: page.title, slug: page.slug, template: page.template, status: page.status, content: page.content })
    setShowModal(true)
  }

  const handleSave = async () => {
    if (!form.title) return alert('Vui lòng nhập tên trang')
    setSaving(true)
    try {
      const body = {
        ...(editPage && { id: editPage.id }),
        title: form.title,
        slug: form.slug || slugify(form.title),
        template: form.template,
        status: form.status,
        content: form.content,
      }
      const method = editPage ? 'PUT' : 'POST'
      const res = await fetch('/api/admin/pages', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const json = await res.json()
      if (json.success) {
        setShowModal(false)
        fetchPages()
      } else {
        alert(json.message || 'Lưu thất bại')
      }
    } catch { alert('Lỗi kết nối') }
    finally { setSaving(false) }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Xoá trang "${title}"?`)) return
    try {
      const res = await fetch(`/api/admin/pages?id=${id}`, { method: 'DELETE' })
      const json = await res.json()
      if (json.success) fetchPages()
      else alert(json.message || 'Xoá thất bại')
    } catch { alert('Lỗi kết nối') }
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" /></div>
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Quản lý trang</h1>
          <p className="text-sm text-slate-500 mt-0.5">Quản lý các trang tĩnh trên website</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-sm">
          <Plus size={16} /> Tạo trang mới
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full admin-table">
          <thead>
            <tr>
              <th className="w-10"></th>
              <th className="text-left">Trang</th>
              <th className="text-left">Slug</th>
              <th className="text-left">Template</th>
              <th className="text-center">Trạng thái</th>
              <th className="text-right">Cập nhật</th>
              <th className="w-32"></th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page) => {
              const statusColor = getStatusColor(page.status)
              return (
                <tr key={page.id}>
                  <td><GripVertical size={14} className="text-slate-300 cursor-grab" /></td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center"><Layers size={14} className="text-slate-400" /></div>
                      <span className="font-semibold text-slate-800">{page.title}</span>
                    </div>
                  </td>
                  <td><code className="text-xs bg-slate-50 px-2 py-1 rounded text-slate-500">{page.slug}</code></td>
                  <td><span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-md font-medium">{page.template}</span></td>
                  <td className="text-center">
                    <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium', statusColor.bg, statusColor.text)}>
                      <span className={cn('w-1.5 h-1.5 rounded-full', statusColor.dot)} />
                      {getStatusLabel(page.status)}
                    </span>
                  </td>
                  <td className="text-right text-sm text-slate-400">{formatDate(page.updatedAt)}</td>
                  <td>
                    <div className="flex items-center justify-end gap-1">
                      <a href={`${frontendUrl}${page.slug}`} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"><ExternalLink size={14} /></a>
                      <button onClick={() => openEdit(page)} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"><Edit size={14} /></button>
                      <button onClick={() => handleDelete(page.id, page.title)} className="p-1.5 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
        <Layers size={18} className="text-blue-500 mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-medium text-blue-800">Sắp xếp thứ tự trang</p>
          <p className="text-xs text-blue-600 mt-0.5">Kéo thả biểu tượng ⠿ ở đầu mỗi dòng để thay đổi thứ tự hiển thị trang trên menu.</p>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4">
            <div className="flex items-center justify-between p-5 border-b border-slate-200">
              <h2 className="text-lg font-bold text-slate-800">{editPage ? 'Chỉnh sửa trang' : 'Tạo trang mới'}</h2>
              <button onClick={() => setShowModal(false)} className="p-1 rounded-lg hover:bg-slate-100"><X size={18} /></button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tên trang</label>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value, slug: editPage ? f.slug : slugify(e.target.value) }))} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="VD: Giới thiệu" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Slug</label>
                <input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="/gioi-thieu" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Template</label>
                  <select value={form.template} onChange={e => setForm(f => ({ ...f, template: e.target.value }))} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="default">Mặc định</option>
                    <option value="landing">Landing Page</option>
                    <option value="contact">Liên hệ</option>
                    <option value="blog">Blog</option>
                    <option value="services">Dịch vụ</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Trạng thái</label>
                  <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="published">Xuất bản</option>
                    <option value="draft">Nháp</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nội dung</label>
                <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} rows={4} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" placeholder="Nội dung trang..." />
              </div>
            </div>
            <div className="flex justify-end gap-3 p-5 border-t border-slate-200">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg">Huỷ</button>
              <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-lg disabled:opacity-50">
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                {editPage ? 'Cập nhật' : 'Tạo trang'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
