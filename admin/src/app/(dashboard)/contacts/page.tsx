'use client'

import { useState } from 'react'
import {
  Search, Mail, Phone, Building2, Clock, Eye, Reply, Archive,
  Trash2, ChevronDown, X, User, Send,
} from 'lucide-react'
import { cn, formatRelativeTime, getStatusColor, getStatusLabel } from '@/lib/utils'
import { mockContacts } from '@/lib/mock-data'
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
  const [selected, setSelected] = useState<typeof mockContacts[0] | null>(null)
  const [replyText, setReplyText] = useState('')

  const filtered = mockContacts.filter((c) => {
    if (statusFilter !== 'all' && c.status !== statusFilter) return false
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.subject.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Liên hệ</h1>
          <p className="text-sm text-slate-500 mt-0.5">{mockContacts.filter(c => c.status === 'new').length} tin nhắn mới chưa đọc</p>
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
              <div key={contact.id} onClick={() => setSelected(contact)} className={cn('bg-white rounded-xl border p-4 cursor-pointer transition-all hover:shadow-sm', active ? 'border-blue-500 ring-1 ring-blue-500/20' : 'border-slate-200')}>
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
                    <button className="p-2 rounded-lg text-slate-400 hover:bg-slate-100" title="Lưu trữ"><Archive size={16} /></button>
                    <button className="p-2 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500" title="Xoá"><Trash2 size={16} /></button>
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
                  <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold">
                    <Send size={14} /> Gửi trả lời
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
