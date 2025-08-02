import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InventoryHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/inventory/issues', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHistory(res.data);
    } catch (err) {
      console.error('❌ Error loading inventory history', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Inventory Issuance History</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2">Item</th>
                <th className="border px-3 py-2">Quantity</th>
                <th className="border px-3 py-2">Issued By</th>
                <th className="border px-3 py-2">Issued To</th>
                <th className="border px-3 py-2">Remarks</th>
                <th className="border px-3 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {history.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No issuance records found.
                  </td>
                </tr>
              ) : (
                history.map((h, idx) => (
                  <tr key={idx}>
                    <td className="border px-3 py-1">{h.item_name}</td>
                    <td className="border px-3 py-1">{h.quantity}</td>
                    <td className="border px-3 py-1">{h.issued_by_name}</td>
                    <td className="border px-3 py-1">{h.issued_to_name}</td>
                    <td className="border px-3 py-1">{h.remarks || '-'}</td>
                    <td className="border px-3 py-1">
                      {new Date(h.issued_on).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InventoryHistory;
