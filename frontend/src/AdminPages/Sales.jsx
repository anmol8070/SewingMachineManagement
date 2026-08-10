import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LuSearch,
  LuPlus,
  LuMinus,
  LuPrinter,
  LuDownload,
  LuMessageSquare,
  LuTrash2,
  LuRefreshCw,
  LuUndo2,
  LuChevronRight,
  LuSave
} from 'react-icons/lu';
import { store } from '../utils/store';

const Sales = ({ subpage }) => {
  const navigate = useNavigate();
  const [sales, setSales] = useState(store.getSales());
  const [products, setProducts] = useState(store.getProducts());
  const [customers, setCustomers] = useState(store.getCustomers());
  const [settings, setSettings] = useState(store.getSettings());

  // Listen for DB updates
  useEffect(() => {
    const handleUpdate = () => {
      setSales(store.getSales());
      setProducts(store.getProducts());
      setCustomers(store.getCustomers());
      setSettings(store.getSettings());
    };
    window.addEventListener('sewpro_db_update', handleUpdate);
    return () => window.removeEventListener('sewpro_db_update', handleUpdate);
  }, []);

  const cur = settings.currency || '₹';

  // State for Billing (New Bill)
  const [billingCustomer, setBillingCustomer] = useState(null);
  const [customerSearch, setCustomerSearch] = useState('');
  const [newCustName, setNewCustName] = useState('');
  const [newCustMobile, setNewCustMobile] = useState('');
  const [newCustAddress, setNewCustAddress] = useState('');
  const [newCustOutstanding, setNewCustOutstanding] = useState('0');
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);

  const [billItems, setBillItems] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedSerial, setSelectedSerial] = useState('');
  const [inputQty, setInputQty] = useState(1);
  const [inputPrice, setInputPrice] = useState(0);

  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [discountVal, setDiscountVal] = useState(0);
  const [paidAmt, setPaidAmt] = useState(0);

  // States for Sales History filters
  const [filterDate, setFilterDate] = useState('');
  const [filterCustomer, setFilterCustomer] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // States for Returns Page
  const [returnInvoiceNo, setReturnInvoiceNo] = useState('');
  const [foundInvoice, setFoundInvoice] = useState(null);
  const [returnItemProductId, setReturnItemProductId] = useState('');
  const [returnQty, setReturnQty] = useState(1);
  const [returnReason, setReturnReason] = useState('Faulty product / Need repair replacement');
  const [returnRefundMethod, setReturnRefundMethod] = useState('Credit / Udhaar Adjustment');
  const [returnStatusMsg, setReturnStatusMsg] = useState('');

  // Invoice detailed modal
  const [activeInvoiceDetails, setActiveInvoiceDetails] = useState(null);

  // Auto-set selected product's selling price
  useEffect(() => {
    if (selectedProductId) {
      const prod = products.find(p => p.id === selectedProductId);
      if (prod) {
        setInputPrice(prod.sellingPrice);
        if (prod.serials && prod.serials.length > 0) {
          setSelectedSerial(prod.serials[0]);
        } else {
          setSelectedSerial('');
        }
      }
    }
  }, [selectedProductId, products]);

  // Billing handlers
  const handleSelectCustomer = (cust) => {
    setBillingCustomer(cust);
    setCustomerSearch('');
  };

  const handleAddNewCustomerSubmit = (e) => {
    e.preventDefault();
    if (!newCustName || !newCustMobile) return;
    const added = store.addCustomer({
      name: newCustName,
      mobile: newCustMobile,
      address: newCustAddress,
      outstanding: parseFloat(newCustOutstanding) || 0
    });
    setBillingCustomer(added);
    setNewCustName('');
    setNewCustMobile('');
    setNewCustAddress('');
    setNewCustOutstanding('0');
    setShowAddCustomerModal(false);
  };

  const handleAddBillItem = () => {
    if (!selectedProductId) return;
    const prod = products.find(p => p.id === selectedProductId);
    if (!prod) return;

    if (prod.stock < inputQty) {
      alert(`Insufficient stock. Available: ${prod.stock}`);
      return;
    }

    const newItem = {
      productId: prod.id,
      name: prod.name,
      type: prod.type,
      brand: prod.brand,
      model: prod.model,
      serialNumber: selectedSerial || '',
      quantity: parseInt(inputQty),
      sellingPrice: parseFloat(inputPrice)
    };

    setBillItems([...billItems, newItem]);
    setSelectedProductId('');
    setInputQty(1);
    setInputPrice(0);
    setSelectedSerial('');
  };

  const handleRemoveBillItem = (idx) => {
    setBillItems(billItems.filter((_, i) => i !== idx));
  };

  // Calculations for billing summary
  const subtotal = billItems.reduce((acc, item) => acc + (item.sellingPrice * item.quantity), 0);
  const gstAmt = parseFloat(((subtotal * (settings.defaultGst || 18)) / 100).toFixed(2));
  const totalVal = Math.max(0, subtotal + gstAmt - discountVal);
  const dueAmt = Math.max(0, totalVal - paidAmt);

  const handleSaveBill = (actionType) => {
    if (!billingCustomer) {
      alert("Please select or add a customer.");
      return;
    }
    if (billItems.length === 0) {
      alert("Please add at least one item to the bill.");
      return;
    }

    let status = "Unpaid";
    if (paidAmt >= totalVal) {
      status = "Paid";
    } else if (paidAmt > 0) {
      status = "Partially Paid";
    }

    const saleRecord = {
      customerId: billingCustomer.id,
      customerName: billingCustomer.name,
      customerMobile: billingCustomer.mobile,
      items: billItems,
      subtotal,
      gst: gstAmt,
      discount: discountVal,
      total: totalVal,
      paid: paidAmt,
      due: dueAmt,
      paymentMethod,
      paymentStatus: status
    };

    const newInvoice = store.addSale(saleRecord);
    alert(`Invoice ${newInvoice.invoiceNumber} saved successfully via ${actionType}!`);
    
    // Clear out POS
    setBillingCustomer(null);
    setBillItems([]);
    setDiscountVal(0);
    setPaidAmt(0);
    setPaymentMethod('Cash');

    // Route to history
    navigate('/admin/sales/history');
  };

  // Return Processing Handler
  const handleSearchReturnInvoice = () => {
    const found = sales.find(s => s.invoiceNumber === returnInvoiceNo.trim());
    if (found) {
      setFoundInvoice(found);
      setReturnStatusMsg('');
      if (found.items.length > 0) {
        setReturnItemProductId(found.items[0].productId);
      }
    } else {
      setFoundInvoice(null);
      setReturnStatusMsg('Invoice not found.');
    }
  };

  const handleProcessReturn = () => {
    if (!foundInvoice || !returnItemProductId) return;
    const ok = store.processReturn(
      foundInvoice.invoiceNumber,
      returnItemProductId,
      parseInt(returnQty),
      returnReason,
      returnRefundMethod
    );

    if (ok) {
      setReturnStatusMsg(`Successfully returned items and updated inventory stock.`);
      setFoundInvoice(null);
      setReturnInvoiceNo('');
    } else {
      setReturnStatusMsg(`Failed to process return. Check return quantity limit.`);
    }
  };

  // Filters for history
  const filteredSales = sales.filter(s => {
    const matchDate = filterDate ? s.date === filterDate : true;
    const matchCust = filterCustomer ? (s.customerName.toLowerCase().includes(filterCustomer.toLowerCase()) || s.customerMobile.includes(filterCustomer)) : true;
    const matchStatus = filterStatus ? s.paymentStatus === filterStatus : true;
    return matchDate && matchCust && matchStatus;
  });

  return (
    <div className="w-full max-w-[1200px] mx-auto animate-in fade-in duration-500 pb-12">
      {/* Subpage Header Tab links */}
      <div className="flex border-b border-slate-200 mb-8">
        <button
          onClick={() => navigate('/admin/sales/new-bill')}
          className={`px-6 py-3 font-semibold text-sm border-b-2 transition-all ${
            subpage === 'new-bill' ? 'border-[#1e2b4d] text-[#1e2b4d]' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          New Bill / POS
        </button>
        <button
          onClick={() => navigate('/admin/sales/history')}
          className={`px-6 py-3 font-semibold text-sm border-b-2 transition-all ${
            subpage === 'history' ? 'border-[#1e2b4d] text-[#1e2b4d]' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Sales History
        </button>
        <button
          onClick={() => navigate('/admin/sales/returns')}
          className={`px-6 py-3 font-semibold text-sm border-b-2 transition-all ${
            subpage === 'returns' ? 'border-[#1e2b4d] text-[#1e2b4d]' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Returns / Refunds
        </button>
      </div>

      {/* PAGE 2 — NEW BILL */}
      {subpage === 'new-bill' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customer and Items selector */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Customer Search & Info */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/60">
              <h3 className="text-[15px] font-bold text-[#1e2b4d] mb-4">Customer Details</h3>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                  <input
                    type="text"
                    placeholder="Search customer by name or mobile..."
                    value={customerSearch}
                    onChange={(e) => setCustomerSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none"
                  />
                  {customerSearch && (
                    <div className="absolute left-0 right-0 bg-white border border-slate-200 shadow-lg rounded-md mt-1 z-10 max-h-[180px] overflow-y-auto">
                      {customers
                        .filter(c => c.name.toLowerCase().includes(customerSearch.toLowerCase()) || c.mobile.includes(customerSearch))
                        .map(cust => (
                          <button
                            key={cust.id}
                            onClick={() => handleSelectCustomer(cust)}
                            className="w-full text-left px-4 py-2 text-xs hover:bg-slate-50 text-slate-700 flex justify-between"
                          >
                            <span className="font-bold">{cust.name} ({cust.mobile})</span>
                            <span className="text-slate-400">Bal: {cur}{cust.outstanding}</span>
                          </button>
                        ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setShowAddCustomerModal(true)}
                  className="bg-[#0b1c3c] hover:bg-[#1e2b4d] text-white text-[13px] font-semibold px-4 py-2 rounded-md flex items-center gap-1.5 transition-colors shrink-0"
                >
                  <LuPlus size={16} /> Add Customer
                </button>
              </div>

              {billingCustomer ? (
                <div className="bg-[#f8fafc] border border-slate-200 rounded-lg p-4 grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="text-slate-400 font-medium">Name</p>
                    <p className="text-[#1e2b4d] font-bold text-sm mt-0.5">{billingCustomer.name}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-medium">Mobile</p>
                    <p className="text-[#1e2b4d] font-bold text-sm mt-0.5">{billingCustomer.mobile}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-slate-400 font-medium">Address</p>
                    <p className="text-[#1e2b4d] font-medium mt-0.5">{billingCustomer.address || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-medium">Previous Outstanding / Udhaar</p>
                    <p className="text-rose-600 font-bold text-sm mt-0.5">{cur}{billingCustomer.outstanding.toLocaleString()}</p>
                  </div>
                  <div className="flex items-end justify-end">
                    <button
                      onClick={() => setBillingCustomer(null)}
                      className="text-xs text-rose-500 hover:underline"
                    >
                      Change Customer
                    </button>
                  </div>
                </div>
              ) : (
                <div className="border border-dashed border-slate-200 rounded-lg p-6 text-center text-slate-400 text-xs">
                  Please search and select a customer, or add a new customer first.
                </div>
              )}
            </div>

            {/* Item Entry Form & Table */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/60">
              <h3 className="text-[15px] font-bold text-[#1e2b4d] mb-4">Add Items</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6 items-end">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Select Product</label>
                  <select
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] bg-white focus:outline-none"
                  >
                    <option value="">-- Choose Product --</option>
                    {products.map(p => (
                      <option key={p.id} value={p.id}>
                        [{p.type}] {p.name} - ({p.stock} In Stock)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Selling Price ({cur})</label>
                  <input
                    type="number"
                    value={inputPrice}
                    onChange={(e) => setInputPrice(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={inputQty}
                    onChange={(e) => setInputQty(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none"
                  />
                </div>

                {selectedProductId && products.find(p => p.id === selectedProductId)?.type === 'Machine' && (
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Serial Number</label>
                    <select
                      value={selectedSerial}
                      onChange={(e) => setSelectedSerial(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] bg-white focus:outline-none"
                    >
                      {products.find(p => p.id === selectedProductId).serials.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                      {products.find(p => p.id === selectedProductId).serials.length === 0 && (
                        <option value="">No serial numbers available</option>
                      )}
                    </select>
                  </div>
                )}

                <div className="sm:col-span-2 flex justify-end">
                  <button
                    onClick={handleAddBillItem}
                    className="bg-[#0b1c3c] hover:bg-[#1e2b4d] text-white text-[13px] font-semibold px-5 py-2.5 rounded-md flex items-center gap-1.5 transition-colors w-full sm:w-auto justify-center"
                  >
                    <LuPlus size={16} /> Add to Cart
                  </button>
                </div>
              </div>

              {/* Cart Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200/60 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="px-4 py-3">Product Info</th>
                      <th className="px-4 py-3">Serial No</th>
                      <th className="px-4 py-3 text-right">Price</th>
                      <th className="px-4 py-3 text-right">Qty</th>
                      <th className="px-4 py-3 text-right">Subtotal</th>
                      <th className="px-4 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-[13px]">
                    {billItems.map((item, idx) => (
                      <tr key={idx} className="border-b border-slate-100">
                        <td className="px-4 py-3">
                          <span className="font-bold text-[#1e2b4d]">{item.name}</span>
                          <p className="text-[10px] text-slate-400 mt-0.5">{item.brand} &bull; {item.model}</p>
                        </td>
                        <td className="px-4 py-3 text-slate-500">{item.serialNumber || 'N/A'}</td>
                        <td className="px-4 py-3 text-right text-slate-700">{cur}{item.sellingPrice}</td>
                        <td className="px-4 py-3 text-right text-slate-700">{item.quantity}</td>
                        <td className="px-4 py-3 text-right font-bold text-[#1e2b4d]">
                          {cur}{(item.sellingPrice * item.quantity).toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => handleRemoveBillItem(idx)}
                            className="text-rose-500 hover:text-rose-700 transition-colors"
                          >
                            <LuTrash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {billItems.length === 0 && (
                      <tr>
                        <td colSpan="6" className="text-center text-slate-400 py-6 text-xs">
                          Cart is empty. Select products above to start building the bill.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Checkout & Bill Summary panel */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/60">
              <h3 className="text-[15px] font-bold text-[#1e2b4d] mb-4">Invoice Summary</h3>
              
              <div className="space-y-3.5 text-xs text-slate-600 border-b border-slate-100 pb-4 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#1e2b4d]">{cur}{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST ({settings.defaultGst || 18}%)</span>
                  <span className="font-bold text-[#1e2b4d]">{cur}{gstAmt.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Discount</span>
                  <input
                    type="number"
                    value={discountVal}
                    onChange={(e) => setDiscountVal(parseFloat(e.target.value) || 0)}
                    className="w-[80px] px-2 py-1 text-right border border-slate-200 rounded text-xs focus:outline-none"
                  />
                </div>
                <div className="flex justify-between text-sm font-black text-[#1e2b4d] pt-2 border-t border-slate-100">
                  <span>Total Amount</span>
                  <span>{cur}{totalVal.toLocaleString()}</span>
                </div>
              </div>

              {/* Payment Details */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Payment Method</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] bg-white focus:outline-none"
                  >
                    <option value="Cash">Cash</option>
                    <option value="UPI">UPI</option>
                    <option value="Card">Card</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Credit / Udhaar">Credit / Udhaar (Complete Debt)</option>
                    <option value="Partial Payment">Partial Payment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Paid Amount ({cur})</label>
                  <input
                    type="number"
                    max={totalVal}
                    value={paidAmt}
                    onChange={(e) => setPaidAmt(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none"
                  />
                </div>

                <div className="bg-amber-50 text-amber-800 p-3 rounded-lg flex justify-between items-center text-xs font-bold">
                  <span>Due Balance (Udhaar)</span>
                  <span>{cur}{dueAmt.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout actions */}
              <div className="space-y-2">
                <button
                  onClick={() => handleSaveBill('Save Draft')}
                  className="w-full py-2.5 rounded-md border border-slate-200 hover:bg-slate-50 text-[13px] font-semibold text-slate-600 transition-colors"
                >
                  Save Draft
                </button>
                <button
                  onClick={() => handleSaveBill('Save & Print')}
                  className="w-full py-2.5 rounded-md bg-[#0b1c3c] hover:bg-[#1e2b4d] text-white text-[13px] font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <LuPrinter size={16} /> Save & Print Bill
                </button>
                <button
                  onClick={() => handleSaveBill('Save & Download PDF')}
                  className="w-full py-2.5 rounded-md bg-slate-800 hover:bg-slate-900 text-white text-[13px] font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <LuDownload size={16} /> Save & Download PDF
                </button>
                <button
                  onClick={() => handleSaveBill('Send via WhatsApp')}
                  className="w-full py-2.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-[13px] font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <LuMessageSquare size={16} /> Send via WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PAGE 3 — SALES HISTORY */}
      {subpage === 'history' && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden">
          {/* Filters Row */}
          <div className="p-5 border-b border-slate-200/60 grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Date</label>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Customer Name / Mobile</label>
              <input
                type="text"
                placeholder="Search..."
                value={filterCustomer}
                onChange={(e) => setFilterCustomer(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Payment Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] bg-white focus:outline-none"
              >
                <option value="">All Statuses</option>
                <option value="Paid">Paid</option>
                <option value="Partially Paid">Partially Paid</option>
                <option value="Unpaid">Unpaid</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  setFilterDate('');
                  setFilterCustomer('');
                  setFilterStatus('');
                }}
                className="w-full py-2 border border-slate-200 hover:bg-slate-50 text-[13px] text-slate-600 rounded-md font-semibold transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200/60 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="px-6 py-4">Invoice No</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4 text-right">Items Quantity</th>
                  <th className="px-6 py-4 text-right">Total</th>
                  <th className="px-6 py-4 text-right">Paid</th>
                  <th className="px-6 py-4 text-right">Due (Outstanding)</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-[13px]">
                {filteredSales.map((sale) => (
                  <tr key={sale.invoiceNumber} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-[#1e2b4d]">{sale.invoiceNumber}</td>
                    <td className="px-6 py-4 text-slate-600">{sale.date}</td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-slate-700">{sale.customerName}</span>
                      <p className="text-[10px] text-slate-400 mt-0.5">{sale.customerMobile}</p>
                    </td>
                    <td className="px-6 py-4 text-right text-slate-600">
                      {sale.items.reduce((acc, curr) => acc + curr.quantity, 0)} Items
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-[#1e2b4d]">
                      {cur}{sale.total.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right text-emerald-600 font-bold">
                      {cur}{sale.paid.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right text-rose-600 font-bold">
                      {cur}{sale.due.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        sale.paymentStatus === 'Paid' ? 'bg-emerald-50 text-emerald-700' :
                        sale.paymentStatus === 'Partially Paid' ? 'bg-amber-50 text-amber-700' :
                        'bg-rose-50 text-rose-700'
                      }`}>
                        {sale.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => setActiveInvoiceDetails(sale)}
                        className="text-blue-600 hover:underline font-bold text-xs"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredSales.length === 0 && (
                  <tr>
                    <td colSpan="9" className="text-center text-slate-400 py-8">
                      No invoices match the selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PAGE 4 — RETURNS */}
      {subpage === 'returns' && (
        <div className="max-w-[700px] mx-auto bg-white rounded-xl shadow-sm border border-slate-200/60 p-6">
          <h2 className="text-[18px] font-bold text-[#1e2b4d] mb-4">Process Customer Return</h2>
          
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              placeholder="Enter Invoice Number (e.g. INV-2026-1001)..."
              value={returnInvoiceNo}
              onChange={(e) => setReturnInvoiceNo(e.target.value)}
              className="flex-1 px-4 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none"
            />
            <button
              onClick={handleSearchReturnInvoice}
              className="bg-[#0b1c3c] hover:bg-[#1e2b4d] text-white text-[13px] font-bold px-4 py-2 rounded-md transition-colors"
            >
              Search
            </button>
          </div>

          {returnStatusMsg && (
            <div className="mb-4 p-3 bg-indigo-50 border border-indigo-200 text-indigo-800 rounded-lg text-xs font-bold">
              {returnStatusMsg}
            </div>
          )}

          {foundInvoice && (
            <div className="space-y-4 border-t border-slate-100 pt-5">
              <div className="bg-slate-50 rounded-lg p-4 text-xs space-y-2">
                <p><span className="font-bold text-[#1e2b4d]">Customer:</span> {foundInvoice.customerName} ({foundInvoice.customerMobile})</p>
                <p><span className="font-bold text-[#1e2b4d]">Date Sold:</span> {foundInvoice.date}</p>
                <p><span className="font-bold text-[#1e2b4d]">Total Amount:</span> {cur}{foundInvoice.total}</p>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Select Product to Return</label>
                <select
                  value={returnItemProductId}
                  onChange={(e) => setReturnItemProductId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] bg-white focus:outline-none"
                >
                  {foundInvoice.items.map(item => (
                    <option key={item.productId} value={item.productId}>
                      {item.name} - (Sold Qty: {item.quantity} at {cur}{item.sellingPrice})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Return Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={returnQty}
                    onChange={(e) => setReturnQty(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Refund Mode</label>
                  <select
                    value={returnRefundMethod}
                    onChange={(e) => setReturnRefundMethod(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] bg-white focus:outline-none"
                  >
                    <option value="Credit / Udhaar Adjustment">Credit / Udhaar Adjustment</option>
                    <option value="Cash Refund">Cash Refund</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Reason for Return</label>
                <input
                  type="text"
                  value={returnReason}
                  onChange={(e) => setReturnReason(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none"
                />
              </div>

              <button
                onClick={handleProcessReturn}
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-[13px] font-bold rounded-md transition-colors"
              >
                Submit Return & Restock Inventory
              </button>
            </div>
          )}
        </div>
      )}

      {/* Invoice Details Modal */}
      {activeInvoiceDetails && (
        <div className="fixed inset-0 bg-slate-900/40 z-50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-[600px] w-full p-6 relative">
            <h3 className="text-[17px] font-bold text-[#1e2b4d] mb-4">Invoice {activeInvoiceDetails.invoiceNumber}</h3>
            
            <div className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded-lg">
                <div>
                  <p className="text-slate-400">Customer</p>
                  <p className="font-bold text-[#1e2b4d]">{activeInvoiceDetails.customerName}</p>
                </div>
                <div>
                  <p className="text-slate-400">Mobile</p>
                  <p className="font-bold text-[#1e2b4d]">{activeInvoiceDetails.customerMobile}</p>
                </div>
                <div>
                  <p className="text-slate-400">Invoice Date</p>
                  <p className="font-bold text-[#1e2b4d]">{activeInvoiceDetails.date}</p>
                </div>
                <div>
                  <p className="text-slate-400">Status</p>
                  <p className="font-bold text-[#1e2b4d]">{activeInvoiceDetails.paymentStatus}</p>
                </div>
              </div>

              <h4 className="font-bold text-[#1e2b4d] border-b border-slate-100 pb-1.5">Purchased Items</h4>
              <div className="space-y-2">
                {activeInvoiceDetails.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center bg-slate-50/50 p-2 rounded">
                    <div>
                      <p className="font-bold text-[#1e2b4d]">{item.name}</p>
                      <p className="text-[10px] text-slate-400">{item.brand} &bull; {item.model} &bull; Serial: {item.serialNumber || 'N/A'}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-700">{cur}{item.sellingPrice} x {item.quantity}</p>
                      <p className="text-[11px] font-black text-[#1e2b4d]">{cur}{(item.sellingPrice * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-200 pt-3 space-y-1.5 font-medium text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{cur}{activeInvoiceDetails.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST ({settings.defaultGst || 18}%)</span>
                  <span>{cur}{activeInvoiceDetails.gst}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#1e2b4d] border-t border-slate-100 pt-2">
                  <span>Grand Total</span>
                  <span>{cur}{activeInvoiceDetails.total}</span>
                </div>
                <div className="flex justify-between text-emerald-600">
                  <span>Paid Amount</span>
                  <span>{cur}{activeInvoiceDetails.paid}</span>
                </div>
                <div className="flex justify-between text-rose-600 font-bold">
                  <span>Due Balance (Udhaar)</span>
                  <span>{cur}{activeInvoiceDetails.due}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setActiveInvoiceDetails(null)}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Customer Modal */}
      {showAddCustomerModal && (
        <div className="fixed inset-0 bg-slate-900/40 z-50 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleAddNewCustomerSubmit} className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-[450px] w-full p-6 relative">
            <h3 className="text-[16px] font-bold text-[#1e2b4d] mb-4">Add New Customer</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Customer Name *</label>
                <input
                  type="text"
                  required
                  value={newCustName}
                  onChange={(e) => setNewCustName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Mobile / Phone Number *</label>
                <input
                  type="text"
                  required
                  value={newCustMobile}
                  onChange={(e) => setNewCustMobile(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Address</label>
                <input
                  type="text"
                  value={newCustAddress}
                  onChange={(e) => setNewCustAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Opening Outstanding / Udhaar ({cur})</label>
                <input
                  type="number"
                  value={newCustOutstanding}
                  onChange={(e) => setNewCustOutstanding(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={() => setShowAddCustomerModal(false)}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#0b1c3c] hover:bg-[#1e2b4d] text-white text-xs font-bold rounded"
              >
                Create Customer
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Sales;
