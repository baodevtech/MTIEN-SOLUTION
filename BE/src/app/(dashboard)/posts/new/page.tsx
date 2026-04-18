'use client'

import { useState, useEffect, useCallback, useRef, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft, Save, Eye, Clock, Image as ImageIcon, X, Plus,
  Bold, Italic, Underline, List, ListOrdered, Link as LinkIcon,
  Quote, Code, Heading1, Heading2, Heading3, AlignLeft, AlignCenter, AlignRight, AlignJustify, Upload,
  ChevronDown, Loader2, Target, AlertTriangle,
  CheckCircle2, XCircle, Info, Search as SearchIcon, ChevronRight,
  ExternalLink, Link2, Strikethrough, Subscript, Superscript,
  Undo2, Redo2, RemoveFormatting, Minus, Table, Type, Palette,
  Highlighter, Indent, Outdent, Pilcrow,
} from 'lucide-react'
import { cn, slugify } from '@/lib/utils'
import MediaPicker from '@/components/MediaPicker'

const DEFAULT_CATEGORIES = ['Thiết kế', 'Cloud', 'Marketing', 'E-commerce', 'AI', 'Bảo mật', 'Chuyển đổi số', 'Phần mềm']

interface SEOIssue {
  type: 'error' | 'warning' | 'good' | 'info'
  category: string
  message: string
  detail?: string
}

interface SEOCategory {
  name: string
  score: number
  maxScore: number
  issues: SEOIssue[]
}

interface SEOAnalysis {
  score: number
  categories: SEOCategory[]
  issues: SEOIssue[]
  summary: { errors: number; warnings: number; good: number; info: number }
}

export default function PostEditorPage() {
  return <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" /></div>}><PostEditorInner /></Suspense>
}

function PostEditorInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams.get('id')

  // Core fields
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [category, setCategory] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [status, setStatus] = useState<'draft' | 'published' | 'scheduled'>('draft')
  const [featuredImage, setFeaturedImage] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor')
  const [saving, setSaving] = useState(false)
  const [author, setAuthor] = useState('')
  const [showMediaPicker, setShowMediaPicker] = useState(false)

  // Dynamic categories/tags from DB
  const [dbCategories, setDbCategories] = useState<{ name: string; count: number }[]>([])
  const [dbTags, setDbTags] = useState<string[]>([])

  // Link counts
  const [internalLinks, setInternalLinks] = useState(0)
  const [externalLinks, setExternalLinks] = useState(0)

  // SEO fields
  const [seoTitle, setSeoTitle] = useState('')
  const [seoDescription, setSeoDescription] = useState('')
  const [focusKeyword, setFocusKeyword] = useState('')
  const [seoKeywords, setSeoKeywords] = useState<string[]>([])
  const [seoKeywordInput, setSeoKeywordInput] = useState('')
  const [canonicalUrl, setCanonicalUrl] = useState('')
  const [ogImage, setOgImage] = useState('')

  // Ref for the content editor (contentEditable div)
  const editorRef = useRef<HTMLDivElement>(null)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [showBgColorPicker, setShowBgColorPicker] = useState(false)
  const [showFontSize, setShowFontSize] = useState(false)
  const [showHeadingMenu, setShowHeadingMenu] = useState(false)
  const [showTableMenu, setShowTableMenu] = useState(false)
  const [editorReady, setEditorReady] = useState(false)

  const FONT_SIZES = ['12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px', '48px']
  const COLORS = ['#000000', '#374151', '#6b7280', '#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899', '#ffffff']

  // Sync contentEditable HTML → content state
  const syncContent = useCallback(() => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML
      if (html !== content) setContent(html)
    }
  }, [content])

  // Initialize editor content when loading a post for editing
  useEffect(() => {
    if (editorRef.current && content && !editorReady) {
      editorRef.current.innerHTML = content
      setEditorReady(true)
    }
  }, [content, editorReady])

  // execCommand helper
  const exec = useCallback((cmd: string, value?: string) => {
    editorRef.current?.focus()
    document.execCommand(cmd, false, value)
    syncContent()
  }, [syncContent])

  // Format block (heading, paragraph)
  const formatBlock = useCallback((tag: string) => {
    editorRef.current?.focus()
    document.execCommand('formatBlock', false, tag)
    syncContent()
    setShowHeadingMenu(false)
  }, [syncContent])

  // Insert link
  const insertLink = useCallback(() => {
    const url = prompt('Nhập URL:', 'https://')
    if (url) exec('createLink', url)
  }, [exec])

  // Insert image (from URL or MediaPicker)
  const [showEditorMediaPicker, setShowEditorMediaPicker] = useState(false)
  const insertImageFromUrl = useCallback(() => {
    const url = prompt('Nhập URL ảnh:', 'https://')
    if (url) exec('insertImage', url)
  }, [exec])

  // Insert table
  const insertTable = useCallback((rows: number, cols: number) => {
    let html = '<table style="border-collapse:collapse;width:100%;margin:12px 0"><tbody>'
    for (let r = 0; r < rows; r++) {
      html += '<tr>'
      for (let c = 0; c < cols; c++) {
        html += `<td style="border:1px solid #d1d5db;padding:8px 12px;min-width:60px">${r === 0 ? `Cột ${c + 1}` : '&nbsp;'}</td>`
      }
      html += '</tr>'
    }
    html += '</tbody></table><p><br></p>'
    editorRef.current?.focus()
    document.execCommand('insertHTML', false, html)
    syncContent()
    setShowTableMenu(false)
  }, [syncContent])

  // Font size via insertHTML span
  const setFontSize = useCallback((size: string) => {
    editorRef.current?.focus()
    const sel = window.getSelection()
    if (sel && sel.rangeCount > 0 && !sel.isCollapsed) {
      document.execCommand('insertHTML', false, `<span style="font-size:${size}">${sel.toString()}</span>`)
    }
    syncContent()
    setShowFontSize(false)
  }, [syncContent])

  // Color
  const setTextColor = useCallback((color: string) => {
    exec('foreColor', color)
    setShowColorPicker(false)
  }, [exec])

  const setBgColor = useCallback((color: string) => {
    exec('hiliteColor', color)
    setShowBgColorPicker(false)
  }, [exec])
  const [noIndex, setNoIndex] = useState(false)

  // SEO Analysis
  const [seoExpanded, setSeoExpanded] = useState(true)
  const [seoAnalysis, setSeoAnalysis] = useState<SEOAnalysis | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  // Load post data if editing
  useEffect(() => {
    if (!editId) return
    fetch(`/api/admin/posts?search=&limit=100`)
      .then(r => r.json())
      .then(json => {
        const p = (json.data || []).find((item: { id: string }) => item.id === editId)
        if (p) {
          setTitle(p.title || '')
          setSlug(p.slug || '')
          setContent(p.content || '')
          setExcerpt(p.excerpt || '')
          setCategory(p.category || '')
          setTags(p.tags || [])
          setStatus(p.status || 'draft')
          setFeaturedImage(p.coverImage || null)
          setAuthor(p.author || '')
          setSeoTitle(p.seoTitle || '')
          setSeoDescription(p.seoDescription || '')
          setFocusKeyword(p.focusKeyword || '')
          setSeoKeywords(p.seoKeywords || [])
          setCanonicalUrl(p.canonicalUrl || '')
          setOgImage(p.ogImage || '')
          setNoIndex(p.noIndex || false)
          if (p.seoIssues) setSeoAnalysis(p.seoIssues)
        }
      })
      .catch(() => {})
  }, [editId])

  // Auto-fill author from localStorage (current logged-in user)
  useEffect(() => {
    if (editId) return // Don't overwrite when editing
    try {
      const stored = localStorage.getItem('admin_user')
      if (stored) {
        const user = JSON.parse(stored)
        if (user.name) setAuthor(user.name)
      }
    } catch {}
  }, [editId])

  // Fetch existing categories/tags from DB
  useEffect(() => {
    fetch('/api/admin/posts/meta')
      .then(r => r.json())
      .then(json => {
        if (json.success) {
          setDbCategories(json.categories || [])
          setDbTags(json.tags || [])
        }
      })
      .catch(() => {})
  }, [])

  // Count internal/external links in content (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!content) { setInternalLinks(0); setExternalLinks(0); return }
      const hrefRegex = /href=["']([^"']+)["']/gi
      let intCount = 0, extCount = 0
      let match
      while ((match = hrefRegex.exec(content)) !== null) {
        const url = match[1]
        if (url.startsWith('#') || url.startsWith('mailto:') || url.startsWith('tel:')) continue
        if (url.startsWith('/') || url.includes('mtiensolution') || url.includes('localhost')) {
          intCount++
        } else if (url.startsWith('http')) {
          extCount++
        }
      }
      setInternalLinks(intCount)
      setExternalLinks(extCount)
    }, 500)
    return () => clearTimeout(timer)
  }, [content])

  // Auto-analyze SEO (debounced)
  const runSeoAnalysis = useCallback(async () => {
    setAnalyzing(true)
    try {
      const res = await fetch('/api/admin/posts/seo-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...(editId && { id: editId }),
          title, slug: slug || slugify(title), content, excerpt,
          seoTitle, seoDescription, focusKeyword, seoKeywords,
          coverImage: featuredImage, ogImage, canonicalUrl, noIndex, tags, category,
        }),
      })
      const json = await res.json()
      if (json.success) setSeoAnalysis(json.data)
    } catch { /* ignore */ }
    finally { setAnalyzing(false) }
  }, [title, slug, content, excerpt, seoTitle, seoDescription, focusKeyword, seoKeywords, featuredImage, ogImage, canonicalUrl, noIndex, tags, category, editId])

  useEffect(() => {
    if (!title) return
    const timer = setTimeout(runSeoAnalysis, 1500)
    return () => clearTimeout(timer)
  }, [runSeoAnalysis, title])

  const handleSave = async (saveStatus: 'draft' | 'published') => {
    if (!title) return alert('Vui lòng nhập tiêu đề bài viết')
    setSaving(true)
    try {
      const body = {
        ...(editId && { id: editId }),
        title, slug: slug || slugify(title), content, excerpt, category, tags,
        author, coverImage: featuredImage, status: saveStatus,
        seoTitle, seoDescription, seoKeywords, focusKeyword,
        canonicalUrl, ogImage, noIndex,
        seoScore: seoAnalysis?.score || 0,
        seoIssues: seoAnalysis || null,
      }
      const method = editId ? 'PUT' : 'POST'
      const res = await fetch('/api/admin/posts', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const json = await res.json()
      if (json.success) router.push('/posts')
      else alert(json.message || 'Lưu thất bại')
    } catch { alert('Lỗi kết nối') }
    finally { setSaving(false) }
  }

  const handleTitleChange = (value: string) => {
    setTitle(value)
    if (!slug || slug === slugify(title)) setSlug(slugify(value))
  }

  const addTag = () => {
    const t = tagInput.trim()
    if (t && !tags.includes(t)) { setTags([...tags, t]); setTagInput('') }
  }
  const removeTag = (tag: string) => setTags(tags.filter(t => t !== tag))

  const addSeoKeyword = () => {
    const k = seoKeywordInput.trim()
    if (k && !seoKeywords.includes(k)) { setSeoKeywords([...seoKeywords, k]); setSeoKeywordInput('') }
  }
  const removeSeoKeyword = (k: string) => setSeoKeywords(seoKeywords.filter(kw => kw !== k))

  const scoreColor = (score: number) =>
    score >= 80 ? 'text-green-600' : score >= 50 ? 'text-amber-600' : 'text-red-600'
  const scoreBg = (score: number) =>
    score >= 80 ? 'bg-green-500' : score >= 50 ? 'bg-amber-500' : 'bg-red-500'
  const scoreLabel = (score: number) =>
    score >= 80 ? 'Tốt' : score >= 50 ? 'Cần cải thiện' : 'Yếu'

  const issueIcon = (type: string) => {
    switch (type) {
      case 'error': return <XCircle size={14} className="text-red-500 shrink-0" />
      case 'warning': return <AlertTriangle size={14} className="text-amber-500 shrink-0" />
      case 'good': return <CheckCircle2 size={14} className="text-green-500 shrink-0" />
      case 'info': return <Info size={14} className="text-blue-500 shrink-0" />
      default: return null
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/posts" className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-800">{editId ? 'Chỉnh sửa bài viết' : 'Tạo bài viết mới'}</h1>
            <p className="text-sm text-slate-500">Soạn thảo và tối ưu SEO</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {seoAnalysis && (
            <div className={cn('flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-semibold',
              seoAnalysis.score >= 80 ? 'bg-green-50 border-green-200 text-green-700'
              : seoAnalysis.score >= 50 ? 'bg-amber-50 border-amber-200 text-amber-700'
              : 'bg-red-50 border-red-200 text-red-700'
            )}>
              <Target size={16} />
              SEO: {seoAnalysis.score}/100
            </div>
          )}
          <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
            <Eye size={16} /> Xem trước
          </button>
          <button onClick={() => handleSave('draft')} disabled={saving} className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50">
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Clock size={16} />}
            Lưu nháp
          </button>
          <button onClick={() => handleSave('published')} disabled={saving} className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm disabled:opacity-50">
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            Xuất bản
          </button>
        </div>
      </div>

      {/* 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Editor */}
        <div className="lg:col-span-2 space-y-5">
          {/* Title */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <input
              type="text"
              placeholder="Nhập tiêu đề bài viết..."
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full text-2xl font-bold text-slate-800 placeholder:text-slate-300 outline-none"
            />
            <div className="flex items-center gap-2 mt-3">
              <span className="text-xs text-slate-400">Đường dẫn:</span>
              <span className="text-xs text-slate-500">/blog/</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="text-xs text-blue-500 font-medium bg-blue-50 px-2 py-1 rounded border border-blue-200 outline-none focus:ring-1 focus:ring-blue-400 flex-1"
                placeholder="tieu-de-bai-viet"
              />
            </div>
          </div>

          {/* Editor */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="flex items-center border-b border-slate-200">
              <button onClick={() => setActiveTab('editor')} className={cn('px-5 py-3 text-sm font-medium border-b-2 transition-colors', activeTab === 'editor' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700')}>
                Soạn thảo
              </button>
              <button onClick={() => setActiveTab('preview')} className={cn('px-5 py-3 text-sm font-medium border-b-2 transition-colors', activeTab === 'preview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700')}>
                Xem trước
              </button>
            </div>
            {activeTab === 'editor' && (
              <div className="border-b border-slate-100">
                {/* Row 1: Undo/Redo, Heading, Font Size, Colors */}
                <div className="flex items-center gap-0.5 px-3 py-1.5 border-b border-slate-50 flex-wrap">
                  {/* Undo / Redo */}
                  <button type="button" title="Hoàn tác (Ctrl+Z)" onClick={() => exec('undo')} className="p-1.5 rounded text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"><Undo2 size={15} /></button>
                  <button type="button" title="Làm lại (Ctrl+Y)" onClick={() => exec('redo')} className="p-1.5 rounded text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"><Redo2 size={15} /></button>
                  <div className="w-px h-5 bg-slate-200 mx-1" />

                  {/* Heading dropdown */}
                  <div className="relative">
                    <button type="button" onClick={() => { setShowHeadingMenu(!showHeadingMenu); setShowFontSize(false); setShowColorPicker(false); setShowBgColorPicker(false); setShowTableMenu(false) }}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors border border-slate-200">
                      <Pilcrow size={13} /> Đoạn văn <ChevronDown size={12} />
                    </button>
                    {showHeadingMenu && (
                      <div className="absolute top-full left-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-xl z-50 w-48 py-1">
                        <button type="button" onClick={() => formatBlock('p')} className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">Đoạn văn</button>
                        <button type="button" onClick={() => formatBlock('h1')} className="w-full text-left px-3 py-2 text-xl font-bold text-slate-800 hover:bg-slate-50">Heading 1</button>
                        <button type="button" onClick={() => formatBlock('h2')} className="w-full text-left px-3 py-2 text-lg font-bold text-slate-800 hover:bg-slate-50">Heading 2</button>
                        <button type="button" onClick={() => formatBlock('h3')} className="w-full text-left px-3 py-2 text-base font-semibold text-slate-700 hover:bg-slate-50">Heading 3</button>
                        <button type="button" onClick={() => formatBlock('h4')} className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Heading 4</button>
                        <button type="button" onClick={() => formatBlock('pre')} className="w-full text-left px-3 py-2 text-sm font-mono text-slate-600 hover:bg-slate-50">Code block</button>
                      </div>
                    )}
                  </div>
                  <div className="w-px h-5 bg-slate-200 mx-1" />

                  {/* Font Size */}
                  <div className="relative">
                    <button type="button" onClick={() => { setShowFontSize(!showFontSize); setShowHeadingMenu(false); setShowColorPicker(false); setShowBgColorPicker(false); setShowTableMenu(false) }}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors border border-slate-200">
                      <Type size={13} /> Cỡ chữ <ChevronDown size={12} />
                    </button>
                    {showFontSize && (
                      <div className="absolute top-full left-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-xl z-50 w-32 py-1 max-h-52 overflow-y-auto">
                        {FONT_SIZES.map(s => (
                          <button key={s} type="button" onClick={() => setFontSize(s)} className="w-full text-left px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50" style={{ fontSize: s }}>
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="w-px h-5 bg-slate-200 mx-1" />

                  {/* Text Color */}
                  <div className="relative">
                    <button type="button" title="Màu chữ" onClick={() => { setShowColorPicker(!showColorPicker); setShowBgColorPicker(false); setShowHeadingMenu(false); setShowFontSize(false); setShowTableMenu(false) }}
                      className="p-1.5 rounded text-slate-500 hover:bg-slate-100 transition-colors">
                      <div className="flex flex-col items-center gap-0.5">
                        <Type size={14} />
                        <div className="w-3.5 h-1 rounded-full bg-red-500" />
                      </div>
                    </button>
                    {showColorPicker && (
                      <div className="absolute top-full left-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-xl z-50 p-2 grid grid-cols-6 gap-1 w-36">
                        {COLORS.map(c => (
                          <button key={c} type="button" onClick={() => setTextColor(c)}
                            className="w-5 h-5 rounded border border-slate-200 hover:scale-125 transition-transform" style={{ backgroundColor: c }} />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Highlight Color */}
                  <div className="relative">
                    <button type="button" title="Tô nền" onClick={() => { setShowBgColorPicker(!showBgColorPicker); setShowColorPicker(false); setShowHeadingMenu(false); setShowFontSize(false); setShowTableMenu(false) }}
                      className="p-1.5 rounded text-slate-500 hover:bg-slate-100 transition-colors">
                      <Highlighter size={15} />
                    </button>
                    {showBgColorPicker && (
                      <div className="absolute top-full left-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-xl z-50 p-2 grid grid-cols-6 gap-1 w-36">
                        {['transparent', '#fef08a', '#bbf7d0', '#bfdbfe', '#fecaca', '#e9d5ff', '#fed7aa', '#f3f4f6'].map(c => (
                          <button key={c} type="button" onClick={() => setBgColor(c)}
                            className={cn('w-5 h-5 rounded border border-slate-200 hover:scale-125 transition-transform', c === 'transparent' && 'bg-white relative after:absolute after:inset-0 after:bg-[repeating-conic-gradient(#d1d5db_0%_25%,transparent_0%_50%)] after:bg-[length:6px_6px] after:rounded')}
                            style={c !== 'transparent' ? { backgroundColor: c } : undefined} />
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="w-px h-5 bg-slate-200 mx-1" />

                  {/* Clear formatting */}
                  <button type="button" title="Xóa định dạng" onClick={() => exec('removeFormat')} className="p-1.5 rounded text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"><RemoveFormatting size={15} /></button>
                </div>

                {/* Row 2: Text formatting, Lists, Alignment, Insert */}
                <div className="flex items-center gap-0.5 px-3 py-1.5 flex-wrap">
                  {/* Text format */}
                  <button type="button" title="Đậm (Ctrl+B)" onClick={() => exec('bold')} className="p-1.5 rounded text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"><Bold size={15} /></button>
                  <button type="button" title="Nghiêng (Ctrl+I)" onClick={() => exec('italic')} className="p-1.5 rounded text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"><Italic size={15} /></button>
                  <button type="button" title="Gạch chân (Ctrl+U)" onClick={() => exec('underline')} className="p-1.5 rounded text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"><Underline size={15} /></button>
                  <button type="button" title="Gạch ngang" onClick={() => exec('strikeThrough')} className="p-1.5 rounded text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"><Strikethrough size={15} /></button>
                  <button type="button" title="Chỉ số trên" onClick={() => exec('superscript')} className="p-1.5 rounded text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"><Superscript size={15} /></button>
                  <button type="button" title="Chỉ số dưới" onClick={() => exec('subscript')} className="p-1.5 rounded text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"><Subscript size={15} /></button>
                  <div className="w-px h-5 bg-slate-200 mx-1" />

                  {/* Lists & indent */}
                  <button type="button" title="Danh sách" onClick={() => exec('insertUnorderedList')} className="p-1.5 rounded text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"><List size={15} /></button>
                  <button type="button" title="Đánh số" onClick={() => exec('insertOrderedList')} className="p-1.5 rounded text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"><ListOrdered size={15} /></button>
                  <button type="button" title="Thụt lề" onClick={() => exec('indent')} className="p-1.5 rounded text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"><Indent size={15} /></button>
                  <button type="button" title="Bớt thụt lề" onClick={() => exec('outdent')} className="p-1.5 rounded text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"><Outdent size={15} /></button>
                  <div className="w-px h-5 bg-slate-200 mx-1" />

                  {/* Alignment */}
                  <button type="button" title="Căn trái" onClick={() => exec('justifyLeft')} className="p-1.5 rounded text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"><AlignLeft size={15} /></button>
                  <button type="button" title="Căn giữa" onClick={() => exec('justifyCenter')} className="p-1.5 rounded text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"><AlignCenter size={15} /></button>
                  <button type="button" title="Căn phải" onClick={() => exec('justifyRight')} className="p-1.5 rounded text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"><AlignRight size={15} /></button>
                  <button type="button" title="Căn đều" onClick={() => exec('justifyFull')} className="p-1.5 rounded text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"><AlignJustify size={15} /></button>
                  <div className="w-px h-5 bg-slate-200 mx-1" />

                  {/* Insert items */}
                  <button type="button" title="Trích dẫn" onClick={() => formatBlock('blockquote')} className="p-1.5 rounded text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"><Quote size={15} /></button>
                  <button type="button" title="Code inline" onClick={() => {
                    const sel = window.getSelection()
                    if (sel && !sel.isCollapsed) {
                      document.execCommand('insertHTML', false, `<code style="background:#f1f5f9;padding:2px 6px;border-radius:4px;font-family:monospace;font-size:0.9em">${sel.toString()}</code>`)
                      syncContent()
                    }
                  }} className="p-1.5 rounded text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"><Code size={15} /></button>
                  <button type="button" title="Đường kẻ ngang" onClick={() => exec('insertHorizontalRule')} className="p-1.5 rounded text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"><Minus size={15} /></button>
                  <div className="w-px h-5 bg-slate-200 mx-1" />

                  {/* Link */}
                  <button type="button" title="Chèn liên kết" onClick={insertLink} className="p-1.5 rounded text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"><LinkIcon size={15} /></button>
                  <button type="button" title="Bỏ liên kết" onClick={() => exec('unlink')} className="p-1.5 rounded text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"><ExternalLink size={14} /></button>
                  <div className="w-px h-5 bg-slate-200 mx-1" />

                  {/* Image */}
                  <button type="button" title="Chèn ảnh từ thư viện" onClick={() => setShowEditorMediaPicker(true)} className="p-1.5 rounded text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"><ImageIcon size={15} /></button>
                  <button type="button" title="Chèn ảnh từ URL" onClick={insertImageFromUrl} className="p-1.5 rounded text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"><Upload size={14} /></button>
                  <div className="w-px h-5 bg-slate-200 mx-1" />

                  {/* Table */}
                  <div className="relative">
                    <button type="button" title="Chèn bảng" onClick={() => { setShowTableMenu(!showTableMenu); setShowHeadingMenu(false); setShowFontSize(false); setShowColorPicker(false); setShowBgColorPicker(false) }}
                      className="p-1.5 rounded text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"><Table size={15} /></button>
                    {showTableMenu && (
                      <div className="absolute top-full right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-xl z-50 p-3 w-44">
                        <p className="text-[10px] font-semibold text-slate-400 uppercase mb-2">Chọn kích thước</p>
                        <div className="grid grid-cols-5 gap-1">
                          {Array.from({ length: 25 }, (_, i) => {
                            const r = Math.floor(i / 5) + 1, c = (i % 5) + 1
                            return <button key={i} type="button" onClick={() => insertTable(r, c)}
                              className="w-6 h-6 border border-slate-200 rounded hover:bg-blue-100 hover:border-blue-400 transition-colors text-[9px] text-slate-400"
                              title={`${r}×${c}`} />
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            <div className="p-5" onClick={() => { setShowColorPicker(false); setShowBgColorPicker(false); setShowFontSize(false); setShowHeadingMenu(false); setShowTableMenu(false) }}>
              {activeTab === 'editor' ? (
                <>
                  <div
                    ref={editorRef}
                    contentEditable
                    suppressContentEditableWarning
                    onInput={syncContent}
                    onBlur={syncContent}
                    className="w-full editor-content min-h-[480px] outline-none text-slate-700 prose prose-slate max-w-none prose-headings:font-bold prose-a:text-blue-600 prose-img:rounded-lg prose-img:max-w-full prose-blockquote:border-l-4 prose-blockquote:border-blue-400 prose-blockquote:bg-blue-50/50 prose-blockquote:py-2 prose-blockquote:px-4 prose-pre:bg-slate-50 prose-pre:rounded-lg prose-table:border-collapse [&_td]:border [&_td]:border-slate-200 [&_td]:p-2 [&_th]:border [&_th]:border-slate-200 [&_th]:p-2 [&_th]:bg-slate-50 focus:outline-none"
                    data-placeholder="Bắt đầu viết nội dung bài viết tại đây..."
                    style={{ minHeight: '480px' }}
                  />
                  {/* MediaPicker for inline image insertion */}
                  <MediaPicker
                    open={showEditorMediaPicker}
                    onClose={() => setShowEditorMediaPicker(false)}
                    onSelect={(item) => {
                      editorRef.current?.focus()
                      document.execCommand('insertHTML', false, `<img src="${item.url}" alt="${item.originalName || ''}" style="max-width:100%;border-radius:8px;margin:8px 0" />`)
                      syncContent()
                      setShowEditorMediaPicker(false)
                    }}
                    accept="image"
                  />
                </>
              ) : (
                <div className="editor-content prose prose-slate max-w-none min-h-[480px]">
                  {content ? (
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                  ) : (
                    <p className="text-slate-400 italic">Chưa có nội dung để xem trước...</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Excerpt */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Tóm tắt (Excerpt)</h3>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Viết mô tả ngắn cho bài viết, hiển thị ở trang danh sách..."
              className="w-full text-sm text-slate-600 placeholder:text-slate-400 outline-none resize-none border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              rows={3}
            />
            <p className="text-xs text-slate-400 mt-2">{excerpt.length}/300 ký tự</p>
          </div>

          {/* ═══════ SEO Analysis Panel ═══════ */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <button onClick={() => setSeoExpanded(!seoExpanded)} className="flex items-center justify-between w-full p-5">
              <div className="flex items-center gap-3">
                <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center',
                  seoAnalysis ? (seoAnalysis.score >= 80 ? 'bg-green-50' : seoAnalysis.score >= 50 ? 'bg-amber-50' : 'bg-red-50') : 'bg-slate-50'
                )}>
                  <Target size={18} className={seoAnalysis ? scoreColor(seoAnalysis.score) : 'text-slate-400'} />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-3">
                    <h3 className="text-sm font-semibold text-slate-700">Phân tích SEO</h3>
                    {seoAnalysis && (
                      <span className={cn('text-xs font-bold px-2 py-0.5 rounded-full',
                        seoAnalysis.score >= 80 ? 'bg-green-100 text-green-700'
                        : seoAnalysis.score >= 50 ? 'bg-amber-100 text-amber-700'
                        : 'bg-red-100 text-red-700'
                      )}>
                        {seoAnalysis.score}/100 — {scoreLabel(seoAnalysis.score)}
                      </span>
                    )}
                    {analyzing && <Loader2 size={14} className="animate-spin text-blue-500" />}
                  </div>
                  <p className="text-xs text-slate-500">
                    {seoAnalysis
                      ? `${seoAnalysis.summary.errors} lỗi · ${seoAnalysis.summary.warnings} cảnh báo · ${seoAnalysis.summary.good} tốt`
                      : 'Nhập nội dung để bắt đầu phân tích'
                    }
                  </p>
                </div>
              </div>
              <ChevronDown size={16} className={cn('text-slate-400 transition-transform', seoExpanded && 'rotate-180')} />
            </button>

            {seoExpanded && (
              <div className="border-t border-slate-100">
                {/* Focus Keyword */}
                <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50">
                  <label className="block text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wider">Từ khóa chính (Focus Keyword)</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={focusKeyword}
                      onChange={(e) => setFocusKeyword(e.target.value)}
                      placeholder="VD: thiết kế website, cloud server..."
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                    />
                    <SearchIcon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
                  {focusKeyword && content && (
                    <div className="mt-2 flex items-center gap-4 text-xs text-slate-500">
                      <span>Mật độ: <strong className={cn(
                        (() => {
                          const d = (content.toLowerCase().split(focusKeyword.toLowerCase()).length - 1) / (content.split(/\s+/).length || 1) * 100
                          return d >= 1 && d <= 3 ? 'text-green-600' : d > 3 ? 'text-red-600' : 'text-amber-600'
                        })()
                      )}>
                        {((content.toLowerCase().split(focusKeyword.toLowerCase()).length - 1) / (content.split(/\s+/).length || 1) * 100).toFixed(1)}%
                      </strong></span>
                      <span>Xuất hiện: <strong>{content.toLowerCase().split(focusKeyword.toLowerCase()).length - 1} lần</strong></span>
                    </div>
                  )}
                </div>

                {/* Score Overview */}
                {seoAnalysis && (
                  <div className="px-5 py-4 border-b border-slate-100">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={cn('w-16 h-16 rounded-2xl flex items-center justify-center text-lg font-black',
                        seoAnalysis.score >= 80 ? 'bg-green-100 text-green-700'
                        : seoAnalysis.score >= 50 ? 'bg-amber-100 text-amber-700'
                        : 'bg-red-100 text-red-700'
                      )}>
                        {seoAnalysis.score}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm font-semibold text-slate-700">Điểm SEO tổng</span>
                          <span className={cn('text-xs font-bold', scoreColor(seoAnalysis.score))}>{scoreLabel(seoAnalysis.score)}</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2.5">
                          <div className={cn('h-2.5 rounded-full transition-all duration-500', scoreBg(seoAnalysis.score))} style={{ width: `${seoAnalysis.score}%` }} />
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-xs">
                          <span className="flex items-center gap-1 text-red-600"><XCircle size={12} /> {seoAnalysis.summary.errors} lỗi</span>
                          <span className="flex items-center gap-1 text-amber-600"><AlertTriangle size={12} /> {seoAnalysis.summary.warnings} cảnh báo</span>
                          <span className="flex items-center gap-1 text-green-600"><CheckCircle2 size={12} /> {seoAnalysis.summary.good} tốt</span>
                        </div>
                      </div>
                    </div>

                    {/* Category scores */}
                    <div className="space-y-2">
                      {seoAnalysis.categories.map((cat) => (
                        <div key={cat.name} className="border border-slate-100 rounded-lg overflow-hidden">
                          <button
                            onClick={() => setExpandedCategory(expandedCategory === cat.name ? null : cat.name)}
                            className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-slate-50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className={cn('w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold',
                                cat.score >= cat.maxScore * 0.8 ? 'bg-green-100 text-green-700'
                                : cat.score >= cat.maxScore * 0.5 ? 'bg-amber-100 text-amber-700'
                                : 'bg-red-100 text-red-700'
                              )}>
                                {cat.score}
                              </div>
                              <span className="text-sm font-medium text-slate-700">{cat.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-slate-400">{cat.score}/{cat.maxScore}</span>
                              <div className="w-20 bg-slate-100 rounded-full h-1.5">
                                <div className={cn('h-1.5 rounded-full', scoreBg(cat.score / cat.maxScore * 100))} style={{ width: `${(cat.score / cat.maxScore) * 100}%` }} />
                              </div>
                              <ChevronRight size={14} className={cn('text-slate-400 transition-transform', expandedCategory === cat.name && 'rotate-90')} />
                            </div>
                          </button>
                          {expandedCategory === cat.name && (
                            <div className="px-3 pb-3 space-y-1.5 border-t border-slate-50 pt-2">
                              {cat.issues.map((issue, i) => (
                                <div key={i} className={cn('flex items-start gap-2 px-2.5 py-2 rounded-lg text-xs',
                                  issue.type === 'error' ? 'bg-red-50' :
                                  issue.type === 'warning' ? 'bg-amber-50' :
                                  issue.type === 'good' ? 'bg-green-50' : 'bg-blue-50'
                                )}>
                                  {issueIcon(issue.type)}
                                  <div>
                                    <p className="font-medium text-slate-700">{issue.message}</p>
                                    {issue.detail && <p className="text-slate-500 mt-0.5">{issue.detail}</p>}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SEO Meta Fields */}
                <div className="px-5 py-4 space-y-4">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Thẻ Meta & SEO</h4>

                  {/* Google Preview */}
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                    <p className="text-[10px] text-slate-400 mb-2 uppercase tracking-wider font-bold">Xem trước trên Google</p>
                    <div className="space-y-0.5">
                      <p className="text-blue-700 text-base font-medium truncate">{seoTitle || title || 'Tiêu đề bài viết'} | MTIEN Solution</p>
                      <p className="text-green-800 text-xs">mtiensolution.vn/blog/{slug || 'duong-dan'}</p>
                      <p className="text-xs text-slate-600 line-clamp-2">{seoDescription || excerpt || 'Mô tả meta sẽ hiển thị ở đây...'}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">SEO Title</label>
                    <input type="text" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)}
                      placeholder={title || 'Nhập SEO title...'} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-slate-400">{(seoTitle || title).length}/60 ký tự</p>
                      <div className="w-24 bg-slate-100 rounded-full h-1.5">
                        <div className={cn('h-1.5 rounded-full transition-all', (seoTitle || title).length <= 60 ? 'bg-green-500' : 'bg-red-500')} style={{ width: `${Math.min(((seoTitle || title).length / 60) * 100, 100)}%` }} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Meta Description</label>
                    <textarea value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)}
                      placeholder={excerpt || 'Mô tả ngắn gọn cho SEO (120-160 ký tự)...'} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none resize-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" rows={3} />
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-slate-400">{seoDescription.length}/160 ký tự</p>
                      <div className="w-24 bg-slate-100 rounded-full h-1.5">
                        <div className={cn('h-1.5 rounded-full transition-all',
                          seoDescription.length >= 120 && seoDescription.length <= 160 ? 'bg-green-500' : seoDescription.length > 160 ? 'bg-red-500' : 'bg-amber-500'
                        )} style={{ width: `${Math.min((seoDescription.length / 160) * 100, 100)}%` }} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Từ khóa phụ</label>
                    <div className="flex items-center gap-2 mb-2">
                      <input type="text" value={seoKeywordInput} onChange={(e) => setSeoKeywordInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSeoKeyword())}
                        placeholder="Thêm từ khóa..." className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
                      <button onClick={addSeoKeyword} className="p-2 bg-slate-100 rounded-lg text-slate-500 hover:bg-slate-200"><Plus size={16} /></button>
                    </div>
                    {seoKeywords.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {seoKeywords.map(k => (
                          <span key={k} className="inline-flex items-center gap-1 bg-green-50 text-green-600 text-xs font-medium px-2 py-1 rounded-md">
                            {k}
                            <button onClick={() => removeSeoKeyword(k)} className="text-green-400 hover:text-green-700"><X size={12} /></button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Canonical URL</label>
                    <input type="text" value={canonicalUrl} onChange={(e) => setCanonicalUrl(e.target.value)}
                      placeholder="https://mtiensolution.vn/blog/..." className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">OG Image URL</label>
                    <input type="text" value={ogImage} onChange={(e) => setOgImage(e.target.value)}
                      placeholder="URL ảnh OG (để trống sẽ dùng ảnh đại diện)" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                  </div>

                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="noindex" checked={noIndex} onChange={(e) => setNoIndex(e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-blue-500" />
                    <label htmlFor="noindex" className="text-sm text-slate-600">No Index (ẩn khỏi Google)</label>
                  </div>

                  <button onClick={runSeoAnalysis} disabled={analyzing || !title}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-800 text-white rounded-lg text-sm font-semibold hover:bg-slate-700 disabled:opacity-50 transition-colors">
                    {analyzing ? <Loader2 size={16} className="animate-spin" /> : <Target size={16} />}
                    Phân tích SEO ngay
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Sidebar */}
        <div className="space-y-5">
          {/* Publish box */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">Xuất bản</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Trạng thái</label>
                <select value={status} onChange={(e) => setStatus(e.target.value as typeof status)} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20">
                  <option value="draft">Nháp</option>
                  <option value="published">Xuất bản ngay</option>
                  <option value="scheduled">Lên lịch</option>
                </select>
              </div>
              {status === 'scheduled' && (
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Ngày xuất bản</label>
                  <input type="datetime-local" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
                </div>
              )}
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Ảnh đại diện</h3>
            {featuredImage ? (
              <div className="relative rounded-lg overflow-hidden group">
                <img src={featuredImage} alt="" className="w-full h-40 object-cover" />
                <button onClick={() => setFeaturedImage(null)} className="absolute top-2 right-2 w-7 h-7 bg-black/50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <X size={14} />
                </button>
                <button onClick={() => setShowMediaPicker(true)} className="absolute bottom-2 right-2 px-3 py-1.5 bg-black/50 rounded-lg text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Đổi ảnh
                </button>
              </div>
            ) : (
              <button onClick={() => setShowMediaPicker(true)} className="w-full h-40 border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-colors">
                <Upload size={24} />
                <span className="text-sm font-medium">Chọn hoặc tải ảnh lên</span>
                <span className="text-xs">JPG, PNG, WebP — Tối đa 10MB</span>
              </button>
            )}
          </div>
          <MediaPicker
            open={showMediaPicker}
            onClose={() => setShowMediaPicker(false)}
            onSelect={(item) => setFeaturedImage(item.url)}
            accept="image"
          />

          {/* Category */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Chuyên mục</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto mb-3">
              {(() => {
                const allCats = Array.from(new Set([
                  ...dbCategories.map(c => c.name),
                  ...DEFAULT_CATEGORIES,
                ]))
                return allCats.map((cat) => {
                  const dbCat = dbCategories.find(c => c.name === cat)
                  return (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                      <input type="radio" name="category" value={cat} checked={category === cat} onChange={() => setCategory(cat)} className="w-4 h-4 text-blue-500 border-slate-300 focus:ring-blue-500" />
                      <span className="text-sm text-slate-600 group-hover:text-slate-800">{cat}</span>
                      {dbCat && <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full">{dbCat.count}</span>}
                    </label>
                  )
                })
              })()}
            </div>
            <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
              <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    const val = newCategory.trim()
                    if (val) { setCategory(val); setNewCategory('') }
                  }
                }}
                placeholder="Thêm chuyên mục mới..."
                className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
              <button onClick={() => {
                const val = newCategory.trim()
                if (val) { setCategory(val); setNewCategory('') }
              }} className="p-2 bg-slate-100 rounded-lg text-slate-500 hover:bg-slate-200 transition-colors"><Plus size={16} /></button>
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Thẻ (Tags)</h3>
            <div className="flex items-center gap-2 mb-3">
              <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="Nhập thẻ..." className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
              <button onClick={addTag} className="p-2 bg-slate-100 rounded-lg text-slate-500 hover:bg-slate-200 transition-colors"><Plus size={16} /></button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 text-xs font-medium px-2 py-1 rounded-md">
                    {tag}
                    <button onClick={() => removeTag(tag)} className="text-blue-400 hover:text-blue-700"><X size={12} /></button>
                  </span>
                ))}
              </div>
            )}
            {/* Existing tags from DB as quick-add suggestions */}
            {dbTags.length > 0 && (
              <div className="pt-3 border-t border-slate-100">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Gợi ý từ bài viết cũ</p>
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                  {dbTags.filter(t => !tags.includes(t)).slice(0, 20).map(tag => (
                    <button key={tag} onClick={() => setTags(prev => [...prev, tag])}
                      className="text-[11px] px-2 py-1 bg-slate-50 border border-slate-200 rounded-md text-slate-500 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors">
                      + {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Author */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Tác giả</h3>
            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)}
              placeholder="Tên tác giả..." className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
            {author && <p className="text-[10px] text-slate-400 mt-1.5">Tự động lấy từ tài khoản đăng nhập</p>}
          </div>

          {/* Link Analysis */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Phân tích liên kết</h3>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Link2 size={14} className="text-blue-500" />
                  <span>Internal links</span>
                </div>
                <span className={cn('text-sm font-bold tabular-nums', internalLinks > 0 ? 'text-green-600' : 'text-slate-400')}>{internalLinks}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <ExternalLink size={14} className="text-orange-500" />
                  <span>External links</span>
                </div>
                <span className={cn('text-sm font-bold tabular-nums', externalLinks > 0 ? 'text-green-600' : 'text-slate-400')}>{externalLinks}</span>
              </div>
              {internalLinks === 0 && content.length > 100 && (
                <p className="text-[11px] text-amber-600 bg-amber-50 px-2.5 py-1.5 rounded-lg">
                  ⚠ Chưa có internal link. Nên thêm liên kết nội bộ để cải thiện SEO.
                </p>
              )}
            </div>
          </div>

          {/* Quick SEO Checklist */}
          {seoAnalysis && (
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <Target size={14} className="text-blue-600" />
                Checklist SEO
              </h3>
              <div className="space-y-1.5 max-h-[400px] overflow-y-auto">
                {[...seoAnalysis.issues]
                  .sort((a, b) => {
                    const order: Record<string, number> = { error: 0, warning: 1, info: 2, good: 3 }
                    return (order[a.type] ?? 3) - (order[b.type] ?? 3)
                  })
                  .slice(0, 15)
                  .map((issue, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs py-1">
                      {issueIcon(issue.type)}
                      <span className={cn('leading-snug', issue.type === 'good' ? 'text-slate-500' : 'text-slate-700')}>{issue.message}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
