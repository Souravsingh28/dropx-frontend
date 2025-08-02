import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function AdminDashboard() {
  const role = localStorage.getItem('role') || '';

  const features = [
    { to: '/admin/lots', title: '➕ Create New Lot', desc: 'Add a new production lot with operations.', bg: 'bg-blue-100', hover: 'hover:bg-blue-200', text: 'text-blue-800' },
    { to: '/admin/lots/view', title: '📋 View Lots', desc: 'Check details of all created lots.', bg: 'bg-green-100', hover: 'hover:bg-green-200', text: 'text-green-800' },
    { to: '/admin/clients', title: '👤 Manage Clients', desc: 'Add and manage party/client details.', bg: 'bg-yellow-100', hover: 'hover:bg-yellow-200', text: 'text-yellow-800' },
    { to: '/admin/production', title: '✍️ Production Entry', desc: 'Submit work done by workers.', bg: 'bg-purple-100', hover: 'hover:bg-purple-200', text: 'text-purple-800' },
    { to: '/admin/alter-entry', title: '🧵 Alter Entry', desc: 'Log altered pieces after main production.', bg: 'bg-pink-100', hover: 'hover:bg-pink-200', text: 'text-pink-800' },
    { to: '/admin/alter-history', title: '📜 Altered List', desc: 'View all altered entries in detail.', bg: 'bg-rose-100', hover: 'hover:bg-rose-200', text: 'text-rose-800' },
    { to: '/admin/alter-summary', title: '📊 Alter Summary', desc: 'Total altered pieces by each worker.', bg: 'bg-fuchsia-100', hover: 'hover:bg-fuchsia-200', text: 'text-fuchsia-800' },
    { to: '/admin/work-reports', title: '📈 Work Reports', desc: 'Track and filter work reports of all workers.', bg: 'bg-indigo-100', hover: 'hover:bg-indigo-200', text: 'text-indigo-800' },
    { to: '/admin/inventory', title: '📦 Inventory Management', desc: 'Add and issue items from stock.', bg: 'bg-orange-100', hover: 'hover:bg-orange-200', text: 'text-orange-800' },
    { to: '/inventory/history', title: '📚 Inventory Issuance History', desc: 'See who took what and when.', bg: 'bg-lime-100', hover: 'hover:bg-lime-200', text: 'text-lime-800' },
    { to: '/inventory-stock', title: '🗃️ Current Inventory Stock', desc: 'Real-time stock levels of all items.', bg: 'bg-cyan-100', hover: 'hover:bg-cyan-200', text: 'text-cyan-800' },
    { to: '/admin/register-employee', title: '🧑‍💼 Register Employee', desc: 'Add new worker, helper, or incharge.', bg: 'bg-teal-100', hover: 'hover:bg-teal-200', text: 'text-teal-800'},
    { to: '/admin/users', title: '🧑‍💼 Manage Employees', desc: 'View, edit or delete registered employees.', bg: 'bg-zinc-100', hover: 'hover:bg-zinc-200', text: 'text-zinc-800' }



    // ✅ New link for Registering Employees    { to: '/admin/register-user', title: '🧑‍💼 Register Employee', desc: 'Add a new worker, incharge, or helper account.', bg: 'bg-teal-100', hover: 'hover:bg-teal-200', text: 'text-teal-800' },

  ];

  return (
    <div className="flex h-screen">
      <Sidebar role={role} />

      {/* Scrollable dashboard content */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {features.map((f) => (
            <Link
              key={f.to}
              to={f.to}
              className={`block p-6 rounded-lg shadow ${f.bg} ${f.hover} transition`}
            >
              <h2 className={`text-xl font-bold ${f.text}`}>{f.title}</h2>
              <p className="text-sm text-gray-700 mt-1">{f.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
