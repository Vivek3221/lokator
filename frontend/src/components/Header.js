import React, { useState } from "react";
import Logo from "../assests/images/logo.jpeg";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser, getUser } from "../store/actions/users";
import { withRouter } from "react-router-dom";
function Header({ user: { user }, logoutUser, history }) {
  const [toggleMenu, setToggleMenu] = useState(false);

  const Menu = (
    <>
      <li className="active">
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/about">About Us</NavLink>
      </li>
      <li>
        <NavLink to="/products?query=Mobile%20Crane">Marketplace</NavLink>
      </li>

      <li>
        <NavLink to="/contact">Contact</NavLink>
      </li>
      {!user ? (
        <>
          <li>
            <Link
              to="/register?role_id=1"
              target="_blank"
              className="btn btn-primary text-white"
            >
              <i className="fa fa-sign-in" aria-hidden="true"></i>
              Register as Customer
            </Link>
          </li>
          <li>
            <Link
              to="/register?role_id=2"
              target="_blank"
              className="btn btn-primary text-white"
            >
              <i className="fa fa-sign-in" aria-hidden="true"></i>
              Register as Partner
            </Link>
          </li>
        </>
      ) : (
        <>
          <li className="nav-item">
            <a
              className="nav-link"
              onClick={() => {
                history.push("/profile");
              }}
            >
              <i className="fa fa-fw fa-user" />
              My Profile
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              onClick={() => {
                logoutUser(history);
              }}
            >
              <i className="fa fa-fw fa-sign-out" />
              Logout
            </a>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className="site-wrap">
      <div className="site-mobile-menu">
        <div className="site-mobile-menu-header">
          <div className="site-mobile-menu-close mt-3">
            <span className="icon-close2 js-menu-toggle" />
          </div>
        </div>
        <div className="site-mobile-menu-body" />
      </div>
      <header className="site-navbar py-3" role="banner">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-11 col-xl-2">
              <h1 className="mb-0">
                <Link to="/" className="text-white h2 mb-0">
                  <img src={Logo} width="200" />
                </Link>
              </h1>
            </div>
            <div className="col-12 col-md-10 d-none d-xl-block">
              <nav
                className="site-navigation position-relative text-right"
                role="navigation"
              >
                <ul className="site-menu js-clone-nav mx-auto d-none d-lg-block">
                  {Menu}
                </ul>
              </nav>
            </div>
            <div
              className="d-inline-block d-xl-none ml-md-0 mr-auto py-3"
              
            >
              <a
                href="#"
                onClick={() => setToggleMenu(!toggleMenu)}
                className="site-menu-toggle js-menu-toggle"
              >
                <span className="icon-menu h3" />
              </a>
            </div>
          </div>
        </div>
      </header>
      {toggleMenu && (
        <div className="mobile-menu container">
          <ul>{Menu}</ul>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  allapi: state.allapi,
});

const mapActionsToProps = {
  getUser,
  logoutUser,
};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Header));
