import React, { Component, useState, useEffect } from "react";
import {
  getCategory,
  addMachine,
  editMachine,
  uploadImage,
  selectImage,
  getMachines,
  getType,
  getCapacity
} from "../../../store/actions/allapi";
import {
  Pagination,
  Modal,
  Input,
  FocusError,
  Select,
  Textarea,
  ConfirmModal,
  Search
} from "../../../components";
import { Formik, Field, Form } from "formik";
import { machineValidator } from "../../../utils/validation";
import { connect } from "react-redux";
import { get } from "lodash";
const MachineManagement = ({
  getMachines,
  getCategory,
  editMachine,
  uploadImage,
  selectImage,
  addMachine,
  getCapacity,
  user:{user},
  getType,
  allapi: { category, selectedImage, machines,types,capacity },
}) => {
  const [activePage, setActivePage] = useState(0);
  const [showModal, setShowModal] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [changeStatus, setChangeStatus] = useState("");
  console.log(user,'user')

  useEffect(() => {
    getMachines(activePage, searchValue);
    getCategory();
    getType()
    getCapacity()
    
  }, [activePage]);

  const handleSubmit = (values) => {
    console.log(values)
    setActivePage(0);
    if (showModal == "true") {
      addMachine({ ...values, machine_image: selectedImage });
    } else {
      editMachine({
        ...values,
        product_id: showModal.id,
        machine_image: selectedImage,
      });
    }
    setShowModal(false);
    selectedImage("");
  };

  return (
    <div className="container-fluid">
      {/* Breadcrumbs*/}
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="#">Dashboard</a>
        </li>
        <li className="breadcrumb-item active">Machines</li>
      </ol>
      <div className="header-with-search mb-20">
      <Search setSearchValue={setSearchValue}
              searchValue={searchValue} handleClick={() => getMachines(0, searchValue)} handleClear={()=> {getMachines(activePage,"")
              setSearchValue("")}
              } />
        
        <button
          onClick={() => {
            selectImage("");
            setShowModal("true");
          }}
          className="btn btn-primary text-white"
        >
          Add Machine
        </button>
      </div>
      <div className="card mb-3">
        <table class="table table-striped">
          <thead>
            <tr>
            <th scope="col">Machine Number</th>
              <th scope="col">Name</th>
              <th scope="col">Image</th>
              <th scope="col">Description</th>
              <th scope="col">Machine Categories</th>
              <th scope="col">Machine Type</th>
              <th scope="col">Status</th>

              <th style={{ width: 100 }} scope="col">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {get(machines, "productsData", []).map((item) => {
              return (
                <tr>
                  <td>{item.machine_number}</td>
                  <td>{item.machine_name}</td>
                  <td>
                    <img width={100} src={item.machine_image} />
                  </td>
                  <td>{item.description}</td>
                  <td>{get(item, "machine_categories.name", "N/A")}</td>
                  <td>{get(item, "machine_types.type", "N/A")}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={item.status}
                      onChange={() => {


                       setChangeStatus({
                        ...item,
                        id: item.id,
                        product_id: item.id,
                        status: item.status == 1 ? 0 : 1,
                      })
                      }}
                      id={"id" + item.id}
                    />
                    <label htmlFor={"id" + item.id}>Label</label>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        setShowModal(item);
                        selectImage(item.machine_image);
                      }}
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
          totalPage={get(category, "totalPage", 1)}
          activePage={activePage}
          updateActivePage={(pageNo) => {
            setActivePage(pageNo);
          }}
        />
      </div>

      <Modal
        header={showModal == "true" ? "Add Machine" : "Edit Machine"}
        show={showModal}
        onClose={() => setShowModal(false)}
        content={
          <div className="popup-form">
            <Formik
              enableReinitialize
              initialValues={{
                machine_number: get(showModal, "machine_number", ""),
                machine_name: get(showModal, "machine_name", ""),
                machine_type_id: get(showModal, "machine_type_id", ""),
                category_id: get(showModal, "category_id", ""),
                capacity_id: get(showModal, "capacity_id", ""),
                description: get(showModal, "description", ""),
                user_id:get(user,'id')
                

              }}
              validate={(values) => machineValidator(values, selectedImage)}
              validateOnChange
              onSubmit={handleSubmit}
            >
              {(formikBag) => {
                return (
                  <Form className="small-form">
                    <div className="row">
                      <div className="col-lg-12">
                        <Field name="machine_name">
                          {({ field }) => (
                            <Input
                              {...field}
                              type="text"
                              className="form-control"
                              placeholder={"Machine Name"}
                              error={
                                formikBag.touched.machine_name &&
                                formikBag.errors.machine_name
                                  ? formikBag.errors.machine_name
                                  : null
                              }
                            />
                          )}
                        </Field>
                      </div>
                    </div>
                    <br/>
                    <div className="row">
                      <div className="col-lg-12">
                        <Field name="machine_number">
                          {({ field }) => (
                            <Input
                              {...field}
                              type="text"
                              className="form-control"
                              placeholder={"Machine Number"}
                              error={
                                formikBag.touched.machine_number &&
                                formikBag.errors.machine_number
                                  ? formikBag.errors.machine_number
                                  : null
                              }
                            />
                          )}
                        </Field>
                      </div>
                    </div>
                  <br/>
                    <div className="row">
                      <div className="col-lg-12">
                        <Field name="category_id">
                          {({ field }) => (
                            <Select
                              {...field}
                              type="text"
                              
                              options={get(category,'categoryList',[]).map(item=> {
                                return {label:item.category_name,value:item.id}
                              })}
                              value={get(category,'categoryList',[]).map(item=> {
                                return {label:item.category_name,value:item.id}
                              }).find(item => item.value == formikBag.values.category_id)}
                              onChange={(option)=> formikBag.setFieldValue('category_id',option.value)}
                              placeholder={"Select Category"}
                              error={
                                formikBag.touched.category_id &&
                                formikBag.errors.category_id
                                  ? formikBag.errors.category_id
                                  : null
                              }
                            />
                          )}
                        </Field>
                      </div>
                    </div>
                    <br/>
                    <div className="row">
                      <div className="col-lg-12">
                        <Field name="machine_type_id">
                          {({ field }) => (
                            <Select
                              {...field}
                              type="text"
                              value={get(types,'typeList',[]).map(item=> {
                                return {label:item.type,value:item.id}
                              }).find(item => item.value == formikBag.values.machine_type_id)}
                              options={get(types,'typeList',[]).map(item=> {
                                return {label:item.type,value:item.id}
                              })}
                              onChange={(option)=> formikBag.setFieldValue('machine_type_id',option.value)}
                              placeholder={"Select Type"}
                              error={
                                formikBag.touched.machine_type_id &&
                                formikBag.errors.machine_type_id
                                  ? formikBag.errors.machine_type_id
                                  : null
                              }
                            />
                          )}
                        </Field>
                      </div>
                    </div>
                    <br />
                    <div className="row">
                      <div className="col-lg-12">
                        <Field name="capacity_id">
                          {({ field }) => (
                            <Select
                              {...field}
                              type="text"
                              value={get(capacity,'capacityList',[]).map(item=> {
                                return {label:item.capacity,value:item.id}
                              }).find(item => item.value == formikBag.values.capacity_id)}
                              options={get(capacity,'capacityList',[]).map(item=> {
                                return {label:item.capacity,value:item.id}
                              })}
                              onChange={(option)=> formikBag.setFieldValue('capacity_id',option.value)}
                              placeholder={"Select Capacity"}
                              error={
                                formikBag.touched.capacity_id &&
                                formikBag.errors.capacity_id
                                  ? formikBag.errors.capacity_id
                                  : null
                              }
                            />
                          )}
                        </Field>
                      </div>
                    </div>
                    <br />
                    <div className="row">
                      <div className="col-lg-12">
                        <Field name="description">
                          {({ field }) => (
                            <Textarea
                              {...field}
                              type="text"
                              className="form-control"
                              placeholder={"Description"}
                              error={
                                formikBag.touched.description &&
                                formikBag.errors.description
                                  ? formikBag.errors.description
                                  : null
                              }
                            />
                          )}
                        </Field>
                      </div>
                    </div>
                    
                    <div className="row">
                      <div className="col-lg-12">
                        {Boolean(selectImage) && (
                          <img width={100} src={selectedImage} />
                        )}
                        <br />

                        <label>Select Machine Image</label>
                        <Field name="machine_image">
                          {({ field }) => (
                            <Input
                              {...field}
                              type="file"
                              onChange={async (e) => {
                                var image = await uploadImage(
                                  e.target.files[0]
                                );
                                
                              }}
                              error={
                                formikBag.touched.machine_image &&
                                formikBag.errors.machine_image
                                  ? formikBag.errors.machine_image
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
        editMachine(changeStatus)
        setChangeStatus("")
        }} content={"Sure you want to change the status of machine!"}/>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  allapi: state.allapi,
});

const mapActionsToProps = {
  getCategory,
  uploadImage,
  selectImage,
  addMachine,
  editMachine,
  getMachines,
  getCapacity,
  getType
};

export default connect(mapStateToProps, mapActionsToProps)(MachineManagement);
