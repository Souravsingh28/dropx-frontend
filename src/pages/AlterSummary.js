import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

function AlterSummary() {
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/alter/summary', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setSummary(res.data))
      .catch(() => alert('Failed to fetch summary'));
  }, []);

  return (
    <div className="flex">
      <Sidebar role={role} />
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold text-indigo-600 mb-4">Alter Piece Summary</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2">Worker Name</th>
              <th className="border px-4 py-2">Total Altered Pieces</th>
            </tr>
          </thead>
          <tbody>
            {summary.map((entry, idx) => (
              <tr key={idx} className="text-center">
                <td className="border px-4 py-2">{entry.worker_name}</td>
                <td className="border px-4 py-2 font-bold text-green-700">{entry.total_pieces}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AlterSummary;
