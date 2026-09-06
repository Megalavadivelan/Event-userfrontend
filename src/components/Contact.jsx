import React, { useState } from "react";
import axios from "axios";
import "../styles/Contact.css";

const API_URL = "https://user-api-iota-six.vercel.app";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Get logged-in user
  const storedUser = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  // Automatically fill name and email if logged in
  React.useEffect(() => {
    if (storedUser.name || storedUser.email) {
      setFormData((prev) => ({
        ...prev,
        name: storedUser.name || "",
        email: storedUser.email || "",
      }));
    }
  }, []);

  // Handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
    setSuccess("");
  };

  // Submit contact form
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    // Basic validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      setError("Please fill all the fields.");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${API_URL}/contact/send`,
        {
          ...formData,
          userId: storedUser.id || storedUser._id || null,
        },
        {
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {},
        }
      );

      if (response.data.success) {
        setSuccess(
          "Your message has been sent successfully! We'll get back to you soon."
        );

        // Clear form
        setFormData({
          name: storedUser.name || "",
          email: storedUser.email || "",
          subject: "",
          message: "",
        });
      }
    } catch (err) {
      console.error(
        "CONTACT ERROR:",
        err.response?.data || err.message
      );

      setError(
        err.response?.data?.message ||
          "Failed to send your message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">

      {/* HERO */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <span className="contact-small-title">
            GET IN TOUCH
          </span>

          <h1>
            We'd Love to <span>Hear From You</span>
          </h1>

          <p>
            Have a question, suggestion, or need help?
            Send us a message and our team will get back
            to you as soon as possible.
          </p>
        </div>
      </section>

      {/* MAIN CONTACT SECTION */}
      <section className="contact-section">

        <div className="contact-wrapper">

          {/* LEFT SIDE */}
          <div className="contact-info">

            <span className="section-tag">
              CONTACT US
            </span>

            <h2>
              Let's Start a
              <br />
              Conversation
            </h2>

            <p className="contact-description">
              Whether you have questions about an event,
              need assistance with your booking, or simply
              want to share your feedback, we're here to help.
            </p>

            {/* EMAIL */}
            <div className="contact-info-card">
              <div className="contact-icon">
                ✉
              </div>

              <div>
                <h3>Email Us</h3>
                <p>support@eventmanagement.com</p>
              </div>
            </div>

            {/* PHONE */}
            <div className="contact-info-card">
              <div className="contact-icon">
                ☎
              </div>

              <div>
                <h3>Call Us</h3>
                <p>+91 98765 43210</p>
              </div>
            </div>

            {/* LOCATION */}
            <div className="contact-info-card">
              <div className="contact-icon">
                📍
              </div>

              <div>
                <h3>Our Location</h3>
                <p>Chennai, Tamil Nadu, India</p>
              </div>
            </div>

            {/* WORKING HOURS */}
            <div className="contact-info-card">
              <div className="contact-icon">
                🕐
              </div>

              <div>
                <h3>Working Hours</h3>
                <p>Monday - Saturday</p>
                <p>9:00 AM - 6:00 PM</p>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE FORM */}
          <div className="contact-form-container">

            <div className="form-heading">
              <h2>Send Us a Message</h2>

              <p>
                Fill in the details below and we'll
                respond to you shortly.
              </p>
            </div>

            {/* SUCCESS */}
            {success && (
              <div className="contact-success">
                ✓ {success}
              </div>
            )}

            {/* ERROR */}
            {error && (
              <div className="contact-error">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              {/* NAME + EMAIL */}
              <div className="form-row">

                <div className="form-group">
                  <label>
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                  />
                </div>

                <div className="form-group">
                  <label>
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </div>

              </div>

              {/* SUBJECT */}
              <div className="form-group">
                <label>
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is your message about?"
                />
              </div>

              {/* MESSAGE */}
              <div className="form-group">
                <label>
                  Message
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  rows="6"
                />
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                className="contact-submit-btn"
                disabled={loading}
              >
                {loading
                  ? "Sending..."
                  : "Send Message →"}
              </button>

            </form>

          </div>

        </div>

      </section>

      {/* FAQ / SUPPORT */}
      <section className="contact-bottom">

        <div>
          <h2>Need Quick Help?</h2>

          <p>
            Check our events section for upcoming
            events and booking information.
          </p>
        </div>

      </section>

    </div>
  );
};

export default Contact;