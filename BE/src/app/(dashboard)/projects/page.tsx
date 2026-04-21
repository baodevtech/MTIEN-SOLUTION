'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Search, Plus, Pencil, Trash2, ExternalLink, Star,
  Calendar, Eye, Tag, Image as ImageIcon, X, Save, Loader2, CheckCircle2, XCircle,
} from 'lucide-react'
import { cn, formatDate, slugify } from '@/lib/utils'

const statusMap: Record<string, { label: string; color: string }> = {
  completed: { label: 'Hoàn thành', color: 'bg-green-50 text-green-700' },
  'in-progress': { label: 'Đang thực hiện', color: 'bg-blue-50 text-blue-700' },
  planned: { label: 'Kế hoạch', color: 'bg-amber-50 text-amber-700' },
}

const categoryColors: Record<string, string> = {
  'Web Application': 'bg-blue-100 text-blue-700',
  'Mobile App': 'bg-purple-100 text-purple-700',
  'E-commerce': 'bg-green-100 text-green-700',
  'ERP System': 'bg-orange-100 text-orange-700',
}

interface ProjectData {
  id: string; title: string; slug: string; client: string; description?: string | null
  images: string[]; technologies: string[]; category: string; status: string
  featured: boolean; url?: string | null; completedAt?: string | null
  createdAt: string; updatedAt: string
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectData[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showModal, setShowModal] = useState(false)
  const [editProject, setEditProject] = useState<ProjectData | null>(null)
  const [form, setForm] = useState({ title: '', client: '', description: '', category: 'Web Application', status: 'planned', url: '', technologies: '', featured: false, completedAt: '' })
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const showMsg = (type: 'success' | 'error', text: string) => { setMsg({ type, text }); setTimeout(() => setMsg(null), 3000) }

  const fetchProjects = useCallback(async () => {
    try {
      const params = new URLSearchParams()
      if (statusFilter !== 'all') params.set('status', statusFilter)
      if (search) params.set('search', search)
      params.set('limit', '50')
      const res = await fetch(`/api/admin/projects?${params}`)
      const json = await res.json()
      setProjects(json.data || [])
    } catch { /* ignore */ } finally { setLoading(false) }
  }, [statusFilter, search])

  useEffect(() => { fetchProjects() }, [fetchProjects])

  const openNew = () => {
    setEditProject(null)
    setForm({ title: '', client: '', description: '', category: 'Web Application', status: 'planned', url: '', technologies: '', featured: false, completedAt: '' })
    setShowModal(true)
  }

  const openEdit = (p: ProjectData) => {
    setEditProject(p)
    setForm({ title: p.title, client: p.client, description: p.description || '', category: p.category, status: p.status, url: p.url || '', technologies: p.technologies.join(', '), featured: p.featured, completedAt: p.completedAt ? p.completedAt.slice(0, 10) : '' })
    setShowModal(true)
  }

