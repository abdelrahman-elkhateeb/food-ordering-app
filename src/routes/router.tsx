import AdminLayout from "@/layout/AdminLayout";
import AuthLayout from "@/layout/AuthLayout";
import ClientLayout from "@/layout/ClientLayout";
import AdminDashboard from "@/pages/Admin/AdminDashboard";
import AdminOrders from "@/pages/Admin/AdminOrders";
import AdminProducts from "@/pages/Admin/AdminProducts";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Menu from "@/pages/Menu";
import NotFound from "@/pages/NotFound";
import Register from "@/pages/Register";
import TrackOrder from "@/pages/TrackOrder";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "menu", element: <Menu /> },
      { path: "checkout", element: <Checkout /> },
      { path: "track-order", element: <TrackOrder /> },
      { path: "cart", element: <Cart /> },
    ]
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "products", element: <AdminProducts /> },
      { path: "orders", element: <AdminOrders /> },
    ]
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  }
])