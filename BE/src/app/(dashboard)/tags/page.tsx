"use client";
import { useEffect, useState } from 'react';

interface Tag {
  id: string;
  name: string;
  slug: string;
  type: string;
  desc?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function TagManager() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Partial<Tag>>({ type: 'post' });
  const [editing, setEditing] = useState<Tag | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const fetchTags = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/tags');
    const json = await res.json();
    setTags(json.data || []);
    setLoading(false);
  };

  useEffect(() => { fetchTags(); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    try {
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch('/api/admin/tags', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing ? { ...form, id: editing.id } : form),
      });
      const json = await res.json();
      if (json.success) {
        setMsg('Lưu thành công!');
        setForm({ type: 'post' });
        setEditing(null);
        fetchTags();
      } else {
        setMsg(json.message || 'Lỗi!');
      }
    } catch {
      setMsg('Lỗi kết nối!');
    }
  };

  const handleEdit = (tag: Tag) => {
    setEditing(tag);
    setForm(tag);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Xóa tag này?')) return;
    await fetch(`/api/admin/tags?id=${id}`, { method: 'DELETE' });
    fetchTags();
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 font-sans">
      <h1 className="text-2xl font-bold mb-6">Quản lý Tag</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-4 mb-8 flex flex-col gap-3">
        <input name="name" value={form.name || ''} onChange={handleChange} placeholder="Tên tag" required className="border p-2 rounded" />
        <input name="slug" value={form.slug || ''} onChange={handleChange} placeholder="Slug (không dấu, viết liền)" required className="border p-2 rounded" />
        <select name="type" value={form.type || 'post'} onChange={handleChange} className="border p-2 rounded">
          <option value="post">Bài viết</option>
          <option value="product">Sản phẩm</option>
          <option value="project">Dự án</option>
        </select>
        <input name="desc" value={form.desc || ''} onChange={handleChange} placeholder="Mô tả (tùy chọn)" className="border p-2 rounded" />
        <button type="submit" className="bg-blue-600 text-white rounded p-2 font-semibold">{editing ? 'Cập nhật' : 'Thêm mới'}</button>
        {msg && <div className="text-center text-sm text-green-600 mt-2">{msg}</div>}
      </form>
      <div className="bg-white rounded-xl shadow p-4">
        {loading ? <div>Đang tải...</div> : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Tên</th>
                <th className="py-2 text-left">Slug</th>
                <th className="py-2 text-left">Loại</th>
                <th className="py-2 text-left">Mô tả</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tags.map(tag => (
                <tr key={tag.id} className="border-b hover:bg-gray-50">
                  <td className="py-2">{tag.name}</td>
                  <td>{tag.slug}</td>
                  <td>{tag.type}</td>
                  <td>{tag.desc}</td>
                  <td>
                    <button onClick={() => handleEdit(tag)} className="text-blue-600 mr-2">Sửa</button>
                    <button onClick={() => handleDelete(tag.id)} className="text-red-500">Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
