import { Moon, Sun } from 'lucide-react'
import { useEffect, useState, type FC, type ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

const useLocalStorage = (key: string, initialValue: string) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (typeof window === 'undefined') return initialValue
      const item = localStorage.getItem(key)
      return item ? item : initialValue
    } catch (error) {
      console.log(error)
      return initialValue
    }
  })

  const setValue = (value: string | ((val: string) => string)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, valueToStore)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setStoredValue(localStorage.getItem(key) || initialValue)
  }, [])

  return [storedValue, setValue] as const
}

export const ThemeSwitcher: FC<Props> = ({}) => {
  const [theme, setTheme] = useLocalStorage('theme', 'light')

  const handleSetTheme = (theme: string) => {
    setTheme(theme)
    console.log('go')
    if (
      document.documentElement.classList.contains('dark') &&
      theme !== 'dark'
    ) {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }

  return (
    <label className="btn btn-outline swap swap-rotate">
      <input
        type="checkbox"
        className="theme-controller"
        checked={theme === 'dark'}
        onChange={(ev) => {
          handleSetTheme(ev.target.checked ? 'dark' : 'light')
        }}
      />

      <Sun className="swap-off fill-current" />

      <Moon className="swap-on fill-current" />
    </label>
  )
}
