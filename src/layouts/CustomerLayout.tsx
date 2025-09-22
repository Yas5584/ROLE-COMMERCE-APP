
import { Routes, Route, Navigate } from 'react-router-dom'
import ResponsiveLayout from '../components/ResponsiveLayout'
import Home from '../pages/customer/Home'
import Vendors from '../pages/customer/Vendors'
import Categories from '../pages/customer/Categories'
import CategoryView from '../pages/customer/CategoryView'
import ProductDetail from '../pages/customer/ProductDetail'
import Cart from '../pages/customer/Cart'
import Checkout from '../pages/customer/Checkout'
import Orders from '../pages/shared/Orders'
import Payments from '../pages/shared/Payments'
import Addresses from '../pages/shared/Addresses'
import Account from '../pages/customer/Account'
import AI from "../pages/customer/AI"
// import App from "../pages/customer/AI"
// import main from "@/pages/Assistant/main"
export default function CustomerLayout(){
  return (
    <ResponsiveLayout title="Customer">
      <Routes>
        <Route index element={<Home/>}/>
        <Route path="vendors" element={<Vendors/>}/>
        <Route path="categories" element={<Categories/>}/>
        <Route path="category/:id" element={<CategoryView/>}/>
        <Route path="product/:id" element={<ProductDetail/>}/>
        <Route path="cart" element={<Cart/>}/>
        <Route path="checkout" element={<Checkout/>}/>
        <Route path="account" element={<Account/>}/>
        <Route path="*" element={<Navigate to="."/>}/>
         {/* <Route path="/AI" element={<AI />} */}
                                {/* <Route path="/AI/:id" element={<AI />} />  */}



      </Routes>
      <Routes>
        <Route path="/orders" element={<Orders mode="CUSTOMER"/>}/>
        <Route path="/payments" element={<Payments mode="CUSTOMER"/>}/>
        <Route path="/addresses" element={<Addresses mode="CUSTOMER"/>}/>
        

         
        
        {/* <Route path="/product/:id" element={<ProductDetails />} /> */}
        {/* <Route path="/main/:id" element={<main />} />  */}


        
      </Routes>
    </ResponsiveLayout>
  )
}
