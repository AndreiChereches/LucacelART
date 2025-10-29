import React, { useState } from "react";
import "./css/ScrollGallery.css";
import Navbar from "./Navbar";

const sections = [
  {
    title: "Madrid Exhibition",
    description: `
"Through the window you can look at the world. From home. Through the window you can look inside the house too. From the world. Flavius ​​Lucăcel's project offers us a window-mirror. But also a painting-window. A dramatic mirror, sad and joyful, of a world that only exists at home. A world that, in fact, no longer exists. Only in the memories of some elderly people forgotten by the world. Not even in "Alunișul Sălajului," so beloved by the painter. Through this window and this sentimental museum you can also look in from the outside, but it seems the artist invites us to look from inside the house as well. To remember the modest but uplifting world of the Romanian people, of the household or ceremonial objects with which the peasant made his way through the world. The painting-window can also be "opaque," a fruit of the famous autonomy of the aesthetic, a space between exterior and interior worlds, between cosmos and microcosm, between light and darkness. Flavius ​​Lucăcel, I believe it holds more of an "elevation" of the window, truly full of memories of a physical past, a salvation, however pathetic, from a world that, as we said, really no longer exists. In reality, not even the small double window, typical of old houses, exists anymore. In reality, neither the traditional old houses nor peasants exist anymore. Perhaps there are peasants who never made it to the city, or city dwellers who never made it to the peasantry. Here and there, you still find old houses with an imaginary display of trunks and pillows... The peasant Flavius ​​Lucacel, finally, like a good householder, takes his fortune, the dowry of the village of yesteryear, out the window for the modern world to see, a world that has lost even the ability to look out the window. That is, to look in the mirror. To remember immortality. And the Eden of Silvania. A paradise that is not only imaginary... And for this initiative—supported by the Sălaj Municipal Council and the Sălaj Culture and Art Center— Flavius ​​Lucăcel deserves to be congratulated." 
(Daniel Săuca, curator)    `,
    image: "/images/madrid1.jpg",
    background: "/images/bg1.jpg",
  },
  {
    title: "Through the Window",
    description: `
      Another section of the narrative text goes here. You can split the
      exhibition essay into multiple thematic parts if you want each scroll
      step to reveal a different portion.
    `,
    image: "/images/madrid2.jpg",
    background: "/images/bg2.jpg",
  },
  {
    title: "House of Memory",
    description: `
      Continue with the rest of the provided text. The scrollbox ensures
      readability while preserving the immersive fullscreen design.
    `,
    image: "/images/madrid3.jpg",
    background: "/images/bg3.jpg",
  },
];

export default function ScrollGallery() {
  const [index, setIndex] = useState(0);

  const handleScroll = (e) => {
    e.preventDefault();
    if (e.deltaY > 0) {
      setIndex((prev) => Math.min(prev + 1, sections.length - 1));
    } else {
      setIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const current = sections[index];

  return (
    <>
      <Navbar theme="light" />
      <div
        className="scroll-gallery"
        style={{ backgroundImage: `url(${current.background})` }}
        onWheel={handleScroll} // attach here instead of window
      >
        <div className="overlay" />
        <div className="content">
          <h1 className="gallery-title">{current.title}</h1>

          {/* scrollbox with stopPropagation */}
          <div
            className="scrollbox"
            onWheel={(e) => {
              e.stopPropagation(); // prevent gallery from seeing scrolls inside
            }}
          >
            <p>{current.description}</p>
          </div>

          <img src={current.image} alt={current.title} className="image" />
        </div>

        <div className="progress">
          {sections.map((_, i) => (
            <span key={i} className={i === index ? "dot active" : "dot"} />
          ))}
        </div>
      </div>
    </>
  );
}
