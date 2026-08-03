import React, { useState } from 'react';
import {
  MdPersonOutline,
  MdSave,
  MdReceiptLong,
  MdAddCircleOutline,
  MdDeleteOutline,
  MdLock,
  MdInfoOutline,
  MdVerified,
  MdAccountBalance,
} from 'react-icons/md';
import {
  LuShoppingBag,
  LuCreditCard,
  LuBanknote,
  LuSmartphone,
} from 'react-icons/lu';

const Sales = () => {
  const [paymentMethod, setPaymentMethod] = useState('Cash');

  const paymentOptions = [
    { label: 'Cash',          icon: <LuBanknote size={18} /> },
    { label: 'UPI',           icon: <LuSmartphone size={18} /> },
    { label: 'Card',          icon: <LuCreditCard size={18} /> },
    { label: 'Bank Transfer', icon: <MdAccountBalance size={18} /> },
  ];

  return (
    <div className="w-full max-w-[1100px] mx-auto pb-12 flex flex-col gap-6">

      {/* ── Breadcrumb ── */}
      <p className="text-[13px] text-slate-400 font-medium">
        Sales &rsaquo; <span className="font-bold text-[#1e2b4d]">Generate Bill</span>
      </p>

      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-[#1e2b4d] tracking-tight leading-tight">
            New Sale &amp; Warranty
          </h1>
          <p className="text-slate-500 text-[14px] mt-1.5">
            Generate a professional invoice and register product warranty.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button className="flex items-center gap-2 px-5 py-2.5 border border-slate-300 rounded-lg text-[13px] font-semibold text-[#1e2b4d] hover:bg-slate-50 transition-colors bg-white shadow-sm">
            <MdSave size={16} />
            Save as Draft
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#0b1c3c] hover:bg-[#1e2b4d] text-white rounded-lg text-[13px] font-bold transition-colors shadow-sm">
            <MdReceiptLong size={16} />
            Generate Bill &amp; Warranty
          </button>
        </div>
      </div>

      {/* ── Main Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">

        {/* ────────────── LEFT COLUMN ────────────── */}
        <div className="flex flex-col gap-5">

          {/* Customer Details Card */}
          <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-6 flex flex-col gap-5">
            {/* Card Header */}
            <div className="flex items-center gap-3 pb-3 border-b border-slate-200/60">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <MdPersonOutline size={22} />
              </div>
              <h2 className="text-[15px] font-bold text-[#1e2b4d]">Customer Details</h2>
            </div>

            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-slate-600">Full Name / Entity Name</label>
              <input
                type="text"
                placeholder="Enter name"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-[13px] text-slate-700 placeholder-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-[#1e2b4d]/20 focus:border-[#1e2b4d]/40 transition-all"
              />
            </div>

            {/* Mobile Number */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-slate-600">Mobile Number</label>
              <input
                type="tel"
                placeholder="+91  98765 43210"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-[13px] text-slate-700 placeholder-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-[#1e2b4d]/20 focus:border-[#1e2b4d]/40 transition-all"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-slate-600">Email Address (Optional)</label>
              <input
                type="email"
                placeholder="customer@example.com"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-[13px] text-slate-700 placeholder-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-[#1e2b4d]/20 focus:border-[#1e2b4d]/40 transition-all"
              />
            </div>

            {/* Billing Address */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-slate-600">Billing Address</label>
              <textarea
                placeholder="Street, City, State, ZIP"
                rows={4}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-[13px] text-slate-700 placeholder-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-[#1e2b4d]/20 focus:border-[#1e2b4d]/40 transition-all resize-none"
              />
            </div>
          </div>

          {/* Quick Help Card */}
          <div className="bg-[#0b1c3c] rounded-xl p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">Quick Help</p>
              <MdInfoOutline className="text-slate-400" size={18} />
            </div>
            <p className="text-[13px] text-slate-300 leading-relaxed">
              Generating a bill automatically triggers the 12-month manufacturer warranty. Ensure
              the mobile number is correct for SMS invoice delivery.
            </p>
          </div>
        </div>

        {/* ────────────── RIGHT COLUMN ────────────── */}
        <div className="flex flex-col gap-5">

          {/* Item Details Card */}
          <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-6 flex flex-col gap-5">
            {/* Card Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                  <LuShoppingBag size={20} />
                </div>
                <h2 className="text-[15px] font-bold text-[#1e2b4d]">Item Details</h2>
              </div>
              <button className="flex items-center gap-1.5 text-[13px] font-bold text-[#1e2b4d] hover:opacity-70 transition-opacity">
                <MdAddCircleOutline size={18} />
                Add Item
              </button>
            </div>

            {/* Item Row Header */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex flex-col gap-3">
              <div className="grid grid-cols-[1fr_160px_60px_110px_36px] gap-3 items-end">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Machine Model</label>
                  <div className="relative">
                    <select className="w-full appearance-none px-3 py-2.5 border border-slate-200 rounded-lg text-[13px] text-slate-600 bg-white focus:outline-none focus:ring-2 focus:ring-[#1e2b4d]/20 pr-8 cursor-pointer">
                      <option>Select Machine Model</option>
                      <option>Brother S-7300A</option>
                      <option>Juki DDL-8700</option>
                      <option>Singer 191D-20</option>
                      <option>Pfaff Powerline 3745</option>
                    </select>
                    <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400">▾</div>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Serial Number</label>
                  <input
                    type="text"
                    placeholder="SN-8293-1"
                    className="px-3 py-2.5 border border-slate-200 rounded-lg text-[13px] text-slate-600 bg-white focus:outline-none focus:ring-2 focus:ring-[#1e2b4d]/20 transition-all w-full"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Qty</label>
                  <input
                    type="number"
                    defaultValue={1}
                    min={1}
                    className="px-3 py-2.5 border border-slate-200 rounded-lg text-[13px] text-slate-600 bg-white focus:outline-none focus:ring-2 focus:ring-[#1e2b4d]/20 transition-all w-full"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Unit Price</label>
                  <input
                    type="text"
                    placeholder="₹ 0.00"
                    className="px-3 py-2.5 border border-slate-200 rounded-lg text-[13px] text-slate-600 bg-white focus:outline-none focus:ring-2 focus:ring-[#1e2b4d]/20 transition-all w-full"
                  />
                </div>
                <button className="mb-0.5 w-9 h-9 flex items-center justify-center rounded-lg border border-rose-100 text-rose-400 hover:bg-rose-50 hover:text-rose-600 transition-colors self-end">
                  <MdDeleteOutline size={18} />
                </button>
              </div>
            </div>

            {/* Add another item placeholder */}
            <button className="w-full border-2 border-dashed border-slate-200 rounded-lg py-7 flex flex-col items-center gap-2 text-slate-400 hover:border-[#1e2b4d]/30 hover:text-[#1e2b4d]/50 hover:bg-slate-50/50 transition-all">
              <MdAddCircleOutline size={28} />
              <span className="text-[13px] font-medium">Add another machine or accessory</span>
            </button>
          </div>

          {/* Payment + Bill Summary Grid */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-5">

            {/* Payment Method Card */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-6 flex flex-col gap-5">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Payment Method</p>

              <div className="grid grid-cols-2 gap-3">
                {paymentOptions.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => setPaymentMethod(opt.label)}
                    className={`flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-xl border text-[13px] font-bold transition-all ${
                      paymentMethod === opt.label
                        ? 'bg-[#e8edf6] border-[#1e2b4d]/40 text-[#1e2b4d] shadow-inner'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className={paymentMethod === opt.label ? 'text-[#1e2b4d]' : 'text-slate-500'}>
                      {opt.icon}
                    </span>
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Transaction ID */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold text-slate-600">Transaction ID (Reference)</label>
                <input
                  type="text"
                  placeholder="TXN-12345678"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-[13px] text-slate-500 placeholder-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-[#1e2b4d]/20 focus:border-[#1e2b4d]/40 transition-all italic"
                />
              </div>
            </div>

            {/* Bill Summary Card */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-6 flex flex-col gap-4">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Bill Summary</p>

              <div className="flex flex-col gap-3 text-[13px]">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Subtotal</span>
                  <span className="font-semibold text-[#1e2b4d]">₹ 45,000.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">GST (18%)</span>
                  <span className="font-semibold text-[#1e2b4d]">₹ 8,100.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Discount</span>
                  <span className="font-semibold text-rose-500">- ₹ 0.00</span>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-3 flex items-center justify-between">
                <span className="text-[14px] font-bold text-[#1e2b4d]">Total Amount</span>
                <span className="text-[16px] font-black text-[#1e2b4d]">₹ 53,100.00</span>
              </div>

              {/* Warranty Badge */}
              <div className="mt-1 flex items-center gap-2.5 bg-teal-50 border border-teal-200 rounded-lg px-4 py-3">
                <MdVerified className="text-teal-600 shrink-0" size={18} />
                <p className="text-[13px] font-bold text-teal-700 leading-snug">
                  Warranty Valid Until: Oct 2024
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-[12px] text-slate-400 font-medium">
        <div className="flex items-center gap-4">
          <span>© All prices in INR</span>
          <span className="flex items-center gap-1">
            <MdLock size={12} /> Secure Transaction
          </span>
        </div>
        <span>© 2023 SewPro Industrial Manager v2.4.1</span>
      </div>

    </div>
  );
};

export default Sales;
