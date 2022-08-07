import React, { Component, useState, useEffect } from "react";
import "../assests/scss/admin.scss";
import { withRouter } from "react-router";
import { logoutUser, getUser } from "../store/actions/users";
import { getNotification,updateNotification } from "../store/actions/allapi";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import Logo from "../assests/images/logo.jpeg";
import { get } from "lodash";
const AdminLayout = ({
  children,
  history,
  logoutUser,
  getUser,
  getNotification,
  updateNotification,
  user: { user },
  allapi:{notification}
}) => {
  const [showNote, setShowNote] = useState(false);
  console.log(notification)
  const [toggleChild, setToogleChild] = useState(false);

  const handleNotificationClick =  (type)=>{
    
    updateNotification(type,history)
    setShowNote(false)
  }

  useEffect(() => {
    getUser();
    getNotification()
    setInterval(()=>{
      getNotification()
    },3000)
    
  }, []);
  return (
    <div>
      {/* Navigation*/}
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top no-padding"
        id="mainNav"
      >
        <Link className="navbar-brand" to="/">
        <img width="200" src={Logo} />
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
                    <i className="fa fa-industry"></i>
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
          {Boolean(notification?.total_notification) && (
          <ul className="nav navbar-nav navbar-right">
        <li className="dropdown">
          <a  className="nav-link notify" onClick={()=> setShowNote(!showNote)} data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i className="fa fa-bell" aria-hidden="true"></i>
 (<b>{notification?.total_notification}</b>)</a>
          {showNote && (
          <ul className="dropdown-menu notify-drop">
            <div className="notify-drop-title">
              <div className="row">
                <div className="col-md-12">Notifications (<b>{notification?.total_notification}</b>)</div>
              </div>
            </div>
            
            <div className="drop-content">

              {notification?.notification?.map(item=>{
                let type = item.hasOwnProperty("Register")? 'Register':item.hasOwnProperty("Product") ? 'Product':item.hasOwnProperty("Machine")?'Machine':item.hasOwnProperty("Order")?'Order' :'Inquiries';
               return (<li>
               <button onClick={()=> handleNotificationClick(type)}>
               <div className="col-md-3 col-sm-3 col-xs-3"><div className="notify-img"><i className={`fa  ${type== 'Register'?'fa-user-plus':type == 'Product'?'fa-cart-arrow-down':type=='Machine'?'fa-industry':type == 'Order'?'fa-cart-arrow-down':'fa-envelope' }`}></i></div></div>
               <div className="col-md-9 col-sm-9 col-xs-9 pd-l0"><p className="title" >{type} ({item[type].total})</p> 
                 <hr />
                 {item[type]?.details?.map(pitem=>{
                  return <p className="time">{pitem.detail}</p>
                 })}
                 </div>
                 </button>
             </li>)}
                )}
             
            </div>
          </ul>
          )}
        </li>
      </ul>
      )}
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
  getNotification,
  updateNotification
};

export default withRouter(
  connect(mapStateToProps, mapActionsToProps)(AdminLayout)
);



