import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InventoryStock = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStock();
  }, []);

  const fetchStock = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/inventory/stock', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(res.data);
    } catch (err) {
      console.error('❌ Error fetching stock:', err);
      setError('Failed to load inventory stock');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>📦 Inventory Stock Summary</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={thStyle}>Item Name</th>
            <th style={thStyle}>Unit</th>
            <th style={thStyle}>Quantity</th>
            <th style={thStyle}>Threshold</th>
            <th style={thStyle}>QR Code</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const isLow = item.threshold !== null && parseFloat(item.quantity) < parseFloat(item.threshold);
            return (
              <tr key={item.id} style={{ backgroundColor: isLow ? '#ffe6e6' : 'white' }}>
                <td style={tdStyle}>{item.name}</td>
                <td style={tdStyle}>{item.unit}</td>
                <td style={tdStyle}>{item.quantity}</td>
                <td style={tdStyle}>{item.threshold ?? '-'}</td>
                <td style={tdStyle}>{item.qr_code || '-'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const thStyle = {
  padding: '10px',
  border: '1px solid #ccc',
  textAlign: 'left',
};

const tdStyle = {
  padding: '10px',
  border: '1px solid #ddd',
};

export default InventoryStock;
