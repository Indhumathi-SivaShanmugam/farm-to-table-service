// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import FarmerDash from "./components/farmerdash"; // Correct import
import DistributorDash from "./components/distridash"; // Correct import

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/farmer-dashboard" element={<FarmerDash />} />
        <Route path="/distributor-dashboard" element={<DistributorDash />} />
      </Routes>
    </Router>
  );
};

export default App;
