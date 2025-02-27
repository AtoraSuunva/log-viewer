import { useEffect, useState } from 'react'

interface Theme {
  name: string
  class: string
  previewOverride?: string
}

const themes: Theme[] = [
  {
    name: 'Sync With System',
    class: 'theme-sync',
    previewOverride:
      'linear-gradient(-45deg, var(--theme-dark-preview) 0% 50%, var(--theme-light-preview) 50% 100%)',
  },
  { name: 'Dark', class: 'theme-dark' },
  { name: 'Light', class: 'theme-light' },
  { name: 'Under The Sea', class: 'theme-under-the-sea' },
]

export function ThemeSwitcher() {
  const [showThemes, setShowThemes] = useState(false)
  const [currentTheme, setCurrentTheme] = useState(
    themes.find((theme) => theme.class === localStorage.getItem('theme')) ??
      themes[0],
  )

  const toggleThemeList = () => {
    setShowThemes((prev) => !prev)
  }

  const setTheme = (theme: Theme) => {
    // Realistically, the "proper" way of doing this would've been using context and functions passed down
    // so that some higher up component sets the theme. But this is a simple log viewer so the simpler solution wins
    document.documentElement.className = theme.class
    setCurrentTheme(theme)
    localStorage.setItem('theme', theme.class)
  }

  useEffect(() => {
    if (currentTheme) {
      setTheme(currentTheme)
    }
  }, [])

  return (
    <div className='theme-switch'>
      {/* <label htmlFor='theme-switch-button'>
        <div
          className='theme-preview-swatch'
          style={{
            background:
              currentTheme?.previewOverride ??
              `var(--${currentTheme?.class}-preview)`,
          }}
        ></div>
      </label> */}
      <button id='theme-switch-button' className='secondary' onClick={toggleThemeList}>
        Switch Theme
      </button>
      <div className={`theme-list ${showThemes ? 'show' : ''}`}>
        {themes.map((theme) => (
          <ThemeItem key={theme.name} theme={theme} onClick={setTheme} />
        ))}
      </div>
    </div>
  )
}

interface ThemeItemProps {
  theme: Theme
  onClick: (theme: Theme) => void
}

function ThemeItem({ theme, onClick }: ThemeItemProps) {
  return (
    <div className='theme-item'>
      <div
        className='theme-preview-swatch'
        style={{
          background: theme.previewOverride ?? `var(--${theme.class}-preview)`,
        }}
      ></div>
      <button
        onClick={() => {
          onClick(theme)
        }}
      >
        {theme.name}
      </button>
    </div>
  )
}
