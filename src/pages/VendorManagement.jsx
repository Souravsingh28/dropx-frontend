import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

function VendorManagement() {
  const [vendors, setVendors] = useState([]);
  const [form, setForm] = useState({
    name: '',
    contact: '',
    address: ''
  });

  const role = localStorage.getItem('role') || '';
  const token = localStorage.getItem('token');

  const fetchVendors = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/vendor', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVendors(res.data);
    } catch (err) {
      console.error('Failed to fetch vendors:', err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    try {
      await axios.post('http://localhost:5000/api/vendor/add', form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({ name: '', contact: '', address: '' });
      fetchVendors();
    } catch (err) {
      console.error('Error saving vendor:', err);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  return (
    <div className="flex">
      <Sidebar role={role} />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-blue-700 mb-6">Vendor Management</h1>

        {/* Add Vendor Form */}
        <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            name="name"
            placeholder="Vendor Name"
            className="border px-3 py-2 rounded"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="contact"
            placeholder="Contact Info"
            className="border px-3 py-2 rounded"
            value={form.contact}
            onChange={handleChange}
          />
          <input
            name="address"
            placeholder="Address"
            className="border px-3 py-2 rounded"
            value={form.address}
            onChange={handleChange}
          />
          <div className="md:col-span-3 text-right">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Add Vendor
            </button>
          </div>
        </form>

        {/* Vendor List */}
        <div className="bg-white shadow rounded p-4 overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2">#</th>
                <th className="p-2">Vendor Name</th>
                <th className="p-2">Contact</th>
                <th className="p-2">Address</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((v, i) => (
                <tr key={v.id} className="border-t">
                  <td className="p-2">{i + 1}</td>
                  <td className="p-2">{v.name}</td>
                  <td className="p-2">{v.contact}</td>
                  <td className="p-2">{v.address}</td>
                </tr>
              ))}
              {vendors.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-2 text-center text-gray-500">No vendors yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default VendorManagement;
