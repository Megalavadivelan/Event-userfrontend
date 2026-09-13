import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/EventDetails.css";

const EVENTS_API =
  "https://api-admin-rouge.vercel.app/events/getevents";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ===================================================
  // FETCH SINGLE EVENT
  // ===================================================

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(EVENTS_API);

        console.log(
          "EVENT DETAILS API RESPONSE:",
          response.data
        );

        let eventData = [];

        // API returns array
        if (Array.isArray(response.data)) {
          eventData = response.data;
        }

        // API returns { data: [] }
        else if (Array.isArray(response.data?.data)) {
          eventData = response.data.data;
        }

        // API returns { events: [] }
        else if (Array.isArray(response.data?.events)) {
          eventData = response.data.events;
        }

        console.log("ALL EVENTS:", eventData);

        // Find selected event using URL ID
        const selectedEvent = eventData.find(
          (item) =>
            String(item._id || item.id) === String(id)
        );

        console.log(
          "SELECTED EVENT:",
          selectedEvent
        );

        if (!selectedEvent) {
          setEvent(null);
          setError("Event not found.");
          return;
        }

        setEvent(selectedEvent);
      } catch (err) {
        console.error(
          "Failed to fetch event:",
          err
        );

        setError(
          "Unable to load event details. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  // ===================================================
  // FORMAT DATE
  // ===================================================

  const formatDate = (date) => {
    if (!date) {
      return "Date not available";
    }

    try {
      return new Date(date).toLocaleDateString(
        "en-IN",
        {
          weekday: "long",
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      );
    } catch {
      return date;
    }
  };

  // ===================================================
  // IMAGE URL
  // ===================================================

  const getImageUrl = () => {
    if (!event) return null;

    const image =
      event.image ||
      event.poster ||
      event.imageUrl ||
      event.eventImage;

    if (!image) {
      return null;
    }

    // Base64 image
    if (image.startsWith("data:image")) {
      return image;
    }

    // Complete URL
    if (
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {
      return image;
    }

    // Relative image path
    return `https://api-admin-rouge.vercel.app/${image.replace(
      /^\/+/,
      ""
    )}`;
  };

  // ===================================================
  // LOADING
  // ===================================================

  if (loading) {
    return (
      <div className="event-details-page">

        <div className="details-sparkle sparkle-one"></div>
        <div className="details-sparkle sparkle-two"></div>
        <div className="details-sparkle sparkle-three"></div>

        <div className="details-loading">

          <div className="details-spinner"></div>

          <p>
            Loading event details...
          </p>

        </div>
      </div>
    );
  }

  // ===================================================
  // ERROR
  // ===================================================

  if (error || !event) {
    return (
      <div className="event-details-page">

        <div className="details-sparkle sparkle-one"></div>
        <div className="details-sparkle sparkle-two"></div>

        <div className="details-error">

          <div className="error-icon">
            ✨
          </div>

          <h2>
            Event Not Found
          </h2>

          <p>
            {error ||
              "The event you are looking for does not exist."}
          </p>

          <button
            className="back-events-btn"
            onClick={() =>
              navigate("/events")
            }
          >
            ← Back to Events
          </button>

        </div>
      </div>
    );
  }

  // ===================================================
  // EVENT DATA
  // ===================================================

  const imageUrl = getImageUrl();

  const eventName =
    event.name ||
    event.eventName ||
    event.title ||
    "Untitled Event";

  const category =
    event.category ||
    event.eventCategory ||
    "Event";

  const organizer =
    event.organizer ||
    "Organizer not available";

  const location =
    event.location ||
    event.venue ||
    "Location not available";

  const description =
    event.description ||
    event.details ||
    "No description available.";

  const ticketPrice =
    event.ticketPrice ??
    event.price ??
    event.amount;

  const tickets =
    event.tickets;

  const status =
    event.status ||
    "Upcoming";

  // ===================================================
  // PAGE
  // ===================================================

  return (
    <div className="event-details-page">

      {/* =========================================
          BACKGROUND SPARKLES
      ========================================= */}

      <div className="details-sparkle sparkle-one"></div>
      <div className="details-sparkle sparkle-two"></div>
      <div className="details-sparkle sparkle-three"></div>
      <div className="details-sparkle sparkle-four"></div>

      {/* =========================================
          MAIN CONTAINER
      ========================================= */}

      <div className="details-container">

        {/* BACK BUTTON */}

        <button
          className="back-button"
          onClick={() =>
            navigate("/events")
          }
        >
          ← Back to Events
        </button>

        {/* =========================================
            EVENT CARD
        ========================================= */}

        <div className="event-details-card">

          {/* =======================================
              IMAGE
          ======================================= */}

          <div className="event-details-image-section">

            {imageUrl ? (
              <img
                src={imageUrl}
                alt={eventName}
                className="event-details-image"
              />
            ) : (
              <div className="event-details-image-placeholder">

                <span>
                  ✨
                </span>

                <p>
                  No Image Available
                </p>

              </div>
            )}

            {/* CATEGORY */}

            <div className="details-category">
              {category}
            </div>

            {/* STATUS */}

            <div
              className={`details-status ${status
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
            >
              {status}
            </div>

          </div>

          {/* =======================================
              CONTENT
          ======================================= */}

          <div className="event-details-content">

            {/* EVENT TITLE */}

            <h1>
              {eventName}
            </h1>

            {/* ORGANIZER */}

            <div className="organizer-section">

              <div className="organizer-icon">
                👤
              </div>

              <div>

                <span>
                  Organized by
                </span>

                <strong>
                  {organizer}
                </strong>

              </div>

            </div>

            {/* DESCRIPTION */}

            <div className="description-section">

              <h2>
                About this event
              </h2>

              <p>
                {description}
              </p>

            </div>

            {/* ===================================
                EVENT INFORMATION
            =================================== */}

            <div className="event-information">

              {/* DATE */}

              <div className="information-box">

                <div className="information-icon">
                  📅
                </div>

                <div>

                  <span>
                    Date
                  </span>

                  <strong>
                    {formatDate(event.date)}
                  </strong>

                </div>

              </div>

              {/* TIME */}

              <div className="information-box">

                <div className="information-icon">
                  ⏰
                </div>

                <div>

                  <span>
                    Time
                  </span>

                  <strong>
                    {event.time ||
                      "Time not available"}
                  </strong>

                </div>

              </div>

              {/* LOCATION */}

              <div className="information-box">

                <div className="information-icon">
                  📍
                </div>

                <div>

                  <span>
                    Location
                  </span>

                  <strong>
                    {location}
                  </strong>

                </div>

              </div>

              {/* TICKETS */}

              <div className="information-box">

                <div className="information-icon">
                  🎟️
                </div>

                <div>

                  <span>
                    Available Tickets
                  </span>

                  <strong>
                    {tickets !== undefined &&
                    tickets !== null
                      ? tickets
                      : "Available"}
                  </strong>

                </div>

              </div>

            </div>

            {/* ===================================
                BOOKING SECTION
            =================================== */}

            <div className="booking-section">

              <div className="price-section">

                <span>
                  Ticket Price
                </span>

                <strong>
                  {ticketPrice !== undefined &&
                  ticketPrice !== null
                    ? `₹${ticketPrice}`
                    : "Free"}
                </strong>

              </div>

              <button
  className="book-ticket-btn"
  onClick={() =>
    navigate("/booktickets", {
      state: {
        event: event,
      },
    })
  }
>
  Book Ticket →
</button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default EventDetails;