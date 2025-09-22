
import { Grid, Card, CardContent, CardActions, Typography, Button } from '@mui/material'
import { useDB } from '../../store/useDB'
import { Link as RouterLink } from 'react-router-dom'

export default function Categories(){
  const { categories } = useDB()
  return (
    <Grid container spacing={2}>
      {categories.filter(c=>c.isActive).map(c=>(
        <Grid item xs={6} md={3} key={c.id}>
          <Card>
            <CardContent><Typography variant="h6">{c.name}</Typography></CardContent>
            <CardActions>
              <Button component={RouterLink} to={`/category/${c.id}`}>Browse</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
