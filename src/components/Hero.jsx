import React from "react";
import "../styles/Hero.css"
import hero from "../assets/hero.jpg";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Discover. Connect. Celebrate.</h1>

        <p>
          Discover amazing events, register easily, and create
          unforgettable experiences all in one place.
        </p>

        <div className="hero-buttons">
          <button className="explore-btn" onClick={() =>
              navigate("/explore") }>Explore Events</button>
        </div>
      </div>

      <div className="hero-image">
        <img src={hero} alt="Event Management" />
      </div>
    </section>
  );
}

export default Hero;