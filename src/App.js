// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import FarmerDash from './components/farmerdash';
//import DistributorDash from '.components/DistributorDash';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/farmer-dashboard" element={<FarmerDash/>} />
       
      </Routes>
    </Router>
  );
};


export default App;
