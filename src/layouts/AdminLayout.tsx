
import { Routes, Route, Navigate } from 'react-router-dom'
import ResponsiveLayout from '../components/ResponsiveLayout'
import AdminDashboard from '../pages/admin/Dashboard'
import AdminCategories from '../pages/admin/Categories'
import AdminVendors from '../pages/admin/Vendors'
import Orders from '../pages/shared/Orders'
import Payments from '../pages/shared/Payments'
import Addresses from '../pages/shared/Addresses'
import AI from "../pages/customer/AI"

export default function AdminLayout(){
  return (
    <ResponsiveLayout title="Admin">
      <Routes>
        <Route index element={<AdminDashboard/>}/>
        <Route path="categories" element={<AdminCategories/>}/>
        <Route path="vendors" element={<AdminVendors/>}/>
        <Route path="*" element={<Navigate to="."/>}/>

      </Routes>
      <Routes>
        <Route path="/orders" element={<Orders mode="ADMIN"/>}/>
        <Route path="/payments" element={<Payments mode="ADMIN"/>}/>
        <Route path="/addresses" element={<Addresses mode="ADMIN"/>}/>
      </Routes>
    </ResponsiveLayout>
  )
}
