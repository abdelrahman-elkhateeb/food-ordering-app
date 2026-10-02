import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router";

export default function ClientLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="container mx-auto mb-12 flex-1 px-4">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
