import React from 'react';

const Orders = () => {
  const orders = [
    { id: 1, item: 'Turmeric', quantity: 100, status: 'Shipped', temperature: '15°C' },
    { id: 2, item: 'Clove', quantity: 50, status: 'Pending', temperature: '20°C' },
    { id: 3, item: 'Idli Rice', quantity: 70, status: 'Delivered', temperature: '18°C' },
  ];

  return (
    <div className="max-w-2xl mx-auto mt-16 p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold mb-8 text-gray-800">Storage Orders</h2>
      
      <div className="space-y-6">
        {orders.map(order => (
          <div key={order.id} className="flex justify-between items-start border p-6 rounded-lg shadow-md bg-gray-50">
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-gray-800">{order.item}</h3>
              <p className="text-lg text-gray-600">Quantity: {order.quantity} kg</p>
              <p className="text-lg text-gray-600">Temperature: {order.temperature}</p>
              <p className={`text-md ${order.status === 'Delivered' ? 'text-green-500' : 'text-yellow-500'}`}>
                Status: {order.status}
              </p>
            </div>
            <div className="flex flex-col justify-between ml-6"> {/* Added left margin */}
              <button className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition duration-200 mb-4 text-lg">
                View Details
              </button>
              {order.status !== 'Delivered' && (
                <button className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600 transition duration-200 text-lg">
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;

