'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type LayoutTheme = 'fine' | 'bold';

interface ThemeContextType {
  theme: LayoutTheme;
  toggleTheme: () => void;
  setTheme: (theme: LayoutTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<LayoutTheme>('fine');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('mcm-layout-theme') as LayoutTheme;
      if (stored === 'fine' || stored === 'bold') {
        setThemeState(stored);
        document.documentElement.setAttribute('data-theme', stored);
      } else {
        document.documentElement.setAttribute('data-theme', 'fine');
      }
    } catch {
      document.documentElement.setAttribute('data-theme', 'fine');
    }
    setMounted(true);
  }, []);

  const setTheme = (newTheme: LayoutTheme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('mcm-layout-theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
    } catch {}
  };

  const toggleTheme = () => {
    const next = theme === 'fine' ? 'bold' : 'fine';
    setTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

