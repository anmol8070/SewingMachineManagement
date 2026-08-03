import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LuLayoutGrid,
  LuPackage,
  LuSettings,
  LuMenu,
  LuX,
} from "react-icons/lu";
import { MdOutlineCreditCard, MdBarChart } from "react-icons/md";

const menuItems = [
  { name: "Dashboard", path: "/admin/dashboard", icon: LuLayoutGrid },
  { name: "Inventory", path: "/admin/inventory", icon: LuPackage },
  { name: "Sales",     path: "/admin/sales",     icon: MdOutlineCreditCard },
  { name: "Service",   path: "/admin/service",   icon: LuSettings },
  { name: "Reports",   path: "/admin/reports",   icon: MdBarChart },
  { name: "Settings",  path: "/admin/settings",  icon: LuSettings },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2.5 bg-[#1e2b4d] text-white rounded-md shadow-md focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        {isOpen ? <LuX size={22} /> : <LuMenu size={22} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-[260px] bg-[#f0f2f5] border-r border-slate-200/60 flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        {/* Logo / Brand */}
        <div className="px-6 pt-8 pb-10">
          <h1 className="text-[21px] font-bold text-[#1e2b4d] leading-tight">
            SewPro<br />Manager
          </h1>
          <p className="text-[9px] font-bold text-slate-400 mt-2 tracking-[0.18em] uppercase">
            Industrial Control
          </p>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 flex flex-col gap-1.5 px-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3.5 rounded-xl text-[14.5px] font-medium transition-all ${
                  isActive
                    ? "bg-[#dae5f5] text-[#1e293b]"
                    : "text-[#4a5568] hover:bg-[#e4e9f0] hover:text-[#1e293b]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    size={20}
                    className={isActive ? "text-[#2d4a7a]" : "text-[#7a8a9e]"}
                  />
                  {item.name}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User Profile at bottom */}
        <div className="p-4 mx-3 mb-4 mt-2">
          <div className="h-[1px] bg-slate-300/60 mb-4" />
          <div className="flex items-center gap-3 px-2 py-2">
            <img
              src="https://i.pravatar.cc/150?img=11"
              alt="Admin User"
              className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm shrink-0"
            />
            <div className="flex flex-col">
              <span className="text-[13px] font-bold text-[#1e293b] leading-tight">Admin User</span>
              <span className="text-[11px] text-[#64748b] font-medium leading-tight mt-0.5">System Root</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-slate-900/40 z-30 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Sidebar;
