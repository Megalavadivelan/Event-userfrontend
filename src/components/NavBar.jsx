import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/NavBar.css";

const Navbar = () => {
  const [eventOpen, setEventOpen] = useState(false);

  const navigate = useNavigate();

  const handleSignOut = () => {
    // If you are storing login information
    localStorage.removeItem("user");

    navigate("/signout");
  };

  return (
    <nav className="navbar">

      {/* =================================
          BACKGROUND SPARKLES
      ================================= */}

      <div className="navbar-background">

        <span className="nav-star star-1">✦</span>
        <span className="nav-star star-2">✦</span>
        <span className="nav-star star-3">✦</span>
        <span className="nav-star star-4">✦</span>
        <span className="nav-star star-5">✦</span>

        <span className="nav-glow glow-left"></span>
        <span className="nav-glow glow-right"></span>

      </div>


      {/* =================================
          LOGO
      ================================= */}

      <div
        className="navbar-logo"
        onClick={() => navigate("/user-dashboard")}
      >
        <span className="logo-star">✦</span>
        <span className="logo-text">Eventora</span>
      </div>


      {/* =================================
          NAVIGATION LINKS
      ================================= */}

      <div className="navbar-links">

        {/* HOME */}

        <Link
          to="/home"
          className="nav-link"
        >
          Home
        </Link>


        {/* =================================
            EVENTS DROPDOWN
        ================================= */}

        

        {/* ABOUT */}

        <Link
          to="/events"
          className="nav-link"
        >
          Events
        </Link>


        {/* CONTACT */}

        <Link
          to="/gallery"
          className="nav-link"
        >
          Gallery
        </Link>


        {/* PROFILE */}

        <Link
          to="/profile"
          className="nav-link"
        >
          Profile
        </Link>
        <div
          className="events-dropdown"
          onMouseEnter={() => setEventOpen(true)}
          onMouseLeave={() => setEventOpen(false)}
        >

          <button
            className="events-button"
            onClick={() => setEventOpen(!eventOpen)}
          >
            More

            <span
              className={`dropdown-arrow ${
                eventOpen ? "arrow-up" : ""
              }`}
            >
              ▾
            </span>
          </button>


          {/* DROPDOWN MENU */}

          {eventOpen && (
            <div className="events-menu">

              <Link
                to="/about"
                className="dropdown-item"
              >
                About
              </Link>

              <Link
                to="/contact"
                className="dropdown-item"
              >
                Contacts
              </Link>

              <Link
                to="/mybookings"
                className="dropdown-item"
              >
                My Bookings
              </Link>

              

            </div>
          )}

        </div>


        {/* SIGN OUT */}

        <button
          className="signout-button"
          onClick={handleSignOut}
        >
          Sign Out
        </button>

      </div>

    </nav>
  );
};

export default Navbar;