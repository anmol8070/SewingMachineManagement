import React, { useState } from 'react';
import {
  MdOutlineTimer,
  MdOutlineBarChart,
  MdOutlineFileDownload,
  MdPictureAsPdf,
  MdWarningAmber,
  MdMoreVert,
} from 'react-icons/md';
import { LuUsers, LuTrendingDown, LuTrendingUp, LuShieldAlert } from 'react-icons/lu';

// ── Sub-components ────────────────────────────────────────────────

const StatCard = ({ label, icon, value, badge, badgeUp, sub }) => (
  <div className="bg-white rounded-xl border border-slate-200/70 shadow-sm p-5 flex flex-col gap-2">
    <div className="flex items-center justify-between">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
      <div className="text-slate-400">{icon}</div>
    </div>
    <div className="flex items-end gap-2">
      <h3 className="text-[28px] font-black text-[#1e2b4d] leading-none tracking-tight">{value}</h3>
      {badge && (
        <span className={`flex items-center gap-0.5 text-[12px] font-bold mb-0.5 ${badgeUp ? 'text-emerald-600' : 'text-rose-500'}`}>
          {badgeUp ? <LuTrendingUp size={13} /> : <LuTrendingDown size={13} />}
          {badge}
        </span>
      )}
    </div>
    <p className="text-[11px] text-slate-400 font-medium">{sub}</p>
  </div>
);

const reliabilityData = [
  { label: 'Juki HZL-Series',    pct: 2.4,  color: 'bg-emerald-500', textColor: 'text-emerald-600' },
  { label: 'Brother PQ1500SL',   pct: 5.1,  color: 'bg-yellow-400',  textColor: 'text-yellow-600' },
  { label: 'Singer Heavy Duty',  pct: 12.8, color: 'bg-rose-500',    textColor: 'text-rose-600' },
  { label: 'Bernina 7 Series',   pct: 1.2,  color: 'bg-emerald-400', textColor: 'text-emerald-500' },
];

const chartBars = [
  { label: 'JAN', vol: 62, comp: 48 },
  { label: 'FEB', vol: 78, comp: 65 },
  { label: 'MAR', vol: 45, comp: 38 },
  { label: 'APR', vol: 90, comp: 70 },
  { label: 'MAY', vol: 68, comp: 55 },
  { label: 'JUN', vol: 80, comp: 60 },
];

const technicians = [
  {
    name: 'Elena Rodriguez',
    role: 'Senior Tech',
    spec: 'Industrial Juki Specialist',
    jobs: 142,
    rating: 4.9,
    status: 'AVAILABLE',
    statusClass: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
    img: 'https://i.pravatar.cc/150?img=49',
  },
  {
    name: 'Marcus Chen',
    role: 'Electronics Div.',
    spec: 'Computerized Embroidery',
    jobs: 128,
    rating: 4.8,
    status: 'ON-SITE',
    statusClass: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
    img: 'https://i.pravatar.cc/150?img=68',
  },
  {
    name: 'Sarah Miller',
    role: 'Field Engineer',
    spec: 'Brother/Singer Specialist',
    jobs: 115,
    rating: 4.7,
    status: 'IN REPAIR',
    statusClass: 'bg-rose-100 text-rose-700 border border-rose-200',
    img: 'https://i.pravatar.cc/150?img=47',
  },
];

// ── Page Component ────────────────────────────────────────────────

