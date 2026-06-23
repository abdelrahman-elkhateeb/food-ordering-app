import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

export default function ClientLayout() {
  return (
    <>
      <Navbar />

      <Outlet />

      <h1>Footer</h1>
    </>
  );
}