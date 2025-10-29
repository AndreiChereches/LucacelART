import React, { useState } from "react";
import "./LandingPage.css";
import backgroundVideo from "./media/bgvideo.mp4";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AboutSection from "./components/AboutSection";
import GallerySection from "./components/GallerySection";
import LucacelSection from "./components/LucacelSection";

function LandingPage() {
  return (
    <>
      <section className="hero">
        <video
          className="hero-video"
          src={backgroundVideo}
          autoPlay
          loop
          muted
          playsInline
        />
        <Navbar theme="light" />
        <div className="overlay"></div>
        <h1 className="title">Lucacel Art</h1>
      </section>
      <AboutSection />
      <GallerySection />
      <LucacelSection />
      <Footer />
    </>
  );
}

export default LandingPage;
