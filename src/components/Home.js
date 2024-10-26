import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import bgImage from "../assets/table.jpg"; // Adjust path if needed
import aboutImage from "../assets/bg.webp"; // Replace with your "About Us" image path
import newsImage1 from "../assets/news1.jpg";
import newsImage2 from "../assets/news2.jpg";
import newsImage3 from "../assets/news3.jpg";
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
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {/* Navbar */}
      <div className="navbar">
        <h1 className="logo">🌱 Farm to Table</h1>
        <nav className="flex space-x-4">
          <button className="nav-button" onClick={() => navigate("/")}>
            Home
          </button>
          <button className="nav-button" onClick={() => navigate("/news")}>
            News
          </button>
          <button className="nav-button" onClick={() => navigate("/login")}>
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
  <h3 className="section-title text-green-800">Latest Agricultural News 📰</h3>
  <Swiper
    modules={[Navigation, Pagination, Autoplay]}
    spaceBetween={20}
    slidesPerView={1}
    navigation
    pagination={{ clickable: true }}
    autoplay={{ delay: 3000 }}
  >
    {[
  { title: "Crop Prices Surge", img: newsImage1 },
  { title: "New Farming Techniques", img: newsImage2 },
  { title: "Organic Farming Trends", img: newsImage3 },
].map((news, index) => (
  <SwiperSlide key={index}>
    <div
      className="news-card relative rounded-lg shadow-lg cursor-pointer overflow-hidden"
      style={{
        backgroundImage: `url(${news.img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      onClick={() => navigate("/news")}
    >
      {/* Overlay Content */}
      <div className="overlay-content">
        <p>Find out more about the latest trends in agriculture.</p>
        <h4>{news.title}</h4>
      </div>
    </div>
  </SwiperSlide>
))}


    
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
