import React from "react";
import { useNavigate } from "react-router-dom";

import "../styles/EventCard.css";

const EventCard = ({ event }) => {

const navigate = useNavigate();

const isCompleted =
event.status === "completed";

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
      alt={event.title || "Event"}
      className="event-image"
    />


    {/* EVENT STATUS */}

    <span
      className={`event-status ${
        isCompleted
          ? "completed"
          : "upcoming"
      }`}
    >

      {isCompleted
        ? "Completed"
        : "Upcoming"}

    </span>

  </div>


  {/* EVENT CONTENT */}

  <div className="event-content">

    {/* CATEGORY */}

    <span className="event-category">

      {event.category || "General"}

    </span>


    {/* TITLE */}

    <h2>

      {event.title || "Untitled Event"}

    </h2>


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
