import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import "../styles/EventDetails.css";

const EventDetails = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  // =====================================================
  // SAME SAMPLE EVENTS
  // =====================================================

  const events = [
    {
      _id: "event001",
      eventName: "Tech Innovation Summit 2026",
      category: "Technology",
      description:
        "A technology summit featuring Artificial Intelligence, Cloud Computing, Cybersecurity and modern software development. This event brings together students, developers, technology enthusiasts and industry professionals to explore the latest innovations.",
      date: "25 September 2026",
      time: "10:00 AM - 4:00 PM",
      venue: "Chennai Trade Centre",
      location: "Chennai",
      price: 499,
      totalSeats: 500,
      availableSeats: 235,
      organizerName: "Tech Community India",
      organizerEmail: "tech@example.com",
      organizerPhone: "9876543210",
      poster:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    },

    {
      _id: "event002",
      eventName: "Music & Cultural Night",
      category: "Music",
      description:
        "An exciting evening filled with live music, cultural performances, food and entertainment. Experience an unforgettable night with artists and performers from across Tamil Nadu.",
      date: "28 September 2026",
      time: "6:00 PM - 10:00 PM",
      venue: "YMCA Grounds",
      location: "Coimbatore",
      price: 299,
      totalSeats: 1000,
      availableSeats: 680,
      organizerName: "Cultural Events India",
      organizerEmail: "culture@example.com",
      organizerPhone: "9876543211",
      poster:
        "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80",
    },

    {
      _id: "event003",
      eventName: "AI & Machine Learning Workshop",
      category: "Workshop",
      description:
        "A hands-on workshop covering Artificial Intelligence, Machine Learning, Python and real-world AI applications. Participants will learn the basics of machine learning and how AI is used in modern applications.",
      date: "3 October 2026",
      time: "9:30 AM - 3:30 PM",
      venue: "KCT Innovation Centre",
      location: "Coimbatore",
      price: 799,
      totalSeats: 200,
      availableSeats: 74,
      organizerName: "AI Developers Club",
      organizerEmail: "ai@example.com",
      organizerPhone: "9876543212",
      poster:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
    },

    {
      _id: "event004",
      eventName: "Startup & Entrepreneurship Meet",
      category: "Business",
      description:
        "Meet entrepreneurs, startup founders and business professionals. Learn about startups, funding, business development and building successful companies.",
      date: "10 October 2026",
      time: "10:00 AM - 5:00 PM",
      venue: "Hotel Grand Chennai",
      location: "Chennai",
      price: 999,
      totalSeats: 300,
      availableSeats: 120,
      organizerName: "Startup Tamil Nadu",
      organizerEmail: "startup@example.com",
      organizerPhone: "9876543213",
      poster:
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
    },

    {
      _id: "event005",
      eventName: "Free Coding Bootcamp",
      category: "Education",
      description:
        "A free coding bootcamp for students covering programming fundamentals, web development and problem solving. This program is suitable for beginners who want to start their programming journey.",
      date: "15 October 2026",
      time: "9:00 AM - 4:00 PM",
      venue: "Government Engineering College",
      location: "Salem",
      price: 0,
      totalSeats: 250,
      availableSeats: 145,
      organizerName: "Code Community",
      organizerEmail: "coding@example.com",
      organizerPhone: "9876543214",
      poster:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    },

    {
      _id: "event006",
      eventName: "Photography & Creative Arts Exhibition",
      category: "Arts",
      description:
        "Explore photography, digital art, paintings and creative works from talented artists. Discover creative work from emerging artists and photographers.",
      date: "20 October 2026",
      time: "11:00 AM - 7:00 PM",
      venue: "Art Gallery",
      location: "Bangalore",
      price: 199,
      totalSeats: 400,
      availableSeats: 310,
      organizerName: "Creative Arts Society",
      organizerEmail: "arts@example.com",
      organizerPhone: "9876543215",
      poster:
        "https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  // =====================================================
  // FIND EVENT
  // =====================================================

  const event = events.find(
    (item) => item._id === id
  );

  // =====================================================
  // EVENT NOT FOUND
  // =====================================================

  if (!event) {

    return (
      <div className="details-error">

        <div className="details-error-icon">
          🎫
        </div>

        <h2>
          Event Not Found
        </h2>

        <p>
          The event you are looking for
          does not exist.
        </p>

        <button
          onClick={() =>
            navigate("/events")
          }
        >
          ← Back to Events
        </button>

      </div>
    );

  }

  // =====================================================
  // MAIN
  // =====================================================

  return (

    <div className="event-details-page">

      {/* BACK */}

      <button
        className="details-back"
        onClick={() =>
          navigate("/events")
        }
      >
        ← Back to Events
      </button>

      {/* MAIN CONTAINER */}

      <div className="event-details-container">

        {/* =========================================
            POSTER
        ========================================= */}

        <div className="details-poster">

          <img
            src={event.poster}
            alt={event.eventName}
          />

        </div>

        {/* =========================================
            CONTENT
        ========================================= */}

        <div className="details-information">

          <span className="details-category">
            {event.category}
          </span>

          <h1>
            {event.eventName}
          </h1>

          <p className="details-description">
            {event.description}
          </p>

          {/* =====================================
              EVENT INFORMATION
          ===================================== */}

          <div className="details-info-grid">

            <div className="detail-info-item">

              <div className="detail-icon">
                📅
              </div>

              <div>
                <small>
                  Date
                </small>

                <strong>
                  {event.date}
                </strong>
              </div>

            </div>

            <div className="detail-info-item">

              <div className="detail-icon">
                🕐
              </div>

              <div>
                <small>
                  Time
                </small>

                <strong>
                  {event.time}
                </strong>
              </div>

            </div>

            <div className="detail-info-item">

              <div className="detail-icon">
                📍
              </div>

              <div>
                <small>
                  Venue
                </small>

                <strong>
                  {event.venue}
                </strong>
              </div>

            </div>

            <div className="detail-info-item">

              <div className="detail-icon">
                🌍
              </div>

              <div>
                <small>
                  Location
                </small>

                <strong>
                  {event.location}
                </strong>
              </div>

            </div>

          </div>

          {/* =====================================
              PRICE & SEATS
          ===================================== */}

          <div className="details-booking-info">

            <div>

              <small>
                Ticket Price
              </small>

              <strong className="ticket-price">

                {event.price === 0
                  ? "Free"
                  : `₹${event.price}`}

              </strong>

            </div>

            <div>

              <small>
                Total Seats
              </small>

              <strong>
                {event.totalSeats}
              </strong>

            </div>

            <div>

              <small>
                Available
              </small>

              <strong>
                {event.availableSeats}
              </strong>

            </div>

          </div>

          {/* =====================================
              ORGANIZER
          ===================================== */}

          <div className="organizer-box">

            <h3>
              Organized by
            </h3>

            <p>
              {event.organizerName}
            </p>

            <div className="organizer-contact">

              <span>
                ✉ {event.organizerEmail}
              </span>

              <span>
                ☎ {event.organizerPhone}
              </span>

            </div>

          </div>

          {/* =====================================
              BOOK BUTTON
          ===================================== */}

          <button
            className="book-event-button"
            onClick={() => {
              alert(
                "Booking feature will be connected next."
              );
            }}
          >
            Book This Event
            <span>
              →
            </span>
          </button>

        </div>

      </div>

    </div>
  );
};

export default EventDetails;