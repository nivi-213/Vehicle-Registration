// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "./navbar.css";

// function Navbar() {
//   const [activeLink, setActiveLink] = useState("");
//   const handleLinkClick = (link) => {
//     setActiveLink(link); // Assuming you have a state setter function for activeLink
//   };

//   return (
//     <header className="navbar navbar-expand-lg navbar-light bg-light">
//       <div className="container-fluid registration">
      
//         <div>
//           <img
//             src={`${process.env.PUBLIC_URL}/car8.png`}
//             alt="Car"
//             width="50"
//             height="50"
//           />

//           <Link
//             className="navbar-brand redbus"
//             to="/"
//             style={{ color: "blue" }}
//           >
//             <span className="vehicle me-2">Vehicle Registration Form</span>
//           </Link>
//         </div>

//         <button
//           className="navbar-toggler"
//           type="button"
//           onClick={() => setActiveLink("")}
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         {/* Navbar Links */}
//         <div
//           className={`collapse navbar-collapse justify-content-end ${
//             activeLink ? "show" : ""
//           }`}
//           id="navbarSupportedContent"
//         >
//           <ul className="navbar-nav">
//             {/* Nav links */}
//             <li className="nav-item">
//               <Link
//                 className={`nav-link ${activeLink === "home" ? "active" : ""}`}
//                 to="/vehicle-registration"
//                 onClick={() => handleLinkClick("home")}
//               >
//                 <span> Vehicle Registration</span>
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link
//                 className={`nav-link ${
//                   activeLink === "task-list" ? "active" : ""
//                 }`}
//                 to="/vehicle-view"
//                 onClick={() => handleLinkClick("task-list")}
//               >
//                 <span>Vehicle View</span>
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default Navbar;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    const savedActiveLink = localStorage.getItem("activeLink");
    if (savedActiveLink) {
      setActiveLink(savedActiveLink);
    }
  }, []);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    localStorage.setItem("activeLink", link);
  };

  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid registration">
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/car8.png`}
            alt="Car"
            width="50"
            height="50"
          />
          <Link className="navbar-brand redbus" to="/" style={{ color: "blue" }}>
            <span className="vehicle me-2">Vehicle Registration Form</span>
          </Link>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setActiveLink("")}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse justify-content-end ${
            activeLink ? "show" : ""
          }`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className={`nav-link ${activeLink === "home" ? "active" : ""}`}
                to="/vehicle-registration"
                onClick={() => handleLinkClick("home")}
              >
                <span>Vehicle Registration</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  activeLink === "task-list" ? "active" : ""
                }`}
                to="/vehicle-view"
                onClick={() => handleLinkClick("task-list")}
              >
                <span>Vehicle View</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
