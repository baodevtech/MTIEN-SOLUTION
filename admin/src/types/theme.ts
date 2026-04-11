// ============================================================
// MTIEN SOLUTION - Theme Builder Type System
// WordPress-like visual page editor configuration
// ============================================================

// --- Primitive field types ---
export type FieldType =
  | 'text'
  | 'textarea'
  | 'richtext'
  | 'number'
  | 'color'
  | 'gradient'
  | 'image'
  | 'video'
  | 'icon'
  | 'select'
  | 'toggle'
  | 'slider'
  | 'spacing'
  | 'link'
  | 'repeater'
  | 'group'

export interface FieldOption {
  label: string
  value: string
}

export interface FieldSchema {
  key: string
  label: string
  type: FieldType
  defaultValue?: unknown
  placeholder?: string
  description?: string
  options?: FieldOption[]
  min?: number
  max?: number
  step?: number
  unit?: string
  fields?: FieldSchema[] // for repeater/group
  required?: boolean
  showIf?: { field: string; value: unknown }
}

// --- Section definition ---
export interface SectionSchema {
  id: string
  name: string
  description?: string
  icon?: string
  fields: FieldSchema[]
  defaultVisible?: boolean
}

// --- Page definition ---
export interface PageSchema {
  id: string
  name: string
  path: string
  icon?: string
  sections: SectionSchema[]
}

// --- Global theme settings ---
export interface GlobalThemeSchema {
  colors: SectionSchema
  typography: SectionSchema
  navbar: SectionSchema
  footer: SectionSchema
  seo: SectionSchema
}

// --- Runtime value types ---
export interface ThemeValues {
  [pageId: string]: {
    [sectionId: string]: {
      visible: boolean
      order: number
      values: Record<string, unknown>
    }
  }
}

export interface GlobalThemeValues {
  [key: string]: Record<string, unknown>
}

export interface ThemeConfig {
  id: string
  name: string
  version: number
  global: GlobalThemeValues
  pages: ThemeValues
  updatedAt: string
  publishedAt: string | null
}

// --- Editor UI state ---
export interface EditorState {
  activePage: string
  activeSection: string | null
  activeField: string | null
  unsavedChanges: boolean
  previewMode: 'desktop' | 'tablet' | 'mobile'
  sidebarOpen: boolean
  isDragging: boolean
}

// --- History for undo/redo ---
export interface HistoryEntry {
  timestamp: number
  label: string
  config: ThemeConfig
}
