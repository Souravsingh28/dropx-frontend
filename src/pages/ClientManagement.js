// src/pages/ClientManagement.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

function ClientManagement() {
  const [clients, setClients] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: '', gstin: '', address: '', contact: '' });
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = () => {
    axios
      .get('dropx-backend.onrender.com/api/clients', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setClients(res.data))
      .catch(() => alert('Failed to fetch clients'));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    try {
      if (editingId) {
        await axios.put(
          `dropx-backend.onrender.com/api/clients/${editingId}`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          'dropx-backend.onrender.com/api/clients',
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      setForm({ name: '', gstin: '', address: '', contact: '' });
      setEditingId(null);
      fetchClients();
    } catch {
      alert('Error saving client');
    }
  };

  const handleEdit = (client) => {
    setEditingId(client.id);
    setForm({
      name: client.name,
      gstin: client.gstin || '',
      address: client.address || '',
      contact: client.contact || '',
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this client?')) return;
    try {
      await axios.delete(`dropx-backend.onrender.com/api/clients/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchClients();
    } catch {
      alert('Failed to delete client');
    }
  };

  return (
    <div className="flex">
      <Sidebar role={role} />
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Client Management</h2>

        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="Client Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="p-2 border rounded w-full"
            required
          />
          <input
            type="text"
            placeholder="GSTIN"
            value={form.gstin}
            onChange={(e) => setForm({ ...form, gstin: e.target.value })}
            className="p-2 border rounded w-full"
          />
          <input
            type="text"
            placeholder="Address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="p-2 border rounded w-full"
          />
          <input
            type="text"
            placeholder="Contact Number"
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
            className="p-2 border rounded w-full"
          />
          <button className="bg-green-600 text-white px-4 py-2 rounded">
            {editingId ? 'Update Client' : 'Add Client'}
          </button>
        </form>

        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">GSTIN</th>
              <th className="p-2 border">Address</th>
              <th className="p-2 border">Contact</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => (
              <tr key={c.id} className="text-center">
                <td className="p-2 border">{c.id}</td>
                <td className="p-2 border">{c.name}</td>
                <td className="p-2 border">{c.gstin}</td>
                <td className="p-2 border">{c.address}</td>
                <td className="p-2 border">{c.contact}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => handleEdit(c)}
                    className="bg-yellow-400 text-white px-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="bg-red-600 text-white px-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClientManagement;
