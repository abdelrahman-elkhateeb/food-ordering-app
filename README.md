# 🍔 Foodie - Full Stack Food Ordering Platform

A modern full-stack food ordering platform built with React, TypeScript, Supabase, TanStack Query, Zustand, and shadcn/ui.

The application allows customers to browse products, place orders, track order status, and manage their cart, while administrators can manage products and monitor orders through a dedicated dashboard.

---

## 🚀 Features

### 👤 Authentication

- User Registration
- User Login
- Secure Session Management using Supabase Auth
- Protected User Actions
- Logout Functionality

---

### 🍕 Customer Experience

#### Menu

- Browse available food items
- Product images and descriptions
- Multi-language support (English / Arabic)
- Product availability status

#### Shopping Cart

- Add products to cart
- Remove products from cart
- Increase / decrease quantity
- Persistent client-side state using Zustand
- Automatic subtotal and total calculations

#### Checkout

- Customer information collection
- Payment method selection
- Order summary
- Order creation workflow

#### Order Tracking

Customers can track their orders using the order ID.

Supported statuses:

- Pending
- Preparing
- Out For Delivery
- Delivered

Includes a visual order progress tracker that updates automatically based on the current order status.

---

### 🌍 Multi-Language Support

Built using i18next.

#### Supported Languages

- English 🇺🇸
- Arabic 🇪🇬

#### Features

- Dynamic language switching
- Persistent language preference
- RTL support
- Localized UI content

---

### 🛠 Admin Dashboard

A dedicated dashboard for restaurant management.

#### Products Management

- Create products
- Edit products
- Delete products
- Toggle product availability

#### Orders Management

- View all orders
- View order details
- Update order status

Order workflow:

```txt
Pending
↓
Preparing
↓
Out For Delivery
↓
Delivered
```

---

## 🏗 Architecture

The project follows a feature-based architecture.

```txt
src
│
├── components
├── pages
├── routes
├── services
├── store
├── types
│
├── features
│   ├── products
│   ├── orders
│   └── users
│
└── lib
```

This structure improves scalability, maintainability, and separation of concerns.

---

## ⚡ State Management

### Client State

Managed using Zustand.

Examples:

- Shopping Cart
- Local UI State
- User Preferences

### Server State

Managed using TanStack Query.

Examples:

- Products
- Orders
- Authentication Data

Benefits:

- Request caching
- Automatic refetching
- Built-in loading and error states
- Better server state management

---

## 🎨 UI & Design

Built entirely using:

- shadcn/ui
- Radix UI
- Tailwind CSS

Features:

- Responsive Layout
- Accessible Components
- Modern Dashboard Design
- Reusable UI Components
- Mobile Friendly Experience

---

## 🗄 Database

Powered by Supabase.

### Products Table

```txt
id
name_en
name_ar
description_en
description_ar
price
image_url
is_available
created_at
```

### Orders Table

```txt
id
customer_name
phone
address
payment_method
status
total_price
created_at
```

### Order Items Table

```txt
id
order_id
product_id
quantity
price
```

---

## 🔐 Authentication

Powered by Supabase Authentication.

Features:

- Email & Password Registration
- User Login
- Session Persistence
- Secure Authentication Flow

---

## 🧰 Tech Stack

### Frontend

- React
- TypeScript
- React Router DOM
- TanStack Query
- Zustand

### Styling

- Tailwind CSS
- shadcn/ui
- Radix UI

### Backend Services

- Supabase

### Authentication

- Supabase Auth

### Database

- PostgreSQL (Supabase)

### Internationalization

- i18next
- react-i18next

---

## 📈 What This Project Demonstrates

This project showcases:

- Modern React Architecture
- Feature-Based Folder Structure
- Authentication Workflows
- CRUD Operations
- Dashboard Development
- State Management Best Practices
- Client vs Server State Separation
- Multi-Language Applications
- Responsive Design
- Real-World Order Management Systems
- Supabase Integration
- Production-Oriented Frontend Development

---

## 📸 Screenshots

<img width="1915" height="936" alt="AdminProductPage" src="https://github.com/user-attachments/assets/95c06350-2f4b-4a99-aaee-c7654a35d67d" />
<img width="1900" height="950" alt="menu" src="https://github.com/user-attachments/assets/9d6eb4b9-f46e-42b2-a0d3-c96f3cabb1e5" />
<img width="1899" height="942" alt="track-order" src="https://github.com/user-attachments/assets/babd238b-b7e9-4512-a22e-b50ed325e1ec" />
<img width="1912" height="940" alt="checkout" src="https://github.com/user-attachments/assets/90c7b292-bd6c-42c7-b57a-a84d04a8aa1f" />


---

## 🏃 Running Locally

```bash
# Clone repository
git clone <repository-url>

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file and add:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---
