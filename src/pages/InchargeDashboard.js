import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function InchargeDashboard() {
  const role = localStorage.getItem('role') || '';

  return (
    <div className="flex">
      <Sidebar role={role} />
      <div className="flex-1 p-10 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Incharge Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/incharge/reports"
            className="block p-6 bg-indigo-100 rounded-lg shadow hover:bg-indigo-200 transition"
          >
            <h2 className="text-xl font-bold text-indigo-800">📈 Team Work Report</h2>
            <p className="text-sm text-gray-700 mt-1">Monitor production across your team.</p>
          </Link>

          <Link
            to="/admin/inventory"
            className="block p-6 bg-orange-100 rounded-lg shadow hover:bg-orange-200 transition"
          >
            <h2 className="text-xl font-bold text-orange-800">📦 Inventory Management</h2>
            <p className="text-sm text-gray-700 mt-1">Issue items to workers.</p>
          </Link>

          <Link
            to="/inventory/history"
            className="block p-6 bg-lime-100 rounded-lg shadow hover:bg-lime-200 transition"
          >
            <h2 className="text-xl font-bold text-lime-800">📄 Issuance History</h2>
            <p className="text-sm text-gray-700 mt-1">Track item distribution.</p>
          </Link>

          <Link
            to="/inventory-stock"
            className="block p-6 bg-cyan-100 rounded-lg shadow hover:bg-cyan-200 transition"
          >
            <h2 className="text-xl font-bold text-cyan-800">📊 Inventory Stock</h2>
            <p className="text-sm text-gray-700 mt-1">View available stock items.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default InchargeDashboard;
