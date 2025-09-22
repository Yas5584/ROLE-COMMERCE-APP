
import { Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, FormControlLabel, Checkbox } from '@mui/material'
import { useState } from 'react'
import { useDB } from '../../store/useDB'
import { useAuth } from '../../auth/store'

export default function Addresses({ mode }:{ mode:'ADMIN'|'VENDOR'|'CUSTOMER' }){
  const { addresses, addAddress, updateAddress, deleteAddress } = useDB()
  const { user } = useAuth()
  const ownerType = mode
  const ownerId = mode==='VENDOR'? (user?.vendorId ?? '') : (user?.id ?? 'admin-org')

  const list = addresses.filter(a=> a.ownerType===ownerType && a.ownerId===ownerId)

  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name:'', line1:'', city:'', pin:'', isDefault:false })

  const save = ()=>{
    addAddress({ ownerType, ownerId, ...form })
    setOpen(false)
    setForm({ name:'', line1:'', city:'', pin:'', isDefault:false })
  }

  return (
    <Paper sx={{ p:2 }}>
      <Typography variant="h6" gutterBottom>Addresses</Typography>
      <Button variant="contained" onClick={()=>setOpen(true)} sx={{ mb:1 }}>Add Address</Button>
      <Table size="small">
        <TableHead>
          <TableRow><TableCell>Name</TableCell><TableCell>Address</TableCell><TableCell>City</TableCell><TableCell>PIN</TableCell><TableCell>Default</TableCell><TableCell/></TableRow>
        </TableHead>
        <TableBody>
          {list.map(a=>(
            <TableRow key={a.id}>
              <TableCell>{a.name}</TableCell>
              <TableCell>{a.line1}</TableCell>
              <TableCell>{a.city}</TableCell>
              <TableCell>{a.pin}</TableCell>
              <TableCell>{a.isDefault?'Yes':'No'}</TableCell>
              <TableCell><Button size="small" color="error" onClick={()=>deleteAddress(a.id)}>Delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={()=>setOpen(false)}>
        <DialogTitle>Add Address</DialogTitle>
        <DialogContent sx={{ display:'grid', gap:2, mt:1 }}>
          <TextField label="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
          <TextField label="Line 1" value={form.line1} onChange={e=>setForm({...form, line1:e.target.value})}/>
          <TextField label="City" value={form.city} onChange={e=>setForm({...form, city:e.target.value})}/>
          <TextField label="PIN" value={form.pin} onChange={e=>setForm({...form, pin:e.target.value})}/>
          <FormControlLabel control={<Checkbox checked={form.isDefault} onChange={e=>setForm({...form, isDefault:e.target.checked})}/>} label="Make default"/>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={save}>Save</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  )
}
