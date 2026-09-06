import React, { useState } from "react";
import axios from "axios";
import "../styles/OrganizeEvent.css";

function OrganizeEvents() {
const [formData, setFormData] = useState({
organizerName: "",
email: "",
phone: "",
eventName: "",
description: "",
eventDate: "",
location: "",
expectedParticipants: "",
category: "",
ticketFee: "",
estimatedBudget: "",
});

const [loading, setLoading] = useState(false);

const handleChange = (e) => {
const { name, value } = e.target;


setFormData((prev) => ({
  ...prev,
  [name]: value,
}));


};

const handleSubmit = async (e) => {
e.preventDefault();


try {
  setLoading(true);

  const response = await axios.post(
    "https://user-api-iota-six.vercel.app/organizer-requests/",
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  console.log("EVENT REQUEST RESPONSE:", response.data);

  alert("Your Event Request has been sent to the Admin successfully!");

  setFormData({
    organizerName: "",
    email: "",
    phone: "",
    eventName: "",
    description: "",
    eventDate: "",
    location: "",
    expectedParticipants: "",
    category: "",
    ticketFee: "",
    estimatedBudget: "",
  });

} catch (error) {
  console.error(
    "EVENT REQUEST ERROR:",
    error.response?.data || error.message
  );

  alert(
    error.response?.data?.message ||
    "Failed to send event request. Please try again."
  );

} finally {
  setLoading(false);
}


};

return ( <div className="organize-page"> <div className="organize-container">


    <div className="organize-header">
      <p className="small-title">
        EVENT ORGANIZER PORTAL
      </p>

      <h1>
        Organize Your <span>Dream Event</span>
      </h1>

      <p className="header-description">
        Have an amazing event idea? Share your event details with us
        and submit your request. Our admin team will review your proposal.
      </p>
    </div>

    <form
      className="event-form"
      onSubmit={handleSubmit}
    >

      <h2>Organizer Details</h2>

      <div className="form-grid">

        <div className="input-group">
          <label>Organizer Name *</label>

          <input
            type="text"
            name="organizerName"
            placeholder="Enter your full name"
            value={formData.organizerName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Email Address *</label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Phone Number *</label>

          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

      </div>


      <h2 className="section-title">
        Event Details
      </h2>

      <div className="form-grid">

        <div className="input-group">
          <label>Event Name *</label>

          <input
            type="text"
            name="eventName"
            placeholder="Enter your event name"
            value={formData.eventName}
            onChange={handleChange}
            required
          />
        </div>


        <div className="input-group">
          <label>Event Category *</label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">
              Select Event Category
            </option>

            <option value="Technology">
              Technology
            </option>

            <option value="Music">
              Music
            </option>

            <option value="Sports">
              Sports
            </option>

            <option value="Education">
              Education
            </option>

            <option value="Business">
              Business
            </option>

            <option value="Cultural">
              Cultural
            </option>

            <option value="Workshop">
              Workshop
            </option>

            <option value="Entertainment">
              Entertainment
            </option>

            <option value="Other">
              Other
            </option>
          </select>
        </div>


        <div className="input-group">
          <label>Proposed Event Date *</label>

          <input
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            required
          />
        </div>


        <div className="input-group">
          <label>Event Location *</label>

          <input
            type="text"
            name="location"
            placeholder="Enter event location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>


        <div className="input-group">
          <label>Expected Participants *</label>

          <input
            type="number"
            name="expectedParticipants"
            placeholder="Example: 100, 500, 1000"
            value={formData.expectedParticipants}
            onChange={handleChange}
            min="1"
            required
          />
        </div>


        <div className="input-group">
          <label>Ticket Fee Per Participant (₹) *</label>

          <input
            type="number"
            name="ticketFee"
            placeholder="Enter ticket fee"
            value={formData.ticketFee}
            onChange={handleChange}
            min="0"
            required
          />
        </div>


        <div className="input-group">
          <label>
            Estimated Budget (₹)
            <span className="optional">
              Optional
            </span>
          </label>

          <input
            type="number"
            name="estimatedBudget"
            placeholder="Enter estimated budget"
            value={formData.estimatedBudget}
            onChange={handleChange}
            min="0"
          />
        </div>

      </div>


      <div className="input-group description-group">
        <label>Event Description *</label>

        <textarea
          name="description"
          placeholder="Describe your event idea, activities and important details..."
          value={formData.description}
          onChange={handleChange}
          rows="6"
          required
        />
      </div>


      <div className="submit-section">
        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Sending Request..."
            : "Submit Event Request"}
        </button>
      </div>

    </form>

  </div>
</div>


);
}

export default OrganizeEvents;
