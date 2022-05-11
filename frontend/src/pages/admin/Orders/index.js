import React, { Component, useState, useEffect } from "react";
import { getOrders, updateStatus } from "../../../store/actions/allapi";
import { connect } from "react-redux";
import moment from "moment";

import { get } from "lodash";
const Orders = ({
  getOrders,
  allapi: { countries = [], orders = [] },
  updateStatus,
  user: { user },
  location: { search },
}) => {
  const query = new URLSearchParams(search);
  const [searchVal, setSearch] = useState(query.get("query"));
  const [status, setStatus] = useState(0);
  let bodyData = {
    role: localStorage.getItem("role_id"),
    page: 0,
    search: searchVal,
    user_id: JSON.parse(localStorage.getItem("user_data")).id,
    status: status,
  };
  useEffect(() => {
    getOrders(bodyData);
  }, [searchVal, status]);

  return (
    <div className="container-fluid">
      {/* Breadcrumbs*/}
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="#">Dashboard</a>
        </li>
        <li className="breadcrumb-item active">Orders</li>
      </ol>
      <div className="search_form  with-select">
        <div className="form-group">
          <input
            className="form-control"
            value={searchVal}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search for orderId location"
          />
          <button className="btn btn-primary text-white" type="submit">
            Search
          </button>
        </div>
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
          }}
        >
          <option value="1">Approved</option>
          <option value="0">Proccesing</option>
        </select>
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
                      {moment(order.order_date).format("MMMM Do YYYY ")}
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
                <h3>Customer Details</h3>

                <div className="bg-success cm-details">
                  <p>
                    <strong>Name:</strong>{" "}
                    {get(order, "user_detail.first_name", "")}{" "}
                    {get(order, "user_detail.last_name", "")}
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    {get(order, "user_detail.email", "")}{" "}
                  </p>
                  <p>
                    <strong>Phone No:</strong>{" "}
                    {get(order, "user_detail.phone", "")}
                  </p>
                </div>

                <span
                  className={`badge text-white ${
                    order.status == 0 ? "bg-warning" : "bg-success"
                  } `}
                >
                  {order.status == 0 ? "Processing" : "Approved"}
                </span>
                <button
                  onClick={() => {
                    updateStatus({
                      status: order.status == 0 ? 1 : 0,
                      order_id: order.id,
                    });
                  }}
                  className="btn btn-warning btn-sm text-white status_btn"
                >
                  {order.status == 1
                    ? "Update Status to Processing"
                    : "Update Status to Approved"}
                </button>
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
  updateStatus,
};

export default connect(mapStateToProps, mapActionsToProps)(Orders);
