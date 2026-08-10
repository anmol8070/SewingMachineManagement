import React, { useState, useEffect } from 'react';
import {
  LuPlus,
  LuCalculator,
  LuCalendar,
  LuTrendingDown
} from 'react-icons/lu';
import { store } from '../utils/store';

const Expenses = () => {
  const [expenses, setExpenses] = useState(store.getExpenses());
  const [settings, setSettings] = useState(store.getSettings());

  useEffect(() => {
    const handleUpdate = () => {
      setExpenses(store.getExpenses());
      setSettings(store.getSettings());
    };
    window.addEventListener('sewpro_db_update', handleUpdate);
    return () => window.removeEventListener('sewpro_db_update', handleUpdate);
  }, []);

  const cur = settings.currency || '₹';

  // Add Expense form state
  const [showAddModal, setShowAddModal] = useState(false);
  const [category, setCategory] = useState('Miscellaneous');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [method, setMethod] = useState('Cash');
  const [note, setNote] = useState('');

  // Calculations
  const todayStr = new Date().toISOString().split('T')[0];
  const thisMonthPrefix = new Date().toISOString().substring(0, 7); // YYYY-MM

  const todayExpensesVal = expenses
    .filter(e => e.date === todayStr)
    .reduce((acc, curr) => acc + curr.amount, 0);

  const thisMonthExpensesVal = expenses
    .filter(e => e.date && e.date.startsWith(thisMonthPrefix))
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpensesVal = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  const handleAddExpenseSubmit = (e) => {
    e.preventDefault();
    if (!amount) return;

    store.addExpense({
      category,
      amount: parseFloat(amount) || 0,
      date,
      paymentMethod: method,
      note
    });

    alert("Expense logged successfully.");
    setAmount('');
    setNote('');
    setShowAddModal(false);
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[28px] font-bold text-[#1e2b4d] tracking-tight">Expenses Tracker</h1>
          <p className="text-slate-500 text-[14px] mt-1">Log and categorize operational overhead expenses.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#0b1c3c] hover:bg-[#1e2b4d] text-white text-[13px] font-bold px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-colors shadow shrink-0"
        >
          <LuPlus size={16} /> Log Expense
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/60">
          <div className="flex items-center gap-3 mb-2">
            <LuCalendar className="text-slate-400" size={18} />
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Today's Expenses</span>
          </div>
          <h3 className="text-2xl font-bold text-[#1e2b4d]">{cur}{todayExpensesVal.toLocaleString()}</h3>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/60">
          <div className="flex items-center gap-3 mb-2">
            <LuTrendingDown className="text-amber-500" size={18} />
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">This Month</span>
          </div>
          <h3 className="text-2xl font-bold text-amber-600">{cur}{thisMonthExpensesVal.toLocaleString()}</h3>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/60">
          <div className="flex items-center gap-3 mb-2">
            <LuCalculator className="text-[#1e2b4d]" size={18} />
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Expenses</span>
          </div>
          <h3 className="text-2xl font-bold text-[#1e2b4d]">{cur}{totalExpensesVal.toLocaleString()}</h3>
        </div>
      </div>

      {/* Expense History Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/60 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Payment Method</th>
                <th className="px-6 py-4">Note / Details</th>
                <th className="px-6 py-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="text-[13px]">
              {expenses.map((exp) => (
                <tr key={exp.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="px-6 py-4 text-slate-500">{exp.date}</td>
                  <td className="px-6 py-4 font-bold text-[#1e2b4d]">{exp.category}</td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{exp.paymentMethod}</td>
                  <td className="px-6 py-4 text-slate-500">{exp.note || 'N/A'}</td>
                  <td className="px-6 py-4 text-right font-bold text-rose-600">{cur}{exp.amount.toLocaleString()}</td>
                </tr>
              ))}
              {expenses.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-slate-400 italic">No expenses logged.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Expense Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 z-50 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleAddExpenseSubmit} className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-[450px] w-full p-6 relative">
            <h3 className="text-[16px] font-bold text-[#1e2b4d] mb-4">Log Expense Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] bg-white focus:outline-none"
                >
                  <option value="Rent">Rent</option>
                  <option value="Electricity">Electricity</option>
                  <option value="Salary">Salary</option>
                  <option value="Transport">Transport</option>
                  <option value="Repair">Repair</option>
                  <option value="Miscellaneous">Miscellaneous</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Amount ({cur}) *</label>
                <input
                  type="number"
                  required
                  placeholder="Enter amount..."
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Date *</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Payment Method</label>
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] bg-white focus:outline-none"
                >
                  <option value="Cash">Cash</option>
                  <option value="UPI">UPI</option>
                  <option value="Card">Card</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Internal note / comment</label>
                <input
                  type="text"
                  placeholder="e.g. Paid tea bills or office stationeries..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#0b1c3c] hover:bg-[#1e2b4d] text-white text-xs font-bold rounded"
              >
                Save Expense
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Expenses;
