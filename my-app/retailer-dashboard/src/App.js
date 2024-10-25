import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RetailerDashboard from './Dashboard';
import Profile from './Profile'; // Assuming you have a Profile component
import Orders from './Orders'; // Assuming you have an Orders component
import Logout from './Logout'; // Assuming you have a Logout component

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <header className="flex items-center bg-green-400 text-white p-4 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mr-auto">Retailer</h1>
          <nav className="flex space-x-4">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/orders" className="hover:underline">Orders</Link>
            <Link to="/profile" className="hover:underline">Profile</Link>
            <Link to="/logout" className="hover:underline">Logout</Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<RetailerDashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
