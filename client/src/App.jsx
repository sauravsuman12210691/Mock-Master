import React from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import Dashboard from "./Dashboard";
import Home from "./Home/Home"
import Register from "./Register/Register";
import Profile from "./Profile/Profile"
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
        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;
