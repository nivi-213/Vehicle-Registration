import React from "react";
import "./Home.css";

function Home() {
  return (
    <div>
      <section>
        <h1 className="HomePage_section-header__BCY60 text-uppercase mt-3 text-center">
          Fast. Easy. Transparent.
        </h1>
        <h2 className="HomePage_section-subheader__pRId_ text-center d-none d-md-block">
          Is How We Compare Insurance Policies
        </h2>
      </section>
      <section className="d-flex justify-content-evenly vehing flex-wrap d-md-flex flex-wrap">
        <div className="col-md-4 col-lg-3">
          <img
            src="Car-With-Banner.gif"
            alt="Car With Banner"
            width="300"
            height="300"
            className="mt-4 mx-auto d-block"
          />
          <p className="text-center mt-3">4 Wheeler</p>
        </div>
        <div className="col-md-4 col-lg-3">
          <img
            src="Bike-With-Banner.gif"
            alt="Bike With Banner"
            width="300"
            height="300"
            className="mt-4 mx-auto d-block"
          />
          <p className="text-center mt-3">2 Wheeler</p>
        </div>
        <div className=" d-none col-md-4 col-lg-3">
          <img
            src="Truck-With-Banner.gif"
            alt="Truck With Banner"
            width="300"
            height="300"
            className="mt-4 mx-auto d-block"
          />
          <p className="text-center mt-3">Commercial Vehicle</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer text-center mt-5">
        <p>© 2024 Insurance Comparison. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
