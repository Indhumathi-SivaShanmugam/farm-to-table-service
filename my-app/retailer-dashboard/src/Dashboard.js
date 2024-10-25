import React from 'react';
import logo from './assets/logo.png'; 

const RetailerDashboard = () => {
  const availableProducts = [
    { product: 'Coconut Oil', quantity: 100, price: 3000, supplier: 'Processor A' },
    { product: 'Sona Masuri Rice', quantity: 50, price: 1500, supplier: 'Distributor B' },
  ];

  const orderHistory = [
    { id: 5678, product: 'Coconut Oil', status: 'Completed' },
  ];

  return (
    <div className="container mx-auto mt-8 p-8"> {/* Increased margin top and padding */}
      <header className="flex items-center bg-green-400 text-white p-4 rounded-lg shadow-md">
        <img src={logo} alt="Logo" className="h-16 w-auto mr-4" />
        <h1 className="text-3xl font-bold">Welcome, Retailer!</h1> {/* Increased font size */}
      </header>

      <section className="panel products my-6 p-6 bg-white rounded-lg shadow-md"> {/* Increased padding */}
        <h5 className="font-bold text-xl">🛒 Available Products</h5> {/* Increased font size */}
        <ul className="list-disc list-inside">
          {availableProducts.map((product, index) => (
            <li key={index} className="flex items-center py-2"> {/* Increased vertical padding */}
              {product.product}: {product.quantity} liters | Rs. {product.price} | {product.supplier}
            </li>
          ))}
        </ul>
      </section>

      <section className="panel order-history my-6 p-6 bg-white rounded-lg shadow-md"> {/* Increased padding */}
        <h5 className="font-bold text-xl">📦 Order History</h5> {/* Increased font size */}
        <ul>
          {orderHistory.map(order => (
            <li key={order.id} className="flex justify-between items-center p-2 border-b last:border-b-0">
              <span>Order #{order.id} | Product: {order.product} | Status: {order.status}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="panel new-order my-6 p-6 bg-white rounded-lg shadow-md"> {/* Increased padding */}
        <h5 className="font-bold text-xl">🔄 Initiate New Order</h5> {/* Increased font size */}
        <div className="mb-4">
          <label>Select Role:</label>
          <select className="form-select mt-1 block w-full border border-gray-300 rounded-lg shadow-sm">
            <option value="distributor">Distributor</option>
            <option value="processor">Processor</option>
          </select>
        </div>
        <div className="mb-4">
          <label>Product:</label>
          <select className="form-select mt-1 block w-full border border-gray-300 rounded-lg shadow-sm">
            <option value="sona_masuri_rice">Sona Masuri Rice</option>
            <option value="coconut_oil">Coconut Oil</option>
            {/* Add more products as needed */}
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

export default RetailerDashboard;
