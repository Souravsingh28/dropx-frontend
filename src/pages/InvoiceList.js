import React, { useEffect, useState } from "react";
import axios from "axios";

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    // Load token from localStorage
    const savedToken = localStorage.getItem("token");
    setToken(savedToken);

    // Fetch invoices
    axios
      .get("dropx-backend.onrender.com/api/invoice/all", {
        headers: { Authorization: `Bearer ${savedToken}` },
      })
      .then((res) => {
        setInvoices(res.data.invoices);
      })
      .catch((err) => {
        console.error("Failed to fetch invoices:", err);
      });
  }, []);

  const downloadPDF = (id) => {
    window.open(`dropx-backend.onrender.com/api/invoice/download/${id}`, "_blank");
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h2 className="text-2xl font-bold mb-4">📑 Invoice List</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-700 text-left">
            <th className="p-2">Invoice No</th>
            <th className="p-2">Client</th>
            <th className="p-2">Date</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Download</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv) => (
            <tr key={inv.id} className="border-b border-gray-600">
              <td className="p-2">{inv.invoice_no}</td>
              <td className="p-2">{inv.client_name}</td>
              <td className="p-2">{inv.date}</td>
              <td className="p-2">₹{inv.grand_total}</td>
              <td className="p-2">
                <button
                  onClick={() => downloadPDF(inv.id)}
                  className="bg-blue-600 hover:bg-blue-800 text-white px-3 py-1 rounded"
                >
                  Download PDF
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceList;
