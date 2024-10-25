import React from 'react';

const RetailerOrders = () => {
  const orders = [
    { id: 1, item: 'Coconut Oil', quantity: 100, status: 'Completed' },
    { id: 2, item: 'Sona Masuri Rice', quantity: 50, status: 'Pending' },
    { id: 3, item: 'Turmeric', quantity: 20, status: 'Shipped' },
  ];

  return (
    <div className="max-w-2xl mx-auto mt-16 p-6 bg-white rounded-lg shadow-md"> {/* Increased margin top */}
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Orders Page</h2>
      
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="flex justify-between items-center border p-4 rounded-lg shadow-sm bg-gray-50">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{order.item}</h3>
              <p className="text-gray-600">Quantity: {order.quantity}</p>
              <p className={`text-sm ${order.status === 'Completed' ? 'text-green-500' : 'text-yellow-500'}`}>
                Status: {order.status}
              </p>
            </div>
            <div className="flex space-x-2">
              <button className="bg-green-400 text-white px-4 py-2 rounded hover:bg-green-500 transition duration-200">
                View Details
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200">
                Cancel Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RetailerOrders;
