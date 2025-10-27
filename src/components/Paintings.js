import React, { useState } from "react";
import "./Paintings.css";
import Navbar from "./Navbar";

const mockData = {
  golden: [
    { id: 1, title: "Golden Artwork 1", img: "/images/golden1.jpg" },
    { id: 2, title: "Golden Artwork 2", img: "/images/golden2.jpg" },
    { id: 3, title: "Golden Artwork 3", img: "/images/golden3.jpg" },
    { id: 4, title: "Golden Artwork 4", img: "/images/golden4.jpg" },
    { id: 5, title: "Golden Artwork 5", img: "/images/golden5.jpg" },
  ],
  wooden: [
    { id: 1, title: "Wooden Artwork 1", img: "/images/wood1.jpg" },
    { id: 2, title: "Wooden Artwork 2", img: "/images/wood2.jpg" },
    { id: 3, title: "Wooden Artwork 3", img: "/images/wood3.jpg" },
    { id: 4, title: "Wooden Artwork 4", img: "/images/wood4.jpg" },
    { id: 5, title: "Wooden Artwork 5", img: "/images/wood5.jpg" },
  ],
  white: [
    { id: 1, title: "White Artwork 1", img: "/images/white1.jpg" },
    { id: 2, title: "White Artwork 2", img: "/images/white2.jpg" },
    { id: 3, title: "White Artwork 3", img: "/images/white3.jpg" },
    { id: 4, title: "White Artwork 4", img: "/images/white4.jpg" },
    { id: 5, title: "White Artwork 5", img: "/images/white5.jpg" },
  ],
};

function Carousel({ title, items, frameClass }) {
  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((prev) => (prev === 0 ? items.length - 3 : prev - 1));
  };

  const next = () => {
    setIndex((prev) => (prev >= items.length - 3 ? 0 : prev + 1));
  };

  return (
    <section className="carousel-section">
      <h2 className="carousel-title">{title}</h2>
      <div className="carousel-container">
        <div
          className="carousel-items"
          style={{
            transform: `translateX(-${index * (100 / 3)}%)`,
            transition: "transform 0.5s ease-in-out",
            width: `${(items.length / 3) * 100}%`,
          }}
        >
          {items.map((item) => (
            <div key={item.id} className={`carousel-item ${frameClass}`}>
              <img src={item.img} alt={item.title} />
              <p>{item.title}</p>
            </div>
          ))}
        </div>
        <div className="carousel-nav">
          <button className="nav-btn" onClick={prev}>
            &lt;
          </button>
          <button className="nav-btn" onClick={next}>
            &gt;
          </button>
        </div>
      </div>
    </section>
  );
}

export default function Paintings() {
  return (
    <div className="paintings">
      <Navbar theme="dark" />

      <Carousel
        title="Explore Our Golden Frame Artworks"
        items={mockData.golden}
        frameClass="golden-frame"
      />
      <Carousel
        title="Explore Our Wooden Frame Artworks"
        items={mockData.wooden}
        frameClass="wooden-frame"
      />
      <Carousel
        title="Explore Our White Frame Artworks"
        items={mockData.white}
        frameClass="white-frame"
      />
    </div>
  );
}
