import React from "react";
import { FaBars } from "react-icons/fa";
import { useMatches } from "react-router-dom";

const Navbar = ({ collapsed, setCollapsed ,setMobileOpen}) => {

  const matches = useMatches();
  const title = matches[matches.length - 1]?.handle?.title || "Dashboard";

  return (
    <header className="h-16 sticky top-0 z-10 bg-white border-b border-gray-200 px-6 flex items-center justify-between">

      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => {

            if (window.innerWidth < 998) {
              setMobileOpen(true);
            }
            else {
              setCollapsed(!collapsed);
            }

          }}
          className="p-2"
        >
          <FaBars />
        </button>

        <h1 className="text-lg font-bold text-gray-800 uppercase">
          {title}
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 cursor-pointer">
        <div className="hidden sm:block text-right">
          <p className="text-sm font-semibold text-gray-800">Chandru</p>
          <p className="text-xs text-gray-500">Admin</p>
        </div>

        <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
          C
        </div>
      </div>

    </header>
  );
};

export default Navbar;