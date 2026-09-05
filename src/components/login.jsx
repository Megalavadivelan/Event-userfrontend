import "../styles/login.css";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
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
      newErrors.email = "Email is required";
      hasError = true;
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      newErrors.email = "Enter a valid email";
      hasError = true;
    }

    if (!password) {
      newErrors.password = "Password is required";
      hasError = true;
    } else if (password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters";
      hasError = true;
    }

    setErrors(newErrors);

    // Stop if validation error
    if (hasError) {
      return;
    }

    // =========================
    // BACKEND LOGIN
    // =========================

    try {
      const response = await axios.post(
        "http://localhost:5000/login/loginuser",
        {
          email: email.trim(),
          password: password,
        }
      );

      console.log("Login Response:", response.data);

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
          "token",
          response.data.token
        );

        // Store user information
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );

        alert("Login Successful!");

        // Go to Role Selection
        navigate("/roleselection");
      }

      // =========================
      // LOGIN FAILED
      // =========================

      else {
        const message =
          response.data.message || "Login failed";

        if (
          message.toLowerCase().includes("password")
        ) {
          setErrors({
            email: "",
            password: message,
          });
        } else if (
          message.toLowerCase().includes("user")
        ) {
          setErrors({
            email: message,
            password: "",
          });
        } else {
          setErrors({
            email: message,
            password: "",
          });
        }
      }
    } catch (error) {
      console.log("Login Error:", error);

      if (error.response) {
        const message =
          error.response.data.message ||
          "Login failed";

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

  return (
    <div className="login-container">

      {/* =================================
          BACKGROUND GEOMETRIC SHAPES
      ================================= */}

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


      {/* =================================
          LOGIN CARD
      ================================= */}

      <div className="sign-in">

        {/* Heading */}

        <div className="detail1">

          <h2 className="h2one">
            Welcome
          </h2>

          <h4 className="h4one">
            Sign In
          </h4>

        </div>


        {/* =================================
            LOGIN FORM
        ================================= */}

        <form onSubmit={handleLogin}>

          {/* EMAIL */}

          <div className="input-row">

            <input
              type="email"
              placeholder="Enter Email"
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
              <span className="input-error">
                {errors.email}
              </span>
            )}

          </div>


          {/* PASSWORD */}

          <div className="input-row">

            <div className="password-container">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter Password"
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
                className="password-eye"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
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
              <span className="input-error">
                {errors.password}
              </span>
            )}

          </div>


          {/* LOGIN BUTTON */}

          <button
            type="submit"
            id="btn1"
          >
            Login
          </button>

        </form>


        {/* =================================
            GOOGLE LOGIN
        ================================= */}

        <p className="para1">
          ------ or continue with ------
        </p>

        <button
          id="google"
          type="button"
        >
          <FcGoogle size={20} />

          <span>
            Continue With Google
          </span>

        </button>


        {/* =================================
            SIGN UP
        ================================= */}

        <p className="signup-text">

          Don't have an account?{" "}

          <button
            type="button"
            id="btn2"
            onClick={() =>
              navigate("/signup")
            }
          >
            Sign-Up
          </button>

        </p>

      </div>

    </div>
  );
}

export default Login;