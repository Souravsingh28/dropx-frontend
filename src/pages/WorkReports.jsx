import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


function WorkReports() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const [reports, setReports] = useState([]);
  const [lots, setLots] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [filters, setFilters] = useState({
    from: '',
    to: '',
    lot_id: '',
    worker_id: '',
  });

  const fetchReports = async () => {
    const query = new URLSearchParams(filters).toString();
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/production/work-reports?${query}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReports(
  data.map(r => ({
    ...r,
    amount: Number(r.amount) || 0,
    rate: Number(r.rate) || 0,
    pieces: Number(r.pieces) || 0
  }))
);

    } catch (err) {
      console.error('❌ Failed to load work reports', err);
    }
  };

  useEffect(() => {
    fetchReports();

    axios
      .get('http://localhost:5000/api/lots/all', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setLots(res.data))
      .catch((err) => console.error('❌ Failed to load lots', err));

    axios
      .get('http://localhost:5000/api/users/workers', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setWorkers(res.data))
      .catch((err) => console.error('❌ Failed to load workers', err));
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const totalAmount = reports.reduce((sum, r) => sum + r.amount, 0);
  const totalPieces = reports.reduce((sum, r) => sum + r.pieces, 0);

  const workerSummary = reports.reduce((acc, curr) => {
    const name = curr.worker_name || `Worker #${curr.worker_id}`;
    if (!acc[name]) acc[name] = { pieces: 0, amount: 0 };
    acc[name].pieces += curr.pieces;
    acc[name].amount += curr.amount;
    return acc;
  }, {});

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(reports);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Work Report');
    const excelBuffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `Work_Report_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  return (
    <div className="flex">
      <Sidebar role={role} />
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Work Reports</h2>

        {/* Filters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <input
            type="date"
            name="from"
            value={filters.from}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="date"
            name="to"
            value={filters.to}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <select name="lot_id" onChange={handleChange} className="p-2 border rounded">
            <option value="">All Lots</option>
            {lots.map((l) => (
              <option key={l.id} value={l.id}>
                {l.lot_name || l.name || `Lot #${l.id}`}
              </option>
            ))}
          </select>
          <select name="worker_id" onChange={handleChange} className="p-2 border rounded">
            <option value="">All Workers</option>
            {workers.map((w) => (
              <option key={w.id} value={w.id}>
                {w.username || w.name || `Worker #${w.id}`}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <button
            onClick={fetchReports}
            className="bg-blue-600 text-white px-4 py-2 rounded mr-4"
          >
            Apply Filters
          </button>
          <button
            onClick={exportToExcel}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Export to Excel
          </button>
        </div>

        {/* Report Table */}
        <table className="w-full border text-sm mt-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">Date</th>
              <th className="border px-2 py-1">Worker</th>
              <th className="border px-2 py-1">Lot</th>
              <th className="border px-2 py-1">Operation</th>
              <th className="border px-2 py-1 text-right">Pieces</th>
              <th className="border px-2 py-1 text-right">Rate (₹)</th>
              <th className="border px-2 py-1 text-right">Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r, i) => (
              <tr key={i}>
                <td className="border px-2 py-1">{r.date}</td>
                <td className="border px-2 py-1">{r.worker_name}</td>
                <td className="border px-2 py-1">{r.lot_name}</td>
                <td className="border px-2 py-1">{r.operation}</td>
                <td className="border px-2 py-1 text-right">{r.pieces}</td>
                <td className="border px-2 py-1 text-right">
                  ₹{Number(r.rate).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </td>
                <td className="border px-2 py-1 text-right font-semibold">
                  ₹{Number(r.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </td>
              </tr>
            ))}
          </tbody>
      <tfoot className="bg-gray-100 font-bold">
  <tr>
    <td colSpan="4" className="border px-2 py-1 text-right">Total</td>
    <td className="border px-2 py-1 text-center">{totalPieces}</td>
    <td className="border px-2 py-1"></td>
    <td className="border px-2 py-1 text-center">
      ₹{!isNaN(totalAmount) ? totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 }) : '0.00'}
    </td>
  </tr>
</tfoot>




        </table>

        {/* Summary Table */}
        <h3 className="text-xl font-semibold mt-8 mb-2">Worker-wise Summary</h3>
        <table className="w-full border text-sm mb-8">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1 text-left">Worker</th>
              <th className="border px-2 py-1 text-center">Total Pieces</th>
              <th className="border px-2 py-1 text-center">Total Earnings (₹)</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(workerSummary).map(([name, data], i) => (
              <tr key={i}>
                <td className="border px-2 py-1">{name}</td>
                <td className="border px-2 py-1 text-center">{data.pieces}</td>
                <td className="border px-2 py-1 text-center font-semibold">
                  ₹{data.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WorkReports;
