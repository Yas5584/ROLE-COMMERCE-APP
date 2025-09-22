
import create from 'zustand'
import { persist } from 'zustand/middleware'

export type Role = 'ADMIN'|'VENDOR'|'CUSTOMER'
export type User = { id: string; phone: string; role: Role; vendorId?: string; name?: string }

type AuthState = {
  user: User | null
  signIn: (u: Omit<User,'id'>) => void
  logout: () => void
}

export const useAuth = create<AuthState>()(persist((set,get)=>({
  user: null,
  signIn: (u)=> set({ user: { id: crypto.randomUUID(), ...u } }),
  logout: ()=> set({ user: null })
}), { name: 'auth-store' }))
