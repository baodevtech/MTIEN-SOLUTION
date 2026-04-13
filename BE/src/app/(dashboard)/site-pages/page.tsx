'use client'

import Link from 'next/link'
import { Plus, Edit, Trash2, Eye, Layers, GripVertical, ExternalLink } from 'lucide-react'
import { cn, formatDate, getStatusColor, getStatusLabel } from '@/lib/utils'
import { mockPages } from '@/lib/mock-data'

export default function SitePagesPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Quản lý trang</h1>
          <p className="text-sm text-slate-500 mt-0.5">Quản lý các trang tĩnh trên website</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-sm">
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
            {mockPages.map((page) => {
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
                      <a href={`http://localhost:3000${page.slug}`} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"><ExternalLink size={14} /></a>
                      <button className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"><Edit size={14} /></button>
                      <button className="p-1.5 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500"><Trash2 size={14} /></button>
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
    </div>
  )
}
