import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Events.css";

const EVENTS_API =
  "https://api-admin-rouge.vercel.app/events/getevents";

const Events = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categories = [
    "All",
    "Music",
    "Technology",
    "Sports",
    "Workshop",
    "Conference",
    "Cultural",
    "Business",
  ];

  // ===================================================
  // FETCH EVENTS
  // ===================================================

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(EVENTS_API);

      console.log(
        "EVENT API RESPONSE:",
        JSON.stringify(response.data, null, 2)
      );

      // Your API response:
      // {
      //   success: true,
      //   data: [...]
      // }

      let eventData = [];

      if (Array.isArray(response.data)) {
        eventData = response.data;
      } else if (Array.isArray(response.data.data)) {
        eventData = response.data.data;
      } else if (Array.isArray(response.data.events)) {
        eventData = response.data.events;
      }

      console.log("EVENT DATA:", eventData);

      setEvents(eventData);
      setFilteredEvents(eventData);
    } catch (error) {
      console.error("Failed to fetch events:", error);

      setError("Unable to load events. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ===================================================
  // FETCH WHEN PAGE LOADS
  // ===================================================

  useEffect(() => {
    fetchEvents();
  }, []);

  // ===================================================
  // SEARCH + CATEGORY FILTER
  // ===================================================

  useEffect(() => {
    let result = [...events];

    // SEARCH
    if (search.trim() !== "") {
      const searchText = search.toLowerCase();

      result = result.filter((event) => {
        const eventName = (
          event.name ||
          event.eventName ||
          event.title ||
          ""
        ).toLowerCase();

        const description = (
          event.description ||
          event.details ||
          ""
        ).toLowerCase();

        const location = (
          event.location ||
          event.venue ||
          ""
        ).toLowerCase();

        const eventCategory = (
          event.category ||
          event.eventCategory ||
          ""
        ).toLowerCase();

        const organizer = (
          event.organizer ||
          ""
        ).toLowerCase();

        return (
          eventName.includes(searchText) ||
          description.includes(searchText) ||
          location.includes(searchText) ||
          eventCategory.includes(searchText) ||
          organizer.includes(searchText)
        );
      });
    }

    // CATEGORY FILTER
    if (category !== "All") {
      result = result.filter((event) => {
        const eventCategory =
          event.category ||
          event.eventCategory ||
          "";

        return (
          eventCategory.toLowerCase() ===
          category.toLowerCase()
        );
      });
    }

    setFilteredEvents(result);
  }, [search, category, events]);

  // ===================================================
  // OPEN EVENT DETAILS
  // ===================================================

  const handleEventClick = (event) => {
    const eventId = event._id || event.id;

    if (!eventId) {
      console.error("Event ID not found:", event);
      return;
    }

    navigate(`/eventdetails/${eventId}`);
  };

  // ===================================================
  // FORMAT DATE
  // ===================================================

  const formatDate = (date) => {
    if (!date) {
      return "Date not available";
    }

    try {
      return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return date;
    }
  };

  // ===================================================
  // IMAGE URL
  // ===================================================

  const getImageUrl = (event) => {
    const image =
      event.image ||
      event.poster ||
      event.imageUrl ||
      event.eventImage;

    if (!image) {
      return null;
    }

    // IMPORTANT:
    // Admin API is returning Base64 image like:
    // data:image/jpeg;base64,/9j/4AAQ...
    //
    // We must use it directly.

    if (image.startsWith("data:image")) {
      return image;
    }

    // Already a complete URL
    if (
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {
      return image;
    }

    // Relative upload path
    return `https://api-admin-rouge.vercel.app/${image.replace(
      /^\/+/,
      ""
    )}`;
  };

  // ===================================================
  // LOADING
  // ===================================================

  if (loading) {
    return (
      <div className="events-page">
        <div className="sparkle sparkle-1"></div>
        <div className="sparkle sparkle-2"></div>
        <div className="sparkle sparkle-3"></div>

        <div className="events-loading">
          <div className="loading-spinner"></div>
          <p>Loading events...</p>
        </div>
      </div>
    );
  }

  // ===================================================
  // PAGE
  // ===================================================

  return (
    <div className="events-page">

      {/* LIMITED BACKGROUND SPARKLES */}

      <div className="sparkle sparkle-1"></div>
      <div className="sparkle sparkle-2"></div>
      <div className="sparkle sparkle-3"></div>
      <div className="sparkle sparkle-4"></div>
      <div className="sparkle sparkle-5"></div>

      {/* =================================================
          TOP ROW
      ================================================= */}

      <div className="events-top-row">

        {/* TITLE */}

        <h1 className="events-title">
          Events
        </h1>

        {/* SEARCH */}

        <div className="search-container">
          <span className="search-icon">
            🔍
          </span>

          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        {/* CATEGORY FILTER */}

        <div className="category-container">
          <span className="category-label">
            Category:
          </span>

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >
            {categories.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div className="events-error">
          <p>{error}</p>

          <button onClick={fetchEvents}>
            Try Again
          </button>
        </div>
      )}

      {/* =================================================
          EVENT COUNT
      ================================================= */}

      {!error && (
        <div className="event-count">
          {filteredEvents.length}{" "}
          {filteredEvents.length === 1
            ? "Event"
            : "Events"}{" "}
          Available
        </div>
      )}

      {/* =================================================
          NO EVENTS
      ================================================= */}

      {!error &&
        filteredEvents.length === 0 && (
          <div className="no-events">

            <div className="no-events-icon">
              ✨
            </div>

            <h2>
              No Events Found
            </h2>

            <p>
              Try changing your search
              or category filter.
            </p>

          </div>
        )}

      {/* =================================================
          EVENT CARDS
      ================================================= */}

      <div className="events-grid">

        {filteredEvents.map(
          (event, index) => {

            const imageUrl =
              getImageUrl(event);

            // YOUR ADMIN API USES "name"
            const eventName =
              event.name ||
              event.eventName ||
              event.title ||
              "Untitled Event";

            const eventCategory =
              event.category ||
              event.eventCategory ||
              "Event";

            const eventLocation =
              event.location ||
              event.venue ||
              "Location not available";

            const eventDate =
              event.date ||
              event.eventDate;

            // YOUR ADMIN API USES "ticketPrice"
            const eventPrice =
              event.ticketPrice ??
              event.price ??
              event.amount;

            return (
              <div
                className="event-card"
                key={
                  event._id ||
                  event.id ||
                  index
                }
                onClick={() =>
                  handleEventClick(event)
                }
              >

                {/* EVENT IMAGE */}

                <div className="event-image-container">

                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={eventName}
                      className="event-image"
                    />
                  ) : (
                    <div className="event-image-placeholder">
                      <span>✨</span>

                      <p>
                        Event
                      </p>
                    </div>
                  )}

                  {/* CATEGORY */}

                  <span className="event-category">
                    {eventCategory}
                  </span>

                </div>

                {/* CARD CONTENT */}

                <div className="event-card-content">

                  <h2>
                    {eventName}
                  </h2>

                  <p className="event-description">
                    {event.description ||
                      event.details ||
                      "No description available."}
                  </p>

                  {/* DATE */}

                  <div className="event-info">
                    <span>
                      📅
                    </span>

                    <span>
                      {formatDate(eventDate)}
                    </span>
                  </div>

                  {/* TIME */}

                  {event.time && (
                    <div className="event-info">
                      <span>
                        ⏰
                      </span>

                      <span>
                        {event.time}
                      </span>
                    </div>
                  )}

                  {/* LOCATION */}

                  <div className="event-info">
                    <span>
                      📍
                    </span>

                    <span>
                      {eventLocation}
                    </span>
                  </div>

                  {/* PRICE */}

                  <div className="event-bottom">

                    <div className="event-price">

                      {eventPrice !== undefined &&
                      eventPrice !== null ? (
                        <>
                          ₹{eventPrice}
                        </>
                      ) : (
                        "Free"
                      )}

                    </div>

                    <button
                      className="view-event-btn"
                      onClick={(e) => {
                        e.stopPropagation();

                        handleEventClick(event);
                      }}
                    >
                      View Details →
                    </button>

                  </div>

                </div>

              </div>
            );
          }
        )}

      </div>

    </div>
  );
};

export default Events;