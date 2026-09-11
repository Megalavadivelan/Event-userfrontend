import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Events.css";

const Events = () => {
  const navigate = useNavigate();

  // =====================================================
  // SAMPLE EVENTS
  // Later this will come from your backend API
  // =====================================================

  const sampleEvents = [
    {
      _id: "event001",
      eventName: "Tech Innovation Summit 2026",
      category: "Technology",
      description:
        "A technology summit featuring Artificial Intelligence, Cloud Computing, Cybersecurity and modern software development.",
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
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80",
    },

    {
      _id: "event002",
      eventName: "Music & Cultural Night",
      category: "Music",
      description:
        "An exciting evening filled with live music, cultural performances, food and entertainment.",
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
        "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1000&q=80",
    },

    {
      _id: "event003",
      eventName: "AI & Machine Learning Workshop",
      category: "Workshop",
      description:
        "A hands-on workshop covering Artificial Intelligence, Machine Learning, Python and real-world AI applications.",
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
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=80",
    },

    {
      _id: "event004",
      eventName: "Startup & Entrepreneurship Meet",
      category: "Business",
      description:
        "Meet entrepreneurs, startup founders and business professionals. Learn about startups, funding and business growth.",
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
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1000&q=80",
    },

    {
      _id: "event005",
      eventName: "Free Coding Bootcamp",
      category: "Education",
      description:
        "A free coding bootcamp for students covering programming fundamentals, web development and problem solving.",
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
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80",
    },

    {
      _id: "event006",
      eventName: "Photography & Creative Arts Exhibition",
      category: "Arts",
      description:
        "Explore photography, digital art, paintings and creative works from talented artists.",
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
        "https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=1000&q=80",
    },
  ];

  // =====================================================
  // STATES
  // =====================================================

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const [location, setLocation] = useState("All");

  const [priceFilter, setPriceFilter] = useState("All");

  // =====================================================
  // CATEGORY OPTIONS
  // =====================================================

  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(
        sampleEvents
          .map((event) => event.category)
          .filter(Boolean)
      ),
    ];
  }, []);

  // =====================================================
  // LOCATION OPTIONS
  // =====================================================

  const locations = useMemo(() => {
    return [
      "All",
      ...new Set(
        sampleEvents
          .map((event) => event.location)
          .filter(Boolean)
      ),
    ];
  }, []);

  // =====================================================
  // FILTER EVENTS
  // =====================================================

  const filteredEvents = useMemo(() => {
    return sampleEvents.filter((event) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        searchText === "" ||
        event.eventName
          .toLowerCase()
          .includes(searchText) ||
        event.category
          .toLowerCase()
          .includes(searchText) ||
        event.location
          .toLowerCase()
          .includes(searchText);

      const matchesCategory =
        category === "All" ||
        event.category === category;

      const matchesLocation =
        location === "All" ||
        event.location === location;

      let matchesPrice = true;

      const eventPrice = Number(event.price);

      if (priceFilter === "Free") {
        matchesPrice = eventPrice === 0;
      }

      if (priceFilter === "Under500") {
        matchesPrice = eventPrice < 500;
      }

      if (priceFilter === "500to1000") {
        matchesPrice =
          eventPrice >= 500 &&
          eventPrice <= 1000;
      }

      if (priceFilter === "Above1000") {
        matchesPrice = eventPrice > 1000;
      }

      return (
        matchesSearch &&
        matchesCategory &&
        matchesLocation &&
        matchesPrice
      );
    });
  }, [
    search,
    category,
    location,
    priceFilter,
  ]);

  // =====================================================
  // CLEAR FILTERS
  // =====================================================

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setLocation("All");
    setPriceFilter("All");
  };

  // =====================================================
  // OPEN EVENT DETAILS
  // =====================================================

  const openEvent = (id) => {
    navigate(`/event-details/${id}`);
  };

  // =====================================================
  // CHECK FILTER STATUS
  // =====================================================

  const isFiltered =
    search ||
    category !== "All" ||
    location !== "All" ||
    priceFilter !== "All";

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="events-page">

      {/* =================================================
          TOOLBAR
      ================================================= */}

      <div className="events-toolbar">

        {/* TITLE */}

        <div className="events-heading">

          <p className="events-label">
            DISCOVER
          </p>

          <h1>
            Events
          </h1>

        </div>

        {/* SEARCH */}

        <div className="events-search">

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

          {search && (
            <button
              className="clear-search"
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}

        </div>

        {/* CATEGORY */}

        <div className="filter-group">

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
                {item === "All"
                  ? "All Categories"
                  : item}
              </option>
            ))}

          </select>

        </div>

        {/* LOCATION */}

        <div className="filter-group">

          <select
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
          >

            {locations.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item === "All"
                  ? "All Locations"
                  : item}
              </option>
            ))}

          </select>

        </div>

        {/* PRICE */}

        <div className="filter-group">

          <select
            value={priceFilter}
            onChange={(e) =>
              setPriceFilter(e.target.value)
            }
          >

            <option value="All">
              All Prices
            </option>

            <option value="Free">
              Free
            </option>

            <option value="Under500">
              Under ₹500
            </option>

            <option value="500to1000">
              ₹500 - ₹1000
            </option>

            <option value="Above1000">
              Above ₹1000
            </option>

          </select>

        </div>

        {/* CLEAR */}

        {isFiltered && (
          <button
            className="clear-filters"
            onClick={clearFilters}
          >
            Clear
          </button>
        )}

      </div>

      {/* =================================================
          RESULTS
      ================================================= */}

      <div className="results-text">

        Showing{" "}

        <strong>
          {filteredEvents.length}
        </strong>{" "}

        {filteredEvents.length === 1
          ? "event"
          : "events"}

      </div>

      {/* =================================================
          EVENT GRID
      ================================================= */}

      {filteredEvents.length > 0 ? (

        <div className="events-grid">

          {filteredEvents.map((event) => (

            <div
              className="event-card"
              key={event._id}
              onClick={() =>
                openEvent(event._id)
              }
            >

              {/* POSTER */}

              <div className="event-poster">

                <img
                  src={event.poster}
                  alt={event.eventName}
                />

                <span className="category-badge">
                  {event.category}
                </span>

                {/* SPARKLE */}

                <span className="image-sparkle sparkle-one">
                  ✦
                </span>

                <span className="image-sparkle sparkle-two">
                  ✧
                </span>

              </div>

              {/* CONTENT */}

              <div className="event-card-content">

                <h2>
                  {event.eventName}
                </h2>

                {/* DATE */}

                <div className="event-info-row">

                  <span>
                    📅
                  </span>

                  <span>
                    {event.date}
                  </span>

                </div>

                {/* LOCATION */}

                <div className="event-info-row">

                  <span>
                    📍
                  </span>

                  <span>
                    {event.location}
                  </span>

                </div>

                {/* TIME */}

                <div className="event-info-row">

                  <span>
                    🕐
                  </span>

                  <span>
                    {event.time}
                  </span>

                </div>

                {/* FOOTER */}

                <div className="event-card-footer">

                  <div className="price-area">

                    <small>
                      Ticket Price
                    </small>

                    <strong>
                      {event.price === 0
                        ? "FREE"
                        : `₹${event.price}`}
                    </strong>

                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openEvent(event._id);
                    }}
                  >
                    View Details

                    <span>
                      →
                    </span>

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      ) : (

        /* =================================================
           NO RESULTS
        ================================================= */

        <div className="no-events">

          <div className="no-events-icon">
            ✦
          </div>

          <h2>
            No Events Found
          </h2>

          <p>
            Try changing your search or filters.
          </p>

          <button
            onClick={clearFilters}
          >
            Clear Filters
          </button>

        </div>

      )}

    </div>
  );
};

export default Events;