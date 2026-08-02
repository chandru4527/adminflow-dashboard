import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo2.svg";
import cooklogo from "../assets/images/cookdin.svg";

import {
  FaThLarge,
  FaUsers,
  FaCheckCircle,
  FaCrown,
  FaRoute,
  FaChartLine,
  FaHandsHelping,
  FaConciergeBell,
  FaCog,
  FaChevronDown,
} from "react-icons/fa";

import { MdDashboard, MdPeople, MdCheckCircle, MdSubscriptions } from "react-icons/md";

const menuItems = [
  { name: "Dashboard", path: "/admin/dashboard", icon: <MdDashboard /> },
  {
    name: "Users Management",
    icon: <MdPeople />,
    children: [
      { name: "All Users", path: "/admin/users" },
      { name: "Customers", path: "/admin/customers" },
      { name: "Chefs", path: "/admin/chefs" },
    ],
  },
  { name: "Approval", path: "/admin/approval", icon: <MdCheckCircle /> },
  { name: "Subscription", path: "/admin/subscription", icon: <MdSubscriptions /> },
  { name: "Booking Track", path: "/admin/booking", icon: <FaRoute /> },
  { name: "Revenue Management", path: "/admin/revenue", icon: <FaChartLine /> },
  { name: "Food Donation Tracking", path: "/admin/donation", icon: <FaHandsHelping /> },
  { name: "Services", path: "/admin/services", icon: <FaConciergeBell /> },
  { name: "Admin Settings", path: "/admin/settings", icon: <FaCog /> },
];

const Sidebar = ({ collapsed }) => {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };

  return (
    <aside
      className={`sticky top-0 h-screen overflow-y-auto bg-[#14ae5c] border-r border-gray-200 shadow-sm transition-all duration-300 ${collapsed ? "w-20" : "w-64"
        }`}
    >
      {/* Logo */}
      <div className="flex items-center justify-center h-16 mb-6">
        <img
          src={collapsed ? logo : cooklogo}
          alt="Logo"
          className="h-10 object-contain"
        />
      </div>

      {/* Menu Title */}
      {!collapsed && (
        <p className="text-xs uppercase px-2 mb-3 tracking-wider">
          Menu
        </p>
      )}

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <div key={item.name}>
            {item.children ? (
              <>
                {/* Accordion Header */}
                <button
                  onClick={() => toggleMenu(item.name)}
                  className="w-full flex items-center justify-between px-3 py-3 rounded-xl hover:bg-white/10 transition-colors duration-200"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{item.icon}</span>
                    {!collapsed && <span>{item.name}</span>}
                  </div>

                  {!collapsed && (
                    <FaChevronDown
                      className={`text-xs transition-transform duration-300 ${openMenu === item.name ? "rotate-180" : ""
                        }`}
                    />
                  )}
                </button>

                {/* Smooth Accordion Content */}
                {!collapsed && (
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openMenu === item.name
                      ? "max-h-48 opacity-100"
                      : "max-h-0 opacity-0"
                      }`}
                  >
                    <div className="ml-6 mt-2 pl-3 space-y-1 pb-2">
                      {item.children.map((child, index) => (
                        <NavLink
                          key={index}
                          to={child.path}
                          className={({ isActive }) =>
                            `block rounded-lg px-3 py-2 text-sm transition-colors duration-200 ${isActive
                              ? "bg-white text-[#14ae5c] font-semibold"
                              : "text-green-100 hover:bg-white/10 hover:text-white"
                            }`
                          }
                        >
                          {child.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-3 rounded-xl transition-colors duration-200 ${isActive
                    ? "bg-white text-[#14ae5c] font-semibold"
                    : "text-white hover:bg-white/10"
                  }`
                }
              >
                <span className="text-lg">{item.icon}</span>
                {!collapsed && <span>{item.name}</span>}
              </NavLink>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;