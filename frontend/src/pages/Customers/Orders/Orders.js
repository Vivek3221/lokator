import React, { Component, useState, useEffect } from "react";
import { getOrders } from "../../../store/actions/allapi";
import { connect } from "react-redux";
import moment from "moment";
import { Pagination } from "../../../components";

import { get } from "lodash";
const Orders = ({
  getOrders,
  allapi: { countries = [], orders = [] },
  location: { search },
  user: { user },
}) => {
  const query = new URLSearchParams(search);
  const [activePage, setActivePage] = useState(0);
  const [searchVal, setSearch] = useState(query.get("query"));
  let bodyData = {
    role: localStorage.getItem("role_id"),
    page: activePage,
    search: searchVal,
    user_id: JSON.parse(localStorage.getItem("user_data")).id,
  };

  useEffect(() => {
    getOrders(bodyData);
  }, [searchVal,activePage]);

  return (
    <div className="container-fluid">
      {/* Breadcrumbs*/}
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="#">Dashboard</a>
        </li>
        <li className="breadcrumb-item active">Customer Orders</li>
      </ol>
      <div className="search_form ">
        <div className="form-group">
          <input
            className="form-control"
            value={searchVal}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search for orderId or location"
          />
          <button className="btn btn-primary text-white" type="submit">
            Search
          </button>
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
                      {moment(order.order_date).format("MMMM Do YYYY ")}
                    </p>
                    <p>
                      <strong>Work Start Date:</strong>{" "}
                      {moment(order.work_start_date).format("MMMM Do YYYY ")}
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
                    <p>
                      <strong>Work End Date :</strong>{" "}
                      {moment(order.work_end_date).format("MMMM Do YYYY ")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <h3>Order Placed</h3>
                <p>Lokator is currently processing your order</p>
                <span
                  className={`badge text-white ${
                    order.status == 0 ? "bg-warning" : "bg-success"
                  } `}
                >
                  {order.status == 0 ? "Processing" : "Approved"}
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
      <Pagination
          totalPage={get(orders, "totalPage", 1)}
          activePage={activePage}
          updateActivePage={(pageNo) => {
            setActivePage(pageNo);
          }}
        />
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
