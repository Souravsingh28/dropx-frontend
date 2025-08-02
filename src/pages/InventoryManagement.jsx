import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

function InventoryManagement() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: '',
    unit: '',
    quantity: '',
    threshold: '',
    qr_code: '',
  });

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchItems = async () => {
    try {
      const res = await axios.get('dropx-backend.onrender.com/api/inventory/stock', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(res.data);
    } catch (err) {
      console.error('❌ Error fetching inventory', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('dropx-backend.onrender.com/api/inventory/add', newItem, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewItem({
        name: '',
        unit: '',
        quantity: '',
        threshold: '',
        qr_code: '',
      });
      fetchItems();
    } catch (err) {
      console.error('❌ Error saving item', err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="flex">
      <Sidebar role={role} />
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Inventory Management</h2>

        {/* Add New Item Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            name="name"
            placeholder="Item Name"
            value={newItem.name}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="unit"
            placeholder="Unit (e.g. pcs, kg)"
            value={newItem.unit}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={newItem.quantity}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            name="threshold"
            placeholder="Threshold (optional)"
            value={newItem.threshold}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="qr_code"
            placeholder="QR Code (optional)"
            value={newItem.qr_code}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <button
            type="submit"
            className="md:col-span-1 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Item
          </button>
        </form>

        {/* Inventory Table */}
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">ID</th>
              <th className="border px-2 py-1">Item</th>
              <th className="border px-2 py-1">Unit</th>
              <th className="border px-2 py-1">Quantity</th>
              <th className="border px-2 py-1">Threshold</th>
              <th className="border px-2 py-1">QR Code</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td className="border px-2 py-1">{item.id}</td>
                <td className="border px-2 py-1">{item.name}</td>
                <td className="border px-2 py-1">{item.unit}</td>
                <td className="border px-2 py-1">{item.quantity}</td>
                <td className="border px-2 py-1">{item.threshold || '-'}</td>
                <td className="border px-2 py-1">{item.qr_code || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InventoryManagement;
