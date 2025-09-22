
import { Grid, Paper, Typography } from '@mui/material'
import { useDB } from '../../store/useDB'

export default function AdminDashboard(){
  const { categories, vendors, products, orders, payments } = useDB()
  const card = (title:string, value:number)=> (
    <Paper sx={{ p:2 }}>
      <Typography variant="subtitle2">{title}</Typography>
      <Typography variant="h4">{value}</Typography>
    </Paper>
  )
  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={3}>{card('Categories', categories.length)}</Grid>
      <Grid item xs={6} md={3}>{card('Vendors', vendors.length)}</Grid>
      <Grid item xs={6} md={3}>{card('Products', products.length)}</Grid>
      <Grid item xs={6} md={3}>{card('Orders', orders.length)}</Grid>
      <Grid item xs={6} md={3}>{card('Payments', payments.length)}</Grid>
    </Grid>
  )
}
