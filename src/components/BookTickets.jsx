import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/BookTickets.css";

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // EventDetails page-la irundhu event object pass pannuvom
  const event = location.state?.event;

  const [ticketCount, setTicketCount] = useState(1);

  const [attendees, setAttendees] = useState([
    {
      name: "",
      email: "",
      phone: "",
    },
  ]);

  // Event data illana
  if (!event) {
    return (
      <div className="booking-error-page">
        <div className="booking-error-card">
          <h2>Event not found</h2>

          <p>
            Please select an event and try booking again.
          </p>

          <button
            onClick={() => navigate("/events")}
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  // =========================================
  // IMAGE URL
  // =========================================

  const getImageUrl = () => {
    const image =
      event.image ||
      event.poster ||
      event.imageUrl ||
      event.eventImage;

    if (!image) {
      return null;
    }

    if (image.startsWith("data:image")) {
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

  // =========================================
  // EVENT NAME
  // =========================================

  const eventName =
    event.name ||
    event.eventName ||
    event.title ||
    "Untitled Event";

  // =========================================
  // PRICE
  // =========================================

  const ticketPrice =
    event.ticketPrice ??
    event.price ??
    event.amount ??
    0;

  // =========================================
  // DATE
  // =========================================

  const formatDate = (date) => {
    if (!date) {
      return "Date unavailable";
    }

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =========================================
  // CHANGE TICKET COUNT
  // =========================================

  const handleTicketChange = (count) => {
    if (count < 1 || count > 4) {
      return;
    }

    setTicketCount(count);

    setAttendees((previous) => {
      const updated = [...previous];

      while (updated.length < count) {
        updated.push({
          name: "",
          email: "",
          phone: "",
        });
      }

      return updated.slice(0, count);
    });
  };

  // =========================================
  // ATTENDEE INPUT CHANGE
  // =========================================

  const handleAttendeeChange = (
    index,
    field,
    value
  ) => {
    setAttendees((previous) => {
      const updated = [...previous];

      updated[index] = {
        ...updated[index],
        [field]: value,
      };

      return updated;
    });
  };

  // =========================================
  // VALIDATION
  // =========================================

  const validateBooking = () => {
    for (let i = 0; i < attendees.length; i++) {
      const attendee = attendees[i];

      if (
        !attendee.name.trim() ||
        !attendee.email.trim() ||
        !attendee.phone.trim()
      ) {
        alert(
          `Please fill all details for Attendee ${
            i + 1
          }`
        );

        return false;
      }

      // Simple email validation
      const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(attendee.email)) {
        alert(
          `Please enter a valid email for Attendee ${
            i + 1
          }`
        );

        return false;
      }

      // Indian phone number validation
      const phonePattern = /^[6-9]\d{9}$/;

      if (!phonePattern.test(attendee.phone)) {
        alert(
          `Please enter a valid 10-digit phone number for Attendee ${
            i + 1
          }`
        );

        return false;
      }
    }

    return true;
  };

  // =========================================
  // CONFIRM BOOKING
  // =========================================

  const handleConfirmBooking = async () => {
  if (!validateBooking()) {
    return;
  }

  try {
    const user = JSON.parse(localStorage.getItem("user"));

    console.log("LOGGED IN USER:", user);

    if (!user) {
      alert("Please login before booking a ticket.");
      navigate("/");
      return;
    }

    const bookingData = {
  userId: user.id || user._id,
  userName: user.name,
  userEmail: user.email,

  eventId: event._id || event.id,
  eventName: eventName,
  eventDate: event.date,

  ticketPrice: Number(ticketPrice) || 0,
  numberOfTickets: ticketCount,

  attendees: attendees,

  totalAmount:
    (Number(ticketPrice) || 0) * ticketCount,
};
    

    console.log("BOOKING DATA:", bookingData);

    await axios.post(
  "https://user-api-iota-six.vercel.app/booking/create",
  bookingData
);

    console.log("BOOKING RESPONSE:", response.data);

    if (response.data.success) {
      alert("Ticket booked successfully!");

      navigate("/mybookings");
    } else {
      alert(
        response.data.message ||
          "Booking failed."
      );
    }

  } catch (error) {
    console.error(
      "BOOKING ERROR:",
      error.response?.data || error
    );

    alert(
      error.response?.data?.message ||
        "Unable to book ticket. Please try again."
    );
  }
};
  const imageUrl = getImageUrl();

  return (
    <section className="booking-page">

      {/* =========================================
          BACKGROUND
      ========================================= */}

      <div className="booking-sparkle booking-sparkle-1">
        ✦
      </div>

      <div className="booking-sparkle booking-sparkle-2">
        ✦
      </div>

      <div className="booking-sparkle booking-sparkle-3">
        ✦
      </div>

      {/* =========================================
          HEADER
      ========================================= */}

      <div className="booking-header">

        <button
          className="booking-back-btn"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <div>
          <span className="booking-small-title">
            ✦ EVENTORA
          </span>

          <h1>
            Book Your <span>Tickets</span>
          </h1>

          <p>
            Reserve your seats and share attendee
            details.
          </p>
        </div>

      </div>

      {/* =========================================
          MAIN CONTAINER
      ========================================= */}

      <div className="booking-container">

        {/* =========================================
            EVENT SUMMARY
        ========================================= */}

        <div className="booking-event-card">

          <div className="booking-event-image">

            {imageUrl ? (
              <img
                src={imageUrl}
                alt={eventName}
              />
            ) : (
              <div className="booking-image-placeholder">
                ✨
              </div>
            )}

          </div>

          <div className="booking-event-info">

            <span className="booking-event-category">
              {event.category ||
                event.eventCategory ||
                "EVENT"}
            </span>

            <h2>{eventName}</h2>

            <div className="booking-event-details">

              <span>
                📅{" "}
                {formatDate(event.date)}
              </span>

              <span>
                📍{" "}
                {event.location ||
                  event.venue ||
                  "Location unavailable"}
              </span>

              {event.time && (
                <span>
                  🕐 {event.time}
                </span>
              )}

            </div>

            <div className="booking-price">

              <span>Ticket Price</span>

              <strong>
                {Number(ticketPrice) > 0
                  ? `₹${ticketPrice}`
                  : "Free"}
              </strong>

            </div>

          </div>

        </div>

        {/* =========================================
            TICKET COUNT
        ========================================= */}

        <div className="booking-section">

          <div className="booking-section-title">

            <div>
              <span className="step-number">
                01
              </span>

              <div>
                <h2>
                  Number of Tickets
                </h2>

                <p>
                  You can book maximum 4 tickets.
                </p>
              </div>
            </div>

          </div>

          <div className="ticket-counter">

            <button
              onClick={() =>
                handleTicketChange(
                  ticketCount - 1
                )
              }
              disabled={ticketCount === 1}
            >
              −
            </button>

            <div className="ticket-count">
              <strong>
                {ticketCount}
              </strong>

              <span>
                {ticketCount === 1
                  ? "Ticket"
                  : "Tickets"}
              </span>
            </div>

            <button
              onClick={() =>
                handleTicketChange(
                  ticketCount + 1
                )
              }
              disabled={ticketCount === 4}
            >
              +
            </button>

          </div>

          <div className="ticket-limit">
            Maximum 4 tickets per booking
          </div>

        </div>

        {/* =========================================
            ATTENDEE DETAILS
        ========================================= */}

        <div className="booking-section">

          <div className="booking-section-title">

            <div>
              <span className="step-number">
                02
              </span>

              <div>
                <h2>
                  Attendee Details
                </h2>

                <p>
                  Enter details for each ticket
                  holder.
                </p>
              </div>
            </div>

            <span className="attendee-count">
              {ticketCount}{" "}
              {ticketCount === 1
                ? "Attendee"
                : "Attendees"}
            </span>

          </div>

          <div className="attendees-container">

            {attendees.map(
              (attendee, index) => (
                <div
                  className="attendee-card"
                  key={index}
                >

                  <div className="attendee-header">

                    <div className="attendee-number">
                      {index + 1}
                    </div>

                    <div>
                      <h3>
                        Attendee{" "}
                        {index + 1}
                      </h3>

                      <span>
                        Ticket{" "}
                        {index + 1}
                      </span>
                    </div>

                  </div>

                  <div className="attendee-form">

                    {/* NAME */}

                    <div className="form-group">

                      <label>
                        Full Name
                      </label>

                      <input
                        type="text"
                        placeholder="Enter attendee name"
                        value={
                          attendee.name
                        }
                        onChange={(e) =>
                          handleAttendeeChange(
                            index,
                            "name",
                            e.target.value
                          )
                        }
                      />

                    </div>

                    {/* EMAIL */}

                    <div className="form-group">

                      <label>
                        Email Address
                      </label>

                      <input
                        type="email"
                        placeholder="Enter email address"
                        value={
                          attendee.email
                        }
                        onChange={(e) =>
                          handleAttendeeChange(
                            index,
                            "email",
                            e.target.value
                          )
                        }
                      />

                    </div>

                    {/* PHONE */}

                    <div className="form-group">

                      <label>
                        Phone Number
                      </label>

                      <input
                        type="tel"
                        placeholder="10-digit phone number"
                        maxLength="10"
                        value={
                          attendee.phone
                        }
                        onChange={(e) =>
                          handleAttendeeChange(
                            index,
                            "phone",
                            e.target.value.replace(
                              /\D/g,
                              ""
                            )
                          )
                        }
                      />

                    </div>

                  </div>

                </div>
              )
            )}

          </div>

        </div>

        {/* =========================================
            BOOKING SUMMARY
        ========================================= */}

        <div className="booking-summary">

          <div className="summary-left">

            <span>
              Total Tickets
            </span>

            <strong>
              {ticketCount}
            </strong>

          </div>

          <div className="summary-middle">

            <span>
              Total Amount
            </span>

            <strong>
              {Number(ticketPrice) > 0
                ? `₹${
                    Number(ticketPrice) *
                    ticketCount
                  }`
                : "Free"}
            </strong>

          </div>

          <button
            className="confirm-booking-btn"
            onClick={
              handleConfirmBooking
            }
          >
            Confirm Booking
            <span>→</span>
          </button>

        </div>

      </div>

    </section>
  );
};

export default Booking;