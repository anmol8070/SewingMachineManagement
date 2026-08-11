import React, { useState, useEffect } from 'react';
import {
  LuFileText,
  LuDownload,
  LuFileSpreadsheet,
  LuTrendingUp,
  LuPackage,
  LuWrench,
  LuUsers,
  LuDollarSign
} from 'react-icons/lu';
import { store } from '../utils/store';

const Reports = () => {
  const [sales, setSales] = useState(store.getSales());
  const [products, setProducts] = useState(store.getProducts());
  const [services, setServices] = useState(store.getServices());
  const [customers, setCustomers] = useState(store.getCustomers());
  const [expenses, setExpenses] = useState(store.getExpenses());
  const [settings, setSettings] = useState(store.getSettings());

  useEffect(() => {
    const handleUpdate = () => {
      setSales(store.getSales());
      setProducts(store.getProducts());
      setServices(store.getServices());
      setCustomers(store.getCustomers());
      setExpenses(store.getExpenses());
      setSettings(store.getSettings());
    };
    window.addEventListener('sewpro_db_update', handleUpdate);
    return () => window.removeEventListener('sewpro_db_update', handleUpdate);
  }, []);

  const cur = settings.currency || '₹';
  const [activeTab, setActiveTab] = useState('sales-report');

  const handleExport = (format) => {
    alert(`Exporting ${activeTab.replace('-', ' ').toUpperCase()} in ${format} format...`);
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[28px] font-bold text-[#1e2b4d] tracking-tight">Business Reports</h1>
          <p className="text-slate-500 text-[14px] mt-1">Export detailed reports and spreadsheets for accounting.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleExport('Excel')}
            className="flex items-center gap-1.5 bg-[#e2e8f0]/80 hover:bg-[#cbd5e1] text-[#334155] px-4 py-2.5 rounded-md text-[13px] font-bold transition-all"
          >
            <LuFileSpreadsheet size={16} /> Excel
          </button>
          <button
            onClick={() => handleExport('PDF')}
            className="flex items-center gap-1.5 bg-[#0b1c3c] hover:bg-[#1e2b4d] text-white px-4 py-2.5 rounded-md text-[13px] font-bold transition-all shadow-sm"
          >
            <LuDownload size={16} /> Export PDF
          </button>
        </div>
      </div>

      {/* Main Tabs grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Left Side Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 p-4 space-y-1.5 h-fit">
          <button
            onClick={() => setActiveTab('sales-report')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2.5 ${
              activeTab === 'sales-report' ? 'bg-[#dae5f5] text-[#1e2b4d]' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <LuTrendingUp size={16} /> Sales & Collections
          </button>

          <button
            onClick={() => setActiveTab('inventory-report')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2.5 ${
              activeTab === 'inventory-report' ? 'bg-[#dae5f5] text-[#1e2b4d]' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <LuPackage size={16} /> Inventory Stock Value
          </button>

          <button
            onClick={() => setActiveTab('service-report')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2.5 ${
              activeTab === 'service-report' ? 'bg-[#dae5f5] text-[#1e2b4d]' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <LuWrench size={16} /> Service Jobs Log
          </button>

          <button
            onClick={() => setActiveTab('financial-report')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2.5 ${
              activeTab === 'financial-report' ? 'bg-[#dae5f5] text-[#1e2b4d]' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <LuDollarSign size={16} /> Profit & Loss Summary
          </button>
        </div>

        {/* Right Side Report Previews */}
        <div className="md:col-span-3 bg-white rounded-xl shadow-sm border border-slate-200/60 p-6">
          
          {/* Sales Report view */}
          {activeTab === 'sales-report' && (
            <div className="space-y-6">
              <h3 className="text-base font-bold text-[#1e2b4d]">Sales Summary & Collection Report</h3>
              <div className="grid grid-cols-3 gap-4 bg-slate-50 p-4 rounded-lg text-xs">
                <div>
                  <p className="text-slate-400">Total Sales Value</p>
                  <p className="text-lg font-bold mt-1">{cur}{sales.reduce((acc, s) => acc + s.total, 0).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-slate-400">Total Cash collected</p>
                  <p className="text-lg font-bold text-emerald-600 mt-1">{cur}{sales.reduce((acc, s) => acc + s.paid, 0).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-slate-400">Outstanding Udhaar Dues</p>
                  <p className="text-lg font-bold text-rose-600 mt-1">{cur}{sales.reduce((acc, s) => acc + s.due, 0).toLocaleString()}</p>
                </div>
              </div>

              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 font-bold text-slate-400">
                    <th className="px-3 py-2">Invoice No</th>
                    <th className="px-3 py-2">Date</th>
                    <th className="px-3 py-2">Customer</th>
                    <th className="px-3 py-2 text-right">Invoice Total</th>
                    <th className="px-3 py-2 text-right">Payment Due</th>
                  </tr>
                </thead>
                <tbody>
                  {sales.map(s => (
                    <tr key={s.invoiceNumber} className="border-b border-slate-100">
                      <td className="px-3 py-2.5 font-bold text-[#1e2b4d]">{s.invoiceNumber}</td>
                      <td className="px-3 py-2.5 text-slate-500">{s.date}</td>
                      <td className="px-3 py-2.5 text-slate-700 font-medium">{s.customerName}</td>
                      <td className="px-3 py-2.5 text-right font-bold">{cur}{s.total}</td>
                      <td className="px-3 py-2.5 text-right font-bold text-rose-600">{cur}{s.due}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Inventory Report view */}
          {activeTab === 'inventory-report' && (
            <div className="space-y-6">
              <h3 className="text-base font-bold text-[#1e2b4d]">Current Stock & Valuation Report</h3>
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg text-xs">
                <div>
                  <p className="text-slate-400">Total Unique SKUs</p>
                  <p className="text-lg font-bold mt-1">{products.length}</p>
                </div>
                <div>
                  <p className="text-slate-400">Asset Cost Value</p>
                  <p className="text-lg font-bold text-emerald-600 mt-1">{cur}{products.reduce((acc, p) => acc + (p.purchasePrice * p.stock), 0).toLocaleString()}</p>
                </div>
              </div>

              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 font-bold text-slate-400">
                    <th className="px-3 py-2">Product SKU</th>
                    <th className="px-3 py-2">Brand</th>
                    <th className="px-3 py-2 text-right">Cost Price</th>
                    <th className="px-3 py-2 text-right">Available Stock</th>
                    <th className="px-3 py-2 text-right">Holding Value</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id} className="border-b border-slate-100">
                      <td className="px-3 py-2.5 font-bold text-slate-700">{p.name}</td>
                      <td className="px-3 py-2.5 text-slate-500">{p.brand} &bull; {p.model}</td>
                      <td className="px-3 py-2.5 text-right">{cur}{p.purchasePrice}</td>
                      <td className="px-3 py-2.5 text-right font-bold">{p.stock}</td>
                      <td className="px-3 py-2.5 text-right font-bold text-[#1e2b4d]">{cur}{(p.purchasePrice * p.stock).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Service report view */}
          {activeTab === 'service-report' && (
            <div className="space-y-6">
              <h3 className="text-base font-bold text-[#1e2b4d]">Service Revenue & Jobs Completion Report</h3>
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg text-xs">
                <div>
                  <p className="text-slate-400">Completed Repairs</p>
                  <p className="text-lg font-bold text-emerald-600 mt-1">{services.filter(j => j.status === 'Delivered').length} Jobs</p>
                </div>
                <div>
                  <p className="text-slate-400">Total Service Revenue</p>
                  <p className="text-lg font-bold text-[#1e2b4d] mt-1">{cur}{services.reduce((acc, j) => acc + (j.paidAmount || 0), 0).toLocaleString()}</p>
                </div>
              </div>

              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 font-bold text-slate-400">
                    <th className="px-3 py-2">Job ID</th>
                    <th className="px-3 py-2">Customer</th>
                    <th className="px-3 py-2">Technician</th>
                    <th className="px-3 py-2 text-right">Labour + Spares</th>
                    <th className="px-3 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map(j => (
                    <tr key={j.jobId} className="border-b border-slate-100">
                      <td className="px-3 py-2.5 font-bold text-[#1e2b4d]">{j.jobId}</td>
                      <td className="px-3 py-2.5 text-slate-600">{j.customerName}</td>
                      <td className="px-3 py-2.5 text-slate-500">{j.technician}</td>
                      <td className="px-3 py-2.5 text-right font-bold">{cur}{j.totalAmount}</td>
                      <td className="px-3 py-2.5 font-bold text-slate-600">{j.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Financials profit/loss */}
          {activeTab === 'financial-report' && (() => {
            const totSales = sales.reduce((acc, s) => acc + s.total, 0);
            const totCOGS = sales.reduce((acc, s) => {
              return acc + s.items.reduce((itemAcc, item) => {
                const p = products.find(prod => prod.id === item.productId);
                const cost = p ? p.purchasePrice : 0;
                return itemAcc + (cost * item.quantity);
              }, 0);
            }, 0);

            const serviceRev = services.reduce((acc, j) => acc + (j.paidAmount || 0), 0);
            const totExpenses = expenses.reduce((acc, e) => acc + e.amount, 0);
            
            const grossProfit = totSales - totCOGS + serviceRev;
            const netProfit = grossProfit - totExpenses;

            return (
              <div className="space-y-6">
                <h3 className="text-base font-bold text-[#1e2b4d]">Profit & Loss Statement (P&L)</h3>
                
                <div className="space-y-4 border-t border-slate-100 pt-4 text-xs font-semibold text-slate-700">
                  <div className="flex justify-between border-b border-slate-50 pb-2">
                    <span>Retail Sales Revenue (+)</span>
                    <span>{cur}{totSales.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-50 pb-2 text-rose-600">
                    <span>Cost of Goods Sold (COGS) (-)</span>
                    <span>{cur}{totCOGS.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-50 pb-2">
                    <span>Service Revenue (+)</span>
                    <span>{cur}{serviceRev.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2 text-emerald-600 text-sm font-black">
                    <span>Gross Profit Summary</span>
                    <span>{cur}{grossProfit.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-50 pb-2 text-rose-600">
                    <span>Operating Expenses (-)</span>
                    <span>{cur}{totExpenses.toLocaleString()}</span>
                  </div>
                  <div className={`flex justify-between text-base font-black pt-3 border-t-2 border-slate-300 ${netProfit >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                    <span>Net Profit / Loss</span>
                    <span>{cur}{netProfit.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            );
          })()}

        </div>
      </div>
    </div>
  );
};

export default Reports;
