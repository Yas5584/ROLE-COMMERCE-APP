
import DashboardIcon from '@mui/icons-material/Dashboard'
import CategoryIcon from '@mui/icons-material/Category'
import StoreIcon from '@mui/icons-material/Store'
import ListAltIcon from '@mui/icons-material/ListAlt'
import PaymentIcon from '@mui/icons-material/Payment'
import HomeIcon from '@mui/icons-material/Home'
import InventoryIcon from '@mui/icons-material/Inventory2'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import SettingsIcon from '@mui/icons-material/Settings'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import ApartmentIcon from '@mui/icons-material/Apartment'

export function buildMenu(role:'ADMIN'|'VENDOR'|'CUSTOMER'){
  if(role==='ADMIN') return [
    { to:'/admin', label:'Dashboard', icon:<DashboardIcon/> },
    { to:'/admin/categories', label:'Categories', icon:<CategoryIcon/> },
    { to:'/admin/vendors', label:'Vendors', icon:<StoreIcon/> },
    { to:'/orders', label:'Order List', icon:<ListAltIcon/> },
    { to:'/payments', label:'Payment History', icon:<PaymentIcon/> },
    { to:'/addresses', label:'Addresses', icon:<ApartmentIcon/> },
  ]
  if(role==='VENDOR') return [
    { to:'/vendor', label:'Dashboard', icon:<DashboardIcon/> },
    { to:'/vendor/categories', label:'My Categories', icon:<CategoryIcon/> },
    { to:'/vendor/products', label:'Products', icon:<InventoryIcon/> },
    { to:'/orders', label:'Order List', icon:<ListAltIcon/> },
    { to:'/payments', label:'Payment History', icon:<PaymentIcon/> },
    { to:'/addresses', label:'Addresses', icon:<ApartmentIcon/> },
  ]
  return [
    { to:'/', label:'Home', icon:<HomeIcon/> },
    { to:'/vendors', label:'Vendors', icon:<StoreIcon/> },
    { to:'/categories', label:'Categories', icon:<CategoryIcon/> },
    { to:'/cart', label:'Cart', icon:<ShoppingCartIcon/> },
    { to:'/orders', label:'Order History', icon:<ListAltIcon/> },
    { to:'/payments', label:'Payment History', icon:<PaymentIcon/> },
    { to:'/addresses', label:'Addresses', icon:<ApartmentIcon/> },
    { to:'/account', label:'Account', icon:<SettingsIcon/> },
  ]
}
