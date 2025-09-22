
import { useParams } from 'react-router-dom'
import { Paper, Typography, Box, TextField, Button } from '@mui/material'
import { useDB } from '../../store/useDB'
import { useState } from 'react'
import { useCart } from './cartStore'

export default function ProductDetail(){
  const { id } = useParams()
  const { products } = useDB()
  const p = products.find(x=>x.id===id)
  const [qty, setQty] = useState(1)
  const { add } = useCart()

  if(!p) return <Typography>Product not found</Typography>

  return (
    <Paper sx={{ p:2, display:'grid', gap:1 }}>
      <Typography variant="h6">{p.name}</Typography>
      <Typography variant="body2">{p.description}</Typography>
      <Typography variant="h6">₹{p.price}</Typography>
      <Typography variant="caption">In stock: {p.qtyOnHand}</Typography>
      <Box sx={{ display:'flex', gap:1, alignItems:'center' }}>
        <TextField label="Qty" type="number" size="small" sx={{ width:100 }} value={qty} onChange={e=>setQty(Math.max(1, Number(e.target.value)))} />
        <Button variant="contained" onClick={()=>add(p, qty)} disabled={p.qtyOnHand<=0}>Add to Cart</Button>
      </Box>
    </Paper>
  )
}
