import React from "react";
import "./Navbar.css";

export default function Navbar({ theme = "light" }) {
  return (
    <nav className={`navbar ${theme}`}>
      <a href="#about">about my art</a>
      <a href="#paintings">paintings</a>
      <a href="#expositions">expositions</a>
      <a href="#activity">my activity</a>
      <a href="#contact">contact</a>
    </nav>
  );
}
