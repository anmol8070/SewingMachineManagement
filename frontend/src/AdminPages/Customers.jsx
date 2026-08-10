import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  LuSearch,
  LuPlus,
  LuDollarSign,
  LuFileSpreadsheet,
  LuUser,
  LuWrench,
  LuArrowLeft,
  LuShieldCheck,
  LuWallet
} from 'react-icons/lu';
import { store } from '../utils/store';

const Customers = ({ subpage }) => {
  const navigate = useNavigate();
  const { id: paramId } = useParams();

  const [customers, setCustomers] = useState(store.getCustomers());
  const [sales, setSales] = useState(store.getSales());
  const [services, setServices] = useState(store.getServices());
  const [warranties, setWarranties] = useState(store.getWarranties());
  const [settings, setSettings] = useState(store.getSettings());

  useEffect(() => {
    const handleUpdate = () => {
      setCustomers(store.getCustomers());
      setSales(store.getSales());
      setServices(store.getServices());
      setWarranties(store.getWarranties());
      setSettings(store.getSettings());
    };
    window.addEventListener('sewpro_db_update', handleUpdate);
    return () => window.removeEventListener('sewpro_db_update', handleUpdate);
  }, []);

  const cur = settings.currency || '₹';

  // Filters for Customer Directory
  const [custSearch, setCustSearch] = useState('');

  // Receive Payment Modal States
  const [showPayModal, setShowPayModal] = useState(false);
  const [payAmount, setPayAmount] = useState('');
  const [payMethod, setPayMethod] = useState('Cash');
  const [payNote, setPayNote] = useState('');
  const [payTargetCustId, setPayTargetCustId] = useState('');

  // Tab State on details page
  const [activeTab, setActiveTab] = useState('ledger');

  const filteredCustomers = customers.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(custSearch.toLowerCase()) || c.mobile.includes(custSearch);
    if (subpage === 'outstanding') {
      return matchSearch && c.outstanding > 0;
    }
    return matchSearch;
  });

  const handleReceivePaymentSubmit = (e) => {
    e.preventDefault();
    if (!payTargetCustId || !payAmount) return;
    store.receiveCustomerPayment(payTargetCustId, parseFloat(payAmount), payMethod, payNote);
    alert("Payment recorded and customer ledger updated.");
    setPayAmount('');
    setPayNote('');
    setShowPayModal(false);
  };

  const openPaymentModal = (custId) => {
    setPayTargetCustId(custId);
    setShowPayModal(true);
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto animate-in fade-in duration-500 pb-12">
      {/* Subpage Header Tab links */}
      <div className="flex border-b border-slate-200 mb-8">
        <button
          onClick={() => navigate('/admin/customers/list')}
          className={`px-6 py-3 font-semibold text-sm border-b-2 transition-all ${
            subpage === 'list' || subpage === 'details' ? 'border-[#1e2b4d] text-[#1e2b4d]' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Customer Directory
        </button>
        <button
          onClick={() => navigate('/admin/customers/outstanding')}
          className={`px-6 py-3 font-semibold text-sm border-b-2 transition-all ${
            subpage === 'outstanding' ? 'border-[#1e2b4d] text-[#1e2b4d]' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Outstanding / Udhaar Book
        </button>
      </div>

      {/* PAGE 12 — CUSTOMER LISTING & OUTSTANDING */}
      {(subpage === 'list' || subpage === 'outstanding') && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden">
          <div className="p-5 border-b border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-[15px] font-bold text-[#1e2b4d]">
              {subpage === 'outstanding' ? 'Customers with Pending Udhaar Balance' : 'Master Customers List'}
            </h3>
            <div className="relative w-full sm:w-[260px]">
              <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
              <input
                type="text"
                placeholder="Search by name, mobile, invoice..."
                value={custSearch}
                onChange={(e) => setCustSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200/60 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="px-6 py-4">Customer Name</th>
                  <th className="px-6 py-4">Mobile</th>
                  <th className="px-6 py-4">Address</th>
                  <th className="px-6 py-4 text-right">Total Purchases</th>
                  <th className="px-6 py-4 text-right">Total Services</th>
                  <th className="px-6 py-4 text-right">Outstanding Dues</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-[13px]">
                {filteredCustomers.map((cust) => {
                  const custSales = sales.filter(s => s.customerId === cust.id || s.customerMobile === cust.mobile);
                  const custServices = services.filter(j => j.customerId === cust.id || j.customerMobile === cust.mobile);
                  return (
                    <tr key={cust.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                      <td className="px-6 py-4 font-bold text-[#1e2b4d]">{cust.name}</td>
                      <td className="px-6 py-4 text-slate-600">{cust.mobile}</td>
                      <td className="px-6 py-4 text-slate-500">{cust.address || 'N/A'}</td>
                      <td className="px-6 py-4 text-right text-slate-600">{custSales.length} Bills</td>
                      <td className="px-6 py-4 text-right text-slate-600">{custServices.length} Jobs</td>
                      <td className="px-6 py-4 text-right font-bold text-rose-600">{cur}{cust.outstanding.toLocaleString()}</td>
                      <td className="px-6 py-4 text-right space-x-2">
                        {cust.outstanding > 0 && (
                          <button
                            onClick={() => openPaymentModal(cust.id)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] px-2.5 py-1 rounded transition-colors"
                          >
                            Receive Payment
                          </button>
                        )}
                        <button
                          onClick={() => navigate(`/admin/customers/customer/${cust.id}`)}
                          className="text-blue-600 hover:underline font-bold text-[11px]"
                        >
                          Profile & Ledger
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PAGE 13 — CUSTOMER PROFILE & LEDGER DETAILS */}
      {subpage === 'details' && (() => {
        const cust = customers.find(c => c.id === paramId);
        if (!cust) return <p className="text-slate-500">Customer not found.</p>;

        const custSales = sales.filter(s => s.customerId === cust.id || s.customerMobile === cust.mobile);
        const custServices = services.filter(j => j.customerId === cust.id || j.customerMobile === cust.mobile);
        const custWarranties = warranties.filter(w => w.customerName === cust.name);

        return (
          <div className="space-y-6">
            <button
              onClick={() => navigate('/admin/customers/list')}
              className="flex items-center gap-1.5 text-xs text-[#1e2b4d] font-bold hover:underline mb-4"
            >
              <LuArrowLeft size={16} /> Back to Directory
            </button>

            {/* Profile Overview Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200/60 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#dae5f5] text-[#1e2b4d] font-black text-xl flex items-center justify-center">
                  {cust.name[0]}
                </div>
                <div className="space-y-1">
                  <h2 className="text-lg font-black text-[#1e2b4d]">{cust.name}</h2>
                  <p className="text-xs text-slate-500">Mobile: {cust.mobile} &bull; Address: {cust.address || 'N/A'}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-xs text-slate-400">Outstanding Balance</p>
                  <p className="text-2xl font-black text-rose-600">{cur}{cust.outstanding.toLocaleString()}</p>
                </div>
                {cust.outstanding > 0 && (
                  <button
                    onClick={() => openPaymentModal(cust.id)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-colors shadow"
                  >
                    <LuWallet size={16} /> Receive Payment
                  </button>
                )}
              </div>
            </div>

            {/* Ledger Timeline and details Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden">
              <div className="flex border-b border-slate-100 bg-slate-50/50">
                {['ledger', 'purchases', 'services', 'warranty'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                      activeTab === tab ? 'border-[#1e2b4d] text-[#1e2b4d]' : 'border-transparent text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-5">
                {/* Ledger Tab */}
                {activeTab === 'ledger' && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-100 font-bold text-slate-400 uppercase">
                          <th className="px-4 py-2.5">Date</th>
                          <th className="px-4 py-2.5">Description</th>
                          <th className="px-4 py-2.5 text-right">Debit (Sale)</th>
                          <th className="px-4 py-2.5 text-right">Credit (Paid)</th>
                          <th className="px-4 py-2.5 text-right">Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cust.ledger && cust.ledger.map((leg, idx) => (
                          <tr key={idx} className="border-b border-slate-100">
                            <td className="px-4 py-2.5 text-slate-500">{leg.date}</td>
                            <td className="px-4 py-2.5 text-slate-700 font-semibold">{leg.description}</td>
                            <td className="px-4 py-2.5 text-right text-[#1e2b4d] font-bold">{leg.debit > 0 ? `${cur}${leg.debit}` : '-'}</td>
                            <td className="px-4 py-2.5 text-right text-emerald-600 font-bold">{leg.credit > 0 ? `${cur}${leg.credit}` : '-'}</td>
                            <td className="px-4 py-2.5 text-right text-slate-900 font-bold">{cur}{leg.balance}</td>
                          </tr>
                        ))}
                        {(!cust.ledger || cust.ledger.length === 0) && (
                          <tr>
                            <td colSpan="5" className="text-center py-4 text-slate-400 italic">No ledger transactions logged.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Purchases Tab */}
                {activeTab === 'purchases' && (
                  <div className="space-y-3.5">
                    {custSales.map(sale => (
                      <div key={sale.invoiceNumber} className="bg-slate-50 border border-slate-100 rounded-lg p-4 flex justify-between items-center text-xs">
                        <div>
                          <p className="font-bold text-[#1e2b4d]">Invoice {sale.invoiceNumber} &bull; {sale.date}</p>
                          <p className="text-slate-500 mt-1">
                            Items: {sale.items.map(it => `${it.name} (Qty: ${it.quantity})`).join(', ')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-slate-700">Total: {cur}{sale.total}</p>
                          <p className="text-[10px] text-slate-400">Paid: {cur}{sale.paid}</p>
                        </div>
                      </div>
                    ))}
                    {custSales.length === 0 && <p className="text-slate-400 text-xs italic text-center py-4">No purchases recorded.</p>}
                  </div>
                )}

                {/* Services Tab */}
                {activeTab === 'services' && (
                  <div className="space-y-3.5">
                    {custServices.map(job => (
                      <div key={job.jobId} className="bg-slate-50 border border-slate-100 rounded-lg p-4 flex justify-between items-center text-xs">
                        <div>
                          <p className="font-bold text-[#1e2b4d]">Job ID: {job.jobId} &bull; {job.receivedDate}</p>
                          <p className="text-slate-500 mt-0.5">{job.machineBrand} {job.machineModel} &bull; Complaint: "{job.complaint}"</p>
                        </div>
                        <span className="px-2.5 py-1 bg-indigo-100 text-indigo-700 font-bold rounded-full">{job.status}</span>
                      </div>
                    ))}
                    {custServices.length === 0 && <p className="text-slate-400 text-xs italic text-center py-4">No repair jobs booked.</p>}
                  </div>
                )}

                {/* Warranty Tab */}
                {activeTab === 'warranty' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {custWarranties.map(war => (
                      <div key={war.id} className="bg-emerald-50 border border-emerald-100 rounded-lg p-4 text-xs flex justify-between items-start">
                        <div className="space-y-1">
                          <p className="font-bold text-emerald-800 flex items-center gap-1"><LuShieldCheck size={14} /> Warranty Card Active</p>
                          <p className="font-bold text-[#1e2b4d] mt-1.5">{war.productName}</p>
                          <p className="text-slate-500">Serial: {war.serialNumber}</p>
                          <p className="text-slate-400 mt-1">Start: {war.startDate} &bull; Ends: {war.endDate}</p>
                        </div>
                        <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">{war.status}</span>
                      </div>
                    ))}
                    {custWarranties.length === 0 && (
                      <div className="col-span-2 text-center py-4 text-slate-400 italic">No warranty records found.</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {/* Receive Payment Modal */}
      {showPayModal && (
        <div className="fixed inset-0 bg-slate-900/40 z-50 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleReceivePaymentSubmit} className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-[450px] w-full p-6 relative">
            <h3 className="text-[16px] font-bold text-[#1e2b4d] mb-4">Record Customer Payment</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Payment Amount ({cur}) *</label>
                <input
                  type="number"
                  required
                  placeholder="Enter amount collected..."
                  value={payAmount}
                  onChange={(e) => setPayAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Payment Method</label>
                <select
                  value={payMethod}
                  onChange={(e) => setPayMethod(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] bg-white focus:outline-none"
                >
                  <option value="Cash">Cash</option>
                  <option value="UPI">UPI</option>
                  <option value="Card">Card</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Internal Reference Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Received by Umar, Bill reference..."
                  value={payNote}
                  onChange={(e) => setPayNote(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={() => setShowPayModal(false)}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#0b1c3c] hover:bg-[#1e2b4d] text-white text-xs font-bold rounded"
              >
                Receive Amount
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Customers;
