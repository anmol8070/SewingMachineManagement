import React from 'react';
import { LuSettings, LuReceipt, LuFileText, LuShieldCheck } from 'react-icons/lu';

const WarrantyCertificate = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 flex justify-center items-start font-sans">
      <div className="bg-white w-full max-w-[800px] shadow-2xl rounded-sm overflow-hidden border-t-8 border-[#0f2a4a] relative">
        {/* Watermark */}
        <div className="absolute inset-0 flex justify-center items-center opacity-[0.03] pointer-events-none z-0">
          <span className="text-[150px] font-bold text-[#0f2a4a] -rotate-45 tracking-widest">THREADMASTERS</span>
        </div>

        <div className="p-8 md:p-12 relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
            <div className="flex items-start gap-4">
              <div className="bg-[#0f2a4a] text-white p-3 rounded-md">
                <LuSettings size={32} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#0f2a4a] tracking-tight">ThreadMasters Pro</h1>
                <p className="text-gray-500 text-sm font-medium tracking-widest uppercase">Industrial Sewing Solutions</p>
                <div className="text-gray-600 text-sm mt-2 leading-relaxed">
                  <p>1244 Industrial Plaza, Suite 400</p>
                  <p>Global Manufacturing District, NY 10001</p>
                  <p className="mt-1 font-medium text-[#0f2a4a]">support@threadmasterspro.com</p>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <h2 className="text-4xl md:text-5xl font-black text-[#0f2a4a] tracking-tight mb-2">CERTIFICATE</h2>
              <div className="bg-[#0f2a4a] text-white text-sm font-bold tracking-widest uppercase py-1.5 px-4 inline-block">
                Official Warranty
              </div>
            </div>
          </div>

          <hr className="border-t-2 border-[#0f2a4a] opacity-20 mb-10" />

          {/* Statement */}
          <p className="text-center text-gray-700 text-lg md:text-xl font-medium leading-relaxed px-4 md:px-12 mb-12">
            This document serves as <span className="font-bold text-[#0f2a4a]">formal verification</span> that the industrial machinery described below is covered under the <span className="font-bold text-[#0f2a4a]">ThreadMasters Pro Comprehensive Warranty Program</span>.
          </p>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
            {/* Machine Details */}
            <div>
              <div className="flex items-center gap-2 mb-4 border-b-2 border-gray-200 pb-2">
                <LuSettings className="text-[#0f2a4a]" size={20} />
                <h3 className="text-[#0f2a4a] font-bold tracking-wide uppercase text-sm">Machine Details</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Product Name</span>
                  <span className="font-bold text-gray-900">UltraStitch 9000i</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Model Number</span>
                  <span className="font-bold text-gray-900">TM-US9K-X1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Serial Number</span>
                  <span className="font-bold text-gray-900">SN-29384755-B</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Build Date</span>
                  <span className="font-bold text-gray-900">October 14, 2023</span>
                </div>
              </div>
            </div>

            {/* Purchase Info */}
            <div>
              <div className="flex items-center gap-2 mb-4 border-b-2 border-gray-200 pb-2">
                <LuReceipt className="text-[#0f2a4a]" size={20} />
                <h3 className="text-[#0f2a4a] font-bold tracking-wide uppercase text-sm">Purchase Information</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Customer Name</span>
                  <span className="font-bold text-gray-900">Elite Textile Corp.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Invoice Number</span>
                  <span className="font-bold text-gray-900">INV-2024-8842</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Purchase Date</span>
                  <span className="font-bold text-gray-900">January 12, 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Auth. Dealer</span>
                  <span className="font-bold text-gray-900">Metro Sewing HQ</span>
                </div>
              </div>
            </div>
          </div>

          {/* Warranty Period Box */}
          <div className="bg-[#eef2f6] border-l-4 border-[#0f2a4a] p-6 mb-12 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <p className="text-[#0f2a4a] font-bold text-sm tracking-widest uppercase mb-1">Warranty Period</p>
              <p className="text-gray-700 font-medium">Standard 36-Month Industrial Coverage</p>
            </div>
            <div className="text-right">
              <p className="text-[#0f2a4a] font-bold text-sm tracking-widest uppercase mb-1">Expiration Date</p>
              <p className="text-[#0f2a4a] font-bold text-lg">January 11, 2027</p>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4 border-b-2 border-gray-200 pb-2">
              <LuFileText className="text-gray-400" size={18} />
              <h3 className="text-gray-500 font-bold tracking-widest uppercase text-xs">Standard Terms & Conditions</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[11px] text-gray-500 leading-relaxed text-justify">
              <div>
                <p>1. COVERAGE: This warranty covers all mechanical and electronic defects under normal industrial use. ThreadMasters Pro will repair or replace any defective components at no charge for labor or parts during the specified period.</p>
                <p className="mt-2">2. EXCLUSIONS: Damage resulting from misuse, unauthorized modifications, lack of scheduled maintenance, or acts of nature are not covered. Consumable items such as needles, bobbins, and drive belts are excluded.</p>
              </div>
              <div>
                <p>3. SERVICE: All warranty service must be performed by an authorized ThreadMasters Pro technician. Transport costs to the service center are the responsibility of the owner.</p>
                <p className="mt-2">4. VALIDATION: This certificate is void if the serial number is removed or altered. Digital verification via the QR code below is required to confirm active status in our global database. ISO 9001:2015 Compliant standards apply to all repairs.</p>
              </div>
            </div>
          </div>

          <hr className="border-t border-gray-200 mb-8" />

          {/* Footer Signatures & Validation */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 border border-gray-300 p-1 bg-white flex items-center justify-center">
                {/* QR Code Placeholder */}
                <div className="w-full h-full border-4 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                  <span className="text-[8px] text-gray-400 font-bold">QR CODE</span>
                </div>
              </div>
              <div>
                <p className="text-[#0f2a4a] font-bold text-sm">DIGITAL</p>
                <p className="text-[#0f2a4a] font-bold text-sm mb-1">VERIFICATION</p>
                <p className="text-[10px] text-gray-500 leading-tight w-40">Scan the code to verify authenticity and view machine service history logs in the Cloud Portal.</p>
              </div>
            </div>

            <div className="text-center">
              <div className="mb-2 italic text-[#0f2a4a] text-xl font-serif">Alexander M. Caldwell</div>
              <div className="border-t border-[#0f2a4a] pt-1">
                <p className="text-[#0f2a4a] font-bold text-xs">AUTHORIZED</p>
                <p className="text-[#0f2a4a] font-bold text-xs">SIGNATURE</p>
                <p className="text-[9px] text-gray-500 mt-1">Chief Technical Officer</p>
              </div>
            </div>

            <div className="text-center flex flex-col items-center">
              <LuShieldCheck className="text-gray-300 mb-2" size={48} />
              <div className="border-t border-[#0f2a4a] pt-1 w-32">
                <p className="text-[#0f2a4a] font-bold text-xs">OFFICIAL SEAL</p>
                <p className="text-[9px] text-gray-500 mt-1">ThreadMasters Pro HQ</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarrantyCertificate;
