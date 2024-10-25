import React, { useState } from 'react';
import logo from './assets/logo.png'; // Your logo image
import turmericImage from './assets/turmeric.png'; // Sample crop image
import cloveImage from './assets/clove.png'; // Sample crop image

const StorageDashboard = ({ managerName }) => {
  const [orders, setOrders] = useState([
    { id: 1, crop: 'Tea', quantity: '50 kg', status: 'Pending' },
    { id: 2, crop: 'Turmeric', quantity: '30 kg', status: 'Pending' },
  ]);

  const handleAccept = (id) => {
    setOrders(orders.map(order => (order.id === id ? { ...order, status: 'Accepted' } : order)));
  };

  const handleReject = (id) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  return (
    <div className="container mx-auto mt-4 p-6">
      <header className="flex items-center bg-green-500 text-white p-4 rounded-lg shadow">
        <img src={logo} alt="Logo" className="h-16 w-auto mr-4" />
        <h1 className="text-2xl font-bold">Welcome, {managerName}!</h1>
      </header>

      <section className="panel available-space my-4 p-4 bg-white rounded-lg shadow">
        <h5 className="font-bold">🏷️ Available Space:</h5>
        <div className="flex items-center">
          <div className="flex-grow bg-gray-200 rounded h-4 relative">
            <div className="bg-green-500 h-4 rounded" style={{ width: '70%' }}></div>
          </div>
          <span className="ml-2">70% Full</span>
        </div>
      </section>

      <section className="panel crops my-4 p-4 bg-white rounded-lg shadow">
        <h5 className="font-bold">📋 Current Inventory</h5>
        <ul className="list-disc list-inside">
          <li className="flex items-center">
            <img src={turmericImage} alt="Turmeric" className="h-10 w-10 mr-2" />
            Turmeric: 100 kg | Temperature: 15°C
          </li>
          <li className="flex items-center">
            <img src={cloveImage} alt="Clove" className="h-10 w-10 mr-2" />
            Clove: 30 kg | Temperature: 20°C
          </li>
        </ul>
      </section>

      <section className="panel orders my-4 p-4 bg-white rounded-lg shadow">
        <h5 className="font-bold">🚚 New Requests</h5>
        <ul>
          {orders.map(order => (
            <li key={order.id} className="flex justify-between items-center p-2 border-b last:border-b-0">
              <span>{order.crop}: {order.quantity} | Status: {order.status}</span>
              <div>
                <button className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600" onClick={() => handleAccept(order.id)}>Accept</button>
                <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 ml-2" onClick={() => handleReject(order.id)}>Reject</button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="panel new-order my-4 p-4 bg-white rounded-lg shadow">
        <h5 className="font-bold">🔄 Initiate New Order</h5>
        <div className="mb-3">
          <label>Select Role:</label>
          <select className="form-select mt-1 block w-full border border-gray-300 rounded-lg shadow-sm">
            <option value="Farmer">Storage</option>
            <option value="distributor">Distributor</option>
            <option value="processing_facilities">Processing Facilities</option>
            <option value="retailer">Retailer</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Crop:</label>
          <select className="form-select mt-1 block w-full border border-gray-300 rounded-lg shadow-sm">
            <option value="cardamom">Cardamom</option>
            <option value="turmeric">Turmeric</option>
            <option value="clove">Clove</option>
            <option value="coconut">Coconut</option>
            <option value="sesame">Sesame</option>
            <option value="groundnut">Groundnut</option>
            <option value="tea_leaves">Tea Leaves</option>
            <option value="sugarcane">Sugarcane</option>
            <option value="ponni_rice">Ponni Rice</option>
            <option value="sona_masuri">Sona Masuri</option>
            <option value="seeraga_samba">Seeraga Samba</option>
            <option value="idli_rice">Idli Rice</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Quantity:</label>
          <input type="text" className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm" placeholder="50 kg" />
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Search Partners</button>
      </section>
    </div>
  );
};

export default StorageDashboard;
