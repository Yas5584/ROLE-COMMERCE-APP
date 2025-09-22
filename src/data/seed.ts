
import { Category, Vendor, Product, Address, Order, Payment } from '../models/types'

export const seedCategories: Category[] = [
  { id:'cat-electronic', name:'Electronic', icon:'Electronic', isActive:true, owner:'ADMIN' },
  { id:'cat-food', name:'Food Delivery', icon:'fastfood', isActive:true, owner:'ADMIN' },
  { id:'cat-hotel', name:'Hotel Booking', icon:'hotel', isActive:true, owner:'ADMIN' },

]

export const seedVendors: Vendor[] = [
  { id:'vendor-001', name:'Fresh Mar', categoryIds:['cat-grocery'], status:'APPROVED', phone:'9000000001', address:'Noida' },
  { id:'vendor-002', name:'Tasty Bites', categoryIds:['cat-food'], status:'APPROVED', phone:'9000000002', address:'Delhi' },
  { id:'vendor-003', name:'City Lodge', categoryIds:['cat-hotel'], status:'APPROVED', phone:'9000000003', address:'Gurugram' },
]

export const seedProducts: Product[] = [
  { id:'prod-pc', vendorId:'vendor-001', categoryId:'cat-electronic', name:'Samsung Galaxy Book5 AI Metal', description:'The Samsung Galaxy Book5 AI Metal is a premium thin and light laptop powered by Intels CoreUltra 5 processor', price:78000, qtyOnHand:30, isActive:true,image:'/src/data/Images/pc.jpg'},
  { id:'prod-projector', vendorId:'vendor-002', categoryId:'cat-electronic', name:'Egate Duster 10X (EGP531) Projector ', description:'Introducing the Egate Duster 10X (EGP531) Projector,The Ultimate Cinematic Experience at Home', price:40000, qtyOnHand:30, isActive:true ,image:'/src/data/Images/Projector.jpg'},
  { id:'prod-mobile', vendorId:'vendor-003', categoryId:'cat-electronic', name:'Nothing Phone (2a) (Black, 256 GB) ', description:'A Phone with camera and performance', price:25000, qtyOnHand:150, isActive:true ,image:'/src/data/Images/phone.jpg'},

// //   { id:'prod-milk', vendorId:'vendor-001', categoryId:'cat-grocery', name:'Milk (1L)', description:'Full cream', price:60, qtyOnHand:50, isActive:true },
//   { id:'prod-burger', vendorId:'vendor-002', categoryId:'cat-food', name:'Veg Burger', description:'Crispy veg patty', price:99, qtyOnHand:15, isActive:true },
//   { id:'prod-room', vendorId:'vendor-003', categoryId:'cat-hotel', name:'Standard Room', description:'1 night stay', price:1500, qtyOnHand:10, isActive:true },
]

export const seedAddresses: Address[] = [
  { id:'addr-admin', ownerType:'ADMIN', ownerId:'admin-org', name:'HQ', line1:'A-101', city:'Noida', pin:'201301', isDefault:true },
  { id:'addr-vendor-1', ownerType:'VENDOR', ownerId:'vendor-001', name:'Warehouse 1', line1:'Sec 62', city:'Noida', pin:'201309', isDefault:true },
]
// window.localStorage.removeItem("db-store");
// window.location.reload()
export const seedOrders: Order[] = []
export const seedPayments: Payment[] = []
