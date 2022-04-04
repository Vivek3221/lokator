import React, { Component, useState, useEffect } from "react";
import { getType, addType, editType } from "../../../store/actions/allapi";
import { Pagination, Modal, Input, FocusError,Search,ConfirmModal } from "../../../components";
import { Formik, Field, Form } from "formik";
import { typesValidator } from "../../../utils/validation";
import { connect } from "react-redux";
import { get } from "lodash";
const TypesManagment = ({ getType, editType, addType, allapi: { types } }) => {
  const [activePage, setActivePage] = useState(0);
  const [showModal, setShowModal] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [changeStatus, setChangeStatus] = useState("");

  useEffect(() => {
    getType(activePage, searchValue);
  }, [activePage]);

  const handleSubmit = (values) => {
    setActivePage(0);
    if (showModal == "true") {
      addType(values);
    } else {
      editType({ ...values, id: showModal.id });
    }

    setShowModal(false);
  };

  return (
    <div className="container-fluid">
      {/* Breadcrumbs*/}
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="#">Dashboard</a>
        </li>
        <li className="breadcrumb-item active">Type</li>
      </ol>
      <div className="header-with-search mb-20">
      <Search setSearchValue={setSearchValue}
              searchValue={searchValue} handleClick={() => getType(0, searchValue)} handleClear={()=> {getType(activePage,"")
              setSearchValue("")}
              } /> 
        <button
          onClick={() => setShowModal("true")}
          className="btn btn-primary text-white"
        >
          Add Type
        </button>
      </div>
      <div className="card mb-3">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Status</th>

              <th style={{ width: 100 }} scope="col">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {get(types, "typeList", []).map((item) => {
              return (
                <tr>
                  <td>{item.type}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={item.status}
                      onChange={() => {
                        
                        setChangeStatus({
                          ...item,
                          id: item.id,
                          status: item.status == 1 ? 0 : 1,
                        })
                      }}
                      id={"id" + item.id}
                    />
                    <label htmlFor={"id" + item.id}>Label</label>
                  </td>
                  <td>
                    <button
                      onClick={() => setShowModal(item)}
                      className="btn btn-primary text-white"
                    >
                      <i className="fa fa-pencil"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination
          totalPage={get(types, "totalPage", 1)}
          activePage={activePage}
          updateActivePage={(pageNo) => {
            setActivePage(pageNo);
          }}
        />
      </div>

      <Modal
        header={showModal == "true" ? "Add Type" : "Edit Type"}
        show={showModal}
        onClose={() => setShowModal(false)}
        content={
          <div className="popup-form">
            <Formik
              enableReinitialize
              initialValues={{
                type: get(showModal, "type", ""),
              }}
              validate={(values) => typesValidator(values)}
              validateOnChange
              onSubmit={handleSubmit}
            >
              {(formikBag) => {
                return (
                  <Form className="small-form">
                    <div className="row">
                      <div className="col-lg-12">
                        <Field name="type">
                          {({ field }) => (
                            <Input
                              {...field}
                              type="text"
                              className="form-control"
                              placeholder={"Type Name"}
                              error={
                                formikBag.touched.type && formikBag.errors.type
                                  ? formikBag.errors.type
                                  : null
                              }
                            />
                          )}
                        </Field>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn-primary btn-block btn text-white"
                    >
                      Submit
                    </button>

                    <FocusError />
                  </Form>
                );
              }}
            </Formik>
          </div>
        }
      />
      <ConfirmModal show={changeStatus!==""}  handleClose={()=> { setChangeStatus("")}} handleModal={()=> { 
        editType(changeStatus)
        setChangeStatus("")
        }} content={"Sure you want to change the status of Type !"}/>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  allapi: state.allapi,
});

const mapActionsToProps = {
  getType,
  addType,
  editType,
};

export default connect(mapStateToProps, mapActionsToProps)(TypesManagment);
