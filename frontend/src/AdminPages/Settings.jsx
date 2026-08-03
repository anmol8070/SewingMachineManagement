import React, { useState } from 'react';
import {
  MdStorefront,
  MdPeopleOutline,
  MdBuildCircle,
  MdSave,
} from 'react-icons/md';
import {
  LuShieldCheck,
  LuHardDriveDownload,
  LuWrench,
} from 'react-icons/lu';

// ── Settings Nav Items ──────────────────────────────────────────

const navItems = [
  { id: 'general',  label: 'General Shop',    icon: <MdStorefront size={20} /> },
  { id: 'users',    label: 'User Management', icon: <MdPeopleOutline size={20} /> },
  { id: 'service',  label: 'Service Config',  icon: <LuWrench size={18} /> },
  { id: 'security', label: 'Security & Alert',icon: <LuShieldCheck size={18} /> },
  { id: 'backup',   label: 'Backup & Updates',icon: <LuHardDriveDownload size={18} /> },
];

// ── Panel: General Shop ─────────────────────────────────────────

const GeneralShopPanel = () => (
  <div className="flex flex-col gap-7">
    {/* Panel Header */}
    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
      <div>
        <h2 className="text-[22px] font-bold text-[#1e2b4d] tracking-tight">General Shop Profile</h2>
        <p className="text-slate-500 text-[13px] mt-1">Manage your public identity and regional settings.</p>
      </div>
      <button className="flex items-center gap-2 bg-[#0b1c3c] hover:bg-[#1e2b4d] text-white px-6 py-2.5 rounded-lg text-[14px] font-bold transition-colors shadow-sm shrink-0 self-start sm:self-auto">
        Save Changes
      </button>
    </div>

    {/* Form Grid */}
    <div className="flex flex-col gap-5">
      {/* Row 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-slate-600">Shop Name</label>
          <input
            type="text"
            defaultValue="SewPro Industrial Hub"
            className="w-full px-4 py-3 border border-slate-200 rounded-lg text-[14px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#1e2b4d]/20 focus:border-[#1e2b4d]/40 transition-all"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-slate-600">Contact Email</label>
          <input
            type="email"
            defaultValue="admin@sewpro.com"
            className="w-full px-4 py-3 border border-slate-200 rounded-lg text-[14px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#1e2b4d]/20 focus:border-[#1e2b4d]/40 transition-all"
          />
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-slate-600">Phone Number</label>
          <input
            type="tel"
            defaultValue="+1 (555) 098-7654"
            className="w-full px-4 py-3 border border-slate-200 rounded-lg text-[14px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#1e2b4d]/20 focus:border-[#1e2b4d]/40 transition-all"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-slate-600">Currency</label>
          <div className="relative">
            <select
              defaultValue="usd"
              className="w-full appearance-none px-4 py-3 border border-slate-200 rounded-lg text-[14px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#1e2b4d]/20 focus:border-[#1e2b4d]/40 transition-all cursor-pointer pr-10"
            >
              <option value="usd">USD ($)</option>
              <option value="eur">EUR (€)</option>
              <option value="gbp">GBP (£)</option>
              <option value="inr">INR (₹)</option>
            </select>
            <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[11px]">▼</div>
          </div>
        </div>
      </div>

      {/* Row 3 — Full width */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-semibold text-slate-600">Shop Address</label>
        <textarea
          defaultValue="123 Precision Way, Industrial Park West, SE 44092"
          rows={4}
          className="w-full px-4 py-3 border border-slate-200 rounded-lg text-[14px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#1e2b4d]/20 focus:border-[#1e2b4d]/40 transition-all resize-none"
        />
      </div>
    </div>
  </div>
);

// ── Placeholder Panels ──────────────────────────────────────────

const PlaceholderPanel = ({ title, subtitle }) => (
  <div className="flex flex-col gap-4">
    <div>
      <h2 className="text-[22px] font-bold text-[#1e2b4d] tracking-tight">{title}</h2>
      <p className="text-slate-400 text-[13px] mt-1">{subtitle}</p>
    </div>
    <div className="border-2 border-dashed border-slate-200 rounded-xl p-12 flex items-center justify-center text-slate-300 text-[14px] font-semibold">
      {title} settings coming soon.
    </div>
  </div>
);

const panels = {
  general:  <GeneralShopPanel />,
  users:    <PlaceholderPanel title="User Management" subtitle="Manage admin roles and access control." />,
  service:  <PlaceholderPanel title="Service Config" subtitle="Configure service schedules and thresholds." />,
  security: <PlaceholderPanel title="Security & Alert" subtitle="Set up alerts, passwords and 2FA." />,
  backup:   <PlaceholderPanel title="Backup & Updates" subtitle="Manage system backups and OS updates." />,
};

// ── Main Component ──────────────────────────────────────────────

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="w-full max-w-[1100px] mx-auto pb-12 flex flex-col gap-8">

      {/* Page Header */}
      <div>
        <h1 className="text-[28px] font-bold text-[#1e2b4d] tracking-tight">
          Precision Stitch OS Settings
        </h1>
        <p className="text-slate-500 text-[14px] mt-1.5">
          Configure your industrial workflow and shop preferences.
        </p>
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col md:flex-row gap-8">

        {/* Left Nav */}
        <nav className="flex flex-col gap-1 md:w-[240px] shrink-0">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3.5 px-5 py-3 rounded-xl text-[14px] font-semibold transition-all text-left w-full ${
                activeTab === item.id
                  ? 'bg-[#0b1c3c] text-white shadow-sm'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-[#1e2b4d]'
              }`}
            >
              <span className={activeTab === item.id ? 'text-white' : 'text-slate-400'}>
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Panel */}
        <div className="flex-1 min-w-0">
          {panels[activeTab]}
        </div>

      </div>
    </div>
  );
};

export default Settings;
