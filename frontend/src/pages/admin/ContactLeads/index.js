import React, { Component, useState, useEffect } from "react";
import { getContact } from "../../../store/actions/allapi";
import {
  handleChangePassword,
  updateProfile,
} from "../../../store/actions/users";
import { connect } from "react-redux";
import { Pagination, Search } from "../../../components/.";
import { get } from "lodash";
const ContactLeads = ({ getContact, allapi: { contacts = [] } }) => {
  const [activePage, setActivePage] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    getContact(activePage, "");
  }, [activePage]);

  return (
    <div className="container-fluid">
      {/* Breadcrumbs*/}
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="#">Dashboard</a>
        </li>
        <li className="breadcrumb-item active">Contact Leads</li>
      </ol>

      <div className="header-with-search mb-20">
        <Search
          setSearchValue={setSearchValue}
          searchValue={searchValue}
          handleClick={() => getContact(0, searchValue)}
          handleClear={() => {
            getContact(activePage, "");
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
              <th scope="col">Business Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Message</th>
            </tr>
          </thead>
          <tbody>
            {get(contacts, "contactUsData", []).map((item) => {
              return (
                <tr>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.company_name}</td>
                  <td>{item.phone}</td>
                  <td>{item.message}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination
          totalPage={get(contacts, "totalPage", 1)}
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
  getContact,
};

export default connect(mapStateToProps, mapActionsToProps)(ContactLeads);
