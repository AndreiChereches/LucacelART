import React from "react";
import "./css/GallerySection.css";

import head from "../media/gallerysection/headpainting.png";
import wide1 from "../media/gallerysection/wide1.png";
import wide2 from "../media/gallerysection/wide2.png";
import wide3 from "../media/gallerysection/wide3.png";
import tall1 from "../media/gallerysection/tall1.png";
import tall2 from "../media/gallerysection/tall2.png";
import tall3 from "../media/gallerysection/tall3.png";
import small1 from "../media/gallerysection/small1.png";
import small2 from "../media/gallerysection/small2.png";
import small3 from "../media/gallerysection/small3.png";
import med1 from "../media/gallerysection/med1.png";
import med2 from "../media/gallerysection/med2.png";

export default function PaintingGallery() {
  return (
    <section className="gallery-section" id="gallery">
      <h2 className="gallery-section-title">Painting Gallery</h2>
      <div className="gallery-grid">
        {/* Row 1: head painting centered */}
        <div className="gallery-item head">
          <a href="#">
            <img src={head} alt="Head Painting" />
          </a>
        </div>

        {/* Row 2: two wide paintings */}
        <div className="gallery-item wide wide-left">
          <a href="#">
            <img src={wide1} alt="Wide Painting 1" />
          </a>
        </div>
        <div className="gallery-item wide wide-right">
          <a href="#">
            <img src={wide2} alt="Wide Painting 2" />
          </a>
        </div>

        {/* Row 3: tall1 – small3 – tall2 – small2 – tall3 */}
        <div className="gallery-item tall tall1">
          <a href="#">
            <img src={tall1} alt="Tall Painting 1" />
          </a>
        </div>
        <div className="gallery-item small small3">
          <a href="#">
            <img src={small3} alt="Small Painting 3" />
          </a>
        </div>
        <div className="gallery-item tall tall2">
          <a href="#">
            <img src={tall2} alt="Tall Painting 2" />
          </a>
        </div>
        <div className="gallery-item small small2">
          <a href="#">
            <img src={small2} alt="Small Painting 2" />
          </a>
        </div>
        <div className="gallery-item tall tall3">
          <a href="#">
            <img src={tall3} alt="Tall Painting 3" />
          </a>
        </div>
      </div>
    </section>
  );
}
