import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6">
                <h2 className="footer-heading mb-4">Quick Links</h2>
                <ul className="list-unstyled">
                <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/about">About Us</Link>
                  </li>
                  <li>
                  <Link to="/service">Services</Link>
                  </li>
                 
                  <li>
                  <Link to="/contact">Contact Us</Link>
                  </li>
                </ul>
              </div>
              
              <div className="col-md-6">
                <h2 className="footer-heading mb-4">Follow Us</h2>
                <a href="#" className="pl-0 pr-3">
                  <span className="icon-facebook" />
                </a>
                <a href="#" className="pl-3 pr-3">
                  <span className="icon-twitter" />
                </a>
                <a href="#" className="pl-3 pr-3">
                  <span className="icon-instagram" />
                </a>
                <a href="#" className="pl-3 pr-3">
                  <span className="icon-linkedin" />
                </a>
              </div>
            </div>
          </div>
          
        </div>
        <div className="row  text-center">
          <div className="col-md-12">
            <div className="border-top pt-5">
              <p>
                © 2021 <Link to="/">Lokator</Link> All rights reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
