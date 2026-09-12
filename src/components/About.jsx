import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/About.css";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="about-page">

      {/* Background Glow */}
      <div className="about-glow about-glow-one"></div>
      <div className="about-glow about-glow-two"></div>

      {/* Sparkles */}
      <div className="about-sparkle sparkle-a"></div>
      <div className="about-sparkle sparkle-b"></div>
      <div className="about-sparkle sparkle-c"></div>
      <div className="about-sparkle sparkle-d"></div>

      <div className="about-container">

        {/* HERO */}
        <section className="about-hero">

          <div className="about-badge">
            ✦ ABOUT EVENTORA
          </div>

          <h1>
            Discover Events.
            <br />
            <span>Make Memories.</span>
          </h1>

          <p>
            Eventora is a modern event management platform designed to
            make discovering, exploring and participating in events
            simple, exciting and effortless.
          </p>

          <div className="about-buttons">

            <button
              className="about-primary-btn"
              onClick={() => navigate("/events")}
            >
              Explore Events
              <span>→</span>
            </button>

            <button
              className="about-secondary-btn"
              onClick={() => navigate("/organizereq")}
            >
              Organize an Event
            </button>

          </div>

        </section>

        {/* WHY EVENTORA */}
        <section className="why-eventora">

          <div className="section-heading">
            <span>WHY EVENTORA</span>

            <h2>
              Everything you need
              <br />
              <strong>for amazing events.</strong>
            </h2>

            <p>
              From discovering exciting events to creating unforgettable
              experiences, Eventora brings everything together in one place.
            </p>
          </div>

          <div className="about-cards">

            <div className="about-card">
              <div className="about-card-icon">
                🔎
              </div>

              <h3>Discover Events</h3>

              <p>
                Explore a wide variety of events based on your interests,
                location and preferences.
              </p>

              <span className="card-number">01</span>
            </div>

            <div className="about-card">
              <div className="about-card-icon">
                🎟️
              </div>

              <h3>Easy Registration</h3>

              <p>
                Find your favourite events and register with a simple
                and convenient experience.
              </p>

              <span className="card-number">02</span>
            </div>

            <div className="about-card">
              <div className="about-card-icon">
                🎉
              </div>

              <h3>Enjoy Experiences</h3>

              <p>
                Connect with people, attend exciting events and create
                memories that last forever.
              </p>

              <span className="card-number">03</span>
            </div>

          </div>

        </section>

        {/* EVENT CATEGORIES */}
        <section className="event-categories">

          <div className="section-heading center-heading">

            <span>EXPLORE MORE</span>

            <h2>
              Events for <strong>every interest.</strong>
            </h2>

            <p>
              Whether you love technology, music, sports or learning,
              there is always something happening on Eventora.
            </p>

          </div>

          <div className="category-list">

            <div className="category-item">
              <span>🎵</span>
              <h3>Music</h3>
            </div>

            <div className="category-item">
              <span>💻</span>
              <h3>Technology</h3>
            </div>

            <div className="category-item">
              <span>⚽</span>
              <h3>Sports</h3>
            </div>

            <div className="category-item">
              <span>🎓</span>
              <h3>Workshop</h3>
            </div>

            <div className="category-item">
              <span>🌎</span>
              <h3>Conference</h3>
            </div>

            <div className="category-item">
              <span>🎭</span>
              <h3>Cultural</h3>
            </div>

          </div>

        </section>

        {/* CTA */}
        <section className="about-cta">

          <div className="cta-content">

            <span>READY TO EXPLORE?</span>

            <h2>
              Your next great
              <br />
              <strong>experience awaits.</strong>
            </h2>

            <p>
              Discover exciting events and be part of something memorable.
            </p>

            <button
              className="cta-button"
              onClick={() => navigate("/events")}
            >
              Explore Events
              <span>→</span>
            </button>

          </div>

          <div className="cta-orb orb-one"></div>
          <div className="cta-orb orb-two"></div>

        </section>

      </div>

    </div>
  );
};

export default About;