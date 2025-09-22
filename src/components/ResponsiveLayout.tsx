
import { ReactNode, useMemo } from 'react'
import { AppBar, Toolbar, Typography, IconButton, Drawer, Box, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, Divider, Avatar, Tooltip, Badge, Button } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import Logout from '@mui/icons-material/Logout'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../auth/store'
import { buildMenu } from '../nav/menu'

export default function ResponsiveLayout({ title, children }:{ title: string, children: ReactNode }){
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width:1000px)')
  const { user, logout } = useAuth()
  const nav = useNavigate()
  const loc = useLocation()
  const menu = useMemo(()=> buildMenu(user?.role ?? 'CUSTOMER'), [user])

  const DrawerContent = (
    <Box sx={{ width: 280, display:'flex', flexDirection:'column', height:'100%' }}>
      <Box sx={{ p:2, display:'flex', gap:2, alignItems:'center' }}>
        <Avatar>{user?.role?.[0] ?? 'U'}</Avatar>
        <Box>
          <Typography variant="subtitle1">{user?.name ?? 'User'}</Typography>
          <Typography variant="caption">{user?.role}</Typography>
        </Box>
      </Box>
      <Divider/>
      <List sx={{ flex:1 }}>
        {menu.map(m => (
          <ListItemButton key={m.to} selected={loc.pathname===m.to} onClick={()=>{ nav(m.to); setOpen(false) }}>
            <ListItemIcon>{m.icon}</ListItemIcon>
            <ListItemText primary={m.label}/>
          </ListItemButton>
        ))}
      </List>
      <Divider/>
      <Button startIcon={<Logout/>} sx={{ m:2 }} onClick={()=>{ logout(); nav('/login', { replace:true })}}>Logout</Button>
    </Box>
  )

  return (
    <Box sx={{ display:'grid', gridTemplateColumns: isDesktop ? '280px 1fr' : '1fr', height:'100vh' }}>
      {isDesktop ? (
        <Drawer variant="permanent" open PaperProps={{ sx:{ position:'relative' }}}>
          {DrawerContent}
        </Drawer>
      ) : (
        <Drawer open={open} onClose={()=>setOpen(false)}>
          {DrawerContent}
        </Drawer>
      )}

      <Box sx={{ display:'grid', gridTemplateRows:'64px 1fr', height:'100vh' }}>
        <AppBar position="static" color="primary" enableColorOnDark>
          <Toolbar>
            {!isDesktop && (
              <IconButton color="inherit" onClick={()=>setOpen(true)} edge="start" sx={{ mr:1 }}>
                <MenuIcon/>
              </IconButton>
            )}
            <Typography variant="h6" sx={{ flex:1 }}>{title}</Typography>
          </Toolbar>
        </AppBar>
        <Box component="main" sx={{ p:2, overflow:'auto', bgcolor:(t)=>t.palette.background.default }}>
          {children}
        </Box>
      </Box>
    </Box>
  )
}
