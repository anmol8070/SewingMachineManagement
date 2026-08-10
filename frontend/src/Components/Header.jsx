import React, { useState, useEffect } from "react";
import { LuSearch, LuBell } from "react-icons/lu";
import { MdHelpOutline } from "react-icons/md";
import { store } from "../utils/store";

const Header = () => {
  const [settings, setSettings] = useState(store.getSettings());

  useEffect(() => {
    const handleUpdate = () => {
      setSettings(store.getSettings());
    };
    window.addEventListener("sewpro_db_update", handleUpdate);
    return () => window.removeEventListener("sewpro_db_update", handleUpdate);
  }, []);

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200 w-full h-[72px] shrink-0">
      {/* Left side - Brand / Title */}
      <div className="flex items-center">
        <h1 className="text-[20px] font-extrabold text-[#1e2b4d] tracking-tight font-sans">
          {settings.shopName || "SewPro Shop"}
        </h1>
      </div>

      {/* Right side - Search and Actions */}
      <div className="flex items-center gap-7">
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <LuSearch
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748b]"
            size={18}
          />
          <input
            type="text"
            placeholder="Search bills, customers, jobs..."
            className="w-[300px] pl-10 pr-4 py-2 bg-[#f4f6f9] border border-slate-200 rounded-md text-[13px] text-slate-700 placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#1e2b4d]/20 focus:border-[#1e2b4d]/50 transition-all shadow-sm"
          />
        </div>

        {/* Actions Container */}
        <div className="flex items-center gap-5">
          {/* Icons */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="text-[#64748b] hover:text-[#1e2b4d] transition-colors focus:outline-none relative"
              aria-label="Notifications"
            >
              <LuBell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
            </button>
          </div>

          {/* Vertical Divider */}
          <div className="h-7 w-[1px] bg-slate-200 mx-1" />

          {/* User Role Tag */}
          <div className="bg-[#dae5f5] text-[#1e2b4d] px-3 py-1 rounded text-[11px] font-bold uppercase tracking-wider">
            POS Terminal Active
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
