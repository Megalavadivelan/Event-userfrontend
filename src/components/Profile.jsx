import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import "../styles/Profile.css";


const API_URL =
  "https://user-api-iota-six.vercel.app/";


const Profile = () => {

  const [profile, setProfile] =
    useState(null);

  const [formData, setFormData] =
    useState({
      name: "",
      phone: "",
    });

  const [bookingStats, setBookingStats] =
    useState({
      totalBooked: 0,
      upcoming: 0,
      completed: 0,
    });

  const [bookings, setBookings] =
    useState([]);

  const [editing, setEditing] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [uploading, setUploading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");


  const token =
    localStorage.getItem(
      "token"
    );


  // ========================================
  // FETCH PROFILE
  // ========================================

  const fetchProfile =
    async () => {

      try {

        setLoading(true);

        setError("");


        const response =
          await axios.get(
            `${API_URL}/profile/me`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );


        const user =
          response.data.user;


        setProfile(user);


        setFormData({
          name:
            user.name || "",

          phone:
            user.phone || "",
        });


      } catch (err) {

        console.error(
          "PROFILE ERROR:",
          err.response?.data ||
            err.message
        );


        setError(
          err.response?.data
            ?.message ||
          "Unable to load profile"
        );

      } finally {

        setLoading(false);

      }
    };


  // ========================================
  // FETCH BOOKINGS
  // ========================================

  const fetchBookings =
    async () => {

      try {

        const response =
          await axios.get(
            `${API_URL}/bookings/my-bookings`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );


        setBookingStats(
          response.data.stats
        );


        setBookings(
          response.data.bookings
        );


      } catch (err) {

        console.error(
          "BOOKINGS ERROR:",
          err.response?.data ||
            err.message
        );

      }
    };


  // ========================================
  // LOAD
  // ========================================

  useEffect(() => {

    if (!token) {

      setError(
        "Please login to view profile"
      );

      setLoading(false);

      return;
    }


    fetchProfile();

    fetchBookings();

  }, []);


  // ========================================
  // INPUT CHANGE
  // ========================================

  const handleChange =
    (e) => {

      setFormData({
        ...formData,

        [e.target.name]:
          e.target.value,
      });

    };


  // ========================================
  // SAVE PROFILE
  // ========================================

  const handleSave =
    async () => {

      try {

        setSaving(true);

        setMessage("");

        setError("");


        const response =
          await axios.put(

            `${API_URL}/profile/update`,

            {
              name:
                formData.name,

              phone:
                formData.phone,
            },

            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }

          );


        const updatedUser =
          response.data.user;


        setProfile(
          updatedUser
        );


        setFormData({
          name:
            updatedUser.name || "",

          phone:
            updatedUser.phone || "",
        });


        // Update localStorage

        const oldUser =
          JSON.parse(
            localStorage.getItem(
              "user"
            ) || "{}"
          );


        localStorage.setItem(
          "user",

          JSON.stringify({
            ...oldUser,
            ...updatedUser,
          })
        );


        setEditing(false);


        setMessage(
          "Profile updated successfully!"
        );


      } catch (err) {

        console.error(
          "UPDATE PROFILE ERROR:",
          err.response?.data ||
            err.message
        );


        setError(
          err.response?.data
            ?.message ||
          "Failed to update profile"
        );

      } finally {

        setSaving(false);

      }
    };


  // ========================================
  // UPLOAD PROFILE IMAGE
  // ========================================

  const handleImageUpload =
    async (e) => {

      const file =
        e.target.files?.[0];


      if (!file) {
        return;
      }


      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];


      if (
        !allowedTypes.includes(
          file.type
        )
      ) {

        setError(
          "Only JPG, JPEG, PNG and WEBP images are allowed"
        );

        e.target.value = "";

        return;
      }


      if (
        file.size >
        5 * 1024 * 1024
      ) {

        setError(
          "Image must be below 5MB"
        );

        e.target.value = "";

        return;
      }


      try {

        setUploading(true);

        setMessage("");

        setError("");


        const data =
          new FormData();


        data.append(
          "profileImage",
          file
        );


        const response =
          await axios.post(

            `${API_URL}/profile/upload-dp`,

            data,

            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }

          );


        const imagePath =
          response.data.profileImage;


        setProfile(
          (prev) => ({
            ...prev,

            profileImage:
              imagePath,
          })
        );


        const oldUser =
          JSON.parse(
            localStorage.getItem(
              "user"
            ) || "{}"
          );


        localStorage.setItem(

          "user",

          JSON.stringify({
            ...oldUser,

            profileImage:
              imagePath,
          })

        );


        setMessage(
          "Profile picture updated successfully!"
        );


        e.target.value = "";


      } catch (err) {

        console.error(
          "IMAGE UPLOAD ERROR:",
          err.response?.data ||
            err.message
        );


        setError(
          err.response?.data
            ?.message ||
          "Failed to upload profile picture"
        );

      } finally {

        setUploading(false);

      }
    };


  // ========================================
  // DELETE PROFILE IMAGE
  // ========================================

  const handleDeleteImage =
    async () => {

      const confirmDelete =
        window.confirm(
          "Are you sure you want to remove your profile picture?"
        );


      if (!confirmDelete) {
        return;
      }


      try {

        setError("");

        setMessage("");


        await axios.delete(

          `${API_URL}/profile/delete-dp`,

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }

        );


        setProfile(
          (prev) => ({
            ...prev,

            profileImage: "",
          })
        );


        const oldUser =
          JSON.parse(
            localStorage.getItem(
              "user"
            ) || "{}"
          );


        localStorage.setItem(

          "user",

          JSON.stringify({
            ...oldUser,

            profileImage: "",
          })

        );


        setMessage(
          "Profile picture removed successfully!"
        );


      } catch (err) {

        console.error(
          "DELETE IMAGE ERROR:",
          err.response?.data ||
            err.message
        );


        setError(
          err.response?.data
            ?.message ||
          "Failed to remove profile picture"
        );

      }
    };


  // ========================================
  // LOADING
  // ========================================

  if (loading) {

    return (

      <div className="profile-loading">

        <div className="profile-spinner">
        </div>

        <p>
          Loading profile...
        </p>

      </div>

    );
  }


  // ========================================
  // ERROR
  // ========================================

  if (!profile) {

    return (

      <div className="profile-error">

        {error ||
          "Profile not found"}

      </div>

    );
  }


  // ========================================
  // IMAGE URL
  // ========================================

  const imageURL =
    profile.profileImage
      ? `${API_URL}${profile.profileImage}`
      : null;


  // ========================================
  // MAIN UI
  // ========================================

  return (

    <div className="profile-page">

      <div className="profile-container">


        {/* COVER */}

        <div className="profile-cover">
        </div>


        {/* PROFILE HEADER */}

        <div className="profile-header">


          <div className="profile-photo-section">


            {imageURL ? (

              <img
                src={imageURL}
                alt="Profile"
                className="profile-photo"
              />

            ) : (

              <div className="profile-placeholder">

                {profile.name
                  ?.charAt(0)
                  .toUpperCase()}

              </div>

            )}


            <label
              htmlFor="profileImage"
              className="camera-button"
              title="Change profile picture"
            >
              📷
            </label>


            <input
              id="profileImage"
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              onChange={
                handleImageUpload
              }
              hidden
            />

          </div>


          <div className="profile-heading">

            <h1>
              {profile.name}
            </h1>

            <p>
              {profile.email}
            </p>

            <span className="role-badge">
              {profile.role ||
                "user"}
            </span>

          </div>


          <div className="profile-actions">

            {profile.profileImage && (

              <button
                className="remove-photo-btn"
                onClick={
                  handleDeleteImage
                }
              >
                Remove Photo
              </button>

            )}

          </div>

        </div>


        {/* MESSAGES */}

        {uploading && (

          <div className="info-message">

            Uploading profile picture...

          </div>

        )}


       


        {error && (

          <div className="error-message">

            {error}

          </div>

        )}


        {/* PERSONAL INFORMATION */}

        <div className="profile-content">

          <div className="content-header">

            <div>

              <h2>
                Personal Information
              </h2>

              <p>
                Manage your account
                information
              </p>

            </div>


            <button
              className="edit-button"
              onClick={() => {

                if (editing) {

                  setFormData({
                    name:
                      profile.name ||
                      "",

                    phone:
                      profile.phone ||
                      "",
                  });

                }

                setEditing(
                  !editing
                );

                setMessage("");

                setError("");

              }}
            >

              {editing
                ? "Cancel"
                : "✏ Edit Profile"}

            </button>

          </div>


          <div className="profile-grid">


            {/* USER ID */}

            <div className="profile-field">

              <label>
                User ID
              </label>

              <input
                value={
                  profile._id ||
                  ""
                }
                disabled
              />

            </div>


            {/* EMAIL */}

            <div className="profile-field">

              <label>
                Email Address
              </label>

              <input
                value={
                  profile.email ||
                  ""
                }
                disabled
              />

            </div>


            {/* NAME */}

            <div className="profile-field">

              <label>
                Username
              </label>

              <input
                name="name"
                value={
                  formData.name
                }
                onChange={
                  handleChange
                }
                disabled={
                  !editing
                }
              />

            </div>


            {/* ROLE */}

            <div className="profile-field">

              <label>
                Account Type
              </label>

              <input
                value={
                  profile.role ||
                  "user"
                }
                disabled
              />

            </div>


            {/* PHONE */}

            <div className="profile-field">

              <label>
                Phone Number
              </label>

              <input
                name="phone"
                value={
                  formData.phone
                }
                onChange={
                  handleChange
                }
                disabled={
                  !editing
                }
                placeholder="+91 XXXXX XXXXX"
              />

            </div>


            {/* MEMBER SINCE */}

            <div className="profile-field">

              <label>
                Member Since
              </label>

              <input
                value={
                  profile.createdAt
                    ? new Date(
                        profile.createdAt
                      ).toLocaleDateString()
                    : "-"
                }
                disabled
              />

            </div>

          </div>


          {/* SAVE */}

          {editing && (

            <div className="save-section">

              <button
                className="save-button"
                onClick={
                  handleSave
                }
                disabled={
                  saving
                }
              >

                {saving
                  ? "Saving..."
                  : "Save Changes"}

              </button>

            </div>

          )}

        </div>


        {/* ====================================
            BOOKING SECTION
        ==================================== */}

        <div className="booking-section">


          <div className="booking-section-header">

            <div>

              <h2>
                My Event Bookings
              </h2>

              <p>
                Track your event
                registrations
              </p>

            </div>

          </div>


          {/* BOOKING STATS */}

          <div className="booking-stats">


            <div className="booking-stat-card">

              <div className="booking-stat-icon">
                🎟️
              </div>

              <div>

                <span>
                  Total Booked
                </span>

                <strong>
                  {
                    bookingStats.totalBooked
                  }
                </strong>

              </div>

            </div>


            <div className="booking-stat-card">

              <div className="booking-stat-icon">
                📅
              </div>

              <div>

                <span>
                  Upcoming
                </span>

                <strong>
                  {
                    bookingStats.upcoming
                  }
                </strong>

              </div>

            </div>


            <div className="booking-stat-card">

              <div className="booking-stat-icon">
                ✓
              </div>

              <div>

                <span>
                  Completed
                </span>

                <strong>
                  {
                    bookingStats.completed
                  }
                </strong>

              </div>

            </div>


          </div>


          {/* RECENT BOOKINGS */}

          <div className="my-bookings">

            <h3>
              My Bookings
            </h3>


            {bookings.length === 0 ? (

              <div className="no-bookings">

                <div>
                  🎟️
                </div>

                <h4>
                  No bookings yet
                </h4>

                <p>
                  Explore events and
                  book your first event.
                </p>

              </div>

            ) : (

              bookings.map(
                (booking) => (

                  <div
                    className="booking-card"
                    key={
                      booking._id
                    }
                  >

                    <div className="booking-info">

                      <h4>
                        {
                          booking.eventName
                        }
                      </h4>

                      <p>
                        📅{" "}
                        {new Date(
                          booking.eventDate
                        ).toLocaleDateString()}
                      </p>

                      <p>
                        📍{" "}
                        {
                          booking.location ||
                          "Location not available"
                        }
                      </p>

                      <p>
                        🎟️{" "}
                        {
                          booking.tickets
                        }{" "}
                        Ticket
                        {
                          booking.tickets >
                          1
                            ? "s"
                            : ""
                        }
                      </p>

                    </div>


                    <div className="booking-status">

                      <span
                        className={
                          `status ${booking.status}`
                        }
                      >
                        {
                          booking.status
                        }
                      </span>

                    </div>

                  </div>

                )
              )

            )}

          </div>

        </div>


      </div>

    </div>

  );
};


export default Profile;