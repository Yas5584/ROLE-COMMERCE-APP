
import { Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Chip, MenuItem, Select, FormControl, InputLabel } from '@mui/material'
import { useState } from 'react'
import { useDB } from '../../store/useDB'

export default function AdminVendors(){
  const { vendors, categories, addVendor, updateVendor, deleteVendor } = useDB()
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name:'', phone:'', address:'', categoryIds:[] as string[] })

  const save = ()=>{
    addVendor({ ...form })
    setOpen(false)
    setForm({ name:'', phone:'', address:'', categoryIds:[] })
  }

  return (
    <Paper sx={{ p:2 }}>
      <Typography variant="h6" gutterBottom>Vendors</Typography>
      <Button variant="contained" onClick={()=>setOpen(true)} sx={{ mb:1 }}>Add Vendor</Button>
      <Table size="small">
        <TableHead><TableRow><TableCell>Name</TableCell><TableCell>Phone</TableCell><TableCell>Categories</TableCell><TableCell>Status</TableCell><TableCell/></TableRow></TableHead>
        <TableBody>
          {vendors.map(v=>(
            <TableRow key={v.id}>
              <TableCell>{v.name}</TableCell>
              <TableCell>{v.phone}</TableCell>
              <TableCell>{v.categoryIds.map(id=> categories.find(c=>c.id===id)?.name ?? id).join(', ')}</TableCell>
              <TableCell><Chip label={v.status} color={v.status==='APPROVED'?'success':v.status==='DISABLED'?'error':'default'}/></TableCell>
              <TableCell>
                <Button size="small" onClick={()=>updateVendor(v.id,{ status:'APPROVED' })}>Approve</Button>
                <Button size="small" onClick={()=>updateVendor(v.id,{ status:'DISABLED' })}>Disable</Button>
                <Button size="small" color="error" onClick={()=>deleteVendor(v.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={()=>setOpen(false)}>
        <DialogTitle>Add Vendor</DialogTitle>
        <DialogContent sx={{ display:'grid', gap:2, mt:1 }}>
          <TextField label="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
          <TextField label="Phone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})}/>
          <TextField label="Address" value={form.address} onChange={e=>setForm({...form, address:e.target.value})}/>
          <FormControl>
            <InputLabel>Categories</InputLabel>
            <Select multiple value={form.categoryIds} label="Categories" onChange={e=>setForm({...form, categoryIds: e.target.value as string[]})}>
              {categories.filter(c=>c.isActive).map(c=>(<MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={save}>Save</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  )
}
