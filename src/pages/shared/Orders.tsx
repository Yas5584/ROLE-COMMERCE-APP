
import { Box, Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, Chip, Button } from '@mui/material'
import { useDB } from '../../store/useDB'
import { useAuth } from '../../auth/store'

export default function Orders({ mode }:{ mode:'ADMIN'|'VENDOR'|'CUSTOMER' }){
  const { orders, products, updateOrder } = useDB()
  const { user } = useAuth()

  const filtered = orders.filter(o=>{
    if(mode==='ADMIN') return true
    if(mode==='VENDOR') return o.vendorId === user?.vendorId
    return o.userId === (user?.id ?? '')
  })

  return (
    <Paper sx={{ p:2 }}>
      <Typography variant="h6" gutterBottom>Orders</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Vendor</TableCell>
            <TableCell>Items</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
            {mode!=='CUSTOMER' && <TableCell>Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map(o=>(
            <TableRow key={o.id}>
              <TableCell>{o.id}</TableCell>
              <TableCell>{o.vendorId}</TableCell>
              <TableCell>{o.items.map(i=>`${i.name} x${i.qty}`).join(', ')}</TableCell>
              <TableCell>₹{o.amount}</TableCell>
              <TableCell><Chip label={o.status} color={o.status==='DELIVERED'?'success':o.status==='CANCELLED'?'error':'default'}/></TableCell>
              {mode!=='CUSTOMER' && (
                <TableCell>
                  <Button size="small" onClick={()=> updateOrder(o.id, { status:'CONFIRMED' })}>Confirm</Button>
                  <Button size="small" onClick={()=> updateOrder(o.id, { status:'DISPATCHED' })}>Dispatch</Button>
                  <Button size="small" onClick={()=> updateOrder(o.id, { status:'DELIVERED' })}>Deliver</Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}
