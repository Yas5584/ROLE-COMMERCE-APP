
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { useRoleTheme, RoleThemeProvider } from './theme/roleTheme'

function ThemedApp(){
  const theme = useRoleTheme()
  return (
    
     <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
    
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RoleThemeProvider>
      <ThemedApp/>
    </RoleThemeProvider>
  </React.StrictMode>
)
export default ThemedApp;
