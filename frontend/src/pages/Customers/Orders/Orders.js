import React, { Component, useState, useEffect } from "react";
import { getOrders } from "../../../store/actions/allapi";
import { connect } from "react-redux";
import moment from "moment";

import { get } from "lodash";
const Orders = ({ getOrders, allapi: { countries = [], orders = [] } }) => {
  let bodyData = {
    role: localStorage.getItem("role_id"),
    page: 0,
  };
  useEffect(() => {
    getOrders(bodyData);
  }, []);

  return (
    <div className="container-fluid">
      {/* Breadcrumbs*/}
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="#">Dashboard</a>
        </li>
        <li className="breadcrumb-item active">Customer Orders</li>
      </ol>
      <div className="search-heder">
        <div className="row">
          <div className="col-lg-12">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
            />
          </div>
        </div>
      </div>
      <div className="order-listing">
        {get(orders, "orderData", []).map((order) => {
          return (
            <div className="card">
              <div className="card-header">
                <div className="row">
                  <div className="col-lg-6">
                    <p>
                      <strong>Order Placed</strong>:{" "}
                      {moment(order.order_date).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    </p>
                    <p>
                      <strong>Delivery Location</strong>:{" "}
                      {order.delivery_location}
                    </p>
                  </div>
                  <div className="col-lg-6">
                    <p>
                      <strong>Order ID</strong>: {order.order_id}
                    </p>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <h3>Order Placed</h3>
                <p>Lokator is currently processing your order</p>
                <span
                  className={`badge text-white ${
                    order.sttus == 0 ? "bg-warning" : "bg-success"
                  } `}
                >
                  {order.sttus == 0 ? "Processing" : "Approved"}
                </span>
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Image</th>
                      <th scope="col">Category</th>

                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {get(order, "order_detail", []).map((item) => {
                      return (
                        <tr>
                          <td>
                            {get(item, "machine_products.machine_name", "N/A")}
                          </td>
                          <td>
                            {" "}
                            <img
                              src={get(
                                item,
                                "machine_products.machine_image",
                                ""
                              )}
                            />
                          </td>
                          <td>
                            {get(
                              item,
                              "machine_categories.category_name",
                              "N/A"
                            )}
                          </td>
                          <td>{get(item, "quantity", "N/A")}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  allapi: state.allapi,
});

const mapActionsToProps = {
  getOrders,
};

export default connect(mapStateToProps, mapActionsToProps)(Orders);
