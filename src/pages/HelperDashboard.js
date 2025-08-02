import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function HelperDashboard() {
  const role = localStorage.getItem('role') || '';

  return (
    <div className="flex">
      <Sidebar role={role} />
      <div className="flex-1 p-10 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Helper Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/helper/production"
            className="block p-6 bg-blue-100 rounded-lg shadow hover:bg-blue-200 transition"
          >
            <h2 className="text-xl font-bold text-blue-800">✍️ Production Entry</h2>
            <p className="text-sm text-gray-700 mt-1">Log work done by workers.</p>
          </Link>

          <Link
            to="/admin/inventory"
            className="block p-6 bg-yellow-100 rounded-lg shadow hover:bg-yellow-200 transition"
          >
            <h2 className="text-xl font-bold text-yellow-800">📦 Inventory Management</h2>
            <p className="text-sm text-gray-700 mt-1">Add or issue inventory items.</p>
          </Link>

          <Link
            to="/inventory/history"
            className="block p-6 bg-green-100 rounded-lg shadow hover:bg-green-200 transition"
          >
            <h2 className="text-xl font-bold text-green-800">📄 Inventory Issuance</h2>
            <p className="text-sm text-gray-700 mt-1">See issuance history.</p>
          </Link>

          <Link
            to="/inventory-stock"
            className="block p-6 bg-cyan-100 rounded-lg shadow hover:bg-cyan-200 transition"
          >
            <h2 className="text-xl font-bold text-cyan-800">📊 Stock Overview</h2>
            <p className="text-sm text-gray-700 mt-1">Current inventory stock levels.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HelperDashboard;
