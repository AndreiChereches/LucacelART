import React, { useEffect, useRef, useState } from "react";
import "./css/ScrollGallery.css";
import Navbar from "../components/Navbar";
import madridSilvaniaSide from "../media/afissilvania.png";
import chicagoSide from "../media/afischicago.png";
import budapestSide from "../media/afisbudapesta.png";
import venetiatSide from "../media/afisvenetia.png";
import palmaSide from "../media/afispalma.png";
import bg from "../media/expobg1.png";

// Expositions (3 total). Replace image paths with your actual assets.
const EXHIBITIONS = [
  {
    id: "madrid",
    title: "Madrid",
    subtitle: "In the Gallery of the Romanian Cultural Institute in Madrid",
    date: "July 6 to August 12, 2022",
    text: `Through the window you can look at the world. From home. Through the window you can look inside the house too. From the world. Flavius ​​Lucăcel's project offers us a window-mirror. But also a painting-window. A dramatic mirror, sad and joyful, of a world that only exists at home. A world that, in fact, no longer exists. Only in the memories of some elderly people forgotten by the world. Not even in "Alunișul Sălajului," so beloved by the painter. Through this window and this sentimental museum you can also look in from the outside, but it seems the artist invites us to look from inside the house as well. To remember the modest but uplifting world of the Romanian people, of the household or ceremonial objects with which the peasant made his way through the world. The painting-window can also be "opaque," a fruit of the famous autonomy of the aesthetic, a space between exterior and interior worlds, between cosmos and microcosm, between light and darkness. Flavius ​​Lucăcel, I believe it holds more of an "elevation" of the window, truly full of memories of a physical past, a salvation, however pathetic, from a world that, as we said, really no longer exists. In reality, not even the small double window, typical of old houses, exists anymore. In reality, neither the traditional old houses nor peasants exist anymore. Perhaps there are peasants who never made it to the city, or city dwellers who never made it to the peasantry. Here and there, you still find old houses with an imaginary display of trunks and pillows... The peasant Flavius ​​Lucacel, finally, like a good householder, takes his fortune, the dowry of the village of yesteryear, out the window for the modern world to see, a world that has lost even the ability to look out the window. That is, to look in the mirror. To remember immortality. And the Eden of Silvania. A paradise that is not only imaginary... And for this initiative—supported by the Sălaj Municipal Council and the Sălaj Culture and Art Center— Flavius ​​Lucacel deserves to be congratulated.
(Daniel Săuca, curator).`,
    bgImage: bg,
    sideImage: madridSilvaniaSide,
  },
  {
    id: "budapest",
    title: "Budapest",
    subtitle: "Romanian Cultural Institute in Budapest ",
    date: "April 3-29, 2025",
    text: "The works exhibited in the ICR Budapest Gallery are under the sign of pixels, that is, of all those small sensibilities that compose the digital image, but in which the energy of the creators and their craft are inscribed. On the one hand, a game of presence and absence is created by impregnating these energies embroidered on the works of the two, and on the other hand, the contemporary and the secular articulate and demonstrate cohabitation. Inevitably, the works place the viewer in a world that sets, and with it, the memory. This is precisely what the two artists propose: to keep these memories alive in the form of a reminder. The visions of the two artists – Flavius ​​​​Lucăcel and J. Otto Szatmari meet in this contemporary time, at the intersection of traditional art and murals, managing to create this exhibition project entitled PIXEL MANUAL.",
    bgImage: bg,
    sideImage: budapestSide,
  },
  {
    id: "venece",
    title: "Venece",
    subtitle:
      "In the Gallery of Romanian Institute of Culture and Humanistic Research in Venice ",
    date: "from 18 to 26 august 2023",
    text: "The homeland of the painter Flavius ​​Lucăcel is Silvania. You can look at it through the windows of the soul. Just as Silvania shows itself, through the window, as the dowry of a married woman. Silvania is also The Untangled Virgin, The Wedding Night, The Mother's Smile or The Grandmother's Flowers. The beauty of life with meaning. The memory of the women who gave voice to the life of the Romanian village. The houses in F. Lucăcel's Silvania are deserted today. The village of his childhood is abandoned. It only lives on in The Memories of Mothers. The painter gathers us in the imaginary Guest House today. Here, the tablecloths, the towels, everything that the women of the village have worked on for lifetimes still live. Silvania is also the beauty of these handmade things, which the artist transfigures into a gentle twilight. From the Village Paths of yesteryear, the light of beauty and kindness comes to us. In the colors kneaded by the hands of mothers, sisters, aunts and grandmothers. Women who have never seen Venice...",
    bgImage: bg,
    sideImage: venetiatSide,
  },
  {
    id: "palma",
    title: "Palma de Malorca",
    subtitle: "exhibition NOSTALGIA Sky light Gallery in Palma de Mallorca ",
    date: "July 17 to 23, 2025",
    text: "The project aimed to promote the visual arts and recover Romanian motifs, materials, and traditions, reinterpreting them in a modern way. It's a return to the roots, traditions, and places cherished in the personal universe of each participating artist.",
    bgImage: bg,
    sideImage: palmaSide,
  },
  {
    id: "chicago",
    title: "Chicago",
    subtitle: "Union League Club of Chicago",
    date: "December 5th, 2025",
    text: "Upcoming...",
    bgImage: bg,
    sideImage: chicagoSide,
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
      <Navbar />
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
              <span>{(prevIndex ?? 0) + 1}</span> /{" "}
              <span>{EXHIBITIONS.length}</span>
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
