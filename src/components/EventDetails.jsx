import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "../styles/EventDetails.css";

const EventDetails = () => {

const { id } = useParams();
const navigate = useNavigate();

const [event, setEvent] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
fetchEvent();
}, [id]);

// FETCH PARTICULAR EVENT
const fetchEvent = async () => {


try {

  const response = await fetch(
    `https://api-admin-rouge.vercel.app/events/get/${id}`
  );

  if (!response.ok) {
    throw new Error("Event not found");
  }

  const data = await response.json();

  // Supports both:
  // { event: {...} }
  // OR
  // {...}
  const eventData = data.event || data;

  setEvent(eventData);

} catch (error) {

  console.error(
    "Error fetching event:",
    error
  );

  setEvent(null);

} finally {

  setLoading(false);

}


};

// LOADING
if (loading) {
return ( <div className="details-loading">
Loading event... </div>
);
}

// EVENT NOT FOUND
if (!event) {
return ( <div className="details-error">
Event not found. </div>
);
}

return (


<div className="event-details-page">

  {/* BACK BUTTON */}
  <button
    className="back-btn"
    onClick={() => navigate("/events")}
  >
    ← Back to Events
  </button>

  <div className="event-details-card">

    {/* EVENT IMAGE */}
    <div className="details-image">

      <img
        src={event.image}
        alt={event.title}
      />

    </div>


    {/* EVENT CONTENT */}
    <div className="details-content">

      {/* STATUS */}
      <span
        className={`details-status ${
          event.status === "completed"
            ? "completed"
            : "upcoming"
        }`}
      >

        {event.status}

      </span>


      {/* CATEGORY */}
      <span className="details-category">

        {event.category}

      </span>


      {/* TITLE */}
      <h1>

        {event.title}

      </h1>


      {/* DESCRIPTION */}
      <p className="details-description">

        {event.description}

      </p>


      {/* EVENT INFORMATION */}
      <div className="details-info">

        {/* DATE */}
        <div>

          <strong>
            📅 Date
          </strong>

          <span>
            {event.date}
          </span>

        </div>


        {/* TIME */}
        <div>

          <strong>
            ⏰ Time
          </strong>

          <span>
            {event.time}
          </span>

        </div>


        {/* LOCATION */}
        <div>

          <strong>
            📍 Location
          </strong>

          <span>
            {event.location}
          </span>

        </div>


        {/* PRICE */}
        <div>

          <strong>
            💰 Price
          </strong>

          <span>

            {event.price
              ? `₹${event.price}`
              : "Free"}

          </span>

        </div>

      </div>


      {/* REGISTER BUTTON */}

      {event.status !== "completed" && (

        <button className="register-btn">

          Register for Event

        </button>

      )}

    </div>

  </div>

</div>


);

};

export default EventDetails;
