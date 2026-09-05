import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/EventDetails.css";

const EventDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {

    try {

      const response = await fetch(
        "http://localhost:9000/events/get/${id}"
      );

      const data = await response.json();

      setEvent(data);

    } catch (error) {

      console.error("Error fetching event:", error);

    } finally {

      setLoading(false);

    }
  };

  if (loading) {
    return (
      <div className="details-loading">
        Loading event...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="details-error">
        Event not found.
      </div>
    );
  }

  return (
    <div className="event-details-page">

      <button
        className="back-btn"
        onClick={() => navigate("/events")}
      >
        ← Back to Events
      </button>

      <div className="event-details-card">

        {/* Image */}

        <div className="details-image">

          <img
            src={event.image}
            alt={event.title}
          />

        </div>

        {/* Content */}

        <div className="details-content">

          <span
            className={`details-status ${
              event.status === "completed"
                ? "completed"
                : "upcoming"
            }`}
          >
            {event.status}
          </span>

          <span className="details-category">
            {event.category}
          </span>

          <h1>{event.title}</h1>

          <p className="details-description">
            {event.description}
          </p>

          <div className="details-info">

            <div>
              <strong>📅 Date</strong>
              <span>{event.date}</span>
            </div>

            <div>
              <strong>⏰ Time</strong>
              <span>{event.time}</span>
            </div>

            <div>
              <strong>📍 Location</strong>
              <span>{event.location}</span>
            </div>

            <div>
              <strong>💰 Price</strong>
              <span>
                {event.price
                  ? `₹${event.price}`
                  : "Free"}
              </span>
            </div>

          </div>

          {event.status !== "completed" && (

            <button className="register-btn">
              Register for Event
            </button>

          )}

        </div>

      </div>

    </div>
  );
};

export default EventDetails;