import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LuLayoutGrid,
  LuPackage,
  LuSettings,
  LuMenu,
  LuX,
  LuChevronDown,
  LuChevronUp,
  LuShoppingBag,
  LuWrench,
  LuUsers,
  LuDollarSign,
  LuCalculator,
  LuFileSpreadsheet,
  LuActivity
} from "react-icons/lu";

const menuItems = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: LuLayoutGrid
  },
  {
    name: "Sales",
    icon: LuShoppingBag,
    sub: [
      { name: "New Bill", path: "/admin/sales/new-bill" },
      { name: "Sales History", path: "/admin/sales/history" },
      { name: "Returns", path: "/admin/sales/returns" }
    ]
  },
  {
    name: "Inventory",
    icon: LuPackage,
    sub: [
      { name: "Products", path: "/admin/inventory/products" },
      { name: "Purchases", path: "/admin/inventory/purchases" },
      { name: "Suppliers", path: "/admin/inventory/suppliers" }
    ]
  },
  {
    name: "Service",
    icon: LuWrench,
    sub: [
      { name: "New Service Job", path: "/admin/service/new-job" },
      { name: "Pending Jobs", path: "/admin/service/pending" },
      { name: "Ready for Delivery", path: "/admin/service/ready" },
      { name: "Service History", path: "/admin/service/history" },
      { name: "Service Analytics", path: "/admin/service/analytics" }
    ]
  },
  {
    name: "Customers",
    icon: LuUsers,
    sub: [
      { name: "Customer List", path: "/admin/customers/list" },
      { name: "Outstanding / Udhaar", path: "/admin/customers/outstanding" }
    ]
  },
  {
    name: "Payments",
    path: "/admin/payments",
    icon: LuDollarSign
  },
  {
    name: "Expenses",
    path: "/admin/expenses",
    icon: LuCalculator
  },
  {
    name: "Reports",
    path: "/admin/reports",
    icon: LuFileSpreadsheet
  },
  {
    name: "Settings",
    path: "/admin/settings",
    icon: LuSettings
  }
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({
    Sales: true,
    Inventory: true,
    Service: true,
    Customers: true
  });
  const location = useLocation();

  const toggleSubmenu = (name) => {
    setExpandedMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const isActivePath = (path) => location.pathname === path;
  const isParentActive = (item) => {
    if (item.path) return isActivePath(item.path);
    if (item.sub) {
      return item.sub.some((subItem) => isActivePath(subItem.path));
    }
    return false;
  };

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
        className={`fixed inset-y-0 left-0 z-40 w-[260px] bg-[#f0f2f5] dark:bg-[#1e293b] border-r border-slate-200/60 dark:border-slate-700/60 flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
         } md:relative md:translate-x-0 overflow-y-auto`}
      >
        {/* Logo / Brand */}
        <div className="px-6 pt-6 pb-6 shrink-0">
          <h1 className="text-[20px] font-bold text-[#1e2b4d] dark:text-white leading-tight transition-colors duration-200">
            SewPro Shop
          </h1>
          <p className="text-[9px] font-bold text-slate-400 mt-1.5 tracking-[0.18em] uppercase">
            Retail & Service
          </p>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 flex flex-col gap-1 px-4 pb-6">
          {menuItems.map((item) => {
            const hasSub = !!item.sub;
            const isExpanded = expandedMenus[item.name];
            const active = isParentActive(item);

            if (!hasSub) {
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-[14px] font-medium transition-all ${
                      isActive
                        ? "bg-[#dae5f5] text-[#1e293b] font-bold dark:bg-blue-900/40 dark:text-blue-100"
                        : "text-[#4a5568] hover:bg-[#e4e9f0] hover:text-[#1e293b] dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                    }`
                  }
                >
                  <item.icon
                    size={18}
                    className={active ? "text-[#2d4a7a] dark:text-blue-400" : "text-[#7a8a9e] dark:text-slate-500"}
                  />
                  {item.name}
                </NavLink>
              );
            }

            return (
              <div key={item.name} className="flex flex-col">
                <button
                  onClick={() => toggleSubmenu(item.name)}
                  className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-[14px] font-medium transition-all text-[#4a5568] hover:bg-[#e4e9f0] hover:text-[#1e293b] dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white ${
                    active ? "text-[#1e2b4d] font-bold bg-[#e8ecf2]/55 dark:bg-slate-800/55 dark:text-white" : ""
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <item.icon
                      size={18}
                      className={active ? "text-[#2d4a7a] dark:text-blue-400" : "text-[#7a8a9e] dark:text-slate-500"}
                    />
                    <span>{item.name}</span>
                  </div>
                  {isExpanded ? <LuChevronUp size={15} /> : <LuChevronDown size={15} />}
                </button>

                {isExpanded && (
                  <div className="pl-9 pr-2 mt-1 flex flex-col gap-0.5 border-l border-slate-300/40 dark:border-slate-700/60 ml-6">
                    {item.sub.map((subItem) => {
                      const subActive = isActivePath(subItem.path);
                      return (
                        <NavLink
                          key={subItem.path}
                          to={subItem.path}
                          onClick={() => setIsOpen(false)}
                          className={`px-3 py-2 rounded-lg text-[13px] font-medium transition-all ${
                            subActive
                              ? "bg-[#dae5f5] text-[#1e293b] font-bold dark:bg-blue-900/40 dark:text-blue-100"
                              : "text-[#4a5568] hover:bg-[#e4e9f0]/60 hover:text-[#1e293b] dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-white"
                          }`}
                        >
                          {subItem.name}
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* User Profile at bottom */}
        <div className="p-4 mx-3 mb-4 shrink-0">
          <div className="h-[1px] bg-slate-300/60 dark:bg-slate-700/60 mb-4" />
          <div className="flex items-center gap-3 px-2 py-1.5">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150"
              alt="Store Manager"
              className="w-9 h-9 rounded-full object-cover border-2 border-white dark:border-slate-800 shadow-sm shrink-0 transition-colors"
            />
            <div className="flex flex-col">
              <span className="text-[13px] font-bold text-[#1e293b] dark:text-white leading-tight">Umar Farukh</span>
              <span className="text-[11px] text-[#64748b] dark:text-slate-400 font-medium leading-tight mt-0.5">Shop Owner</span>
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
