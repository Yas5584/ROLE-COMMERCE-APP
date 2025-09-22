
export type ID = string

export type Category = {
  id: ID
  name: string
  icon?: string
  isActive: boolean
  owner?: 'ADMIN'|'VENDOR' // who created it
  vendorId?: ID            // if vendor-owned
}

export type Vendor = {
  id: ID
  name: string
  categoryIds: ID[]
  status: 'PENDING'|'APPROVED'|'DISABLED'
  phone: string
  address?: string
}

export type Product = {
  id: ID
  vendorId: ID
  categoryId: ID
  name: string
  description?: string
  price: number
  image?: string
  qtyOnHand: number
  isActive: boolean
}

export type Address = {
  id: ID
  ownerType: 'ADMIN'|'VENDOR'|'CUSTOMER'
  ownerId: ID
  name: string
  line1: string
  city: string
  pin: string
  isDefault?: boolean
}

export type OrderItem = { productId: ID; name: string; qty: number; price: number; vendorId: ID }
export type Order = {
  id: ID
  userId: ID
  vendorId: ID
  items: OrderItem[]
  amount: number
  status: 'PLACED'|'CONFIRMED'|'PACKED'|'DISPATCHED'|'DELIVERED'|'CANCELLED'
  createdAt: string
}

export type Payment = {
  id: ID
  orderId: ID
  amount: number
  method: 'COD'|'ONLINE'
  status: 'PENDING'|'PAID'|'FAILED'
  createdAt: string
}

export type Suggestion = {
  id: ID
  type: 'CATEGORY'|'PRODUCT'
  refId: ID
  title: string
  subtitle?: string
}
