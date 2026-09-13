import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/MyBookings.css";

const API_URL = "https://user-api-iota-six.vercel.app";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        setBookings([]);
        return;
      }

      const user = JSON.parse(storedUser);

      const userId =
        user?._id ||
        user?.id ||
        user?.userId;

      if (!userId) {
        console.error("User ID not found");
        setBookings([]);
        return;
      }

      console.log("MY BOOKINGS USER:", user);

      const response = await axios.get(
        `${API_URL}/booking/user/${userId}`
      );

      console.log("MY BOOKINGS RESPONSE:", response.data);

      if (
        response.data?.success &&
        Array.isArray(response.data.bookings)
      ) {
        setBookings(response.data.bookings);
      } else {
        setBookings([]);
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      console.error(
        "BOOKING ERROR RESPONSE:",
        error.response?.data
      );

      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const openBooking = (booking) => {
    setSelectedBooking(booking);
  };

  const closeBooking = () => {
    setSelectedBooking(null);
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
      return "N/A";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    if (!date) return "N/A";

    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
      return "N/A";
    }

    return parsedDate.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount) => {
    const value = Number(amount);

    if (isNaN(value)) {
      return "₹0";
    }

    return `₹${value.toLocaleString("en-IN")}`;
  };

  return (
    <div className="my-bookings-page">

      {/* ================= HEADER ================= */}

      <div className="my-bookings-header">
        <h1>My Bookings</h1>

        <p>
          View and manage all your event bookings
        </p>
      </div>

      {/* ================= CONTENT ================= */}

      <div className="bookings-container">

        {loading ? (
          <div className="bookings-message">
            <div className="loading-spinner"></div>
            <p>Loading your bookings...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="bookings-message empty-bookings">
            <div className="empty-icon">📅</div>

            <h2>No Bookings Found</h2>

            <p>
              You haven't booked any events yet.
            </p>
          </div>
        ) : (
          <div className="booking-list">

            {bookings.map((booking) => (
              <div
                className="booking-row"
                key={booking._id}
              >

                {/* EVENT NAME */}

                <div className="booking-event-name">
                  <span className="booking-label">
                    Event
                  </span>

                  <h3>
                    {booking.eventName || "Event"}
                  </h3>
                </div>

                {/* EVENT DATE */}

                <div className="booking-column">
                  <span className="booking-label">
                    Date
                  </span>

                  <span className="booking-value">
                    {formatDate(booking.eventDate)}
                  </span>
                </div>

                {/* EVENT TIME */}

                <div className="booking-column">
                  <span className="booking-label">
                    Time
                  </span>

                  <span className="booking-value">
                    {booking.eventTime || "N/A"}
                  </span>
                </div>

                {/* VIEW BUTTON */}

                <div className="booking-action">
                  <button
                    className="view-booking-btn"
                    onClick={() =>
                      openBooking(booking)
                    }
                  >
                    View
                  </button>
                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* ================================================= */}
      {/* BOOKING DETAILS MODAL */}
      {/* ================================================= */}

      {selectedBooking && (
        <div
          className="booking-modal-overlay"
          onClick={closeBooking}
        >

          <div
            className="booking-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="modal-header">

              <div>
                <span className="modal-small-title">
                  BOOKING DETAILS
                </span>

                <h2>
                  {selectedBooking.eventName ||
                    "Event Booking"}
                </h2>
              </div>

              <button
                className="modal-close-btn"
                onClick={closeBooking}
                aria-label="Close"
              >
                ×
              </button>

            </div>

            {/* ================= DETAILS ================= */}

            <div className="details-box">

              <div className="detail-item">
                <span>Event Name</span>

                <strong>
                  {selectedBooking.eventName ||
                    "N/A"}
                </strong>
              </div>

              <div className="detail-item">
                <span>Event Date</span>

                <strong>
                  {formatDate(
                    selectedBooking.eventDate
                  )}
                </strong>
              </div>

              <div className="detail-item">
                <span>Event Time</span>

                <strong>
                  {selectedBooking.eventTime ||
                    "N/A"}
                </strong>
              </div>

              <div className="detail-item">
                <span>Ticket Price</span>

                <strong>
                  {formatCurrency(
                    selectedBooking.ticketPrice
                  )}
                </strong>
              </div>

              <div className="detail-item">
                <span>Number of Tickets</span>

                <strong>
                  {selectedBooking.numberOfTickets ||
                    0}
                </strong>
              </div>

              <div className="detail-item total-row">
                <span>Total Amount</span>

                <strong>
                  {formatCurrency(
                    selectedBooking.totalAmount
                  )}
                </strong>
              </div>

            </div>

            {/* ================= USER DETAILS ================= */}

            <div className="section-title">
              Attendee Details
            </div>

            <div className="attendees-box">

              {Array.isArray(
                selectedBooking.attendees
              ) &&
              selectedBooking.attendees.length > 0 ? (
                selectedBooking.attendees.map(
                  (attendee, index) => (
                    <div
                      className="attendee-card"
                      key={index}
                    >

                      <div className="attendee-number">
                        {index + 1}
                      </div>

                      <div className="attendee-info">

                        <h4>
                          {attendee.name ||
                            "N/A"}
                        </h4>

                        <p>
                          <span>Email:</span>{" "}
                          {attendee.email ||
                            "N/A"}
                        </p>

                        <p>
                          <span>Phone:</span>{" "}
                          {attendee.phone ||
                            "N/A"}
                        </p>

                      </div>

                    </div>
                  )
                )
              ) : (
                <p className="no-attendees">
                  No attendee details available.
                </p>
              )}

            </div>

            {/* ================= BOOKED DATE/TIME ================= */}

            <div className="section-title">
              Booking Information
            </div>

            <div className="booking-time-box">

              <div className="booking-time-item">
                <span>Booked Date</span>

                <strong>
                  {formatDate(
                    selectedBooking.createdAt
                  )}
                </strong>
              </div>

              <div className="booking-time-item">
                <span>Booked Time</span>

                <strong>
                  {formatTime(
                    selectedBooking.createdAt
                  )}
                </strong>
              </div>

            </div>

            {/* ================= CLOSE ================= */}

            <button
              className="modal-bottom-close"
              onClick={closeBooking}
            >
              Close
            </button>

          </div>
        </div>
      )}

    </div>
  );
};

export default MyBookings;