import Navbar from "./NavBar";
import { Outlet } from "react-router-dom";
import "../styles/MainLayout.css"

function MainLayout() {
  return (
    <>
      <Navbar />

      <main className="main-content">
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;