import React, { useState } from "react";
import "./css/AboutSection.css";

import img1 from "../media/about1.png";
import img2 from "../media/about2.png";
import img3 from "../media/about3.png";
import img4 from "../media/about4.png";

export default function AboutSection() {
  // Local slides array
  const slides = [
    {
      image: img1,
      text: "My concept combines contemporary painting with traditional craft in an original method, blending old materials into modern expression.",
    },
    {
      image: img2,
      text: "Inspired by my roots, I use woven cloths and aged textures to create a dialogue between memory and creativity.",
    },
    {
      image: img4,
      text: "Each piece represents a connection between past generations and today’s artistic vision, bound through color and emotion.",
    },
  ];

  // Local state for carousel index
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="about-section" id="about">
      <h2 className="about-title">About my art</h2>
      <p className="about-subtitle">
        blending contemporary painting with traditional craft, using woven
        cloths and century-old frames to preserve my village’s spirit and honor
        past generations.
      </p>

      <div className="about-carousel">
        {/* IMAGE VIEWPORT */}
        <div className="about-viewport">
          <div
            className="about-slider about-image-slider"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {slides.map((slide, i) => (
              <div className="about-slide" key={`img-${i}`}>
                <div className="about-image-container">
                  <img
                    src={slide.image}
                    alt={`Artwork ${i + 1}`}
                    className="about-image"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TEXT VIEWPORT */}
        <div className="about-viewport">
          <div
            className="about-slider about-text-slider"
            style={{ transform: `translateX(${currentIndex * 100}%)` }} // <-- no minus
          >
            {slides.map((slide, i) => (
              <div className="about-slide" key={`txt-${i}`}>
                <div className="about-text-container">
                  <p className="about-text">{slide.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="about-controls">
        <button className="arrow-btn" onClick={prevSlide} aria-label="Previous">
          &lt;
        </button>
        <button className="arrow-btn" onClick={nextSlide} aria-label="Next">
          &gt;
        </button>
      </div>

      <p className="about-footer">
        Out of the worry of losing our roots, my move is a timid urge to keep
        what they once created.
      </p>

      <a href="#learn-more" className="learn-more">
        learn more ⟶
      </a>
    </section>
  );
}
