import React, { Component, useState, useEffect } from "react";
import { getUsers } from "../../../store/actions/allapi";
import { Pagination, Search } from "../../../components/.";

import { connect } from "react-redux";
import { get } from "lodash";
const ContactLeads = ({ getUsers, allapi: { users } }) => {
  const [activePage, setActivePage] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    getUsers(activePage, "");
  }, [activePage]);
  const [showLogins, setLogins] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  return (
    <div className="container-fluid">
      {/* Breadcrumbs*/}
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="#">Dashboard</a>
        </li>
        <li className="breadcrumb-item active">User List</li>
      </ol>

      <div className="header-with-search mb-20">
        <Search
          setSearchValue={setSearchValue}
          searchValue={searchValue}
          handleClick={() => getUsers(0, searchValue)}
          handleClear={() => {
            getUsers(activePage, "");
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
              <th scope="col">Company Name</th>
              <th scope="col">Phone</th>
              <th scope="col">User Type</th>

              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {get(users, "usersData", []).map((item) => {
              return (
                <tr>
                  <td>
                    {item.first_name} {item.last_name}
                  </td>
                  <td>{item.email}</td>
                  <td>{item.company_name}</td>
                  <td>{item.phone}</td>
                  <td>
                    {item.user_type == 1
                      ? "Customer"
                      : item.role_id == 0
                      ? "Admin"
                      : "Partner"}
                  </td>

                  <td>{item.status == 1 ? "Verifed" : "Not Verfied"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination
          totalPage={get(users, "totalPage", 1)}
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
  getUsers,
};

export default connect(mapStateToProps, mapActionsToProps)(ContactLeads);
