import React, {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import axios from "axios";

import "../styles/MyBookings.css";

const BOOKINGS_API =
  "https://user-api-iota-six.vercel.app/booking/user";

const MyBookings = () => {
  const navigate =
    useNavigate();

  const [bookings, setBookings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // =====================================================
  // GET USER ID
  // =====================================================

  const getLoggedInUser = () => {
    const storedUser =
      localStorage.getItem(
        "user"
      );

    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(
        storedUser
      );
    } catch {
      return null;
    }
  };

  // =====================================================
  // FETCH BOOKINGS
  // =====================================================

  const fetchBookings =
    async () => {
      try {
        setLoading(true);
        setError("");

        const user =
          getLoggedInUser();

        if (!user) {
          setError(
            "Please login to view your bookings."
          );

          return;
        }

        const userId =
          user.id ||
          user._id ||
          user.userId;

        if (!userId) {
          setError(
            "User ID not found. Please login again."
          );

          return;
        }

        console.log(
          "MY BOOKINGS USER:",
          user
        );

        const response =
          await axios.get(
            `${BOOKINGS_API}/${userId}`
          );

        console.log(
          "MY BOOKINGS RESPONSE:",
          response.data
        );

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
        }

        setBookings(
          bookingData
        );
      } catch (error) {
        console.error(
          "FAILED TO FETCH BOOKINGS:",
          error
        );

        console.error(
          "BOOKING ERROR RESPONSE:",
          error.response?.data
        );

        setError(
          error.response?.data
            ?.message ||
            "Unable to load your bookings."
        );
      } finally {
        setLoading(false);
      }
    };

  // =====================================================
  // LOAD
  // =====================================================

  useEffect(() => {
    fetchBookings();
  }, []);

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (
    date
  ) => {
    if (!date) {
      return "Date unavailable";
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
      return "Date unavailable";
    }
  };

  // =====================================================
  // GET EVENT ID
  // =====================================================

  const getEventId = (
    booking
  ) => {
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

  const handleViewEvent =
    (booking) => {
      const eventId =
        getEventId(booking);

      if (!eventId) {
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
              Keep track of all the
              events you have booked.
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

        {/* COUNT */}

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

        {/* EMPTY */}

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
                You haven't booked
                any events yet.
                Explore our events
                and find something
                exciting to attend.
              </p>

              <button
                className="empty-explore-btn"
                onClick={() =>
                  navigate(
                    "/events"
                  )
                }
              >
                Explore Events
                <span>→</span>
              </button>

            </div>
          )}

        {/* BOOKINGS */}

        {!error &&
          bookings.length > 0 && (

            <div className="bookings-list">

              {bookings.map(
                (
                  booking,
                  index
                ) => {

                  const eventId =
                    getEventId(
                      booking
                    );

                  const eventName =
                    booking.eventName ||
                    "Untitled Event";

                  const date =
                    booking.eventDate;

                  const time =
                    booking.eventTime ||
                    "Time unavailable";

                  const eventLocation =
                    booking.eventLocation ||
                    "Location unavailable";

                  const category =
                    booking.eventCategory ||
                    "Event";

                  const tickets =
                    booking.numberOfTickets ||
                    1;

                  const ticketPrice =
                    Number(
                      booking.ticketPrice ||
                        0
                    );

                  const totalAmount =
                    Number(
                      booking.totalAmount ||
                        0
                    );

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

                      <div className="booking-card-top">

                        <div>

                          <span className="booking-label">
                            {category}
                          </span>

                          <h2>
                            {eventName}
                          </h2>

                        </div>

                        <div
                          className={`booking-status ${
                            status ===
                            "Cancelled"
                              ? "cancelled"
                              : "confirmed"
                          }`}
                        >
                          <span className="status-dot"></span>

                          {status}
                        </div>

                      </div>

                      {/* EVENT DETAILS */}

                      <div className="booking-info-grid">

                        <div className="booking-info-item">

                          <span className="info-icon">
                            📅
                          </span>

                          <div>
                            <small>
                              Event Date
                            </small>

                            <strong>
                              {formatDate(
                                date
                              )}
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
                              {eventLocation}
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

                      {/* ATTENDEES */}

                      {Array.isArray(
                        booking.attendees
                      ) &&
                        booking.attendees
                          .length >
                          0 && (

                          <div className="booking-attendees">

                            <h3>
                              Attendee Details
                            </h3>

                            <div className="attendees-grid">

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
                                        {
                                          attendee.name
                                        }
                                      </strong>
                                    </div>

                                    <div>
                                      <small>
                                        Email
                                      </small>

                                      <strong>
                                        {
                                          attendee.email
                                        }
                                      </strong>
                                    </div>

                                    <div>
                                      <small>
                                        Phone
                                      </small>

                                      <strong>
                                        {
                                          attendee.phone
                                        }
                                      </strong>
                                    </div>

                                  </div>

                                )
                              )}

                            </div>

                          </div>
                        )}

                      {/* BOTTOM */}

                      <div className="booking-bottom">

                        <div className="booking-total">

                          <span>
                            Ticket Price
                          </span>

                          <strong>
                            {ticketPrice >
                            0
                              ? `₹${ticketPrice}`
                              : "Free"}
                          </strong>

                        </div>

                        <div className="booking-total">

                          <span>
                            Total Amount
                          </span>

                          <strong>
                            {totalAmount >
                            0
                              ? `₹${totalAmount}`
                              : "Free"}
                          </strong>

                        </div>

                        <button
                          className="booking-view-btn"
                          onClick={() =>
                            handleViewEvent(
                              booking
                            )
                          }
                          disabled={
                            !eventId
                          }
                        >
                          View Event
                          <span>
                            →
                          </span>
                        </button>

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