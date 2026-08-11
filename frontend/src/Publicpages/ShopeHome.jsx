import React, { useState } from 'react';
import {
  LuClock,
  LuLayers,
  LuShieldCheck,
  LuArrowRight,
  LuShoppingCart,
  LuChevronRight,
  LuChevronLeft,
  LuSearch,
  LuMenu,
  LuX,
  LuWrench,
  LuPhoneCall,
  LuGlobe,
  LuMail,
  LuPhone
} from 'react-icons/lu';
import { MdCheckCircle } from 'react-icons/md';

const ShopeHome = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [serialNumber, setSerialNumber] = useState('');
  const [warrantyResult, setWarrantyResult] = useState(null);
  const [cartCount, setCartCount] = useState(2);

  // Machine Carousel / Product Data
  const featuredMachines = [
    {
      id: 1,
      name: 'SewPro-9000X Elite',
      category: 'SINGLE NEEDLE LOCKSTITCH',
      price: '$4,250.00',
      status: 'Available',
      statusType: 'success',
      image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 2,
      name: 'TitanThread V8',
      category: 'MULTI-HEAD EMBROIDERY',
      price: '$12,800.00',
      status: 'Available',
      statusType: 'success',
      image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 3,
      name: 'LeatherMaster Pro-Z',
      category: 'HEAVY DUTY WALKING FOOT',
      price: '$6,100.00',
      status: 'Low Stock',
      statusType: 'warning',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop',
    },
  ];

  const handleVerifyWarranty = (e) => {
    e.preventDefault();
    if (!serialNumber.trim()) return;
    setWarrantyResult({
      valid: true,
      serial: serialNumber.toUpperCase(),
      status: 'Active Coverage',
      expires: 'Dec 2027',
      model: 'SewPro-9000X Elite'
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans antialiased">
      {/* Top Announcement Bar */}
      <div className="bg-[#071739] text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Factory Outlet Open
            </span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span className="hidden sm:inline text-slate-300">Same-day dispatch for OEM replacement parts</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="tel:18005550199" className="hover:text-white transition flex items-center gap-1">
              <LuPhoneCall className="w-3.5 h-3.5" />
              <span>1-800-555-0199</span>
            </a>
            <span className="hidden md:inline hover:text-white transition cursor-pointer">Support Portal</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Brand Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#071739] text-white flex items-center justify-center font-bold text-xl shadow-md">
                S
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-[#071739] tracking-tight leading-none">
                  SewPro<span className="text-blue-600">Industrial</span>
                </span>
                <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase mt-0.5">
                  Public Equipment Portal
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600">
              <a href="#hero" className="text-blue-600 hover:text-blue-700 transition">Shop Home</a>
              <a href="#machines" className="hover:text-[#071739] transition">Featured Machines</a>
              <a href="#parts" className="hover:text-[#071739] transition">OEM Parts</a>
              <a href="#warranty" className="hover:text-[#071739] transition">Warranty Check</a>
              <a href="#fleet" className="hover:text-[#071739] transition">Fleet Care</a>
            </nav>

            {/* Search & Cart Actions */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center bg-slate-100 rounded-lg px-3 py-1.5 border border-slate-200 text-sm w-48 lg:w-64 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition">
                <LuSearch className="text-slate-400 w-4 h-4 mr-2" />
                <input 
                  type="text" 
                  placeholder="Search model or part #..." 
                  className="bg-transparent border-none outline-none text-slate-700 placeholder-slate-400 text-xs w-full"
                />
              </div>

              <button className="relative p-2 text-slate-700 hover:text-[#071739] hover:bg-slate-100 rounded-lg transition">
                <LuShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Hamburger Menu Button */}
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

        {/* Mobile Navigation Drawer / Sidebar */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
            <div className="mb-4">
              <div className="flex items-center bg-slate-100 rounded-lg px-3 py-2 border border-slate-200">
                <LuSearch className="text-slate-400 w-4 h-4 mr-2" />
                <input 
                  type="text" 
                  placeholder="Search machines, parts..." 
                  className="bg-transparent border-none outline-none text-slate-700 text-sm w-full"
                />
              </div>
            </div>
            <a 
              href="#hero" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md font-semibold text-blue-600 bg-blue-50"
            >
              Shop Home
            </a>
            <a 
              href="#machines" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md font-medium text-slate-700 hover:bg-slate-50"
            >
              Featured Machines
            </a>
            <a 
              href="#parts" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md font-medium text-slate-700 hover:bg-slate-50"
            >
              OEM Parts Catalog
            </a>
            <a 
              href="#warranty" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md font-medium text-slate-700 hover:bg-slate-50"
            >
              Warranty Status Check
            </a>
            <a 
              href="#fleet" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md font-medium text-slate-700 hover:bg-slate-50"
            >
              Fleet Management
            </a>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
        
        {/* ================= HERO BANNER SECTION ================= */}
        <section id="hero" className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-900 border border-slate-800">
          {/* Background Image with Dark Semi-Transparent Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1920&auto=format&fit=crop" 
              alt="Industrial Sewing Factory Floor" 
              className="w-full h-full object-cover object-center opacity-40 mix-blend-overlay scale-105 transform transition duration-1000 hover:scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#030b1e]/95 via-[#071739]/80 to-transparent"></div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 p-8 sm:p-12 md:p-16 lg:p-20 max-w-2xl text-white space-y-6">
            <div className="inline-block">
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-slate-300 uppercase bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                Industrial-Grade Performance
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
              Trusted Support for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
                Industrial Success
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal max-w-xl">
              The Web Public Portal is your dedicated hub for reliable industrial sewing solutions. Access expert support, genuine parts, and comprehensive service to keep your operations running smoothly.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a 
                href="#machines"
                className="inline-flex items-center gap-2 bg-white text-[#071739] hover:bg-slate-100 px-6 py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Browse Inventory
                <LuArrowRight className="w-4 h-4" />
              </a>

              <a 
                href="#contact"
                className="inline-flex items-center gap-2 bg-transparent text-white border border-white/40 hover:bg-white/10 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all backdrop-blur-sm"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </section>

        {/* ================= 3 FEATURE STAT CARDS ================= */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-6 z-20 relative">
          
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md border border-slate-200/70 transition flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#071739] text-white flex items-center justify-center shrink-0 shadow-md">
              <LuClock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-1">24h Response</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Our global network of technicians ensures your line never stays down for more than a day.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md border border-slate-200/70 transition flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <LuLayers className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-1">50k+ Parts</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                A comprehensive inventory of OEM components for every industrial model in current use.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md border border-slate-200/70 transition flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <LuShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-1">Certified Experts</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Every technician is factory-trained on the latest SewPro and Brother industrial standards.
              </p>
            </div>
          </div>

        </section>

        {/* ================= FEATURED MACHINES SECTION ================= */}
        <section id="machines" className="space-y-6">
          
          {/* Header with Navigation Arrows */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071739] tracking-tight">
                Featured Machines
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm mt-1">
                Explore our top-performing industrial units for Q4.
              </p>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button 
                className="w-9 h-9 rounded-xl border border-slate-300 bg-white text-slate-600 hover:bg-slate-100 flex items-center justify-center transition shadow-xs"
                aria-label="Previous Page"
              >
                <LuChevronLeft className="w-5 h-5" />
              </button>
              <button 
                className="w-9 h-9 rounded-xl border border-slate-300 bg-white text-slate-600 hover:bg-slate-100 flex items-center justify-center transition shadow-xs"
                aria-label="Next Page"
              >
                <LuChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Machine Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredMachines.map((machine) => (
              <div 
                key={machine.id}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group"
              >
                {/* Machine Image Banner with Status Badge */}
                <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                  <img 
                    src={machine.image} 
                    alt={machine.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <span 
                      className={`text-[11px] font-semibold px-3 py-1 rounded-full shadow-sm ${
                        machine.statusType === 'success' 
                          ? 'bg-emerald-500 text-white' 
                          : 'bg-amber-500 text-white'
                      }`}
                    >
                      {machine.status}
                    </span>
                  </div>
                </div>

                {/* Machine Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                      {machine.category}
                    </span>
                    <h3 className="font-extrabold text-slate-900 text-lg mt-0.5 group-hover:text-blue-600 transition">
                      {machine.name}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div>
                      <span className="text-xl font-extrabold text-[#071739]">
                        {machine.price}
                      </span>
                    </div>

                    <button 
                      onClick={() => setCartCount(cartCount + 1)}
                      className="w-10 h-10 rounded-xl bg-[#071739] hover:bg-blue-700 text-white flex items-center justify-center shadow-md transition-colors"
                      title="Add to Quote / Cart"
                    >
                      <LuShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= WARRANTY & FLEET MANAGEMENT SECTION ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Warranty Status Check Card (Dark Navy Blue) */}
          <div id="warranty" className="lg:col-span-7 bg-[#071739] text-white rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div className="relative z-10 space-y-4 max-w-xl">
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Warranty Status Check
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Instantly verify the coverage status of your SewPro equipment using your serial number.
              </p>

              {/* Warranty Input Form */}
              <form onSubmit={handleVerifyWarranty} className="flex flex-col sm:flex-row gap-3 pt-2">
                <input 
                  type="text" 
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                  placeholder="Enter Serial Number (e.g. SN-8929...)" 
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  required
                />
                <button 
                  type="submit"
                  className="bg-[#c2d7f2] hover:bg-white text-[#071739] font-bold px-6 py-3 rounded-xl text-sm transition shadow-md shrink-0"
                >
                  Verify
                </button>
              </form>

              {/* Result Preview */}
              {warrantyResult && (
                <div className="mt-4 p-4 rounded-2xl bg-white/10 border border-white/20 text-xs space-y-1 animate-in fade-in duration-300">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <MdCheckCircle className="w-4 h-4" />
                    <span>Serial #{warrantyResult.serial}: {warrantyResult.status}</span>
                  </div>
                  <p className="text-slate-300">Model: {warrantyResult.model} • Full Factory Coverage through {warrantyResult.expires}.</p>
                </div>
              )}
            </div>
          </div>

          {/* Fleet Management Card (Light Grey) */}
          <div id="fleet" className="lg:col-span-5 bg-[#e2e8f0]/90 rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-xs border border-slate-300/60">
            <div className="space-y-4">
              <h3 className="text-2xl font-extrabold text-[#071739] tracking-tight">
                Fleet Management
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Register multiple units and schedule recurring maintenance for your entire factory floor.
              </p>
            </div>

            <div className="pt-6">
              <a 
                href="#fleet-learn" 
                className="inline-flex items-center gap-2 font-bold text-sm text-[#071739] hover:text-blue-700 transition"
              >
                Learn More
                <LuArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </section>

        {/* ================= NEED EXPERT REPAIR BANNER ================= */}
        <section className="bg-gradient-to-r from-[#dce9fa] via-[#e2edfc] to-[#d6e4f8] rounded-3xl p-6 sm:p-8 border border-blue-200/80 shadow-xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#071739] text-white flex items-center justify-center shrink-0 shadow-md">
                <LuWrench className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-lg">
                  Need Expert Repair?
                </h4>
                <p className="text-slate-600 text-xs sm:text-sm mt-0.5">
                  Book a certified technician in under 2 minutes. Priority status available for pro members.
                </p>
              </div>
            </div>

            <button className="bg-[#071739] hover:bg-blue-900 text-white font-bold text-sm px-6 py-3.5 rounded-xl transition shadow-md whitespace-nowrap self-stretch md:self-auto text-center">
              Schedule Service Now
            </button>
          </div>
        </section>

      </main>

      {/* Footer Matching Screenshot 1 & 2 */}
      <footer className="bg-[#031530] text-slate-300 mt-16 pt-16 pb-10 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12">
            
            {/* Column 1: Brand Info & Social Icons */}
            <div className="lg:col-span-4 space-y-4">
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Web Public Portal
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
                Your trusted gateway to industrial sewing excellence. Providing dedicated support and precision solutions for global manufacturing since 1978.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <a href="#globe" className="text-slate-300 hover:text-white transition" aria-label="Website">
                  <LuGlobe className="w-5 h-5" />
                </a>
                <a href="#mail" className="text-slate-300 hover:text-white transition" aria-label="Email">
                  <LuMail className="w-5 h-5" />
                </a>
                <a href="#phone" className="text-slate-300 hover:text-white transition" aria-label="Phone">
                  <LuPhone className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Column 2: INVENTORY */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-xs font-bold text-white tracking-wider uppercase">
                INVENTORY
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
                <li><a href="#lockstitch" className="hover:text-white transition">Lockstitch Machines</a></li>
                <li><a href="#overlock" className="hover:text-white transition">Overlock & Sergers</a></li>
                <li><a href="#embroidery" className="hover:text-white transition">Embroidery Systems</a></li>
                <li><a href="#cutters" className="hover:text-white transition">Automated Cutters</a></li>
              </ul>
            </div>

            {/* Column 3: SUPPORT */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-xs font-bold text-white tracking-wider uppercase">
                SUPPORT
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
                <li><a href="#manuals" className="hover:text-white transition">Technical Manuals</a></li>
                <li><a href="#parts" className="hover:text-white transition">Parts Catalog</a></li>
                <li><a href="#maintenance" className="hover:text-white transition">Maintenance Pro</a></li>
                <li><a href="#warranty" className="hover:text-white transition">Warranty Policy</a></li>
              </ul>
            </div>

            {/* Column 4: JOIN PRO NETWORK */}
            <div className="lg:col-span-4 space-y-4">
              <h4 className="text-xs font-bold text-white tracking-wider uppercase">
                JOIN PRO NETWORK
              </h4>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Get exclusive pricing and priority service booking.
              </p>
              
              <form onSubmit={(e) => e.preventDefault()} className="flex items-center pt-1">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="w-full bg-[#0a1e3f] border border-slate-700/60 rounded-l-lg px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-400 transition"
                  required
                />
                <button 
                  type="submit"
                  className="bg-[#dce9fa] hover:bg-white text-[#031530] font-bold text-xs sm:text-sm px-5 py-2.5 rounded-r-lg transition whitespace-nowrap"
                >
                  Join
                </button>
              </form>
            </div>

          </div>

          {/* Sub-Footer Line */}
          <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>© 2024 Web Public Portal. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#privacy" className="hover:text-white transition">Privacy Policy</a>
              <a href="#terms" className="hover:text-white transition">Terms of Service</a>
              <a href="#cookies" className="hover:text-white transition">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ShopeHome;
