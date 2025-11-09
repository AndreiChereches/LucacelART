import React, { useEffect } from "react";
import "./LandingPage.css";
import backgroundVideo from "./media/bgvideo.mp4";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AboutSection from "./components/AboutSection";
import GallerySection from "./components/GallerySection";
import LucacelSection from "./components/LucacelSection";

function LandingPage() {
  useEffect(() => {
    // Handle hash scrolling when page loads with a hash
    const hash = window.location.hash;
    if (hash) {
      // Wait for page to render, then scroll to the element
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1)); // Remove # from hash
        if (element) {
          const yOffset = -100; // Offset for navbar
          const y =
            element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100);
    }
  }, []);

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
