import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div>
      <aside>Sidebar</aside>

      <main>
        <Outlet />
      </main>
    </div>
  );
}