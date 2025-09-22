
import { Paper, Typography, Button } from '@mui/material'
import { useCart } from './cartStore'
import { useAuth } from '../../auth/store'
import { useDB } from '../../store/useDB'
import { useNavigate } from 'react-router-dom'

export default function Checkout(){
  const { items, clear, total } = useCart()
  const { user } = useAuth()
  const { placeOrderCOD } = useDB()
  const nav = useNavigate()

  const place = ()=>{
    if(items.length===0) return
    // Assume all items from same vendor in demo (or take vendor of first item)
    const vendorId = items[0].vendorId
    const order = placeOrderCOD({ userId: user?.id ?? 'u', vendorId, items })
    clear()
    alert('Order placed: ' + order.id + ' (COD)')
    nav('/orders')
  }

  return (
    <Paper sx={{ p:2 }}>
      <Typography variant="h6" gutterBottom>Checkout (COD)</Typography>
      <Typography>Items: {items.length}</Typography>
      <Typography>Total: ₹{total()}</Typography>
      <Button variant="contained" onClick={place} disabled={items.length===0}>Place Order</Button>
    </Paper>
  )
}
