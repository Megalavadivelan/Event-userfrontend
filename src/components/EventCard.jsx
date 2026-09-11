import React from "react";

import { useNavigate } from "react-router-dom";

import "../styles/EventCard.css";

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  // =====================================================
  // STATUS
  // =====================================================

  const eventStatus =
    event.status || "Upcoming";

  const isCompleted =
    eventStatus.toLowerCase() === "completed";

  const isOngoing =
    eventStatus.toLowerCase() === "ongoing";

  // =====================================================
  // VIEW EVENT
  // =====================================================

  const handleViewEvent = () => {
    if (!event._id) {
      console.error(
        "Event ID is missing"
      );

      return;
    }

    navigate(`/events/${event._id}`);
  };

  return (
    <div className="event-card">

      {/* EVENT IMAGE */}

      <div className="event-image-container">

        <img
          src={
            event.image ||
            "https://via.placeholder.com/400x250?text=Event"
          }
          alt={event.name || "Event"}
          className="event-image"
        />

        {/* EVENT STATUS */}

        <span
          className={`event-status ${
            eventStatus
              .toLowerCase()
              .replace(/\s+/g, "-")
          }`}
        >
          {eventStatus}
        </span>

      </div>

      {/* EVENT CONTENT */}

      <div className="event-content">

        {/* ORGANIZER */}

        <span className="event-category">
          Organized by {event.organizer || "Unknown"}
        </span>

        {/* EVENT NAME */}

        <h2>
          {event.name || "Untitled Event"}
        </h2>

        {/* EVENT DESCRIPTION */}

        <p className="event-description">
          {event.description ||
            "No description available."}
        </p>

        {/* EVENT INFO */}

        <div className="event-info">

          <p>
            📅 {event.date || "Date not available"}
          </p>

          <p>
            ⏰ {event.time || "Time not available"}
          </p>

          <p>
            📍 {event.location || "Location not available"}
          </p>

          <p>
            🎟 {event.tickets || 0} Tickets
          </p>

        </div>

        {/* VIEW EVENT */}

        <button
          className="view-event-btn"
          onClick={handleViewEvent}
        >
          View Event
        </button>

      </div>

    </div>
  );
};

export default EventCard;