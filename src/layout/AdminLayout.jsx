import { Outlet } from "react-router-dom";

// components
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import AdminFooter from "./AdminFooter";
import ScrollToTop from "../components/ScrollToTop";

const AdminLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <AdminSidebar />

      <div className="flex min-w-0 flex-1 flex-col">

        <AdminNavbar />

        <main className="scrollbar-none flex-1 overflow-y-auto p-3">
          <ScrollToTop />
          <Outlet />
        </main>

        <AdminFooter />

      </div>

    </div>
  );
};

export default AdminLayout;