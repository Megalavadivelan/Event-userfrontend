import React from "react";
// import Navbar from "../components/NavBar";
import "../styles/UserDashboard.css"
import Home from "../components/Home"
import Events from "../components/Events"
// import About from "../components/About.jsx";

import SignOut from "../components/SignOut";

const UserDashboard = () => {

  return (

    <div className="dashboard">

      {/* <Navbar /> */}
      <Home />
      <Events />
      {/* <About /> */}

      <SignOut />
      


      <div className="navbar-background">

        <span className="nav-star star-1">✦</span>
        <span className="nav-star star-2">✦</span>
        <span className="nav-star star-3">✦</span>
        <span className="nav-star star-4">✦</span>
        <span className="nav-star star-5">✦</span>

        <span className="nav-glow glow-left"></span>
        <span className="nav-glow glow-right"></span>

      </div>
      {/* Your dashboard content */}

      {/* <div className="dashboard-content">

        <h1>Welcome to EventSphere</h1>

        <p>
          Plan, manage and explore amazing events.
        </p>

      </div> */}

    </div>

  );

};

export default UserDashboard;