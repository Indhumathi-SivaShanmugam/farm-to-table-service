import React from 'react';

const Logout = () => {
  const handleLogout = () => {
    console.log('Logged out');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Logout</h2>
        <p className="text-gray-600 mb-4">
          Are you sure you want to log out? You will be redirected to the login page.
        </p>
        <button 
          onClick={handleLogout} 
          className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition duration-200 font-semibold"
        >
          Confirm Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;
