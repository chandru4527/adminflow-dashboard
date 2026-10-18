import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

// icons
import { MdDashboard, MdClose, MdExpandMore, MdGroup, MdPerson, MdSell, MdShoppingCart, } from "react-icons/md";

// components
import Image from '../components/media/Image';
import Button from '../components/Button';

// theme
import theme from '../theme/theme';

// store
import useSidebarStore from "../store/useSidebarStore";

import menuItems from './sidebarItems';

const AdminSidebar = () => {

  const location = useLocation();

  const mainLogo = 'https://res.cloudinary.com/dyiuqcqg2/image/upload/v1792159234/adminflow1_gkjr61.png'
  const miniLogo = 'https://res.cloudinary.com/dyiuqcqg2/image/upload/v1792157864/adminflow_mini_kngjua.png'

  const { isCollapsed, isMobileOpen, toggleCollapse, closeMobileSidebar, } = useSidebarStore();

  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    if (isCollapsed && !isMobileOpen) {
      setOpenMenu(null);
      return;
    }

    const activeParent = menuItems.find((item) =>
      item.children?.some((child) => location.pathname.startsWith(child.path))
    );

    if (activeParent) {
      setOpenMenu(activeParent.label);
    }
  }, [location.pathname, isCollapsed, isMobileOpen]);

  const showText = !isCollapsed || isMobileOpen;

  const handleAccordion = (label) => {
    if (isCollapsed && !isMobileOpen) {
      toggleCollapse();
      setOpenMenu(label);
      return;
    }

    setOpenMenu((prev) => (prev === label ? null : label));
  };

  const closeAllAccordions = () => {
    setOpenMenu(null);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-99 bg-black/40 lg:hidden"
          onClick={closeMobileSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-99 flex h-screen w-64 flex-col overflow-hidden ${theme.bg_primary}
          transition-all duration-300 ease-in-out
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:sticky lg:top-0 lg:translate-x-0
          ${isCollapsed ? "lg:w-20" : "lg:w-64"}`}
      >
        {/* Header */}
        <div
          className={`flex h-17 min-h-17 shrink-0 items-center ${showText ? "justify-between px-4" : "justify-center px-2 "
            }`}
        >
          <NavLink
            to="/admin"
            className="flex h-full min-w-0 items-center justify-center"
            onClick={() => {
              closeAllAccordions();
              closeMobileSidebar();
            }}
          >
            <Image
              src={showText ? mainLogo : miniLogo}
              alt="logo"
              className={`object-contain ${showText ? "h-16 w-auto max-w-44 rounded" : "h-10 w-10"
                }`}
            />
          </NavLink>

          {/* Mobile Close */}
          <Button
            type="button"
            // variant="normal"
            onClick={closeMobileSidebar}
            icon={MdClose}
            iconSize={25}
            className={`cursor-pointer p-2! text-white lg:hidden  ${theme.bg_primary} ${theme.bg_primary_hover}
            hover:rotate-180 transition-all`}
          />
        </div>

        {/* Menu Title */}
        {showText && (
          <div className="shrink-0 px-5 py-3 text-xs font-semibold uppercase text-white">
            Menu
          </div>
        )}

        {/* Scroll Area */}
        <div className="scrollbar-none min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-3 pb-10">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isParentActive = item.children?.some((child) =>
                location.pathname.startsWith(child.path)
              );

              return (
                <div key={item.label}>
                  {item.children ? (
                    <>
                      {/* Accordion Header */}
                      <button
                        type="button"
                        onClick={() => handleAccordion(item.label)}
                        className={`flex w-full cursor-pointer items-center justify-between rounded px-4 py-2.5 text-sm transition-all duration-300 ${isParentActive
                          ? `bg-white font-semibold ${theme.text_primary}`
                          : `text-white hover:bg-white ${theme.text_primary_hover}`
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex shrink-0 items-center justify-center text-xl">
                            <item.icon />
                          </span>

                          {showText && (
                            <span className="whitespace-nowrap">
                              {item.label}
                            </span>
                          )}
                        </div>

                        {showText && (
                          <MdExpandMore
                            className={`cursor-pointer text-xl transition-transform duration-300 ${openMenu === item.label ? "rotate-180" : ""
                              }`}
                          />
                        )}
                      </button>

                      {/* Accordion Content */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ${!isCollapsed && openMenu === item.label
                          ? "mt-1 max-h-250"
                          : "max-h-0"
                          }`}
                      >
                        <div className="ml-10 space-y-1">
                          {item.children.map((child, index) => (
                            <NavLink
                              key={`${child.path}-${index}`}
                              to={child.path}
                              onClick={() => {
                                setOpenMenu(item.label);
                                closeMobileSidebar();
                              }}
                              className={({ isActive }) =>
                                `flex items-center rounded px-4 py-2.5 text-sm transition-all duration-300 ${isActive
                                  ? `bg-white font-semibold ${theme.text_primary}`
                                  : `text-white hover:bg-white  ${theme.text_primary_hover}`
                                }`
                              }
                            >
                              {child.label}
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    /* Normal Menu Item */
                    <NavLink
                      to={item.path}
                      end={item.path === "/admin"}
                      onClick={() => {
                        closeAllAccordions();
                        closeMobileSidebar();
                      }}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded px-4 py-2.5 text-sm transition-all duration-300 ${isActive
                          ? `bg-white font-semibold ${theme.text_primary}`
                          : `text-white hover:bg-white  ${theme.text_primary_hover}`
                        }`
                      }
                    >
                      <span className="flex shrink-0 items-center justify-center text-xl">
                        <item.icon />
                      </span>

                      {showText && (
                        <span className="whitespace-nowrap">
                          {item.label}
                        </span>
                      )}
                    </NavLink>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;