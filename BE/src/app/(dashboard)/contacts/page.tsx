'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Search, Mail, Phone, Building2, Clock, Eye, Reply, Archive,
  Trash2, ChevronDown, X, User, Send, Loader2, CheckCircle2, XCircle,
} from 'lucide-react'
import { cn, formatRelativeTime, getStatusColor, getStatusLabel } from '@/lib/utils'
import type { ContactStatus } from '@/types'

const statusFilters: { label: string; value: ContactStatus | 'all' }[] = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Mới', value: 'new' },
  { label: 'Đã đọc', value: 'read' },
  { label: 'Đã trả lời', value: 'replied' },
  { label: 'Lưu trữ', value: 'archived' },
]

export default function ContactsPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<ContactStatus | 'all'>('all')
  const [selected, setSelected] = useState<any | null>(null)
  const [replyText, setReplyText] = useState('')
  const [contacts, setContacts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const showMsg = (type: 'success' | 'error', text: string) => { setMsg({ type, text }); setTimeout(() => setMsg(null), 3000) }

  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (search) params.set('search', search)
      if (statusFilter !== 'all') params.set('status', statusFilter)
      const res = await fetch(`/api/admin/contacts?${params.toString()}`)
      const json = await res.json()
      if (json.success) {
        setContacts(json.data)
      }
    } catch (err) {
      console.error('Failed to fetch contacts:', err)
    } finally {
      setLoading(false)
    }
  }, [search, statusFilter])

  useEffect(() => {
    fetchContacts()
  }, [fetchContacts])

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch('/api/admin/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      })
      const json = await res.json()
      if (json.success) {
        fetchContacts()
        if (selected?.id === id) setSelected({ ...selected, status })
      } else showMsg('error', json.message || 'CONTACT_UPDATE_FAILED')
    } catch { showMsg('error', 'NETWORK_ERROR: Lỗi kết nối') }
  }

  const [replySending, setReplySending] = useState(false)

  const handleReply = async () => {
    if (!selected || !replyText.trim()) return
    setReplySending(true)
    try {
      const res = await fetch('/api/admin/contacts/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selected.id, to: selected.email, name: selected.name, subject: selected.subject, message: replyText }),
      })
      const json = await res.json()
      if (json.success) {
        setReplyText('')
        showMsg('success', `Đã gửi trả lời tới ${selected.email}!`)
        fetchContacts()
        setSelected({ ...selected, status: 'replied' })
      } else showMsg('error', json.message || 'REPLY_FAILED')
    } catch { showMsg('error', 'NETWORK_ERROR: Lỗi kết nối') }
    finally { setReplySending(false) }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Xoá liên hệ này?')) return
    try {
      const res = await fetch(`/api/admin/contacts?id=${id}`, { method: 'DELETE' })
      const json = await res.json()
      if (json.success) { if (selected?.id === id) setSelected(null); showMsg('success', 'Đã xoá liên hệ!'); fetchContacts() }
      else showMsg('error', json.message || 'CONTACT_DELETE_FAILED')
    } catch { showMsg('error', 'NETWORK_ERROR: Lỗi kết nối') }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-[#0066cc]" />
      </div>
    )
  }

  const filtered = contacts.filter((c) => {
    if (statusFilter !== 'all' && c.status !== statusFilter) return false
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.subject.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

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
          <h1 className="text-2xl font-bold text-slate-800">Liên hệ</h1>
          <p className="text-sm text-slate-500 mt-0.5">{contacts.filter(c => c.status === 'new').length} tin nhắn mới chưa đọc</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Tìm kiếm liên hệ..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
        </div>
        <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5">
          {statusFilters.map((f) => (
            <button key={f.value} onClick={() => setStatusFilter(f.value)} className={cn('px-3 py-2 rounded-md text-xs font-medium transition-all', statusFilter === f.value ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-700')}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* List */}
        <div className="lg:col-span-2 space-y-2">
          {filtered.map((contact) => {
            const statusColor = getStatusColor(contact.status)
            const active = selected?.id === contact.id
            return (
              <div key={contact.id} onClick={() => { setSelected(contact); if (contact.status === 'new') handleUpdateStatus(contact.id, 'read') }} className={cn('bg-white rounded-xl border p-4 cursor-pointer transition-all hover:shadow-sm', active ? 'border-blue-500 ring-1 ring-blue-500/20' : 'border-slate-200')}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-xs font-bold text-slate-600">
                      {contact.name.split(' ').slice(-1)[0][0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{contact.name}</p>
                      <p className="text-[10px] text-slate-400">{contact.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={cn('w-2 h-2 rounded-full', statusColor.dot, contact.status === 'new' && 'status-pulse')} />
                    <span className="text-[10px] text-slate-400">{formatRelativeTime(contact.createdAt)}</span>
                  </div>
                </div>
                <p className="text-sm font-medium text-slate-700 mb-1">{contact.subject}</p>
                <p className="text-xs text-slate-500 line-clamp-2">{contact.message}</p>
              </div>
            )
          })}
        </div>

        {/* Detail */}
        <div className="lg:col-span-3">
          {selected ? (
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              {/* Header */}
              <div className="p-5 border-b border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-bold text-slate-800">{selected.subject}</h2>
                  <div className="flex items-center gap-1">
                    <button onClick={() => handleUpdateStatus(selected.id, 'archived')} className="p-2 rounded-lg text-slate-400 hover:bg-slate-100" title="Lưu trữ"><Archive size={16} /></button>
                    <button onClick={() => handleDelete(selected.id)} className="p-2 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500" title="Xoá"><Trash2 size={16} /></button>
                  </div>
                </div>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-1.5 text-sm text-slate-500"><User size={14} />{selected.name}</div>
                  <div className="flex items-center gap-1.5 text-sm text-slate-500"><Mail size={14} />{selected.email}</div>
                  <div className="flex items-center gap-1.5 text-sm text-slate-500"><Phone size={14} />{selected.phone}</div>
                  <div className="flex items-center gap-1.5 text-sm text-slate-500"><Building2 size={14} />{selected.company}</div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Clock size={12} className="text-slate-400" />
                  <span className="text-xs text-slate-400">{formatRelativeTime(selected.createdAt)}</span>
                  <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full ml-2', getStatusColor(selected.status).bg, getStatusColor(selected.status).text)}>
                    {getStatusLabel(selected.status)}
                  </span>
                </div>
              </div>

              {/* Message */}
              <div className="p-5 bg-slate-50">
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
              </div>

              {/* Reply */}
              <div className="p-5 border-t border-slate-100">
                <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2"><Reply size={14} /> Trả lời</h3>
                <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Nhập nội dung trả lời..." className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm outline-none resize-none focus:ring-2 focus:ring-blue-500/20" rows={4} />
                <div className="flex items-center justify-between mt-3">
                  <p className="text-xs text-slate-400">Trả lời qua email: {selected.email}</p>
                  <button onClick={handleReply} disabled={replySending || !replyText.trim()} className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
                    {replySending ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                    {replySending ? 'Đang gửi...' : 'Gửi trả lời'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
              <Mail size={48} className="mx-auto text-slate-200 mb-4" />
              <p className="text-sm text-slate-400">Chọn một liên hệ để xem chi tiết</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
