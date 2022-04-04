import React, { Component } from "react";
import { Link } from "react-router-dom";
import BannerBg from "../../assests/images/hero_bg.jpg";
import BannerBg2 from "../../assests/images/hero_bg_2.jpg";

const NotFound = () => {
  return (
    <div>
      <div className="page-wrap d-flex flex-row align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 text-center">
              <span className="display-1 d-block">404</span>
              <div className="mb-4 lead">The page you are looking for was not found.</div>
              
              <Link to="/">Back to Home</Link>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default NotFound;
