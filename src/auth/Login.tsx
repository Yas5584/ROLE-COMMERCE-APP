
import { useState } from 'react'
import { Box, Paper, Typography, TextField, Button, MenuItem } from '@mui/material'
import { useAuth, Role } from './store'
import { useNavigate, useLocation } from 'react-router-dom'

const ROLES: Role[] = ['ADMIN','VENDOR','CUSTOMER']

export default function Login(){
  const [role, setRole] = useState<Role>('CUSTOMER')
  const [phone, setPhone] = useState('9999999999')
  const [otp, setOtp] = useState('')
  const { signIn } = useAuth()
  const nav = useNavigate()
  const loc = useLocation()

  const onSubmit = (e:any)=>{
    e.preventDefault()
    if(otp !== '1111'){ alert('Use OTP 1111 for dev'); return }
    // vendorId for demo vendor
    const vendorId = role==='VENDOR' ? 'vendor-001' : undefined
    signIn({ phone, role, vendorId, name: role==='ADMIN'?'Admin User':(role==='VENDOR'?'Demo Vendor':'Customer') })
    nav((role==='ADMIN'?'/admin':'/'), { replace: true, state: { from: loc } })
  }

  return (
    <Box minHeight="100vh" display="grid" sx={{ placeItems:'center' }}>
      <Paper sx={{ p:4, width: 380 }} elevation={4}>
        <Typography variant="h5" gutterBottom>Sign in</Typography>
        <Box component="form" onSubmit={onSubmit} sx={{ display:'grid', gap:2 }}>
          <TextField select label="Select Role" value={role} onChange={e=>setRole(e.target.value as Role)}>
            {ROLES.map(r=><MenuItem key={r} value={r}>{r}</MenuItem>)}
          </TextField>
          <TextField label="Phone Number" value={phone} onChange={e=>setPhone(e.target.value)} inputProps={{ inputMode:'numeric', pattern:'[0-9]*' }} />
          <TextField label="OTP (use 1111)" value={otp} onChange={e=>setOtp(e.target.value)} inputProps={{ inputMode:'numeric', pattern:'[0-9]*' }} />
          <Button type="submit" variant="contained" size="large">Continue</Button>
        </Box>
      </Paper>
    </Box>
  )
}
