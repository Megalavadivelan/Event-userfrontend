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
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        setLoading(false);
        return;
      }

      const user = JSON.parse(storedUser);

      console.log("MY BOOKINGS USER:", user);

      const userId = user._id || user.id || user.userId;

      if (!userId) {
        console.error("User ID not found");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `${API_URL}/booking/user/${userId}`
      );

      console.log("BOOKINGS RESPONSE:", response.data);

      if (response.data?.success) {
        setBookings(response.data.bookings || []);
      } else {
        setBookings([]);
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const closePopup = () => {
    setSelectedBooking(null);
  };

  if (loading) {
    return (
      <div className="my-bookings-page">
        <div className="bookings-loading">
          <div className="loading-spinner"></div>
          <p>Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-bookings-page">

      {/* BACKGROUND GLOW */}
      <div className="booking-glow glow-one"></div>
      <div className="booking-glow glow-two"></div>

      <div className="my-bookings-container">

        {/* HEADER */}
        <div className="my-bookings-header">
          <span className="header-line"></span>

          <div>
            <p className="booking-small-title">
              EVENTORA
            </p>

            <h1>My Bookings</h1>

            <p className="booking-subtitle">
              Your event tickets, all in one place
            </p>
          </div>

          <span className="header-line"></span>
        </div>

        {/* EMPTY STATE */}
        {bookings.length === 0 ? (
          <div className="empty-bookings">
            <div className="empty-icon">🎟️</div>

            <h2>No Bookings Yet</h2>

            <p>
              You haven't booked any events yet.
            </p>
          </div>
        ) : (
          <div className="booking-list">

            {bookings.map((booking, index) => (
              <div
                className="booking-row-card"
                key={booking._id || index}
                style={{
                  animationDelay: `${index * 0.08}s`,
                }}
              >

                {/* EVENT NAME */}
                <div className="booking-event-section">
                  <span className="booking-icon">🎫</span>

                  <div>
                    <span className="booking-label">
                      EVENT
                    </span>

                    <h3>
                      {booking.eventName || "Event"}
                    </h3>
                  </div>
                </div>

                {/* DATE */}
                <div className="booking-info">
                  <span className="booking-label">
                    DATE
                  </span>

                  <strong>
                    {formatDate(booking.eventDate)}
                  </strong>
                </div>

                {/* TIME */}
                <div className="booking-info">
                  <span className="booking-label">
                    TIME
                  </span>

                  <strong>
                    {booking.eventTime ||
                      (booking.eventDate
                        ? formatTime(booking.eventDate)
                        : "N/A")}
                  </strong>
                </div>

                {/* TICKETS */}
                <div className="booking-info tickets-info">
                  <span className="booking-label">
                    TICKETS
                  </span>

                  <strong>
                    {booking.numberOfTickets || 0}
                  </strong>
                </div>

                {/* VIEW BUTTON */}
                <button
                  className="view-booking-btn"
                  onClick={() =>
                    setSelectedBooking(booking)
                  }
                >
                  <span>View</span>
                  <span className="arrow">→</span>
                </button>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= POPUP ================= */}

      {selectedBooking && (
        <div
          className="booking-modal-overlay"
          onClick={closePopup}
        >

          <div
            className="booking-modal"
            onClick={(e) => e.stopPropagation()}
          >

            {/* TOP GLOW */}
            <div className="modal-top-glow"></div>

            {/* CLOSE */}
            <button
              className="modal-close-btn"
              onClick={closePopup}
            >
              ×
            </button>

            {/* MODAL HEADER */}
            <div className="modal-header">

              <div className="modal-ticket-icon">
                🎟️
              </div>

              <div>
                <span>BOOKING DETAILS</span>

                <h2>
                  {selectedBooking.eventName ||
                    "Event"}
                </h2>
              </div>

            </div>

            {/* EVENT DETAILS */}
            <div className="details-section">

              <h3 className="section-title">
                Event Information
              </h3>

              <div className="details-grid">

                <div className="detail-box">
                  <span>📅 Event Date</span>

                  <strong>
                    {formatDate(
                      selectedBooking.eventDate
                    )}
                  </strong>
                </div>

                <div className="detail-box">
                  <span>🕐 Event Time</span>

                  <strong>
                    {selectedBooking.eventTime ||
                      (selectedBooking.eventDate
                        ? formatTime(
                            selectedBooking.eventDate
                          )
                        : "N/A")}
                  </strong>
                </div>

                <div className="detail-box">
                  <span>🎟️ Tickets</span>

                  <strong>
                    {selectedBooking.numberOfTickets ||
                      0}
                  </strong>
                </div>

                <div className="detail-box">
                  <span>💰 Ticket Price</span>

                  <strong>
                    ₹
                    {selectedBooking.ticketPrice ||
                      0}
                  </strong>
                </div>

                <div className="detail-box total-box">
                  <span>💵 Total Amount</span>

                  <strong>
                    ₹
                    {selectedBooking.totalAmount ||
                      0}
                  </strong>
                </div>

              </div>
            </div>

            {/* USER DETAILS */}
            <div className="details-section">

              <h3 className="section-title">
                Booking User
              </h3>

              <div className="user-detail-box">

                <div>
                  <span>Name</span>
                  <strong>
                    {selectedBooking.userName ||
                      "N/A"}
                  </strong>
                </div>

                <div>
                  <span>Email</span>
                  <strong>
                    {selectedBooking.userEmail ||
                      "N/A"}
                  </strong>
                </div>

              </div>
            </div>

            {/* ATTENDEES */}
            <div className="details-section">

              <h3 className="section-title">
                Attendee Details
              </h3>

              <div className="attendees-list">

                {selectedBooking.attendees?.length >
                0 ? (
                  selectedBooking.attendees.map(
                    (attendee, index) => (
                      <div
                        className="attendee-card"
                        key={index}
                        style={{
                          animationDelay: `${
                            index * 0.08
                          }s`,
                        }}
                      >

                        <div className="attendee-number">
                          {index + 1}
                        </div>

                        <div className="attendee-info">

                          <strong>
                            {attendee.name}
                          </strong>

                          <span>
                            {attendee.email}
                          </span>

                          <span>
                            📞 {attendee.phone}
                          </span>

                        </div>

                      </div>
                    )
                  )
                ) : (
                  <p className="no-attendees">
                    No attendee details available
                  </p>
                )}

              </div>
            </div>

            {/* BOOKED DATE + TIME */}
            <div className="details-section">

              <h3 className="section-title">
                Booking Information
              </h3>

              <div className="booking-created">

                <div className="created-item">

                  <div className="created-icon">
                    📆
                  </div>

                  <div>
                    <span>Booked Date</span>

                    <strong>
                      {formatDate(
                        selectedBooking.createdAt
                      )}
                    </strong>
                  </div>

                </div>

                <div className="created-item">

                  <div className="created-icon">
                    🕐
                  </div>

                  <div>
                    <span>Booked Time</span>

                    <strong>
                      {formatTime(
                        selectedBooking.createdAt
                      )}
                    </strong>
                  </div>

                </div>

              </div>
            </div>

            {/* FOOTER */}
            <div className="modal-footer">
              <span>Eventora</span>

              <span>
                Booking ID:{" "}
                {selectedBooking._id
                  ? selectedBooking._id.slice(-8)
                  : "N/A"}
              </span>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;