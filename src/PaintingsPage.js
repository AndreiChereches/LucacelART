import React, { useEffect, useLayoutEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./PaintingsPage.css";

function PaintingsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Use useLayoutEffect for immediate scroll before paint
  useLayoutEffect(() => {
    // Clear any hash from URL immediately to prevent scrolling to footer
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
    
    // Immediately scroll to top (instant, before paint)
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  // Also use useEffect to ensure scroll after render and override any other scrolls
  useEffect(() => {
    // Prevent browser's scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // Clear hash again in case it was set during navigation
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
    
    // Scroll to top multiple times to ensure it works
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    
    // Immediate scroll
    scrollToTop();
    
    // Scroll after Navbar's setTimeout (50ms) plus a bit more
    const timeout1 = setTimeout(scrollToTop, 150);
    
    // Final scroll with smooth behavior after everything is loaded
    const timeout2 = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 200);
    
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [location.pathname]);

  return (
    <div className="paintings-page">
      <Navbar theme="light" />
      <div className="coming-soon-container">
        <div className="coming-soon-content">
          <h1 className="coming-soon-title">Paintings Collection</h1>
          <div className="divider"></div>
          <p className="coming-soon-subtitle">Coming Soon</p>
          <p className="coming-soon-description">
            We are currently curating an exclusive collection of paintings that 
            showcase the depth and beauty of contemporary art. Each piece tells 
            a unique story, blending technique with emotion to create works that 
            resonate with viewers on multiple levels.
          </p>
          <p className="coming-soon-description">
            Our paintings collection will feature a diverse range of styles, 
            from abstract expressions to detailed realism, each carefully selected 
            to represent the evolution of artistic vision. Stay tuned for the 
            unveiling of this remarkable collection.
          </p>
          <div className="coming-soon-cta">
            <p>In the meantime, explore our</p>
            <button 
              onClick={() => {
                // Navigate to landing page with gallery hash
                navigate("/#gallery");
                // Wait for navigation and page render, then scroll to gallery
                setTimeout(() => {
                  requestAnimationFrame(() => {
                    const galleryElement = document.getElementById("gallery");
                    if (galleryElement) {
                      // Scroll with offset to account for navbar
                      const yOffset = -100; // Adjust based on navbar height
                      const y = galleryElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
                      window.scrollTo({ top: y, behavior: "smooth" });
                    }
                  });
                }, 200);
              }} 
              className="link-to-gallery"
            >
              gallery
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PaintingsPage;

