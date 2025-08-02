import React, { useState } from 'react';
import axios from 'axios';

function AddClient() {
  const [form, setForm] = useState({ name: '', contact: '', gst: '', address: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await axios.post('dropx-backend.onrender.com/api/clients/add', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage(res.data.message);
      setForm({ name: '', contact: '', gst: '', address: '' });
    } catch (err) {
      setMessage('Failed to add client');
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Add Client / Party</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Client Name" required value={form.name} onChange={handleChange}
          className="w-full mb-3 p-2 border rounded" />
        <input name="contact" placeholder="Contact" value={form.contact} onChange={handleChange}
          className="w-full mb-3 p-2 border rounded" />
        <input name="gst" placeholder="GST Number" value={form.gst} onChange={handleChange}
          className="w-full mb-3 p-2 border rounded" />
        <textarea name="address" placeholder="Address" value={form.address} onChange={handleChange}
          className="w-full mb-3 p-2 border rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Client</button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}

export default AddClient;
