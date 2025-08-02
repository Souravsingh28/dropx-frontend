import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

function UserManagement() {
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchUsers = () => {
    axios.get('dropx-backend.onrender.com/api/users', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => setUsers(res.data))
    .catch(() => alert("Failed to load users"));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm('Delete this user?')) return;
    axios.delete(`dropx-backend.onrender.com/api/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(fetchUsers);
  };

  const handleEdit = (user) => setEditing(user);

  const handleSave = () => {
    axios.put(`dropx-backend.onrender.com/api/users/${editing.id}`, editing, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(() => {
      setEditing(null);
      fetchUsers();
    });
  };

  const handleChange = (field, value) => {
    setEditing({ ...editing, [field]: value });
  };

  return (
    <div className="flex h-screen">
      <Sidebar role={role} />
      <div className="flex-1 p-4 overflow-auto">
        <h2 className="text-xl font-bold text-blue-700 mb-4">Employee Management</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full border text-xs text-center">
            <thead className="bg-gray-100">
              <tr>
                {['Name', 'Username', 'Password', 'Role', 'Age', 'Gender', 'Phone', 'ID No', 'Address', 'Aadhaar', 'Bank Acc', 'IFSC', 'Bank Name', 'Actions'].map(h => (
                  <th key={h} className="border px-2 py-1 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  {editing?.id === u.id ? (
                    <>
                      <td className="border p-1"><input value={editing.name || ''} onChange={e => handleChange('name', e.target.value)} className="w-full" /></td>
                      <td className="border p-1">{u.username}</td>
                      <td className="border p-1"><input value={editing.password || ''} onChange={e => handleChange('password', e.target.value)} className="w-full" /></td>
                      <td className="border p-1">
                        <select value={editing.role} onChange={e => handleChange('role', e.target.value)} className="w-full">
                          <option value="worker">Worker</option>
                          <option value="helper">Helper</option>
                          <option value="incharge">Incharge</option>
                        </select>
                      </td>
                      <td className="border p-1"><input value={editing.age || ''} onChange={e => handleChange('age', e.target.value)} className="w-full" /></td>
                      <td className="border p-1"><input value={editing.gender || ''} onChange={e => handleChange('gender', e.target.value)} className="w-full" /></td>
                      <td className="border p-1"><input value={editing.phone || ''} onChange={e => handleChange('phone', e.target.value)} className="w-full" /></td>
                      <td className="border p-1">{u.id_number}</td>
                      <td className="border p-1"><textarea value={editing.address || ''} onChange={e => handleChange('address', e.target.value)} className="w-full" rows={2} /></td>
                      <td className="border p-1"><input value={editing.aadhaar || ''} onChange={e => handleChange('aadhaar', e.target.value)} className="w-full" /></td>
                      <td className="border p-1"><input value={editing.bank_account || ''} onChange={e => handleChange('bank_account', e.target.value)} className="w-full" /></td>
                      <td className="border p-1"><input value={editing.ifsc || ''} onChange={e => handleChange('ifsc', e.target.value)} className="w-full" /></td>
                      <td className="border p-1"><input value={editing.bank_name || ''} onChange={e => handleChange('bank_name', e.target.value)} className="w-full" /></td>
                      <td className="border p-1">
                        <button onClick={handleSave} className="bg-green-500 text-white text-xs px-2 py-1 rounded mr-1">Save</button>
                        <button onClick={() => setEditing(null)} className="bg-gray-300 text-xs px-2 py-1 rounded">Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="border p-1">{u.name}</td>
                      <td className="border p-1">{u.username}</td>
                      <td className="border p-1">{u.password}</td>
                      <td className="border p-1">{u.role}</td>
                      <td className="border p-1">{u.age}</td>
                      <td className="border p-1">{u.gender}</td>
                      <td className="border p-1">{u.phone}</td>
                      <td className="border p-1">{u.id_number}</td>
                      <td className="border p-1 whitespace-pre-wrap">{u.address}</td>
                      <td className="border p-1">{u.aadhaar}</td>
                      <td className="border p-1">{u.bank_account}</td>
                      <td className="border p-1">{u.ifsc}</td>
                      <td className="border p-1">{u.bank_name}</td>
                      <td className="border p-1">
                        <button onClick={() => handleEdit(u)} className="text-blue-600 text-xs mr-2">Edit</button>
                        <button onClick={() => handleDelete(u.id)} className="text-red-600 text-xs">Delete</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
