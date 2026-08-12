import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Header from './Components/Header';
import AdminDashboard from './AdminPages/Dashboard';
import Inventory from './AdminPages/Inventory';
import Sales from './AdminPages/Sales';
import Service from './AdminPages/Service';
import Customers from './AdminPages/Customers';
import Payments from './AdminPages/Payments';
import Expenses from './AdminPages/Expenses';
import Reports from './AdminPages/Reports';
import Settings from './AdminPages/Settings';

import PublicDashboard from './Publicpages/Dashboard';
import ShopeHome from './Publicpages/ShopeHome';
import ContactUs from './Publicpages/ContactUs';
import Warranty from './Publicpages/Warranty';
import RequestService from './Publicpages/RequestService';

import WarrantyCertificate from './PdfPages/WarrantyCertificate';
import InvoiceDocument from './PdfPages/InvoiceDocument';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Parent Route: /public */}
        <Route path="/public">
          <Route index element={<Navigate to="shope" replace />} />
          <Route path="shope" element={<ShopeHome />} />
          <Route path="shope-home" element={<ShopeHome />} />
          <Route path="dashboard" element={<PublicDashboard />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="warranty" element={<Warranty />} />
          <Route path="request-service" element={<RequestService />} />
        </Route>

        {/* Alias Standalone Public Routes */}
        <Route path="/shope" element={<ShopeHome />} />
        <Route path="/shope-home" element={<ShopeHome />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/warranty" element={<Warranty />} />
        <Route path="/request-service" element={<RequestService />} />

        {/* PDF Routes */}
        <Route path="/pdf">
          <Route index element={<Navigate to="warranty" replace />} />
          <Route path="warranty" element={<WarrantyCertificate />} />
          <Route path="invoice" element={<InvoiceDocument />} />
        </Route>

        {/* Admin Layout & Parent Route: /admin */}
        <Route
          path="/*"
          element={
            <div className="flex h-screen bg-[#f8fafc] dark:bg-[#0f172a] overflow-hidden font-sans transition-colors duration-200">
              <Sidebar />
              <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto p-8 bg-slate-50 dark:bg-[#0b1120] transition-colors duration-200">
                  <Routes>
                    <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
                    <Route path="/admin">
                      <Route index element={<Navigate to="dashboard" replace />} />
                      <Route path="dashboard" element={<AdminDashboard />} />
                      
                      {/* Sales routes */}
                      <Route path="sales" element={<Navigate to="sales/new-bill" replace />} />
                      <Route path="sales/new-bill" element={<Sales subpage="new-bill" />} />
                      <Route path="sales/history" element={<Sales subpage="history" />} />
                      <Route path="sales/returns" element={<Sales subpage="returns" />} />
                      
                      {/* Inventory routes */}
                      <Route path="inventory" element={<Navigate to="inventory/products" replace />} />
                      <Route path="inventory/products" element={<Inventory subpage="products" />} />
                      <Route path="inventory/purchases" element={<Inventory subpage="purchases" />} />
                      <Route path="inventory/suppliers" element={<Inventory subpage="suppliers" />} />
                      <Route path="inventory/product/:id" element={<Inventory subpage="product-details" />} />
                      <Route path="inventory/supplier/:id" element={<Inventory subpage="supplier-details" />} />
                      
                      {/* Service routes */}
                      <Route path="service" element={<Navigate to="service/pending" replace />} />
                      <Route path="service/new-job" element={<Service subpage="new-job" />} />
                      <Route path="service/pending" element={<Service subpage="pending" />} />
                      <Route path="service/ready" element={<Service subpage="ready" />} />
                      <Route path="service/history" element={<Service subpage="history" />} />
                      <Route path="service/analytics" element={<Service subpage="analytics" />} />
                      <Route path="service/job/:id" element={<Service subpage="job-details" />} />
                      
                      {/* Customers routes */}
                      <Route path="customers" element={<Navigate to="customers/list" replace />} />
                      <Route path="customers/list" element={<Customers subpage="list" />} />
                      <Route path="customers/outstanding" element={<Customers subpage="outstanding" />} />
                      <Route path="customers/customer/:id" element={<Customers subpage="details" />} />
                      
                      <Route path="payments" element={<Payments />} />
                      <Route path="expenses" element={<Expenses />} />
                      <Route path="reports" element={<Reports />} />
                      <Route path="settings" element={<Settings />} />
                    </Route>
                  </Routes>
                </main>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
