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
      <div className="container-fluid">
        <img src="vechicle3.jpg" alt="" width="50" height="50" className="ms-3"/>
        <Link className="navbar-brand redbus" to="/" style={{ color: "blue" }}>
          <span className="vehicle">Vehicle Registration</span>
        </Link>

     
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ml-auto">
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
