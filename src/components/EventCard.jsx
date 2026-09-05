import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/EventCard.css";

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const isCompleted = event.status === "completed";

  return (
    <div className="event-card">

      {/* Event Image */}
      <div className="event-image-container">

        <img
          src={event.image}
          alt={event.title}
          className="event-image"
        />

        {/* Status */}
        <span
          className={`event-status ${
            isCompleted ? "completed" : "upcoming"
          }`}
        >
          {isCompleted ? "Completed" : "Upcoming"}
        </span>

      </div>

      {/* Event Content */}
      <div className="event-content">

        <span className="event-category">
          {event.category}
        </span>

        <h2>{event.title}</h2>

        <div className="event-info">
          <p>📅 {event.date}</p>
          <p>⏰ {event.time}</p>
          <p>📍 {event.location}</p>
        </div>

        <button
          className="view-event-btn"
          onClick={() => navigate(`/events/${event._id}`)}
        >
          View Event
        </button>

      </div>

    </div>
  );
};

export default EventCard;