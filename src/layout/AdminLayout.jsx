import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        setCollapsed={setCollapsed}
        setMobileOpen={setMobileOpen}
      />

      {/* Right side */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Sticky Navbar */}
        <Navbar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          setMobileOpen={setMobileOpen}
        />

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="min-h-full flex flex-col">
            <Outlet />
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;