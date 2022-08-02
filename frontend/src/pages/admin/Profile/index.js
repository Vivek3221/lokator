import React, { Component, useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import { Modal, Input, FocusError, Select } from "../../../components";
import {
  profileValidator,
  changePasswordValidator,
} from "../../../utils/validation";
import { getCountries, getLocations } from "../../../store/actions/allapi";
import {
  handleChangePassword,
  updateProfile,
} from "../../../store/actions/users";
import { connect } from "react-redux";
import { get } from "lodash";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";

const Profile = ({
  location: { pathname, search },
  loginUser,
  signinUser,
  handleChangePassword,
  updateProfile,
  getCountries,
  getLocations,
  history,
  allapi: { countries, locations },
  user: { user },
}) => {
  const [changePassword, setChangePassword] = useState(false);

  console.log(user);
  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    if (Boolean(user)) {
      if (user.country_id) {
        getLocations(user.country_id);
      }
    }
  }, [user]);

  const updatePassword = async (values) => {
    handleChangePassword(values);
  };
  const [showSignup, setShowSignup] = useState(false);
  return (
    <div className="container-fluid profle-page">
        
      <div className="col-lg-6 offset-3 mt-5">
        {changePassword ? (
          <Formik
            enableReinitialize
            initialValues={{
              old_password: "",
              password: "",
              confirm_password: "",
            }}
            validate={(values) => changePasswordValidator(values)}
            validateOnChange
            onSubmit={updatePassword}
          >
            {(formikBag) => {
              return (
                <Form>
                  <div className="row">
                    <div className="col-lg-12">
                      <label>Old Password *</label>
                      <Field name="old_password">
                        {({ field }) => (
                          <Input
                            {...field}
                            type="password"
                            error={
                              formikBag.touched.old_password &&
                              formikBag.errors.old_password
                                ? formikBag.errors.old_password
                                : null
                            }
                            className="form-control"
                            placeholder={"Old Password"}
                          />
                        )}
                      </Field>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <label>New Password *</label>
                      <Field name="password">
                        {({ field }) => (
                          <Input
                            {...field}
                            type="password"
                            error={
                              formikBag.touched.password &&
                              formikBag.errors.password
                                ? formikBag.errors.password
                                : null
                            }
                            className="form-control"
                            placeholder={"Current Password"}
                          />
                        )}
                      </Field>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <label>Confirm Password *</label>
                      <Field name="confirm_password">
                        {({ field }) => (
                          <Input
                            {...field}
                            type="password"
                            error={
                              formikBag.touched.confirm_password &&
                              formikBag.errors.confirm_password
                                ? formikBag.errors.confirm_password
                                : null
                            }
                            className="form-control"
                            placeholder={"Confirm Password"}
                          />
                        )}
                      </Field>
                    </div>
                  </div>

                  <div className="py-3 text-center">
                    <button
                      type="button"
                      onClick={() => setChangePassword(false)}
                      className="btn-transprent btn change-password "
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-primary btn text-white"
                    >
                      Update
                    </button>
                  </div>

                  <FocusError />
                </Form>
              );
            }}
          </Formik>
        ) : (
          <Formik
            enableReinitialize
            initialValues={{
              first_name: get(user, "first_name", ""),
              last_name: get(user, "last_name", ""),
              company_name: get(user, "company_name", ""),
              email: get(user, "email", ""),
              phone: get(user, "phone", ""),
            }}
            validate={(values) => profileValidator(values)}
            validateOnChange
            onSubmit={updateProfile}
          >
            {(formikBag) => {
              return (
                <Form>
                  <div className="row">
                    <div className="col-lg-6">
                      <Field name="first_name">
                        {({ field }) => (
                          <Input
                            {...field}
                            type="text"
                            error={
                              formikBag.touched.first_name &&
                              formikBag.errors.first_name
                                ? formikBag.errors.first_name
                                : null
                            }
                            className="form-control"
                            placeholder={"First Name *"}
                          />
                        )}
                      </Field>
                    </div>
                    <div className="col-lg-6">
                      <Field name="last_name">
                        {({ field }) => (
                          <Input
                            {...field}
                            type="text"
                            error={
                              formikBag.touched.last_name &&
                              formikBag.errors.last_name
                                ? formikBag.errors.last_name
                                : null
                            }
                            className="form-control"
                            placeholder={"Last Name *"}
                          />
                        )}
                      </Field>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <Field name="phone">
                        {({ field }) => (
                          <div>
                            <PhoneInput
                              {...field}
                              country="in"
                              type="phone"
                              disabled
                              value={formikBag.values.phone}
                              error={
                                formikBag.touched.phone &&
                                formikBag.errors.phone
                                  ? formikBag.errors.phone
                                  : null
                              }
                              
                              placeholder="Phone Number"
                            />
                            {formikBag.errors.phone && (
                              <p
                                style={{
                                  paddingTop: 5,
                                  fontSize: 13,
                                  color: "red",
                                }}
                              >
                                {formikBag.errors.phone}
                              </p>
                            )}
                          </div>
                        )}
                      </Field>
                    </div>
                    <div className="col-lg-6">
                      <Field name="email">
                        {({ field }) => (
                          <Input
                            {...field}
                            type="email"
                            disabled
                            className="form-control"
                            error={
                              formikBag.touched.email && formikBag.errors.email
                                ? formikBag.errors.email
                                : null
                            }
                            placeholder={"Email Address"}
                          />
                        )}
                      </Field>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <Field name="company_name">
                        {({ field }) => (
                          <Input
                            {...field}
                            type="text"
                            error={
                              formikBag.touched.company_name &&
                              formikBag.errors.company_name
                                ? formikBag.errors.company_name
                                : null
                            }
                            className="form-control"
                            placeholder={"Company Name"}
                          />
                        )}
                      </Field>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-6">
                      <Field name="password">
                        {({ field }) => (
                          <Input
                            {...field}
                            type="password"
                            className="form-control"
                            error={
                              formikBag.touched.password &&
                              formikBag.errors.password
                                ? formikBag.errors.password
                                : null
                            }
                            placeholder={"Password *"}
                          />
                        )}
                      </Field>
                    </div>

                    <div className="col-lg-6">
                      <Field name="confirm_password">
                        {({ field }) => (
                          <Input
                            {...field}
                            type="password"
                            className="form-control"
                            error={
                              formikBag.touched.confirm_password &&
                              formikBag.errors.confirm_password
                                ? formikBag.errors.confirm_password
                                : null
                            }
                            placeholder={"Confirm Password *"}
                          />
                        )}
                      </Field>
                    </div>
                  </div>

                  <div className="py-3 text-center">
                    <button
                      type="submit"
                      className="btn-primary btn-block btn text-white"
                    >
                      Save Profile
                    </button>
                  </div>

                  <FocusError />
                </Form>
              );
            }}
          </Formik>
        )}{" "}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  allapi: state.allapi,
});

const mapActionsToProps = {
  getCountries,
  getLocations,
  handleChangePassword,
  updateProfile,
};

export default connect(mapStateToProps, mapActionsToProps)(Profile);
