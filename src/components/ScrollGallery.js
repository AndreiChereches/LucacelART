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
  const DEBOUNCE_MS = 800; // Increased debounce time for trackpads

  // ref for the scrollable textbox so we can detect wheel origin
  const textBoxRef = useRef(null);
  // ref for the stage element
  const stageRef = useRef(null);

  // Touch handling for mobile
  const touchStartY = useRef(null);
  const touchStartTime = useRef(null);
  const touchStartTarget = useRef(null);

  // Wheel delta accumulation for trackpads
  const wheelDeltaAccumulator = useRef(0);
  const isProcessingWheel = useRef(false);
  const wheelTimeoutId = useRef(null);

  // Use refs to track current state values to avoid stale closures
  const indexRef = useRef(index);
  const animatingRef = useRef(animating);

  // Keep refs in sync with state
  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    animatingRef.current = animating;
  }, [animating]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    // Check if target is inside textbox
    const isInsideTextbox = (target) => {
      if (!target) return false;
      const textbox = textBoxRef.current;
      if (!textbox) return false;
      return textbox.contains(target);
    };

    // Function to update the index
    const updateIndex = (dir) => {
      const now = Date.now();

      // Prevent processing if already animating or within debounce period
      if (
        animatingRef.current ||
        isProcessingWheel.current ||
        now - lastWheel.current < DEBOUNCE_MS
      ) {
        return;
      }

      // Set processing flag immediately to prevent multiple calls
      isProcessingWheel.current = true;
      lastWheel.current = now;

      setIndex((currentIndex) => {
        const next = Math.min(
          EXHIBITIONS.length - 1,
          Math.max(0, currentIndex + dir)
        );
        if (next !== currentIndex) {
          setAnimating(true);
          setPrevIndex(currentIndex);

          // Reset processing flag after animation completes
          setTimeout(() => {
            setAnimating(false);
            isProcessingWheel.current = false;
            wheelDeltaAccumulator.current = 0;
            if (wheelTimeoutId.current) {
              clearTimeout(wheelTimeoutId.current);
              wheelTimeoutId.current = null;
            }
          }, FADE_MS);

          return next;
        } else {
          // Reset processing flag immediately if no change
          isProcessingWheel.current = false;
          wheelDeltaAccumulator.current = 0;
          if (wheelTimeoutId.current) {
            clearTimeout(wheelTimeoutId.current);
            wheelTimeoutId.current = null;
          }
        }
        return currentIndex;
      });
    };

    const onWheel = (e) => {
      // If the wheel event happened inside any element with class "sg-textbox",
      // let the browser handle it so the textbox can scroll normally.
      if (isInsideTextbox(e.target)) {
        return; // allow native scrolling inside text boxes
      }

      // Prevent default to stop browser scrolling
      e.preventDefault();

      // If we're animating or processing, ignore all wheel events
      if (animatingRef.current || isProcessingWheel.current) {
        return;
      }

      // Accumulate wheel delta
      wheelDeltaAccumulator.current += e.deltaY;

      // Threshold for triggering scroll (100px accumulated)
      const SCROLL_THRESHOLD = 100;

      // Check if we've accumulated enough delta to trigger a scroll
      if (Math.abs(wheelDeltaAccumulator.current) >= SCROLL_THRESHOLD) {
        // Clear any pending timeout
        if (wheelTimeoutId.current) {
          clearTimeout(wheelTimeoutId.current);
          wheelTimeoutId.current = null;
        }
        const dir = wheelDeltaAccumulator.current > 0 ? 1 : -1;
        wheelDeltaAccumulator.current = 0; // Reset accumulator
        updateIndex(dir);
      } else {
        // Reset accumulator after a timeout if no more events (prevents slow scrolls from accumulating)
        if (wheelTimeoutId.current) {
          clearTimeout(wheelTimeoutId.current);
        }
        wheelTimeoutId.current = setTimeout(() => {
          wheelDeltaAccumulator.current = 0;
          wheelTimeoutId.current = null;
        }, 150);
      }
    };

    // Touch event handlers for mobile
    const onTouchStart = (e) => {
      const target = e.target;

      // Always record the target
      touchStartTarget.current = target;

      // If touch started inside textbox, allow native scrolling by not tracking
      if (isInsideTextbox(target)) {
        touchStartY.current = null;
        touchStartTime.current = null;
        return;
      }

      // Record touch start position for swipe detection (only if outside textbox)
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        touchStartY.current = touch.clientY;
        touchStartTime.current = Date.now();
      }
    };

    const onTouchMove = (e) => {
      // Always allow textbox to scroll if touch started or is currently in textbox
      const startedInTextbox =
        touchStartTarget.current && isInsideTextbox(touchStartTarget.current);
      const currentlyInTextbox = isInsideTextbox(e.target);

      if (startedInTextbox || currentlyInTextbox) {
        // Don't prevent default - allow native scrolling
        return;
      }

      // Only prevent default if we're tracking a swipe gesture outside textbox
      if (touchStartY.current !== null) {
        e.preventDefault();
      }
    };

    const onTouchEnd = (e) => {
      // If touch started in textbox, always ignore (allow native scroll)
      const startedInTextbox =
        touchStartTarget.current && isInsideTextbox(touchStartTarget.current);

      if (startedInTextbox || touchStartY.current === null) {
        touchStartY.current = null;
        touchStartTime.current = null;
        touchStartTarget.current = null;
        return;
      }

      // Calculate swipe direction and distance (only if touch was outside textbox)
      if (
        e.changedTouches.length > 0 &&
        touchStartY.current !== null &&
        touchStartTime.current !== null
      ) {
        const touch = e.changedTouches[0];
        const touchEndY = touch.clientY;
        const touchEndTime = Date.now();

        const deltaY = touchStartY.current - touchEndY; // Positive = swipe up (next), Negative = swipe down (prev)
        const deltaTime = touchEndTime - touchStartTime.current;

        // Minimum swipe distance (50px) and maximum time (500ms) to register as a swipe
        const minSwipeDistance = 50;
        const maxSwipeTime = 500;

        if (Math.abs(deltaY) > minSwipeDistance && deltaTime < maxSwipeTime) {
          const dir = deltaY > 0 ? 1 : -1; // Swipe up = next (1), Swipe down = previous (-1)
          updateIndex(dir);
        }
      }

      touchStartY.current = null;
      touchStartTime.current = null;
      touchStartTarget.current = null;
    };

    // Helper to check if target is within stage
    const isWithinStage = (target) => {
      const stage = stageRef.current;
      if (!stage || !target) return false;
      return stage.contains(target);
    };

    // Wrapped touch handlers that check if touch is within stage
    const onTouchStartWrapped = (e) => {
      if (isWithinStage(e.target)) {
        onTouchStart(e);
      }
    };

    const onTouchMoveWrapped = (e) => {
      if (touchStartTarget.current && isWithinStage(touchStartTarget.current)) {
        onTouchMove(e);
      }
    };

    const onTouchEndWrapped = (e) => {
      if (touchStartTarget.current && isWithinStage(touchStartTarget.current)) {
        onTouchEnd(e);
      } else {
        // Reset if touch ended outside stage
        touchStartY.current = null;
        touchStartTime.current = null;
        touchStartTarget.current = null;
      }
    };

    // Add wheel event listener for desktop
    window.addEventListener("wheel", onWheel, { passive: false });

    // Add touch event listeners for mobile on window (but only process if within stage)
    window.addEventListener("touchstart", onTouchStartWrapped, {
      passive: false,
    });
    window.addEventListener("touchmove", onTouchMoveWrapped, {
      passive: false,
    });
    window.addEventListener("touchend", onTouchEndWrapped, { passive: false });
    window.addEventListener("touchcancel", onTouchEndWrapped, {
      passive: false,
    });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStartWrapped);
      window.removeEventListener("touchmove", onTouchMoveWrapped);
      window.removeEventListener("touchend", onTouchEndWrapped);
      window.removeEventListener("touchcancel", onTouchEndWrapped);
      // Clean up any pending timeout
      if (wheelTimeoutId.current) {
        clearTimeout(wheelTimeoutId.current);
        wheelTimeoutId.current = null;
      }
    };
  }, []); // Empty dependency array - we use refs to access current values

  const current = EXHIBITIONS[index];
  const previous = prevIndex != null ? EXHIBITIONS[prevIndex] : null;

  return (
    <>
      <Navbar />
      <section className="sg-stage" id="expositions" ref={stageRef}>
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
