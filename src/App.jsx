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
import EventDetails from "./components/EventDetails.jsx";
import Contact from "./components/Contact";
import Gallery from "./components/Gallery.jsx";

function App() {
  return (
    <Routes >

      {/* Pages WITHOUT Navbar */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/roleselection" element={<RoleSelection />} />
      <Route path="/adminlogin" element={<AdminLogin />} />


      {/* Pages WITH Navbar */}
      <Route element={<MainLayout />}>

        <Route path="/home" element={<Home />} />

        <Route
          path="/user-dashboard"
          element={<UserDashboard />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />
        <Route
          path="organizereq"
          element={<OrganizeEvent />}
        />

        <Route
          path="/events"
          element={<Events />}
        />

        <Route
          path="/eventdetails"
          element={<EventDetails />}
        />

        <Route
          path="/signout"
          element={<SignOut />}
        />
        <Route path="/contact" element={<Contact />}/>
        <Route path="/gallery" element={<Gallery />}/>
      </Route>

    </Routes>
  );
}

export default App;