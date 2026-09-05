import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard.jsx";
import "../styles/Events.css";

const Events = () => {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [date, setDate] = useState("");
const [statusOpen, setStatusOpen] = useState(false);
const [categoryOpen, setCategoryOpen] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {

    try {

      const response = await fetch(
        "http://localhost:9000/events/getevents"
      );

      const data = await response.json();

      setEvents(Array.isArray(data.events)
        ? data.events
        : []);

    } catch (error) {

      console.error("Error fetching events:", error);

    } finally {

      setLoading(false);

    }
  };
  /* FILTER */

  const filteredEvents = events.filter((event) => {

    const matchesSearch =
      event.title
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      event.location
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      category === "all" ||
      event.category === category;

    const matchesStatus =
      status === "all" ||
      event.status === status;

    const matchesDate =
      date === "" ||
      event.date === date;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesStatus &&
      matchesDate
    );
  });

  /* Get unique categories */

  const categories = [
    ...new Set(events.map((event) => event.category))
  ];

  return (
    <div className="events-page">

      {/* Header */}

      {/* <div className="events-header">

        <h1>Explore Events</h1>

        <p>
          Discover upcoming events and experiences
        </p>

      </div> */}

      {/* Search + Filters */}

      <div className="event-filter-container">

        {/* Search */}

        <div className="search-box">

          <input
            type="text"
            placeholder="Search events, location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <span>🔍</span>

        </div>

        {/* Category */}

        <div className={`custom-dropdown ${categoryOpen ? "open" : ""}`}>

  <button
    className="dropdown-button"
    onClick={() => setCategoryOpen(!categoryOpen)}
  >
    <span>
      {category === "all" ? "All Categories" : category}
    </span>

    <span className="dropdown-arrow">⌄</span>
  </button>

  {categoryOpen && (
    <div className="dropdown-menu">

      {/* ALL CATEGORIES */}

      <div
        className={`dropdown-option ${
          category === "all" ? "selected" : ""
        }`}
        onClick={() => {
          setCategory("all");
          setCategoryOpen(false);
        }}
      >
        All Categories
      </div>


      {/* DYNAMIC CATEGORIES */}

      {categories.map((cat, index) => (

        <div
          key={cat}
          className={`dropdown-option ${
            category === cat ? "selected" : ""
          }`}
          style={{
            animationDelay: `${(index + 2) * 0.05}s`
          }}
          onClick={() => {
            setCategory(cat);
            setCategoryOpen(false);
          }}
        >
          {cat}
        </div>

      ))}

    </div>
  )}

</div>

        {/* Status */}

        <div className={`custom-dropdown ${statusOpen ? "open" : ""}`}>

  <button
    className="dropdown-button"
    onClick={() => setStatusOpen(!statusOpen)}
  >
    <span>
      {status === "all"
        ? "All Events"
        : status === "upcoming"
        ? "Upcoming"
        : "Completed"}
    </span>

    <span className="dropdown-arrow">⌄</span>
  </button>

  {statusOpen && (
    <div className="dropdown-menu">

      <div
        className={`dropdown-option ${
          status === "all" ? "selected" : ""
        }`}
        onClick={() => {
          setStatus("all");
          setStatusOpen(false);
        }}
      >
        All Events
      </div>

      <div
        className={`dropdown-option ${
          status === "upcoming" ? "selected" : ""
        }`}
        onClick={() => {
          setStatus("upcoming");
          setStatusOpen(false);
        }}
      >
        Upcoming
      </div>

      <div
        className={`dropdown-option ${
          status === "completed" ? "selected" : ""
        }`}
        onClick={() => {
          setStatus("completed");
          setStatusOpen(false);
        }}
      >
        Completed
      </div>

    </div>
  )}

</div>

        {/* Date */}

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        {/* Clear */}

        <button
          className="clear-filter"
          onClick={() => {
            setSearch("");
            setCategory("all");
            setStatus("all");
            setDate("");
          }}
        >
          Clear
        </button>

      </div>

      {/* Events */}

      {loading ? (

        <div className="loading">
          Loading events...
        </div>

      ) : filteredEvents.length === 0 ? (

        <div className="no-events">

          <h2>No Events Found</h2>

          <p>
            Try changing your search or filters.
          </p>

        </div>

      ) : (

        <div className="events-grid">

          {filteredEvents.map((event) => (

            <EventCard
              key={event._id}
              event={event}
            />

          ))}

        </div>

      )}

    </div>
  );
};

export default Events;