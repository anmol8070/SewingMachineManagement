import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LuDollarSign,
  LuUsers,
  LuPlus,
  LuClock,
  LuCircleCheck
} from 'react-icons/lu';
import { store } from '../utils/store';

const Payments = () => {
  const [customers, setCustomers] = useState(store.getCustomers());
  const [suppliers, setSuppliers] = useState(store.getSuppliers());
  const [settings, setSettings] = useState(store.getSettings());

  useEffect(() => {
    const handleUpdate = () => {
      setCustomers(store.getCustomers());
      setSuppliers(store.getSuppliers());
      setSettings(store.getSettings());
    };
    window.addEventListener('sewpro_db_update', handleUpdate);
    return () => window.removeEventListener('sewpro_db_update', handleUpdate);
  }, []);

  const cur = settings.currency || '₹';
  const [activeTab, setActiveTab] = useState('customer-dues');

  // Modal State for receiving customer payment
  const [showCustPayModal, setShowCustPayModal] = useState(false);
  const [selectedCustId, setSelectedCustId] = useState('');
  const [custAmount, setCustAmount] = useState('');
  const [custMethod, setCustMethod] = useState('Cash');
  const [custNote, setCustNote] = useState('');

  // Modal State for recording supplier payment
  const [showSupPayModal, setShowSupPayModal] = useState(false);
  const [selectedSupId, setSelectedSupId] = useState('');
  const [supAmount, setSupAmount] = useState('');
  const [supMethod, setSupMethod] = useState('UPI');
  const [supNote, setSupNote] = useState('');

  // Totals calculations
  const totalCustomerOutstanding = customers.reduce((acc, c) => acc + c.outstanding, 0);
  const totalSupplierPayable = suppliers.reduce((acc, s) => acc + s.outstanding, 0);

  // Compile unified payment logs from customer ledgers
  const recentPayments = [];
  customers.forEach(c => {
    if (c.ledger) {
      c.ledger.forEach(l => {
        if (l.credit > 0) {
          recentPayments.push({
            date: l.date,
            party: c.name,
            role: "Customer",
            type: "Receipt",
            description: l.description,
            amount: l.credit
          });
        }
      });
    }
  });
  // Sort payments by date descending
  recentPayments.sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleCustPaySubmit = (e) => {
    e.preventDefault();
    if (!selectedCustId || !custAmount) return;
    store.receiveCustomerPayment(selectedCustId, parseFloat(custAmount), custMethod, custNote);
    alert("Payment received successfully!");
    setCustAmount('');
    setCustNote('');
    setShowCustPayModal(false);
  };

  const handleSupPaySubmit = (e) => {
    e.preventDefault();
    if (!selectedSupId || !supAmount) return;
    store.paySupplier(selectedSupId, parseFloat(supAmount), supMethod, supNote);
    alert("Supplier payment recorded successfully!");
    setSupAmount('');
    setSupNote('');
    setShowSupPayModal(false);
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto animate-in fade-in duration-500 pb-12">
      {/* Top Header */}
      <div className="mb-8">
        <h1 className="text-[28px] font-bold text-[#1e2b4d] tracking-tight">Payments & Collections</h1>
        <p className="text-slate-500 text-[14px] mt-1">Manage outstanding credit from customer sales and vendor payables.</p>
      </div>

      {/* Top stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/60 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Total Customer Udhaar</span>
            <h3 className="text-3xl font-black text-rose-600">{cur}{totalCustomerOutstanding.toLocaleString()}</h3>
          </div>
          <button
            onClick={() => setShowCustPayModal(true)}
            className="bg-[#0b1c3c] hover:bg-[#1e2b4d] text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors"
          >
            Collect Customer Payment
          </button>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/60 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Total Supplier Payable</span>
            <h3 className="text-3xl font-black text-[#1e2b4d]">{cur}{totalSupplierPayable.toLocaleString()}</h3>
          </div>
          <button
            onClick={() => setShowSupPayModal(true)}
            className="bg-slate-700 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors"
          >
            Record Supplier Payment
          </button>
        </div>
      </div>

      {/* Main Tabs Panel */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden">
        <div className="flex border-b border-slate-100 bg-slate-50/50">
          <button
            onClick={() => setActiveTab('customer-dues')}
            className={`px-6 py-3.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'customer-dues' ? 'border-[#1e2b4d] text-[#1e2b4d]' : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Customer Dues List
          </button>
          <button
            onClick={() => setActiveTab('supplier-dues')}
            className={`px-6 py-3.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'supplier-dues' ? 'border-[#1e2b4d] text-[#1e2b4d]' : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Supplier Payable list
          </button>
          <button
            onClick={() => setActiveTab('payment-history')}
            className={`px-6 py-3.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'payment-history' ? 'border-[#1e2b4d] text-[#1e2b4d]' : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Payment History Ledger
          </button>
        </div>

        <div className="p-5">
          {/* Customer Dues */}
          {activeTab === 'customer-dues' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200/60 font-bold text-slate-400 uppercase">
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Mobile</th>
                    <th className="px-4 py-3 text-right">Outstanding Udhaar</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.filter(c => c.outstanding > 0).map(c => (
                    <tr key={c.id} className="border-b border-slate-100">
                      <td className="px-4 py-3 font-bold text-slate-700">{c.name}</td>
                      <td className="px-4 py-3 text-slate-500">{c.mobile}</td>
                      <td className="px-4 py-3 text-right text-rose-600 font-bold">{cur}{c.outstanding.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => {
                            setSelectedCustId(c.id);
                            setShowCustPayModal(true);
                          }}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded transition-colors"
                        >
                          Collect Payment
                        </button>
                      </td>
                    </tr>
                  ))}
                  {customers.filter(c => c.outstanding > 0).length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center py-6 text-slate-400 italic">No customer outstanding balances! All credit has been settled.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Supplier Dues */}
          {activeTab === 'supplier-dues' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200/60 font-bold text-slate-400 uppercase">
                    <th className="px-4 py-3">Supplier Name</th>
                    <th className="px-4 py-3">Phone</th>
                    <th className="px-4 py-3 text-right">Outstanding Due</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {suppliers.filter(s => s.outstanding > 0).map(s => (
                    <tr key={s.id} className="border-b border-slate-100">
                      <td className="px-4 py-3 font-bold text-slate-700">{s.name}</td>
                      <td className="px-4 py-3 text-slate-500">{s.mobile}</td>
                      <td className="px-4 py-3 text-right text-rose-600 font-bold">{cur}{s.outstanding.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => {
                            setSelectedSupId(s.id);
                            setShowSupPayModal(true);
                          }}
                          className="bg-slate-750 hover:bg-slate-800 text-white font-bold px-3 py-1.5 rounded transition-colors"
                        >
                          Record Payment
                        </button>
                      </td>
                    </tr>
                  ))}
                  {suppliers.filter(s => s.outstanding > 0).length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center py-6 text-slate-400 italic">No supplier outstanding payables.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Payment History */}
          {activeTab === 'payment-history' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200/60 font-bold text-slate-400 uppercase">
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Party</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Details</th>
                    <th className="px-4 py-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPayments.map((p, idx) => (
                    <tr key={idx} className="border-b border-slate-100">
                      <td className="px-4 py-3 text-slate-500">{p.date}</td>
                      <td className="px-4 py-3 font-bold text-slate-700">{p.party} ({p.role})</td>
                      <td className="px-4 py-3 text-emerald-600 font-bold">{p.type}</td>
                      <td className="px-4 py-3 text-slate-500">{p.description}</td>
                      <td className="px-4 py-3 text-right text-emerald-600 font-bold">{cur}{p.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                  {recentPayments.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center py-6 text-slate-400 italic">No payment receipts found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Collect Customer Payment Modal */}
      {showCustPayModal && (
        <div className="fixed inset-0 bg-slate-900/40 z-50 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCustPaySubmit} className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-[450px] w-full p-6 relative">
            <h3 className="text-[16px] font-bold text-[#1e2b4d] mb-4">Record Customer Collection</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Select Customer *</label>
                <select
                  required
                  value={selectedCustId}
                  onChange={(e) => setSelectedCustId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] bg-white focus:outline-none"
                >
                  <option value="">-- Choose Customer --</option>
                  {customers.filter(c => c.outstanding > 0).map(c => (
                    <option key={c.id} value={c.id}>{c.name} (Due: {cur}{c.outstanding})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Collected Amount ({cur}) *</label>
                <input
                  type="number"
                  required
                  placeholder="Amount received..."
                  value={custAmount}
                  onChange={(e) => setCustAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Payment Method</label>
                <select
                  value={custMethod}
                  onChange={(e) => setCustMethod(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] bg-white focus:outline-none"
                >
                  <option value="Cash">Cash</option>
                  <option value="UPI">UPI</option>
                  <option value="Card">Card</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Cleared partial dues..."
                  value={custNote}
                  onChange={(e) => setCustNote(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={() => setShowCustPayModal(false)}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#0b1c3c] hover:bg-[#1e2b4d] text-white text-xs font-bold rounded"
              >
                Receive Payment
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Supplier Payment Modal */}
      {showSupPayModal && (
        <div className="fixed inset-0 bg-slate-900/40 z-50 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleSupPaySubmit} className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-[450px] w-full p-6 relative">
            <h3 className="text-[16px] font-bold text-[#1e2b4d] mb-4">Record Supplier Payment</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Select Supplier *</label>
                <select
                  required
                  value={selectedSupId}
                  onChange={(e) => setSelectedSupId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] bg-white focus:outline-none"
                >
                  <option value="">-- Choose Supplier --</option>
                  {suppliers.filter(s => s.outstanding > 0).map(s => (
                    <option key={s.id} value={s.id}>{s.name} (Payable: {cur}{s.outstanding})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Amount Paid ({cur}) *</label>
                <input
                  type="number"
                  required
                  placeholder="Amount paid..."
                  value={supAmount}
                  onChange={(e) => setSupAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Payment Method</label>
                <select
                  value={supMethod}
                  onChange={(e) => setSupMethod(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] bg-white focus:outline-none"
                >
                  <option value="UPI">UPI</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Cash">Cash</option>
                  <option value="Card">Card</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Paid via mobile banking..."
                  value={supNote}
                  onChange={(e) => setSupNote(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={() => setShowSupPayModal(false)}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white text-xs font-bold rounded"
              >
                Record Payment
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Payments;
