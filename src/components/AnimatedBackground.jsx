import React from "react";
import "../styles/AnimatedBackground.css";

const AnimatedBackground = () => {
  return (
    <div className="animated-background">

      {/* Floating Eventora Text */}
      <div className="floating-eventora">
        EVENTORA
      </div>

      {/* Floating Half Moon */}
      <div className="floating-moon">
        <div className="moon-shadow"></div>
      </div>

      {/* Sparkles */}
      <span className="bg-sparkle sparkle-a"></span>
      <span className="bg-sparkle sparkle-b"></span>
      <span className="bg-sparkle sparkle-c"></span>
      <span className="bg-sparkle sparkle-d"></span>
      <span className="bg-sparkle sparkle-e"></span>
      <span className="bg-sparkle sparkle-f"></span>
      <span className="bg-sparkle sparkle-g"></span>
      <span className="bg-sparkle sparkle-h"></span>

      {/* Small glowing particles */}
      <span className="glow-dot dot-a"></span>
      <span className="glow-dot dot-b"></span>
      <span className="glow-dot dot-c"></span>
      <span className="glow-dot dot-d"></span>

    </div>
  );
};

export default AnimatedBackground;