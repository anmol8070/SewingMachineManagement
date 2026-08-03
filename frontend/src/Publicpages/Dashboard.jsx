import React from 'react';
import { 
  LuCalendar, 
  LuDownload, 
  LuTrendingUp, 
  LuShoppingBag, 
  LuWrench,
  LuPackage,
  LuArrowRight,
  LuClipboardList
} from 'react-icons/lu';
import { MdOutlinePrecisionManufacturing, MdWarningAmber } from 'react-icons/md';

const Dashboard = () => {
  return (
    <div className="w-full max-w-[1200px] mx-auto animate-in fade-in duration-500 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[28px] font-bold text-[#1e2b4d] tracking-tight">System Overview</h1>
          <p className="text-slate-500 text-[14px] mt-1">
            Precision Stitch OS v4.2 &bull; Active Node: Region-North
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-[#e2e8f0]/80 hover:bg-[#cbd5e1] text-[#334155] px-4 py-2.5 rounded-md text-[14px] font-semibold transition-colors">
            <LuCalendar size={16} />
            Last 30 Days
          </button>
          <button className="flex items-center gap-2 bg-[#0b1c3c] hover:bg-[#1e2b4d] text-white px-4 py-2.5 rounded-md text-[14px] font-semibold transition-colors shadow-sm">
            <LuDownload size={16} />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Card 1 */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/60 relative overflow-hidden pb-12">
          <div className="flex justify-between items-start mb-4">
            <div className="w-9 h-9 rounded bg-blue-100/60 flex items-center justify-center text-blue-600">
              <LuTrendingUp size={20} />
            </div>
            <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-[11px] font-bold">
              +12.4%
            </span>
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Gross Revenue</p>
          <h3 className="text-3xl font-black text-[#1e2b4d] tracking-tight">$284,590<span className="text-xl text-slate-400">.00</span></h3>
          <div className="absolute bottom-4 left-5 right-5 h-1 bg-slate-100 rounded-full overflow-hidden mt-4">
             <div className="h-full bg-[#1e2b4d] w-[65%] rounded-full"></div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/60 relative overflow-hidden pb-12">
          <div className="flex justify-between items-start mb-4">
            <div className="w-9 h-9 rounded bg-indigo-100/60 flex items-center justify-center text-indigo-600">
              <LuShoppingBag size={20} />
            </div>
            <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-[11px] font-bold">
              +4.1%
            </span>
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Monthly Sales</p>
          <h3 className="text-3xl font-black text-[#1e2b4d] tracking-tight">1,402</h3>
          <div className="absolute bottom-4 left-5 right-5 h-1 bg-slate-100 rounded-full overflow-hidden mt-4">
             <div className="h-full bg-slate-400 w-[45%] rounded-full"></div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/60 relative overflow-hidden pb-12">
          <div className="flex justify-between items-start mb-4">
            <div className="w-9 h-9 rounded bg-emerald-100/60 flex items-center justify-center text-emerald-600">
              <MdOutlinePrecisionManufacturing size={22} />
            </div>
            <span className="bg-rose-100 text-rose-600 px-2 py-0.5 rounded text-[11px] font-bold">
              -2.3%
            </span>
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Machine Efficiency</p>
          <h3 className="text-3xl font-black text-[#1e2b4d] tracking-tight">94.8%</h3>
          <div className="absolute bottom-4 left-5 right-5 h-1 bg-slate-100 rounded-full overflow-hidden mt-4">
             <div className="h-full bg-emerald-400 w-[94.8%] rounded-full"></div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/60 relative overflow-hidden pb-12">
          <div className="flex justify-between items-start mb-4">
            <div className="w-9 h-9 rounded bg-rose-100/60 flex items-center justify-center text-rose-600">
              <MdWarningAmber size={20} />
            </div>
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Active Alerts</p>
          <h3 className="text-4xl font-black text-rose-600 tracking-tight leading-none mt-1">08</h3>
          <div className="absolute bottom-4 left-5 right-5 h-1 rounded-full overflow-hidden flex gap-1">
             <div className="h-full bg-rose-600 w-1/3 rounded-full"></div>
             <div className="h-full bg-rose-600 w-1/3 rounded-full"></div>
             <div className="h-full bg-slate-100 w-1/3 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart Section (Takes up 2 columns) */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-slate-200/60 flex flex-col">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-[18px] font-bold text-[#1e2b4d]">Monthly Revenue</h2>
              <p className="text-[13px] text-slate-500">Historical throughput data across all units</p>
            </div>
            <div className="flex items-center gap-4 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#1e2b4d]"></div>
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">Cost</span>
              </div>
            </div>
          </div>
          
          {/* Mock Bar Chart */}
          <div className="flex-1 flex items-end justify-between gap-2 md:gap-6 mt-4 relative h-64 border-b border-slate-200 pb-2 mb-6">
            {[
              { label: 'Jan', height: '40%' },
              { label: 'Feb', height: '55%' },
              { label: 'Mar', height: '30%' },
              { label: 'Apr', height: '65%' },
              { label: 'May', height: '50%' },
              { label: 'Jun', height: '80%' },
              { label: 'Jul', height: '95%', active: true },
            ].map((bar, i) => (
              <div key={i} className="flex flex-col items-center gap-3 flex-1 h-full justify-end group">
                <div 
                  className={`w-full max-w-[48px] rounded-t-sm transition-all duration-300 ${bar.active ? 'bg-[#0b1c3c]' : 'bg-[#f1f5f9] group-hover:bg-[#e2e8f0]'}`}
                  style={{ height: bar.height }}
                ></div>
                <span className="text-[11px] font-medium text-slate-400 absolute -bottom-6">{bar.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts and Support Section (Takes up 1 column) */}
        <div className="flex flex-col gap-6">
          
          {/* Low Stock Alerts */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/60">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[12px] font-bold text-[#1e2b4d] tracking-widest uppercase">Low Stock Alerts</h3>
              <LuClipboardList className="text-rose-500" size={18} />
            </div>
            
            <div className="space-y-5 mb-6">
              {/* Alert Item 1 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200">
                    <LuWrench size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-[#1e2b4d] leading-tight">Industrial Bobbins</span>
                    <span className="text-[11px] text-slate-400">SKU: TM-904-B</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[13px] font-bold text-rose-600 leading-tight">12 Units</span>
                  <span className="text-[11px] text-slate-400">Min: 50</span>
                </div>
              </div>

              {/* Alert Item 2 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200">
                    <LuPackage size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-[#1e2b4d] leading-tight">High-Tensile<br/>Thread</span>
                    <span className="text-[11px] text-slate-400">SKU: HT-NAV-01</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[13px] font-bold text-rose-600 leading-tight">08 Spools</span>
                  <span className="text-[11px] text-slate-400">Min: 20</span>
                </div>
              </div>
            </div>

            <button className="w-full py-2.5 rounded-md border border-slate-300 text-[13px] font-bold text-slate-600 hover:bg-slate-50 transition-colors">
              Manage Inventory
            </button>
          </div>

          {/* Support Queue Card */}
          <div className="bg-[#0b1c3c] rounded-xl p-5 shadow-md relative overflow-hidden flex-1 flex flex-col justify-between min-h-[140px]">
             {/* Decorative icon in background */}
             <div className="absolute -right-6 -bottom-6 text-white/5">
                <MdWarningAmber size={120} />
             </div>
             
             <div className="relative z-10">
               <h3 className="text-[18px] font-bold text-white mb-1">Support Queue</h3>
               <p className="text-slate-300 text-[13px]">3 Urgent service requests pending.</p>
             </div>
             
             <button className="relative z-10 flex items-center gap-2 text-white text-[13px] font-semibold mt-4 hover:opacity-80 transition-opacity w-fit">
               View Jobs <LuArrowRight size={16} />
             </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
