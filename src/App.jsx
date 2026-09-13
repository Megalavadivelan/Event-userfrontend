import { Routes, Route } from "react-router-dom";

import MainLayout from "./components/MainLayout.jsx";

import Login from "./components/login.jsx";
import Signup from "./components/SignUp.jsx";
import RoleSelection from "./components/RoleSelection.jsx";
import AdminLogin from "./components/AdminLogin.jsx";

import UserDashboard from "./components/UserDashboard.jsx";
import Home from "./components/Home.jsx";
import SignOut from "./components/SignOut.jsx";

import OrganizeEvent from "./components/OrganizeEvents.jsx";
import Profile from "./components/Profile.jsx";
import Events from "./components/Events.jsx";

import BookTickets from "./components/BookTickets.jsx";
import EventDetails from "./components/EventDetails.jsx";

import Contact from "./components/Contact";
import Gallery from "./components/Gallery.jsx";
import MyBookings from "./components/MyBookings.jsx";
import About from "./components/About.jsx";

function App() {
  return (
    <Routes>

      {/* =========================================
          PAGES WITHOUT NAVBAR
      ========================================= */}

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

      <Route
        path="/roleselection"
        element={<RoleSelection />}
      />

      <Route
        path="/adminlogin"
        element={<AdminLogin />}
      />


      {/* =========================================
          PAGES WITH NAVBAR
      ========================================= */}

      <Route element={<MainLayout />}>

        {/* HOME */}
        <Route
          path="/home"
          element={<Home />}
        />

        {/* USER DASHBOARD */}
        <Route
          path="/user-dashboard"
          element={<UserDashboard />}
        />

        {/* PROFILE */}
        <Route
          path="/profile"
          element={<Profile />}
        />

        {/* ORGANIZE EVENT */}
        <Route
          path="/organizereq"
          element={<OrganizeEvent />}
        />

        {/* EVENTS */}
        <Route
          path="/events"
          element={<Events />}
        />

        {/* =========================================
            SINGLE EVENT DETAILS
        ========================================= */}

        <Route
          path="/eventdetails/:id"
          element={<EventDetails />}
        />


        {/* =========================================
            BOOK TICKETS
        ========================================= */}

        <Route
          path="/booktickets"
          element={<BookTickets />}
        />


        {/* =========================================
            SIGN OUT
        ========================================= */}

        <Route
          path="/signout"
          element={<SignOut />}
        />


        {/* CONTACT */}
        <Route
          path="/contact"
          element={<Contact />}
        />


        {/* GALLERY */}
        <Route
          path="/gallery"
          element={<Gallery />}
        />


        {/* MY BOOKINGS */}
        <Route
          path="/mybookings"
          element={<MyBookings />}
        />


        {/* ABOUT */}
        <Route
          path="/about"
          element={<About />}
        />

      </Route>

    </Routes>
  );
}

export default App;