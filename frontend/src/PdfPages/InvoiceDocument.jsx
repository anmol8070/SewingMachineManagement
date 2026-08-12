import React from 'react';
import { LuSettings, LuShieldCheck } from 'react-icons/lu';

const InvoiceDocument = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 flex justify-center items-start font-sans">
      <div className="bg-white w-full max-w-[800px] shadow-2xl rounded-sm overflow-hidden text-sm text-gray-800 border-t-8 border-[#0b1c3c]">
        <div className="p-8 md:p-12">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-10">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#0b1c3c] text-white p-2 rounded-md">
                  <LuSettings size={24} />
                </div>
                <h1 className="text-xl font-bold text-[#0b1c3c] tracking-tight">ThreadMasters Pro</h1>
              </div>
              <div className="text-gray-600 text-xs leading-relaxed max-w-[200px]">
                <p>88 Industrial Park, Sector 4, Okhla Phase III</p>
                <p>New Delhi, Delhi 110020, India</p>
                <p className="mt-2 font-bold text-gray-700">GSTIN: 07AAACT0000A1Z5</p>
                <p className="mt-1">Contact: +91 11 4050 9000 | support@threadmasterspro.com</p>
              </div>
            </div>
            
            {/* Invoice Details */}
            <div className="text-right mt-6 md:mt-0">
              <h2 className="text-3xl font-black text-gray-200 tracking-widest uppercase mb-4 opacity-50 text-right">Invoice</h2>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-right">
                <span className="font-bold text-gray-700 text-right">Invoice #:</span>
                <span className="font-bold text-gray-900 text-right">TMP-2024-8842</span>
                <span className="text-gray-500 text-right">Date:</span>
                <span className="font-medium text-gray-800 text-right">October 24, 2024</span>
                <span className="text-gray-500 text-right">Due Date:</span>
                <span className="font-medium text-gray-800 text-right">November 08, 2024</span>
              </div>
            </div>
          </div>

          {/* Billing Info */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10">
            {/* Bill To */}
            <div className="bg-gray-50 p-5 w-full md:w-[45%]">
              <h3 className="text-gray-400 font-bold tracking-widest uppercase text-[10px] mb-3">Bill To</h3>
              <p className="font-bold text-gray-900 text-sm mb-1">Apparel Hub Solutions</p>
              <p className="text-xs text-gray-600">Attn: Mr. Rajesh Kumar</p>
              <p className="text-xs text-gray-600">Plot No. 452, Udyog Vihar Phase IV</p>
              <p className="text-xs text-gray-600 mb-2">Gurugram, Haryana 122016</p>
              <p className="text-xs font-bold text-gray-800">GSTIN: 06AABCU9876R1Z1</p>
            </div>

            {/* Terms & Shipment */}
            <div className="flex flex-col gap-3 w-full md:w-[45%]">
              <div className="border-l-4 border-[#0b1c3c] pl-3 py-1 bg-gray-50">
                <p className="text-gray-400 font-bold tracking-widest uppercase text-[9px]">Payment Terms</p>
                <p className="font-bold text-gray-800 text-xs">NET 15 DAYS</p>
              </div>
              <div className="border-l-4 border-[#0b1c3c] pl-3 py-1 bg-gray-50">
                <p className="text-gray-400 font-bold tracking-widest uppercase text-[9px]">Shipment Mode</p>
                <p className="font-bold text-gray-800 text-xs">"THREADMASTERS LOGISTICS" - PRIORITY</p>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="mb-10">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#0b1c3c] text-white">
                  <th className="py-3 px-4 font-semibold w-[40%]">Item & Description</th>
                  <th className="py-3 px-2 font-semibold text-center">Serial No.</th>
                  <th className="py-3 px-2 font-semibold text-center">Qty</th>
                  <th className="py-3 px-4 font-semibold text-right">Unit Price</th>
                  <th className="py-3 px-4 font-semibold text-right">Total</th>
                </tr>
              </thead>
              <tbody className="border-b border-gray-200">
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 align-top">
                    <p className="font-bold text-gray-800 mb-1">Juki DDL-8700</p>
                    <p className="text-gray-500">Single Needle High Speed Lockstitch Machine</p>
                  </td>
                  <td className="py-4 px-2 align-top text-center text-gray-600">JK-88742-01</td>
                  <td className="py-4 px-2 align-top text-center font-medium">2</td>
                  <td className="py-4 px-4 align-top text-right text-gray-700">₹42,500.00</td>
                  <td className="py-4 px-4 align-top text-right font-bold text-gray-900">₹85,000.00</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 align-top">
                    <p className="font-bold text-gray-800 mb-1">Brother S-7100A</p>
                    <p className="text-gray-500">Direct Drive Lockstitch with Automatic Trimmer</p>
                  </td>
                  <td className="py-4 px-2 align-top text-center text-gray-600">BR-1129C-AA</td>
                  <td className="py-4 px-2 align-top text-center font-medium">1</td>
                  <td className="py-4 px-4 align-top text-right text-gray-700">₹54,200.00</td>
                  <td className="py-4 px-4 align-top text-right font-bold text-gray-900">₹54,200.00</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 align-top">
                    <p className="font-bold text-gray-800 mb-1">Industrial Servo Motor</p>
                    <p className="text-gray-500">550W High Torque Brushless Motor - Silent</p>
                  </td>
                  <td className="py-4 px-2 align-top text-center text-gray-600">SM-2024-X4</td>
                  <td className="py-4 px-2 align-top text-center font-medium">3</td>
                  <td className="py-4 px-4 align-top text-right text-gray-700">₹8,500.00</td>
                  <td className="py-4 px-4 align-top text-right font-bold text-gray-900">₹25,500.00</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 align-top">
                    <p className="font-bold text-gray-800 mb-1">Maintenance Kit - Pro</p>
                    <p className="text-gray-500">Precision Lubricants & Spare Needle Set (100pk)</p>
                  </td>
                  <td className="py-4 px-2 align-top text-center text-gray-600">MK-PRO-V2</td>
                  <td className="py-4 px-2 align-top text-center font-medium">5</td>
                  <td className="py-4 px-4 align-top text-right text-gray-700">₹1,250.00</td>
                  <td className="py-4 px-4 align-top text-right font-bold text-gray-900">₹6,250.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Payment & Totals */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
            {/* Payment Details */}
            <div className="w-full md:w-1/2 bg-gray-50 p-5">
              <h3 className="text-gray-400 font-bold tracking-widest uppercase text-[10px] mb-4">Payment Details</h3>
              <div className="flex justify-between gap-4">
                <div className="w-1/2">
                  <p className="font-bold text-gray-800 text-xs mb-2">Bank Transfer (NEFT/IMPS)</p>
                  <ul className="text-[11px] text-gray-600 space-y-1">
                    <li><span className="font-medium text-gray-700">Bank:</span> HDFC Bank, Industrial Area</li>
                    <li><span className="font-medium text-gray-700">Account Name:</span> ThreadMasters Pro Private Limited</li>
                    <li><span className="font-medium text-gray-700">Account No:</span> 50200012345678</li>
                    <li><span className="font-medium text-gray-700">IFSC Code:</span> HDFC0001234</li>
                  </ul>
                </div>
                <div className="w-1/2">
                  <p className="font-bold text-gray-800 text-xs mb-2">UPI / Digital Payments</p>
                  <p className="text-[11px] text-gray-600 mb-3"><span className="font-medium text-gray-700">VPA:</span> tmpro@hdfcbank</p>
                  <div className="w-16 h-16 border border-gray-300 p-1 bg-white">
                    <div className="w-full h-full border border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                      <span className="text-[8px] text-gray-400 font-bold">QR</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Totals */}
            <div className="w-full md:w-[40%] text-sm">
              <div className="flex justify-between py-1">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-bold text-gray-900">₹1,80,950.00</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-600">Taxable Amount</span>
                <span className="font-bold text-gray-900">₹1,80,950.00</span>
              </div>
              <div className="flex justify-between py-1 mb-2">
                <span className="text-gray-600">GST (18%)</span>
                <span className="font-bold text-gray-900">₹32,571.00</span>
              </div>
              
              <div className="bg-[#0b1c3c] text-white flex justify-between py-3 px-4 rounded-sm mt-2">
                <span className="font-bold">Grand Total</span>
                <span className="font-bold text-lg">₹2,13,521.00</span>
              </div>
              
              <p className="text-[10px] text-gray-500 text-right mt-3 leading-snug">
                Amount in words: Two Lakh Thirteen Thousand Five Hundred and Twenty One Rupees Only.
              </p>
            </div>
          </div>

          <hr className="border-t border-gray-200 mb-6" />

          {/* Footer */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 text-xs text-gray-500">
            <div className="w-full md:w-2/3">
              <h4 className="font-bold text-gray-700 mb-1 text-[11px]">Terms & Conditions</h4>
              <ul className="list-disc pl-3 text-[10px] leading-relaxed space-y-1">
                <li>Goods once sold will not be taken back or exchanged.</li>
                <li>Interest @ 18% p.a. will be charged if the payment is delayed beyond the agreed terms.</li>
                <li>ThreadMasters Pro is not responsible for any damage in transit once goods leave our premises.</li>
                <li>Subject to New Delhi jurisdiction only.</li>
              </ul>
              <p className="mt-4 text-[10px]">&copy; 2024 Industrial Sewing Pro Showroom. ISO 9001 Certified.</p>
            </div>
            <div className="text-center w-full md:w-1/3 flex flex-col items-center">
              <LuShieldCheck className="text-blue-200 mb-2" size={32} />
              <div className="border-t border-[#0b1c3c] pt-2 w-40">
                <p className="text-[#0b1c3c] font-bold">Authorized Signatory</p>
                <p className="text-[10px] mt-1">ThreadMasters Pro HQ</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default InvoiceDocument;
