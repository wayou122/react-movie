import { useState, useEffect, createContext } from "react";

export const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('isDarkMode')
    return savedTheme === 'true' //localsotrage存的是string
  })

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', isDarkMode ? 'dark' : 'light')
    localStorage.setItem('isDarkMode', isDarkMode)
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