  const handleSave = async () => {
    if (!form.title) return alert('Vui lòng nhập tên dự án')
    setSaving(true)
    try {
      const body = {
        ...(editProject && { id: editProject.id }),
        title: form.title,
        slug: editProject?.slug || slugify(form.title),
        client: form.client,
        description: form.description,
        category: form.category,
        status: form.status,
        url: form.url,
        featured: form.featured,
        completedAt: form.completedAt || null,
        technologies: form.technologies.split(',').map(s => s.trim()).filter(Boolean),
      }
      const res = await fetch('/api/admin/projects', {
        method: editProject ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const json = await res.json()
      if (json.success) { setShowModal(false); showMsg('success', editProject ? 'Đã cập nhật dự án!' : 'Đã tạo dự án mới!'); fetchProjects() }
      else showMsg('error', json.message || 'PROJECT_SAVE_FAILED')
    } catch { showMsg('error', 'NETWORK_ERROR: Lỗi kết nối') }
    finally { setSaving(false) }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Xoá dự án "${title}"?`)) return
    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, { method: 'DELETE' })
      const json = await res.json()
      if (json.success) { showMsg('success', 'Đã xoá dự án!'); fetchProjects() }
      else showMsg('error', json.message || 'PROJECT_DELETE_FAILED')
    } catch { alert('Lỗi kết nối') }
  }

  const filtered = projects

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" /></div>

  return (
    <div className="space-y-6 animate-fade-in">
      {msg && (
        <div className={cn('flex items-center gap-2 p-3 rounded-lg text-sm fixed top-4 right-4 z-50 shadow-lg', msg.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200')}>
          {msg.type === 'success' ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
          {msg.text}
        </div>
      )}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dự án</h1>
          <p className="text-sm text-slate-500 mt-0.5">Portfolio dự án đã thực hiện</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-sm">
          <Plus size={16} /> Thêm dự án
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(statusMap).map(([key, val]) => {
          const count = projects.filter(p => p.status === key).length
          return (
            <div key={key} className="bg-white rounded-xl border border-slate-200 p-4 text-center">
              <p className="text-2xl font-bold text-slate-800">{count}</p>
              <p className="text-xs text-slate-500">{val.label}</p>
            </div>
          )
        })}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Tìm dự án..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none">
          <option value="all">Tất cả trạng thái</option>
          {Object.entries(statusMap).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
        <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5">
          <button onClick={() => setViewMode('grid')} className={cn('p-2 rounded-md', viewMode === 'grid' ? 'bg-slate-800 text-white' : 'text-slate-400')}>
            <svg width="14" height="14" viewBox="0 0 14 14"><rect x="0" y="0" width="6" height="6" rx="1" fill="currentColor"/><rect x="8" y="0" width="6" height="6" rx="1" fill="currentColor"/><rect x="0" y="8" width="6" height="6" rx="1" fill="currentColor"/><rect x="8" y="8" width="6" height="6" rx="1" fill="currentColor"/></svg>
          </button>
          <button onClick={() => setViewMode('list')} className={cn('p-2 rounded-md', viewMode === 'list' ? 'bg-slate-800 text-white' : 'text-slate-400')}>
            <svg width="14" height="14" viewBox="0 0 14 14"><rect x="0" y="1" width="14" height="2.5" rx="1" fill="currentColor"/><rect x="0" y="5.75" width="14" height="2.5" rx="1" fill="currentColor"/><rect x="0" y="10.5" width="14" height="2.5" rx="1" fill="currentColor"/></svg>
          </button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((project) => {
            const status = statusMap[project.status]
            return (
              <div key={project.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden group hover:shadow-md transition-shadow">
                {/* Image */}
                <div className="aspect-video bg-slate-100 relative overflow-hidden">
                  {project.images[0] ? (
                    <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center"><ImageIcon size={40} className="text-slate-300" /></div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    {project.featured && (
                      <span className="px-2 py-1 rounded-md text-[10px] font-semibold bg-amber-400 text-amber-900"><Star size={10} className="inline -mt-0.5 mr-0.5" /> Nổi bật</span>
                    )}
                    <span className={cn('px-2 py-1 rounded-md text-[10px] font-medium', status.color)}>{status.label}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-white font-bold text-lg leading-snug">{project.title}</h3>
                    <p className="text-white/70 text-xs">{project.client}</p>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <p className="text-sm text-slate-600 line-clamp-2 mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.technologies.map((t) => (
                      <span key={t} className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded font-medium">{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={cn('text-xs px-2 py-0.5 rounded-md font-medium', categoryColors[project.category] || 'bg-slate-100 text-slate-600')}>{project.category}</span>
                    <div className="flex items-center gap-1">
                      <button onClick={() => openEdit(project)} className="p-2 rounded-lg text-slate-400 hover:bg-blue-50 hover:text-blue-600"><Pencil size={14} /></button>
                      {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-slate-400 hover:bg-slate-100"><ExternalLink size={14} /></a>}
                      <button onClick={() => handleDelete(project.id, project.title)} className="p-2 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500"><Trash2 size={14} /></button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Dự án</th>
                <th>Khách hàng</th>
                <th>Danh mục</th>
                <th>Trạng thái</th>
                <th>Ngày</th>
                <th className="text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((project) => {
                const status = statusMap[project.status]
                return (
                  <tr key={project.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-8 rounded bg-slate-100 overflow-hidden shrink-0">
                          {project.images[0] ? <img src={project.images[0]} alt="" className="w-full h-full object-cover" /> : <ImageIcon size={16} className="m-auto mt-1 text-slate-300" />}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800 flex items-center gap-1">{project.title} {project.featured && <Star size={12} className="text-amber-400 fill-amber-400" />}</p>
                          <div className="flex gap-1 mt-0.5">{project.technologies.slice(0, 3).map(t => <span key={t} className="text-[9px] px-1 py-0.5 bg-slate-100 text-slate-500 rounded">{t}</span>)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-slate-600">{project.client}</td>
                    <td><span className={cn('text-xs px-2 py-0.5 rounded-md font-medium', categoryColors[project.category] || 'bg-slate-100 text-slate-600')}>{project.category}</span></td>
                    <td><span className={cn('text-xs px-2 py-0.5 rounded-md font-medium', status.color)}>{status.label}</span></td>
                    <td className="text-xs text-slate-400">{project.completedAt ? formatDate(project.completedAt) : '—'}</td>
                    <td>
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openEdit(project)} className="p-2 rounded-lg text-slate-400 hover:bg-blue-50 hover:text-blue-600"><Pencil size={14} /></button>
                        <button onClick={() => handleDelete(project.id, project.title)} className="p-2 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4">
            <div className="flex items-center justify-between p-5 border-b border-slate-200">
              <h2 className="text-lg font-bold text-slate-800">{editProject ? 'Chỉnh sửa dự án' : 'Thêm dự án mới'}</h2>
              <button onClick={() => setShowModal(false)} className="p-1 rounded-lg hover:bg-slate-100"><X size={18} /></button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tên dự án *</label>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="VD: Website TMDT ABC" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Khách hàng</label>
                  <input value={form.client} onChange={e => setForm(f => ({ ...f, client: e.target.value }))} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">URL</label>
                  <input value={form.url} onChange={e => setForm(f => ({ ...f, url: e.target.value }))} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="https://..." />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Mô tả</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Công nghệ (cách nhau bởi dấu phẩy)</label>
                <input value={form.technologies} onChange={e => setForm(f => ({ ...f, technologies: e.target.value }))} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="React, Node.js, PostgreSQL" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Danh mục</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="Web Application">Web Application</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="ERP System">ERP System</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Trạng thái</label>
                  <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {Object.entries(statusMap).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Ngày hoàn thành</label>
                  <input type="date" value={form.completedAt} onChange={e => setForm(f => ({ ...f, completedAt: e.target.value }))} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="flex items-end pb-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} className="w-4 h-4 rounded border-slate-300 text-amber-500 accent-amber-500" />
                    <span className="text-sm font-medium text-slate-700">Dự án nổi bật ⭐</span>
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Ngày hoàn thành</label>
                  <input type="date" value={form.completedAt} onChange={e => setForm(f => ({ ...f, completedAt: e.target.value }))} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="flex items-end pb-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} className="w-4 h-4 rounded border-slate-300 text-amber-500 accent-amber-500" />
                    <span className="text-sm font-medium text-slate-700">Dự án nổi bật ⭐</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-5 border-t border-slate-200">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg">Huỷ</button>
              <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-lg disabled:opacity-50">
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                {editProject ? 'Cập nhật' : 'Tạo dự án'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
