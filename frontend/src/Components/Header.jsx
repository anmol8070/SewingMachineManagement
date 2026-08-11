import React, { useState, useEffect } from "react";
import { LuSearch, LuBell, LuSun, LuMoon } from "react-icons/lu";
import { MdHelpOutline } from "react-icons/md";
import { store } from "../utils/store";
import { useTheme } from "../utils/ThemeContext";

const Header = () => {
  const [settings, setSettings] = useState(store.getSettings());
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleUpdate = () => {
      setSettings(store.getSettings());
    };
    window.addEventListener("sewpro_db_update", handleUpdate);
    return () => window.removeEventListener("sewpro_db_update", handleUpdate);
  }, []);

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white dark:bg-[#0f172a] border-b border-slate-200 dark:border-slate-800 w-full h-[72px] shrink-0 transition-colors duration-200">
      {/* Left side - Brand / Title */}
      <div className="flex items-center">
        <h1 className="text-[20px] font-extrabold text-[#1e2b4d] dark:text-white tracking-tight font-sans">
          {settings.shopName || "SewPro Shop"}
        </h1>
      </div>

      {/* Right side - Search and Actions */}
      <div className="flex items-center gap-7">
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <LuSearch
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748b] dark:text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search bills, customers, jobs..."
            className="w-[300px] pl-10 pr-4 py-2 bg-[#f4f6f9] dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-md text-[13px] text-slate-700 dark:text-slate-200 placeholder-[#94a3b8] dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#1e2b4d]/20 dark:focus:ring-blue-500/50 focus:border-[#1e2b4d]/50 dark:focus:border-blue-500/50 transition-all shadow-sm"
          />
        </div>

        {/* Actions Container */}
        <div className="flex items-center gap-5">
          {/* Icons */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              type="button"
              className="text-[#64748b] hover:text-[#1e2b4d] dark:text-slate-400 dark:hover:text-white transition-colors focus:outline-none"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <LuSun size={20} /> : <LuMoon size={20} />}
            </button>
            <button
              type="button"
              className="text-[#64748b] hover:text-[#1e2b4d] dark:text-slate-400 dark:hover:text-white transition-colors focus:outline-none relative"
              aria-label="Notifications"
            >
              <LuBell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
            </button>
          </div>

          {/* Vertical Divider */}
          <div className="h-7 w-[1px] bg-slate-200 dark:bg-slate-700 mx-1" />

          {/* User Role Tag */}
          <div className="bg-[#dae5f5] dark:bg-blue-900/30 text-[#1e2b4d] dark:text-blue-300 px-3 py-1 rounded text-[11px] font-bold uppercase tracking-wider">
            POS Terminal Active
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
