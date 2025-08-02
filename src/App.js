import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import axios from 'axios';

import AdminDashboard from './pages/AdminDashboard';
import HelperDashboard from './pages/HelperDashboard';
import InchargeDashboard from './pages/InchargeDashboard';
import WorkerDashboard from './pages/WorkerDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import LotCreation from './pages/LotCreation';
import LotList from './pages/LotList';
import ProductionEntry from './pages/ProductionEntry';
import MyWork from './pages/MyWork';
import WorkerWorkReport from './pages/MyWork';
import ClientManagement from './pages/ClientManagement';
import EditLot from './pages/EditLot';
import AlterEntry from './pages/AlterEntry';
import AlterList from './pages/AlterList';
import AlterSummary from './pages/AlterSummary';
import WorkReports from './pages/WorkReports';
import InventoryManagement from './pages/InventoryManagement';
import InventoryHistory from './pages/InventoryHistory';
import InventoryStock from './components/InventoryStock';
import VendorManagement from './pages/VendorManagement';
import RegisterUser from './pages/RegisterUser';
import EmployeeRegistration from './pages/EmployeeRegistration';
import UserManagement from './pages/UserManagement';
import Profile from './pages/Profile';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('Logging in...');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
      });

      const { token, role } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('username', username);

      if (role === 'admin') navigate('/admin');
      else if (role === 'helper') navigate('/helper');
      else if (role === 'incharge') navigate('/incharge');
      else if (role === 'worker') navigate('/worker');
      else setMessage('Unknown role.');
    } catch (err) {
      setMessage('Login failed. Please check credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">drop.x Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            className="w-full mb-4 px-4 py-2 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 px-4 py-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/lots"
          element={
            <ProtectedRoute allowedRoles={['admin', 'helper']}>
              <LotCreation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/helper"
          element={
            <ProtectedRoute allowedRoles={['helper']}>
              <HelperDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/incharge"
          element={
            <ProtectedRoute allowedRoles={['incharge']}>
              <InchargeDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/worker"
          element={
            <ProtectedRoute allowedRoles={['worker']}>
              <WorkerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
  path="/admin/lots/view"
  element={
    <ProtectedRoute allowedRoles={['admin', 'incharge']}>
      <LotList />
    </ProtectedRoute>
  }
/>
<Route
  path="/helper/production"
  element={
    <ProtectedRoute allowedRoles={['helper']}>
      <ProductionEntry />
    </ProtectedRoute>
  }
/>
<Route
  path="/worker/my-work"
  element={
    <ProtectedRoute allowedRoles={['worker']}>
      <MyWork />
    </ProtectedRoute>
  }
/>
<Route
  path="/worker"
  element={
    <ProtectedRoute allowedRoles={['worker']}>
      <WorkerDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/worker/production"
  element={
    <ProtectedRoute allowedRoles={['worker']}>
      <MyWork />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/clients"
  element={
    <ProtectedRoute allowedRoles={['admin']}>
      <ClientManagement />
    </ProtectedRoute>
  }
/>
<Route path="/admin/production" 
element={
<ProtectedRoute allowedRoles={['admin', 'helper']}>
  <ProductionEntry />
  </ProtectedRoute>
}
 />
 <Route path="/admin/alter-entry" element={<AlterEntry />} />
<Route path="/admin/alter-history" element={<AlterList />} />
<Route path="/inventory/history" element={<ProtectedRoute><InventoryHistory /></ProtectedRoute>} />
<Route path="/inventory-stock" element={<InventoryStock />} />


<Route path="/admin/vendors" element={
  <ProtectedRoute allowedRoles={['admin']}>
    <VendorManagement />
  </ProtectedRoute>
} />


<Route
  path="/admin/register-employee"
  element={
    <ProtectedRoute allowedRoles={['admin']}>
      <EmployeeRegistration />
    </ProtectedRoute>
  }
/>

<Route path="/admin/users" element={
  <ProtectedRoute allowedRoles={['admin']}>
    <UserManagement />
  </ProtectedRoute>
} />

<Route path="/admin/register-user" element={
  <ProtectedRoute allowedRoles={['admin']}>
    <RegisterUser />
  </ProtectedRoute>
} />

 <Route path="/admin/lots/edit/:id" element={<EditLot />} />
 <Route path="/profile" element={<Profile />} />

<Route path="/admin/alter-summary" element={<AlterSummary />} />
<Route path="/admin/work-reports" element={<WorkReports />} />
<Route path="/admin/inventory" element={
  <ProtectedRoute allowedRoles={['admin', 'helper', 'incharge']}>
    <InventoryManagement />
  </ProtectedRoute>
} />




      </Routes>
    </Router>
  );
}

export default App;
