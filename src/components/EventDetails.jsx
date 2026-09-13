import React, {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import axios from "axios";

import "../styles/EventDetails.css";

const EVENTS_API =
  "https://api-admin-rouge.vercel.app/events/getevents";

const EventDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [event, setEvent] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // =====================================================
  // FETCH EVENT
  // =====================================================

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await axios.get(EVENTS_API);

        let events = [];

        if (
          Array.isArray(response.data)
        ) {
          events = response.data;
        } else if (
          Array.isArray(
            response.data?.data
          )
        ) {
          events = response.data.data;
        } else if (
          Array.isArray(
            response.data?.events
          )
        ) {
          events =
            response.data.events;
        }

        const selectedEvent =
          events.find(
            (item) =>
              String(
                item._id || item.id
              ) === String(id)
          );

        if (!selectedEvent) {
          setError(
            "Event not found."
          );
          setEvent(null);
          return;
        }

        setEvent(selectedEvent);
      } catch (error) {
        console.error(
          "Failed to fetch event:",
          error
        );

        setError(
          "Unable to load event details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  // =====================================================
  // DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "Date not available";
    }

    try {
      return new Date(
        date
      ).toLocaleDateString(
        "en-IN",
        {
          weekday: "long",
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      );
    } catch {
      return "Date not available";
    }
  };

  // =====================================================
  // IMAGE
  // =====================================================

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

    if (
      image.startsWith("data:image")
    ) {
      return image;
    }

    if (
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {
      return image;
    }

    return `https://api-admin-rouge.vercel.app/${image.replace(
      /^\/+/,
      ""
    )}`;
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="event-details-page">
        <div className="details-loading">
          <div className="details-spinner"></div>

          <p>
            Loading event details...
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

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
              "The event does not exist."}
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

  // =====================================================
  // EVENT DATA
  // =====================================================

  const eventId =
    event._id || event.id;

  const imageUrl =
    getImageUrl();

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
    Number(
      event.ticketPrice ??
        event.price ??
        event.amount ??
        0
    );

  const tickets =
    event.tickets;

  const status =
    event.status ||
    "Upcoming";

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="event-details-page">

      <div className="details-sparkle sparkle-one">
        ✦
      </div>

      <div className="details-sparkle sparkle-two">
        ✦
      </div>

      <div className="details-sparkle sparkle-three">
        ✦
      </div>

      <div className="details-sparkle sparkle-four">
        ✦
      </div>

      <div className="details-container">

        <button
          className="back-button"
          onClick={() =>
            navigate("/events")
          }
        >
          ← Back to Events
        </button>

        <div className="event-details-card">

          <div className="event-details-image-section">

            {imageUrl ? (
              <img
                src={imageUrl}
                alt={eventName}
                className="event-details-image"
              />
            ) : (
              <div className="event-details-image-placeholder">
                <span>✨</span>

                <p>
                  No Image Available
                </p>
              </div>
            )}

            <div className="details-category">
              {category}
            </div>

            <div
              className={`details-status ${status
                .toLowerCase()
                .replace(
                  /\s+/g,
                  "-"
                )}`}
            >
              {status}
            </div>

          </div>

          <div className="event-details-content">

            <h1>
              {eventName}
            </h1>

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

            <div className="description-section">

              <h2>
                About this event
              </h2>

              <p>
                {description}
              </p>

            </div>

            <div className="event-information">

              <div className="information-box">
                <div className="information-icon">
                  📅
                </div>

                <div>
                  <span>
                    Date
                  </span>

                  <strong>
                    {formatDate(
                      event.date
                    )}
                  </strong>
                </div>
              </div>

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

              <div className="information-box">
                <div className="information-icon">
                  🎟️
                </div>

                <div>
                  <span>
                    Available Tickets
                  </span>

                  <strong>
                    {tickets !==
                      undefined &&
                    tickets !== null
                      ? tickets
                      : "Available"}
                  </strong>
                </div>
              </div>

            </div>

            <div className="booking-section">

              <div className="price-section">
                <span>
                  Ticket Price
                </span>

                <strong>
                  {ticketPrice > 0
                    ? `₹${ticketPrice}`
                    : "Free"}
                </strong>
              </div>

              <button
                className="book-ticket-btn"
                onClick={() =>
                  navigate(
                    "/booktickets",
                    {
                      state: {
                        event,
                      },
                    }
                  )
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