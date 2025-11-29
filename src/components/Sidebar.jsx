import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiHome, FiBookOpen, FiBarChart2, FiLogIn, FiUserPlus, FiLogOut } from "react-icons/fi";

export default function Sidebar() {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">NutriTrack</h2>

      <nav className="sidebar-links">

        <Link
          to="/dashboard"
          className={`nav-item ${pathname === "/dashboard" ? "nav-active" : ""}`}
        >
          <FiHome className="nav-icon" />
          <span>Overview</span>
        </Link>

        <Link
          to="/diary"
          className={`nav-item ${pathname === "/diary" ? "nav-active" : ""}`}
        >
          <FiBookOpen className="nav-icon" />
          <span>Food Diary</span>
        </Link>

        <Link
          to="/analysis"
          className={`nav-item ${pathname === "/analysis" ? "nav-active" : ""}`}
        >
          <FiBarChart2 className="nav-icon" />
          <span>Analysis</span>
        </Link>

        {!user && (
          <Link
            to="/login"
            className={`nav-item ${pathname === "/login" ? "nav-active" : ""}`}
          >
            <FiLogIn className="nav-icon" />
            <span>Login</span>
          </Link>
        )}

        {!user && (
          <Link
            to="/register"
            className={`nav-item ${pathname === "/register" ? "nav-active" : ""}`}
          >
            <FiUserPlus className="nav-icon" />
            <span>Register</span>
          </Link>
        )}

        {user && (
          <div
            className="nav-item logout-btn"
            onClick={logout}
          >
            <FiLogOut className="nav-icon" />
            <span>Logout</span>
          </div>
        )}

      </nav>
    </div>
  );
}
