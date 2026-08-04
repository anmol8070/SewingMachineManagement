import React, { useState } from 'react';
import {
  LuSearch,
  LuMenu,
  LuX,
  LuMapPin,
  LuPhone,
  LuClock,
  LuWrench,
  LuSend,
  LuCompass,
  LuNavigation,
  LuMessageSquare
} from 'react-icons/lu';
import { BsWhatsapp } from 'react-icons/bs';

const ContactUs = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans antialiased flex flex-col justify-between">
      <div>
        {/* ================= HEADER NAVIGATION ================= */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              
              {/* Brand Logo */}
              <div className="flex items-center">
                <a href="/" className="text-2xl font-extrabold text-[#031837] tracking-tight">
                  StitchMaster Pro
                </a>
              </div>

              {/* Desktop Navigation Links */}
              <nav className="hidden lg:flex items-center gap-10 text-sm font-medium text-slate-500">
                <a href="#home" className="hover:text-[#031837] transition">Home</a>
                <a href="#inventory" className="hover:text-[#031837] transition">Inventory</a>
                <a href="#technicians" className="hover:text-[#031837] transition">Technicians</a>
                <a href="#warranty" className="hover:text-[#031837] transition">Warranty</a>
                
                {/* Active Contact Us Link */}
                <a 
                  href="#contact" 
                  className="text-[#031837] font-bold pb-1 border-b-2 border-[#031837] transition"
                >
                  Contact Us
                </a>
              </nav>

              {/* Right Side Search & Login */}
              <div className="flex items-center gap-6">
                <button 
                  className="p-2 text-slate-600 hover:text-[#031837] transition rounded-full"
                  aria-label="Search"
                >
                  <LuSearch className="w-5 h-5" />
                </button>

                <button className="hidden sm:inline-flex bg-[#031837] hover:bg-slate-800 text-white font-semibold px-7 py-2.5 rounded-md text-sm transition shadow-sm">
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
            <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
              <a 
                href="#home" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md font-medium text-slate-700 hover:bg-slate-50"
              >
                Home
              </a>
              <a 
                href="#inventory" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md font-medium text-slate-700 hover:bg-slate-50"
              >
                Inventory
              </a>
              <a 
                href="#technicians" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md font-medium text-slate-700 hover:bg-slate-50"
              >
                Technicians
              </a>
              <a 
                href="#warranty" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md font-medium text-slate-700 hover:bg-slate-50"
              >
                Warranty
              </a>
              <a 
                href="#contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md font-bold text-[#031837] bg-slate-100"
              >
                Contact Us
              </a>
              <div className="pt-2">
                <button className="w-full bg-[#031837] text-white font-semibold py-2.5 rounded-md text-sm">
                  Login
                </button>
              </div>
            </div>
          )}
        </header>

        {/* ================= HERO BANNER ================= */}
        <section className="relative bg-[#031837] text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Industrial Factory Background Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1920&auto=format&fit=crop" 
              alt="Industrial Factory Background" 
              className="w-full h-full object-cover opacity-20 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#031837]/95 via-[#031837]/90 to-[#031837]/80"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Get in Touch
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl font-normal leading-relaxed">
              Expert support for your industrial precision needs. Our team is ready to assist with machinery inquiries, maintenance, and technical specifications.
            </p>
          </div>
        </section>

        {/* ================= MAIN TWO COLUMN CONTENT ================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: Send a Message Form */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-xs">
              <h2 className="text-2xl font-bold text-[#031837] mb-6">
                Send a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Full Name & Email Address Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-slate-700">
                      Full Name
                    </label>
                    <input 
                      type="text" 
                      placeholder="John Doe" 
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      className="w-full bg-white border border-slate-300 rounded-md px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#031837]/20 focus:border-[#031837] transition"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-slate-700">
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      placeholder="john@company.com" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-white border border-slate-300 rounded-md px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#031837]/20 focus:border-[#031837] transition"
                      required
                    />
                  </div>
                </div>

                {/* Subject Select Dropdown */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-700">
                    Subject
                  </label>
                  <select 
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full bg-white border border-slate-300 rounded-md px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#031837]/20 focus:border-[#031837] transition"
                    required
                  >
                    <option value="" disabled>Select an inquiry type</option>
                    <option value="machinery">General Machinery Inquiry</option>
                    <option value="maintenance">Maintenance & Service</option>
                    <option value="parts">OEM Replacement Parts</option>
                    <option value="technical">Technical Specifications</option>
                  </select>
                </div>

                {/* Message Textarea */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-700">
                    Message
                  </label>
                  <textarea 
                    rows={5}
                    placeholder="How can our technicians help you today?" 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-white border border-slate-300 rounded-md px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#031837]/20 focus:border-[#031837] transition resize-none"
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div>
                  <button 
                    type="submit"
                    className="bg-[#031837] hover:bg-slate-800 text-white font-semibold text-sm px-7 py-3 rounded-md transition shadow-md flex items-center gap-2"
                  >
                    <span>Submit Request</span>
                    <LuSend className="w-4 h-4 rotate-45" />
                  </button>

                  {submitted && (
                    <p className="mt-3 text-xs text-emerald-600 font-semibold animate-in fade-in">
                      ✓ Thank you! Your request has been sent to our technical team.
                    </p>
                  )}
                </div>

              </form>
            </div>

            {/* RIGHT COLUMN: Our Showroom Card */}
            <div className="lg:col-span-5 bg-[#f1f5f9] rounded-2xl p-6 sm:p-10 border border-slate-200/70 space-y-8">
              <h2 className="text-2xl font-bold text-[#031837]">
                Our Showroom
              </h2>

              <div className="space-y-6">
                
                {/* Physical Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#031837] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <LuMapPin className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="block text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                      PHYSICAL ADDRESS
                    </span>
                    <p className="text-sm font-semibold text-slate-800 leading-snug">
                      1280 Industrial Pkwy, Suite 400<br />
                      Charlotte, NC 28217
                    </p>
                  </div>
                </div>

                {/* Contact Methods */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#031837] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <LuPhone className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="block text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                      CONTACT METHODS
                    </span>
                    <p className="text-sm font-semibold text-slate-800">
                      +1 (704) 555-0192
                    </p>
                    <a 
                      href="https://wa.me/17045550192" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-slate-700 hover:text-emerald-600 transition font-medium pt-0.5"
                    >
                      <BsWhatsapp className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#031837] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <LuClock className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <span className="block text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                      BUSINESS HOURS
                    </span>
                    <div className="text-xs space-y-1 pt-0.5 text-slate-700">
                      <div className="flex justify-between">
                        <span>Mon - Fri</span>
                        <span className="font-semibold text-slate-900">8:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday</span>
                        <span className="font-semibold text-slate-900">9:00 AM - 1:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday</span>
                        <span className="font-bold text-rose-600">Closed</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Urgent Repair Notice */}
              <div className="bg-[#dbeafe]/80 rounded-xl p-4 flex items-center gap-3 border border-blue-200/70">
                <div className="text-blue-800 shrink-0">
                  <LuWrench className="w-5 h-5" />
                </div>
                <p className="text-xs text-slate-700 leading-tight">
                  Need urgent repair? Call our 24/7 Technician Hotline at <span className="font-bold text-slate-900">(800) STITCH-PRO</span>.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* ================= MAP SECTION WITH FLOATING CARD ================= */}
        <section className="relative w-full h-[400px] bg-slate-200 overflow-hidden border-t border-slate-300">
          {/* Map Image Graphic Background */}
          <img 
            src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1600&auto=format&fit=crop" 
            alt="Charlotte Location Map" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply pointer-events-none"></div>

          {/* Floating Location Card on Left */}
          <div className="absolute top-8 left-4 sm:left-12 z-20">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl max-w-sm border border-slate-200 space-y-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  Charlotte Logistics Hub
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Easy access from I-485 and Douglas International Airport.
                </p>
              </div>

              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#031837] hover:bg-slate-800 text-white font-semibold text-xs px-5 py-2.5 rounded-md transition shadow-md"
              >
                <LuNavigation className="w-3.5 h-3.5" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>
        </section>

      </div>

      {/* ================= FOOTER SECTION (Matching Screenshot 3) ================= */}
      <footer className="bg-[#031837] text-slate-300 py-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left Brand Title & Copyright */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-center sm:text-left">
            <span className="text-xl font-bold text-white tracking-tight">
              StitchMaster
            </span>
            <span className="text-xs text-slate-400">
              © 2024 StitchMaster Industrial. All rights reserved.
            </span>
          </div>

          {/* Right Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
            <a href="#privacy" className="hover:text-white transition">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition">Terms of Service</a>
            <a href="#centers" className="hover:text-white transition">Service Centers</a>
            <a href="#global" className="hover:text-white transition">Global Support</a>
          </div>

        </div>
      </footer>
    </div>
  );
};

export default ContactUs;
