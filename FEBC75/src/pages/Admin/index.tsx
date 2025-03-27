// src/pages/Admin/index.jsx
import AdminMainPage from "./_Main";
import AdminSidebar from "./_Sidebar";

export default function AdminPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-5">
      <div className="h-full col-span-1">
        <AdminSidebar />
      </div>
      <div className="col-span-1 md:col-span-4 h-full">
        <AdminMainPage />
      </div>
    </div>
  );
}
