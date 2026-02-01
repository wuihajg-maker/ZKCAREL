'use client'

import * as React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light'
type Mode = 'private' | 'transparent'

interface ThemeProviderContextValue {
  theme: Theme
  mode: Mode
  setTheme: (theme: Theme) => void
  setMode: (mode: Mode) => void
  toggleMode: () => void
}

const ThemeProviderContext = createContext<ThemeProviderContextValue | undefined>(undefined)

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  defaultMode?: Mode
}

export function ThemeProvider({
  children,
  defaultTheme = 'dark',
  defaultMode = 'private',
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [mode, setMode] = useState<Mode>(defaultMode)

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
  }, [theme])

  useEffect(() => {
    if (mode === 'transparent') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }, [mode])

  const toggleMode = () => {
    setMode(mode === 'private' ? 'transparent' : 'private')
  }

  return (
    <ThemeProviderContext.Provider
      value={{
        theme,
        mode,
        setTheme,
        setMode,
        toggleMode,
      }}
    >
      {children}
    </ThemeProviderContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeProviderContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
