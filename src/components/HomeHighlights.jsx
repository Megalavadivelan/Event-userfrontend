import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/HomeHighlights.css";

const EVENTS_API =
  "https://api-admin-rouge.vercel.app/events/getevents";

function HomeHighlights() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true);

  /* =====================================================
     FETCH EVENTS
  ===================================================== */

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(EVENTS_API);

        console.log(
          "HOME EVENTS RESPONSE:",
          response.data
        );

        let eventData = [];

        if (Array.isArray(response.data)) {
          eventData = response.data;
        } else if (Array.isArray(response.data.data)) {
          eventData = response.data.data;
        } else if (
          Array.isArray(response.data.events)
        ) {
          eventData = response.data.events;
        }

        setEvents(eventData.slice(0, 4));
      } catch (error) {
        console.error(
          "Failed to fetch events:",
          error
        );

        setEvents([]);
      } finally {
        setEventsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  /* =====================================================
     IMAGE URL
  ===================================================== */

  const getImageUrl = (item) => {
    if (!item) return null;

    const image =
      item.image ||
      item.poster ||
      item.imageUrl ||
      item.eventImage ||
      item.photo;

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

    // Relative image path
    const baseURL =
      "https://api-admin-rouge.vercel.app";

    return `${baseURL}/${image.replace(/^\/+/, "")}`;
  };

  /* =====================================================
     EVENT DATE
  ===================================================== */

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    try {
      return new Date(date).toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      );
    } catch {
      return date;
    }
  };

  /* =====================================================
     EVENT ID
  ===================================================== */

  const openEvent = (event) => {
    const id = event._id || event.id;

    if (!id) return;

    navigate(`/eventdetails/${id}`);
  };

  return (
    <section className="home-highlights">

      {/* =================================================
          BACKGROUND SPARKLES
      ================================================= */}

      <div className="home-sparkle home-sparkle-1"></div>
      <div className="home-sparkle home-sparkle-2"></div>
      <div className="home-sparkle home-sparkle-3"></div>
      <div className="home-sparkle home-sparkle-4"></div>
      <div className="home-sparkle home-sparkle-5"></div>

      {/* =================================================
          EVENTS SECTION
      ================================================= */}

      <div className="highlight-section events-highlight-section">

        <div className="section-heading-row">

          <div>
            <span className="section-small-title">
              ✦ DON'T MISS OUT
            </span>

            <h2>
              Upcoming{" "}
              <span>Events</span>
            </h2>

            <p>
              Find something exciting and make
              your next experience unforgettable.
            </p>
          </div>

          <button
            className="view-all-btn"
            onClick={() => navigate("/events")}
          >
            View All
            <span>→</span>
          </button>

        </div>

        <div className="home-events-grid">

          {eventsLoading ? (
            <>
              {[1, 2, 3, 4].map((item) => (
                <div
                  className="event-home-skeleton"
                  key={item}
                ></div>
              ))}
            </>
          ) : events.length > 0 ? (
            events.map((event, index) => {

              const imageUrl =
                getImageUrl(event);

              const eventName =
                event.name ||
                event.eventName ||
                event.title ||
                "Untitled Event";

              const eventPrice =
                event.ticketPrice ??
                event.price ??
                event.amount;

              return (
                <div
                  className="home-event-card"
                  key={
                    event._id ||
                    event.id ||
                    index
                  }
                  onClick={() =>
                    openEvent(event)
                  }
                >

                  <div className="home-event-image">

                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={eventName}
                      />
                    ) : (
                      <div className="event-home-placeholder">
                        ✨
                      </div>
                    )}

                    <span className="home-event-category">
                      {event.category ||
                        event.eventCategory ||
                        "Event"}
                    </span>

                  </div>

                  <div className="home-event-content">

                    <h3>
                      {eventName}
                    </h3>

                    <div className="home-event-meta">

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

                    </div>

                    <div className="home-event-bottom">

                      <strong>
                        {eventPrice !==
                          undefined &&
                        eventPrice !== null
                          ? `₹${eventPrice}`
                          : "Free"}
                      </strong>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openEvent(event);
                        }}
                      >
                        View Details →
                      </button>

                    </div>

                  </div>

                </div>
              );
            })
          ) : (
            <div className="empty-highlight">
              <span>🎟️</span>
              <p>No upcoming events</p>
            </div>
          )}

        </div>

      </div>

      {/* =================================================
          HAPPY ORGANIZERS
      ================================================= */}

      <div className="organizers-section">

        <div className="organizers-heading">

          <span className="section-small-title">
            ✦ OUR COMMUNITY
          </span>

          <h2>
            Happy{" "}
            <span>Organizers</span>
          </h2>

          <p>
            See what organizers have to say
            about their Eventora experience.
          </p>

        </div>

        <div className="organizer-cards">

          <div className="organizer-card">

            <div className="quote-icon">
              “
            </div>

            <p>
              Eventora made organizing our event
              incredibly simple. Everything was
              smooth and well managed.
            </p>

            <div className="organizer-user">

              <div className="organizer-avatar">
                A
              </div>

              <div>
                <strong>
                  Arun Kumar
                </strong>

                <span>
                  Event Organizer
                </span>
              </div>

            </div>

          </div>

          <div className="organizer-card">

            <div className="quote-icon">
              “
            </div>

            <p>
              We were able to reach more people
              and manage registrations easily.
              A great platform for events.
            </p>

            <div className="organizer-user">

              <div className="organizer-avatar">
                S
              </div>

              <div>
                <strong>
                  Sneha Priya
                </strong>

                <span>
                  Event Organizer
                </span>
              </div>

            </div>

          </div>

          <div className="organizer-card">

            <div className="quote-icon">
              “
            </div>

            <p>
              From creating the event to connecting
              with attendees, Eventora made the
              whole experience effortless.
            </p>

            <div className="organizer-user">

              <div className="organizer-avatar">
                R
              </div>

              <div>
                <strong>
                  Rahul Dev
                </strong>

                <span>
                  Event Organizer
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default HomeHighlights;