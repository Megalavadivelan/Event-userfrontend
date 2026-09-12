import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Events.css";

const EVENTS_API =
  "https://api-admin-rouge.vercel.app/events/getevents";

const Events = () => {
  const navigate = useNavigate();

  // ===================================================
  // EVENTS
  // ===================================================

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ===================================================
  // SEARCH
  // ===================================================

  const [search, setSearch] = useState("");

  // ===================================================
  // FILTER DRAWER
  // ===================================================

  const [filterOpen, setFilterOpen] = useState(false);

  // ===================================================
  // FILTER VALUES
  // ===================================================

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");

  // ===================================================
  // TEMP FILTER VALUES
  // These are used inside drawer before Apply
  // ===================================================

  const [tempCategory, setTempCategory] = useState("All");
  const [tempLocation, setTempLocation] = useState("All");
  const [tempPrice, setTempPrice] = useState("All");

  // ===================================================
  // CATEGORIES
  // ===================================================

  const defaultCategories = [
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
    } catch (err) {
      console.error("Failed to fetch events:", err);

      setError(
        "Unable to load events. Please try again."
      );
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
  // GET UNIQUE CATEGORIES FROM API
  // ===================================================

  const categories = useMemo(() => {
    const apiCategories = events
      .map(
        (event) =>
          event.category ||
          event.eventCategory ||
          ""
      )
      .filter(Boolean);

    return [
      ...new Set([
        ...defaultCategories,
        ...apiCategories,
      ]),
    ];
  }, [events]);

  // ===================================================
  // GET UNIQUE LOCATIONS FROM API
  // ===================================================

  const locations = useMemo(() => {
    const apiLocations = events
      .map(
        (event) =>
          event.location ||
          event.venue ||
          ""
      )
      .map((location) => location.trim())
      .filter(Boolean);

    return [...new Set(apiLocations)];
  }, [events]);

  // ===================================================
  // OPEN FILTER
  // ===================================================

  const openFilter = () => {
    setTempCategory(selectedCategory);
    setTempLocation(selectedLocation);
    setTempPrice(selectedPrice);

    setFilterOpen(true);
  };

  // ===================================================
  // CLOSE FILTER
  // ===================================================

  const closeFilter = () => {
    setFilterOpen(false);
  };

  // ===================================================
  // APPLY FILTER
  // ===================================================

  const applyFilters = () => {
    setSelectedCategory(tempCategory);
    setSelectedLocation(tempLocation);
    setSelectedPrice(tempPrice);

    setFilterOpen(false);
  };

  // ===================================================
  // CLEAR FILTERS
  // ===================================================

  const clearFilters = () => {
    setTempCategory("All");
    setTempLocation("All");
    setTempPrice("All");

    setSelectedCategory("All");
    setSelectedLocation("All");
    setSelectedPrice("All");
  };

  // ===================================================
  // GET PRICE
  // ===================================================

  const getEventPrice = (event) => {
    const price =
      event.ticketPrice ??
      event.price ??
      event.amount;

    if (
      price === undefined ||
      price === null ||
      price === ""
    ) {
      return 0;
    }

    const numericPrice = Number(price);

    return Number.isNaN(numericPrice)
      ? 0
      : numericPrice;
  };

  // ===================================================
  // FILTER + SEARCH
  // ===================================================

  const filteredEvents = useMemo(() => {
    let result = [...events];

    // -------------------------------------------------
    // SEARCH
    // -------------------------------------------------

    if (search.trim() !== "") {
      const searchText =
        search.trim().toLowerCase();

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

        const category = (
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
          category.includes(searchText) ||
          organizer.includes(searchText)
        );
      });
    }

    // -------------------------------------------------
    // CATEGORY
    // -------------------------------------------------

    if (selectedCategory !== "All") {
      result = result.filter((event) => {
        const category =
          event.category ||
          event.eventCategory ||
          "";

        return (
          category.toLowerCase() ===
          selectedCategory.toLowerCase()
        );
      });
    }

    // -------------------------------------------------
    // LOCATION
    // -------------------------------------------------

    if (selectedLocation !== "All") {
      result = result.filter((event) => {
        const location =
          event.location ||
          event.venue ||
          "";

        return (
          location.toLowerCase() ===
          selectedLocation.toLowerCase()
        );
      });
    }

    // -------------------------------------------------
    // PRICE
    // -------------------------------------------------

    if (selectedPrice !== "All") {
      result = result.filter((event) => {
        const price = getEventPrice(event);

        if (selectedPrice === "Free") {
          return price === 0;
        }

        if (selectedPrice === "Under ₹500") {
          return price > 0 && price < 500;
        }

        if (selectedPrice === "₹500 - ₹1000") {
          return price >= 500 && price <= 1000;
        }

        if (selectedPrice === "₹1000 - ₹2000") {
          return price > 1000 && price <= 2000;
        }

        if (selectedPrice === "Above ₹2000") {
          return price > 2000;
        }

        return true;
      });
    }

    return result;
  }, [
    events,
    search,
    selectedCategory,
    selectedLocation,
    selectedPrice,
  ]);

  // ===================================================
  // OPEN EVENT DETAILS
  // ===================================================

  const handleEventClick = (event) => {
    const eventId =
      event._id ||
      event.id;

    if (!eventId) {
      console.error(
        "Event ID not found:",
        event
      );
      return;
    }

    navigate(
      `/eventdetails/${eventId}`
    );
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

    // Base64 image
    if (
      image.startsWith("data:image")
    ) {
      return image;
    }

    // Complete URL
    if (
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {
      return image;
    }

    // Relative path
    return `https://api-admin-rouge.vercel.app/${image.replace(
      /^\/+/,
      ""
    )}`;
  };

  // ===================================================
  // GET EVENT NAME
  // ===================================================

  const getEventName = (event) => {
    return (
      event.name ||
      event.eventName ||
      event.title ||
      "Untitled Event"
    );
  };

  // ===================================================
  // GET EVENT PRICE DISPLAY
  // ===================================================

  const getPriceDisplay = (event) => {
    const price =
      event.ticketPrice ??
      event.price ??
      event.amount;

    if (
      price === undefined ||
      price === null ||
      price === "" ||
      Number(price) === 0
    ) {
      return "Free";
    }

    return `₹${price}`;
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
        <div className="sparkle sparkle-4"></div>
        <div className="sparkle sparkle-5"></div>

        <div className="events-loading">

          <div className="loading-spinner"></div>

          <p>
            Loading events...
          </p>

        </div>

      </div>
    );
  }

  // ===================================================
  // PAGE
  // ===================================================

  return (
    <div className="events-page">

      {/* =========================================
          BACKGROUND SPARKLES
      ========================================= */}

      <div className="sparkle sparkle-1"></div>
      <div className="sparkle sparkle-2"></div>
      <div className="sparkle sparkle-3"></div>
      <div className="sparkle sparkle-4"></div>
      <div className="sparkle sparkle-5"></div>

      {/* =========================================
          MAIN CONTAINER
      ========================================= */}

      <div className="events-container">

        {/* =========================================
            TOP ROW
        ========================================= */}

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

            {search && (
              <button
                className="clear-search"
                onClick={() =>
                  setSearch("")
                }
              >
                ×
              </button>
            )}

          </div>

          {/* FILTER BUTTON */}

          <button
            className="filter-button"
            onClick={openFilter}
          >

            <span className="filter-icon">
              ☰
            </span>

            <span>
              Filter
            </span>

          </button>

        </div>

        {/* =========================================
            ACTIVE FILTERS
        ========================================= */}

        {(selectedCategory !== "All" ||
          selectedLocation !== "All" ||
          selectedPrice !== "All") && (

          <div className="active-filters">

            <span className="active-filter-title">
              Filters:
            </span>

            {selectedCategory !== "All" && (
              <span className="filter-tag">
                {selectedCategory}
              </span>
            )}

            {selectedLocation !== "All" && (
              <span className="filter-tag">
                {selectedLocation}
              </span>
            )}

            {selectedPrice !== "All" && (
              <span className="filter-tag">
                {selectedPrice}
              </span>
            )}

            <button
              className="clear-all-filter"
              onClick={clearFilters}
            >
              Clear all
            </button>

          </div>
        )}

        {/* =========================================
            ERROR
        ========================================= */}

        {error && (
          <div className="events-error">

            <div className="error-symbol">
              !
            </div>

            <p>
              {error}
            </p>

            <button
              onClick={fetchEvents}
            >
              Try Again
            </button>

          </div>
        )}

        {/* =========================================
            EVENT COUNT
        ========================================= */}

        {!error && (
          <div className="event-count">

            <span>
              {filteredEvents.length}
            </span>

            {filteredEvents.length === 1
              ? " Event Available"
              : " Events Available"}

          </div>
        )}

        {/* =========================================
            NO EVENTS
        ========================================= */}

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
                or filter options.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  clearFilters();
                }}
              >
                Clear Filters
              </button>

            </div>

          )}

        {/* =========================================
            EVENTS GRID
        ========================================= */}

        {!error &&
          filteredEvents.length > 0 && (

            <div className="events-grid">

              {filteredEvents.map(
                (event, index) => {

                  const imageUrl =
                    getImageUrl(event);

                  const eventName =
                    getEventName(event);

                  const price =
                    getPriceDisplay(event);

                  const category =
                    event.category ||
                    event.eventCategory ||
                    "Event";

                  return (

                    <div
                      className="event-card"
                      key={
                        event._id ||
                        event.id ||
                        index
                      }
                    >

                      {/* IMAGE */}

                      <div className="event-image-container">

                        {imageUrl ? (

                          <img
                            src={imageUrl}
                            alt={eventName}
                            className="event-image"
                          />

                        ) : (

                          <div className="event-image-placeholder">

                            <span>
                              ✨
                            </span>

                            <p>
                              No Image
                            </p>

                          </div>

                        )}

                        {/* CATEGORY */}

                        <span className="event-category">
                          {category}
                        </span>

                      </div>

                      {/* CARD CONTENT */}

                      <div className="event-card-content">

                        <h2
                          title={eventName}
                        >
                          {eventName}
                        </h2>

                        <div className="event-bottom">

                          {/* PRICE */}

                          <div className="event-price">
                            {price}
                          </div>

                          {/* VIEW DETAILS */}

                          <button
                            className="view-event-btn"
                            onClick={() =>
                              handleEventClick(event)
                            }
                          >
                            View Details
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

      {/* =========================================
          FILTER OVERLAY
      ========================================= */}

      {filterOpen && (

        <div
          className="filter-overlay"
          onClick={closeFilter}
        ></div>

      )}

      {/* =========================================
          RIGHT FILTER DRAWER
      ========================================= */}

      <aside
        className={`filter-drawer ${
          filterOpen
            ? "filter-drawer-open"
            : ""
        }`}
      >

        {/* FILTER HEADER */}

        <div className="filter-header">

          <div>

            <span className="filter-header-icon">
              ⚙
            </span>

            <h2>
              Filters
            </h2>

          </div>

          <button
            className="close-filter"
            onClick={closeFilter}
          >
            ×
          </button>

        </div>

        {/* FILTER BODY */}

        <div className="filter-body">

          {/* =====================================
              PRICE
          ===================================== */}

          <div className="filter-section">

            <h3>
              Price
            </h3>

            <div className="filter-options">

              {[
                "All",
                "Free",
                "Under ₹500",
                "₹500 - ₹1000",
                "₹1000 - ₹2000",
                "Above ₹2000",
              ].map((price) => (

                <label
                  className="filter-option"
                  key={price}
                >

                  <input
                    type="radio"
                    name="price"
                    value={price}
                    checked={
                      tempPrice === price
                    }
                    onChange={(e) =>
                      setTempPrice(
                        e.target.value
                      )
                    }
                  />

                  <span className="custom-radio"></span>

                  <span>
                    {price}
                  </span>

                </label>

              ))}

            </div>

          </div>

          {/* =====================================
              CATEGORY
          ===================================== */}

          <div className="filter-section">

            <h3>
              Category
            </h3>

            <div className="filter-options">

              <label className="filter-option">

                <input
                  type="radio"
                  name="category"
                  value="All"
                  checked={
                    tempCategory === "All"
                  }
                  onChange={(e) =>
                    setTempCategory(
                      e.target.value
                    )
                  }
                />

                <span className="custom-radio"></span>

                <span>
                  All Categories
                </span>

              </label>

              {categories.map(
                (category) => (

                  <label
                    className="filter-option"
                    key={category}
                  >

                    <input
                      type="radio"
                      name="category"
                      value={category}
                      checked={
                        tempCategory ===
                        category
                      }
                      onChange={(e) =>
                        setTempCategory(
                          e.target.value
                        )
                      }
                    />

                    <span className="custom-radio"></span>

                    <span>
                      {category}
                    </span>

                  </label>

                )
              )}

            </div>

          </div>

          {/* =====================================
              LOCATION
          ===================================== */}

          <div className="filter-section">

            <h3>
              Location
            </h3>

            <div className="filter-options">

              <label className="filter-option">

                <input
                  type="radio"
                  name="location"
                  value="All"
                  checked={
                    tempLocation === "All"
                  }
                  onChange={(e) =>
                    setTempLocation(
                      e.target.value
                    )
                  }
                />

                <span className="custom-radio"></span>

                <span>
                  All Locations
                </span>

              </label>

              {locations.map(
                (location) => (

                  <label
                    className="filter-option"
                    key={location}
                  >

                    <input
                      type="radio"
                      name="location"
                      value={location}
                      checked={
                        tempLocation ===
                        location
                      }
                      onChange={(e) =>
                        setTempLocation(
                          e.target.value
                        )
                      }
                    />

                    <span className="custom-radio"></span>

                    <span>
                      {location}
                    </span>

                  </label>

                )
              )}

            </div>

          </div>

        </div>

        {/* =========================================
            FILTER FOOTER
        ========================================= */}

        <div className="filter-footer">

          <button
            className="drawer-clear-btn"
            onClick={clearFilters}
          >
            Clear All
          </button>

          <button
            className="apply-filter-btn"
            onClick={applyFilters}
          >
            Apply Filters
          </button>

        </div>

      </aside>

    </div>
  );
};

export default Events;