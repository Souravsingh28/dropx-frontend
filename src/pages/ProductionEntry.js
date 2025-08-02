import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

function ProductionEntry() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const [lots, setLots] = useState([]);
  const [selectedLot, setSelectedLot] = useState('');
  const [operations, setOperations] = useState([]);
  const [workers, setWorkers] = useState([]);

  const [form, setForm] = useState({
    lot_id: '',
    worker_id: '',
    operation: '',
    pieces: '',
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/lots/all', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setLots(res.data);
      })
      .catch((err) => {
        console.error('Failed to load lots:', err);
      });

    axios
      .get('http://localhost:5000/api/users/workers', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setWorkers(res.data);
      })
      .catch((err) => {
        console.error('Failed to load workers:', err);
      });
  }, []);

  const handleLotChange = (lotId) => {
    const lot = lots.find((l) => l.id == lotId);
    if (!lot) {
      setOperations([]);
      return;
    }

    let parsedOps = [];
    try {
      parsedOps = typeof lot.operations === 'string'
        ? JSON.parse(lot.operations)
        : lot.operations || [];
    } catch (err) {
      console.error("Error parsing operations:", err);
    }

    setSelectedLot(lotId);
    setOperations(parsedOps);
    setForm({ ...form, lot_id: lotId });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/production/entry', form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('✅ Production entry submitted!');
      setForm({ ...form, pieces: '' });
    } catch (err) {
      console.error('Submit error:', err.response?.data || err.message);
      alert('❌ Failed to submit entry');
    }
  };

  return (
    <div className="flex">
      <Sidebar role={role} />
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Production Entry</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            name="lot_id"
            value={form.lot_id}
            onChange={(e) => handleLotChange(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Lot</option>
            {lots.map((lot) => (
              <option key={lot.id} value={lot.id} className="text-black">
                {lot.lot_name}
              </option>
            ))}
          </select>

          <select
            name="worker_id"
            value={form.worker_id}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Worker</option>
            {workers.map((w) => (
              <option key={w.id} value={w.id}>
                {w.name} ({w.id_number})
              </option>
            ))}
          </select>

          <select
            name="operation"
            value={form.operation}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Operation</option>
            {operations.map((op, idx) => (
              <option key={idx} value={op.name}>
                {op.name} – ₹{op.rate}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="pieces"
            placeholder="No. of Pieces"
            value={form.pieces}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Submit Entry
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductionEntry;
