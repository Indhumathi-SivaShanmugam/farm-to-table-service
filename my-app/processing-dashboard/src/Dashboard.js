import React from 'react';

const ProcessorDashboard = () => {
//   const availableCrops = [
//     { crop: 'Turmeric', quantity: 100, price: 2500, farmer: 'Farmer A' },
//     { crop: 'Tea', quantity: 50, price: 1000, storage: 'Storage B' },
//   ];

  const currentOrders = [
    { id: 1234, crop: 'Tea', status: 'In Transit' },
  ];

  return (
    <div className="container mx-auto mt-8 p-6">
      <header className="flex items-center bg-green-500 text-white p-4 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold">Welcome, Processor!</h1>
      </header>

      <section className="my-6 p-6 bg-white rounded-lg shadow-md">
        <h5 className="font-bold text-xl">📦 Raw Material Orders</h5>
        <ul>
          {currentOrders.map(order => (
            <li key={order.id} className="flex justify-between items-center p-2 border-b last:border-b-0">
              <span>{order.crop}: {order.quantity} kg | From: {order.farmer} | Status: {order.status}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="my-6 p-6 bg-white rounded-lg shadow-md">
        <h5 className="font-bold text-xl">🏷️ Processed Goods Inventory</h5>
        <ul>
          <li>Coconut Oil: 100 liters | Available</li>
          <li>Sesame Oil: 50 liters | Available</li>
        </ul>
      </section>

      <section className="my-6 p-6 bg-white rounded-lg shadow-md">
        <h5 className="font-bold text-xl">🔄 Initiate New Order</h5>
        <div className="mb-4">
          <label className="block mb-2">Select Role:</label>
          <select className="form-select mt-1 block w-full border border-gray-300 rounded-lg shadow-sm">
            <option value="farmer">Farmer</option>
            <option value="storage">Storage</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Crop:</label>
          <select className="form-select mt-1 block w-full border border-gray-300 rounded-lg shadow-sm">
            <option value="turmeric">Turmeric</option>
            <option value="tea">Tea</option>
            <option value="clove">Clove</option>
            <option value="coconut">Coconut</option>
            <option value="sesame">Sesame</option>
            <option value="groundnut">Groundnut</option>
            <option value="cardamom">Cardamom</option>
            <option value="sugarcane">Sugarcane</option>
            <option value="ponni_rice">Ponni Rice</option>
            <option value="sona_masuri">Sona Masuri</option>
            <option value="seeraga_samba">Seeraga Samba</option>
            <option value="idli_rice">Idli Rice</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Quantity:</label>
          <input type="text" className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm" placeholder="100 kg" />
        </div>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200">Search Partners</button>
      </section>
    </div>
  );
};

export default ProcessorDashboard;
