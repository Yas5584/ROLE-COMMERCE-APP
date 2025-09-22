
import { Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, Chip } from '@mui/material'
import { useDB } from '../../store/useDB'
import { useAuth } from '../../auth/store'

export default function Payments({ mode }:{ mode:'ADMIN'|'VENDOR'|'CUSTOMER' }){
  const { payments, orders } = useDB()
  const { user } = useAuth()

  const filtered = payments.filter(p=>{
    const order = orders.find(o=>o.id===p.orderId)
    if(!order) return false
    if(mode==='ADMIN') return true
    if(mode==='VENDOR') return order.vendorId === user?.vendorId
    return order.userId === (user?.id ?? '')
  })

  return (
    <Paper sx={{ p:2 }}>
      <Typography variant="h6" gutterBottom>Payments</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Payment ID</TableCell>
            <TableCell>Order</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Method</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map(p=>(
            <TableRow key={p.id}>
              <TableCell>{p.id}</TableCell>
              <TableCell>{p.orderId}</TableCell>
              <TableCell>₹{p.amount}</TableCell>
              <TableCell>{p.method}</TableCell>
              <TableCell><Chip label={p.status} color={p.status==='PAID'?'success':p.status==='FAILED'?'error':'default'}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}
