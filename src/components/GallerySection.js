import React from "react";
import "./css/GallerySection.css";

import desktopgallery from "../media/desktopgallery.png";
import phonegallery from "../media/phonegalley.png";

export default function PaintingGallery() {
  return (
    <section className="gallery-section" id="gallery">
      <h2 className="gallery-section-title">Painting Gallery</h2>
      <img
        className="gallery-image desktop-gallery"
        src={desktopgallery}
        alt="Painting Gallery"
      />
      <img
        className="gallery-image phone-gallery"
        src={phonegallery}
        alt="Painting Gallery"
      />
    </section>
  );
}
