import React from 'react';

const Profile = () => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg transform transition-transform hover:scale-105">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Storage Manager Profile</h2>
      
      {/* Storage Manager Image Section */}
      <div className="flex justify-center mb-4">
        <img 
          src="https://cdn0.iconfinder.com/data/icons/avatar-4/512/Manager-1024.png" // Placeholder image URL
          alt="Storage Manager"
          className="w-32 h-32 rounded-full border-4 border-green-500 shadow-lg"
        />
      </div>

      <div className="text-center">
        <h3 className="text-2xl font-semibold text-gray-800">Jane Smith</h3>
        <p className="text-gray-600">jane.smith@example.com</p>
        <p className="text-gray-600">+1 (234) 567-8901</p>
      </div>

      <div className="mb-4">
        <h4 className="text-lg font-semibold text-gray-700">About Me</h4>
        <p className="text-gray-600">
          I manage storage facilities and oversee inventory for various agricultural products.
        </p>
      </div>

      <div className="mb-4">
        <h4 className="text-lg font-semibold text-gray-700">Experience</h4>
        <p className="text-gray-600">
          Over 5 years of experience in logistics and supply chain management in the agriculture sector.
        </p>
      </div>

      <div className="mb-4">
        <h4 className="text-lg font-semibold text-gray-700">Rating</h4>
        <div className="flex items-center justify-center">
          <span className="text-yellow-500 text-xl">★ ★ ★ ★ ★</span>
          <span className="ml-2 text-gray-600 text-lg">(5.0)</span>
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

export default Profile;
