import "../styles/SignUp.css";

import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import {
  Link,
  useNavigate
} from "react-router-dom";

import { useState } from "react";

import axios from "axios";


function Signup() {

  const navigate = useNavigate();


  // =========================
  // FORM VALUES
  // =========================

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [cpassword, setCpassword] = useState("");


  // =========================
  // SHOW / HIDE PASSWORD
  // =========================

  const [showPassword, setShowPassword] =
    useState(false);

  const [showCpassword, setShowCpassword] =
    useState(false);


  // =========================
  // SIGNUP FUNCTION
  // =========================

  const handleSignup = async (e) => {

    e.preventDefault();


    // =========================
    // VALIDATION
    // =========================

    if (!name.trim()) {

      alert("Please enter your name");

      return;
    }


    if (!email.trim()) {

      alert("Please enter your email");

      return;
    }


    if (!password) {

      alert("Please enter your password");

      return;
    }


    if (!cpassword) {

      alert("Please confirm your password");

      return;
    }


    // =========================
    // PASSWORD MATCH
    // =========================

    if (password !== cpassword) {

      alert("Passwords do not match");

      return;
    }


    // =========================
    // BACKEND
    // =========================

    try {

      const response = await axios.post(
        "http://localhost:5000/signup/create",
        {
          name: name.trim(),
          email: email.trim(),
          password: password
        }
      );


      console.log(
        "Signup Response:",
        response.data
      );


      // =========================
      // SUCCESS
      // =========================

      if (response.data.success) {

        alert("Signup Successful!");


        // Store user information
        // if backend sends it

        if (response.data.user) {

          localStorage.setItem(
            "user",
            JSON.stringify(
              response.data.user
            )
          );

        }


        // =========================
        // GO TO ROLE SELECTION
        // =========================

        navigate("/roleselection");

      }


      // =========================
      // SIGNUP FAILED
      // =========================

      else {

        alert(
          response.data.message ||
          "Signup failed"
        );

      }

    }


    // =========================
    // BACKEND ERROR
    // =========================

    catch (error) {

      console.log(
        "Signup Error:",
        error
      );


      if (error.response) {

        alert(
          error.response.data.message ||
          "Signup failed"
        );

      }

      else {

        alert(
          "Unable to connect to server"
        );

      }

    }

  };


  return (

    <div className="signup-container">
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
      <div className="sign-in">


        {/* =========================
            HEADING
        ========================= */}

        <div className="detail1">

          <h2 className="h2one">
            Welcome
          </h2>

          <h4 className="h4one">
            Create Account
          </h4>

        </div>


        {/* =========================
            SIGNUP FORM
        ========================= */}

        <form
          onSubmit={handleSignup}
        >


          {/* =========================
              NAME
          ========================= */}

          <input
            type="text"
            placeholder="Enter Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />


          {/* =========================
              EMAIL
          ========================= */}

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />


          {/* =========================
              PASSWORD
          ========================= */}

          <div className="signup-password-container">

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }

              placeholder="Enter Password"

              value={password}

              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
            />


            <button
              type="button"

              className="signup-password-eye"

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


          {/* =========================
              CONFIRM PASSWORD
          ========================= */}

          <div className="signup-password-container">

            <input
              type={
                showCpassword
                  ? "text"
                  : "password"
              }

              placeholder="Confirm Password"

              value={cpassword}

              onChange={(e) =>
                setCpassword(
                  e.target.value
                )
              }
            />


            <button
              type="button"

              className="signup-password-eye"

              onClick={() =>
                setShowCpassword(
                  !showCpassword
                )
              }

              aria-label={
                showCpassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
            >

              {showCpassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}

            </button>

          </div>


          {/* =========================
              SIGN UP BUTTON
          ========================= */}

          <button
            type="submit"
            id="btn1"
          >
            Sign Up
          </button>

        </form>


        {/* =========================
            GOOGLE
        ========================= */}

        <p className="para1">

          ------or continue with------

        </p>


        <button
          id="google"
          type="button"
        >

          <FcGoogle size={22} />

          <span>
            Continue With Google
          </span>

        </button>


        {/* =========================
            LOGIN
        ========================= */}

        <p>

          Already have an account?{" "}

          <Link
            to="/login"
            id="btn2"
          >
            Login
          </Link>

        </p>


      </div>

    </div>

  );

}


export default Signup;
