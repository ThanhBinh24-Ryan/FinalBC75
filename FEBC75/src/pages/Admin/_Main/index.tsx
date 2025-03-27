import AdminNavbar from "./_Navbar";
import { Outlet } from "react-router-dom";

export default function AdminMainPage() {
  return (
    <>
      <AdminNavbar />
      <Outlet />
    </>
  );
}
