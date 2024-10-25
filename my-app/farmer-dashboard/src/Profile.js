import React from 'react';

const Profile = () => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg transform transition-transform hover:scale-105">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Profile Page</h2>
      
      {/* Farmer Image Section */}
      <div className="flex justify-center mb-4">
        <img 
          src="https://pngimg.com/uploads/farmer/farmer_PNG48.png" // Farmer's image URL
          alt="Farmer"
          className="w-32 h-32 rounded-full border-4 border-green-500 shadow-lg"
        />
      </div>

      <div className="text-center">
        <h3 className="text-2xl font-semibold text-gray-800">John Doe</h3>
        <p className="text-gray-600">john.doe@example.com</p>
        <p className="text-gray-600">+1 (234) 567-8901</p>
      </div>

      <div className="mb-4">
        <h4 className="text-lg font-semibold text-gray-700">About Me</h4>
        <p className="text-gray-600">
          I am a farmer. I do farming.
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

export default Profile;
