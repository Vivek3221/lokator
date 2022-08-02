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

  const [show,setShow] = useState(false)
  

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
          <img className="cs-logo" width="200" src={Logo} />
        </Link>
        <div
              className="d-inline-block d-xl-none ml-md-0 mr-auto py-3"
              
            >
              <a
                href="#"
                onClick={() => setShow(!show)}
                className="site-menu-toggle js-menu-toggle"
              >
                <span className="icon-menu h3" />
              </a>
            </div>
        <div className={`collapse navbar-collapse ${show?"active":""}`} id="navbarResponsive">
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
