import React, { useState, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import bgImage from "../assets/table.jpg";
import newsImage1 from "../assets/news1.jpeg";
import predictionBgImage from "../assets/news3.jpeg"; // Add background image for first slide
import priceBgImage from "../assets/news2.jpeg"; // Add background image for second slide
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Home.css";
import locationData from '../data/crop_data.json';
import priceData from '../data/market_price_data.json';

const Home = () => {
  const navigate = useNavigate();
  const [predictionMessage, setPredictionMessage] = useState("");
  const [pricePrediction, setPricePrediction] = useState("");
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

  const predictSeasonAndCrop = useCallback((latitude, longitude) => {
    const threshold = 0.01;
    const found = locationData.find(data =>
      Math.abs(data.Latitude - latitude) < threshold &&
      Math.abs(data.Longitude - longitude) < threshold
    );

    if (found) {
      setPredictionMessage(`In your area, it's the ${found.Season} season, and the prominent crop is ${found.Crop}.`);
      predictPrice(found.Crop, found.Season);
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

          {/* General News Slide */}
          <SwiperSlide>
            <div className="news-card relative rounded-lg shadow-lg overflow-hidden brightness-filter"
              style={{
                backgroundImage: `url(${newsImage1})`,  // Background image for general news slide
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              onClick={() => navigate("/news")}
            >
              <div className="overlay-content">
                <div className="overlay"></div>
                <p>Stay informed with updates from the farming industry.</p>
                <h4>Market Insights</h4>
              </div>
            </div>
          </SwiperSlide>

        </Swiper>
      </section>

      {/* About Us and Footer Sections */}
      {/* (Keep About Us and Footer as they were) */}
      
    </div>
  );
};

export default Home;






























