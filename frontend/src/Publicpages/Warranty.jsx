import React, { useState } from 'react';
import {
  LuShieldCheck,
  LuSearch,
  LuArrowRight,
  LuInfo,
  LuDownload,
  LuQrCode,
  LuSearchCode,
  LuHeadphones,
  LuRotateCcw,
  LuMenu,
  LuX
} from 'react-icons/lu';
import { MdCheckCircle, MdHelpOutline } from 'react-icons/md';

const Warranty = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [serialInput, setSerialInput] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = (e) => {
    e.preventDefault();
    if (!serialInput.trim()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVerificationResult({
        serial: serialInput.toUpperCase(),
        status: 'Active Platinum Coverage',
        model: 'SewPro-9000X Elite Industrial Lockstitch',
        purchaseDate: 'October 14, 2025',
        expiryDate: 'October 14, 2028',
        owner: 'Global Apparel Logistics Corp',
        registeredTech: 'Certified Regional Node-North'
      });
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans antialiased pb-16">
      
      {/* ================= TOP HEADER BAR ================= */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Brand Logo */}
            <div className="flex items-center">
              <a href="/" className="text-xl font-extrabold text-[#0e2246] tracking-tight">
                SewPro Industrial
              </a>
            </div>

            {/* Global Search Bar (Center) */}
            <div className="hidden md:flex items-center bg-slate-100 rounded-full px-4 py-2 text-xs w-80 lg:w-96 border border-slate-200/80 focus-within:ring-2 focus-within:ring-[#0e2246]/20 transition">
              <LuSearch className="text-slate-400 w-4 h-4 mr-2.5 shrink-0" />
              <input 
                type="text" 
                placeholder="Global Search..." 
                className="bg-transparent border-none outline-none text-slate-700 placeholder-slate-400 w-full"
              />
            </div>

            {/* Support Link & User Avatar */}
            <div className="flex items-center gap-5">
              <a 
                href="#support" 
                className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#0e2246] transition"
              >
                <MdHelpOutline className="w-4 h-4 text-slate-500" />
                <span>Support</span>
              </a>

              <div className="w-8 h-8 rounded-full bg-[#132c54] text-white font-bold text-xs flex items-center justify-center shadow-sm">
                AD
              </div>

              {/* Mobile Hamburger Button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <LuX className="w-6 h-6" /> : <LuMenu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3">
            <div className="mb-3">
              <div className="flex items-center bg-slate-100 rounded-lg px-3 py-2 border border-slate-200 text-xs">
                <LuSearch className="text-slate-400 w-4 h-4 mr-2" />
                <input 
                  type="text" 
                  placeholder="Global Search..." 
                  className="bg-transparent border-none outline-none text-slate-700 w-full"
                />
              </div>
            </div>
            <a href="/" className="block px-3 py-2 rounded-md font-medium text-slate-700 hover:bg-slate-50 text-sm">Home</a>
            <a href="#support" className="block px-3 py-2 rounded-md font-medium text-slate-700 hover:bg-slate-50 text-sm">Support Portal</a>
          </div>
        )}
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-10">
        
        {/* Page Title & Eyebrow Badge */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold px-4 py-1.5 rounded-full border border-blue-200/60 shadow-2xs">
            <LuShieldCheck className="w-4 h-4 text-blue-600" />
            <span className="tracking-wider uppercase text-[11px]">OFFICIAL VERIFICATION PORTAL</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0e2246] tracking-tight">
            Verify Your Machine Warranty
          </h1>

          <p className="text-slate-500 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed">
            Instantly check the warranty status, service history, and technical specifications for any SewPro Industrial unit using your serial number or invoice ID.
          </p>
        </div>

        {/* ================= TWO CARD INPUT GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT CARD: Serial Number Form */}
          <div className="md:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <label className="block text-xs font-semibold text-slate-600">
                Enter Serial or Invoice Number
              </label>

              <form onSubmit={handleVerify} className="flex flex-col sm:flex-row items-stretch gap-0 rounded-xl overflow-hidden border border-slate-300 focus-within:ring-2 focus-within:ring-[#0e2246]/20 focus-within:border-[#0e2246] transition">
                <div className="relative flex-1 bg-white flex items-center px-4 py-3">
                  <input 
                    type="text" 
                    value={serialInput}
                    onChange={(e) => setSerialInput(e.target.value)}
                    placeholder="e.g. SN-992-881-22" 
                    className="w-full bg-transparent border-none outline-none font-mono text-slate-800 placeholder-slate-400 text-sm tracking-wider uppercase font-semibold"
                    required
                  />
                  <LuQrCode className="text-slate-400 w-5 h-5 ml-2 shrink-0" />
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="bg-[#0e2246] hover:bg-slate-800 text-white font-semibold px-6 py-3.5 text-xs sm:text-sm transition flex items-center justify-center gap-2 shrink-0"
                >
                  <span>{loading ? 'Verifying...' : 'Verify Now'}</span>
                  <LuArrowRight className="w-4 h-4" />
                </button>
              </form>

              <p className="text-slate-400 text-[11px] sm:text-xs leading-relaxed pt-2">
                Can't find your number? Check the silver plate located on the rear chassis of the machine or your digital purchase receipt.
              </p>
            </div>
          </div>

          {/* RIGHT CARD: What data is required? */}
          <div className="md:col-span-5 bg-[#132c54] text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-md space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white tracking-tight">
                What data is required?
              </h3>

              <ul className="space-y-3 text-xs text-slate-200">
                <li className="flex items-center gap-3">
                  <MdCheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>12-digit Machine Serial Number (SN)</span>
                </li>
                <li className="flex items-center gap-3">
                  <MdCheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Valid Purchase Invoice/Receipt Number</span>
                </li>
                <li className="flex items-center gap-3">
                  <LuInfo className="w-4 h-4 text-sky-300 shrink-0" />
                  <span>Installation date (for manual lookups)</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-700/70">
              <a 
                href="#download-guide" 
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-200 hover:text-white transition"
              >
                <span>Download Warranty Guide PDF</span>
                <LuDownload className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* ================= AWAITING INPUT / RESULTS DISPLAY ================= */}
        {!verificationResult ? (
          <div className="border-2 border-dashed border-slate-300/80 rounded-2xl p-10 sm:p-14 text-center bg-slate-50/50 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-200/70 text-slate-500 flex items-center justify-center mx-auto">
              <LuSearchCode className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-[#0e2246] text-base">
                Awaiting Input
              </h3>
              <p className="text-slate-400 text-xs max-w-sm mx-auto leading-relaxed">
                Results will appear here once a valid identifier is entered above.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-emerald-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                  <LuShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-emerald-600 tracking-wider uppercase">
                    VERIFIED PRODUCT
                  </span>
                  <h3 className="font-bold text-[#0e2246] text-base">
                    {verificationResult.serial}
                  </h3>
                </div>
              </div>

              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full self-start sm:self-auto">
                {verificationResult.status}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Machine Model</span>
                <span className="font-semibold text-slate-800">{verificationResult.model}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Registered Owner</span>
                <span className="font-semibold text-slate-800">{verificationResult.owner}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Coverage Start</span>
                <span className="font-semibold text-slate-800">{verificationResult.purchaseDate}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Valid Until</span>
                <span className="font-semibold text-emerald-700 font-bold">{verificationResult.expiryDate}</span>
              </div>
            </div>
          </div>
        )}

        {/* ================= 3 FEATURE CARDS (BOTTOM ROW) ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-2xs space-y-3">
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-[#0e2246] flex items-center justify-center">
              <LuShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-[#0e2246] text-sm">
              Authenticity Check
            </h4>
            <p className="text-slate-500 text-xs leading-relaxed">
              Every verified SewPro machine includes a certificate of authenticity linked to your warranty profile.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-2xs space-y-3">
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-[#0e2246] flex items-center justify-center">
              <LuHeadphones className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-[#0e2246] text-sm">
              Priority Support
            </h4>
            <p className="text-slate-500 text-xs leading-relaxed">
              Active warranty holders get 24/7 access to our industrial technicians and replacement parts.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-2xs space-y-3">
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-[#0e2246] flex items-center justify-center">
              <LuRotateCcw className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-[#0e2246] text-sm">
              Extended Coverage
            </h4>
            <p className="text-slate-500 text-xs leading-relaxed">
              Within 30 days of purchase, you can upgrade to our Platinum Lifetime coverage program.
            </p>
          </div>

        </div>

      </main>
    </div>
  );
};

export default Warranty;
