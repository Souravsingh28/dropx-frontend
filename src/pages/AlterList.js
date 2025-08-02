import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

function AlterList() {
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    axios.get('dropx-backend.onrender.com/api/alter/all', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setEntries(res.data));
  }, []);

  return (
    <div className="flex">
      <Sidebar role={role} />
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4 text-purple-700">Alter Entry History</h2>
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-3 py-2">Date</th>
              <th className="border px-3 py-2">Lot</th>
              <th className="border px-3 py-2">Worker</th>
              <th className="border px-3 py-2">Operation</th>
              <th className="border px-3 py-2">Pieces</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e, i) => (
              <tr key={i} className="text-center">
                <td className="border px-3 py-2">{e.date}</td>
                <td className="border px-3 py-2">{e.lot_name}</td>
                <td className="border px-3 py-2">{e.worker_name}</td>
                <td className="border px-3 py-2">{e.operation}</td>
                <td className="border px-3 py-2">{e.pieces}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AlterList;
