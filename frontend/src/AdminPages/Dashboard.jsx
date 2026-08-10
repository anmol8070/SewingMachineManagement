import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LuTrendingUp,
  LuShoppingBag,
  LuWrench,
  LuPackage,
  LuTriangleAlert,
  LuClock,
  LuDollarSign,
  LuUsers
} from 'react-icons/lu';
import { store } from '../utils/store';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [sales, setSales] = useState(store.getSales());
  const [products, setProducts] = useState(store.getProducts());
  const [services, setServices] = useState(store.getServices());
  const [customers, setCustomers] = useState(store.getCustomers());
  const [settings, setSettings] = useState(store.getSettings());

  useEffect(() => {
    const handleUpdate = () => {
      setSales(store.getSales());
      setProducts(store.getProducts());
      setServices(store.getServices());
      setCustomers(store.getCustomers());
      setSettings(store.getSettings());
    };
    window.addEventListener('sewpro_db_update', handleUpdate);
    return () => window.removeEventListener('sewpro_db_update', handleUpdate);
  }, []);

  const cur = settings.currency || '₹';

  // Calculations
  const todayStr = new Date().toISOString().split('T')[0];
  const todaySalesVal = sales
    .filter(s => s.date === todayStr)
    .reduce((acc, curr) => acc + curr.total, 0);

  const pendingPaymentsVal = customers.reduce((acc, curr) => acc + (curr.outstanding || 0), 0);

  const pendingServiceJobsCount = services.filter(s => s.status !== 'Delivered' && s.status !== 'Cancelled').length;

  const lowStockCount = products.filter(p => p.stock <= p.minStock).length;

  // Recent 5 sales
  const recentSales = [...sales].reverse().slice(0, 5);

  // Pending service jobs
  const pendingJobs = services.filter(s => s.status !== 'Delivered' && s.status !== 'Cancelled').slice(0, 5);

  return (
    <div className="w-full max-w-[1200px] mx-auto animate-in fade-in duration-500 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[28px] font-bold text-[#1e2b4d] tracking-tight">Shop Dashboard</h1>
          <p className="text-slate-500 text-[14px] mt-1">
            Real-time status of sales, inventory stock levels, and repair orders.
          </p>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Today's Sales */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/60 relative overflow-hidden pb-10">
          <div className="flex justify-between items-start mb-4">
            <div className="w-9 h-9 rounded bg-blue-100/60 flex items-center justify-center text-blue-600">
              <LuTrendingUp size={20} />
            </div>
            <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-[11px] font-bold">
              Today
            </span>
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Today's Sales</p>
          <h3 className="text-2xl font-black text-[#1e2b4d] tracking-tight">
            {cur}{todaySalesVal.toLocaleString()}<span className="text-sm font-normal text-slate-400">.00</span>
          </h3>
        </div>

        {/* Pending Payments */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/60 relative overflow-hidden pb-10">
          <div className="flex justify-between items-start mb-4">
            <div className="w-9 h-9 rounded bg-amber-100/60 flex items-center justify-center text-amber-600">
              <LuDollarSign size={20} />
            </div>
            <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-[11px] font-bold">
              Outstanding
            </span>
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Pending Payments</p>
          <h3 className="text-2xl font-black text-[#1e2b4d] tracking-tight">
            {cur}{pendingPaymentsVal.toLocaleString()}<span className="text-sm font-normal text-slate-400">.00</span>
          </h3>
        </div>

        {/* Service Jobs */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/60 relative overflow-hidden pb-10">
          <div className="flex justify-between items-start mb-4">
            <div className="w-9 h-9 rounded bg-indigo-100/60 flex items-center justify-center text-indigo-600">
              <LuWrench size={20} />
            </div>
            <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-[11px] font-bold text-center">
              Active
            </span>
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Active Service Jobs</p>
          <h3 className="text-2xl font-black text-[#1e2b4d] tracking-tight">
            {pendingServiceJobsCount} Jobs
          </h3>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/60 relative overflow-hidden pb-10">
          <div className="flex justify-between items-start mb-4">
            <div className="w-9 h-9 rounded bg-rose-100/60 flex items-center justify-center text-rose-600">
              <LuPackage size={20} />
            </div>
            {lowStockCount > 0 && (
              <span className="bg-rose-100 text-rose-700 px-2 py-0.5 rounded text-[11px] font-bold">
                Reorder
              </span>
            )}
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Low Stock Products</p>
          <h3 className={`text-2xl font-black tracking-tight ${lowStockCount > 0 ? 'text-rose-600' : 'text-[#1e2b4d]'}`}>
            {lowStockCount} Items
          </h3>
        </div>
      </div>

      {/* Middle Section: Chart & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Sales Overview Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-slate-200/60 flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-[18px] font-bold text-[#1e2b4d]">Sales Overview</h2>
              <p className="text-[13px] text-slate-500">Weekly sales tracking and collections revenue</p>
            </div>
            <div className="flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200 text-[11px] font-bold text-slate-600">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#0b1c3c]"></span> Sales
              </span>
            </div>
          </div>

          <div className="flex-1 flex items-end justify-between gap-4 mt-4 relative h-64 border-b border-slate-200 pb-2 mb-6">
            {[
              { label: 'Mon', value: 42000 },
              { label: 'Tue', value: 28000 },
              { label: 'Wed', value: 65000 },
              { label: 'Thu', value: 31000 },
              { label: 'Fri', value: 78000 },
              { label: 'Sat', value: 92000 },
              { label: 'Sun', value: 15000 },
            ].map((bar, i) => {
              const max = 100000;
              const pct = (bar.value / max) * 100 + "%";
              return (
                <div key={i} className="flex flex-col items-center gap-3 flex-1 h-full justify-end group">
                  <div
                    className="w-full max-w-[40px] rounded-t-md bg-[#0b1c3c]/80 hover:bg-[#0b1c3c] transition-all duration-300 relative group"
                    style={{ height: pct }}
                  >
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1e2b4d] text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow z-10">
                      {cur}{bar.value.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-slate-400 absolute -bottom-6">{bar.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/60 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[12px] font-bold text-[#1e2b4d] tracking-widest uppercase">Low Stock Alerts</h3>
              <LuTriangleAlert className="text-rose-500" size={18} />
            </div>

            <div className="space-y-4 mb-6 max-h-[220px] overflow-y-auto pr-1">
              {products.filter(p => p.stock <= p.minStock).map((prod) => (
                <div key={prod.id} className="flex items-center justify-between border-b border-slate-100 pb-2.5 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-rose-50 flex items-center justify-center text-rose-600 font-bold text-[11px]">
                      {prod.type[0]}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold text-[#1e2b4d] leading-tight">{prod.name}</span>
                      <span className="text-[11px] text-slate-400">{prod.brand} &bull; {prod.model}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[13px] font-bold text-rose-600 leading-tight">{prod.stock} Qty</span>
                    <span className="text-[10px] text-slate-400">Min: {prod.minStock}</span>
                  </div>
                </div>
              ))}
              {products.filter(p => p.stock <= p.minStock).length === 0 && (
                <p className="text-slate-400 text-xs text-center py-6">All items have healthy stock levels!</p>
              )}
            </div>
          </div>

          <button
            onClick={() => navigate('/admin/inventory/products')}
            className="w-full py-2 rounded-lg border border-slate-200 text-[13px] font-bold text-[#1e2b4d] hover:bg-slate-50 transition-colors"
          >
            Manage Inventory Stock
          </button>
        </div>
      </div>

      {/* Grid: Recent Sales, Pending Jobs, Customers Outstanding */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Sales Transactions */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden">
          <div className="p-5 border-b border-slate-200/60 flex items-center justify-between">
            <h2 className="text-[16px] font-bold text-[#1e2b4d]">Recent Sales Transactions</h2>
            <button
              onClick={() => navigate('/admin/sales/history')}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200/60 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="px-4 py-3">Invoice</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="text-[13px]">
                {recentSales.map((sale) => (
                  <tr key={sale.invoiceNumber} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3.5 font-bold text-[#1e2b4d]">{sale.invoiceNumber}</td>
                    <td className="px-4 py-3.5 text-slate-600">{sale.customerName}</td>
                    <td className="px-4 py-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        sale.paymentStatus === 'Paid' ? 'bg-emerald-50 text-emerald-700' :
                        sale.paymentStatus === 'Partially Paid' ? 'bg-amber-50 text-amber-700' :
                        'bg-rose-50 text-rose-700'
                      }`}>
                        {sale.paymentStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right font-bold text-[#1e2b4d]">{cur}{sale.total.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pending Service Jobs & Customer Udhaar */}
        <div className="flex flex-col gap-6">
          {/* Pending Service Jobs */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[16px] font-bold text-[#1e2b4d]">Pending Service Jobs</h2>
              <button
                onClick={() => navigate('/admin/service/pending')}
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                View Jobs Desk
              </button>
            </div>
            <div className="space-y-3">
              {pendingJobs.map((job) => (
                <div key={job.jobId} className="flex items-center justify-between border-b border-slate-100 pb-2.5 last:border-0 last:pb-0">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-bold text-[#1e2b4d]">{job.jobId}</span>
                      <span className="text-[11px] text-slate-400">({job.customerName})</span>
                    </div>
                    <span className="text-[12px] text-slate-600 mt-0.5">
                      {job.machineBrand} {job.machineModel} &bull; <span className="italic text-slate-400">"{job.complaint}"</span>
                    </span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    job.status === 'Repairing' ? 'bg-indigo-50 text-indigo-700' :
                    job.status === 'Checking' ? 'bg-amber-50 text-amber-700' :
                    job.status === 'Ready' ? 'bg-emerald-50 text-emerald-700' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {job.status}
                  </span>
                </div>
              ))}
              {pendingJobs.length === 0 && (
                <p className="text-slate-400 text-xs text-center py-6">No pending service jobs.</p>
              )}
            </div>
          </div>

          {/* Customer Outstanding / Udhaar summary */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[16px] font-bold text-[#1e2b4d]">Customer Outstanding / Udhaar</h2>
              <button
                onClick={() => navigate('/admin/customers/outstanding')}
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                View Ledger
              </button>
            </div>
            <div className="space-y-3">
              {customers.filter(c => c.outstanding > 0).slice(0, 4).map((cust) => (
                <div key={cust.id} className="flex items-center justify-between border-b border-slate-100 pb-2.5 last:border-0 last:pb-0">
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-[#1e2b4d]">{cust.name}</span>
                    <span className="text-[11px] text-slate-400">{cust.mobile}</span>
                  </div>
                  <span className="text-[13px] font-bold text-rose-600">
                    {cur}{cust.outstanding.toLocaleString()}
                  </span>
                </div>
              ))}
              {customers.filter(c => c.outstanding > 0).length === 0 && (
                <p className="text-slate-400 text-xs text-center py-6">No outstanding balances from customers!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
