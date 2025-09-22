
import { Paper, Typography } from '@mui/material'
import { useAuth } from '../../auth/store'
export default function Account(){
  const { user } = useAuth()
  return (
    <Paper sx={{ p:2 }}>
      <Typography variant="h6">Account</Typography>
      <Typography>Name: {user?.name}</Typography>
      <Typography>Phone: {user?.phone}</Typography>
      <Typography>Role: {user?.role}</Typography>
    </Paper>
  )
}
