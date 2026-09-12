import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/MyBookings.css";

const BOOKINGS_API =
  "https://user-api-iota-six.vercel.app/bookings/my-bookings";

const MyBookings = () => {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // FETCH MY BOOKINGS
  // =====================================================

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError("");

      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        setError("Please login to view your bookings.");
        setLoading(false);
        return;
      }

      // Token can be stored in different possible names
      const token =
        localStorage.getItem("token") ||
        localStorage.getItem("authToken") ||
        user.token;

      const config = {};

      if (token) {
        config.headers = {
          Authorization: `Bearer ${token}`,
        };
      }

      const response = await axios.get(
        BOOKINGS_API,
        config
      );

      console.log(
        "MY BOOKINGS RESPONSE:",
        response.data
      );

      let bookingData = [];

      if (Array.isArray(response.data)) {
        bookingData = response.data;
      } else if (Array.isArray(response.data.data)) {
        bookingData = response.data.data;
      } else if (
        Array.isArray(response.data.bookings)
      ) {
        bookingData = response.data.bookings;
      } else if (
        Array.isArray(response.data.results)
      ) {
        bookingData = response.data.results;
      }

      setBookings(bookingData);
    } catch (err) {
      console.error(
        "Failed to fetch bookings:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Unable to load your bookings. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // PAGE LOAD
  // =====================================================

  useEffect(() => {
    fetchBookings();
  }, []);

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "Date not available";
    }

    try {
      return new Date(date).toLocaleDateString(
        "en-IN",
        {
          weekday: "short",
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      );
    } catch {
      return date;
    }
  };

  // =====================================================
  // IMAGE URL
  // =====================================================

  const getImageUrl = (booking) => {
    const event =
      booking.event ||
      booking.eventDetails ||
      booking.eventData ||
      {};

    const image =
      booking.image ||
      booking.eventImage ||
      event.image ||
      event.poster ||
      event.imageUrl ||
      event.eventImage;

    if (!image) {
      return null;
    }

    // Base64
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

    // Relative path
    return `https://api-admin-rouge.vercel.app/${image.replace(
      /^\/+/,
      ""
    )}`;
  };

  // =====================================================
  // GET EVENT DETAILS FROM BOOKING
  // =====================================================

  const getEvent = (booking) => {
    return (
      booking.event ||
      booking.eventDetails ||
      booking.eventData ||
      {}
    );
  };

  // =====================================================
  // EVENT NAME
  // =====================================================

  const getEventName = (booking) => {
    const event = getEvent(booking);

    return (
      booking.eventName ||
      booking.name ||
      event.name ||
      event.eventName ||
      event.title ||
      "Untitled Event"
    );
  };

  // =====================================================
  // EVENT ID
  // =====================================================

  const getEventId = (booking) => {
    const event = getEvent(booking);

    return (
      booking.eventId ||
      booking.eventID ||
      event._id ||
      event.id
    );
  };

  // =====================================================
  // STATUS
  // =====================================================

  const getStatus = (booking) => {
    const status =
      booking.status ||
      booking.bookingStatus ||
      "Confirmed";

    return status;
  };

  // =====================================================
  // VIEW EVENT
  // =====================================================

  const handleViewEvent = (booking) => {
    const eventId = getEventId(booking);

    if (!eventId) {
      console.error(
        "Event ID not found:",
        booking
      );
      return;
    }

    navigate(`/eventdetails/${eventId}`);
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="my-bookings-page">

        <div className="booking-sparkle sparkle-one"></div>
        <div className="booking-sparkle sparkle-two"></div>
        <div className="booking-sparkle sparkle-three"></div>
        <div className="booking-sparkle sparkle-four"></div>

        <div className="bookings-loading">
          <div className="booking-spinner"></div>

          <p>
            Loading your bookings...
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="my-bookings-page">

      {/* BACKGROUND SPARKLES */}

      <div className="booking-sparkle sparkle-one"></div>
      <div className="booking-sparkle sparkle-two"></div>
      <div className="booking-sparkle sparkle-three"></div>
      <div className="booking-sparkle sparkle-four"></div>
      <div className="booking-sparkle sparkle-five"></div>

      <div className="my-bookings-container">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="bookings-header">

          <div>
            <p className="bookings-small-title">
              EVENTORA
            </p>

            <h1>
              My Bookings
            </h1>

            <p className="bookings-subtitle">
              Keep track of all your registered events
              in one place.
            </p>
          </div>

          <button
            className="browse-events-btn"
            onClick={() =>
              navigate("/events")
            }
          >
            Explore Events
            <span>→</span>
          </button>

        </div>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="bookings-error">

            <div className="booking-error-icon">
              !
            </div>

            <h2>
              Something went wrong
            </h2>

            <p>
              {error}
            </p>

            <button
              onClick={fetchBookings}
            >
              Try Again
            </button>

          </div>
        )}

        {/* =================================================
            BOOKING COUNT
        ================================================= */}

        {!error && bookings.length > 0 && (
          <div className="booking-count">

            <span>
              {bookings.length}
            </span>

            {bookings.length === 1
              ? " booking"
              : " bookings"}{" "}
            found
          </div>
        )}

        {/* =================================================
            EMPTY STATE
        ================================================= */}

        {!error && bookings.length === 0 && (
          <div className="empty-bookings">

            <div className="empty-booking-icon">
              🎟️
            </div>

            <h2>
              No Bookings Yet
            </h2>

            <p>
              You haven't booked any events yet.
              Explore our events and find something
              exciting to attend.
            </p>

            <button
              className="empty-explore-btn"
              onClick={() =>
                navigate("/events")
              }
            >
              Explore Events
              <span>→</span>
            </button>

          </div>
        )}

        {/* =================================================
            BOOKINGS GRID
        ================================================= */}

        {!error && bookings.length > 0 && (
          <div className="bookings-list">

            {bookings.map(
              (booking, index) => {

                const event =
                  getEvent(booking);

                const imageUrl =
                  getImageUrl(booking);

                const eventName =
                  getEventName(booking);

                const eventId =
                  getEventId(booking);

                const status =
                  getStatus(booking);

                const date =
                  booking.date ||
                  booking.eventDate ||
                  event.date;

                const time =
                  booking.time ||
                  event.time ||
                  "Time not available";

                const location =
                  booking.location ||
                  event.location ||
                  event.venue ||
                  "Location not available";

                const tickets =
                  booking.tickets ||
                  booking.quantity ||
                  booking.numberOfTickets ||
                  1;

                const price =
                  booking.totalAmount ??
                  booking.totalPrice ??
                  booking.amount ??
                  booking.price ??
                  event.ticketPrice ??
                  event.price;

                return (
                  <div
                    className="booking-card"
                    key={
                      booking._id ||
                      booking.id ||
                      index
                    }
                  >

                    {/* EVENT IMAGE */}

                    <div className="booking-image-wrapper">

                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={eventName}
                          className="booking-image"
                        />
                      ) : (
                        <div className="booking-image-placeholder">
                          <span>✨</span>
                          <p>
                            Event
                          </p>
                        </div>
                      )}

                      <div className="booking-status">
                        <span className="status-dot"></span>
                        {status}
                      </div>

                    </div>

                    {/* BOOKING CONTENT */}

                    <div className="booking-content">

                      <div className="booking-event-heading">

                        <div>

                          <span className="booking-label">
                            EVENT
                          </span>

                          <h2>
                            {eventName}
                          </h2>

                        </div>

                        <div className="booking-ticket-icon">
                          🎟️
                        </div>

                      </div>

                      {/* INFO */}

                      <div className="booking-info-grid">

                        <div className="booking-info-item">

                          <span className="info-icon">
                            📅
                          </span>

                          <div>
                            <small>
                              Date
                            </small>

                            <strong>
                              {formatDate(date)}
                            </strong>
                          </div>

                        </div>

                        <div className="booking-info-item">

                          <span className="info-icon">
                            ⏰
                          </span>

                          <div>
                            <small>
                              Time
                            </small>

                            <strong>
                              {time}
                            </strong>
                          </div>

                        </div>

                        <div className="booking-info-item">

                          <span className="info-icon">
                            📍
                          </span>

                          <div>
                            <small>
                              Location
                            </small>

                            <strong>
                              {location}
                            </strong>
                          </div>

                        </div>

                        <div className="booking-info-item">

                          <span className="info-icon">
                            🎫
                          </span>

                          <div>
                            <small>
                              Tickets
                            </small>

                            <strong>
                              {tickets}
                            </strong>
                          </div>

                        </div>

                      </div>

                      {/* BOTTOM */}

                      <div className="booking-bottom">

                        <div className="booking-total">

                          <span>
                            Total Amount
                          </span>

                          <strong>
                            {price !== undefined &&
                            price !== null
                              ? `₹${price}`
                              : "Free"}
                          </strong>

                        </div>

                        <button
                          className="booking-view-btn"
                          onClick={() => {
                            if (eventId) {
                              handleViewEvent(
                                booking
                              );
                            }
                          }}
                        >
                          View Event
                          <span>→</span>
                        </button>

                      </div>

                    </div>
                  </div>
                );
              }
            )}

          </div>
        )}

      </div>
    </div>
  );
};

export default MyBookings;