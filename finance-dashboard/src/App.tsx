import { useState } from 'react'
import './App.css'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import { darkTheme, lightTheme } from './theme'
import Sidebar from './components/Sidebar'
import Header from './components/Header'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    transition: background 0.3s ease, color 0.3s ease;
  }
`

const Layout = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  height: 100vh;
`

const MainContent = styled.main`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('light')

  const toggleTheme = () => {
    setTheme(theme == "dark" ? 'light' : 'dark')
  }

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Layout>
        <Sidebar onToggleTheme={toggleTheme} currentTheme={theme} />
        <MainContent>
          <Header userName="Simone Smaldore" />
        </MainContent>
      </Layout>
    </ThemeProvider>
  )
}

export default App
