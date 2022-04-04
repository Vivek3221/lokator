import React, { Component, useState, useEffect } from "react";
import {
  getCategory,
  addCategory,
  editCategory,
  uploadImage,
  selectImage,
  getCapacity,
} from "../../../store/actions/allapi";
import {
  Pagination,
  Modal,
  Input,
  ConfirmModal,
  FocusError,
  Search,
} from "../../../components";
import { Formik, Field, Form } from "formik";
import { categoryValidator } from "../../../utils/validation";
import { connect } from "react-redux";
import { get } from "lodash";
const CategoryManagment = ({
  getCategory,
  editCategory,
  uploadImage,
  selectImage,
  addCategory,
  allapi: { category, selectedImage },
}) => {
  const [activePage, setActivePage] = useState(0);
  const [showModal, setShowModal] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [changeStatus, setChangeStatus] = useState("");
  
  useEffect(() => {
    getCategory(activePage, searchValue);
  }, [activePage]);

  const handleSubmit = (values) => {
    setActivePage(0);
    if (showModal == "true") {
      addCategory({ ...values, category_image: selectedImage });
    } else {
      editCategory({
        ...values,
        id: showModal.id,
        category_image: selectedImage,
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
        <li className="breadcrumb-item active">Category</li>
      </ol>
      <div className="header-with-search mb-20">
      <Search setSearchValue={setSearchValue}
              searchValue={searchValue} handleClick={() => getCategory(0, searchValue)} handleClear={()=> {getCategory(activePage,"")
              setSearchValue("")}
              } />
        <button
          onClick={() => {
            selectImage("");
            setShowModal("true");
          }}
          className="btn btn-primary text-white"
        >
          Add Category
        </button>
      </div>
      <div className="card mb-3">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Image</th>
              <th scope="col">Status</th>

              <th style={{ width: 100 }} scope="col">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {get(category, "categoryList", []).map((item) => {
              return (
                <tr>
                  <td>{item.category_name}</td>
                  <td>
                    <img width={100} src={item.category_image} />
                  </td>
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
                      onClick={() => {
                        setShowModal(item);
                        selectImage(item.category_image);
                        
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
        header={showModal == "true" ? "Add Category" : "Edit Category"}
        show={showModal}
        onClose={() => setShowModal(false)}
        content={
          <div className="popup-form">
            <Formik
              enableReinitialize
              initialValues={{
                category_name: get(showModal, "category_name", ""),
              }}
              validate={(values) => categoryValidator(values, selectedImage)}
              validateOnChange
              onSubmit={handleSubmit}
            >
              {(formikBag) => {
                return (
                  <Form className="small-form">
                    <div className="row">
                      <div className="col-lg-12">
                        <Field name="category_name">
                          {({ field }) => (
                            <Input
                              {...field}
                              type="text"
                              className="form-control"
                              placeholder={"Category Name"}
                              error={
                                formikBag.touched.category_name &&
                                formikBag.errors.category_name
                                  ? formikBag.errors.category_name
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
                        {Boolean(selectImage) && (
                          <img width={100} src={selectedImage} />
                        )}
                        <br />

                        <label>Select Category Image</label>
                        <Field name="category_image">
                          {({ field }) => (
                            <Input
                              {...field}
                              type="file"
                              onChange={async (e) => {
                                var image = await uploadImage(
                                  e.target.files[0]
                                );
                                console.log("image", image);
                              }}
                              error={
                                formikBag.touched.category_image &&
                                formikBag.errors.category_image
                                  ? formikBag.errors.category_image
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
        editCategory(changeStatus)
        setChangeStatus("")
        }} content={"Sure you want to change the status of category !"}/>
      
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  allapi: state.allapi,
});

const mapActionsToProps = {
  getCategory,
  addCategory,
  editCategory,
  uploadImage,
  selectImage,
};

export default connect(mapStateToProps, mapActionsToProps)(CategoryManagment);
