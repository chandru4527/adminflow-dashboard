import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import logo from "../assets/images/logo2.svg";
import cooklogo from "../assets/images/cookdin.svg";

import {
  MdDashboard,
  MdPeople,
  MdCheckCircle,
  MdBarChart,
  MdSubscriptions,
  MdVolunteerActivism,
  MdSettings,
  MdExpandMore,
  MdBuild,
  MdEventNote,
  MdClose,
} from "react-icons/md";

const menuItems = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <MdDashboard />,
  },
  {
    name: "Users Management",
    icon: <MdPeople />,
    children: [
      { name: "Customers", path: "/admin/customers" },
      { name: "Chefs", path: "/admin/chefs" },
    ],
  },
  {
    name: "Approvals",
    icon: <MdCheckCircle />,
    children: [
      { name: "Chef Approval", path: "/admin/chef-approve" },
    ],
  },
  {
    name: "Subscription",
    path: "/admin/subscription",
    icon: <MdSubscriptions />,
  },
  {
    name: "Booking Track",
    icon: <MdEventNote />,
    children: [
      { name: "Upcoming Bookings", path: "/admin/upcoming-bookings" },
      { name: "Ongoing Bookings", path: "/admin/ongoing-bookings" },
      { name: "Completed Bookings", path: "/admin/completed-booking" },
    ],
  },
  {
    name: "Revenue Management",
    icon: <MdBarChart />,
    children: [
      { name: "One-Time-Registration", path: "/admin/one-time-registeration" },
      { name: "Withdrawals", path: "/admin/withdrawals" },
      { name: "Refunds", path: "/admin/refunds" },
    ],
  },
  {
    name: "Food Donation Tracking",
    path: "/admin/food-donation",
    icon: <MdVolunteerActivism />,
  },
  {
    name: "Services",
    path: "/admin/services",
    icon: <MdBuild />,
  },
  {
    name: "Admin Settings",
    path: "/admin/settings",
    icon: <MdSettings />,
  },
]; 

const Sidebar = ({ collapsed, mobileOpen, setMobileOpen, setCollapsed}) => {
  
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
  if (collapsed) {
    setOpenMenu(null);
  }
}, [collapsed]);

  const showText = !collapsed || mobileOpen;

  // Toggle accordion
  const handleAccordion = (name) => {
    if (collapsed && !mobileOpen) {
      setCollapsed(false);
      setOpenMenu(name); // open this accordion after expanding
      return;
    }

    setOpenMenu((prev) => (prev === name ? null : name));
  };

  // Close all accordions
  const closeAllAccordions = () => {
    setOpenMenu(null);
  };

  return (
    <aside
      className={`bg-[#14ae5c] h-screen z-50 overflow-hidden transition-all duration-300 ease-in-out
      fixed top-0 left-0 w-64 ${
        mobileOpen ? "translate-x-0 " : "-translate-x-full z-99"
      } lg:translate-x-0
      lg:sticky lg:top-0 ${collapsed ? "lg:w-20" : "lg:w-64"}`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 w-full">
        <NavLink
          to="/admin/dashboard"
          onClick={() => {
            closeAllAccordions();
            setMobileOpen(false);
          }}
        >
          <img
            src={collapsed && !mobileOpen ? logo : cooklogo}
            alt="logo"
            className="h-10 transition-all duration-300"
          />
        </NavLink>

        {/* Mobile Close Button */}
        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden text-white text-3xl"
        >
          <MdClose />
        </button>

      </div>

      {/* Menu Title */}
      <div
        className={`px-5 py-3 text-xs uppercase text-white font-semibold whitespace-nowrap overflow-hidden transition-all duration-300 ${
          showText ? "opacity-100 w-full" : ""
        }`}
      >
        Menu
      </div>

      {/* Menu */}
      <nav className="px-3 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
        {menuItems.map((item) => (
          <div key={item.name}>
            {item.children ? (
              <>
                {/* Accordion Header */}
                <button
                  onClick={() => handleAccordion(item.name)}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-white hover:text-black transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{item.icon}</span>
                    {showText && <span>{item.name}</span>}
                  </div>

                  {showText && (
                    <MdExpandMore
                      className={`text-xl transition-transform duration-300 ${
                        openMenu === item.name ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>

                {/* Accordion Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openMenu === item.name ? "max-h-60 mt-1" : "max-h-0"
                  }`}
                >
                  <div className="ml-10 space-y-1">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        onClick={() => {
                          setOpenMenu(item.name); // keep current accordion open
                          setMobileOpen(false);
                        }}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-300 ${
                            isActive
                              ? "text-black font-semibold"
                              : "text-white hover:text-black"
                          }`
                        }
                      >
                        {child.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              /* Normal NavLink */
              <NavLink
                to={item.path}
                onClick={() => {
                  closeAllAccordions();
                  setMobileOpen(false);
                }}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all ${
                    isActive
                      ? "text-black font-semibold"
                      : "text-white hover:text-black"
                  }`
                }
              >
                <span className="text-xl">{item.icon}</span>
                {showText && <span>{item.name}</span>}
              </NavLink>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;