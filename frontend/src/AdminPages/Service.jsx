import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  LuSearch,
  LuPlus,
  LuWrench,
  LuClock,
  LuTrendingUp,
  LuDollarSign,
  LuCircleCheck,
  LuUserCheck,
  LuPrinter,
  LuLayers,
  LuArrowLeft
} from 'react-icons/lu';
import { store } from '../utils/store';

const Service = ({ subpage }) => {
  const navigate = useNavigate();
  const { id: paramId } = useParams();

  const [services, setServices] = useState(store.getServices());
  const [products, setProducts] = useState(store.getProducts());
  const [customers, setCustomers] = useState(store.getCustomers());
  const [settings, setSettings] = useState(store.getSettings());

  useEffect(() => {
    const handleUpdate = () => {
      setServices(store.getServices());
      setProducts(store.getProducts());
      setCustomers(store.getCustomers());
      setSettings(store.getSettings());
    };
    window.addEventListener('sewpro_db_update', handleUpdate);
    return () => window.removeEventListener('sewpro_db_update', handleUpdate);
  }, []);

  const cur = settings.currency || '₹';

  // New Service Job form state
  const [custSearch, setCustSearch] = useState('');
  const [selectedCust, setSelectedCust] = useState(null);
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [serial, setSerial] = useState('');
  const [complaint, setComplaint] = useState('');
  const [expectedDate, setExpectedDate] = useState('');
  const [tech, setTech] = useState('Anil Shinde');
  const [priority, setPriority] = useState('Medium');
  const [estCost, setEstCost] = useState('500');

  // Job Details spare part state
  const [selectedPartId, setSelectedPartId] = useState('');
  const [partQty, setPartQty] = useState(1);
  const [labourFee, setLabourFee] = useState(0);
  const [servicePayAmt, setServicePayAmt] = useState(0);
  const [newTimelineNote, setNewTimelineNote] = useState('');

  // Calculations for Service list cards
  const pendingCount = services.filter(j => j.status === 'Received' || j.status === 'Checking' || j.status === 'Waiting for Parts').length;
  const repairingCount = services.filter(j => j.status === 'Repairing').length;
  const readyCount = services.filter(j => j.status === 'Ready').length;
  const deliveredCount = services.filter(j => j.status === 'Delivered').length;

  const handleCreateServiceJob = (e) => {
    e.preventDefault();
    if (!selectedCust || !brand || !model || !complaint) {
      alert("Please select customer and input machine brand/model/complaint.");
      return;
    }

    const job = {
      customerId: selectedCust.id,
      customerName: selectedCust.name,
      customerMobile: selectedCust.mobile,
      machineBrand: brand,
      machineModel: model,
      serialNumber: serial,
      complaint,
      expectedDelivery: expectedDate || new Date().toISOString().split('T')[0],
      technician: tech,
      priority,
      estimatedCost: parseFloat(estCost) || 0
    };

    const added = store.addServiceJob(job);
    alert(`Service Job ${added.jobId} created successfully.`);
    // Reset form
    setSelectedCust(null);
    setBrand('');
    setModel('');
    setSerial('');
    setComplaint('');
    setExpectedDate('');
    
    navigate('/admin/service/pending');
  };

  // Detailed page calculations and functions
  const activeJob = services.find(j => j.jobId === paramId);

  const handleAddPartToJob = () => {
    if (!activeJob || !selectedPartId) return;
    const ok = store.usePartInService(activeJob.jobId, selectedPartId, parseInt(partQty));
    if (ok) {
      alert("Spare part added to service job. Stock automatically reduced.");
      setSelectedPartId('');
      setPartQty(1);
    } else {
      alert("Failed to add spare part. Check available stock.");
    }
  };

  const handleUpdateLabour = () => {
    if (!activeJob) return;
    store.updateServiceJob(activeJob.jobId, { labourCharges: parseFloat(labourFee) });
    alert("Labour charges updated.");
  };

  const handleReceiveServicePayment = () => {
    if (!activeJob) return;
    const newPaid = (activeJob.paidAmount || 0) + parseFloat(servicePayAmt);
    store.updateServiceJob(activeJob.jobId, { paidAmount: newPaid });
    alert("Payment received.");
    setServicePayAmt(0);
  };

  const handleMarkStatus = (status) => {
    if (!activeJob) return;
    store.updateServiceJob(activeJob.jobId, { status });
    alert(`Job status updated to ${status}.`);
  };

  // Service History / List Filters
  const getFilteredJobs = () => {
    if (subpage === 'ready') {
      return services.filter(j => j.status === 'Ready');
    }
    if (subpage === 'history') {
      return services.filter(j => j.status === 'Delivered' || j.status === 'Cancelled');
    }
    // Default Pending
    return services.filter(j => j.status !== 'Delivered' && j.status !== 'Cancelled' && j.status !== 'Ready');
  };

  const filteredJobs = getFilteredJobs();

  return (
    <div className="w-full max-w-[1200px] mx-auto animate-in fade-in duration-500 pb-12">
      {/* Subpage Header Tab links */}
      <div className="flex border-b border-slate-200 mb-8">
        <button
          onClick={() => navigate('/admin/service/pending')}
          className={`px-6 py-3 font-semibold text-sm border-b-2 transition-all ${
            subpage === 'pending' || subpage === 'job-details' ? 'border-b-2 border-[#1e2b4d] text-[#1e2b4d]' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Pending Repairs Desk
        </button>
        <button
          onClick={() => navigate('/admin/service/new-job')}
          className={`px-6 py-3 font-semibold text-sm border-b-2 transition-all ${
            subpage === 'new-job' ? 'border-b-2 border-[#1e2b4d] text-[#1e2b4d]' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          New Service Job
        </button>
        <button
          onClick={() => navigate('/admin/service/ready')}
          className={`px-6 py-3 font-semibold text-sm border-b-2 transition-all ${
            subpage === 'ready' ? 'border-b-2 border-[#1e2b4d] text-[#1e2b4d]' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Ready for Delivery
        </button>
        <button
          onClick={() => navigate('/admin/service/history')}
          className={`px-6 py-3 font-semibold text-sm border-b-2 transition-all ${
            subpage === 'history' ? 'border-b-2 border-[#1e2b4d] text-[#1e2b4d]' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Service History
        </button>
        <button
          onClick={() => navigate('/admin/service/analytics')}
          className={`px-6 py-3 font-semibold text-sm border-b-2 transition-all ${
            subpage === 'analytics' ? 'border-b-2 border-[#1e2b4d] text-[#1e2b4d]' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Service Analytics
        </button>
      </div>

      {/* PAGE 9 — SERVICE DESK LISTINGS */}
      {(subpage === 'pending' || subpage === 'ready' || subpage === 'history') && (
        <>
          {/* Top Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/60">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Pending Inspection</span>
              <h3 className="text-2xl font-bold text-slate-700">{pendingCount} Jobs</h3>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/60">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Currently Repairing</span>
              <h3 className="text-2xl font-bold text-indigo-600">{repairingCount} Jobs</h3>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/60">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Ready for Delivery</span>
              <h3 className="text-2xl font-bold text-emerald-600">{readyCount} Jobs</h3>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/60">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Delivered (Completed)</span>
              <h3 className="text-2xl font-bold text-slate-500">{deliveredCount} Jobs</h3>
            </div>
          </div>

          {/* Jobs Table */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200/60 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="px-6 py-4">Job ID</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Machine & Model</th>
                    <th className="px-6 py-4">Serial Number</th>
                    <th className="px-6 py-4">Complaint / Problem</th>
                    <th className="px-6 py-4">Technician</th>
                    <th className="px-6 py-4">Priority</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Expected Delivery</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="text-[13px]">
                  {filteredJobs.map((job) => (
                    <tr key={job.jobId} className="border-b border-slate-100 hover:bg-slate-50/50">
                      <td className="px-6 py-4 font-bold text-[#1e2b4d]">{job.jobId}</td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-slate-700">{job.customerName}</span>
                        <p className="text-[10px] text-slate-400">{job.customerMobile}</p>
                      </td>
                      <td className="px-6 py-4 text-slate-600 font-bold">{job.machineBrand} {job.machineModel}</td>
                      <td className="px-6 py-4 text-slate-500">{job.serialNumber || 'N/A'}</td>
                      <td className="px-6 py-4 text-slate-600 italic">"{job.complaint}"</td>
                      <td className="px-6 py-4 text-slate-500">{job.technician}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          job.priority === 'High' ? 'bg-rose-50 text-rose-700' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {job.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          job.status === 'Ready' ? 'bg-emerald-50 text-emerald-700' :
                          job.status === 'Repairing' ? 'bg-indigo-50 text-indigo-700' :
                          job.status === 'Delivered' ? 'bg-slate-100 text-slate-600' :
                          'bg-amber-50 text-amber-700'
                        }`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500">{job.expectedDelivery}</td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => navigate(`/admin/service/job/${job.jobId}`)}
                          className="text-blue-600 hover:underline font-bold text-xs"
                        >
                          Details / Work
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredJobs.length === 0 && (
                    <tr>
                      <td colSpan="10" className="text-center text-slate-400 py-8">
                        No service jobs matching this desk list.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* PAGE 10 — NEW SERVICE JOB FORM */}
      {subpage === 'new-job' && (
        <form onSubmit={handleCreateServiceJob} className="max-w-[700px] mx-auto bg-white rounded-xl shadow-sm border border-slate-200/60 p-6 space-y-4">
          <h2 className="text-[18px] font-bold text-[#1e2b4d] mb-4">Book New Service Job</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Search Customer *</label>
              <input
                type="text"
                placeholder="Type customer name or mobile..."
                value={custSearch}
                onChange={(e) => setCustSearch(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none"
              />
              {custSearch && (
                <div className="absolute bg-white border border-slate-200 shadow-lg rounded-md mt-1 z-10 max-h-[150px] overflow-y-auto max-w-[320px] w-full">
                  {customers
                    .filter(c => c.name.toLowerCase().includes(custSearch.toLowerCase()) || c.mobile.includes(custSearch))
                    .map(cust => (
                      <button
                        type="button"
                        key={cust.id}
                        onClick={() => {
                          setSelectedCust(cust);
                          setCustSearch('');
                        }}
                        className="w-full text-left px-4 py-2 text-xs hover:bg-slate-50 text-slate-700 flex justify-between"
                      >
                        <span className="font-bold">{cust.name} ({cust.mobile})</span>
                      </button>
                    ))}
                </div>
              )}
            </div>

            {selectedCust && (
              <div className="bg-[#f8fafc] border border-slate-200 rounded p-2 text-xs font-bold text-slate-600 flex justify-between items-center">
                <span>Selected: {selectedCust.name} ({selectedCust.mobile})</span>
                <button type="button" onClick={() => setSelectedCust(null)} className="text-rose-500 hover:underline">Change</button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Machine Brand *</label>
              <input
                type="text"
                required
                placeholder="e.g. Singer"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Machine Model *</label>
              <input
                type="text"
                required
                placeholder="e.g. Promise 1408"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Serial Number</label>
              <input
                type="text"
                placeholder="e.g. SP1408-009"
                value={serial}
                onChange={(e) => setSerial(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Complaint / Problem description *</label>
            <textarea
              required
              rows="3"
              placeholder="Describe machine issue..."
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Expected Delivery Date</label>
              <input
                type="date"
                value={expectedDate}
                onChange={(e) => setExpectedDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Assigned Technician</label>
              <select
                value={tech}
                onChange={(e) => setTech(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] bg-white focus:outline-none"
              >
                <option value="Anil Shinde">Anil Shinde</option>
                <option value="Sunil Mane">Sunil Mane</option>
                <option value="Raju Kamble">Raju Kamble</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] bg-white focus:outline-none"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Estimated Cost ({cur})</label>
            <input
              type="number"
              value={estCost}
              onChange={(e) => setEstCost(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#0b1c3c] hover:bg-[#1e2b4d] text-white font-bold text-[13px] rounded-md transition-colors"
          >
            Create Service Ticket
          </button>
        </form>
      )}

      {/* PAGE 11 — SERVICE JOB DETAILS */}
      {subpage === 'job-details' && (() => {
        if (!activeJob) return <p className="text-slate-500">Service job details not found.</p>;

        const sparePartsList = products.filter(p => p.type === 'Spare Part');

        return (
          <div className="space-y-6">
            <button
              onClick={() => navigate('/admin/service/pending')}
              className="flex items-center gap-1.5 text-xs text-[#1e2b4d] font-bold hover:underline mb-4"
            >
              <LuArrowLeft size={16} /> Back to pending list
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Column: Customer info & machine details */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/60 space-y-4">
                  <h3 className="text-sm font-bold text-[#1e2b4d] border-b border-slate-100 pb-2">Customer & Machine Info</h3>
                  <div className="space-y-2 text-xs">
                    <p><span className="text-slate-400 font-medium">Customer:</span> <span className="font-bold text-[#1e2b4d]">{activeJob.customerName}</span></p>
                    <p><span className="text-slate-400 font-medium">Mobile:</span> <span className="font-medium text-slate-700">{activeJob.customerMobile}</span></p>
                    <p><span className="text-slate-400 font-medium">Machine Brand/Model:</span> <span className="font-bold text-[#1e2b4d]">{activeJob.machineBrand} {activeJob.machineModel}</span></p>
                    <p><span className="text-slate-400 font-medium">Serial No:</span> <span className="font-medium text-slate-600">{activeJob.serialNumber || 'N/A'}</span></p>
                    <p><span className="text-slate-400 font-medium">Complaint:</span> <span className="text-rose-600 font-bold">"{activeJob.complaint}"</span></p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/60 space-y-4">
                  <h3 className="text-sm font-bold text-[#1e2b4d] border-b border-slate-100 pb-2">Job Workflow Status</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {['Received', 'Checking', 'Waiting for Parts', 'Repairing', 'Ready', 'Delivered', 'Cancelled'].map(st => (
                      <button
                        key={st}
                        onClick={() => handleMarkStatus(st)}
                        className={`px-3 py-2 text-xs font-bold rounded text-center transition-colors ${
                          activeJob.status === st
                            ? 'bg-[#dae5f5] text-[#1e2b4d] border border-[#1e2b4d]/30'
                            : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Middle Column: Spares assigned & labour charges */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/60 space-y-4">
                  <h3 className="text-sm font-bold text-[#1e2b4d] border-b border-slate-100 pb-2">Spare Parts Used</h3>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <select
                      value={selectedPartId}
                      onChange={(e) => setSelectedPartId(e.target.value)}
                      className="flex-1 px-3 py-2 border border-slate-200 rounded-md text-[13px] bg-white focus:outline-none"
                    >
                      <option value="">-- Select Spare Part --</option>
                      {sparePartsList.map(sp => (
                        <option key={sp.id} value={sp.id}>{sp.name} (Price: {cur}{sp.sellingPrice} - Stock: {sp.stock})</option>
                      ))}
                    </select>

                    <input
                      type="number"
                      min="1"
                      placeholder="Qty"
                      value={partQty}
                      onChange={(e) => setPartQty(e.target.value)}
                      className="w-[80px] px-3 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none"
                    />

                    <button
                      onClick={handleAddPartToJob}
                      className="bg-[#0b1c3c] hover:bg-[#1e2b4d] text-white text-[13px] font-bold px-4 py-2 rounded-md transition-colors"
                    >
                      Add Part
                    </button>
                  </div>

                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200/60 font-bold text-slate-400">
                        <th className="px-4 py-2">Part Name</th>
                        <th className="px-4 py-2 text-right">Price</th>
                        <th className="px-4 py-2 text-right">Qty</th>
                        <th className="px-4 py-2 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeJob.partsUsed.map((p, idx) => (
                        <tr key={idx} className="border-b border-slate-100">
                          <td className="px-4 py-2 font-bold text-slate-700">{p.name}</td>
                          <td className="px-4 py-2 text-right">{cur}{p.sellingPrice}</td>
                          <td className="px-4 py-2 text-right">{p.quantity}</td>
                          <td className="px-4 py-2 text-right font-bold text-[#1e2b4d]">{cur}{p.sellingPrice * p.quantity}</td>
                        </tr>
                      ))}
                      {activeJob.partsUsed.length === 0 && (
                        <tr>
                          <td colSpan="4" className="text-center py-4 text-slate-400 italic">No parts added to this job yet.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Labour & Payments */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/60 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-[#1e2b4d]">Labour & Estimation</h3>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Labour Charges ({cur})</label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={labourFee}
                          onChange={(e) => setLabourFee(e.target.value)}
                          className="flex-1 px-3 py-1.5 border border-slate-200 rounded text-xs focus:outline-none"
                        />
                        <button
                          onClick={handleUpdateLabour}
                          className="bg-slate-700 hover:bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded transition-colors"
                        >
                          Save
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
                      <div className="flex justify-between font-medium">
                        <span>Parts Bill:</span>
                        <span>{cur}{activeJob.partsUsed.reduce((acc, p) => acc + (p.sellingPrice * p.quantity), 0)}</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>Labour Fee:</span>
                        <span>{cur}{activeJob.labourCharges || 0}</span>
                      </div>
                      <div className="flex justify-between font-bold text-[#1e2b4d] text-sm pt-1.5 border-t border-slate-50">
                        <span>Total Repair Bill:</span>
                        <span>{cur}{activeJob.totalAmount}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 border-t md:border-t-0 md:border-l border-slate-200/60 md:pl-6">
                    <h3 className="text-sm font-bold text-[#1e2b4d]">Service Receipt Payment</h3>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span>Total Paid Amount:</span>
                        <span className="text-emerald-600 font-bold">{cur}{activeJob.paidAmount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pending Due:</span>
                        <span className="text-rose-600 font-bold">{cur}{activeJob.dueAmount}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Receive Partial/Full payment</label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          placeholder="Amount..."
                          value={servicePayAmt}
                          onChange={(e) => setServicePayAmt(e.target.value)}
                          className="flex-1 px-3 py-1.5 border border-slate-200 rounded text-xs focus:outline-none"
                        />
                        <button
                          onClick={handleReceiveServicePayment}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded transition-colors"
                        >
                          Pay
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="w-full py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded transition-colors flex items-center justify-center gap-1.5"
                    >
                      <LuPrinter size={15} /> Print Service Receipt
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* PAGE 17 — SERVICE ANALYTICS */}
      {subpage === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/60">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Pending Jobs</span>
              <h3 className="text-2xl font-bold text-amber-600">{pendingCount + repairingCount}</h3>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/60">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Completed Service Jobs</span>
              <h3 className="text-2xl font-bold text-emerald-600">{deliveredCount}</h3>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/60">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Service Revenue Collected</span>
              <h3 className="text-2xl font-bold text-[#1e2b4d]">{cur}{services.reduce((acc, j) => acc + (j.paidAmount || 0), 0).toLocaleString()}</h3>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/60">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Service Outstanding Dues</span>
              <h3 className="text-2xl font-bold text-rose-600">{cur}{services.reduce((acc, j) => acc + (j.dueAmount || 0), 0).toLocaleString()}</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Technician Workload */}
            <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-sm border border-slate-200/60">
              <h3 className="text-sm font-bold text-[#1e2b4d] mb-4">Technician Performance</h3>
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200/60 font-bold text-slate-400">
                    <th className="px-4 py-3">Technician</th>
                    <th className="px-4 py-3 text-center">Assigned Jobs</th>
                    <th className="px-4 py-3 text-center">Completed</th>
                    <th className="px-4 py-3 text-center">Pending</th>
                  </tr>
                </thead>
                <tbody>
                  {['Anil Shinde', 'Sunil Mane', 'Raju Kamble'].map(techName => {
                    const tJobs = services.filter(j => j.technician === techName);
                    const comp = tJobs.filter(j => j.status === 'Delivered').length;
                    const pend = tJobs.length - comp;
                    return (
                      <tr key={techName} className="border-b border-slate-100">
                        <td className="px-4 py-3 font-bold text-[#1e2b4d]">{techName}</td>
                        <td className="px-4 py-3 text-center font-bold text-slate-700">{tJobs.length}</td>
                        <td className="px-4 py-3 text-center text-emerald-600 font-bold">{comp}</td>
                        <td className="px-4 py-3 text-center text-rose-600 font-bold">{pend}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Simple Service chart representation */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/60 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#1e2b4d] mb-4">Jobs Status Breakdown</h3>
                <div className="space-y-3.5 text-xs font-semibold text-slate-600">
                  <div className="flex justify-between"><span>Received:</span><span>{services.filter(j => j.status === 'Received').length}</span></div>
                  <div className="flex justify-between"><span>Checking:</span><span>{services.filter(j => j.status === 'Checking').length}</span></div>
                  <div className="flex justify-between"><span>Repairing:</span><span>{services.filter(j => j.status === 'Repairing').length}</span></div>
                  <div className="flex justify-between"><span>Waiting for Parts:</span><span>{services.filter(j => j.status === 'Waiting for Parts').length}</span></div>
                  <div className="flex justify-between"><span>Ready for Delivery:</span><span>{services.filter(j => j.status === 'Ready').length}</span></div>
                  <div className="flex justify-between text-emerald-600"><span>Delivered:</span><span>{deliveredCount}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Service;