const Service = () => {
  const [chartView, setChartView] = useState('Monthly');

  return (
    <div className="w-full max-w-[1100px] mx-auto pb-12 flex flex-col gap-6">

      {/* Breadcrumb */}
      <p className="text-[13px] text-slate-400 font-medium">
        Analytics &nbsp;/&nbsp; <span className="font-bold text-[#1e2b4d]">Service Reports</span>
      </p>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-[28px] font-bold text-[#1e2b4d] tracking-tight">Service Analytics</h1>
        <div className="flex items-center gap-3 shrink-0">
          <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-300 rounded-lg text-[13px] font-semibold text-[#1e2b4d] hover:bg-slate-50 transition-colors bg-white shadow-sm">
            <MdOutlineFileDownload size={16} />
            Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#0b1c3c] hover:bg-[#1e2b4d] text-white rounded-lg text-[13px] font-bold transition-colors shadow-sm">
            <MdPictureAsPdf size={16} />
            Export PDF
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Avg Repair Time"
          icon={<MdOutlineTimer size={20} />}
          value="4.2h"
          badge="12%"
          badgeUp={false}
          sub="Vs last 30 days average"
        />
        <StatCard
          label="Tech Productivity"
          icon={<LuUsers size={18} />}
          value="88%"
          badge="3%"
          badgeUp={true}
          sub="Active bench utilization"
        />
        <div className="bg-white rounded-xl border border-slate-200/70 shadow-sm p-5 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Primary Failure</p>
            <MdWarningAmber className="text-amber-400" size={20} />
          </div>
          <div className="flex items-end gap-2">
            <h3 className="text-[26px] font-black text-[#1e2b4d] leading-none tracking-tight">Timing</h3>
            <span className="text-[12px] font-bold text-slate-500 mb-0.5">32% Share</span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium">Frequent: Model S-400</p>
        </div>
        <StatCard
          label="Monthly Revenue"
          icon={<MdOutlineBarChart size={20} />}
          value="$42.8k"
          badge="8.4%"
          badgeUp={true}
          sub="Projected: $45.1k"
        />
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-5">

        {/* Chart Card */}
        <div className="bg-white rounded-xl border border-slate-200/70 shadow-sm p-6 flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-8">
            <div>
              <h2 className="text-[18px] font-bold text-[#1e2b4d]">Service Volume vs. Completion Rate</h2>
              <p className="text-[13px] text-slate-400 mt-0.5">Operational throughput over the last 6 months</p>
            </div>
            <div className="flex rounded-full border border-slate-200 overflow-hidden shrink-0 self-start">
              {['Monthly', 'Quarterly'].map((v) => (
                <button
                  key={v}
                  onClick={() => setChartView(v)}
                  className={`px-4 py-1.5 text-[12px] font-semibold transition-colors ${
                    chartView === v ? 'bg-[#1e2b4d] text-white' : 'bg-white text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Bar Chart */}
          <div className="flex items-end justify-between gap-3 h-48 border-b border-slate-200 pb-3 mb-4 px-2">
            {chartBars.map((bar) => (
              <div key={bar.label} className="flex flex-col items-center gap-1.5 flex-1">
                <div className="flex items-end gap-1 w-full justify-center h-full">
                  <div
                    className="w-5 rounded-t-sm bg-[#1e2b4d] transition-all"
                    style={{ height: `${bar.vol}%` }}
                  />
                  <div
                    className="w-5 rounded-t-sm bg-slate-300 transition-all"
                    style={{ height: `${bar.comp}%` }}
                  />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase mt-2">{bar.label}</span>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-6 px-2">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#1e2b4d]" />
              <span className="text-[12px] font-semibold text-slate-500">Service Volume</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              <span className="text-[12px] font-semibold text-slate-500">Completion Rate</span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-4">

          {/* Machine Reliability Card (dark) */}
          <div className="bg-[#0b1c3c] rounded-xl p-6 flex flex-col gap-5">
            <div>
              <h2 className="text-[17px] font-bold text-white">Machine Reliability</h2>
              <p className="text-[12px] text-slate-400 mt-0.5">Failure rates by major brand/model</p>
            </div>
            <div className="flex flex-col gap-4">
              {reliabilityData.map((item) => (
                <div key={item.label} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-semibold text-slate-300">{item.label}</span>
                    <span className={`text-[12px] font-bold ${item.textColor}`}>{item.pct}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{ width: `${Math.min(item.pct * 7, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[12px] font-bold transition-colors mt-1">
              View Full Reliability Index
            </button>
          </div>

          {/* Quick Audit Card */}
          <div className="bg-white rounded-xl border border-slate-200/70 shadow-sm p-5 flex flex-col gap-3">
            <h2 className="text-[16px] font-bold text-[#1e2b4d]">Quick Audit</h2>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
              <LuShieldAlert className="text-amber-500 shrink-0 mt-0.5" size={18} />
              <div>
                <p className="text-[12px] font-bold text-amber-700 mb-1">Anomalies Detected</p>
                <p className="text-[12px] text-slate-500 leading-snug">
                  Singer unit failure rate rose 4% in 'Sector-G' last week. Recommend inspection of local power supply.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Top Performing Technicians */}
      <div className="bg-white rounded-xl border border-slate-200/70 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200/60 flex items-center justify-between">
          <div>
            <h2 className="text-[18px] font-bold text-[#1e2b4d]">Top Performing Technicians</h2>
            <p className="text-[12px] text-slate-400 mt-0.5">Leaderboard based on efficiency and satisfaction</p>
          </div>
          <button className="text-[13px] font-bold text-[#1e2b4d] hover:opacity-70 transition-opacity shrink-0">
            View All Staff
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/60">
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Technician</th>
                <th className="px-4 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Specialization</th>
                <th className="px-4 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">Jobs<br />Completed</th>
                <th className="px-4 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">Avg.<br />Rating</th>
                <th className="px-4 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">Status</th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {technicians.map((t, i) => (
                <tr
                  key={t.name}
                  className={`border-b border-slate-100 hover:bg-slate-50/60 transition-colors ${i === technicians.length - 1 ? 'border-b-0' : ''}`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={t.img}
                        alt={t.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm shrink-0"
                      />
                      <div>
                        <p className="text-[13px] font-bold text-[#1e2b4d] leading-tight">{t.name}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{t.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-[13px] text-slate-500 font-medium">{t.spec}</td>
                  <td className="px-4 py-4 text-center">
                    <span className="text-[16px] font-black text-[#1e2b4d]">{t.jobs}</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="flex items-center justify-center gap-1 text-[13px] font-bold text-amber-500">
                      ★ {t.rating}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wide ${t.statusClass}`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-200 text-slate-400 hover:bg-slate-100 hover:text-[#1e2b4d] transition-colors mx-auto">
                      <MdMoreVert size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Service;
