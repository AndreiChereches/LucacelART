import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./LandingPage";
import Paintings from "./components/Paintings";
import ScrollGallery from "./components/ScrollGallery";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/paintings" element={<LandingPage />} />
        <Route path="/scrollgallery" element={<ScrollGallery />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

