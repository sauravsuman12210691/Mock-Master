import React, { useEffect, useState } from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import Dashboard from "./Dashboard/Dashboard";
import Home from "./Home/Home"
import Register from "./Register/Register";
import Profile from "./Profile/Profile";
import About from "./About/About";
import Ats from "./Ats/Ats";
import Interview from "./Interview/Interview"
import Results from "./Results/Results";
import axios from "axios";
function App() {
  
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login"  element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/" element={<Home/>} />
          <Route path="/About" element={<About/>} />
          <Route path="/Interview" element={<Interview/>} />
          <Route path="/Ats" element={<Ats/>} />
          <Route path="/result" element={<Results/>} />
        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;
