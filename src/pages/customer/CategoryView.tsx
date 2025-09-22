
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom'
import { Grid, Card, CardContent, CardActions, Typography, Button } from '@mui/material'
import { useDB } from '../../store/useDB'
import { useCart } from './cartStore'

export default function CategoryView(){
  const { id } = useParams()
  const { products } = useDB()
  const list = products.filter(p=>p.categoryId===id && p.isActive)
  console.log(list)
  console.log("id is :",id)

  const { add } = useCart()

  return (
    <Grid container spacing={2} >
      {list.map(p=>(
        <Grid item xs={4} md={3} key={p.id} >
          <Card >
            <CardContent >
              <div style={{backgroundColor:'transparent',paddingTop:10,paddingLeft:40,paddingBottom:20,margin:10}}>
              <img src={p.image}  style={{width: "150px",alignItems:'center',justifyContent:'center'}} />
                </div>
              <Typography variant="subtitle1">{p.name}</Typography>
              <Typography variant="body2">₹{p.price}</Typography>
              <Typography variant="caption">In stock: {p.qtyOnHand}</Typography>


            </CardContent>
            <CardActions>
              <Button component={RouterLink} to={`/product/${p.id}`}>Details</Button>
              <Button onClick={()=>add(p,1)} disabled={p.qtyOnHand<=0}>Add</Button>
              <Button  component={RouterLink} to={`/AI/${p.id}`} >Chat With AI</Button>
             

            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
