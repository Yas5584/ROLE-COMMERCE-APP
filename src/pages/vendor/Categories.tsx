
import { Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Switch, FormControlLabel } from '@mui/material'
import { useState } from 'react'
import { useDB } from '../../store/useDB'
import { useAuth } from '../../auth/store'

export default function VendorCategories(){
  const { categories, addCategory, deleteCategory } = useDB()
  const { user } = useAuth()
  const myCats = categories.filter(c=> c.owner==='VENDOR' && c.vendorId===user?.vendorId)

  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name:'', icon:'category', isActive:true })

  const save = ()=>{
    addCategory({ ...form, owner:'VENDOR', vendorId: user?.vendorId })
    setOpen(false)
    setForm({ name:'', icon:'category', isActive:true })
  }

  return (
    <Paper sx={{ p:2 }}>
      <Typography variant="h6" gutterBottom>My Categories</Typography>
      <Button variant="contained" onClick={()=>setOpen(true)} sx={{ mb:1 }}>Add Category</Button>
      <Table size="small">
        <TableHead><TableRow><TableCell>Name</TableCell><TableCell>Icon</TableCell><TableCell>Active</TableCell><TableCell/></TableRow></TableHead>
        <TableBody>
          {myCats.map(c=>(
            <TableRow key={c.id}>
              <TableCell>{c.name}</TableCell>
              <TableCell>{c.icon}</TableCell>
              <TableCell>{c.isActive?'Yes':'No'}</TableCell>
              <TableCell><Button size="small" color="error" onClick={()=>deleteCategory(c.id)}>Delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={()=>setOpen(false)}>
        <DialogTitle>Add Category</DialogTitle>
        <DialogContent sx={{ display:'grid', gap:2, mt:1 }}>
          <TextField label="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
          <TextField label="Icon" value={form.icon} onChange={e=>setForm({...form, icon:e.target.value})}/>
          <FormControlLabel control={<Switch checked={form.isActive} onChange={e=>setForm({...form, isActive:e.target.checked})}/>} label="Active"/>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={save}>Save</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  )
}
