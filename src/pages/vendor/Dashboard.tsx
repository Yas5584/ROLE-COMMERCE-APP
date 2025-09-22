
import { Grid, Paper, Typography } from '@mui/material'
import { useDB } from '../../store/useDB'
import { useAuth } from '../../auth/store'

export default function VendorDashboard(){
  const { products, orders } = useDB()
  const { user } = useAuth()
  const myProducts = products.filter(p=> p.vendorId === user?.vendorId)
  const myOrders = orders.filter(o=> o.vendorId === user?.vendorId)

  const card = (title:string, value:number)=> (
    <Paper sx={{ p:2 }}>
      <Typography variant="subtitle2">{title}</Typography>
      <Typography variant="h4">{value}</Typography>
    </Paper>
  )
  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={3}>{card('My Products', myProducts.length)}</Grid>
      <Grid item xs={6} md={3}>{card('My Orders', myOrders.length)}</Grid>
    </Grid>
  )
}
