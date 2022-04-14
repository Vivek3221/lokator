import {
  SET_USER,
  SET_USERS,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
} from "../types";

import axios from "axios";
import { toast } from "react-toastify";

export const loginUser =
  (userData, history, isPopup, handleClick) => (dispatch) => {
    dispatch({ type: LOADING_UI });

    axios
      .post("/user/signIn", userData)
      .then((res) => {
        setAuthorizationHeader({ ...res.data, role_id: userData.role_id });

        if (!isPopup) {
          history.push("/dashboard");
        } else {
          handleClick();
        }
        dispatch({ type: CLEAR_ERRORS });
      })

      .catch((err) => {
        var errors = JSON.parse(err.response.data.error).errors;
        dispatch({
          type: SET_ERRORS,
          payload: err.response ? err.response.data : err.response,
        });
        console.log(err);
        toast.error(`${errors[0].msg}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

export const updateProfile = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .post("/user/updateProfile", userData)
    .then((res) => {
      dispatch({
        type: SET_USERS,
        payload: res.data.data,
      });
      toast.success(`${res.data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch({ type: CLEAR_ERRORS });
    })

    .catch((err) => {
      var errors = JSON.parse(err.response.data.error).errors;
      dispatch({
        type: SET_ERRORS,
        payload: err.response ? err.response.data : err.response,
      });
      console.log(err);
      toast.error(`${errors[0].msg}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    });
};
export const signinUser =
  (userData, history, isPopup, handleClick) => (dispatch) => {
    dispatch({ type: LOADING_UI });

    axios
      .post("/user/signup", userData)
      .then((res) => {
        setAuthorizationHeader({ ...res.data, role_id: userData.role_id });
        if (!isPopup) {
          history.push("/login?signin=1");
        } else {
          handleClick();
        }
        dispatch({ type: CLEAR_ERRORS });
      })

      .catch((err) => {
        var errors = JSON.parse(err.response.data.error).errors;
        dispatch({
          type: SET_ERRORS,
          payload: err.response ? err.response.data : err.response,
        });
        console.log(err);
        toast.error(`${errors[0].msg}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

export const logoutUser = (history) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .post("/user/logout")
    .then((res) => {
      localStorage.removeItem("access_token");
      history.push("/login");
      dispatch({ type: CLEAR_ERRORS });
    })

    .catch((err) => {
      localStorage.removeItem("access_token");

      history.push("/login");
      //var errors = JSON.parse(err.response.data.error).errors;
      // dispatch({
      //   type: SET_ERRORS,
      //   payload: err.response ? err.response.data : err.response,
      // });
      // console.log(err);
      // toast.error(`${errors[0].msg}`, {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
    });
};

export const getUser =
  (name = "1", gender, paid) =>
  (dispatch) => {
    dispatch({ type: LOADING_UI });
    if (localStorage.getItem("access_token")) {
      axios
        .get("/user/getProfile")
        .then((res) => {
          dispatch({
            type: SET_USERS,
            payload: res.data.data,
          });
          dispatch({ type: CLEAR_ERRORS });
        })

        .catch((err) => {
          // var errors = JSON.parse(err.response.data.error).errors;
          // dispatch({
          //   type: SET_ERRORS,
          //   payload: err.response ? err.response.data : err.response,
          // });
          // console.log(err);
          // toast.error(`${errors[0].msg}`, {
          //   position: toast.POSITION.TOP_RIGHT,
          // });
        });
    }
  };

export const handleChangePassword = (userData) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .post("/user/changePassword", userData)
    .then((res) => {
      dispatch({ type: CLEAR_ERRORS });
      toast.success(`${res.data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    })

    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response ? err.response.data : err.response,
      });
    });
};

export const forgetPassword = (userData) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .post("/user/forgotPassword", userData)
    .then((res) => {
      dispatch({ type: CLEAR_ERRORS });
      toast.success(`${res.data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    })

    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response ? err.response.data : err.response,
      });
    });
};

const setAuthorizationHeader = (data) => {
  localStorage.setItem("access_token", data.data.accessToken);
};
