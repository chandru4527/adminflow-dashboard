import { Outlet } from "react-router-dom";

// components
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import AdminFooter from "./AdminFooter";
import ScrollToTop from '../components/ScrollToTop';


const AdminLayout = () => {
  return (
    <div className="h-screen flex bg-gray-100 overflow-hidden">

      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminNavbar />

        <main className="flex-1 overflow-y-auto scrollbar-none p-3" >
          <ScrollToTop />
          <Outlet />
        </main>

        <AdminFooter />
      </div>
    </div>
  );
};

export default AdminLayout;