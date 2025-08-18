import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { darkTheme, lightTheme } from './theme'
import Login from './components/login/Login'
import Home from './components/home/Home'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    transition: background 0.3s ease, color 0.3s ease;
  }
`


function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login onLoginSuccess={() => window.location.href = '/dashboard'} />} />
          <Route
            path="/dashboard"
            element={<Home onToggleTheme={toggleTheme} theme={theme} />}
          />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
