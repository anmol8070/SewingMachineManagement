import React, { useState } from 'react';
import {
  LuSearch,
  LuMenu,
  LuX,
  LuSend,
  LuTruck,
  LuShield,
  LuWrench,
  LuChevronDown,
  LuRotateCcw
} from 'react-icons/lu';
import { MdCheckCircle, MdOutlineVerified, MdHelpOutline } from 'react-icons/md';

const RequestService = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    productModel: '',
    serialNumber: '',
    complaintDescription: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleClearForm = () => {
    setFormData({
      fullName: '',
      mobileNumber: '',
      productModel: '',
      serialNumber: '',
      complaintDescription: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans antialiased flex flex-col justify-between">
      <div>
        
        {/* ================= HEADER NAVIGATION ================= */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              
              {/* Brand Logo */}
              <div className="flex items-center">
                <a href="/" className="text-xl font-extrabold text-[#0e2246] tracking-tight">
                  SewPro Industrial
                </a>
              </div>

              {/* Navigation Links */}
              <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600">
                <a href="#home" className="hover:text-[#0e2246] transition">Home</a>
                <a href="#inventory" className="hover:text-[#0e2246] transition">Inventory</a>
                <a href="#technicians" className="hover:text-[#0e2246] transition">Technicians</a>
                <a href="#warranty" className="hover:text-[#0e2246] transition">Warranty</a>
                <a href="#request" className="text-[#0e2246] font-bold border-b-2 border-[#0e2246] pb-0.5 transition">
                  Request Service
                </a>
              </nav>

              {/* Header Right Actions */}
              <div className="flex items-center gap-4">
                <button className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#0e2246] transition">
                  <MdHelpOutline className="w-4 h-4 text-slate-400" />
                  <span>Help & Support</span>
                </button>

                <button className="hidden sm:inline-flex bg-[#0e2246] hover:bg-slate-800 text-white font-semibold px-5 py-2 rounded-lg text-xs transition shadow-xs">
                  Login
                </button>

                {/* Mobile Menu Button */}
                <button 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition"
                  aria-label="Toggle Navigation Menu"
                >
                  {mobileMenuOpen ? <LuX className="w-6 h-6" /> : <LuMenu className="w-6 h-6" />}
                </button>
              </div>

            </div>
          </div>

          {/* Mobile Collapsible Navigation Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3">
              <a href="#home" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md font-medium text-slate-700 hover:bg-slate-50">Home</a>
              <a href="#inventory" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md font-medium text-slate-700 hover:bg-slate-50">Inventory</a>
              <a href="#technicians" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md font-medium text-slate-700 hover:bg-slate-50">Technicians</a>
              <a href="#warranty" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md font-medium text-slate-700 hover:bg-slate-50">Warranty</a>
              <a href="#request" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md font-bold text-[#0e2246] bg-slate-100">Request Service</a>
              <div className="pt-2">
                <button className="w-full bg-[#0e2246] text-white font-semibold py-2 rounded-md text-xs">
                  Login
                </button>
              </div>
            </div>
          )}
        </header>

        {/* ================= MAIN CONTENT AREA ================= */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 space-y-8">
          
          {/* Page Title & Subtitle */}
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0e2246] tracking-tight">
              Submit a Repair Request
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm font-normal">
              Professional industrial maintenance at your fingertips. Guaranteed 24h response time.
            </p>
          </div>

          {/* Main Grid: Form Left, Side Cards Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: Request Service Form Box */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-xs">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* SECTION 1: CUSTOMER INFORMATION */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-[#0e2246] tracking-wider uppercase">
                    CUSTOMER INFORMATION
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-semibold text-slate-600">
                        Full Name
                      </label>
                      <input 
                        type="text" 
                        placeholder="e.g. Michael Chen" 
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0e2246]/20 focus:border-[#0e2246] transition"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-semibold text-slate-600">
                        Mobile Number
                      </label>
                      <input 
                        type="tel" 
                        placeholder="+1 (555) 000-0000" 
                        value={formData.mobileNumber}
                        onChange={(e) => setFormData({...formData, mobileNumber: e.target.value})}
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0e2246]/20 focus:border-[#0e2246] transition"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION 2: MACHINE DETAILS */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-xs font-bold text-[#0e2246] tracking-wider uppercase">
                    MACHINE DETAILS
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-semibold text-slate-600">
                        Product Model
                      </label>
                      <div className="relative">
                        <select 
                          value={formData.productModel}
                          onChange={(e) => setFormData({...formData, productModel: e.target.value})}
                          className="w-full bg-slate-50/50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-[#0e2246]/20 focus:border-[#0e2246] transition cursor-pointer"
                          required
                        >
                          <option value="" disabled>Select Model</option>
                          <option value="SewPro-9000X Elite">SewPro-9000X Elite</option>
                          <option value="TitanThread V8">TitanThread V8</option>
                          <option value="LeatherMaster Pro-Z">LeatherMaster Pro-Z</option>
                          <option value="Overlock Serger 500">Overlock Serger 500</option>
                        </select>
                        <LuChevronDown className="absolute right-3 top-3 text-slate-400 w-4 h-4 pointer-events-none" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-semibold text-slate-600">
                        Serial Number
                      </label>
                      <input 
                        type="text" 
                        placeholder="e.g. SN-984422-X" 
                        value={formData.serialNumber}
                        onChange={(e) => setFormData({...formData, serialNumber: e.target.value})}
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0e2246]/20 focus:border-[#0e2246] transition font-mono"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION 3: ISSUE DESCRIPTION */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-xs font-bold text-[#0e2246] tracking-wider uppercase">
                    ISSUE DESCRIPTION
                  </h3>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-semibold text-slate-600">
                      Description of Complaint
                    </label>
                    <textarea 
                      rows={6}
                      placeholder="Please describe the issue in detail. Include any error codes displayed on the machine panel." 
                      value={formData.complaintDescription}
                      onChange={(e) => setFormData({...formData, complaintDescription: e.target.value})}
                      className="w-full bg-slate-50/50 border border-slate-200 rounded-lg px-3.5 py-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0e2246]/20 focus:border-[#0e2246] transition resize-none"
                      required
                    ></textarea>
                  </div>
                </div>

                {/* FORM BUTTONS */}
                <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-100">
                  <button 
                    type="button"
                    onClick={handleClearForm}
                    className="text-slate-500 hover:text-slate-800 font-semibold text-xs transition px-3 py-2"
                  >
                    Clear Form
                  </button>

                  <button 
                    type="submit"
                    className="bg-[#0e2246] hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-lg transition shadow-md flex items-center gap-2"
                  >
                    <span>Submit Request</span>
                    <LuSend className="w-3.5 h-3.5 rotate-45" />
                  </button>
                </div>

                {submitted && (
                  <p className="text-xs text-emerald-600 font-semibold text-right animate-in fade-in">
                    ✓ Repair request submitted! A case manager will contact you within 24 hours.
                  </p>
                )}

              </form>
            </div>

            {/* RIGHT COLUMN: 3 Stacked Cards */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Card 1: Concierge Service */}
              <div className="bg-[#132c54] text-white rounded-2xl p-6 sm:p-8 shadow-md space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-400/30">
                    <LuWrench className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Concierge Service
                  </h3>
                </div>

                <p className="text-slate-300 text-xs leading-relaxed">
                  Every repair request is assigned a dedicated case manager who oversees the entire restoration process from pick-up to delivery.
                </p>

                <ul className="space-y-2.5 text-xs text-slate-200 pt-1">
                  <li className="flex items-center gap-2.5">
                    <MdCheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Dedicated Priority Scheduling</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <MdCheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Real-time SMS Status Updates</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <MdCheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Free Diagnostic Report</span>
                  </li>
                </ul>
              </div>

              {/* Card 2: Why SewPro Manager? */}
              <div className="bg-[#f1f5f9] rounded-2xl p-6 sm:p-8 border border-slate-200/80 space-y-5">
                <h3 className="text-sm font-bold text-[#0e2246]">
                  Why SewPro Manager?
                </h3>

                <div className="space-y-4">
                  {/* Feature 1 */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                      <MdOutlineVerified className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">OEM Certified</h4>
                      <p className="text-slate-500 text-[11px] leading-relaxed mt-0.5">
                        All technicians are factory trained and use genuine parts only.
                      </p>
                    </div>
                  </div>

                  {/* Feature 2 */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                      <LuTruck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">On-site Support</h4>
                      <p className="text-slate-500 text-[11px] leading-relaxed mt-0.5">
                        We come to you. Mobile repair units available for industrial clients.
                      </p>
                    </div>
                  </div>

                  {/* Feature 3 */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                      <LuShield className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">90-Day Warranty</h4>
                      <p className="text-slate-500 text-[11px] leading-relaxed mt-0.5">
                        All repairs are backed by our comprehensive labor and parts guarantee.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: World Class Labs Image */}
              <div className="relative rounded-2xl overflow-hidden h-48 shadow-md border border-slate-200 group">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop" 
                  alt="World Class Labs" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e2246]/90 via-[#0e2246]/40 to-transparent"></div>
                
                <div className="absolute bottom-5 left-5 text-white space-y-0.5">
                  <span className="block text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                    Professional Facility
                  </span>
                  <h4 className="text-xl font-extrabold text-white tracking-tight">
                    World Class Labs
                  </h4>
                </div>
              </div>

            </div>

          </div>

        </main>
      </div>

      {/* ================= FOOTER SECTION (Matching Screenshot 1) ================= */}
      <footer className="bg-[#e2e8f0]/80 text-slate-600 py-6 border-t border-slate-300 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-center sm:text-left">
            <span className="font-bold text-[#0e2246] text-sm tracking-tight">
              SewPro Industrial
            </span>
            <span className="text-slate-500">
              © 2024 SewPro Manager Systems. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-6 text-slate-600 font-medium">
            <a href="#privacy" className="hover:text-slate-900 transition">Privacy Policy</a>
            <a href="#terms" className="hover:text-slate-900 transition">Terms of Service</a>
            <a href="#contact" className="hover:text-slate-900 transition">Contact Us</a>
          </div>

        </div>
      </footer>
    </div>
  );
};

export default RequestService;
