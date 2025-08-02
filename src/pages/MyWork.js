import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MyWork() {
  const [entries, setEntries] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios
      .get('http://localhost:5000/api/production/worker/salary', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(async (res) => {
        const data = res.data.entries || [];
        setTotal(res.data.total_earned || 0);

        const uniqueLotIds = [...new Set(data.map((e) => e.lot_id))];
        const lotMap = {};

        await Promise.all(
          uniqueLotIds.map(async (lotId) => {
            try {
              const lotRes = await axios.get(`http://localhost:5000/api/lots/${lotId}`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              lotMap[lotId] = {
                name: lotRes.data.lot_name,
                photo: lotRes.data.photo,
              };
            } catch {
              lotMap[lotId] = {
                name: 'Unknown',
                photo: null,
              };
            }
          })
        );

        const updated = data.map((entry) => ({
          ...entry,
          lot_name: lotMap[entry.lot_id]?.name || 'Unknown',
          lot_photo: lotMap[entry.lot_id]?.photo || null,
        }));

        setEntries(updated);
      })
      .catch((err) => {
        console.error('❌ Failed to fetch work entries:', err);
      });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 text-green-600">My Work Report</h1>
      <p className="text-xl font-bold mt-4">
        Total Earned:{' '}
        <span className="text-green-600">
          ₹{!isNaN(total) ? Number(total).toLocaleString('en-IN', { minimumFractionDigits: 2 }) : '0.00'}
        </span>
      </p>

      <div className="overflow-x-auto mt-6">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-center">
              <th className="p-2 border">Lot</th>
              <th className="p-2 border">Photo</th>
              <th className="p-2 border">Operation</th>
              <th className="p-2 border">Pieces</th>
              <th className="p-2 border">Rate</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, i) => (
              <tr key={i} className="text-center">
                <td className="p-2 border font-semibold">{entry.lot_name}</td>
                <td className="p-2 border">
                  {entry.lot_photo ? (
                    <img
                      src={entry.lot_photo}
                      alt="Lot"
                      className="w-12 h-12 object-cover mx-auto rounded"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/no-image.png';
                      }}
                    />
                  ) : (
                    <span className="text-sm text-gray-400">No Photo</span>
                  )}
                </td>
                <td className="p-2 border">{entry.operation}</td>
                <td className="p-2 border">{entry.pieces}</td>
                <td className="p-2 border">₹{Number(entry.rate).toFixed(2)}</td>
                <td className="p-2 border text-green-700 font-medium">₹{Number(entry.amount).toFixed(2)}</td>
                <td className="p-2 border">{new Date(entry.date).toLocaleDateString('en-IN')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyWork;
