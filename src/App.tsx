
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './auth/Login'
import { useAuth } from './auth/store'
import AdminLayout from './layouts/AdminLayout'
import VendorLayout from './layouts/VendorLayout'
import CustomerLayout from './layouts/CustomerLayout'
import Protected from './auth/Protected'
// import AI from "@/pages/customer/AI"
import AI from "./pages/customer/AI"

export default function App(){
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/login" element={<Login/>} />

      <Route path="/admin/*" element={
        <Protected allow={['ADMIN']}>
          <AdminLayout/>
        </Protected>
      }/>

      <Route path="/vendor/*" element={
        <Protected allow={['VENDOR']}>
          <VendorLayout/>
        </Protected>
      }/>

      <Route path="/*" element={
        <Protected allow={['CUSTOMER']}>
          <CustomerLayout/>
        </Protected>
      }/>
        <Route path="/AI/:id" element={<AI />} /> 
        
       
      <Route path="*" element={<Navigate to={user ? (user.role==='ADMIN'?'/admin':'/') : '/login'} replace/>}/>
    </Routes>
  )
}
