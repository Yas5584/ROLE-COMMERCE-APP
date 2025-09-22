// src/theme/roleTheme.ts
import React from 'react'
import { createTheme } from '@mui/material/styles'
import { deepPurple, orange, indigo, amber, teal, pink } from '@mui/material/colors'
import { useAuth } from '../auth/store'

export function RoleThemeProvider({ children }:{children: React.ReactNode}){
  return React.createElement(React.Fragment, null, children)
}

export function useRoleTheme(){
  const { user } = useAuth()
  const role = user?.role ?? 'CUSTOMER'

  if(role==='ADMIN'){
    return createTheme({
      palette: { mode: 'light', primary: { main: deepPurple[600] }, secondary: { main: orange[500] } },
      shape: { borderRadius: 12 }
    })
  }
  if(role==='VENDOR'){
    return createTheme({
      palette: { mode: 'light', primary: { main: indigo[600] }, secondary: { main: amber[600] } },
      shape: { borderRadius: 12 }
    })
  }
  return createTheme({
    palette: { mode: 'light', primary: { main: teal[600] }, secondary: { main: pink[400] } },
    shape: { borderRadius: 12 }
  })
}

