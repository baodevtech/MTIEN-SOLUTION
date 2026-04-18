'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Search, Plus, Shield, Pencil, Trash2, MoreHorizontal,
  Mail, Clock, ShieldCheck, ShieldAlert, User as UserIcon,
  Eye, CheckCircle2, XCircle, X,
} from 'lucide-react'
import { cn, formatDate, formatRelativeTime, getStatusColor, getStatusLabel } from '@/lib/utils'
import type { UserRole, UserStatus } from '@/types'

const roleLabels: Record<UserRole, { label: string; color: string; icon: typeof ShieldCheck }> = {
  admin: { label: 'Quản trị viên', color: 'bg-red-100 text-red-700', icon: ShieldAlert },
  editor: { label: 'Biên tập viên', color: 'bg-blue-100 text-blue-700', icon: ShieldCheck },
  author: { label: 'Tác giả', color: 'bg-green-100 text-green-700', icon: Shield },
  viewer: { label: 'Người xem', color: 'bg-slate-100 text-slate-600', icon: Eye },
}

interface UserData {
  id: string; name: string; email: string; role: UserRole; status?: string; avatar?: string | null
  createdAt: string; updatedAt: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserData[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all')
  const [showModal, setShowModal] = useState(false)
  const [editUser, setEditUser] = useState<UserData | null>(null)
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'editor' as UserRole, status: 'active' as UserStatus })

  const fetchUsers = useCallback(async () => {
    try {
      const params = new URLSearchParams()
      if (roleFilter !== 'all') params.set('role', roleFilter)
      if (search) params.set('search', search)
      const res = await fetch(`/api/admin/users?${params}`)
      const json = await res.json()
      setUsers(json.data || [])
    } catch { /* ignore */ } finally { setLoading(false) }
  }, [roleFilter, search])

  useEffect(() => { fetchUsers() }, [fetchUsers])

  const filtered = users

  const handleSave = async () => {
    try {
      const method = editUser ? 'PUT' : 'POST'
      const body = editUser
        ? { id: editUser.id, name: form.name, email: form.email, role: form.role, ...(form.password ? { password: form.password } : {}) }
        : { name: form.name, email: form.email, password: form.password, role: form.role }
      await fetch('/api/admin/users', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      
      // Cập nhật localStorage nếu đang sửa chính user đang đăng nhập
      if (editUser) {
        try {
          const stored = localStorage.getItem('admin_user')
          if (stored) {
            const current = JSON.parse(stored)
            if (current.id === editUser.id || current.email === editUser.email) {
              localStorage.setItem('admin_user', JSON.stringify({
                ...current,
                name: form.name,
                email: form.email,
                role: form.role,
              }))
            }
          }
        } catch {}
      }
      
      setShowModal(false)
      fetchUsers()
    } catch { /* ignore */ }
  }

  const openNew = () => {
    setEditUser(null)
    setForm({ name: '', email: '', password: '', role: 'editor', status: 'active' })
    setShowModal(true)
  }

  const openEdit = (u: UserData) => {
    setEditUser(u)
    setForm({ name: u.name, email: u.email, password: '', role: u.role as UserRole, status: 'active' })
    setShowModal(true)
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" /></div>

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Người dùng</h1>
          <p className="text-sm text-slate-500 mt-0.5">{users.length} tài khoản</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-sm">
          <Plus size={16} /> Thêm người dùng
        </button>
      </div>

      {/* Role Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(Object.keys(roleLabels) as UserRole[]).map((role) => {
          const count = users.filter(u => u.role === role).length
          const conf = roleLabels[role]
          const Icon = conf.icon
          return (
            <div key={role} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
              <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', conf.color)}><Icon size={18} /></div>
              <div>
                <p className="text-lg font-bold text-slate-800">{count}</p>
                <p className="text-xs text-slate-500">{conf.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Tìm người dùng..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
        </div>
        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value as UserRole | 'all')} className="bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none">
          <option value="all">Tất cả vai trò</option>
          {(Object.keys(roleLabels) as UserRole[]).map(r => <option key={r} value={r}>{roleLabels[r].label}</option>)}
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Người dùng</th>
              <th>Email</th>
              <th>Vai trò</th>
              <th>Trạng thái</th>
              <th>Ngày tạo</th>
              <th className="text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => {
              const roleConf = roleLabels[user.role as UserRole]
              const statusColor = getStatusColor(user.status || 'active')
              return (
                <tr key={user.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                          {user.name.split(' ').slice(-1)[0][0]}
                        </div>
                      )}
                      <span className="font-semibold text-slate-800">{user.name}</span>
                    </div>
                  </td>
                  <td className="text-slate-500">{user.email}</td>
                  <td>
                    <span className={cn('px-2 py-1 rounded-md text-xs font-medium', roleConf.color)}>{roleConf.label}</span>
                  </td>
                  <td>
                    <span className={cn('inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full', statusColor.bg, statusColor.text)}>
                      <span className={cn('w-1.5 h-1.5 rounded-full', statusColor.dot)} />
                      {getStatusLabel(user.status || 'active')}
                    </span>
                  </td>
                  <td className="text-xs text-slate-400">{formatDate(user.createdAt)}</td>
                  <td>
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(user)} className="p-2 rounded-lg text-slate-400 hover:bg-blue-50 hover:text-blue-600"><Pencil size={14} /></button>
                      <button className="p-2 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-800">{editUser ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Họ tên *</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Email *</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
              </div>
              {!editUser && (
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Mật khẩu *</label>
                  <input type="password" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="Tối thiểu 8 ký tự" />
                </div>
              )}
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Vai trò</label>
                <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as UserRole })} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none">
                  {(Object.keys(roleLabels) as UserRole[]).map(r => <option key={r} value={r}>{roleLabels[r].label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Trạng thái</label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="status" checked={form.status === 'active'} onChange={() => setForm({ ...form, status: 'active' })} className="accent-blue-500" />
                    <span className="text-sm text-slate-600">Hoạt động</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="status" checked={form.status === 'inactive'} onChange={() => setForm({ ...form, status: 'inactive' })} className="accent-blue-500" />
                    <span className="text-sm text-slate-600">Vô hiệu</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-5 bg-slate-50 rounded-b-2xl">
              <button onClick={() => setShowModal(false)} className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg">Huỷ</button>
              <button onClick={handleSave} className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg">{editUser ? 'Cập nhật' : 'Tạo tài khoản'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
