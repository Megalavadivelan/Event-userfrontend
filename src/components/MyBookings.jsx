import React, {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import axios from "axios";

import "../styles/MyBookings.css";

// =====================================================
// CORRECT API
// =====================================================

const BOOKINGS_API =
  "https://user-api-iota-six.vercel.app/booking/user";

const MyBookings = () => {
  const navigate = useNavigate();

  const [bookings, setBookings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // =====================================================
  // FETCH MY BOOKINGS
  // =====================================================

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError("");

      const storedUser =
        localStorage.getItem("user");

      // =================================================
      // USER NOT LOGGED IN
      // =================================================

      if (!storedUser) {
        setError(
          "Please login to view your bookings."
        );

        setLoading(false);
        return;
      }

      const user =
        JSON.parse(storedUser);

      console.log(
        "MY BOOKINGS USER:",
        user
      );

      // =================================================
      // USER ID
      // =================================================

      const userId =
        user.id ||
        user._id ||
        user.userId;

      if (!userId) {
        setError(
          "User ID not found. Please login again."
        );

        setLoading(false);
        return;
      }

      // =================================================
      // TOKEN
      // =================================================

      const token =
        localStorage.getItem("token") ||
        localStorage.getItem("authToken") ||
        user.token;

      const config = {};

      if (token) {
        config.headers = {
          Authorization:
            `Bearer ${token}`,
        };
      }

      // =================================================
      // GET USER BOOKINGS
      // =================================================

      const response =
        await axios.get(
          `${BOOKINGS_API}/${userId}`,
          config
        );

      console.log(
        "MY BOOKINGS RESPONSE:",
        response.data
      );

      // =================================================
      // RESPONSE DATA
      // =================================================

      let bookingData = [];

      if (
        Array.isArray(
          response.data
        )
      ) {
        bookingData =
          response.data;
      } else if (
        Array.isArray(
          response.data?.bookings
        )
      ) {
        bookingData =
          response.data.bookings;
      } else if (
        Array.isArray(
          response.data?.data
        )
      ) {
        bookingData =
          response.data.data;
      } else if (
        Array.isArray(
          response.data?.results
        )
      ) {
        bookingData =
          response.data.results;
      }

      setBookings(bookingData);
    } catch (err) {
      console.error(
        "Failed to fetch bookings:",
        err
      );

      console.error(
        "BOOKING ERROR RESPONSE:",
        err.response?.data
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
      return new Date(
        date
      ).toLocaleDateString(
        "en-IN",
        {
          weekday: "short",
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      );
    } catch {
      return "Date not available";
    }
  };

  // =====================================================
  // GET EVENT ID
  // =====================================================

  const getEventId = (booking) => {
    return (
      booking.eventId ||
      booking.eventID ||
      booking.event?._id ||
      booking.event?.id
    );
  };

  // =====================================================
  // VIEW EVENT
  // =====================================================

  const handleViewEvent = (
    booking
  ) => {
    const eventId =
      getEventId(booking);

    if (!eventId) {
      console.error(
        "Event ID not found:",
        booking
      );

      alert(
        "Event details are not available."
      );

      return;
    }

    navigate(
      `/eventdetails/${eventId}`
    );
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="my-bookings-page">

        <div className="booking-sparkle sparkle-one">
          ✦
        </div>

        <div className="booking-sparkle sparkle-two">
          ✦
        </div>

        <div className="booking-sparkle sparkle-three">
          ✦
        </div>

        <div className="booking-sparkle sparkle-four">
          ✦
        </div>

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

      <div className="booking-sparkle sparkle-one">
        ✦
      </div>

      <div className="booking-sparkle sparkle-two">
        ✦
      </div>

      <div className="booking-sparkle sparkle-three">
        ✦
      </div>

      <div className="booking-sparkle sparkle-four">
        ✦
      </div>

      <div className="booking-sparkle sparkle-five">
        ✦
      </div>

      <div className="my-bookings-container">

        {/* HEADER */}

        <div className="bookings-header">

          <div>

            <p className="bookings-small-title">
              EVENTORA
            </p>

            <h1>
              My Bookings
            </h1>

            <p className="bookings-subtitle">
              Keep track of all your registered
              events in one place.
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

        {/* ERROR */}

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
              onClick={
                fetchBookings
              }
            >
              Try Again
            </button>

          </div>
        )}

        {/* BOOKING COUNT */}

        {!error &&
          bookings.length > 0 && (
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

        {/* EMPTY STATE */}

        {!error &&
          bookings.length === 0 && (
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

        {/* BOOKINGS LIST */}

        {!error &&
          bookings.length > 0 && (

            <div className="bookings-list">

              {bookings.map(
                (
                  booking,
                  index
                ) => {

                  const eventName =
                    booking.eventName ||
                    "Untitled Event";

                  const eventId =
                    getEventId(
                      booking
                    );

                  const date =
                    booking.eventDate ||
                    booking.date ||
                    booking.bookingDate;

                  const time =
                    booking.eventTime ||
                    booking.time ||
                    "Time not available";

                  const location =
                    booking.location ||
                    booking.venue ||
                    "Location not available";

                  const tickets =
                    booking.numberOfTickets ||
                    1;

                  const totalAmount =
                    booking.totalAmount ??
                    0;

                  const ticketPrice =
                    booking.ticketPrice ??
                    0;

                  const status =
                    booking.status ||
                    "Confirmed";

                  return (
                    <div
                      className="booking-card"
                      key={
                        booking._id ||
                        booking.id ||
                        index
                      }
                    >

                      <div className="booking-content">

                        {/* EVENT HEADING */}

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

                        {/* STATUS */}

                        <div className="booking-status">

                          <span className="status-dot"></span>

                          {status}

                        </div>

                        {/* BOOKING INFO */}

                        <div className="booking-info-grid">

                          {/* DATE */}

                          <div className="booking-info-item">

                            <span className="info-icon">
                              📅
                            </span>

                            <div>

                              <small>
                                Date
                              </small>

                              <strong>
                                {formatDate(
                                  date
                                )}
                              </strong>

                            </div>

                          </div>

                          {/* TIME */}

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

                          {/* LOCATION */}

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

                          {/* TICKETS */}

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

                        {/* ATTENDEES */}

                        {Array.isArray(
                          booking.attendees
                        ) &&
                          booking.attendees.length >
                            0 && (

                            <div className="booking-attendees">

                              <h3>
                                Attendee Details
                              </h3>

                              {booking.attendees.map(
                                (
                                  attendee,
                                  attendeeIndex
                                ) => (

                                  <div
                                    className="attendee-summary"
                                    key={
                                      attendee._id ||
                                      attendeeIndex
                                    }
                                  >

                                    <div>

                                      <small>
                                        Attendee{" "}
                                        {attendeeIndex +
                                          1}
                                      </small>

                                      <strong>
                                        {attendee.name}
                                      </strong>

                                    </div>

                                    <div>

                                      <small>
                                        Email
                                      </small>

                                      <strong>
                                        {attendee.email}
                                      </strong>

                                    </div>

                                    <div>

                                      <small>
                                        Phone
                                      </small>

                                      <strong>
                                        {attendee.phone}
                                      </strong>

                                    </div>

                                  </div>
                                )
                              )}

                            </div>
                          )}

                        {/* BOTTOM */}

                        <div className="booking-bottom">

                          <div className="booking-total">

                            <span>
                              Ticket Price
                            </span>

                            <strong>
                              {Number(
                                ticketPrice
                              ) > 0
                                ? `₹${ticketPrice}`
                                : "Free"}
                            </strong>

                          </div>

                          <div className="booking-total">

                            <span>
                              Total Amount
                            </span>

                            <strong>
                              {Number(
                                totalAmount
                              ) > 0
                                ? `₹${totalAmount}`
                                : "Free"}
                            </strong>

                          </div>

                          <button
                            className="booking-view-btn"
                            onClick={() => {

                              if (
                                eventId
                              ) {
                                handleViewEvent(
                                  booking
                                );
                              }

                            }}
                          >
                            View Event
                            <span>
                              →
                            </span>
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