import "./LandingPage.css";
import backgroundVideo from "./media/background_video.MOV";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import React, { useState } from "react";
import AboutSection from "./components/AboutSection";

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
      <Footer />
    </>
  );
}

export default LandingPage;
