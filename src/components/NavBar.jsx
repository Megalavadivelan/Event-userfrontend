import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/NavBar.css";

const API_URL = "https://user-api-iota-six.vercel.app";

const Navbar = () => {
  const [eventOpen, setEventOpen] = useState(false);
  const navigate = useNavigate();

  // =====================================================
  // SIGN OUT
  // =====================================================

  const handleSignOut = async () => {
    try {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        const userData = JSON.parse(storedUser);

        if (userData?.id) {
          try {
            await axios.post(`${API_URL}/loginhistory/logout`, {
              userId: userData.id,
            });
          } catch (logoutApiError) {
            console.error(
              "Logout history API Error:",
              logoutApiError.response?.data || logoutApiError.message
            );
          }
        }
      }
    } catch (error) {
      console.error("Logout Error:", error);
    } finally {
      // Always clear frontend login data
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      // Redirect to the actual login route
      navigate("/login", { replace: true });
    }
  };

  return (
    <nav className="navbar">
      {/* BACKGROUND SPARKLES */}
      <div className="navbar-background">
        <span className="nav-star star-1">✦</span>
        <span className="nav-star star-2">✦</span>
        <span className="nav-star star-3">✦</span>
        <span className="nav-star star-4">✦</span>
        <span className="nav-star star-5">✦</span>
        <span className="nav-glow glow-left"></span>
        <span className="nav-glow glow-right"></span>
      </div>

      {/* LOGO */}
      <div
        className="navbar-logo"
        onClick={() => navigate("/user-dashboard")}
      >
        <span className="logo-star">✦</span>
        <span className="logo-text">Eventora</span>
      </div>

      {/* NAVIGATION LINKS */}
      <div className="navbar-links">
        {/* HOME */}
        <Link to="/home" className="nav-link">
          Home
        </Link>

        {/* EVENTS */}
        <Link to="/events" className="nav-link">
          Events
        </Link>

        {/* ORGANIZE EVENTS */}
        <Link to="/organizereq" className="nav-link">
          Organize Events
        </Link>

        {/* PROFILE */}
        <Link to="/profile" className="nav-link">
          Profile
        </Link>

        {/* MORE DROPDOWN */}
        <div
          className="events-dropdown"
          onMouseEnter={() => setEventOpen(true)}
          onMouseLeave={() => setEventOpen(false)}
        >
          <button
            type="button"
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

          {eventOpen && (
            <div className="events-menu">
              <Link to="/about" className="dropdown-item">
                About
              </Link>

              <Link to="/contact" className="dropdown-item">
                Contacts
              </Link>

              <Link to="/gallery" className="dropdown-item">
                Gallery
              </Link>

              <Link to="/mybookings" className="dropdown-item">
                My Bookings
              </Link>
            </div>
          )}
        </div>

        {/* SIGN OUT */}
        <button
          type="button"
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