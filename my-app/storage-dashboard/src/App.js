import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import StorageDashboard from './Dashboard';
import Orders from './Orders';
import Profile from './Profile';
import Logout from './Logout';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="flex items-center justify-between bg-green-600 text-white p-4 shadow-md">
          <h1 className="text-2xl font-bold">Storage Management</h1>
          <nav className="space-x-4">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/orders" className="hover:underline">Orders</Link>
            <Link to="/profile" className="hover:underline">Profile</Link>
            <Link to="/logout" className="hover:underline">Logout</Link>
          </nav>
        </header>
        
        <main className="flex justify-center items-center min-h-screen">
          <Routes>
            <Route path="/" element={<StorageDashboard managerName="Storage Manager" />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
