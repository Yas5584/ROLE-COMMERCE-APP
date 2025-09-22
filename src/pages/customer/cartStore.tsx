
import create from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '../../models/types'

type CartItem = { productId: string; name: string; price: number; qty: number; vendorId: string }

type CartState = {
  items: CartItem[]
  add: (p: Product, qty:number)=>void
  remove: (pid:string)=>void
  clear: ()=>void
  total: ()=>number
}

export const useCart = create<CartState>()(persist((set,get)=>({
  items: [],
  add: (p,qty)=> set(state=>{
    const ex = state.items.find(i=>i.productId===p.id)
    if(ex){ ex.qty += qty; return { items: [...state.items] } }
    return { items: [...state.items, { productId:p.id, name:p.name, price:p.price, qty, vendorId: p.vendorId }] }
  }),
  remove: (pid)=> set(state=>({ items: state.items.filter(i=>i.productId!==pid) })),
  clear: ()=> set({ items: [] }),
  total: ()=> get().items.reduce((s,i)=> s + i.price*i.qty, 0)
}), { name: 'cart-store' }))
