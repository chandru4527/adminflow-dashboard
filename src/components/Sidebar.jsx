import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import useSidebarStore from "../store/useSidebarStore";

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
    children: [{ name: "Chef Approval", path: "/admin/chef-approve" }],
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
      {
        name: "One-Time-Registration",
        path: "/admin/one-time-registeration",
      },
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

const Sidebar = () => {
  const location = useLocation();

  const {
    isCollapsed,
    isMobileOpen,
    toggleCollapse,
    closeMobileSidebar,
  } = useSidebarStore();

  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    if (isCollapsed) {
      setOpenMenu(null);
      return;
    }

    const activeParent = menuItems.find((item) =>
      item.children?.some((child) =>
        location.pathname.startsWith(child.path)
      )
    );

    if (activeParent) {
      setOpenMenu(activeParent.name);
    }
  }, [location.pathname, isCollapsed]);

  const showText = !isCollapsed || isMobileOpen;

  const handleAccordion = (name) => {
    if (isCollapsed && !isMobileOpen) {
      toggleCollapse();
      setOpenMenu(name);
      return;
    }

    setOpenMenu((prev) => (prev === name ? null : name));
  };

  const closeAllAccordions = () => {
    setOpenMenu(null);
  };

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-99 lg:hidden"
          onClick={closeMobileSidebar}
        />
      )}

      <aside
        className={`bg-green-700 h-screen z-99 overflow-hidden transition-all duration-300 ease-in-out
        fixed top-0 left-0 w-64
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:sticky lg:top-0
        ${isCollapsed ? "lg:w-20" : "lg:w-64"}`}
      >
        {/* Logo */}
        <div className="h-17 flex items-center justify-between px-4 w-full">
          <NavLink
            to="/admin/dashboard"
            className="flex justify-center items-center"
            onClick={() => {
              closeAllAccordions();
              closeMobileSidebar();
            }}
          >
            <img
              src={showText ? cooklogo : logo}
              alt="logo"
              className="h-10 transition-all duration-300"
            />
          </NavLink>

          {/* Mobile Close */}
          <button
            onClick={closeMobileSidebar}
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
          {menuItems.map((item) => {
            const isParentActive = item.children?.some((child) =>
              location.pathname.startsWith(child.path)
            );

            return (
              <div key={item.name}>
                {item.children ? (
                  <>
                    {/* Accordion Header */}
                    <button
                      onClick={() => handleAccordion(item.name)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded text-sm transition-all duration-300 ${
                        isParentActive
                          ? "bg-white text-green-700 font-semibold"
                          : "text-white hover:bg-white hover:text-green-700"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl flex items-center justify-center">
                          {item.icon}
                        </span>

                        {showText && (
                          <span className="flex items-center">
                            {item.name}
                          </span>
                        )}
                      </div>

                      {showText && (
                        <MdExpandMore
                          className={`text-xl transition-transform duration-300 ${
                            !isCollapsed && openMenu === item.name
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                      )}
                    </button>

                    {/* Accordion Content */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        !isCollapsed && openMenu === item.name
                          ? "max-h-60 mt-1"
                          : "max-h-0"
                      }`}
                    >
                      <div className="ml-10 space-y-1">
                        {item.children.map((child) => (
                          <NavLink
                            key={child.path}
                            to={child.path}
                            onClick={() => {
                              setOpenMenu(item.name);
                              closeMobileSidebar();
                            }}
                            className={({ isActive }) =>
                              `flex items-center gap-3 px-4 py-2.5 rounded text-sm transition-all duration-300 ${
                                isActive
                                  ? "bg-white text-green-700 font-semibold"
                                  : "text-white hover:bg-white hover:text-green-700"
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
                  <NavLink
                    to={item.path}
                    onClick={() => {
                      closeAllAccordions();
                      closeMobileSidebar();
                    }}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-2.5 rounded text-sm transition-all duration-300 ${
                        isActive
                          ? "bg-white text-green-700 font-semibold"
                          : "text-white hover:bg-white hover:text-green-700"
                      }`
                    }
                  >
                    <span className="text-xl flex items-center justify-center">
                      {item.icon}
                    </span>

                    {showText && (
                      <span className="flex items-center">
                        {item.name}
                      </span>
                    )}
                  </NavLink>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;