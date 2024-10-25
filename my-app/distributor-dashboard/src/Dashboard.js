import React from 'react';
import logo from './assets/logo.png'; 

const DistributorDashboard = () => {
  const availableCrops = [
    { crop: 'Turmeric', quantity: 100, price: 2500, farmer: 'Farmer A' },
    { crop: 'Tea', quantity: 50, price: 1000, storage: 'Storage B' },
  ];

  const currentOrders = [
    { id: 1234, crop: 'Tea', status: 'In Transit' },
  ];

  return (
    <div className="container mx-auto mt-8 p-8"> {/* Increased margin top and padding */}
      <header className="flex items-center bg-green-400 text-white p-4 rounded-lg shadow-md">
        <img src={logo} alt="Logo" className="h-16 w-auto mr-4" />
        <h1 className="text-3xl font-bold">Welcome, Distributor!</h1> {/* Increased font size */}
      </header>

      <section className="panel crops my-6 p-6 bg-white rounded-lg shadow-md"> {/* Increased padding */}
        <h5 className="font-bold text-xl">🌾 Available Crops</h5> {/* Increased font size */}
        <ul className="list-disc list-inside">
          {availableCrops.map((crop, index) => (
            <li key={index} className="flex items-center py-2"> {/* Increased vertical padding */}
              {crop.crop}: {crop.quantity} kg | Rs. {crop.price} | {crop.farmer || crop.storage}
            </li>
          ))}
        </ul>
      </section>

      <section className="panel orders my-6 p-6 bg-white rounded-lg shadow-md"> {/* Increased padding */}
        <h5 className="font-bold text-xl">📦 Current Orders</h5> {/* Increased font size */}
        <ul>
          {currentOrders.map(order => (
            <li key={order.id} className="flex justify-between items-center p-2 border-b last:border-b-0">
              <span>Order ID: #{order.id} | {order.crop} | Status: {order.status}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="panel new-order my-6 p-6 bg-white rounded-lg shadow-md"> {/* Increased padding */}
        <h5 className="font-bold text-xl">🔄 Initiate New Order</h5> {/* Increased font size */}
        <div className="mb-4">
          <label>Select Role:</label>
          <select className="form-select mt-1 block w-full border border-gray-300 rounded-lg shadow-sm">
            <option value="farmer">Farmer</option>
            <option value="storage">Storage</option>
          </select>
        </div>
        <div className="mb-4">
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
        <div className="mb-4">
          <label>Quantity:</label>
          <input type="text" className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm" placeholder="50 kg" />
        </div>
        <button className="bg-green-400 text-white px-4 py-2 rounded hover:bg-green-500 transition duration-200">Search Partners</button>
      </section>
    </div>
  );
};

export default DistributorDashboard;
