import React, { useState } from 'react';
import { MdWarningAmber, MdLocalShipping, MdCheckCircleOutline, MdAdd, MdTune, MdEdit, MdDeleteOutline } from 'react-icons/md';
import { LuClipboardList } from 'react-icons/lu';

// --- Data ---
const products = [
  {
    id: 1,
    name: 'Brother S-7300A',
    subtitle: 'Direct Drive Lockstitch',
    model: '7300A-403',
    serial: 'SN: BR-4829311-Z',
    unitPrice: '$1,120.00',
    sellingPrice: '$1,450.00',
    stock: 2,
    status: 'LOW STOCK',
    statusColor: 'rose',
    barWidth: '5%',
    barColor: 'bg-rose-500',
    img: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=80&h=80&fit=crop&crop=center',
  },
  {
    id: 2,
    name: 'Juki DDL-8700',
    subtitle: 'High-speed Single Needle',
    model: 'DDL8700-H',
    serial: 'SN: JK-9021134-M',
    unitPrice: '$890.00',
    sellingPrice: '$1,150.00',
    stock: 24,
    status: 'HEALTHY',
    statusColor: 'teal',
    barWidth: '75%',
    barColor: 'bg-teal-400',
    img: 'https://images.unsplash.com/photo-1597393922738-085ea25b5c58?w=80&h=80&fit=crop&crop=center',
  },
  {
    id: 3,
    name: 'Singer 191D-20',
    subtitle: 'Heavy Duty Industrial',
    model: '191D-20C',
    serial: 'SN: SG-5512009-L',
    unitPrice: '$640.00',
    sellingPrice: '$825.00',
    stock: 15,
    status: 'NORMAL',
    statusColor: 'slate',
    barWidth: '45%',
    barColor: 'bg-slate-400',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop&crop=center',
  },
  {
    id: 4,
    name: 'Pfaff Powerline 3745',
    subtitle: 'Computerized Zigzag',
    model: 'P-3745-900',
    serial: 'SN: PF-1123388-X',
    unitPrice: '$2,450.00',
    sellingPrice: '$3,100.00',
    stock: 1,
    status: 'CRITICAL',
    statusColor: 'red',
    barWidth: '2%',
    barColor: 'bg-red-400',
    img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=80&h=80&fit=crop&crop=center',
  },
];

const statusStyles = {
  'LOW STOCK': 'bg-rose-100 text-rose-600 border border-rose-200',
  'HEALTHY':   'bg-teal-100 text-teal-700 border border-teal-200',
  'NORMAL':    'bg-slate-100 text-slate-600 border border-slate-300',
  'CRITICAL':  'bg-red-100 text-red-600 border border-red-200',
};

