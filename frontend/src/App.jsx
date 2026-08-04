import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Header from './Components/Header';
import AdminDashboard from './AdminPages/Dashboard';
import Inventory from './AdminPages/Inventory';
import Sales from './AdminPages/Sales';
import Service from './AdminPages/Service';
import Settings from './AdminPages/Settings';

import PublicDashboard from './Publicpages/Dashboard';
import ShopeHome from './Publicpages/ShopeHome';
import ContactUs from './Publicpages/ContactUs';
import Warranty from './Publicpages/Warranty';
import RequestService from './Publicpages/RequestService';

// Dummy page component for demonstration
const Page = ({ title }) => (
  <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 h-full">
    <h2 className="text-2xl font-bold text-[#1e2b4d] mb-4">{title}</h2>
    <p className="text-slate-600">
      This is the {title.toLowerCase()} page content. The routes have been successfully configured!
    </p>
  </div>
);

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

        {/* Admin Layout & Parent Route: /admin */}
        <Route
          path="/*"
          element={
            <div className="flex h-screen bg-[#f8fafc] overflow-hidden font-sans">
              <Sidebar />
              <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto p-8 bg-slate-50">
                  <Routes>
                    <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
                    <Route path="/admin">
                      <Route index element={<Navigate to="dashboard" replace />} />
                      <Route path="dashboard" element={<AdminDashboard />} />
                      <Route path="inventory" element={<Inventory />} />
                      <Route path="sales" element={<Sales />} />
                      <Route path="service" element={<Service />} />
                      <Route path="reports" element={<Page title="Reports" />} />
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
