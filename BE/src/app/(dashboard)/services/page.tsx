'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Search, Plus, Pencil, Trash2, GripVertical, ExternalLink,
  Zap, Globe, Code, Palette, Megaphone, Server, ChevronDown,
  Eye, DollarSign, ToggleLeft, ToggleRight, X, Save, Loader2, CheckCircle2, XCircle,
} from 'lucide-react'
import { cn, formatCurrency, slugify } from '@/lib/utils'

const iconMap: Record<string, typeof Zap> = {
  'Zap': Zap, 'Globe': Globe, 'Code': Code, 'Palette': Palette,
  'Megaphone': Megaphone, 'Server': Server, 'Cloud': Server,
  'BarChart': Megaphone,
}

const iconOptions = ['Zap', 'Globe', 'Code', 'Palette', 'Megaphone', 'Server']

interface ServiceData {
  id: string; title: string; slug: string; description?: string | null
  shortDesc?: string | null; icon?: string | null; features: unknown[]
  pricing: Array<{ name: string; price: string; features: string[]; popular?: boolean }>
  status: string; order: number; createdAt: string; updatedAt: string
}

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceData[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [editService, setEditService] = useState<ServiceData | null>(null)
  const [form, setForm] = useState({ title: '', description: '', shortDesc: '', icon: 'Zap', status: 'active', features: '' })
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const showMsg = (type: 'success' | 'error', text: string) => { setMsg({ type, text }); setTimeout(() => setMsg(null), 3000) }

  const fetchServices = useCallback(async () => {
    try {
      const params = new URLSearchParams()
      if (search) params.set('search', search)
      const res = await fetch(`/api/admin/services?${params}`)
      const json = await res.json()
      setServices(json.data || [])
    } catch { /* ignore */ } finally { setLoading(false) }
  }, [search])

  useEffect(() => { fetchServices() }, [fetchServices])

  const openNew = () => {
    setEditService(null)
    setForm({ title: '', description: '', shortDesc: '', icon: 'Zap', status: 'active', features: '' })
    setShowModal(true)
  }

  const openEdit = (s: ServiceData) => {
    setEditService(s)
    setForm({ title: s.title, description: s.description || '', shortDesc: s.shortDesc || '', icon: s.icon || 'Zap', status: s.status, features: (s.features || []).map(String).join('\n') })
    setShowModal(true)
  }

  const handleSave = async () => {
    if (!form.title) return alert('Vui lòng nhập tên dịch vụ')
    setSaving(true)
    try {
      const body = {
        ...(editService && { id: editService.id }),
        title: form.title,
        slug: editService?.slug || slugify(form.title),
        description: form.description,
        shortDesc: form.shortDesc,
        icon: form.icon,
        status: form.status,
        features: form.features.split('\n').map(s => s.trim()).filter(Boolean),
        order: editService?.order ?? services.length,
      }
      const res = await fetch('/api/admin/services', {
        method: editService ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const json = await res.json()
      if (json.success) { setShowModal(false); showMsg('success', editService ? 'Đã cập nhật dịch vụ!' : 'Đã tạo dịch vụ mới!'); fetchServices() }
      else showMsg('error', json.message || 'SERVICE_SAVE_FAILED')
    } catch { showMsg('error', 'NETWORK_ERROR: Lỗi kết nối') }
    finally { setSaving(false) }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Xoá dịch vụ "${title}"?`)) return
    try {
      const res = await fetch(`/api/admin/services?id=${id}`, { method: 'DELETE' })
      const json = await res.json()
      if (json.success) { showMsg('success', 'Đã xoá dịch vụ!'); fetchServices() }
      else showMsg('error', json.message || 'SERVICE_DELETE_FAILED')
    } catch { showMsg('error', 'NETWORK_ERROR: Lỗi kết nối') }
  }

  const filtered = services.filter((s) => {
    if (search && !s.title.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

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
          <h1 className="text-2xl font-bold text-slate-800">Dịch vụ</h1>
          <p className="text-sm text-slate-500 mt-0.5">Quản lý danh sách dịch vụ của MTIEN Solution</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-sm">
          <Plus size={16} /> Thêm dịch vụ
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input type="text" placeholder="Tìm dịch vụ..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
      </div>

      {/* Services List */}
      <div className="space-y-3">
        {filtered.map((service, idx) => {
          const Icon = iconMap[service.icon ?? ''] || Zap
          const expanded = expandedId === service.id
          return (
            <div key={service.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              {/* Service Header */}
              <div className="flex items-center gap-4 p-4">
                <div className="text-slate-300 cursor-grab"><GripVertical size={18} /></div>
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600"><Icon size={20} /></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-slate-800">{service.title}</h3>
                    <span className="text-xs text-slate-400">#{idx + 1}</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">{(service.description || '').slice(0, 120)}...</p>
                </div>
                <span className={cn('px-2 py-1 rounded-md text-xs font-medium', service.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-500')}>
                  {service.status === 'active' ? 'Đang hoạt động' : 'Nháp'}
                </span>
                <div className="flex items-center gap-1">
                  <button className="p-2 rounded-lg text-slate-400 hover:bg-slate-100"><ExternalLink size={14} /></button>
                  <button onClick={() => openEdit(service)} className="p-2 rounded-lg text-slate-400 hover:bg-blue-50 hover:text-blue-600"><Pencil size={14} /></button>
                  <button onClick={() => handleDelete(service.id, service.title)} className="p-2 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500"><Trash2 size={14} /></button>
                  <button onClick={() => setExpandedId(expanded ? null : service.id)} className={cn('p-2 rounded-lg text-slate-400 hover:bg-slate-100 transition-transform', expanded && 'rotate-180')}>
                    <ChevronDown size={14} />
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              {expanded && (
                <div className="border-t border-slate-100 p-5 bg-slate-50 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Features */}
                    <div>
                      <h4 className="text-sm font-semibold text-slate-700 mb-3">Tính năng</h4>
                      <ul className="space-y-1.5">
                        {service.features.map((f, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" /> {String(f)}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Pricing Tiers */}
                    <div>
                      <h4 className="text-sm font-semibold text-slate-700 mb-3">Gói giá</h4>
                      <div className="space-y-2">
                        {service.pricing.map((tier, i) => (
                          <div key={i} className="bg-white rounded-lg border border-slate-200 p-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-semibold text-slate-800">{tier.name}</span>
                              <span className="text-sm font-bold text-blue-600">{formatCurrency(Number(tier.price))}/tháng</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {tier.features.map((f, j) => (
                                <span key={j} className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded">{f}</span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <Zap size={48} className="mx-auto text-slate-200 mb-3" />
          <p className="text-sm text-slate-400">Không tìm thấy dịch vụ nào</p>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4">
            <div className="flex items-center justify-between p-5 border-b border-slate-200">
              <h2 className="text-lg font-bold text-slate-800">{editService ? 'Chỉnh sửa dịch vụ' : 'Thêm dịch vụ mới'}</h2>
              <button onClick={() => setShowModal(false)} className="p-1 rounded-lg hover:bg-slate-100"><X size={18} /></button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tên dịch vụ *</label>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Mô tả ngắn</label>
                <input value={form.shortDesc} onChange={e => setForm(f => ({ ...f, shortDesc: e.target.value }))} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Mô tả chi tiết</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tính năng (mỗi dòng 1 tính năng)</label>
                <textarea value={form.features} onChange={e => setForm(f => ({ ...f, features: e.target.value }))} rows={4} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono" placeholder={"Tính năng 1\nTính năng 2\nTính năng 3"} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Icon</label>
                  <select value={form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {iconOptions.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Trạng thái</label>
                  <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="active">Hoạt động</option>
                    <option value="draft">Nháp</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-5 border-t border-slate-200">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg">Huỷ</button>
              <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-lg disabled:opacity-50">
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                {editService ? 'Cập nhật' : 'Tạo dịch vụ'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
