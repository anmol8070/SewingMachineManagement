import React, { useState, useEffect } from 'react';
import {
  MdStorefront,
  MdPeopleOutline,
  MdBuildCircle,
  MdOutlineCreditCard,
  MdSecurity,
  MdSettingsBackupRestore
} from 'react-icons/md';
import { store } from '../utils/store';

const Settings = () => {
  const [dbSettings, setDbSettings] = useState(store.getSettings());
  const [activeTab, setActiveTab] = useState('general');

  // Input states
  const [shopName, setShopName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [gstin, setGstin] = useState('');
  const [pan, setPan] = useState('');
  const [currency, setCurrency] = useState('₹');

  const [invoicePrefix, setInvoicePrefix] = useState('INV-2026-');
  const [startingNumber, setStartingNumber] = useState('1001');
  const [defaultGst, setDefaultGst] = useState('18');
  const [defaultDiscount, setDefaultDiscount] = useState('0');

  const [enableCredit, setEnableCredit] = useState(true);
  const [creditLimit, setCreditLimit] = useState('50000');
  const [dueDays, setDueDays] = useState('30');

  const [inspectionCharges, setInspectionCharges] = useState('150');
  const [servicePrefix, setServicePrefix] = useState('SRV-2026-');

  const [defaultWarrantyMonths, setDefaultWarrantyMonths] = useState('12');

  useEffect(() => {
    // Populate form values from localStorage database settings
    setShopName(dbSettings.shopName || '');
    setPhone(dbSettings.phone || '');
    setEmail(dbSettings.email || '');
    setAddress(dbSettings.address || '');
    setGstin(dbSettings.gstin || '');
    setPan(dbSettings.pan || '');
    setCurrency(dbSettings.currency || '₹');

    setInvoicePrefix(dbSettings.invoicePrefix || '');
    setStartingNumber(dbSettings.startingNumber || '1001');
    setDefaultGst(dbSettings.defaultGst || '18');
    setDefaultDiscount(dbSettings.defaultDiscount || '0');

    setEnableCredit(dbSettings.enableCredit !== false);
    setCreditLimit(dbSettings.creditLimit || '50000');
    setDueDays(dbSettings.dueDays || '30');

    setInspectionCharges(dbSettings.inspectionCharges || '150');
    setServicePrefix(dbSettings.servicePrefix || 'SRV-2026-');

    setDefaultWarrantyMonths(dbSettings.defaultWarrantyMonths || '12');
  }, [dbSettings]);

  const handleSave = (e) => {
    e.preventDefault();
    store.updateSettings({
      shopName,
      phone,
      email,
      address,
      gstin,
      pan,
      currency,
      invoicePrefix,
      startingNumber: parseInt(startingNumber) || 1001,
      defaultGst: parseFloat(defaultGst) || 18,
      defaultDiscount: parseFloat(defaultDiscount) || 0,
      enableCredit,
      creditLimit: parseFloat(creditLimit) || 50000,
      dueDays: parseInt(dueDays) || 30,
      inspectionCharges: parseFloat(inspectionCharges) || 150,
      servicePrefix,
      defaultWarrantyMonths: parseInt(defaultWarrantyMonths) || 12
    });
    alert("Settings saved successfully!");
  };

  const handleResetData = () => {
    if (confirm("Are you sure you want to reset all mock store data back to original defaults? This will erase new transactions.")) {
      store.resetData();
      alert("Database reset completed.");
      window.location.reload();
    }
  };

  const navItems = [
    { id: 'general',  label: 'General Shop',    icon: <MdStorefront size={20} /> },
    { id: 'billing',  label: 'Billing & Tax',   icon: <MdOutlineCreditCard size={20} /> },
    { id: 'credit',   label: 'Credit / Udhaar', icon: <MdSecurity size={20} /> },
    { id: 'service',  label: 'Service Desk',    icon: <MdBuildCircle size={20} /> },
    { id: 'backup',   label: 'Backup / Reset',  icon: <MdSettingsBackupRestore size={20} /> },
  ];

  return (
    <div className="w-full max-w-[1100px] mx-auto pb-12 flex flex-col gap-8">
      <div>
        <h1 className="text-[28px] font-bold text-[#1e2b4d] tracking-tight">Shop Settings</h1>
        <p className="text-slate-500 text-[14px] mt-1.5">Configure bill parameters, default warranty duration and POS rules.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Nav */}
        <nav className="flex flex-col gap-1 md:w-[240px] shrink-0">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3.5 px-5 py-3 rounded-xl text-[13px] font-bold transition-all text-left w-full ${
                activeTab === item.id
                  ? 'bg-[#0b1c3c] text-white shadow-sm'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-[#1e2b4d]'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Form Panels */}
        <form onSubmit={handleSave} className="flex-1 bg-white rounded-xl p-6 shadow-sm border border-slate-200/60 min-h-[400px] flex flex-col justify-between">
          <div className="space-y-6">
            {activeTab === 'general' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#1e2b4d] border-b border-slate-100 pb-2">General Shop Settings</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Shop Name</label>
                    <input type="text" value={shopName} onChange={(e) => setShopName(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded text-xs focus:outline-none"/>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Phone Number</label>
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded text-xs focus:outline-none"/>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded text-xs focus:outline-none"/>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Currency Symbol</label>
                    <input type="text" value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded text-xs focus:outline-none"/>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">GSTIN Number</label>
                    <input type="text" value={gstin} onChange={(e) => setGstin(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded text-xs focus:outline-none"/>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">PAN Number</label>
                    <input type="text" value={pan} onChange={(e) => setPan(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded text-xs focus:outline-none"/>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Shop Address</label>
                  <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded text-xs focus:outline-none"/>
                </div>
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#1e2b4d] border-b border-slate-100 pb-2">Billing & Invoicing Rules</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Invoice Prefix</label>
                    <input type="text" value={invoicePrefix} onChange={(e) => setInvoicePrefix(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded text-xs focus:outline-none"/>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Starting Serial Number</label>
                    <input type="number" value={startingNumber} onChange={(e) => setStartingNumber(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded text-xs focus:outline-none"/>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Default GST %</label>
                    <input type="number" value={defaultGst} onChange={(e) => setDefaultGst(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded text-xs focus:outline-none"/>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Default Discount</label>
                    <input type="number" value={defaultDiscount} onChange={(e) => setDefaultDiscount(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded text-xs focus:outline-none"/>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'credit' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#1e2b4d] border-b border-slate-100 pb-2">Credit / Udhaar Settings</h3>
                
                <div className="flex items-center gap-2 py-2">
                  <input type="checkbox" checked={enableCredit} onChange={(e) => setEnableCredit(e.target.checked)} className="rounded text-blue-600 focus:ring-blue-500"/>
                  <span className="text-xs font-bold text-slate-600">Enable Customer Credit/Udhaar purchases</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Default Credit Limit ({currency})</label>
                    <input type="number" value={creditLimit} onChange={(e) => setCreditLimit(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded text-xs focus:outline-none"/>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Default Payment Due Days</label>
                    <input type="number" value={dueDays} onChange={(e) => setDueDays(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded text-xs focus:outline-none"/>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'service' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#1e2b4d] border-b border-slate-100 pb-2">Service config</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Service Inspection Charges</label>
                    <input type="number" value={inspectionCharges} onChange={(e) => setInspectionCharges(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded text-xs focus:outline-none"/>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Default Machine Warranty (Months)</label>
                    <input type="number" value={defaultWarrantyMonths} onChange={(e) => setDefaultWarrantyMonths(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded text-xs focus:outline-none"/>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'backup' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#1e2b4d] border-b border-slate-100 pb-2">Backup & Diagnostics</h3>
                <p className="text-xs text-slate-500">Restore application settings or export mock transactions database to file.</p>
                
                <div className="pt-4 flex flex-wrap gap-2">
                  <button type="button" onClick={handleResetData} className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded transition-colors">
                    Reset Local Storage DB
                  </button>
                  <button type="button" onClick={() => alert("Creating database backup...")} className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-xs rounded transition-colors">
                    Backup Now
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-end">
            <button type="submit" className="px-5 py-2.5 bg-[#0b1c3c] hover:bg-[#1e2b4d] text-white font-bold text-xs rounded-md shadow-sm transition-colors">
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
