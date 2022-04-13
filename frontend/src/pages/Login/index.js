import React, { Component, useState, useEffect } from "react";
import BannerBg from "../../assests/images/hero_bg.jpg";
import BannerBg2 from "../../assests/images/hero_bg_2.jpg";
import Logo from "../../assests/images/logo.jpeg";
import Truck from "../../assests/images/Red-truck.png";
import { Link } from "react-router-dom";
import { Modal, Input, FocusError, Select } from "../../components";
import { Formik, Field, Form } from "formik";
import { loginValidator, signUPValidator } from "../../utils/validation";
import {
  loginUser,
  signinUser,
  forgetPassword,
} from "../../store/actions/users";
import { getCountries, getLocations } from "../../store/actions/allapi";
import { connect } from "react-redux";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
const Login = ({
  location: { pathname, search },
  loginUser,
  signinUser,
  getCountries,
  getLocations,
  forgetPassword,
  history,
  isPopup,
  handleClick,
  allapi: { countries, locations },
}) => {
  const query = new URLSearchParams(search);
  const role_id = pathname == "/admin/login" ? 0 : query.get("role_id") || 1;

  const [showLogin, setShowLogin] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    //getCountries()
  }, []);

  const handleSubmit = (values) => {
    loginUser(values, history, isPopup, handleClick);
  };
  const handleSignIn = (values) => {
    var formValues = { ...values };
    formValues.role_id = role_id;
    if (formValues.email == "") {
      delete formValues.email;
    }
    delete formValues.whole_number;

    signinUser(formValues, history, isPopup, handleClick);
    //loginUser(values, history);
  };

  return (
    <div className={`login_page ${isPopup && "popup"}`}>
      {!isPopup && (
        <div className="banner_box">
          <h3> Machine in good working condition.</h3>
          <h1>Lokator Truck</h1>
          <img src={Truck} />
        </div>
      )}
      <div className="main_section">
        {!isPopup && (
          <div className="login-header">
            <Link to="/">
              <img src={Logo} width="200" />
            </Link>
            <Link to="/" className="btn btn-primary text-white btn-sm">
              Home
            </Link>
          </div>
        )}
        <div className="login-form">
          <div className="login-content">
            {pathname == "/forgot-password" ? (
              <>
                <h3>Forgot Password</h3>
                <Formik
                  enableReinitialize
                  initialValues={{
                    email: "",
                  }}
                  //validate={(values) => resetOutValidator(values)}
                  validateOnChange
                  onSubmit={forgetPassword}
                >
                  {(formikBag) => {
                    return (
                      <Form className="small-form">
                        <div className="row">
                          <div className="col-lg-12">
                            <Field name="email">
                              {({ field }) => (
                                <Input
                                  {...field}
                                  type="email"
                                  value={formikBag.values.email}
                                  onChange={(e) => {
                                    formikBag.setFieldValue(
                                      "email",
                                      e.target.value
                                    );
                                  }}
                                  className="form-control"
                                  placeholder={"Email Address"}
                                />
                              )}
                            </Field>
                          </div>
                        </div>

                        <div className=" text-center">
                          <button
                            type="submit"
                            className="btn-primary btn-block btn text-white"
                          >
                            Forgot Password
                          </button>
                        </div>
                        <br />
                        <p>
                          {role_id != 0 ? (
                            <p>
                              Already have an account?{" "}
                              <Link to={"/login?role_id=" + role_id}>
                                SIGN IN
                              </Link>
                            </p>
                          ) : (
                            <Link to={"/admin/login"}>Back to Login</Link>
                          )}
                        </p>

                        <FocusError />
                      </Form>
                    );
                  }}
                </Formik>
              </>
            ) : pathname == "/register" || showSignUp ? (
              <>
                <h3>Register as {role_id == 1 ? "Customer" : "Partner"}</h3>
                <Formik
                  enableReinitialize
                  initialValues={{
                    first_name: "",
                    last_name: "",
                    email: "",
                    password: "",
                    confirm_password: "",
                    company_name: "",
                    phone: "",
                    whole_number: "",
                    user_type: role_id,
                  }}
                  validate={(values) => signUPValidator(values)}
                  validateOnChange
                  onSubmit={handleSignIn}
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
                          <div className="col-md-6">
                            <Field name="phone">
                              {({ field }) => (
                                <div>
                                  <PhoneInput
                                    {...field}
                                    country="in"
                                    type="phone"
                                    value={formikBag.values.whole_number}
                                    onChange={(phone, data) => {
                                      formikBag.setFieldValue(
                                        "whole_number",
                                        phone
                                      );
                                      formikBag.setFieldValue(
                                        "country_code",
                                        data.dialCode
                                      );
                                      formikBag.setFieldValue(
                                        "phone",
                                        phone.slice(data.dialCode.length)
                                      );
                                    }}
                                    error={
                                      formikBag.touched.phone &&
                                      formikBag.errors.phone
                                        ? formikBag.errors.phone
                                        : null
                                    }
                                    className="form-control"
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
                                  className="form-control"
                                  error={
                                    formikBag.touched.email &&
                                    formikBag.errors.email
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

                        <p className="terms">
                          <input type="checkbox" />
                          Agree with our{" "}
                          <Link target="_blank" to="/terms">
                            Terms of Service
                          </Link>{" "}
                          and <a href="#">Privacy Policy.</a>
                        </p>

                        <div className="py-3 text-center">
                          <button
                            type="submit"
                            className="btn-primary btn-block btn text-white"
                          >
                            REGISTER
                          </button>
                        </div>
                        <p>
                          Already have an account?{" "}
                          <a
                            href="javascript:void()"
                            onClick={() => {
                              if (!isPopup) {
                                history.push({
                                  pathname: "/login?role_id=" + role_id,
                                });
                              } else {
                                setShowSignUp(false);
                              }
                            }}
                          >
                            SIGN IN
                          </a>
                        </p>
                        <FocusError />
                      </Form>
                    );
                  }}
                </Formik>
              </>
            ) : (
              <>
                {query.get("signin") && (
                  <span class="badge badge-success">
                    Your are Registed Succesfully enter your login details to
                    get started.
                  </span>
                )}
                <h3>
                  Login as{" "}
                  {role_id == 1
                    ? "Customer"
                    : role_id == 2
                    ? "Partner"
                    : "Admin"}
                </h3>
                <Formik
                  enableReinitialize
                  initialValues={{
                    phone: "",
                    password: "",
                  }}
                  validate={(values) => loginValidator(values)}
                  validateOnChange
                  onSubmit={handleSubmit}
                >
                  {(formikBag) => {
                    return (
                      <Form className="small-form">
                        <div className="row">
                          <div className="col-lg-12">
                            <Field name="phone">
                              {({ field }) => (
                                <Input
                                  {...field}
                                  type="text"
                                  className="form-control"
                                  placeholder={"Mobile Number/Email"}
                                  error={
                                    formikBag.touched.phone &&
                                    formikBag.errors.phone
                                      ? formikBag.errors.phone
                                      : null
                                  }
                                />
                              )}
                            </Field>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
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
                                  placeholder={"Password"}
                                />
                              )}
                            </Field>
                          </div>
                        </div>
                        <p className="text-right" style={{ margin: 0 }}>
                          <Link to={"/forgot-password?role_id=" + role_id}>
                            Forgot Password
                          </Link>
                        </p>
                        <div className=" text-center">
                          <button
                            type="submit"
                            className="btn-primary btn-block btn text-white"
                          >
                            Login
                          </button>
                        </div>

                        {role_id != 0 && (
                          <p>
                            Don't have an account?{" "}
                            <a
                              href="javascript:void()"
                              onClick={() => {
                                if (!isPopup) {
                                  history.push({
                                    pathname: "/register?role_id=" + role_id,
                                  });
                                } else {
                                  setShowSignUp(true);
                                }
                              }}
                            >
                              REGISTER
                            </a>
                          </p>
                        )}
                        <FocusError />
                      </Form>
                    );
                  }}
                </Formik>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  allapi: state.allapi,
});

const mapActionsToProps = {
  loginUser,
  signinUser,
  getCountries,
  getLocations,
  forgetPassword,
};

export default connect(mapStateToProps, mapActionsToProps)(Login);
