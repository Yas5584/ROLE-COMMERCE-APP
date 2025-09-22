
import { Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, MenuItem } from '@mui/material'
import { useState } from 'react'
import { useDB } from '../../store/useDB'
import { useAuth } from '../../auth/store'

export default function VendorProducts(){
  const { products, categories, addProduct, updateProduct, deleteProduct } = useDB()
  const { user } = useAuth()
  const myProducts = products.filter(p=> p.vendorId === user?.vendorId)

  const myCategories = categories.filter(c=> c.owner==='VENDOR' && c.vendorId===user?.vendorId)

  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name:'', description:'', price:0, image:'', qtyOnHand:0, categoryId: myCategories[0]?.id ?? '' })

  const save = ()=>{
    if(!form.name || !form.categoryId) return alert('Name & Category required')
    addProduct({ vendorId: user?.vendorId ?? '', isActive:true, ...form })
    setOpen(false)
    setForm({ name:'', description:'', price:0, image:'', qtyOnHand:0, categoryId: myCategories[0]?.id ?? '' })
  }

  return (
    <Paper sx={{ p:2 }}>-
      <Typography variant="h6" gutterBottom>Products</Typography>
      <Button variant="contained" onClick={()=>setOpen(true)} sx={{ mb:1 }}>Add Product</Button>
      <Table size="small">
        <TableHead><TableRow><TableCell>Name</TableCell><TableCell>Category</TableCell><TableCell>Price</TableCell><TableCell>Qty</TableCell><TableCell/></TableRow></TableHead>
        <TableBody>
          {myProducts.map(p=>(
            <TableRow key={p.id}>
              <TableCell>{p.name}</TableCell>
              <TableCell>{myCategories.find(c=>c.id===p.categoryId)?.name ?? p.categoryId}</TableCell>
              <TableCell>₹{p.price}</TableCell>
              <TableCell>{p.qtyOnHand}</TableCell>
              <TableCell>
                <Button size="small" onClick={()=>updateProduct(p.id, { qtyOnHand: p.qtyOnHand + 1 })}>+1</Button>
                <Button size="small" onClick={()=>updateProduct(p.id, { qtyOnHand: Math.max(0, p.qtyOnHand - 1) })}>-1</Button>
                <Button size="small" color="error" onClick={()=>deleteProduct(p.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={()=>setOpen(false)}>
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent sx={{ display:'grid', gap:2, mt:1 }}>
          <TextField label="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
          <TextField label="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})}/>
          <TextField label="Price" type="number" value={form.price} onChange={e=>setForm({...form, price:Number(e.target.value)})}/>
          <TextField label="Quantity" type="number" value={form.qtyOnHand} onChange={e=>setForm({...form, qtyOnHand:Number(e.target.value)})}/>
          <TextField select label="Category" value={form.categoryId} onChange={e=>setForm({...form, categoryId:e.target.value})}>
            {myCategories.map(c=>(<MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={save}>Save</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  )
}
