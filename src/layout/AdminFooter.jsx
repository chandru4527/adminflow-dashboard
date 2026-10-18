import React from "react";
import { MdFavorite } from "react-icons/md";

const AdminFooter = () => {
  return (
    <footer className="flex min-h-14 shrink-0 flex-wrap items-center justify-between gap-2 border-t border-slate-200 bg-white px-4 py-3 sm:px-6">
      <p className="text-xs text-slate-500 sm:text-sm">
        © {new Date().getFullYear()} AdminFlow. All rights reserved.
      </p>
      <p className="flex items-center gap-1.5 text-xs text-slate-500 sm:text-sm">
        Designed & developed with
        <MdFavorite className="text-red-500" />
        by <span className="font-bold text-slate-800">CK</span>
      </p>
    </footer>
  );
};

export default AdminFooter;