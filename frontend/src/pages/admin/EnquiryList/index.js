import React, { Component, useState, useEffect } from "react";
import { getInquiry } from "../../../store/actions/allapi";
import { Pagination, Search } from "../../../components";
import { Formik, Field, Form } from "formik";
import { capacityValidator } from "../../../utils/validation";
import { connect } from "react-redux";
import { get } from "lodash";
import moment from "moment";
const CapacityManagement = ({ getInquiry, allapi: { inquiry } }) => {
  const [activePage, setActivePage] = useState(0);
  const [showModal, setShowModal] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [changeStatus, setChangeStatus] = useState("");

  useEffect(() => {
    getInquiry();
  }, []);

  return (
    <div className="container-fluid">
      {/* Breadcrumbs*/}
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="#">Dashboard</a>
        </li>
        <li className="breadcrumb-item active">Capacity</li>
      </ol>
      <div className="header-with-search mb-20">
        <Search
          setSearchValue={setSearchValue}
          searchValue={searchValue}
          handleClick={() => getInquiry({ search: searchValue })}
          handleClear={() => {
            getInquiry({ search: "" });
            setSearchValue("");
          }}
        />
      </div>
      <div className="card mb-3">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone </th>
              <th style={{ width: 180 }} scope="col">
                Compnay Name
              </th>
              <th style={{ width: 120 }} scope="col">
                Price Type
              </th>
              <th scope="col">Delivery Date</th>
              <th scope="col">Location</th>
              <th scope="col">Requirement</th>
              <th scope="col">Created At</th>
            </tr>
          </thead>
          <tbody>
            {get(inquiry, "inquiryData", []).map((item) => {
              return (
                <tr>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone_no}</td>
                  <td>{item.company_name}</td>
                  <td>{item.price_type}</td>
                  <td>
                    {moment(item.delivery_date).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}
                  </td>
                  <td>{item.location}</td>
                  <td>{item.requirment}</td>
                  <td>
                    {moment(item.created_at).format("MMMM Do YYYY, h:mm:ss a")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination
          totalPage={get(inquiry, "totalPage", 1)}
          activePage={activePage}
          updateActivePage={(pageNo) => {
            setActivePage(pageNo);
          }}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  allapi: state.allapi,
});

const mapActionsToProps = {
  getInquiry,
};

export default connect(mapStateToProps, mapActionsToProps)(CapacityManagement);
