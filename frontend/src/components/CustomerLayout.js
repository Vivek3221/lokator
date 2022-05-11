import React, { Component, useState, useEffect } from "react";
import "../assests/scss/admin.scss";
import { withRouter } from "react-router";
import { logoutUser, getUser } from "../store/actions/users";
import { Link, NavLink } from "react-router-dom";
import Logo from "../assests/images/logo.jpeg";
import { connect } from "react-redux";
import { get } from "lodash";
const CustomerLayout = ({
  children,
  history,
  logoutUser,
  getUser,
  user: { user },
}) => {
  const [showLogins, setLogins] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [toggleChild, setToogleChild] = useState(false);

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div>
      {/* Navigation*/}
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top customer-layout"
        id="mainNav"
      >
        <Link to="/">
          <img width="250" src={Logo} />
        </Link>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
            <li>
              <div className="logo_group"></div>
            </li>
            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/customer-dashboard">
                <i className="fa fa-fw fa-dashboard" />
                <span className="nav-link-text">Dashboard</span>
              </NavLink>
            </li> */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">
                <i className="fa  fa-truck" />
                <span className="nav-link-text">Products</span>
              </NavLink>
            </li>
          </ul>

          <ul className="navbar-nav ml-auto">
            {Boolean(user) ? (
              <>
                <li className="nav-item">
                  <span className="user_name">
                    {get(user, "user.first_name", "")}{" "}
                    {get(user, "user.last_name", "")}
                  </span>
                </li>
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
                      history.push("/customer-orders");
                    }}
                  >
                    <i className="fa fa-fw fa-user" />
                    My Orders
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
            ) : (
              <>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    onClick={() => {
                      history.push("/login?role_id=1");
                    }}
                  >
                    <i className="fa fa-user" />
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    onClick={() => {
                      history.push("/register?role_id=1");
                    }}
                  >
                    <i className="fa fa-sign-in" />
                    Register
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <div className="content-wrapper customer-layout">
        <div className="container-fluid">{children}</div>
        {/* /.container-fluid*/}
        {/* /.content-wrapper*/}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  allapi: state.allapi,
});

const mapActionsToProps = {
  getUser,
  logoutUser,
};

export default withRouter(
  connect(mapStateToProps, mapActionsToProps)(CustomerLayout)
);
