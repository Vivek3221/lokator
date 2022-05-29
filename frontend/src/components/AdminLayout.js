import React, { Component, useState, useEffect } from "react";
import "../assests/scss/admin.scss";
import { withRouter } from "react-router";
import { logoutUser, getUser } from "../store/actions/users";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { get } from "lodash";
const AdminLayout = ({
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
        className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top"
        id="mainNav"
      >
        <Link className="navbar-brand" to="/">
          Lokator
        </Link>

        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
            <li
              className="nav-item"
              data-toggle="tooltip"
              data-placement="right"
            >
              {/* {user?.role_id != 1 && (
                <NavLink className="nav-link" to="/dashboard">
                  <i className="fa fa-fw fa-dashboard" />
                  <span className="nav-link-text">Dashboard</span>
                </NavLink>
              )} */}
              {user?.role_id != 1 && (
                <>
                  <NavLink className="nav-link" to="/orders">
                    <i className="fa fa-cart-arrow-down" />
                    <span className="nav-link-text">Orders</span>
                  </NavLink>
                  {user?.role_id != 2 && (
                    <>
                      <NavLink className="nav-link" to="/contact-leads">
                        <i className="fa fa-fw fa-address-card" />
                        <span className="nav-link-text">Contact Leads</span>
                      </NavLink>
                      <NavLink className="nav-link" to="/inquiries">
                        <i className="fa fa-fw fa-info-circle" />
                        <span className="nav-link-text">Inquiries</span>
                      </NavLink>
                      <NavLink className="nav-link" to="/users-list">
                        <i className="fa fa-fw fa-users" />
                        <span className="nav-link-text">User List</span>
                      </NavLink>
                    </>
                  )}

                  <button
                    className="nav-link"
                    onClick={() => setToogleChild(!toggleChild)}
                  >
                    <i class="fa fa-industry"></i>
                    <span className="nav-link-text">Machine Management</span>
                    <i
                      className={`fa  ${
                        toggleChild ? "fa-caret-down" : "fa-caret-right"
                      } btn-arrow`}
                    ></i>
                  </button>
                  {toggleChild && (
                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 child-menu">
                      {user?.role_id != 2 && (
                        <>
                          <li>
                            <NavLink to="/capacity-management">
                              Capacity
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to="/types-management">Types</NavLink>
                          </li>
                          <li>
                            <NavLink to="/category-management">
                              Category
                            </NavLink>
                          </li>
                        </>
                      )}
                      <li>
                        <NavLink to="/machines">Machines</NavLink>
                      </li>
                    </ul>
                  )}
                </>
              )}
            </li>
            {user?.role_id == 1 && (
              <>
                <li
                  className="nav-item"
                  data-toggle="tooltip"
                  data-placement="right"
                >
                  <NavLink className="nav-link" to="/customer-orders">
                    <i className="fa fa-cart-arrow-down" />
                    <span className="nav-link-text">Orders</span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <span className="user_name">
                {get(user, "first_name", "")} {get(user, "last_name", "")}
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
                  logoutUser(history);
                }}
              >
                <i className="fa fa-fw fa-sign-out" />
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="content-wrapper">
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
  connect(mapStateToProps, mapActionsToProps)(AdminLayout)
);
