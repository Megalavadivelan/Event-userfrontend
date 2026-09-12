import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/EventDetails.css";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ===================================================
  // FETCH SINGLE EVENT FROM FRIEND'S API
  // ===================================================

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        setError("");

        // IMPORTANT:
        // Friend's single event API
        const EVENTS_API = `https://api-admin-rouge.vercel.app/events/get/${id}`;

        console.log("EVENT ID:", id);
        console.log("EVENT DETAILS API:", EVENTS_API);

        const response = await axios.get(EVENTS_API);

        console.log(
          "EVENT DETAILS API RESPONSE:",
          response.data
        );

        // ===================================================
        // HANDLE API RESPONSE
        // ===================================================

        let selectedEvent = null;

        /*
          Expected response:

          {
            success: true,
            data: {
              _id: "...",
              name: "...",
              organizer: "...",
              date: "...",
              time: "...",
              location: "...",
              description: "...",
              category: "...",
              tickets: 400,
              ticketPrice: 500,
              image: "..."
            }
          }
        */

        if (
          response.data &&
          response.data.success &&
          response.data.data
        ) {
          selectedEvent = response.data.data;
        }

        // If API directly returns the event object
        else if (
          response.data &&
          !Array.isArray(response.data) &&
          response.data._id
        ) {
          selectedEvent = response.data;
        }

        // If API returns an array
        else if (Array.isArray(response.data)) {
          selectedEvent = response.data.find(
            (item) =>
              String(item._id || item.id) === String(id)
          );
        }

        // ===================================================
        // EVENT NOT FOUND
        // ===================================================

        if (!selectedEvent) {
          setError("Event not found.");
          setEvent(null);
          return;
        }

        console.log(
          "SELECTED EVENT:",
          selectedEvent
        );

        setEvent(selectedEvent);

      } catch (error) {
        console.error(
          "Failed to fetch event:",
          error
        );

        console.error(
          "API ERROR RESPONSE:",
          error.response?.data
        );

        setError(
          "Unable to load event details. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEvent();
    } else {
      setError("Event ID is missing.");
      setLoading(false);
    }
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
  // IMAGE
  // ===================================================

  const getImageUrl = () => {
    if (!event) {
      return null;
    }

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

    // Relative upload path
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
            onClick={() => navigate("/events")}
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

      {/* =================================================
          BACKGROUND SPARKLES
      ================================================= */}

      <div className="details-sparkle sparkle-one"></div>
      <div className="details-sparkle sparkle-two"></div>
      <div className="details-sparkle sparkle-three"></div>
      <div className="details-sparkle sparkle-four"></div>

      {/* =================================================
          MAIN CONTAINER
      ================================================= */}

      <div className="details-container">

        {/* BACK BUTTON */}

        <button
          className="back-button"
          onClick={() => navigate("/events")}
        >
          ← Back to Events
        </button>

        {/* =================================================
            EVENT DETAILS CARD
        ================================================= */}

        <div className="event-details-card">

          {/* =================================================
              IMAGE
          ================================================= */}

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

          {/* =================================================
              EVENT CONTENT
          ================================================= */}

          <div className="event-details-content">

            {/* TITLE */}

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

            {/* =================================================
                EVENT INFORMATION
            ================================================= */}

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

            {/* =================================================
                PRICE + BOOK
            ================================================= */}

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
                className="book-ticket-button"
                onClick={() => {
                  alert(
                    "Booking feature will be available soon!"
                  );
                }}
              >
                Book Tickets

                <span>
                  →
                </span>

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default EventDetails;