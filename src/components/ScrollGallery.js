import React, { useEffect, useRef, useState } from "react";
import "./css/ScrollGallery.css";
import Navbar from "../components/Navbar";
import madridBg from "../media/madridmock.png";
import madridSide from "../media/madridside.png";

// Expositions (3 total). Replace image paths with your actual assets.
const EXHIBITIONS = [
  {
    id: "madrid",
    title: "Madrid",
    subtitle: "In the Gallery of the Romanian Cultural Institute in Madrid",
    date: "on Wednesday July 6 to 12 August, 2022",
    text: `Through the window you can look at the world. From home. Through the window you can look inside the house too. From the world. Flavius ​​Lucăcel's project offers us a window-mirror. But also a painting-window. A dramatic mirror, sad and joyful, of a world that only exists at home. A world that, in fact, no longer exists. Only in the memories of some elderly people forgotten by the world. Not even in "Alunișul Sălajului," so beloved by the painter. Through this window and this sentimental museum you can also look in from the outside, but it seems the artist invites us to look from inside the house as well. To remember the modest but uplifting world of the Romanian people, of the household or ceremonial objects with which the peasant made his way through the world. The painting-window can also be "opaque," a fruit of the famous autonomy of the aesthetic, a space between exterior and interior worlds, between cosmos and microcosm, between light and darkness. Flavius ​​Lucăcel, I believe it holds more of an "elevation" of the window, truly full of memories of a physical past, a salvation, however pathetic, from a world that, as we said, really no longer exists. In reality, not even the small double window, typical of old houses, exists anymore. In reality, neither the traditional old houses nor peasants exist anymore. Perhaps there are peasants who never made it to the city, or city dwellers who never made it to the peasantry. Here and there, you still find old houses with an imaginary display of trunks and pillows... The peasant Flavius ​​Lucacel, finally, like a good householder, takes his fortune, the dowry of the village of yesteryear, out the window for the modern world to see, a world that has lost even the ability to look out the window. That is, to look in the mirror. To remember immortality. And the Eden of Silvania. A paradise that is not only imaginary... And for this initiative—supported by the Sălaj Municipal Council and the Sălaj Culture and Art Center— Flavius ​​Lucacel deserves to be congratulated.
(Daniel Săuca, curator).`,
    bgImage: madridBg,
    sideImage: madridSide,
  },
  {
    id: "cluj",
    title: "Cluj",
    subtitle: "University Art Gallery, Cluj-Napoca",
    date: "April 12 to May 20, 2026",
    text: "Upcoming",
    bgImage: madridBg,
    sideImage: madridSide,
  },
  {
    id: "bucharest",
    title: "Bucharest",
    subtitle: "National Museum of Contemporary Art",
    date: "September 1 to October 10, 2027",
    text: "Upcoming",
    bgImage: madridBg,
    sideImage: madridSide,
  },
];


export default function ScrollGallery() {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [animating, setAnimating] = useState(false);
  const lastWheel = useRef(0);
  const FADE_MS = 600;

  // ref for the scrollable textbox so we can detect wheel origin
  const textBoxRef = useRef(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onWheel = (e) => {
      // If the wheel event happened inside any element with class "sg-textbox",
      // let the browser handle it so the textbox can scroll normally.
      const target = e.target;
      if (target && target.closest && target.closest(".sg-textbox")) {
        return; // allow native scrolling inside text boxes
      }

      const now = Date.now();
      if (animating || now - lastWheel.current < FADE_MS + 100) return;

      const dir = e.deltaY > 0 ? 1 : -1;
      const next = Math.min(EXHIBITIONS.length - 1, Math.max(0, index + dir));
      if (next !== index) {
        setAnimating(true);
        setPrevIndex(index);
        setIndex(next);
        lastWheel.current = now;
        setTimeout(() => setAnimating(false), FADE_MS);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [index, animating]);

  const current = EXHIBITIONS[index];
  const previous = prevIndex != null ? EXHIBITIONS[prevIndex] : null;

  return (
    <>
    <Navbar/>
    <section className="sg-stage" id="expositions">
      {/* Background layer(s) */}
      {previous && (
        <div
          className="sg-bg sg-bg-prev fade-out"
          style={{ backgroundImage: `url(${previous.bgImage})` }}
          aria-hidden="true"
        />
      )}
      <div
        className={`sg-bg sg-bg-current ${animating ? "fade-in" : "visible"}`}
        style={{ backgroundImage: `url(${current.bgImage})` }}
        aria-hidden="true"
      />

      {/* Previous content layer (for fading out) */}
      {previous && (
        <div className="sg-content fade-out" aria-hidden="true">
          <header className="sg-header">
            <h1 className="sg-title">{previous.title}</h1>
            <h3 className="sg-subtitle">{previous.subtitle}</h3>
            <p className="sg-date">{previous.date}</p>
          </header>

          <div className="sg-main">
            <div className="sg-textbox">
              <p>{previous.text}</p>
            </div>
            <div className="sg-side-content">
              <img src={previous.sideImage} alt={`${previous.title} side`} />
            </div>
          </div>

          <div className="sg-indicator">
            <span>{(prevIndex ?? 0) + 1}</span> / <span>{EXHIBITIONS.length}</span>
          </div>
        </div>
      )}

      {/* Current content layer (fading in or visible) */}
      <div className={`sg-content ${animating ? "fade-in" : "visible"}`}>
        <header className="sg-header">
          <h1 className="sg-title">{current.title}</h1>
          <h3 className="sg-subtitle">{current.subtitle}</h3>
          <p className="sg-date">{current.date}</p>
        </header>

        <div className="sg-main">
          <div
            className="sg-textbox"
            role="region"
            aria-label="Exposition text"
            ref={textBoxRef}
          >
            <p>{current.text}</p>
          </div>
          <div className="sg-side-content">
            <img src={current.sideImage} alt={`${current.title} side`} />
          </div>
        </div>

        <div className="sg-indicator">
          <span>{index + 1}</span> / <span>{EXHIBITIONS.length}</span>
        </div>
      </div>
    </section>
    </>
  );
}
