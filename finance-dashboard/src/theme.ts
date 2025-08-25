import type { DefaultTheme } from 'styled-components';

export const darkTheme: DefaultTheme = {
    mode: 'dark',
    background: '#121212',
    text: '#eee',
    primary: '#7f5af0', // viola neon
    primaryDark: '#5a36c7ff',
    secondary: '#0f62fe', // blu neon
    accent: '#ff79c6', // rosa neon
    cardBg: '#1e1e2f',
    shadow: 'rgba(0,0,0,0.7)',
    toggleColor: '#121212',
    cardBglight: '#29293bff',
}

export const lightTheme: DefaultTheme = {
    mode: 'light',
    background: '#fff',
    text: '#222',
    primary: '#7f5af0',
    primaryDark: '#5a36c7ff',
    secondary: '#0f62fe',
    accent: '#ff79c6',
    cardBg: '#f5f5f5',
    shadow: 'rgba(0,0,0,0.1)',
    toggleColor: '#dedede',
    cardBglight: '#dbd0d0ff',
}
