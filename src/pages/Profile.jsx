import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

function Profile() {
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('dropx-backend.onrender.com/api/users/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setUser(res.data))
    .catch(err => console.error('Failed to load profile:', err));
  }, []);

  if (!user) return <div className="p-6">Loading...</div>;

  return (
    <div className="flex">
      <Sidebar role={role} />
      <div className="flex-1 p-8">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">
          Welcome, {user.name}
        </h2>

        <div className="max-w-xl bg-white p-6 shadow rounded">
          {user.photo && (
            <img
              src={`dropx-backend.onrender.com/uploads/${user.photo}`}
              alt="Profile"
              className="w-32 h-32 rounded-full mb-4 object-cover"
            />
          )}

          <div className="space-y-2 text-gray-700">
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>Age:</strong> {user.age}</p>
            <p><strong>Gender:</strong> {user.gender}</p>
            <p><strong>ID Number:</strong> {user.id_number}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Address:</strong> {user.address}</p>
            <p><strong>Aadhaar:</strong> {user.aadhaar}</p>
            <p><strong>Bank Account:</strong> {user.bank_account}</p>
            <p><strong>IFSC:</strong> {user.ifsc}</p>
            <p><strong>Bank Name:</strong> {user.bank_name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
