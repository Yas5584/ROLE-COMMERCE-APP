
import { Grid, Card, CardContent, CardActions, Typography, Button } from '@mui/material'
import { useDB } from '../../store/useDB'

export default function Vendors(){
  const { vendors } = useDB()
  return (
    <Grid container spacing={2}>
      {vendors.filter(v=>v.status==='APPROVED').map(v=>(
        <Grid item xs={12} md={6} lg={4} key={v.id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{v.name}</Typography>
              <Typography variant="body2">Categories: {v.categoryIds.join(', ')}</Typography>
              <Typography variant="body2">Phone: {v.phone}</Typography>
            </CardContent>
            <CardActions>
              {/* future vendor details */}
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
