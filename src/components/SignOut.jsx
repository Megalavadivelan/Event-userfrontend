import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignOut.css";

function SignOut() {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/signup");
  };

  return (
    <div className="signout-page">

      {/* Background Design */}
      <div className="signout-background">

        <span className="signout-star star1">✦</span>
        <span className="signout-star star2">✦</span>
        <span className="signout-star star3">✦</span>
        <span className="signout-star star4">✦</span>
        <span className="signout-star star5">✦</span>
        <span className="signout-star star6">✦</span>
        

        <span className="signout-glow glow-left"></span>
        <span className="signout-glow glow-right"></span>

      </div>


      {/* Sign Out Card */}
      <div className="signout-card">

        <div className="signout-icon">
          ↪
        </div>

        <h1>Sign Out?</h1>

        <p>
          Are you sure you want to sign out of your account?
        </p>

        <span className="signout-small-text">
          You can sign in again anytime.
        </span>


        <div className="signout-actions">

          <button
            className="cancel-button"
            onClick={handleCancel}
          >
            Cancel
          </button>

          <button
            className="confirm-button"
            onClick={handleSignOut}
          >
            Yes, Sign Out
          </button>

        </div>

      </div>

    </div>
  );
}

export default SignOut;