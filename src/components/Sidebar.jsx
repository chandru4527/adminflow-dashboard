import React from "react";
import { NavLink } from "react-router-dom";
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
} from "react-icons/fa";

const menuItems = [
  { name: "Dashboards", path: "/admin/dashboard", icon: <FaThLarge /> },
  { name: "Users Management", path: "/admin/users", icon: <FaUsers /> },
  { name: "Approval", path: "/admin/approval", icon: <FaCheckCircle /> },
  { name: "Subscription", path: "/admin/subscription", icon: <FaCrown /> },
  { name: "Booking Track", path: "/admin/booking", icon: <FaRoute /> },
  { name: "Revenue Management", path: "/admin/revenue", icon: <FaChartLine /> },
  { name: "Food Donation Tracking", path: "/admin/donation", icon: <FaHandsHelping /> },
  { name: "Services", path: "/admin/services", icon: <FaConciergeBell /> },
  { name: "Admin Settings", path: "/admin/settings", icon: <FaCog /> },
];

export default function Sidebar({ collapsed }) {
  return (
    <aside
      className={` bg-white border-r border-gray-200 shadow-sm min-h-screen transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <h1
          className={`text-xl font-bold text-blue-600 whitespace-nowrap transition-all ${
            collapsed
              ? "opacity-0 w-0 group-hover:opacity-100 group-hover:w-auto"
              : "opacity-100"
          }`}
        >
          Admin Panel
        </h1>

        {collapsed && (
          <span className="text-xl font-bold text-blue-600 group-hover:hidden">
            A
          </span>
        )}
      </div>

      {/* Menu Title */}
      <div
        className={`px-6 py-3 text-xs font-semibold text-gray-400 uppercase transition-all ${
          collapsed
            ? "opacity-0 h-0 overflow-hidden group-hover:opacity-100 group-hover:h-auto"
            : "opacity-100"
        }`}
      >
        Menu
      </div>

      {/* Navigation */}
      <nav className="space-y-1 px-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center rounded-xl px-4 py-3 transition-all ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <span className="text-lg min-w-6">{item.icon}</span>

            <span
              className={`ml-3 whitespace-nowrap transition-all ${
                collapsed
                  ? "opacity-0 w-0 overflow-hidden group-hover:opacity-100 group-hover:w-auto"
                  : "opacity-100"
              }`}
            >
              {item.name}
            </span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}