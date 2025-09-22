
import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './store'

export default function Protected({ allow, children }:{ allow: Array<'ADMIN'|'VENDOR'|'CUSTOMER'>, children: ReactNode }){
  const { user } = useAuth()
  const loc = useLocation()
  if(!user) return <Navigate to="/login" state={{ from: loc }} replace/>
  if(!allow.includes(user.role)) {
    const redirect = user.role==='ADMIN'?'/admin':'/'
    return <Navigate to={redirect} replace/>
  }
  return <>{children}</>
}
