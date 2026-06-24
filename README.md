# 🍔 Foodie - Restaurant Ordering & Management System

A full-stack restaurant ordering platform built with modern React tools and Supabase.

The project consists of two main applications:

* **Client Application** — Browse menu items, add products to cart, place orders, and track order status.
* **Admin Dashboard** — Manage products, monitor orders, and update delivery statuses in real time.

---

## ✨ Features

### Customer Side

* Browse restaurant menu
* Multi-language product support (English / Arabic)
* Shopping cart powered by Zustand
* Checkout flow
* Order tracking page
* Authentication with Supabase Auth
* Responsive design for mobile and desktop

### Admin Dashboard

* View all orders
* Update order status:

  * Pending
  * Preparing
  * Out For Delivery
  * Delivered
* Full product management

  * Create products
  * Update products
  * Delete products
* Product availability control

---

## 🛠 Tech Stack

### Frontend

* React
* TypeScript
* Vite
* React Router
* Tailwind CSS
* shadcn/ui
* React Hook Form
* Zustand
* TanStack Query

### Backend & Database

* Supabase

  * Authentication
  * PostgreSQL Database
  * Row Level Security

---

## 📦 Database Tables

### Products

* id
* name_en
* name_ar
* description_en
* description_ar
* image_url
* price
* is_available
* created_at

### Orders

* id
* customer_name
* phone
* address
* status
* payment_method
* total_price
* created_at

### Order Items

* id
* order_id
* product_id
* quantity
* price

---

## 🚀 Getting Started

### Clone Repository

```bash
git clone <repo-url>
cd foodie
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file:

```env
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

### Start Development Server

```bash
npm run dev
```

---

## 🎯 What I Practiced

* Scalable React project architecture
* State management with Zustand
* Server state management with TanStack Query
* Form handling with React Hook Form
* Authentication with Supabase
* CRUD operations
* Admin dashboard development
* Real-world API integration
* Role-based application structure

---

## 📸 Screenshots

Add screenshots here.
![Uploading Screenshot 2026-06-24 063302.png…]()
<img width="1900" height="935" alt="Screenshot 2026-06-24 063247" src="https://github.com/user-attachments/assets/60f99798-9bc3-427b-8da0-5e10a18e05c5" />
<img width="1905" height="931" alt="Screenshot 2026-06-24 063228" src="https://github.com/user-attachments/assets/8b0aee53-39e0-4b75-b1a3-ea839cfefa35" />


---
