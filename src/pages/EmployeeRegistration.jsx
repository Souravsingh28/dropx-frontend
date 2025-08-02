import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

function RegisterUser() {
  const role = localStorage.getItem('role');
  const [form, setForm] = useState({
    name: '', age: '', gender: '', id_number: '', phone: '', address: '',
    aadhaar: '', bank_account: '', ifsc: '', bank_name: '', designation: '', password: '', photo: null
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = e => {
    setForm({ ...form, photo: e.target.files[0] });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();

      for (const key in form) {
        formData.append(key, form[key]);
      }

      formData.append('username', form.id_number);
      formData.append('role', form.designation);

      const res = await axios.post('http://localhost:5000/api/users/register', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      });

      alert(`✅ User registered! Username: ${form.id_number}`);
    } catch (err) {
      console.error('❌ Registration error:', err.response?.data || err.message);
      alert('❌ Registration failed');
    }
  };

  return (
    <div className="flex">
      <Sidebar role={role} />
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-blue-700 mb-6">Register New Employee</h2>
        <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit} encType="multipart/form-data">
          <input type="file" name="photo" accept="image/*" onChange={handleFileChange} className="col-span-2 border p-2 rounded" required />

          {[
            ['name', 'Name'], ['age', 'Age'], ['gender', 'Gender'],
            ['id_number', 'ID Number'], ['phone', 'Phone'], ['address', 'Address'],
            ['aadhaar', 'Aadhaar'], ['bank_account', 'Bank Account'],
            ['ifsc', 'IFSC'], ['bank_name', 'Bank Name'], ['password', 'Password']
          ].map(([key, label]) => (
            <input
              key={key}
              name={key}
              placeholder={label}
              value={form[key]}
              onChange={handleChange}
              className="border p-2 rounded"
              type={key === 'password' ? 'password' : 'text'}
              required
            />
          ))}

          <select
            name="designation"
            onChange={handleChange}
            className="border p-2 rounded"
            value={form.designation}
            required
          >
            <option value="">Select Designation</option>
            <option value="helper">Helper</option>
            <option value="incharge">Incharge</option>
            <option value="worker">Worker</option>
          </select>

          <button
            type="submit"
            className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterUser;
