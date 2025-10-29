import React, { useState } from "react";
import "./css/Navbar.css";

export default function Navbar({ theme = "light" }) {
  const [isOpen, setIsOpen] = useState(false);

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
        <a href="#about" onClick={() => setIsOpen(false)}>
          about my art
        </a>
        <a href="#paintings" onClick={() => setIsOpen(false)}>
          paintings
        </a>
        <a href="#expositions" onClick={() => setIsOpen(false)}>
          expositions
        </a>
        <a href="#activity" onClick={() => setIsOpen(false)}>
          my activity
        </a>
        <a href="#lucacel" onClick={() => setIsOpen(false)}>
          lucacel
        </a>
        <a href="#contact" onClick={() => setIsOpen(false)}>
          contact
        </a>
      </div>
    </nav>
  );
}
