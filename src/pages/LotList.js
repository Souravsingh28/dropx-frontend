import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

function LotList() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const [lots, setLots] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLots();
  }, []);

  const fetchLots = () => {
    axios
      .get('http://localhost:5000/api/lots/all', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setLots(res.data);
      })
      .catch(() => alert('Failed to load lots'));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this lot?')) {
      axios
        .delete(`http://localhost:5000/api/lots/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          alert('Lot deleted');
          fetchLots();
        })
        .catch(() => alert('Failed to delete lot'));
    }
  };

  return (
    <div className="flex">
      <Sidebar role={role} />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">All Lots</h1>
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2">Lot Number</th>
              <th className="border px-4 py-2">Party Name</th>
              <th className="border px-4 py-2">Operations</th>
              <th className="border px-4 py-2">Created By</th>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {lots.map((lot) => (
              <tr key={lot.id}>
                <td className="border px-4 py-2">{lot.lot_name || lot.name}</td>
                <td className="border px-4 py-2">{lot.party_name || 'N/A'}</td>
                <td className="border px-4 py-2">
                  {(Array.isArray(lot.operations) ? lot.operations : []).map((op, idx) => (
                    <div key={idx}>{op.name} - ₹{op.rate}</div>
                  ))}
                </td>
                <td className="border px-4 py-2">{lot.created_by || 'N/A'}</td>
                <td className="border px-4 py-2">
                  {lot.image_url ? (
                    <img
                      src={lot.image_url}
                      alt="sample"
                      className="w-20 h-20 object-cover rounded"
                    />
                  ) : (
                    'No Image'
                  )}
                </td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    onClick={() => navigate(`/admin/lots/edit/${lot.id}`)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(lot.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
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

export default LotList;
