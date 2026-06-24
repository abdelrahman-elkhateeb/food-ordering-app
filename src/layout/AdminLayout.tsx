import { Outlet } from "react-router-dom";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Separator } from "@/components/ui/separator";

import AdminSidebar from "@/components/dashboard/AdminSidebar";

export default function AdminLayout() {
  return (
    <div dir="ltr">
      <SidebarProvider>
        <AdminSidebar />

        <SidebarInset>
          <header className="flex h-16 items-center gap-4 border-b px-6">
            <SidebarTrigger />

            <Separator
              orientation="vertical"
              className="h-6"
            />

            <div>
              <h1 className="font-semibold">
                Admin Dashboard
              </h1>

              <p className="text-sm text-muted-foreground">
                Overview and management
              </p>
            </div>
          </header>

          <main className="p-6">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}