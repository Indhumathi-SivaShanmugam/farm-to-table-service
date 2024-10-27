import React, { useState, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import bgImage from "../assets/table.jpg";
import aboutImage from "../assets/bg.webp"; // Replace with your "About Us" image path
import newsImage1 from "../assets/news1.jpeg";
import predictionBgImage from "../assets/news3.jpeg"; // Background image for first slide
import priceBgImage from "../assets/news2.jpeg"; // Background image for second slide
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Home.css";
import locationData from '../data/crop_data.json';
import priceData from '../data/market_price_data.json';

// Add your crop yield dataset
const yieldData = [
  { Location: "Chennai", Season: "Winter", Crop: "Rice", Yield: 4 },
  { Location: "Chennai", Season: "Summer", Crop: "Rice", Yield: 2.8 },
  { Location: "Chennai", Season: "Monsoon", Crop: "Rice", Yield: 3.7 },
  { Location: "Chennai", Season: "Post-Monsoon", Crop: "Rice", Yield: 3.5 },
  { Location: "Chennai", Season: "Winter", Crop: "Turmeric", Yield: 2.5 },
  { Location: "Chennai", Season: "Summer", Crop: "Turmeric", Yield: 1.6 },
  { Location: "Chennai", Season: "Monsoon", Crop: "Turmeric", Yield: 2.2 },
  { Location: "Chennai", Season: "Post-Monsoon", Crop: "Turmeric", Yield: 2.8 },
  { Location: "Chennai", Season: "Winter", Crop: "Cardamom", Yield: 3.2 },
  { Location: "Chennai", Season: "Summer", Crop: "Cardamom", Yield: 1.9 },
  { Location: "Chennai", Season: "Monsoon", Crop: "Cardamom", Yield: 2.6 },
  { Location: "Chennai", Season: "Post-Monsoon", Crop: "Cardamom", Yield: 2.9 },
];

const Home = () => {
  const navigate = useNavigate();
  const [predictionMessage, setPredictionMessage] = useState("");
  const [pricePrediction, setPricePrediction] = useState("");
  const [cropYield, setCropYield] = useState(""); // State for crop yield
  const [locationGranted, setLocationGranted] = useState(false);

  const predictPrice = useCallback((crop, season) => {
    const latestPriceData = priceData
      .filter((entry) => entry.Crop === crop && entry.Season === season)
      .sort((a, b) => new Date(b.Date) - new Date(a.Date));

    if (latestPriceData.length > 0) {
      setPricePrediction(`The latest price for ${crop} in ${season} is ₹${latestPriceData[0].Price} per unit.`);
    } else {
      setPricePrediction("Price data is not available for the selected crop and season.");
    }
  }, []);

  const predictYield = (crop, season) => {
    const foundYield = yieldData.find(data => data.Crop === crop && data.Season === season);
    if (foundYield) {
      setCropYield(`The predicted yield for ${crop} in ${season} is ${foundYield.Yield} tons per hectare.`);
    } else {
      setCropYield("Yield data is not available for the selected crop and season.");
    }
  };

  const predictSeasonAndCrop = useCallback((latitude, longitude) => {
    const threshold = 0.01;
    const found = locationData.find(data =>
      Math.abs(data.Latitude - latitude) < threshold &&
      Math.abs(data.Longitude - longitude) < threshold
    );

    if (found) {
      setPredictionMessage(`In your area, it's the ${found.Season} season, and the prominent crop is ${found.Crop}.`);
      predictPrice(found.Crop, found.Season);
      predictYield(found.Crop, found.Season); // Call predictYield
    } else {
      setPredictionMessage("Location data not found for your coordinates.");
    }
  }, [predictPrice]);

  useEffect(() => {
    const handleLocation = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      predictSeasonAndCrop(latitude, longitude);
      setLocationGranted(true);
    };

    const fetchLocationData = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(handleLocation, () => {
          alert("Unable to retrieve your location. Please enable location services.");
        });
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    };

    fetchLocationData();
  }, [predictSeasonAndCrop]);

  useEffect(() => {
    if (!locationGranted) {
      alert("Please enable location services to use this feature.");
    }
  }, [locationGranted]);

  return (
    <div className="min-h-screen bg-cover bg-center" style={{
      backgroundImage: `url(${bgImage})`,
      backgroundAttachment: "fixed",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    }}>
      <div className="navbar">
        <h1 className="logo">🌱 Farm to Table</h1>
        <nav className="flex space-x-4">
          <button className="nav-button" onClick={() => navigate("/")}>Home</button>
          <button className="nav-button" onClick={() => navigate("/news")}>News</button>
          <button className="nav-button" onClick={() => navigate("/login")}>Login</button>
        </nav>
      </div>

      {/* Welcome Section */}
      <section className="welcome-section w-full text-center flex items-center justify-center min-h-screen">
        <div className="welcome-content flex flex-col items-center">
          <h2 className="text-6xl font-bold text-white drop-shadow-lg">
            Welcome to Farm to Table Service!
          </h2>
          <p className="text-2xl text-white/90 mt-4 drop-shadow-md max-w-2xl mx-auto text-center">
            Your one-stop platform to connect with farmers, distributors, and more!
          </p>
        </div>
      </section>

      {/* News Section */}
      <section className="news-section py-16 bg-white/90">
        <h3 className="section-title text-green-800">Latest Agricultural News 📰</h3>
        <Swiper modules={[Navigation, Pagination, Autoplay]} spaceBetween={20} slidesPerView={1} navigation pagination={{ clickable: true }} autoplay={{ delay: 3000 }}>

          {/* Crop Prediction Slide */}
          <SwiperSlide>
            <div className="news-card relative rounded-lg shadow-lg overflow-hidden brightness-filter"
              style={{
                backgroundImage: `url(${predictionBgImage})`,  // Background image for prediction slide
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="overlay-content">
                <div className="overlay"></div>
                <h4 className="text-3xl font-bold">{predictionMessage}</h4>
                <p className="text-xl mt-2">
                  Discover the best crops to plant and enjoy local flavors!
                </p>
              </div>
            </div>
          </SwiperSlide>

          {/* Price Prediction Slide */}
          <SwiperSlide>
            <div className="news-card relative rounded-lg shadow-lg overflow-hidden brightness-filter"
              style={{
                backgroundImage: `url(${priceBgImage})`,  // Background image for price prediction slide
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="overlay-content">
                <div className="overlay"></div>
                <h4 className="text-3xl font-bold">{pricePrediction}</h4>
                <p className="text-xl mt-2">
                  Stay updated with the latest market prices for local produce!
                </p>
              </div>
            </div>
          </SwiperSlide>

          {/* Yield Prediction Slide */}
          <SwiperSlide>
            <div className="news-card relative rounded-lg shadow-lg overflow-hidden brightness-filter"
              style={{
                backgroundImage: `url(${newsImage1})`,  // Background image for general news slide
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="overlay-content">
                <div className="overlay"></div>
                <h4 className="text-3xl font-bold">{cropYield}</h4>
                <p className="text-xl mt-2">
                  Learn about expected yields based on your location and crop choice!
                </p>
              </div>
            </div>
          </SwiperSlide>

        </Swiper>
      </section>
      {/* About Us Section */}
      <section className="about-us-section py-16 bg-green-100">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
          <div className="about-text md:w-1/2 text-center md:text-left mb-6 md:mb-0">
            <h3 className="text-5xl font-bold text-green-800 mb-4 leading-tight">
              Who<br />we<br />are.
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed max-w-md">
              Farm to Table Service is committed to bridging the gap between farmers,
              distributors, and retailers. Our platform empowers farmers to sell directly,
              reduces middlemen interference, and ensures consumers receive fresh produce
              at fair prices. By embracing technology and sustainability, we aim to create
              a more connected and efficient supply chain in the agricultural sector.
            </p>
          </div>
          <div className="about-image md:w-1/2 flex justify-center md:justify-start">
            <img
              src={aboutImage}
              alt="About Us"
              className="rounded-lg shadow-lg max-w-xs md:max-w-md"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer py-4 bg-green-800 text-center text-white">
        © 2024 Farm to Table Service. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;