// --- Component ---
const Inventory = () => {
  const [activeStatus, setActiveStatus] = useState('Active');

  return (
    <div className="w-full max-w-[1200px] mx-auto pb-12">

      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[28px] font-bold text-[#1e2b4d] tracking-tight">Inventory Management</h1>
          <p className="text-slate-500 text-[14px] mt-1">Real-time status of industrial sewing machinery and parts.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#0b1c3c] hover:bg-[#1e2b4d] text-white px-5 py-3 rounded-lg text-[14px] font-bold transition-colors shadow-sm self-start sm:self-auto">
          <MdAdd size={20} />
          Add New Product
        </button>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {/* Total Units */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/60 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
            <LuClipboardList size={22} />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Units</p>
            <h3 className="text-[26px] font-black text-[#1e2b4d] tracking-tight leading-none mt-0.5">1,248</h3>
          </div>
        </div>

        {/* Low Stock */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/60 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 shrink-0">
            <MdWarningAmber size={24} />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Low Stock</p>
            <div className="flex items-baseline gap-2 mt-0.5">
              <h3 className="text-[26px] font-black text-[#1e2b4d] tracking-tight leading-none">12</h3>
              <span className="text-[13px] font-bold text-rose-500">Alerts</span>
            </div>
          </div>
        </div>

        {/* In Transit */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/60 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-500 shrink-0">
            <MdLocalShipping size={24} />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">In Transit</p>
            <h3 className="text-[26px] font-black text-[#1e2b4d] tracking-tight leading-none mt-0.5">45</h3>
          </div>
        </div>

        {/* Ready Stock */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/60 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-500 shrink-0">
            <MdCheckCircleOutline size={24} />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Ready Stock</p>
            <h3 className="text-[26px] font-black text-[#1e2b4d] tracking-tight leading-none mt-0.5">1,191</h3>
          </div>
        </div>
      </div>

      {/* ── Table Card ── */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden">

        {/* Filter Bar */}
        <div className="px-6 py-4 border-b border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-6 flex-wrap">
            {/* Brand Filter */}
            <div className="flex items-center gap-2 text-[13px] text-slate-500">
              <span className="font-medium">Filter by Brand:</span>
              <button className="px-3 py-1.5 rounded-md bg-[#1e2b4d] text-white text-[13px] font-bold">
                All Brands
              </button>
            </div>
            {/* Status Filter */}
            <div className="flex items-center gap-2 text-[13px] text-slate-500">
              <span className="font-medium">Status:</span>
              <div className="flex rounded-md border border-slate-200 overflow-hidden">
                {['Active', 'Archived'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setActiveStatus(s)}
                    className={`px-4 py-1.5 text-[13px] font-semibold transition-colors ${
                      activeStatus === s
                        ? 'bg-[#1e2b4d] text-white'
                        : 'bg-white text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          <button className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-500 hover:text-[#1e2b4d] transition-colors self-start sm:self-auto">
            <MdTune size={16} />
            Advanced Filters
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[820px]">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/60">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider w-[260px]">Product</th>
                <th className="px-4 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Model /<br />Serial</th>
                <th className="px-4 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">Unit Price<br />(IN)</th>
                <th className="px-4 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">Selling<br />Price</th>
                <th className="px-4 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center w-[200px]">Stock Level</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-[13px]">
              {products.map((p, i) => (
                <tr
                  key={p.id}
                  className={`border-b border-slate-100 hover:bg-slate-50/60 transition-colors ${i === products.length - 1 ? 'border-b-0' : ''}`}
                >
                  {/* Product */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <img
                        src={p.img}
                        alt={p.name}
                        className="w-[60px] h-[60px] rounded-lg object-cover bg-slate-100 border border-slate-200 shrink-0"
                        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                      />
                      <div
                        className="w-[60px] h-[60px] rounded-lg bg-slate-100 border border-slate-200 items-center justify-center text-slate-400 shrink-0 hidden"
                        aria-hidden="true"
                      >
                        <LuClipboardList size={24} />
                      </div>
                      <div>
                        <p className="font-bold text-[#1e2b4d] text-[14px] leading-tight">{p.name}</p>
                        <p className="text-slate-400 text-[12px] mt-0.5">{p.subtitle}</p>
                      </div>
                    </div>
                  </td>

                  {/* Model / Serial */}
                  <td className="px-4 py-5">
                    <p className="font-semibold text-[#1e2b4d] text-[13px]">{p.model}</p>
                    <p className="text-slate-400 text-[12px] mt-0.5">{p.serial}</p>
                  </td>

                  {/* Unit Price */}
                  <td className="px-4 py-5 text-right text-slate-500 font-medium">{p.unitPrice}</td>

                  {/* Selling Price */}
                  <td className="px-4 py-5 text-right font-bold text-[#1e2b4d]">{p.sellingPrice}</td>

                  {/* Stock Level */}
                  <td className="px-4 py-5">
                    <div className="flex items-center gap-2.5 justify-center mb-2">
                      <span className="text-[20px] font-black text-[#1e2b4d]">{p.stock}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${statusStyles[p.status]}`}>
                        {p.status}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${p.barColor} transition-all`}
                        style={{ width: p.barWidth }}
                      />
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-[#1e2b4d] transition-colors"
                        aria-label="Edit"
                      >
                        <MdEdit size={16} />
                      </button>
                      <button
                        className="w-8 h-8 flex items-center justify-center rounded-md border border-rose-100 text-rose-400 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                        aria-label="Delete"
                      >
                        <MdDeleteOutline size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-5 border-t border-slate-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[13px] text-slate-500">
          <span>Showing 1 to 4 of 1,248 products</span>
          <div className="flex items-center gap-1.5">
            <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 hover:bg-slate-50 transition-colors text-slate-400">&lt;</button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-[#0b1c3c] text-white font-bold">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 hover:bg-slate-50 font-semibold text-[#1e2b4d] transition-colors">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 hover:bg-slate-50 font-semibold text-[#1e2b4d] transition-colors">3</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 hover:bg-slate-50 transition-colors text-slate-400">&gt;</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Inventory;
