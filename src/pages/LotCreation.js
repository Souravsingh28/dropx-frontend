import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

function LotCreation() {
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');

  const [lotName, setLotName] = useState('');
  const [partyId, setPartyId] = useState('');
  const [image, setImage] = useState(null);
  const [operations, setOperations] = useState([{ name: '', rate: '' }]);
  const [parties, setParties] = useState([]);

  useEffect(() => {
    // ✅ Corrected API path here
    axios
      .get('http://localhost:5000/api/clients', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setParties(res.data);
      })
      .catch((err) => {
        console.error('Failed to fetch clients', err);
      });
  }, [token]);

  const handleOperationChange = (index, field, value) => {
    const newOps = [...operations];
    newOps[index][field] = value;
    setOperations(newOps);
  };

  const addOperation = () => {
    setOperations([...operations, { name: '', rate: '' }]);
  };

  const removeOperation = (index) => {
    const newOps = operations.filter((_, i) => i !== index);
    setOperations(newOps);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('lot_name', lotName);
    form.append('party_id', partyId);
    form.append('image', image);
    form.append('operations', JSON.stringify(operations));

    try {
      await axios.post('http://localhost:5000/api/lots/create', form, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Lot Created!');
    } catch (err) {
      alert('Failed to create lot');
    }
  };

  return (
    <div className="flex">
      <Sidebar role={role} />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Create Lot</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Lot Name (e.g., LOT-001)"
            value={lotName}
            onChange={(e) => setLotName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />

          <select
            value={partyId}
            onChange={(e) => setPartyId(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Party</option>
            {parties.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full"
          />

          <h2 className="font-semibold text-lg mt-4">Operations</h2>
          {operations.map((op, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Operation (e.g., Stitching)"
                value={op.name}
                onChange={(e) =>
                  handleOperationChange(idx, 'name', e.target.value)
                }
                className="flex-1 p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Rate"
                value={op.rate}
                onChange={(e) =>
                  handleOperationChange(idx, 'rate', e.target.value)
                }
                className="w-24 p-2 border rounded"
              />
              <button
                type="button"
                onClick={() => removeOperation(idx)}
                className="bg-red-500 text-white px-2 rounded"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addOperation}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Add Operation
          </button>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Submit Lot
          </button>
        </form>
      </div>
    </div>
  );
}

export default LotCreation;
