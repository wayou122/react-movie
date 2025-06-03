import { useState, useEffect, createContext } from "react";

export const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  function toggleColorMode() {
    setIsDarkMode(prev => !prev)
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleColorMode }}>
      {children}
    </ThemeContext.Provider>
  )
}