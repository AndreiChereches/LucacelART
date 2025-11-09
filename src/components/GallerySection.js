import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/GallerySection.css";

import desktopgallery from "../media/desktopgallery.png";
import phonegallery from "../media/phonegalley.png";

export default function PaintingGallery() {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/paintings");
  };

  return (
    <section className="gallery-section" id="gallery">
      <h2 className="gallery-section-title">Painting Gallery</h2>
      <a
        href="/paintings"
        onClick={handleClick}
        className="gallery-image-link"
        aria-label="Navigate to Paintings"
      >
        <img
          className="gallery-image desktop-gallery"
          src={desktopgallery}
          alt="Painting Gallery"
        />
      </a>
      <a
        href="/paintings"
        onClick={handleClick}
        className="gallery-image-link"
        aria-label="Navigate to Paintings"
      >
        <img
          className="gallery-image phone-gallery"
          src={phonegallery}
          alt="Painting Gallery"
        />
      </a>
    </section>
  );
}
