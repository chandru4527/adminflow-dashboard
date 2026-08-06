import React, { useState, useRef, useEffect } from "react";
import {
  MdFullscreen,
  MdFullscreenExit,
  MdMenu,
  MdLogout,
  MdPerson,
} from "react-icons/md";
import { useMatches } from "react-router-dom";

const Navbar = ({ collapsed, setCollapsed, setMobileOpen }) => {
  const matches = useMatches();
  const title = matches[matches.length - 1]?.handle?.title || "Dashboard";

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Keep fullscreen state in sync
  useEffect(() => {
    const handleChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleChange);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleFullScreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error("Fullscreen error:", err);
    }
  };

  const handleLogout = () => {
    setUserMenuOpen(false);
    console.log("Logout");

  };

  return (
    <header className="sticky top-0 z-50 flex h-17 items-center justify-between border-b border-gray-200 bg-white px-2">

      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => {
            if (window.innerWidth < 1024) {
              setMobileOpen(true);
            } else {
              setCollapsed((prev) => !prev);
            }
          }}
          className="cursor-pointer p-2"
        >
          <MdMenu className="text-2xl" />
        </button>

        <h1 className="text-lg font-bold capitalize text-gray-800">
          {title}
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">

        <button
          onClick={toggleFullScreen}
          className="rounded p-2 hover:bg-gray-100 cursor-pointer"
        >
          {isFullScreen ? (
            <MdFullscreenExit size={24} />
          ) : (
            <MdFullscreen size={24} />
          )}
        </button>

        {/* User Menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="rounded-full p-1 hover:bg-gray-100"
          >
            <MdPerson size={32} className="text-gray-700" />
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-44 rounded-lg border border-gray-200 bg-white shadow-lg">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-gray-100"
              >
                <MdLogout size={20} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;