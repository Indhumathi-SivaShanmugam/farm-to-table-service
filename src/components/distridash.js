import React, { useState } from 'react';
import logo from '../assets/logo.jpeg';
import turmericImage from '../assets/turmeric.jpeg';
import teaImage from '../assets/tea.jpeg';
import './distridash.css';
import farmersData from '../data/farmers.json';
import storageData from '../data/storage_units.json';
import processingData from '../data/processing_units.json';
import distributorsData from '../data/distributors.json';
import retailersData from '../data/retailers.json';

const DistributorDashboard = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [category, setCategory] = useState('');
  const [nearbyPersons, setNearbyPersons] = useState([]);

  const availableCrops = [
    { crop: 'Turmeric', quantity: 100, price: 2500, farmer: 'Farmer A', image: turmericImage },
    { crop: 'Tea', quantity: 50, price: 1000, storage: 'Storage B', image: teaImage },
  ];

  const currentOrders = [
    { id: 1234, crop: 'Tea', status: 'In Transit' },
  ];

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error fetching location: ", error);
          alert("Unable to retrieve your location. Please enable location services.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleCategoryClick = (selectedCategory) => {
    setCategory(selectedCategory);
    const data = getCategoryData(selectedCategory);
    filterNearbyPersons(data);
  };

  const getCategoryData = (selectedCategory) => {
    switch (selectedCategory) {
      case 'farmers':
        return farmersData;
      case 'storage':
        return storageData;
      case 'processing':
        return processingData;
      case 'distributors':
        return distributorsData;
      case 'retailers':
        return retailersData;
      default:
        return [];
    }
  };

  const filterNearbyPersons = (data) => {
    const nearby = data.filter(person => {
      const distance = calculateDistance(latitude, longitude, person.Latitude, person.Longitude);
      return distance <= 10; // Filtering within a 10 km radius
    });
    setNearbyPersons(nearby);
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleSendRequest = (person) => {
    alert(`Request sent to ${person.Name} at ${person.Location}.`);
    // You can replace this alert with an actual API call to send the request.
  };

  return (
    <div className="container mx-auto mt-4 p-6">
      <header className="flex items-center bg-green-500 text-white p-4 rounded-lg shadow">
        <img src={logo} alt="Logo" className="h-16 w-auto mr-4" />
        <h1 className="text-2xl font-bold">Welcome, Distributor!</h1>
      </header>

      <section className="panel crops my-4 p-4 bg-white rounded-lg shadow">
        <h3 className="font-bold">🌾 Available Crops</h3>
        <ul className="list-disc list-inside">
          {availableCrops.map((crop, index) => (
            <li key={index} className="flex items-center py-2 text-black">
              <img src={crop.image} alt={crop.crop} className="h-10 w-10 mr-2" />
              {crop.crop}: {crop.quantity} kg | Rs. {crop.price} | {crop.farmer || crop.storage}
            </li>
          ))}
        </ul>
      </section>

      <section className="panel orders my-4 p-4 bg-white rounded-lg shadow">
        <h3 className="font-bold">📦 Current Orders</h3>
        <ul>
          {currentOrders.map(order => (
            <li key={order.id} className="flex justify-between items-center p-2 border-b last:border-b-0 text-black">
              <span>Order ID: #{order.id} | {order.crop} | Status: {order.status}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="panel new-order my-4 p-4 bg-white rounded-lg shadow">
        <h3 className="font-bold">🔄 Initiate New Order</h3>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 mb-4" onClick={requestLocation}>
          Enable Location
        </button>
        {latitude && longitude && (
          <div className="mt-4">
            <p>Your Location: Latitude {latitude}, Longitude {longitude}</p>
            <div className="flex space-x-4 mt-4">
              {['farmers', 'storage', 'processing', 'distributors', 'retailers'].map(cat => (
                <button
                  key={cat}
                  className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                  onClick={() => handleCategoryClick(cat)}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {nearbyPersons.length > 0 && (
        <section className="panel nearby my-4 p-4 bg-white rounded-lg shadow">
          <h3 className="font-bold">📍 Nearby {category.charAt(0).toUpperCase() + category.slice(1)}</h3>
          <ul>
            {nearbyPersons.map((person, index) => (
              <li key={index} className="flex justify-between items-center p-2 border-b text-black">
                <span>{person.Name} - {person.Location} - {calculateDistance(latitude, longitude, person.Latitude, person.Longitude).toFixed(2)} km away</span>
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-200 ml-4"
                  onClick={() => handleSendRequest(person)}
                >
                  Send Request
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default DistributorDashboard;


