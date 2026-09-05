import "../styles/RoleSelection.css";
import { useNavigate } from "react-router-dom";

function RoleSelection() {

  const navigate = useNavigate();

  // User button
  const handleUser = () => {
    navigate("/user-dashboard");
  };

  // Admin button
  const handleAdmin = () => {
    navigate("/admin-login");
  };

  return (
    <div className="role-container">
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
      <div className="role-card">

        <h2>Welcome</h2>

        <p className="role-subtitle">
          Select your role to continue
        </p>

        <div className="role-options">

          {/* USER CARD */}
          <div
            className="role-option"
            onClick={handleUser}
          >

            <div className="role-icon">
              👤
            </div>

            <h3>User</h3>

            <p>
              Continue as a User
            </p>

            <button type="button">
              Continue as User
            </button>

          </div>


          {/* ADMIN CARD */}
          <div
            className="role-option"
            onClick={handleAdmin}
          >

            <div className="role-icon">
              👨‍💼
            </div>

            <h3>Admin</h3>

            <p>
              Continue as an Admin
            </p>

            <button type="button">
              Continue as Admin
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default RoleSelection;
