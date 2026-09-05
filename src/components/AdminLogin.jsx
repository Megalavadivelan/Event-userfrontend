import "../styles/AdminLogin.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function AdminLogin() {
  const navigate = useNavigate();

  // =========================
  // FORM VALUES
  // =========================

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // =========================
  // SHOW / HIDE PASSWORD
  // =========================

  const [showPassword, setShowPassword] = useState(false);

  // =========================
  // ERRORS
  // =========================

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // =========================
  // ADMIN LOGIN
  // =========================

  const handleAdminLogin = async (e) => {
    e.preventDefault();

    let newErrors = {
      email: "",
      password: "",
    };

    let hasError = false;

    // =========================
    // EMAIL VALIDATION
    // =========================

    if (!email.trim()) {
      newErrors.email = "Admin email is required";
      hasError = true;
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      newErrors.email = "Enter a valid email";
      hasError = true;
    }

    // =========================
    // PASSWORD VALIDATION
    // =========================

    if (!password) {
      newErrors.password = "Password is required";
      hasError = true;
    }

    // Show validation errors
    setErrors(newErrors);

    // Stop if validation failed
    if (hasError) {
      return;
    }

    // =========================
    // BACKEND LOGIN
    // =========================

    try {
      const response = await axios.post(
        "http://localhost:2005/admin/login",
        {
          email: email.trim(),
          password: password,
        }
      );

      console.log(
        "Admin Login Response:",
        response.data
      );

      // =========================
      // LOGIN SUCCESS
      // =========================

      if (response.data.success) {
        setErrors({
          email: "",
          password: "",
        });

        // Store JWT token
        localStorage.setItem(
          "adminToken",
          response.data.token
        );

        // Store admin information
        localStorage.setItem(
          "admin",
          JSON.stringify(response.data.admin)
        );

        // Navigate to Admin Dashboard
        navigate("/admindashboard");
      }

      // =========================
      // LOGIN FAILED
      // =========================

      else {
        const message =
          response.data.message ||
          "Invalid admin credentials";

        // Show backend error
        setErrors({
          email: message,
          password: "",
        });
      }
    } catch (error) {
      console.log(
        "Admin Login Error:",
        error
      );

      if (error.response) {
        const message =
          error.response.data.message ||
          "Invalid admin credentials";

        setErrors({
          email: message,
          password: "",
        });
      } else {
        setErrors({
          email: "Unable to connect to server",
          password: "",
        });
      }
    }
  };

  // =========================
  // JSX
  // =========================

  return (
    <div className="admin-login-container">
       <div className="background-shapes">

        <div className="shape shape-one"></div>

        <div className="shape shape-two"></div>

        <div className="shape shape-three"></div>

        <div className="shape shape-four"></div>

        <div className="shape shape-five"></div>

        <div className="shape shape-six"></div>

        <div className="shape shape-seven"></div>

        <div className="glow glow-one"></div>

        <div className="glow glow-two"></div>

        <div className="glow glow-three"></div>

        <div className="star star-one">✦</div>

        <div className="star star-two">✦</div>

        <div className="star star-three">✦</div>

      </div>
      {/* =========================
          LOGIN CARD
      ========================== */}

      <div className="admin-login-box">

        {/* =========================
            FLOATING ADMIN EMOJI
        ========================== */}

        <div className="floating-admin">
          👨‍💼
        </div>

        {/* =========================
            HEADING
        ========================== */}

        <div className="admin-login-heading">

          <h2>
            Admin Login
          </h2>

          <p>
            Login to access the Admin Dashboard
          </p>

        </div>

        {/* =========================
            LOGIN FORM
        ========================== */}

        <form onSubmit={handleAdminLogin}>

          {/* =========================
              EMAIL
          ========================== */}

          <div className="admin-input-group">

            <label>
              Admin Email
            </label>

            <input
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);

                setErrors((previous) => ({
                  ...previous,
                  email: "",
                }));
              }}
            />

            {errors.email && (
              <span className="admin-error">
                {errors.email}
              </span>
            )}

          </div>

          {/* =========================
              PASSWORD
          ========================== */}

          <div className="admin-input-group">

            <label>
              Password
            </label>

            <div className="admin-password-container">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);

                  setErrors((previous) => ({
                    ...previous,
                    password: "",
                  }));
                }}
              />

              {/* EYE BUTTON */}

              <button
                type="button"
                className="admin-password-eye"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

            {errors.password && (
              <span className="admin-error">
                {errors.password}
              </span>
            )}

          </div>

          {/* =========================
              LOGIN BUTTON
          ========================== */}

          <button
            type="submit"
            className="admin-login-button"
          >
            Admin Login
          </button>

        </form>

        {/* =========================
            BACK TO ROLE SELECTION
        ========================== */}

        <button
          type="button"
          className="back-role-button"
          onClick={() =>
            navigate("/roleselection")
          }
        >
          ← Back to Role Selection
        </button>

      </div>

    </div>
  );
}

export default AdminLogin;