import React from "react";
import { LuSearch, LuBell } from "react-icons/lu";
import { MdHelpOutline } from "react-icons/md";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200 w-full h-[72px]">
      {/* Left side - Brand / Title */}
      <div className="flex items-center">
        <h1 className="text-[20px] font-extrabold text-[#1e2b4d] tracking-tight font-sans">
          ThreadMasters Pro
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
            placeholder="Search industrial assets..."
            className="w-[360px] pl-10 pr-4 py-2.5 bg-[#f4f6f9] border border-slate-200 rounded-md text-[14px] text-slate-700 placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#1e2b4d]/20 focus:border-[#1e2b4d]/50 transition-all shadow-sm"
          />
        </div>

        {/* Actions Container */}
        <div className="flex items-center gap-5">
          {/* Icons */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="text-[#64748b] hover:text-[#1e2b4d] transition-colors focus:outline-none"
              aria-label="Notifications"
            >
              <LuBell size={22} />
            </button>
            <button
              type="button"
              className="text-[#64748b] hover:text-[#1e2b4d] transition-colors focus:outline-none"
              aria-label="Help & Support"
            >
              <MdHelpOutline size={22} />
            </button>
          </div>

          {/* Vertical Divider */}
          <div className="h-7 w-[1px] bg-slate-200 mx-1" />

          {/* Support Text Button */}
          <button
            type="button"
            className="text-[15px] font-bold text-[#1e2b4d] hover:opacity-80 transition-opacity focus:outline-none"
          >
            Support
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
