import React, { useState, useEffect } from "react";
import { useMatches } from "react-router-dom";

// icons
import { MdFullscreen, MdFullscreenExit, MdMenu, MdNotifications, } from "react-icons/md";

// components
import Avatar from '../components/Avatar';
import Button from '../components/Button';

// theme
import theme from '../theme/theme';



// store
import useAuthStore from '../store/authStore';
import useSidebarStore from "../store/useSidebarStore";

const AdminNavbar = () => {

  const matches = useMatches();

  const { user } = useAuthStore();

  const { toggleCollapse, toggleMobileSidebar } = useSidebarStore();

  const title = matches[matches.length - 1]?.handle?.title || "Dashboard";

  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const handleChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleChange);

    return () =>
      document.removeEventListener("fullscreenchange", handleChange);
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

  const handleMenuClick = () => {
    if (window.innerWidth < 1024) {
      toggleMobileSidebar();
    } else {
      toggleCollapse();
    }
  };



  return (
    <header className="sticky top-0 z-50 flex h-17 items-center justify-between border-b border-gray-200 bg-white px-2">
      {/* Left */}
      <div className="flex items-center gap-4">

        <Button
          onClick={handleMenuClick}
          variant="normal"
          className="cursor-pointer p-2"
          icon={MdMenu}
        />

        <h1 className="text-lg font-bold capitalize text-gray-800">
          {title}
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <Button
          variant="normal"
          className={`rounded p-2! ${theme.text_primary} cursor-pointer`}
          icon={MdNotifications}
          iconSize={22}
        />

        <Avatar size="xs" src={user?.profileImage} ring alt={user?.name} to="profile" />

        <Button
          onClick={toggleFullScreen}
          variant="normal"
          className="rounded p-2! hover:bg-gray-100 cursor-pointer"
          icon={isFullScreen ? MdFullscreenExit : MdFullscreen}
          iconClassName="text-lg"
        />

      </div>

    </header>
  );
};

export default AdminNavbar;