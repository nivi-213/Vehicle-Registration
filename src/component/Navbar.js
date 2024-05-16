import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid registration">
        {/* Navbar Brand */}
        <div>
          <Link
            className="navbar-brand redbus"
            to="/"
            style={{ color: "blue" }}
          >
            <span className="vehicle">Vehicle Registration Form</span>
          </Link>
        </div>
        {/* Navbar Toggler Button */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div
          className={`collapse navbar-collapse justify-content-end ${
            isOpen ? "show" : ""
          }`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav">
            {/* Nav links */}
            <li className="nav-item">
              <Link className="nav-link" to="/home">
                <span>Form</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/task-list">
                <span>List</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
