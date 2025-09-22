
import { Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material'
import { useCart } from './cartStore'
import { useNavigate } from 'react-router-dom'

export default function Cart(){
  const { items, remove, total } = useCart()
  const nav = useNavigate()
  return (
    <Paper sx={{ p:2 }}>
      <Typography variant="h6" gutterBottom>Cart</Typography>
      <Table size="small">
        <TableHead><TableRow><TableCell>Item</TableCell><TableCell>Qty</TableCell><TableCell>Price</TableCell><TableCell>Total</TableCell><TableCell/></TableRow></TableHead>
        <TableBody>
          {items.map(i=>(
            <TableRow key={i.productId}>
              <TableCell>{i.name}</TableCell>
              <TableCell>{i.qty}</TableCell>
              <TableCell>₹{i.price}</TableCell>
              <TableCell>₹{i.price*i.qty}</TableCell>
              <TableCell><Button size="small" color="error" onClick={()=>remove(i.productId)}>Remove</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Typography variant="h6" sx={{ mt:1 }}>Total: ₹{total()}</Typography>
      <Button variant="contained" onClick={()=>nav('/checkout')} disabled={items.length===0}>Proceed to Checkout</Button>
    </Paper>
  )
}
