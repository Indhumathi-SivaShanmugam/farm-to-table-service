import React, { useState } from 'react';
import logo from '../assets/logo.jpeg'; // Your logo image
import turmericImage from '../assets/turmeric.jpeg'; // Sample crop image
import cloveImage from '../assets/clove.jpeg';
import './farmerdash.css';
import farmersData from '../data/farmers.json';
import storageData from '../data/storage_units.json';
import processingData from '../data/processing_units.json';
import distributorsData from '../data/distributors.json';
import retailersData from '../data/retailers.json';

const CropSelector = () => (
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
);

const Dashboard = ({ farmerName }) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [category, setCategory] = useState('');
  const [nearbyPersons, setNearbyPersons] = useState([]);
  const [orders, setOrders] = useState([{ id: 1, crop: 'Turmeric', quantity: '20 kg', status: 'Pending' }]);

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

  const getCategoryData = (category) => {
    switch (category) {
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
    const nearby = data.filter((person) => {
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

  const sendRequest = (person) => {
    alert(`Request sent to ${person.Name} at ${person.Location}`);
  };

  return (
    <div className="container mx-auto mt-4 p-6">
      <header className="flex items-center bg-green-500 text-white p-4 rounded-lg shadow">
        <img src={logo} alt="Logo" className="h-16 w-auto mr-4" />
        <h1 className="text-2xl font-bold">Welcome, {farmerName}!</h1>
      </header>

      <section className="panel news my-4 p-4 bg-white rounded-lg shadow">
        <h3 className="font-bold">🌐 News & Predictions</h3>
        <p>"Demand for Turmeric will rise in December."</p>
      </section>

      <section className="panel crops my-4 p-4 bg-white rounded-lg shadow">
        <h3 className="font-bold">📋 Listed Crops</h3>
        <ul className="list-disc list-inside">
          <p className="flex items-center">
            <img src={turmericImage} alt="Turmeric" className="h-10 w-10 mr-2" />
            Turmeric: 50 kg | Rs. 2500 | Status: Available
          </p>
          <p className="flex items-center">
            <img src={cloveImage} alt="Clove" className="h-10 w-10 mr-2" />
            Clove: 30 kg | Rs. 5000 | Status: Pending
          </p>
        </ul>
      </section>

      <section className="panel new-order my-4 p-4 bg-white rounded-lg shadow">
        <h3 className="font-bold">🔄 Initiate New Order</h3>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={requestLocation}>
          Enable Location
        </button>
        {latitude && longitude && (
          <div className="mt-4">
            <p>Your Location: Latitude {latitude}, Longitude {longitude}</p>
            <div className="flex space-x-4 mt-4">
              {['farmers', 'storage', 'processing', 'distributors', 'retailers'].map((cat) => (
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
              <li key={index} className="flex justify-between items-center p-2 border-b">
                <span>
                  {person.Name} - {person.Location} - {calculateDistance(latitude, longitude, person.Latitude, person.Longitude).toFixed(2)} km away
                </span>
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                  onClick={() => sendRequest(person)}
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

export default Dashboard;



