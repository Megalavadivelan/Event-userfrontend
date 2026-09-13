import React, {
  useState,
} from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import axios from "axios";

import "../styles/BookTickets.css";

const BOOKING_API =
  "https://user-api-iota-six.vercel.app/booking/create";

const BookTickets = () => {
  const navigate =
    useNavigate();

  const location =
    useLocation();

  const event =
    location.state?.event;

  const [ticketCount, setTicketCount] =
    useState(1);

  const [attendees, setAttendees] =
    useState([
      {
        name: "",
        email: "",
        phone: "",
      },
    ]);

  const [submitting, setSubmitting] =
    useState(false);

  // =====================================================
  // EVENT NOT FOUND
  // =====================================================

  if (!event) {
    return (
      <div className="booking-error-page">
        <div className="booking-error-card">

          <h2>
            Event not found
          </h2>

          <p>
            Please select an event
            before booking.
          </p>

          <button
            onClick={() =>
              navigate("/events")
            }
          >
            Back to Events
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

  const eventName =
    event.name ||
    event.eventName ||
    event.title ||
    "Untitled Event";

  const ticketPrice =
    Number(
      event.ticketPrice ??
        event.price ??
        event.amount ??
        0
    );

  // =====================================================
  // DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "Date unavailable";
    }

    try {
      return new Date(
        date
      ).toLocaleDateString(
        "en-IN",
        {
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
  // CHANGE TICKET COUNT
  // =====================================================

  const handleTicketChange = (
    count
  ) => {
    if (
      count < 1 ||
      count > 4
    ) {
      return;
    }

    setTicketCount(count);

    setAttendees((previous) => {
      const updated = [
        ...previous,
      ];

      while (
        updated.length < count
      ) {
        updated.push({
          name: "",
          email: "",
          phone: "",
        });
      }

      return updated.slice(
        0,
        count
      );
    });
  };

  // =====================================================
  // ATTENDEE CHANGE
  // =====================================================

  const handleAttendeeChange = (
    index,
    field,
    value
  ) => {
    setAttendees(
      (previous) => {
        const updated = [
          ...previous,
        ];

        updated[index] = {
          ...updated[index],
          [field]: value,
        };

        return updated;
      }
    );
  };

  // =====================================================
  // VALIDATION
  // =====================================================

  const validateBooking = () => {
    for (
      let i = 0;
      i < attendees.length;
      i++
    ) {
      const attendee =
        attendees[i];

      if (
        !attendee.name.trim() ||
        !attendee.email.trim() ||
        !attendee.phone.trim()
      ) {
        alert(
          `Please fill all details for Attendee ${
            i + 1
          }.`
        );

        return false;
      }

      const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (
        !emailPattern.test(
          attendee.email
        )
      ) {
        alert(
          `Please enter a valid email for Attendee ${
            i + 1
          }.`
        );

        return false;
      }

      const phonePattern =
        /^[6-9]\d{9}$/;

      if (
        !phonePattern.test(
          attendee.phone
        )
      ) {
        alert(
          `Please enter a valid 10-digit phone number for Attendee ${
            i + 1
          }.`
        );

        return false;
      }
    }

    return true;
  };

  // =====================================================
  // CONFIRM BOOKING
  // =====================================================

  const handleConfirmBooking =
    async () => {
      if (
        submitting
      ) {
        return;
      }

      if (
        !validateBooking()
      ) {
        return;
      }

      try {
        setSubmitting(true);

        // ===============================================
        // GET LOGGED-IN USER
        // ===============================================

        const storedUser =
          localStorage.getItem(
            "user"
          );

        if (!storedUser) {
          alert(
            "Please login before booking a ticket."
          );

          navigate("/");
          return;
        }

        const user =
          JSON.parse(
            storedUser
          );

        // ===============================================
        // USER ID
        // ===============================================

        const userId =
          user.id ||
          user._id ||
          user.userId;

        const userName =
          user.name ||
          user.userName ||
          "";

        const userEmail =
          user.email ||
          user.userEmail ||
          "";

        if (
          !userId ||
          !userName ||
          !userEmail
        ) {
          alert(
            "User information is missing. Please login again."
          );

          localStorage.removeItem(
            "user"
          );

          localStorage.removeItem(
            "token"
          );

          localStorage.removeItem(
            "authToken"
          );

          navigate("/");
          return;
        }

        // ===============================================
        // EVENT ID
        // ===============================================

        if (!eventId) {
          alert(
            "Event ID is missing."
          );

          navigate("/events");
          return;
        }

        // ===============================================
        // TOTAL
        // ===============================================

        const totalAmount =
          ticketPrice *
          ticketCount;

        // ===============================================
        // BOOKING DATA
        // ===============================================

        const bookingData = {
          userId,

          userName,

          userEmail,

          eventId,

          eventName,

          eventDate:
            event.date || null,

          eventTime:
            event.time || "",

          eventLocation:
            event.location ||
            event.venue ||
            "",

          eventCategory:
            event.category ||
            event.eventCategory ||
            "Event",

          ticketPrice,

          numberOfTickets:
            ticketCount,

          attendees,

          totalAmount,
        };

        console.log(
          "SENDING BOOKING:",
          bookingData
        );

        // ===============================================
        // CREATE BOOKING
        // ===============================================

        const response =
          await axios.post(
            BOOKING_API,
            bookingData
          );

        console.log(
          "BOOKING RESPONSE:",
          response.data
        );

        if (
          response.data?.success
        ) {
          alert(
            "Ticket booked successfully!"
          );

          // Go to My Bookings
          navigate(
            "/mybookings"
          );
        } else {
          alert(
            response.data
              ?.message ||
              "Booking failed."
          );
        }
      } catch (error) {
        console.error(
          "BOOKING ERROR:",
          error.response
            ?.data || error
        );

        alert(
          error.response?.data
            ?.message ||
            "Unable to book ticket. Please try again."
        );
      } finally {
        setSubmitting(false);
      }
    };

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <section className="booking-page">

      <div className="booking-sparkle booking-sparkle-1">
        ✦
      </div>

      <div className="booking-sparkle booking-sparkle-2">
        ✦
      </div>

      <div className="booking-sparkle booking-sparkle-3">
        ✦
      </div>

      <div className="booking-header">

        <button
          className="booking-back-btn"
          onClick={() =>
            navigate(-1)
          }
        >
          ← Back
        </button>

        <div>
          <span className="booking-small-title">
            ✦ EVENTORA
          </span>

          <h1>
            Book Your{" "}
            <span>
              Tickets
            </span>
          </h1>

          <p>
            Reserve your seats
            and share attendee
            details.
          </p>
        </div>

      </div>

      <div className="booking-container">

        {/* EVENT SUMMARY */}

        <div className="booking-event-card">

          <div className="booking-event-info">

            <span className="booking-event-category">
              {event.category ||
                event.eventCategory ||
                "EVENT"}
            </span>

            <h2>
              {eventName}
            </h2>

            <div className="booking-event-details">

              <span>
                📅{" "}
                {formatDate(
                  event.date
                )}
              </span>

              <span>
                📍{" "}
                {event.location ||
                  event.venue ||
                  "Location unavailable"}
              </span>

              {event.time && (
                <span>
                  🕐{" "}
                  {event.time}
                </span>
              )}

            </div>

            <div className="booking-price">

              <span>
                Ticket Price
              </span>

              <strong>
                {ticketPrice > 0
                  ? `₹${ticketPrice}`
                  : "Free"}
              </strong>

            </div>

          </div>

        </div>

        {/* TICKET COUNT */}

        <div className="booking-section">

          <div className="booking-section-title">

            <span className="step-number">
              01
            </span>

            <div>
              <h2>
                Number of Tickets
              </h2>

              <p>
                You can book maximum
                4 tickets.
              </p>
            </div>

          </div>

          <div className="ticket-counter">

            <button
              onClick={() =>
                handleTicketChange(
                  ticketCount - 1
                )
              }
              disabled={
                ticketCount === 1
              }
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
              disabled={
                ticketCount === 4
              }
            >
              +
            </button>

          </div>

          <div className="ticket-limit">
            Maximum 4 tickets
            per booking
          </div>

        </div>

        {/* ATTENDEE DETAILS */}

        <div className="booking-section">

          <div className="booking-section-title">

            <span className="step-number">
              02
            </span>

            <div>
              <h2>
                Attendee Details
              </h2>

              <p>
                Enter details for
                each ticket holder.
              </p>
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
              (
                attendee,
                index
              ) => (
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

                    <div className="form-group">

                      <label>
                        Phone Number
                      </label>

                      <input
                        type="tel"
                        maxLength="10"
                        placeholder="10-digit phone number"
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

        {/* SUMMARY */}

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
              {ticketPrice > 0
                ? `₹${
                    ticketPrice *
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
            disabled={submitting}
          >
            {submitting
              ? "Booking..."
              : "Confirm Booking"}

            {!submitting && (
              <span>
                →
              </span>
            )}
          </button>

        </div>

      </div>
    </section>
  );
};

export default BookTickets;