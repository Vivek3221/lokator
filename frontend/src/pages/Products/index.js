import React, { Component, useState, useEffect, useRef } from "react";
import BannerBg from "../../assests/images/hero_bg.jpg";
import { connect } from "react-redux";
import {
  getCategory,
  getMachines,
  makeEnquiry,
  saveOrders,
} from "../../store/actions/allapi";
import { get } from "lodash";
import { Link } from "react-router-dom";
import {
  NoData,
  Modal,
  FocusError,
  Input,
  Select,
  Textarea,
} from "../../components/.";
import { scopes, priceType } from "../../utils/constants";
import { Formik, Field, Form } from "formik";
import PhoneInput from "react-phone-input-2";
import Login from "../Login";
import { orderValidator, inquiryValidator } from "../../utils/validation";

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
const Home = (props) => {
  const {
    getCategory,
    getMachines,
    saveOrders,
    makeEnquiry,
    location: { search },
    allapi: { category, machines },
    user: { user },
  } = props;
  const query = new URLSearchParams(search);
  const [searchVal, setSearch] = useState(query.get("query"));
  const [cartProducts, setCartProducts] = useState(
    localStorage.getItem("cart_items")
      ? JSON.parse(localStorage.getItem("cart_items"))
      : []
  );
  const [showModal, setShowModal] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [orderInfo, setOrderInfo] = useState("");
  const [showEnquiry, setShowEnquiry] = useState(false);
  const myRef = useRef(null);
  const executeScroll = () => scrollToRef(myRef);

  useEffect(() => {
    getCategory(0, "", 1);
  }, []);
  useEffect(() => {
    setSearch(query.get("query"));
  }, [search]);
  useEffect(() => {
    getMachines(0, searchVal, 1, executeScroll);
    executeScroll();
  }, [searchVal]);

  const addToCart = (product) => {
    let clonedCart = [...cartProducts];
    clonedCart.push({ ...product, quantity: 1 });
    updateItemtoLocal(clonedCart);
    setCartProducts(clonedCart);
  };
  const updteQuantity = (id, quantity) => {
    let clonedCart = [...cartProducts];
    let reltedProductIndex = clonedCart.findIndex((item) => item.id === id);
    if (quantity !== 0) {
      clonedCart[reltedProductIndex].quantity = quantity;
    } else {
      clonedCart.splice(reltedProductIndex, 1);
    }
    updateItemtoLocal(clonedCart);
    if (clonedCart.length == 0) {
      setShowModal(false);
    }
    setCartProducts(clonedCart);
  };

  const updateItemtoLocal = (items) => {
    localStorage.setItem("cart_items", JSON.stringify(items));
  };

  const placeOrder = async (values) => {
    setOrderInfo(values);
    setShowModal(false);
    setShowLogin(false);
    let bodyData = { ...orderInfo };
    bodyData.order_product = cartProducts.map((item) => {
      return {
        category_id: item.category_id,
        machine_product_id: item.id,
        quantity: item.quantity,
      };
    });
    console.log("bodyData", bodyData);
    if (localStorage.getItem("access_token")) {
      saveOrders(bodyData);
    } else {
      setShowLogin(true);
    }
  };

  const placeInquiry = async (values) => {
    setShowEnquiry(false);

    let bodyData = { ...values };

    makeEnquiry(bodyData);
  };

  return (
    <div>
      <div className="row align-items-center justify-content-center">
        <div className="col-md-12" data-aos="fade-up" data-aos-delay={400}>
          <h3 className=" font-weight-light  header text-uppercase font-weight-bold">
            Get Quote
          </h3>
          <div className="home-search bg-dark product">
            <div className="search_form ">
              <div className="form-group">
                <input
                  className="form-control"
                  value={searchVal}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Search for machine, brand, model"
                />
                <button className="btn btn-primary text-white" type="submit">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section ">
        <div className="row justify-content-center mb-5 ">
          <div className="col-md-7 text-center border-primary">
            <h4 className="font-weight-bold text-primary">Rent Machines</h4>
          </div>
        </div>
        <div className="row align-items-stretch">
          {get(category, "categoryList", []).map((item) => {
            return (
              <div className="col-md-6 col-lg-3 mb-3 mb-lg-3">
                <Link to={"/products?query=" + item.category_name}>
                  <div className="unit-4 d-flex feature-item" key={item.id}>
                    <div>
                      <h3>{item.category_name}</h3>
                      <img src={item.category_image} />
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
          <div ref={myRef}></div>
        </div>
      </div>

      <div className="product-listing">
        {get(machines, "productsData", []).length == 0 && <NoData />}
        {get(machines, "productsData", []).map((item) => {
          let relatedProduct = cartProducts.find((pd) => pd.id == item.id);
          console.log("cartProducts", cartProducts);
          return (
            <div className="product-item">
              <div className="pd-left">
                <img src={item.machine_image} />
              </div>
              <div className="pd-right">
                <h3>{item.machine_name}</h3>
                <p>
                  <strong>Category:</strong>{" "}
                  {get(item, "machine_categories.name", "N/A")}
                </p>
                <p>
                  <strong>Type:</strong>{" "}
                  {get(item, "machine_types.type", "N/A")}
                </p>
                <p>
                  <strong>Capacity:</strong>{" "}
                  {get(item, "machine_capacities.type", "N/A")}
                </p>
                {!relatedProduct ? (
                  <button
                    onClick={() => {
                      addToCart(item);
                    }}
                    className="btn btn-primary text-white"
                  >
                    <i className="fa fa-plus"></i> Add Enquiry
                  </button>
                ) : (
                  <div className="numeric_box">
                    <button
                      onClick={() => {
                        updteQuantity(item.id, relatedProduct.quantity - 1);
                      }}
                    >
                      <i class="fa fa-minus" aria-hidden="true"></i>
                    </button>
                    <span>{relatedProduct.quantity}</span>
                    <button
                      onClick={() => {
                        updteQuantity(item.id, relatedProduct.quantity + 1);
                      }}
                    >
                      <i class="fa fa-plus" aria-hidden="true"></i>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <Modal
        header={"Shopping Cart"}
        show={showModal}
        width={800}
        onClose={() => setShowModal(false)}
        content={
          <div className="step-form">
            <div className={`steps step-${activeStep}`}>
              <a className="step-item" href="javascript:void()">
                <span className="pager">
                  {activeStep > 1 ? <i className="fa fa-check"></i> : 1}
                </span>
                <span className="text_line">Shopping Cart</span>
              </a>
              <a className="step-item" href="javascript:void()">
                <span className="pager">2</span>
                <span className="text_line">Delivery Info</span>
              </a>
            </div>
            {activeStep == 1 && (
              <div className="section_1">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Image</th>
                      <th scope="col">Category</th>
                      <th scope="col">Type</th>
                      <th scope="col">Capacity</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartProducts.map((item) => {
                      return (
                        <tr>
                          <td>{get(item, "machine_name", "N/A")}</td>
                          <td>
                            {" "}
                            <img src={item.machine_image} />
                          </td>
                          <td>{get(item, "machine_categories.name", "N/A")}</td>
                          <td>{get(item, "machine_types.type", "N/A")}</td>
                          <td>{get(item, "machine_capacities.type", "N/A")}</td>
                          <td>
                            <input
                              type="number"
                              value={item.quantity}
                              min={1}
                              onChange={(e) => {
                                updteQuantity(item.id, Number(e.target.value));
                              }}
                            />
                          </td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={(e) => {
                                updteQuantity(item.id, 0);
                              }}
                            >
                              <i className="fa fa-trash" aria-hidden="true"></i>
                              Remove
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="footer-content">
                  <button
                    className="btn btn-primary text-white"
                    onClick={() => {
                      setActiveStep(2);
                    }}
                  >
                    Next Step
                  </button>
                </div>
              </div>
            )}
            {activeStep == 2 && (
              <div className="section_2">
                <Formik
                  enableReinitialize
                  initialValues={{
                    delivery_location: "",
                    work_start_date: "",
                    comments_remarks: "",
                    order_scope: null,
                  }}
                  validate={(values) => orderValidator(values)}
                  validateOnChange
                  onSubmit={placeOrder}
                >
                  {(formikBag) => {
                    return (
                      <Form>
                        <div className="row">
                          <div className="col-lg-12">
                            <Field name="order_scope">
                              {({ field }) => (
                                <Select
                                  {...field}
                                  name="order_scope"
                                  options={scopes}
                                  placeholder={"Select Project Scope"}
                                  value={scopes.find(
                                    (option) =>
                                      option.value ===
                                      formikBag.values.order_scope
                                  )}
                                  onChange={(option) => {
                                    formikBag.setFieldValue(
                                      "order_scope",
                                      option?.value
                                    );
                                  }}
                                  error={
                                    formikBag.touched.order_scope &&
                                    formikBag.errors.order_scope
                                      ? formikBag.errors.order_scope
                                      : null
                                  }
                                />
                              )}
                            </Field>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
                            <Field name="delivery_location">
                              {({ field }) => (
                                <Input
                                  {...field}
                                  type="text"
                                  className="form-control"
                                  placeholder={"Delivery Location"}
                                  error={
                                    formikBag.touched.delivery_location &&
                                    formikBag.errors.delivery_location
                                      ? formikBag.errors.delivery_location
                                      : null
                                  }
                                />
                              )}
                            </Field>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6">
                            <label>Work Start Date</label>
                            <Field name="work_start_date">
                              {({ field }) => (
                                <Input
                                  {...field}
                                  type="date"
                                  className="form-control"
                                  placeholder={"Work Start Date"}
                                  error={
                                    formikBag.touched.work_start_date &&
                                    formikBag.errors.work_start_date
                                      ? formikBag.errors.work_start_date
                                      : null
                                  }
                                />
                              )}
                            </Field>
                          </div>
                          <div className="col-lg-6">
                            <label>Work Start Date</label>
                            <Field name="work_end_date">
                              {({ field }) => (
                                <Input
                                  {...field}
                                  type="date"
                                  className="form-control"
                                  placeholder={"Work End Date"}
                                  error={
                                    formikBag.touched.work_end_date &&
                                    formikBag.errors.work_end_date
                                      ? formikBag.errors.work_end_date
                                      : null
                                  }
                                />
                              )}
                            </Field>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
                            <Field name="comments_remarks">
                              {({ field }) => (
                                <Textarea
                                  {...field}
                                  className="form-control"
                                  placeholder={"Comments Remarks"}
                                  error={
                                    formikBag.touched.comments_remarks &&
                                    formikBag.errors.comments_remarks
                                      ? formikBag.errors.comments_remarks
                                      : null
                                  }
                                />
                              )}
                            </Field>
                          </div>
                        </div>

                        <div className="footer-content">
                          <button
                            className="btn btn-success text-white"
                            type="button"
                            onClick={() => {
                              setActiveStep(1);
                            }}
                          >
                            Previous Step
                          </button>
                          <button
                            className="btn btn-primary text-white"
                            type="submit"
                          >
                            Place Order
                          </button>
                        </div>

                        <FocusError />
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            )}
          </div>
        }
      />

      {/* //Enquiry Form */}
      <Modal
        header={"Send us your Inquiry"}
        show={showEnquiry}
        width={600}
        onClose={() => setShowEnquiry(false)}
        content={
          <div className="order_form">
            <Formik
              enableReinitialize
              initialValues={{
                user_id: user?.id || "",
                name: "",
                email: "",
                company_name: "",
                phone_no: "",
                requirment: "",
                price_type: null,
                delivery_date: "",
                location: "",
              }}
              validate={(values) => inquiryValidator(values)}
              validateOnChange
              onSubmit={placeInquiry}
            >
              {(formikBag) => {
                return (
                  <Form>
                    {!user && (
                      <>
                        <div className="row">
                          <div className="col-lg-6">
                            <Field name="name">
                              {({ field }) => (
                                <Input
                                  {...field}
                                  type="text"
                                  error={
                                    formikBag.touched.name &&
                                    formikBag.errors.name
                                      ? formikBag.errors.name
                                      : null
                                  }
                                  className="form-control"
                                  placeholder={"Your Name *"}
                                />
                              )}
                            </Field>
                          </div>
                          <div className="col-lg-6">
                            <Field name="name">
                              {({ field }) => (
                                <Input
                                  {...field}
                                  type="text"
                                  error={
                                    formikBag.touched.name &&
                                    formikBag.errors.name
                                      ? formikBag.errors.name
                                      : null
                                  }
                                  className="form-control"
                                  placeholder={"Compnay Name *"}
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
                                    value={formikBag.values.phone_no}
                                    onChange={(phone, data) => {
                                      formikBag.setFieldValue(
                                        "phone_no",
                                        phone
                                      );
                                      formikBag.setFieldValue(
                                        "country_code",
                                        data.dialCode
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
                      </>
                    )}
                    <h4>Order Details</h4>

                    <div className="row">
                      <div className="col-lg-12">
                        <Field name="price_type">
                          {({ field }) => (
                            <Select
                              {...field}
                              name="order_scope"
                              options={priceType}
                              placeholder={"Price Type"}
                              value={scopes.find(
                                (option) =>
                                  option.value === formikBag.values.price_type
                              )}
                              onChange={(option) => {
                                formikBag.setFieldValue(
                                  "price_type",
                                  option?.value
                                );
                              }}
                              error={
                                formikBag.touched.price_type &&
                                formikBag.errors.price_type
                                  ? formikBag.errors.price_type
                                  : null
                              }
                            />
                          )}
                        </Field>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        <Field name="location">
                          {({ field }) => (
                            <Input
                              {...field}
                              type="text"
                              className="form-control"
                              placeholder={"Delivery Location"}
                              error={
                                formikBag.touched.location &&
                                formikBag.errors.location
                                  ? formikBag.errors.location
                                  : null
                              }
                            />
                          )}
                        </Field>
                      </div>
                      <div className="col-lg-6">
                        <Field name="delivery_date">
                          {({ field }) => (
                            <Input
                              {...field}
                              type="date"
                              className="form-control"
                              placeholder={"Work Start Date"}
                              error={
                                formikBag.touched.delivery_date &&
                                formikBag.errors.delivery_date
                                  ? formikBag.errors.delivery_date
                                  : null
                              }
                            />
                          )}
                        </Field>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        <Field name="requirment">
                          {({ field }) => (
                            <Textarea
                              {...field}
                              className="form-control"
                              placeholder={"Requirement"}
                              error={
                                formikBag.touched.requirment &&
                                formikBag.errors.requirment
                                  ? formikBag.errors.requirment
                                  : null
                              }
                            />
                          )}
                        </Field>
                      </div>
                    </div>

                    <div className="footer-content">
                      <button
                        className="btn btn-primary text-white"
                        type="submit"
                      >
                        Send Inquiry
                      </button>
                    </div>

                    <FocusError />
                  </Form>
                );
              }}
            </Formik>
          </div>
        }
      />
      <Modal
        show={showLogin}
        content={
          <>
            <Login
              isPopup
              {...props}
              handleClick={() => {
                placeOrder();
              }}
            />
          </>
        }
      />

      {cartProducts.length > 0 && !showModal && !showLogin ? (
        <div className="cart_box">
          {cartProducts.length} equipment added to inquiry{" "}
          <button
            className="btn btn-primry"
            onClick={() => {
              setShowModal(true);
              setActiveStep(1);
            }}
          >
            <i class="fa  fa-shopping-cart "></i>
            View and Checkout
          </button>
        </div>
      ) : (
        <div className="cart_box">
          Can't find the machine you're looking for?
          <button
            className="btn btn-primry"
            onClick={() => {
              setShowEnquiry(true);
            }}
          >
            <i class="fa  fa-shopping-cart "></i>
            Submit Enquiry
          </button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  allapi: state.allapi,
});

const mapActionsToProps = {
  getCategory,
  getMachines,
  saveOrders,
  makeEnquiry,
};

export default connect(mapStateToProps, mapActionsToProps)(Home);
