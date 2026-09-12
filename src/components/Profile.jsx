import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [profileImage, setProfileImage] = useState("");
  const [activeSection, setActiveSection] = useState("personal");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
  });

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  const [message, setMessage] = useState("");

  // =====================================================
  // LOAD USER DATA
  // =====================================================

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);

        setUser(parsedUser);

        setFormData({
          name:
            parsedUser.name ||
            parsedUser.username ||
            "",
          email: parsedUser.email || "",
          phone: parsedUser.phone || "",
          location: parsedUser.location || "",
          bio: parsedUser.bio || "",
        });

        setProfileImage(
          parsedUser.profileImage ||
          parsedUser.image ||
          ""
        );
      } catch (error) {
        console.error(
          "Failed to read user data:",
          error
        );
      }
    }
  }, []);

  // =====================================================
  // THEME
  // =====================================================

  useEffect(() => {
    document.body.classList.remove(
      "light-theme",
      "dark-theme"
    );

    document.body.classList.add(
      `${theme}-theme`
    );

    localStorage.setItem("theme", theme);
  }, [theme]);

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // PROFILE IMAGE
  // =====================================================

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setProfileImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  // =====================================================
  // SAVE PROFILE
  // =====================================================

  const handleSave = () => {
    const updatedUser = {
      ...user,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      bio: formData.bio,
      profileImage: profileImage,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    setUser(updatedUser);

    setMessage("Profile updated successfully!");

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  // =====================================================
  // INITIALS
  // =====================================================

  const getInitials = () => {
    if (!formData.name) return "U";

    return formData.name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="profile-page">

      {/* BACKGROUND SPARKLES */}

      <div className="profile-sparkle sparkle-one"></div>
      <div className="profile-sparkle sparkle-two"></div>
      <div className="profile-sparkle sparkle-three"></div>
      <div className="profile-sparkle sparkle-four"></div>
      <div className="profile-sparkle sparkle-five"></div>

      {/* =================================================
          PROFILE HEADER
      ================================================= */}

      <div className="profile-header">
        <div>
          <p className="profile-small-title">
            ACCOUNT
          </p>

          <h1>
            My Profile
          </h1>

          <p className="profile-subtitle">
            Manage your Eventora account and preferences
          </p>
        </div>
      </div>

      {/* =================================================
          MAIN PROFILE LAYOUT
      ================================================= */}

      <div className="profile-layout">

        {/* =================================================
            LEFT PROFILE CARD
        ================================================= */}

        <div className="profile-card">

          <div className="profile-image-wrapper">

            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="profile-image"
              />
            ) : (
              <div className="profile-initials">
                {getInitials()}
              </div>
            )}

            <label
              htmlFor="profile-image-upload"
              className="image-upload-button"
            >
              📷
            </label>

            <input
              id="profile-image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />

          </div>

          <h2>
            {formData.name || "User"}
          </h2>

          <p className="profile-email">
            {formData.email || "Email not available"}
          </p>

          <div className="profile-divider"></div>

          <div className="profile-account-status">
            <span className="status-dot"></span>

            <span>
              Active Account
            </span>
          </div>

          <button
            className="logout-profile-button"
            onClick={handleLogout}
          >
            Sign Out
          </button>

        </div>

        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <div className="profile-content">

          {/* =================================================
              SIDE MENU
          ================================================= */}

          <div className="profile-menu">

            <button
              className={
                activeSection === "personal"
                  ? "profile-menu-item active"
                  : "profile-menu-item"
              }
              onClick={() =>
                setActiveSection("personal")
              }
            >
              <span className="menu-icon">
                👤
              </span>

              <span>
                Personal Information
              </span>

              <span className="menu-arrow">
                →
              </span>
            </button>

            <button
              className="profile-menu-item"
              onClick={() =>
                navigate("/bookings/my-bookings")
              }
            >
              <span className="menu-icon">
                🎟️
              </span>

              <span>
                My Bookings
              </span>

              <span className="menu-arrow">
                →
              </span>
            </button>

            <button
              className={
                activeSection === "theme"
                  ? "profile-menu-item active"
                  : "profile-menu-item"
              }
              onClick={() =>
                setActiveSection("theme")
              }
            >
              <span className="menu-icon">
                🎨
              </span>

              <span>
                Theme
              </span>

              <span className="menu-arrow">
                →
              </span>
            </button>

            <button
              className={
                activeSection === "account"
                  ? "profile-menu-item active"
                  : "profile-menu-item"
              }
              onClick={() =>
                setActiveSection("account")
              }
            >
              <span className="menu-icon">
                ⚙️
              </span>

              <span>
                Account Settings
              </span>

              <span className="menu-arrow">
                →
              </span>
            </button>

          </div>

          {/* =================================================
              PERSONAL INFORMATION
          ================================================= */}

          {activeSection === "personal" && (
            <div className="profile-section-card">

              <div className="section-heading">
                <div>
                  <h2>
                    Personal Information
                  </h2>

                  <p>
                    Update your personal details
                  </p>
                </div>

                <span className="section-icon">
                  👤
                </span>
              </div>

              <div className="profile-form">

                {/* NAME */}

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

                {/* EMAIL */}

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

                {/* PHONE */}

                <div className="form-group">
                  <label>
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* LOCATION */}

                <div className="form-group">
                  <label>
                    Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter your location"
                  />
                </div>

                {/* BIO */}

                <div className="form-group full-width">
                  <label>
                    About Me
                  </label>

                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Tell something about yourself..."
                    rows="4"
                  />
                </div>

              </div>

              <div className="save-section">

                {message && (
                  <span className="success-message">
                    ✓ {message}
                  </span>
                )}

                <button
                  className="save-profile-button"
                  onClick={handleSave}
                >
                  Save Changes
                  <span>→</span>
                </button>

              </div>

            </div>
          )}

          {/* =================================================
              THEME
          ================================================= */}

          {activeSection === "theme" && (
            <div className="profile-section-card">

              <div className="section-heading">
                <div>
                  <h2>
                    Appearance
                  </h2>

                  <p>
                    Choose how Eventora looks for you
                  </p>
                </div>

                <span className="section-icon">
                  🎨
                </span>
              </div>

              <div className="theme-options">

                <button
                  className={
                    theme === "dark"
                      ? "theme-option selected"
                      : "theme-option"
                  }
                  onClick={() =>
                    setTheme("dark")
                  }
                >
                  <div className="theme-preview dark-preview">
                    <span>🌙</span>
                  </div>

                  <div>
                    <h3>
                      Dark
                    </h3>

                    <p>
                      Purple glow dark interface
                    </p>
                  </div>

                  {theme === "dark" && (
                    <span className="theme-check">
                      ✓
                    </span>
                  )}
                </button>

                <button
                  className={
                    theme === "light"
                      ? "theme-option selected"
                      : "theme-option"
                  }
                  onClick={() =>
                    setTheme("light")
                  }
                >
                  <div className="theme-preview light-preview">
                    <span>☀️</span>
                  </div>

                  <div>
                    <h3>
                      Light
                    </h3>

                    <p>
                      Clean bright interface
                    </p>
                  </div>

                  {theme === "light" && (
                    <span className="theme-check">
                      ✓
                    </span>
                  )}
                </button>

              </div>

            </div>
          )}

          {/* =================================================
              ACCOUNT SETTINGS
          ================================================= */}

          {activeSection === "account" && (
            <div className="profile-section-card">

              <div className="section-heading">
                <div>
                  <h2>
                    Account Settings
                  </h2>

                  <p>
                    Manage your Eventora account
                  </p>
                </div>

                <span className="section-icon">
                  ⚙️
                </span>
              </div>

              <div className="account-settings">

                <div className="setting-row">
                  <div>
                    <h3>
                      Account Status
                    </h3>

                    <p>
                      Your account is currently active.
                    </p>
                  </div>

                  <span className="active-badge">
                    Active
                  </span>
                </div>

                <div className="setting-row">
                  <div>
                    <h3>
                      My Bookings
                    </h3>

                    <p>
                      View all events you have booked.
                    </p>
                  </div>

                  <button
                    className="small-action-button"
                    onClick={() =>
                      navigate("/bookings/my-bookings")
                    }
                  >
                    View
                  </button>
                </div>

                <div className="setting-row danger-row">
                  <div>
                    <h3>
                      Sign Out
                    </h3>

                    <p>
                      Sign out from your Eventora account.
                    </p>
                  </div>

                  <button
                    className="danger-button"
                    onClick={handleLogout}
                  >
                    Sign Out
                  </button>
                </div>

              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default Profile;