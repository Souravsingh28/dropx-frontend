import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar({ role }) {
  const links = {
    admin: [
      { label: 'Dashboard', path: '/admin' },
      { label: 'Create Lot', path: '/admin/lots' },
      { label: 'Invoices', path: '/admin/invoices' },
      { label: 'Reports', path: '/admin/reports' },
      { label: 'Inventory Stock', path: '/inventory-stock' },
      { label: 'Vendors', path: '/admin/vendors' },
      { label: 'Alter Entries', path: '/admin/alter-entry' },
      { label: 'Alter History', path: '/admin/alter-history' },
      { label: 'Alter Summary', path: '/admin/alter-summary' },
      { label: 'Work Reports', path: '/admin/work-reports' },
      { label: 'Profile', path: '/profile' }, // ✅ Added
    ],
    helper: [
      { label: 'Dashboard', path: '/helper' },
      { label: 'Production Entry', path: '/helper/production' },
      { label: 'Profile', path: '/profile' }, // ✅ Added
    ],
    incharge: [
      { label: 'Dashboard', path: '/incharge' },
      { label: 'Team Report', path: '/incharge/reports' },
      { label: 'Profile', path: '/profile' }, // ✅ Added
    ],
    worker: [
      { label: 'Dashboard', path: '/worker' },
      { label: 'My Work', path: '/worker/production' },
      { label: 'Profile', path: '/profile' }, // ✅ Added
    ],
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div className="bg-gray-900 text-white w-64 h-screen p-6 overflow-y-auto">
      <h2 className="text-xl font-bold mb-6">drop.x – {role}</h2>
      <ul className="space-y-3">
        {links[role]?.map((link) => (
          <li key={link.label}>
            <Link to={link.path} className="hover:text-blue-400 block">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <button
        onClick={handleLogout}
        className="mt-10 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
