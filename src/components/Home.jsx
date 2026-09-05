import React from "react";
import Hero from "../components/Hero"
import "../styles/Home.css"
import Navbar from "./NavBar";

function Home() {
  return (
    <>
    <div className="navbar-background">

        <span className="nav-star star1">✦</span>
        <span className="nav-star star2">✦</span>
        <span className="nav-star star3">✦</span>
        <span className="nav-star star4">✦</span>
        <span className="nav-star star5">✦</span>

        <span className="nav-glow glow-left"></span>
        <span className="nav-glow glow-right"></span>

      </div>
      {/* <Navbar /> */}
      <Hero />
    </>
  );
}

export default Home;