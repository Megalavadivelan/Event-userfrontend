import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Profile.css";

const API_URL = "https://user-api-iota-six.vercel.app";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    contact: "",
    bio: "",
    location: "",
    profileImage: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  // Change this according to your login localStorage
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setFetchLoading(true);

      const response = await axios.get(
        `${API_URL}/profile/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        const userData = response.data.data;

        setProfile({
          name: userData.name || "",
          email: userData.email || "",
          contact: userData.contact || "",
          bio: userData.bio || "",
          location: userData.location || "",
          profileImage: userData.profileImage || "",
        });

        setPreviewImage(userData.profileImage || "");
      }
    } catch (error) {
      console.error(
        "PROFILE FETCH ERROR:",
        error.response?.data || error.message
      );
    } finally {
      setFetchLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedImage(file);

    const imagePreview = URL.createObjectURL(file);

    setPreviewImage(imagePreview);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", profile.name);
      formData.append("email", profile.email);
      formData.append("contact", profile.contact);
      formData.append("bio", profile.bio);
      formData.append("location", profile.location);

      if (selectedImage) {
        formData.append("profileImage", selectedImage);
      }

      const response = await axios.put(
        `${API_URL}/profile/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        alert("Profile updated successfully!");

        if (response.data.data?.profileImage) {
          setPreviewImage(
            response.data.data.profileImage
          );
        }

        setSelectedImage(null);
      }

    } catch (error) {
      console.error(
        "PROFILE UPDATE ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
        "Failed to update profile"
      );

    } finally {
      setLoading(false);
    }
  };

  const getInitial = () => {
    if (profile.name) {
      return profile.name.charAt(0).toUpperCase();
    }

    return "U";
  };

  if (fetchLoading) {
    return (
      <div className="profile-loading">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="profile-page">

      <div className="profile-container">

        {/* HEADER */}

        <div className="profile-header">

          <div>
            <p className="profile-small-title">
              MY ACCOUNT
            </p>

            <h1>
              My <span>Profile</span>
            </h1>

            <p>
              Manage your personal information and event account.
            </p>
          </div>

        </div>


        <div className="profile-content">


          {/* LEFT SIDE PROFILE CARD */}

          <div className="profile-sidebar">

            <div className="profile-image-section">

              <div className="profile-image-wrapper">

                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Profile"
                    className="profile-image"
                  />
                ) : (
                  <div className="profile-initial">
                    {getInitial()}
                  </div>
                )}

              </div>


              <label
                htmlFor="profileImage"
                className="upload-image-btn"
              >
                Change Photo
              </label>

              <input
                id="profileImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                hidden
              />

            </div>


            <div className="profile-user-info">

              <h2>
                {profile.name || "User Name"}
              </h2>

              <p>
                {profile.email || "user@email.com"}
              </p>

            </div>


            {/* EVENT STATS */}

            <div className="profile-stats">

              <div className="stat-card">

                <span className="stat-number">
                  0
                </span>

                <span className="stat-label">
                  Events Booked
                </span>

              </div>


              <div className="stat-card">

                <span className="stat-number">
                  0
                </span>

                <span className="stat-label">
                  Upcoming Events
                </span>

              </div>

            </div>

          </div>


          {/* RIGHT SIDE FORM */}

          <div className="profile-form-card">

            <h2>
              Personal Information
            </h2>

            <p className="form-description">
              Update your profile details below.
            </p>


            <form onSubmit={handleSubmit}>


              {/* NAME */}

              <div className="profile-input-group">

                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={profile.name}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* EMAIL */}

              <div className="profile-input-group">

                <label>
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={profile.email}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* CONTACT */}

              <div className="profile-input-group">

                <label>
                  Contact Number
                </label>

                <input
                  type="tel"
                  name="contact"
                  placeholder="Enter your phone number"
                  value={profile.contact}
                  onChange={handleChange}
                />

              </div>


              {/* LOCATION */}

              <div className="profile-input-group">

                <label>
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  placeholder="Example: Chennai, Tamil Nadu"
                  value={profile.location}
                  onChange={handleChange}
                />

              </div>


              {/* BIO */}

              <div className="profile-input-group">

                <label>
                  About Me
                </label>

                <textarea
                  name="bio"
                  placeholder="Tell us something about yourself..."
                  value={profile.bio}
                  onChange={handleChange}
                  rows="5"
                />

              </div>


              {/* SAVE */}

              <button
                type="submit"
                className="save-profile-btn"
                disabled={loading}
              >

                {loading
                  ? "Saving Profile..."
                  : "Save Changes"}

              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;