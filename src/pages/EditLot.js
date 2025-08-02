// src/pages/EditLot.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function EditLot() {
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  const [lot, setLot] = useState(null);
  const [partyId, setPartyId] = useState('');
  const [operations, setOperations] = useState([]);
  const [image, setImage] = useState(null);
  const [parties, setParties] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/lots/all`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        const found = res.data.find(l => l.id === parseInt(id));
        if (found) {
          setLot(found);
          setPartyId(found.party_id || '');
          setOperations(found.operations || []);
        }
      });

    axios
      .get('http://localhost:5000/api/clients', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => setParties(res.data));
  }, [id, token]);

  const handleOpChange = (index, field, value) => {
    const newOps = [...operations];
    newOps[index][field] = value;
    setOperations(newOps);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('lot_name', lot.lot_name || lot.name);
    form.append('party_id', partyId);
    form.append('operations', JSON.stringify(operations));
    if (image) {
      form.append('image', image);
    }

    try {
      await axios.put(`http://localhost:5000/api/lots/update/${id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Lot updated successfully!');
      navigate('/admin/lots/view');
    } catch (err) {
      alert('Failed to update lot');
    }
  };

  if (!lot) return <div>Loading...</div>;

  return (
    <div className="flex">
      <Sidebar role={role} />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6 text-orange-700">Edit Lot</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={lot.lot_name || lot.name}
            disabled
          />

          <select
            className="w-full p-2 border rounded"
            value={partyId}
            onChange={(e) => setPartyId(e.target.value)}
          >
            <option value="">Select Party</option>
            {parties.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <h2 className="text-lg font-semibold">Operations</h2>
          {operations.map((op, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="text"
                value={op.name}
                onChange={(e) => handleOpChange(idx, 'name', e.target.value)}
                placeholder="Operation"
                className="flex-1 p-2 border rounded"
              />
              <input
                type="number"
                value={op.rate}
                onChange={(e) => handleOpChange(idx, 'rate', e.target.value)}
                placeholder="Rate"
                className="w-24 p-2 border rounded"
              />
            </div>
          ))}

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Update Lot
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditLot;
