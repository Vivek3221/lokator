import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import Services from "./pages/Services";
import Terms from "./pages/Terms";

import Profile from "./pages/admin/Profile";
import {
  Header,
  Footer,
  Loader,
  AdminLayout,
  CustomerLayout,
} from "./components";
import "./assests/scss/style.scss";
import axios from "axios";
import { API_URL } from "./utils/constants";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./pages/NotFound";
import CountryManagement from "./pages/admin/CountryManagement";
import CapacityManagement from "./pages/admin/MachineManagement/CapacityManagement";
import TypesManagment from "./pages/admin/MachineManagement/TypesManangment";
import ContactLeads from "./pages/admin/ContactLeads";
import Orders from "./pages/admin/Orders";
import Users from "./pages/admin/Users";
import CategoryManagment from "./pages/admin/MachineManagement/CategoryManagment";
import MachineManagement from "./pages/admin/MachineManagement/index";
import CustomerOrders from "./pages/Customers/Orders/Orders";
import Products from "./pages/Products/index";

axios.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    if (error.response.status === 401) {
      // localStorage.removeItem("access_token");
      // window.location.pathname = "/";
    }

    return Promise.reject(error);
  }
);

const PrivateOnlyRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const token = localStorage.getItem("access_token");
      axios.defaults.headers["x-access-token"] = `${token}`;
      axios.defaults.headers["Content-Type"] = `application/json`;

      if (token) {
        return (
          <AdminLayout>
            <Component {...props} />
          </AdminLayout>
        );
      } else {
        return (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        );
      }
    }}
  />
);

const CustomerRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const token = localStorage.getItem("access_token");
      axios.defaults.headers["x-access-token"] = `${token}`;
      axios.defaults.headers["Content-Type"] = `application/json`;

      return (
        <CustomerLayout>
          <Component {...props} />
        </CustomerLayout>
      );
    }}
  />
);

const WebisteRouter = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      return (
        <>
          <Header />
          <Component {...props} />
          <Footer />
        </>
      );
    }}
  />
);
class App extends Component {
  render() {
    axios.defaults.baseURL = API_URL;
    return (
      <>
        <Router>
          <Switch>
            <WebisteRouter exact path="/" component={Home} />
            <WebisteRouter exact path="/about" component={About} />
            <WebisteRouter exact path="/Contact" component={Contact} />
            <WebisteRouter exact path="/services" component={Services} />
            <WebisteRouter exact path="/terms" component={Terms} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/forgot-password" component={Login} />
            <Route exact path="/register" component={Login} />

            <Route exact path="/admin/login" component={Login} />
            <CustomerRoute exact path="/products" component={Products} />

            <PrivateOnlyRoute exact path="/dashboard" component={Dashboard} />
            <PrivateOnlyRoute exact path="/profile" component={Profile} />
            <PrivateOnlyRoute
              exact
              path="/customer-orders"
              component={CustomerOrders}
            />
            <PrivateOnlyRoute
              exact
              path="/contact-leads"
              component={ContactLeads}
            />
            <PrivateOnlyRoute
              exact
              path="/country-management"
              component={CountryManagement}
            />
            <PrivateOnlyRoute
              exact
              path="/capacity-management"
              component={CapacityManagement}
            />
            <PrivateOnlyRoute exact path="/orders" component={Orders} />
            <PrivateOnlyRoute
              exact
              path="/types-management"
              component={TypesManagment}
            />
            <PrivateOnlyRoute
              exact
              path="/category-management"
              component={CategoryManagment}
            />
            <PrivateOnlyRoute
              exact
              path="/machines"
              component={MachineManagement}
            />

            <PrivateOnlyRoute exact path="/users-list" component={Users} />

            <Route exact path="*" component={NotFound} />
          </Switch>
        </Router>
        <Loader />
        <ToastContainer />
      </>
    );
  }
}

export default App;
