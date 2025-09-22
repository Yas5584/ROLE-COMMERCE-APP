
import { Grid, Paper, Typography, Card, CardContent, CardActions, Button } from '@mui/material'
import { useDB } from '../../store/useDB'
import { Link as RouterLink } from 'react-router-dom'

export default function Home(){
  const { categories, products } = useDB()
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}><Typography variant="h6">Categories</Typography></Grid>
      {categories.filter(c=>c.isActive).map(c=>(
        <Grid item xs={6} md={3} key={c.id}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1">{c.name}</Typography>
            </CardContent>
            <CardActions>
              <Button component={RouterLink} to={`/category/${c.id}`}>View</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
