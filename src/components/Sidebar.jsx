import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import logo from "../assets/images/logo2.svg";
import cooklogo from "../assets/images/cookdin.svg";

import {
  MdDashboard,
  MdPeople,
  MdCheckCircle,
  MdRoute,
  MdBarChart,
  MdSubscriptions,
  MdVolunteerActivism,
  MdRestaurant,
  MdSettings,
  MdExpandMore,
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
      {
        name: "All Users",
        path: "/admin/users",
      },
      {
        name: "Customers",
        path: "/admin/customers",
      },
      {
        name: "Chefs",
        path: "/admin/chefs",
      },
    ],
  },


  {
    name: "Approvals",
    icon: <MdCheckCircle />,
    children: [
      {
        name: "Chef Approval",
        path: "/admin/chef-approval",
      },
      {
        name: "User Approval",
        path: "/admin/user-approval",
      },
    ],
  },


  {
    name: "Booking Track",
    icon: <MdRoute />,
    children: [
      {
        name: "All Bookings",
        path: "/admin/bookings",
      },
      {
        name: "Pending Bookings",
        path: "/admin/bookings/pending",
      },
      {
        name: "Completed Bookings",
        path: "/admin/bookings/completed",
      },
    ],
  },


  {
    name: "Revenue Management",
    icon: <MdBarChart />,
    children: [
      {
        name: "Revenue",
        path: "/admin/revenue",
      },
      {
        name: "Transactions",
        path: "/admin/transactions",
      },
    ],
  },


  {
    name: "Subscription",
    path: "/admin/subscription",
    icon: <MdSubscriptions />,
  },


  {
    name: "Food Donation Tracking",
    path: "/admin/donation",
    icon: <MdVolunteerActivism />,
  },


  {
    name: "Services",
    path: "/admin/services",
    icon: <MdRestaurant />,
  },


  {
    name: "Admin Settings",
    path: "/admin/settings",
    icon: <MdSettings />,
  },
];

const Sidebar = ({ collapsed, mobileOpen, setMobileOpen }) => {

  const [openMenu, setOpenMenu] = useState(null);


  const handleAccordion = (name) => {
    setOpenMenu(
      openMenu === name ? null : name
    );
  };


  return (

    <aside
      className={`
    bg-[#14ae5c]
    h-screen
    transition-all duration-300
    fixed lg:static
    top-0 left-0
    z-50

    ${mobileOpen
          ? "translate-x-0"
          : "-translate-x-full lg:translate-x-0"
        }


    ${collapsed
          ? "lg:w-20 w-64"
          : "w-64"
        }
  `}
    >

      {/* Logo */}

      <div className="h-16 flex items-center justify-center">

        <img
          src={collapsed ? logo : cooklogo}
          alt="logo"
          className="h-10"
        />

      </div>


      {/* Menu Title */}

      {!collapsed && (
        <div className="
          px-5 py-3
          text-xs
          uppercase
          text-white
          font-semibold
        ">
          Menu
        </div>
      )}



      <nav className="px-3 space-y-1">


        {menuItems.map((item) => (


          <div key={item.name}>


            {/* Accordion */}

            {item.children ? (

              <>

                <button

                  onClick={() =>
                    handleAccordion(item.name)
                  }

                  className="
                    w-full
                    flex
                    items-center
                    justify-between
                    px-4
                    py-2.5
                    rounded-lg
                    text-sm
                    text-white
                    hover:text-black
                    transition-all
                  "

                >

                  <div className="flex items-center gap-3">

                    <span className="text-xl">
                      {item.icon}
                    </span>


                    {!collapsed && (
                      <span>
                        {item.name}
                      </span>
                    )}

                  </div>


                  {!collapsed && (

                    <MdExpandMore

                      className={`
                        text-xl
                        transition-transform
                        duration-300
                        ${openMenu === item.name
                          ? "rotate-180"
                          : ""
                        }
                      `}

                    />

                  )}


                </button>



                {/* Children */}

                <div
                  className={`
                    overflow-hidden
                    transition-all
                    duration-300
                    ${openMenu === item.name
                      ? "max-h-60 mt-1"
                      : "max-h-0"
                    }
                  `}
                >

                  <div className="ml-10 space-y-1">


                    {item.children.map((child) => (


                      <NavLink

                        key={child.path}

                        to={child.path}


                        className={({ isActive }) =>
                          `
                          block
                          py-2
                          text-sm
                          transition

                          ${isActive
                            ? "text-black font-semibold"
                            : "text-white hover:text-black"
                          }

                          `
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


                className={({ isActive }) =>
                  `
                  flex
                  items-center
                  gap-3
                  px-4
                  py-2.5
                  rounded-lg
                  text-sm
                  transition-all

                  ${isActive
                    ? "text-black font-semibold"
                    : "text-white hover:text-black"
                  }

                  `
                }

              >


                <span className="text-xl">
                  {item.icon}
                </span>


                {!collapsed && (
                  <span>
                    {item.name}
                  </span>
                )}


              </NavLink>


            )}


          </div>


        ))}


      </nav>


    </aside>

  );
};


export default Sidebar;