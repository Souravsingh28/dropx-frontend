import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

function AlterEntry() {
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');

  const [lots, setLots] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [form, setForm] = useState({
    lot_id: '',
    worker_id: '',
    operation: '',
    pieces: ''
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/lots/all', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setLots(res.data));

    axios.get('http://localhost:5000/api/users/workers', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setWorkers(res.data));
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/alter/entry', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Alter entry saved');
      setForm({ lot_id: '', worker_id: '', operation: '', pieces: '' });
    } catch (err) {
      alert('Failed to save entry');
    }
  };

  return (
    <div className="flex">
      <Sidebar role={role} />
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold text-orange-700 mb-4">Alter Piece Entry</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          <select name="lot_id" value={form.lot_id} onChange={handleChange} className="w-full p-2 border rounded" required>
            <option value="">Select Lot</option>
            {lots.map(lot => (
              <option key={lot.id} value={lot.id}>{lot.lot_name || lot.name}</option>
            ))}
          </select>

          <select name="worker_id" value={form.worker_id} onChange={handleChange} className="w-full p-2 border rounded" required>
            <option value="">Select Worker</option>
            {workers.map(w => (
              <option key={w.id} value={w.id}>{w.username}</option>
            ))}
          </select>

          <input
            type="text"
            name="operation"
            placeholder="Operation"
            value={form.operation}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="number"
            name="pieces"
            placeholder="No. of Pieces"
            value={form.pieces}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AlterEntry;
