import { Outlet } from "react-router-dom";

export default function ClientLayout() {
  return (
    <>
      <h1>Navbar</h1>

      <Outlet />

      <h1>Footer</h1>
    </>
  );
}