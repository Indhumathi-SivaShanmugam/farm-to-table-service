import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProcessorDashboard from './Dashboard';
import Orders from './Orders';
import Profile from './Profile';
import Logout from './Logout';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="flex justify-between items-center p-4 bg-green-500 text-white shadow">
          <h1 className="text-xl font-bold">Processor</h1>
          <div className="space-x-4">
            <Link to="/" className="hover:text-green-200">Home</Link>
            <Link to="/orders" className="hover:text-green-200">Orders</Link>
            <Link to="/profile" className="hover:text-green-200">Profile</Link>
            <Link to="/logout" className="hover:text-green-200">Logout</Link>
          </div>
        </nav>

        <main className="p-6">
          <Routes>
            <Route path="/" element={<ProcessorDashboard />} />
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
