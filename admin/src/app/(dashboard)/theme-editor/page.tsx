'use client'

import { useState, useCallback, useEffect } from 'react'
import {
  Save, Undo2, Redo2, ChevronDown, ChevronRight,
  Eye, EyeOff, GripVertical, ArrowUp, ArrowDown,
  Palette, Type, Menu, PanelBottom, Search, Globe,
  Home, Info, FileText, Phone, Briefcase, FolderKanban,
  Cloud, Megaphone, PenTool, Code, ShoppingBag,
  Check, X, Upload, Trash2, Plus, Monitor, Tablet, Smartphone,
  Layers, RotateCcw,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { allPageSchemas, globalThemeSchema, generateDefaultValues, generateGlobalDefaults } from '@/lib/theme-schema'
import type { ThemeConfig, EditorState, FieldSchema, HistoryEntry } from '@/types/theme'

// ---- Icon map ----
const iconMap: Record<string, React.ElementType> = {
  Home, Info, FileText, Phone, Briefcase, FolderKanban, Cloud, Megaphone,
  PenTool, Code, ShoppingBag, Palette, Type, Menu, PanelBottom, Search,
  Globe, Monitor, Eye, Tablet, Smartphone, Layers,
}
function DynIcon({ name, size = 18 }: { name?: string; size?: number }) {
  const Icon = name ? iconMap[name] : null
  return Icon ? <Icon size={size} /> : null
}

export default function ThemeEditorPage() {
  // ---- State ----
  const [config, setConfig] = useState<ThemeConfig>(() => ({
    id: 'default',
    name: 'Default Theme',
    version: 1,
    global: generateGlobalDefaults(),
    pages: generateDefaultValues(allPageSchemas),
    updatedAt: new Date().toISOString(),
    publishedAt: null,
  }))

  const [editor, setEditor] = useState<EditorState>({
    activePage: 'global',
    activeSection: null,
    activeField: null,
    unsavedChanges: false,
    previewMode: 'desktop',
    sidebarOpen: true,
    isDragging: false,
  })

  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [published, setPublished] = useState(false)
  const [isDirty, setIsDirty] = useState(false)
  const [tab, setTab] = useState<'page' | 'global'>('page')
  const [loaded, setLoaded] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // ---- Load saved config ----
  useEffect(() => {
    fetch('/api/theme')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.config) setConfig(data.config)
        if (data?.status?.isDirty) setIsDirty(true)
      })
      .catch(() => {})
      .finally(() => setLoaded(true))
  }, [])

  // ---- History ----
  const pushHistory = useCallback((label: string) => {
    setHistory(prev => {
      const trimmed = prev.slice(0, historyIndex + 1)
      return [...trimmed, { timestamp: Date.now(), label, config: structuredClone(config) }]
    })
    setHistoryIndex(prev => prev + 1)
  }, [config, historyIndex])

  const undo = useCallback(() => {
    if (historyIndex < 0) return
    const entry = history[historyIndex]
    if (entry) { setConfig(entry.config); setHistoryIndex(prev => prev - 1) }
  }, [history, historyIndex])

  const redo = useCallback(() => {
    if (historyIndex >= history.length - 1) return
    const entry = history[historyIndex + 1]
    if (entry) { setConfig(entry.config); setHistoryIndex(prev => prev + 1) }
  }, [history, historyIndex])

  // ---- Update helpers ----
  const updateGlobal = useCallback((section: string, key: string, value: unknown) => {
    pushHistory(`Thay đổi ${section}.${key}`)
    setConfig(prev => ({
      ...prev,
      global: { ...prev.global, [section]: { ...prev.global[section], [key]: value } },
      updatedAt: new Date().toISOString(),
    }))
    setEditor(prev => ({ ...prev, unsavedChanges: true }))
  }, [pushHistory])

  const updatePage = useCallback((pageId: string, sectionId: string, key: string, value: unknown) => {
    pushHistory(`Thay đổi ${pageId}.${sectionId}.${key}`)
    setConfig(prev => ({
      ...prev,
      pages: {
        ...prev.pages,
        [pageId]: {
          ...prev.pages[pageId],
          [sectionId]: {
            ...prev.pages[pageId]?.[sectionId],
            values: { ...prev.pages[pageId]?.[sectionId]?.values, [key]: value },
          },
        },
      },
      updatedAt: new Date().toISOString(),
    }))
    setEditor(prev => ({ ...prev, unsavedChanges: true }))
  }, [pushHistory])

  const toggleSectionVisibility = useCallback((pageId: string, sectionId: string) => {
    pushHistory(`Ẩn/hiện ${sectionId}`)
    setConfig(prev => ({
      ...prev,
      pages: {
        ...prev.pages,
        [pageId]: {
          ...prev.pages[pageId],
          [sectionId]: { ...prev.pages[pageId]?.[sectionId], visible: !prev.pages[pageId]?.[sectionId]?.visible },
        },
      },
    }))
    setEditor(prev => ({ ...prev, unsavedChanges: true }))
  }, [pushHistory])

  const moveSectionOrder = useCallback((pageId: string, sectionId: string, direction: 'up' | 'down') => {
    pushHistory(`Di chuyển ${sectionId}`)
    setConfig(prev => {
      const pageSections = { ...prev.pages[pageId] }
      const entries = Object.entries(pageSections).sort((a, b) => a[1].order - b[1].order)
      const idx = entries.findIndex(([id]) => id === sectionId)
      if (direction === 'up' && idx > 0) {
        const temp = entries[idx][1].order
        entries[idx][1] = { ...entries[idx][1], order: entries[idx - 1][1].order }
        entries[idx - 1][1] = { ...entries[idx - 1][1], order: temp }
      } else if (direction === 'down' && idx < entries.length - 1) {
        const temp = entries[idx][1].order
        entries[idx][1] = { ...entries[idx][1], order: entries[idx + 1][1].order }
        entries[idx + 1][1] = { ...entries[idx + 1][1], order: temp }
      }
      return { ...prev, pages: { ...prev.pages, [pageId]: Object.fromEntries(entries) } }
    })
    setEditor(prev => ({ ...prev, unsavedChanges: true }))
  }, [pushHistory])

  // ---- Save Draft ----
  const save = useCallback(async () => {
    setSaving(true)
    try {
      const resp = await fetch('/api/theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'save-draft', config }),
      })
      if (resp.ok) {
        setSaved(true)
        setIsDirty(true)
        setTimeout(() => setSaved(false), 2000)
        setEditor(prev => ({ ...prev, unsavedChanges: false }))
      }
    } catch { alert('Lưu thất bại!') }
    finally { setSaving(false) }
  }, [config])

  // ---- Publish (make live on FE) ----
  const publish = useCallback(async () => {
    if (!confirm('Xuất bản theme này lên website chính?')) return
    setPublishing(true)
    try {
      const resp = await fetch('/api/theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'publish', config }),
      })
      if (resp.ok) {
        setPublished(true)
        setIsDirty(false)
        setTimeout(() => setPublished(false), 3000)
        setEditor(prev => ({ ...prev, unsavedChanges: false }))
      }
    } catch { alert('Xuất bản thất bại!') }
    finally { setPublishing(false) }
  }, [config])

  // ---- Export ----
  const exportTheme = useCallback(() => {
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `theme-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }, [config])

  // ---- Import ----
  const importTheme = useCallback(() => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      try {
        const text = await file.text()
        const data = JSON.parse(text)
        const importConfig = data.config || data.draft || data.published || data
        if (importConfig?.global && importConfig?.pages) {
          setConfig(importConfig)
          setEditor(prev => ({ ...prev, unsavedChanges: true }))
        } else {
          alert('File không hợp lệ. Cần có global và pages.')
        }
      } catch { alert('Đọc file thất bại!') }
    }
    input.click()
  }, [])

  // ---- Reset section to default ----
  const resetSection = useCallback(() => {
    if (!editor.activeSection) return
    if (editor.activePage === 'global') {
      const schema = globalThemeSchema[editor.activeSection as keyof typeof globalThemeSchema]
      if (!schema) return
      pushHistory(`Reset ${editor.activeSection}`)
      const defaults: Record<string, unknown> = {}
      for (const f of schema.fields) defaults[f.key] = f.defaultValue ?? ''
      setConfig(prev => ({ ...prev, global: { ...prev.global, [editor.activeSection!]: defaults } }))
      setEditor(prev => ({ ...prev, unsavedChanges: true }))
    } else {
      const page = allPageSchemas.find(p => p.id === editor.activePage)
      const section = page?.sections.find(s => s.id === editor.activeSection)
      if (!section) return
      pushHistory(`Reset ${editor.activeSection}`)
      const defaults: Record<string, unknown> = {}
      for (const f of section.fields) defaults[f.key] = f.defaultValue ?? ''
      setConfig(prev => ({
        ...prev,
        pages: {
          ...prev.pages,
          [editor.activePage]: {
            ...prev.pages[editor.activePage],
            [editor.activeSection!]: { ...prev.pages[editor.activePage]?.[editor.activeSection!], values: defaults },
          },
        },
      }))
      setEditor(prev => ({ ...prev, unsavedChanges: true }))
    }
  }, [editor.activePage, editor.activeSection, pushHistory])

  // ---- Derived ----
  const activePage = editor.activePage !== 'global' ? allPageSchemas.find(p => p.id === editor.activePage) : null
  const activePageData = activePage ? config.pages[activePage.id] : null
  const activeGlobalSection = editor.activePage === 'global' && editor.activeSection
    ? globalThemeSchema[editor.activeSection as keyof typeof globalThemeSchema] : null
  const activePageSection = activePage && editor.activeSection
    ? activePage.sections.find(s => s.id === editor.activeSection) : null
  const currentFields = activeGlobalSection?.fields || activePageSection?.fields || []

  if (!loaded) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* ===== Header ===== */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-semibold text-[#1d1d1f] tracking-tight flex items-center gap-3">
            <Palette className="text-[#0066cc]" size={24} />
            Theme Builder
          </h1>
          <p className="text-[#86868b] text-[14px] mt-1 font-medium tracking-tight">Tùy chỉnh giao diện hiển thị cho website của bạn</p>
          {isDirty && (
            <span className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 bg-[#ff9500]/10 text-[#ff9500] text-[12px] font-semibold rounded-full border border-[#ff9500]/20">
              <span className="w-1.5 h-1.5 bg-[#ff9500] rounded-full animate-pulse" />
              Có thay đổi chưa xuất bản
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={undo} disabled={historyIndex < 0}
            className="p-2 rounded-xl apple-card text-[#86868b] hover:text-[#1d1d1f] disabled:opacity-30 transition-colors" title="Hoàn tác">
            <Undo2 size={18} />
          </button>
          <button onClick={redo} disabled={historyIndex >= history.length - 1}
            className="p-2 rounded-xl apple-card text-[#86868b] hover:text-[#1d1d1f] disabled:opacity-30 transition-colors" title="Làm lại">
            <Redo2 size={18} />
          </button>
          <div className="w-px h-5 bg-black/10 mx-1.5" />
          <button onClick={importTheme}
            className="p-2 rounded-xl apple-card text-[#86868b] hover:text-[#1d1d1f] transition-colors" title="Nhập File Config">
            <Upload size={18} />
          </button>
          <button onClick={exportTheme}
            className="p-2 rounded-xl apple-card text-[#86868b] hover:text-[#1d1d1f] transition-colors" title="Export">
            <Save size={18} />
          </button>
          <div className="w-px h-5 bg-black/10 mx-1.5" />
          <button onClick={save} disabled={saving || !editor.unsavedChanges}
            className={cn(
              'apple-btn-secondary h-9 px-4 text-[13px] font-semibold transition-all',
              editor.unsavedChanges
                ? 'bg-[#1d1d1f] text-white hover:bg-[#333336]'
                : saved ? 'bg-[#34c759] text-white' : 'bg-black/5 text-[#86868b] cursor-not-allowed'
            )}>
            {saving ? <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              : saved ? <Check size={16} /> : <Save size={16} />}
            {saving ? 'Lưu...' : saved ? 'Đã lưu!' : 'Lưu nháp'}
          </button>
          <button onClick={publish} disabled={publishing}
            className={cn(
              'apple-btn-primary h-9 px-5 text-[13px] font-semibold transition-all gap-2',
              published
                ? 'bg-[#34c759] hover:bg-[#34c759]'
                : isDirty || editor.unsavedChanges
                  ? 'bg-[#0066cc] hover:bg-[#0071e3] shadow-[0_4px_12px_rgba(0,102,204,0.3)]'
                  : 'bg-[#0066cc] hover:bg-[#0071e3]'
            )}>
            {publishing ? <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              : published ? <Check size={16} /> : <Globe size={16} />}
            {publishing ? 'Đang xuất bản...' : published ? 'Đã xuất bản!' : 'Xuất bản'}
          </button>
        </div>
      </div>

      {/* ===== Main Grid ===== */}
      <div className="grid grid-cols-12 gap-6 min-h-[calc(100vh-220px)]">

        {/* ---- Left: Page & Section Navigator ---- */}
        <div className="col-span-3 apple-card overflow-hidden flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-black/5 shrink-0 bg-transparent p-1.5 gap-1">
            <button onClick={() => { setTab('page'); setEditor(prev => ({ ...prev, activePage: activePage?.id || allPageSchemas[0]?.id || 'home', activeSection: null })) }}
              className={cn('flex-1 py-2 text-[12px] font-semibold tracking-tight transition-all rounded-[10px]',
                tab === 'page' ? 'text-[#1d1d1f] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06)]' : 'text-[#86868b] hover:text-[#424245] hover:bg-black/5')}>
              TRANG GIAO DIỆN
            </button>
            <button onClick={() => { setTab('global'); setEditor(prev => ({ ...prev, activePage: 'global', activeSection: null })) }}
              className={cn('flex-1 py-2 text-[12px] font-semibold tracking-tight transition-all rounded-[10px]',
                tab === 'global' ? 'text-[#1d1d1f] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06)]' : 'text-[#86868b] hover:text-[#424245] hover:bg-black/5')}>
              THIẾT LẬP CHUNG
            </button>
          </div>

          {/* Search */}
          <div className="px-3 pt-3 pb-2 shrink-0 border-b border-black/5">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#86868b]" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Tìm trang, module..."
                className="w-full pl-8 pr-3 py-1.5 text-[13px] bg-black/[0.04] rounded-lg border-transparent focus:bg-white focus:ring-2 focus:ring-[#0066cc]/20 transition-all font-medium placeholder:text-[#86868b] placeholder:font-normal outline-none"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#86868b] hover:text-[#1d1d1f]">
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-1">
            {tab === 'page' ? (
              allPageSchemas
                .filter(page => {
                  if (!searchQuery) return true
                  const q = searchQuery.toLowerCase()
                  return page.name.toLowerCase().includes(q) || page.id.toLowerCase().includes(q) ||
                    page.sections.some(s => s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q))
                })
                .map(page => {
                const isActive = editor.activePage === page.id
                return (
                  <div key={page.id}>
                    <button onClick={() => setEditor(prev => ({ ...prev, activePage: page.id, activeSection: isActive ? prev.activeSection : null }))}
                      className={cn('w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all text-sm',
                        isActive ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-[#424245] hover:bg-black/[0.02]')}>
                      <DynIcon name={page.icon} size={18} />
                      <span className="flex-1 truncate">{page.name}</span>
                      {isActive ? <ChevronDown size={14} className="text-[#86868b]" /> : <ChevronRight size={14} className="text-[#86868b]" />}
                    </button>
                    {isActive && (
                      <div className="ml-5 mt-1.5 mb-2.5 space-y-0.5 border-l-[1.5px] border-black/5 pl-2.5">
                        {page.sections
                          .map(s => ({ schema: s, data: activePageData?.[s.id] }))
                          .sort((a, b) => ((a.data?.order ?? 0) - (b.data?.order ?? 0)))
                          .map(({ schema: section, data: sData }) => {
                            const isVisible = sData?.visible !== false
                            const isSectionActive = editor.activeSection === section.id
                            return (
                              <div key={section.id} className="group relative">
                                <button onClick={() => setEditor(prev => ({ ...prev, activeSection: section.id }))}
                                  className={cn('w-full flex items-center justify-between gap-2.5 px-3 py-2 rounded-[10px] text-left transition-all text-[13px] font-medium',
                                    isSectionActive ? 'bg-[#0066cc]/10 text-[#0066cc]' : 'text-[#86868b] hover:text-[#1d1d1f] hover:bg-black/[0.03]',
                                    !isVisible && 'opacity-50 grayscale')}>
                                  <div className="flex items-center gap-2.5 truncate">
                                    <GripVertical size={13} className="text-[#86868b] shrink-0 opacity-50 cursor-grab hover:opacity-100 transition-opacity" />
                                    <span className="truncate">{section.name}</span>
                                  </div>
                                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={e => { e.stopPropagation(); moveSectionOrder(page.id, section.id, 'up') }}
                                      className="p-1 rounded-md hover:bg-black/5 text-[#86868b] hover:text-[#1d1d1f] transition-colors" title="Lên"><ArrowUp size={12} /></button>
                                    <button onClick={e => { e.stopPropagation(); moveSectionOrder(page.id, section.id, 'down') }}
                                      className="p-1 rounded-md hover:bg-black/5 text-[#86868b] hover:text-[#1d1d1f] transition-colors" title="Xuống"><ArrowDown size={12} /></button>
                                    <button onClick={e => { e.stopPropagation(); toggleSectionVisibility(page.id, section.id) }}
                                      className="p-1 rounded-md hover:bg-black/5 text-[#86868b] hover:text-[#1d1d1f] transition-colors" title={isVisible ? 'Ẩn' : 'Hiện'}>
                                      {isVisible ? <Eye size={12} /> : <EyeOff size={12} />}
                                    </button>
                                  </div>
                                </button>
                              </div>
                            )
                          })}
                      </div>
                    )}
                  </div>
                )
              })
            ) : (
              Object.entries(globalThemeSchema).map(([key, schema]) => (
                <button key={key} onClick={() => setEditor(prev => ({ ...prev, activeSection: key }))}
                  className={cn('w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all text-sm',
                    editor.activeSection === key ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-[#424245] hover:bg-black/[0.02]')}>
                  <DynIcon name={schema.icon} size={18} />
                  <span>{schema.name}</span>
                </button>
              ))
            )}
          </div>
        </div>

        {/* ---- Right: Field Editor ---- */}
        <div className="col-span-9 apple-card overflow-hidden flex flex-col">
          {currentFields.length > 0 ? (
            <>
              {/* Section Header */}
              <div className="px-6 py-5 border-b border-black/5 bg-white/50 backdrop-blur-md flex items-center justify-between shrink-0">
                <div>
                  <h2 className="text-[17px] font-semibold tracking-tight text-[#1d1d1f]">
                    {activeGlobalSection?.name || activePageSection?.name}
                  </h2>
                  <p className="text-[13px] text-[#86868b] mt-0.5 font-medium tracking-tight">
                    {editor.activePage === 'global' ? 'Thiết lập toàn cục' : `Tùy chỉnh: ${activePage?.name}`}
                    {' · '}{currentFields.length} thuộc tính
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <button onClick={resetSection} className="flex items-center gap-1.5 px-3.5 py-2 text-[13px] font-medium text-[#86868b] hover:text-[#ff3b30] bg-[#f5f5f7] rounded-[10px] hover:bg-[#ff3b30]/10 transition-all border border-transparent hover:border-[#ff3b30]/20"
                    title="Khôi phục mặc định">
                    <RotateCcw size={14} /> Khôi phục
                  </button>
                  <button onClick={() => setEditor(prev => ({ ...prev, activeSection: null }))}
                    className="p-2 rounded-full hover:bg-black/5 transition-colors bg-[#f5f5f7]">
                    <X size={16} className="text-[#86868b] hover:text-[#1d1d1f]" />
                  </button>
                </div>
              </div>

              {/* Fields Grid */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                <div className="grid grid-cols-2 gap-x-6 gap-y-5 max-w-4xl">
                  {currentFields.map(field => {
                    const isWide = ['textarea', 'richtext', 'repeater', 'group'].includes(field.type)
                    return (
                      <div key={field.key} className={isWide ? 'col-span-2' : 'col-span-1'}>
                        <FieldEditor
                          field={field}
                          value={
                            editor.activePage === 'global' && editor.activeSection
                              ? config.global[editor.activeSection]?.[field.key]
                              : activePage && editor.activeSection
                                ? config.pages[activePage.id]?.[editor.activeSection]?.values?.[field.key]
                                : undefined
                          }
                          onChange={(val) => {
                            if (editor.activePage === 'global' && editor.activeSection) {
                              updateGlobal(editor.activeSection, field.key, val)
                            } else if (activePage && editor.activeSection) {
                              updatePage(activePage.id, editor.activeSection, field.key, val)
                            }
                          }}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            </>
          ) : (
            /* Empty state */
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center max-w-[340px]">
                <div className="w-24 h-24 rounded-[28px] bg-gradient-to-tr from-[#0066cc]/10 to-[#3694f4]/20 flex items-center justify-center mx-auto mb-6 shadow-sm border border-white">
                  <Palette size={42} className="text-[#0066cc]/70 drop-shadow-sm" />
                </div>
                <h3 className="text-[20px] font-semibold text-[#1d1d1f] mb-2.5 tracking-tight">Cá nhân hóa giao diện</h3>
                <p className="text-[14px] text-[#86868b] leading-relaxed font-medium">
                  Lựa chọn một module cấu hình từ thanh bên trái để bắt đầu thiết kế và tùy chỉnh các thành phần trên website.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// =====================================================
// FIELD EDITOR COMPONENT
// =====================================================

function FieldEditor({ field, value, onChange }: { field: FieldSchema; value: unknown; onChange: (val: unknown) => void }) {
  const v = value ?? field.defaultValue ?? ''

  switch (field.type) {
    case 'text':
      return (
        <div>
          <label className="block text-xs font-semibold text-[#424245] mb-1.5">{field.label}</label>
          <input type="text" value={String(v)} onChange={e => onChange(e.target.value)} placeholder={field.placeholder}
            className="w-full px-3 py-2.5 text-sm border rounded-lg focus:ring-0 focus:border-blue-500 outline-none transition-all bg-black/[0.02] focus:bg-white" />
          {field.description && <p className="text-[10px] text-[#86868b] mt-1">{field.description}</p>}
        </div>
      )
    case 'textarea':
      return (
        <div>
          <label className="block text-xs font-semibold text-[#424245] mb-1.5">{field.label}</label>
          <textarea value={String(v)} onChange={e => onChange(e.target.value)} rows={3}
            className="w-full px-3 py-2.5 text-sm border rounded-lg focus:ring-0 focus:border-blue-500 outline-none resize-y transition-all bg-black/[0.02] focus:bg-white" />
        </div>
      )
    case 'number':
      return (
        <div>
          <label className="block text-xs font-semibold text-[#424245] mb-1.5">{field.label}</label>
          <input type="number" value={Number(v)} onChange={e => onChange(Number(e.target.value))} min={field.min} max={field.max} step={field.step || 1}
            className="w-full px-3 py-2.5 text-sm border rounded-lg focus:ring-0 focus:border-blue-500 outline-none transition-all bg-black/[0.02] focus:bg-white" />
        </div>
      )
    case 'color':
      return (
        <div>
          <label className="block text-[13px] font-semibold text-[#86868b] mb-2">{field.label}</label>
          <div className="flex items-center gap-3">
            <input type="color" value={String(v)} onChange={e => onChange(e.target.value)}
              className="w-10 h-10 rounded-[10px] border-2 border-transparent cursor-pointer p-0.5 shrink-0 shadow-[0_2px_4px_rgba(0,0,0,0.05)] bg-white" />
            <input type="text" value={String(v)} onChange={e => onChange(e.target.value)}
              className="flex-1 apple-input font-mono" />
          </div>
        </div>
      )
    case 'image':
      return (
        <div>
          <label className="block text-[13px] font-semibold text-[#86868b] mb-2">{field.label}</label>
          {v ? (
            <div className="relative group">
              <img src={String(v)} alt="" className="w-full h-36 object-cover rounded-[14px] border border-black/5 shadow-sm" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-all rounded-[14px] flex items-center justify-center gap-2">
                <button onClick={() => onChange('')} className="p-2.5 bg-white/90 rounded-xl hover:bg-[#ff3b30] hover:text-white transition-colors text-[#ff3b30] shadow-lg">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div>
              <input type="text" value="" onChange={e => onChange(e.target.value)} placeholder="Nhập URL hình ảnh..."
                className="apple-input mb-2.5" />
              <label className="flex items-center justify-center gap-2.5 px-3 py-5 border-2 border-dashed border-black/10 rounded-[14px] cursor-pointer hover:border-[#0066cc]/40 hover:bg-[#0066cc]/5 transition-all">
                <Upload size={18} className="text-[#86868b]" />
                <span className="text-[13px] font-medium text-[#86868b]">Hoặc tải ảnh lên (Max 5MB)</span>
                <input type="file" accept="image/*" className="hidden" onChange={e => {
                  const file = e.target.files?.[0]
                  if (file) { const r = new FileReader(); r.onload = ev => onChange(ev.target?.result); r.readAsDataURL(file) }
                }} />
              </label>
            </div>
          )}
        </div>
      )
    case 'toggle':
      return (
        <div className="flex items-center justify-between py-1">
          <label className="text-xs font-semibold text-[#424245]">{field.label}</label>
          <button onClick={() => onChange(!v)}
            className={cn('relative w-11 h-6 rounded-full transition-colors', v ? 'bg-blue-500' : 'bg-slate-200')}>
            <span className={cn('absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform', v ? 'left-5.5' : 'left-0.5')} />
          </button>
        </div>
      )
    case 'select':
      return (
        <div>
          <label className="apple-label mb-2">{field.label}</label>
          <select value={String(v)} onChange={e => onChange(e.target.value)}
            className="apple-select font-medium text-[14px]">
            {field.options?.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>
      )
    case 'slider':
      return (
        <div className="bg-[#fbfbfd] p-3 rounded-[12px] border border-black/5">
          <label className="flex items-center justify-between apple-label mb-3">
            <span>{field.label}</span>
            <span className="text-[#0066cc] font-mono text-[13px] bg-[#0066cc]/5 px-2 py-0.5 rounded-md font-medium">{String(v)}{field.unit || ''}</span>
          </label>
          <input type="range" value={Number(v)} onChange={e => onChange(Number(e.target.value))}
            min={field.min || 0} max={field.max || 100} step={field.step || 1} className="w-full accent-[#0066cc] h-1.5 bg-black/10 rounded-full appearance-none outline-none cursor-pointer" />
          <div className="flex justify-between text-[11px] font-medium text-[#86868b] mt-2">
            <span>{field.min || 0}</span><span>{field.max || 100}</span>
          </div>
        </div>
      )
    case 'link':
      return (
        <div>
          <label className="apple-label mb-2">{field.label}</label>
          <div className="flex items-center gap-2.5 bg-black/[0.03] border border-transparent focus-within:border-[#0066cc] focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(0,102,204,0.15)] rounded-[10px] px-3 transition-all">
            <Globe size={16} className="text-[#86868b] shrink-0" />
            <input type="url" value={String(v)} onChange={e => onChange(e.target.value)} placeholder="https://..."
              className="flex-1 py-2.5 text-[14px] bg-transparent outline-none text-[#1d1d1f]" />
          </div>
        </div>
      )
    case 'icon':
      return (
        <div>
          <label className="block text-xs font-semibold text-[#424245] mb-1.5">{field.label}</label>
          <input type="text" value={String(v)} onChange={e => onChange(e.target.value)} placeholder="Tên Lucide icon (vd: Star, Users...)"
            className="w-full px-3 py-2.5 text-sm border rounded-lg focus:ring-0 focus:border-blue-500 outline-none bg-black/[0.02] focus:bg-white" />
          <p className="text-[10px] text-[#86868b] mt-1">Xem tại lucide.dev/icons</p>
        </div>
      )
    case 'gradient':
      return (
        <div>
          <label className="apple-label mb-2">{field.label}</label>
          <div className="flex gap-3 items-end">
            <div className="text-center">
              <span className="text-[11px] font-semibold text-[#86868b] block mb-1.5 uppercase">Từ màu</span>
              <input type="color" value={String((v as { from?: string })?.from || '#000')} onChange={e => onChange({ ...(v as object), from: e.target.value })} className="w-11 h-11 rounded-[10px] border-2 border-transparent p-0.5 cursor-pointer shadow-[0_2px_4px_rgba(0,0,0,0.05)] bg-white" />
            </div>
            <div className="text-center">
              <span className="text-[11px] font-semibold text-[#86868b] block mb-1.5 uppercase">Đến màu</span>              <input type="color" value={String((v as { to?: string })?.to || '#fff')} onChange={e => onChange({ ...(v as object), to: e.target.value })} className="w-11 h-11 rounded-[10px] border-2 border-transparent p-0.5 cursor-pointer shadow-[0_2px_4px_rgba(0,0,0,0.05)] bg-white" />
            </div>
            <div className="flex-1 h-11 rounded-[12px] border border-black/5 shadow-sm ml-2" style={{ background: `linear-gradient(to right, ${(v as { from?: string })?.from || '#000'}, ${(v as { to?: string })?.to || '#fff'})` }} />
          </div>
        </div>
      )
    case 'repeater':
      return <RepeaterEditor field={field} value={v} onChange={onChange} />
    default:
      return (
        <div>
          <label className="block text-xs font-semibold text-[#424245] mb-1.5">{field.label}</label>
          <input type="text" value={String(v)} onChange={e => onChange(e.target.value)}
            className="w-full px-3 py-2.5 text-sm border rounded-lg focus:ring-0 focus:border-blue-500 outline-none bg-black/[0.02] focus:bg-white" />
        </div>
      )
  }
}

// =====================================================
// REPEATER EDITOR
// =====================================================

function RepeaterEditor({ field, value, onChange }: { field: FieldSchema; value: unknown; onChange: (val: unknown) => void }) {
  const items = Array.isArray(value) ? value : (Array.isArray(field.defaultValue) ? field.defaultValue as Record<string, unknown>[] : [])
  const subFields = field.fields || []
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null)

  const addItem = () => {
    const newItem: Record<string, unknown> = {}
    for (const sf of subFields) newItem[sf.key] = sf.defaultValue ?? ''
    onChange([...items, newItem])
  }
  const removeItem = (idx: number) => onChange(items.filter((_, i) => i !== idx))
  const updateItem = (idx: number, key: string, val: unknown) => {
    const updated = [...items]; updated[idx] = { ...updated[idx], [key]: val }; onChange(updated)
  }
  const moveItem = (idx: number, dir: 'up' | 'down') => {
    const arr = [...items]; const t = dir === 'up' ? idx - 1 : idx + 1
    if (t < 0 || t >= arr.length) return
    ;[arr[idx], arr[t]] = [arr[t], arr[idx]]; onChange(arr)
  }

  return (
    <div>
      <label className="apple-label mb-3 mt-1 inline-flex items-center gap-2">
        {field.label} <span className="text-[11px] font-normal text-[#86868b] bg-[#f5f5f7] px-1.5 py-0.5 rounded-full">{items.length} mục</span>
      </label>
      <div className="space-y-2">
        {items.map((item, idx) => {
          const record = item as Record<string, unknown>
          const isExpanded = expandedIdx === idx
          const preview = record[subFields[0]?.key] || `Mục ${idx + 1}`
          return (
            <div key={idx} className={cn(
              "border border-black/5 rounded-[12px] overflow-hidden bg-white shadow-sm transition-all duration-300 group",
              isExpanded ? "ring-1 ring-black/5" : ""
            )}>
              <div className={cn(
                "flex items-center gap-3 px-3 py-3 cursor-pointer transition-colors",
                isExpanded ? "bg-[#f5f5f7]/50" : "hover:bg-[#fbfbfd]"
              )} onClick={() => setExpandedIdx(isExpanded ? null : idx)}>
                <GripVertical size={14} className="text-[#86868b]/50" />
                <span className="flex-1 text-[13px] font-medium text-[#1d1d1f] truncate">{String(preview)}</span>
                
                <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity gap-1" onClick={e => e.stopPropagation()}>
                  <button onClick={() => moveItem(idx, 'up')} disabled={idx === 0} className="w-6 h-6 flex items-center justify-center hover:bg-white rounded-[6px] hover:shadow-sm disabled:opacity-30 disabled:hover:shadow-none transition-all"><ArrowUp size={12} className="text-[#424245]" /></button>
                  <button onClick={() => moveItem(idx, 'down')} disabled={idx === items.length - 1} className="w-6 h-6 flex items-center justify-center hover:bg-white rounded-[6px] hover:shadow-sm disabled:opacity-30 disabled:hover:shadow-none transition-all"><ArrowDown size={12} className="text-[#424245]" /></button>
                  <div className="w-[1px] h-3 bg-black/10 mx-1"></div>
                  <button onClick={() => removeItem(idx)} className="w-6 h-6 flex items-center justify-center hover:bg-[#fff0f0] rounded-[6px] text-[#ff3b30] transition-all"><Trash2 size={12} /></button>
                </div>
                
                <div className="w-6 h-6 flex items-center justify-center ml-2">
                  <ChevronDown size={14} className={cn('transition-transform duration-300 text-[#86868b]', isExpanded && 'rotate-180')} />
                </div>
              </div>
              
              {isExpanded && (
                <div className="p-4 space-y-5 bg-[#fbfbfd] border-t border-black/5">
                  {subFields.map(sf => (
                    <FieldEditor key={sf.key} field={sf} value={record[sf.key]} onChange={val => updateItem(idx, sf.key, val)} />
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
      <button onClick={addItem}
        className="mt-3 w-full flex items-center justify-center gap-1.5 px-3 py-3 border border-dashed border-black/15 rounded-[12px] text-[13px] font-medium text-[#424245] hover:text-[#0066cc] hover:border-[#0066cc]/30 hover:bg-[#0066cc]/5 transition-all">
        <Plus size={14} /> Thêm mới
      </button>
    </div>
  )
}
