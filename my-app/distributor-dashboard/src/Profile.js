import React from 'react';

const DistributorProfile = () => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg transform transition-transform hover:scale-105">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Distributor Profile</h2>
      
      {/* Distributor Image Section */}
      <div className="flex justify-center mb-4">
        <img 
          src="https://cdn-icons-png.flaticon.com/512/4867/4867560.png" // Distributor's image URL (replace with actual URL)
          alt="Distributor"
          className="w-32 h-32 rounded-full border-4 border-green-500 shadow-lg"
        />
      </div>

      <div className="text-center">
        <h3 className="text-2xl font-semibold text-gray-800">Alex Johnson</h3>
        <p className="text-gray-600">alex.johnson@example.com</p>
        <p className="text-gray-600">+1 (234) 567-8903</p>
      </div>

      <div className="mb-4">
        <h4 className="text-lg font-semibold text-gray-700">About Me</h4>
        <p className="text-gray-600">
          I am a distributor of agricultural products, ensuring quality and timely delivery.
        </p>
      </div>

      <div className="mb-4">
        <h4 className="text-lg font-semibold text-gray-700">Rating</h4>
        <div className="flex items-center justify-center">
          <span className="text-yellow-500 text-xl">★ ★ ★ ★ ☆</span>
          <span className="ml-2 text-gray-600 text-lg">(4.0)</span>
        </div>
      </div>

      <button 
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
        onClick={() => alert('Edit Profile')}
      >
        Edit Profile
      </button>
    </div>
  );
};

export default DistributorProfile;
