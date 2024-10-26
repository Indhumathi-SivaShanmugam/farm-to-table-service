import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import bgImage from '../assets/table.jpg'; // Adjust path if needed
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Home.css"; // Import your custom CSS

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundAttachment: "fixed", // Ensures the image stays fixed during scroll
        backgroundRepeat: "no-repeat", // Prevents image repetition
        backgroundSize: "cover", // Ensures the image covers the entire background
      }}
    >
      {/* Navbar */}

{/* Navbar */}
<div className="navbar"> {/* Ensure the navbar class is applied here */}
  <h1 className="logo">🌱 Farm to Table</h1> {/* Apply logo class here */}
  
  <nav className="flex space-x-4"> {/* Ensure nav uses flex */}
    <button
      className="nav-button"
      onClick={() => navigate("/")}
    >
      Home
    </button>
    <button
      className="nav-button"
      onClick={() => navigate("/news")}
    >
      News
    </button>
    <button
      className="nav-button"
      onClick={() => navigate("/login")}
    >
      Login
    </button>
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
        <h3 className="text-4xl font-bold text-green-800 text-center mb-10">
          Latest Agricultural News 📰
        </h3>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
        >
          {["Crop Prices Surge", "New Farming Techniques", "Organic Farming Trends"].map(
            (news, index) => (
              <SwiperSlide key={index}>
                <div className="news-card p-10 bg-white rounded-lg shadow-lg text-center">
                  <h4 className="text-2xl font-semibold text-green-700">{news}</h4>
                  <p className="text-gray-600 mt-2">
                    Find out more about the latest trends in agriculture.
                  </p>
                </div>
              </SwiperSlide>
            )
          )}
        </Swiper>
      </section>

      {/* Footer */}
      <footer className="footer py-4 bg-green-800 text-center text-white">
        © 2024 Farm to Table Service. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
