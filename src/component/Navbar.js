import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faList } from "@fortawesome/free-solid-svg-icons";
import { faBus } from "@fortawesome/free-solid-svg-icons";
import "./navbar.css";
function Navbar() {
  return (
    <nav className="navbar  navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid w-100">
        <img src="bus1.jpg"  alt="Red Bus Logo" className="mr-2" width="150" height="50" />
        <Link className="navbar-brand redbus" to="/" style={{ color: "red" }}>
          {/* <FontAwesomeIcon
            icon={faBus}
            className="mr-1 ms-2"
            style={{ color: "red" }}
          /> */}
          Travels
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/home">
                <FontAwesomeIcon
                  icon={faHome}
                  className="mr-1"
                  style={{ color: "blue" }}
                />
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item  d-flex">
              <Link className="nav-link" to="/task-list">
                <FontAwesomeIcon
                  icon={faList}
                  className="mr-1 "
                  style={{ color: "green" }}
                />
              
              Task list
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
