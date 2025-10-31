import React from "react";
import "./css/Footer.css";

export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="footer-container">
        <h2 className="footer-title">Send inquiry</h2>

        <form className="footer-form">
          <div className="footer-form-grid">
            {/* Left column: name, email, phone */}
            <div className="footer-left">
              <label htmlFor="name" className="footer-label">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="John Smith"
                className="footer-input"
              />

              <label htmlFor="email" className="footer-label">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="example@email.com"
                className="footer-input"
              />

              <label htmlFor="phone" className="footer-label">
                Phone number
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="1000-000-000"
                className="footer-input"
              />
            </div>

            {/* Right column: message */}
            <div className="footer-right">
              <label htmlFor="message" className="footer-label">
                Message
              </label>
              <textarea
                id="message"
                placeholder="Please share your questions"
                className="footer-textarea"
              ></textarea>
            </div>
          </div>

          <button type="submit" className="footer-button">
            Inquire about availability
          </button>
        </form>

        <div className="footer-info">
          <p>
            © 2025 LucacelART. All rights reserved. Developed by AuroraDigital
          </p>
          <p>alucacel@gmail.com</p>
          <p>+40701200300</p>
        </div>
      </div>
    </footer>
  );
}
