
import create from 'zustand'
import { persist } from 'zustand/middleware'
import { DB, loadDB, saveDB } from '../data/db'
import { Category, Vendor, Product, Address, Order, Payment } from '../models/types'
import { produce } from 'immer'

type DBState = DB & {
  refresh: ()=>void
  addCategory: (c: Omit<Category,'id'>)=>void
  updateCategory: (id:string, patch: Partial<Category>)=>void
  deleteCategory: (id:string)=>void

  addVendor: (v: Omit<Vendor,'id'|'status'> & { status?:Vendor['status'] })=>void
  updateVendor: (id:string, patch: Partial<Vendor>)=>void
  deleteVendor: (id:string)=>void

  addProduct: (p: Omit<Product,'id'>)=>void
  updateProduct: (id:string, patch: Partial<Product>)=>void
  deleteProduct: (id:string)=>void

  addAddress: (a: Omit<Address,'id'>)=>void
  updateAddress: (id:string, patch: Partial<Address>)=>void
  deleteAddress: (id:string)=>void

  placeOrderCOD: (o: Omit<Order,'id'|'status'|'createdAt'|'amount'>)=>Order
  updateOrder: (id:string, patch: Partial<Order>)=>void

  addPayment: (p: Omit<Payment,'id'|'status'|'createdAt'> & { status?:Payment['status'] })=>void
}

function nextId(prefix:string){ return `${prefix}-${Math.random().toString(36).slice(2,8)}` }

export const useDB = create<DBState>()(persist((set,get)=>{
  const init = loadDB()
  function write(mutator:(draft: DB)=>void){
    const cur = { categories: get().categories, vendors: get().vendors, products: get().products, addresses: get().addresses, orders: get().orders, payments: get().payments }
    const next = produce(cur, draft => mutator(draft))
    saveDB(next)
    set(next)
  }
  window.addEventListener('db:update', ()=> set(loadDB()))

  return {
    ...init,
    refresh: ()=> set(loadDB()),

    addCategory: (c)=> write(d=>{ d.categories.push({ id: nextId('cat'), ...c }) }),
    updateCategory: (id,patch)=> write(d=>{
      const i = d.categories.findIndex(x=>x.id===id); if(i>-1) d.categories[i] = { ...d.categories[i], ...patch }
    }),
    deleteCategory: (id)=> write(d=>{ d.categories = d.categories.filter(x=>x.id!==id) }),

    addVendor: (v)=> write(d=>{ d.vendors.push({ id: nextId('vendor'), status: v.status ?? 'PENDING', ...v }) }),
    updateVendor: (id,patch)=> write(d=>{ const i=d.vendors.findIndex(x=>x.id===id); if(i>-1) d.vendors[i] = { ...d.vendors[i], ...patch } }),
    deleteVendor: (id)=> write(d=>{ d.vendors = d.vendors.filter(x=>x.id!==id); d.products = d.products.filter(p=>p.vendorId!==id) }),

    addProduct: (p)=> write(d=>{ d.products.push({ id: nextId('prod'), ...p }) }),
    updateProduct: (id,patch)=> write(d=>{ const i=d.products.findIndex(x=>x.id===id); if(i>-1) d.products[i] = { ...d.products[i], ...patch } }),
    deleteProduct: (id)=> write(d=>{ d.products = d.products.filter(x=>x.id!==id) }),

    addAddress: (a)=> write(d=>{ d.addresses.push({ id: nextId('addr'), ...a }) }),
    updateAddress: (id,patch)=> write(d=>{ const i=d.addresses.findIndex(x=>x.id===id); if(i>-1) d.addresses[i] = { ...d.addresses[i], ...patch } }),
    deleteAddress: (id)=> write(d=>{ d.addresses = d.addresses.filter(x=>x.id!==id) }),

    placeOrderCOD: (o)=>{
      let created:any = null
      write(d=>{
        const amount = o.items.reduce((s,it)=> s + it.price*it.qty, 0)
        created = { id: nextId('order'), ...o, amount, status:'PLACED', createdAt: new Date().toISOString() }
        d.orders.unshift(created)
        // decrement stock
        o.items.forEach(it => {
          const p = d.products.find(p=>p.id===it.productId)
          if(p){ p.qtyOnHand = Math.max(0, p.qtyOnHand - it.qty) }
        })
        // payment record (COD pending)
        d.payments.unshift({ id: nextId('pay'), orderId: created.id, amount, method:'COD', status:'PENDING', createdAt: created.createdAt })
      })
      return created
    },
    updateOrder: (id,patch)=> write(d=>{ const i=d.orders.findIndex(x=>x.id===id); if(i>-1) d.orders[i] = { ...d.orders[i], ...patch } }),
    addPayment: (p)=> write(d=>{ d.payments.unshift({ id: nextId('pay'), status: p.status ?? 'PAID', createdAt: new Date().toISOString(), ...p }) }),
  }
}, { name: 'db-store' }))
