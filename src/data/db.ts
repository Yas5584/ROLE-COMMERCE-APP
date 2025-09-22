
import { Category, Vendor, Product, Address, Order, Payment } from '../models/types'
import { seedCategories, seedVendors, seedProducts, seedAddresses, seedOrders, seedPayments } from './seed'

const KEY = 'role-commerce-db-v1'

export type DB = {
  categories: Category[]
  vendors: Vendor[]
  products: Product[]
  addresses: Address[]
  orders: Order[]
  payments: Payment[]
}

export function loadDB(): DB{
  const raw = localStorage.getItem(KEY)
  console.log(raw)
   

null
  if(!raw){
    const initial: DB = {
      categories: seedCategories,
      vendors: seedVendors,
      products: seedProducts,
      addresses: seedAddresses,
      orders: seedOrders,
      payments: seedPayments
    }
    localStorage.setItem(KEY, JSON.stringify(initial))
    return initial
  }
  return JSON.parse(raw)
}

export function saveDB(db: DB){
  localStorage.setItem(KEY, JSON.stringify(db))
  window.dispatchEvent(new CustomEvent('db:update'))
}
