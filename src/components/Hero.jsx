import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Hero.css";
import hero from "../assets/hero.jpg";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">

      {/* Background Sparkles */}
      <div className="hero-sparkle hero-sparkle-1"></div>
      <div className="hero-sparkle hero-sparkle-2"></div>
      <div className="hero-sparkle hero-sparkle-3"></div>
      <div className="hero-sparkle hero-sparkle-4"></div>
      <div className="hero-sparkle hero-sparkle-5"></div>

      {/* Left Content */}
      <div className="hero-content">

        <div className="hero-small-title">
          ✦ EVENTORA
        </div>

        <h1>
          Discover.
          <br />
          <span>Connect.</span>
          <br />
          Celebrate.
        </h1>

        <p>
          Discover amazing events, register easily, and create
          unforgettable experiences — all in one place.
        </p>

        {/* Buttons */}
        <div className="hero-buttons">

          <button
            className="explore-btn"
            onClick={() => navigate("/events")}
          >
            <span>Explore Events</span>
            <span className="button-arrow">→</span>
          </button>

          <button
            className="organize-btn"
            onClick={() => navigate("/organizereq")}
          >
            <span>Organize Events</span>
            <span className="button-arrow">+</span>
          </button>

        </div>

        {/* Small Stats */}
        

      </div>

      {/* Right Image */}
      <div className="hero-image-wrapper">

        <div className="hero-image-glow"></div>

        <div className="hero-image-card">

          <img
            src={hero}
            alt="Event Management"
            className="hero-image"
          />

          <div className="hero-image-overlay"></div>

          {/* Floating Badge */}
          <div className="hero-floating-card">
            <div className="floating-icon">
              ✨
            </div>

            <div>
              <span>Discover</span>
              <strong>Something Amazing</strong>
            </div>
          </div>

        </div>

        {/* Decorative Circle */}
        <div className="hero-circle"></div>

      </div>

    </section>
  );
}

export default Hero;