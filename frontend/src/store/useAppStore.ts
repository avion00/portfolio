import { create } from 'zustand'

export type Theme = 'dark' | 'light'

interface AppState {
  theme: Theme
  menuOpen: boolean
  activeProject: number
  cursorVariant: 'default' | 'hover' | 'view' | 'hidden'

  toggleTheme: () => void
  setTheme: (t: Theme) => void
  setMenuOpen: (open: boolean) => void
  toggleMenu: () => void
  setActiveProject: (index: number) => void
  setCursorVariant: (v: AppState['cursorVariant']) => void
}

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'dark'
  const stored = window.localStorage.getItem('apex-theme') as Theme | null
  return stored ?? 'dark'
}

const applyTheme = (theme: Theme) => {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  root.classList.toggle('light', theme === 'light')
  root.classList.toggle('dark', theme === 'dark')
  window.localStorage.setItem('apex-theme', theme)
}

export const useAppStore = create<AppState>((set, get) => ({
  theme: getInitialTheme(),
  menuOpen: false,
  activeProject: 0,
  cursorVariant: 'default',

  toggleTheme: () => {
    const next: Theme = get().theme === 'dark' ? 'light' : 'dark'
    applyTheme(next)
    set({ theme: next })
  },
  setTheme: (t) => {
    applyTheme(t)
    set({ theme: t })
  },
  setMenuOpen: (open) => set({ menuOpen: open }),
  toggleMenu: () => set((s) => ({ menuOpen: !s.menuOpen })),
  setActiveProject: (index) => set({ activeProject: index }),
  setCursorVariant: (v) => set({ cursorVariant: v }),
}))

/** Call once on app mount to sync the stored theme to the DOM. */
export const initTheme = () => applyTheme(getInitialTheme())
