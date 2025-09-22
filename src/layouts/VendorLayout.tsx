
import { Routes, Route, Navigate } from 'react-router-dom'
import ResponsiveLayout from '../components/ResponsiveLayout'
import VendorDashboard from '../pages/vendor/Dashboard'
import VendorCategories from '../pages/vendor/Categories'
import VendorProducts from '../pages/vendor/Products'
import Orders from '../pages/shared/Orders'
import Payments from '../pages/shared/Payments'
import Addresses from '../pages/shared/Addresses'

export default function VendorLayout(){
  return (
    <ResponsiveLayout title="Vendor">
      <Routes>
        <Route index element={<VendorDashboard/>}/>
        <Route path="categories" element={<VendorCategories/>}/>
        <Route path="products" element={<VendorProducts/>}/>
        <Route path="*" element={<Navigate to="."/>}/>
      </Routes>
      <Routes>
        <Route path="/orders" element={<Orders mode="VENDOR"/>}/>
        <Route path="/payments" element={<Payments mode="VENDOR"/>}/>
        <Route path="/addresses" element={<Addresses mode="VENDOR"/>}/>
        
      </Routes>
    </ResponsiveLayout>
  )
}
