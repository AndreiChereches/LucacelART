import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./css/Navbar.css";

export default function Navbar({ theme = "light" }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // helper to navigate to a pathname + hash, then scroll the element into view
  const goTo = (pathname = "/", hash = "") => {
    setIsOpen(false);

    // If already on the target pathname, just set the hash and scroll
    if (location.pathname === pathname) {
      if (hash) {
        // set hash without reloading and scroll into view
        window.history.replaceState(null, "", `${pathname}#${hash}`);
        requestAnimationFrame(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      } else {
        // navigate to pathname (might be same) and scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    // navigate to the pathname first, then set the hash and scroll after navigation
    navigate(pathname, { replace: false });

    // wait a frame to allow the route to render, then set hash and scroll
    setTimeout(() => {
      if (hash) {
        window.history.replaceState(null, "", `${pathname}#${hash}`);
        requestAnimationFrame(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 50);
  };

  return (
    <nav className={`navbar ${theme}`}>
      {/* Burger button */}
      <div
        className={`burger ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Links */}
      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <a onClick={() => goTo("/", "about")} role="button" tabIndex={0}>
          about my art
        </a>

        <a onClick={() => goTo("/paintings", "")} role="button" tabIndex={0}>
          paintings
        </a>

        {/* Expositions: explicitly go to /scrollgallery (no hash) */}
        <a onClick={() => goTo("/scrollgallery", "")} role="button" tabIndex={0}>
          expositions
        </a>
        {
          /**
           
        <a onClick={() => goTo("/paintings", "activity")} role="button" tabIndex={0}>
          my activity
        </a>
           */
        }

        {/* lucacel: should go to landing page section #lucacel */}
        <a onClick={() => goTo("/", "lucacel")} role="button" tabIndex={0}>
          lucacel
        </a>

        <a onClick={() => goTo("/", "contact")} role="button" tabIndex={0}>
          contact
        </a>
      </div>
    </nav>
  );
}
