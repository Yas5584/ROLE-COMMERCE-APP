
# Role Commerce App (Admin/Vendor/Customer in one React codebase)

**Stack:** Vite + React + TypeScript + React Router + MUI + Zustand (localStorage)  
**Auth (DEV):** Phone + OTP `1111` with **role selection** at login.

## Features
- Single app with **three role flows** (Admin, Vendor, Customer)
- **Role-specific color themes** (Admin: deepPurple/orange, Vendor: indigo/amber, Customer: teal/pink)
- Shared modules for all roles: **Orders, Payment History, Addresses**
- **Admin**: Categories CRUD, Vendor management (approve/disable), overview dashboard
- **Vendor**: Self registration (via Admin add in demo), **My Categories** CRUD, **Products** CRUD, dashboard
- **Customer**: Browse **Vendors, Categories, Products**, Product Detail, **Cart**, **Checkout (COD)**, Order/Payment History, Addresses, Account
- Dummy data + localStorage persistence; vendor stock changes reflect in customer views

## Run locally
```bash
npm install
npm run dev
# open http://localhost:5173
```

## Login (DEV)
- Select role: **Admin | Vendor | Customer**
- Phone: any (e.g., 9999999999)
- OTP: **1111**

## Notes
- This is a client-only demo with in-memory/localStorage "DB".
- For production, move CRUD & RBAC to an API and remove role selector from login.
