import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigation } from './components/Nav';
import { Home } from './components/Home';
import { Breakfast } from "./components/Breakfast";
import { Footer } from "./components/Footer";
import { Brunch } from "./components/Brunch";
import { Lunch } from "./components/Lunch";
import { Dinner } from "./components/Dinner";
import { Login } from "./components/Login";
import { Register } from "./components/Register";

function App() {
  return (
    <div style={{ backgroundColor: "rgb(255, 250, 240)" }}>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/breakfast" element={<Breakfast />} />
          <Route path="/brunch" element={<Brunch />} />
          <Route path="/lunch" element={<Lunch />} />
          <Route path="/dinner" element={<Dinner />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
