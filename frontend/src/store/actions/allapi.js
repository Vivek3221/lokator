import {
  GET_COUNTRY,
  SET_ERRORS,
  CLEAR_ERRORS,
  GET_LOCATIONS,
  ADD_COUNTRY,
  LOADING_UI,
  GET_CONTACT,
  GET_USERS,
  GET_CAPACITY,
  EDIT_COUNTRY,
  ADD_CAPACITY,
  EDIT_CAPACITY,
  GET_TYPE,
  ADD_TYPE,
  EDIT_TYPE,
  GET_CATEGORY,
  ADD_CATEGORY,
  EDIT_CATEGORY,
  SELECT_IMAGE,
  GET_MACHINES,
  ADD_MACHINE,
  EDIT_MACHINE,
  GET_ORDERS,
  UPDATE_ORDERS_STATUS,
  GET_INQUIRY,
  GET_NOTIFICATION
} from "../types";

import axios from "axios";
import { toast } from "react-toastify";
import { ItemperPage } from "../../utils/constants";
export const getCountries = () => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .get("/country/get-country")
    .then((res) => {
      dispatch({
        type: GET_COUNTRY,
        payload: res.data.data,
      });

      dispatch({ type: CLEAR_ERRORS });
    })

    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response ? err.response.data : err.response,
      });
    });
};

export const addContact = (values) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/user/contactUs", values)
    .then((res) => {
      dispatch({ type: CLEAR_ERRORS });
      return true;
    })

    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response ? err.response.data : err.response,
      });
      toast.error(`Someting Went Wrong`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return false;
    });
};

export const getLocations = (id) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .get("/country/get-location?search=" + id)
    .then((res) => {
      dispatch({
        type: GET_LOCATIONS,
        payload: res.data.data,
      });

      dispatch({ type: CLEAR_ERRORS });
    })

    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response ? err.response.data : err.response,
      });
    });
};

export const addCountry = (values) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .post("/country/save", values)
    .then((res) => {
      toast.success(`${res.data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch({
        type: ADD_COUNTRY,
        payload: res.data.data,
      });
      dispatch({ type: CLEAR_ERRORS });
    })

    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response ? err.response.data : err.response,
      });
    });
};

export const editCountry = (values) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .post("/country/update", values)
    .then((res) => {
      toast.success(`${res.data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch({
        type: EDIT_COUNTRY,
        payload: res.data.data,
      });
      dispatch({ type: CLEAR_ERRORS });
    })

    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response ? err.response.data : err.response,
      });
    });
};

export const getContact =
  (page = 0, search) =>
  (dispatch) => {
    dispatch({ type: LOADING_UI });

    axios
      .get(
        "/user/contactUsLists?page=" +
          page +
          "&size=" +
          ItemperPage +
          "&search=" +
          search
      )
      .then((res) => {
        console.log(res);
        dispatch({
          type: GET_CONTACT,
          payload: res.data.data,
        });

        dispatch({ type: CLEAR_ERRORS });
      })

      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response ? err.response.data : err.response,
        });
      });
  };


export const getUsers =
  (page = 0, search) =>
  (dispatch) => {
    dispatch({ type: LOADING_UI });

    axios
      .get(
        "/user/usersLists?page=" +
          page +
          "&size=" +
          ItemperPage +
          "&search=" +
          search
      )
      .then((res) => {
        dispatch({
          type: GET_USERS,
          payload: res.data.data,
        });

        dispatch({ type: CLEAR_ERRORS });
      })

      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response ? err.response.data : err.response,
        });
      });
  };

export const getCapacity =
  (page = 0, search = "") =>
  (dispatch) => {
    dispatch({ type: LOADING_UI });

    axios
      .get(
        "/machine/get-capacity?page=" +
          page +
          "&size=" +
          ItemperPage +
          "&search=" +
          search
      )
      .then((res) => {
        dispatch({
          type: GET_CAPACITY,
          payload: res.data.data,
        });

        dispatch({ type: CLEAR_ERRORS });
      })

      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response ? err.response.data : err.response,
        });
      });
  };

export const addCapcity = (values) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .post("/machine/save-capacity", values)
    .then((res) => {
      toast.success(`${res.data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(res.data.data);
      dispatch({
        type: ADD_CAPACITY,
        payload: res.data.data,
      });
      dispatch({ type: CLEAR_ERRORS });
    })

    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response ? err.response.data : err.response,
      });
    });
};

export const editCapacity = (values) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .post("/machine/update-capacity", values)
    .then((res) => {
      toast.success(`${res.data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch({
        type: EDIT_CAPACITY,
        payload: values,
      });
      dispatch({ type: CLEAR_ERRORS });
    })

    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response ? err.response.data : err.response,
      });
    });
};

export const getType =
  (page = 0, search = "") =>
  (dispatch) => {
    dispatch({ type: LOADING_UI });

    axios
      .get(
        "/machine/get-type?page=" +
          page +
          "&size=" +
          ItemperPage +
          "&search=" +
          search
      )
      .then((res) => {
        dispatch({
          type: GET_TYPE,
          payload: res.data.data,
        });

        dispatch({ type: CLEAR_ERRORS });
      })

      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response ? err.response.data : err.response,
        });
      });
  };

export const addType = (values) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .post("/machine/save-type", values)
    .then((res) => {
      toast.success(`${res.data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(res.data.data);
      dispatch({
        type: ADD_TYPE,
        payload: res.data.data,
      });

      dispatch({ type: CLEAR_ERRORS });
    })

    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response ? err.response.data : err.response,
      });
    });
};

export const editType = (values) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .post("/machine/update-type", values)
    .then((res) => {
      toast.success(`${res.data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch({
        type: EDIT_TYPE,
        payload: values,
      });
      dispatch({ type: CLEAR_ERRORS });
    })

    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response ? err.response.data : err.response,
      });
    });
};

export const getCategory =
  (page = 0, search = "", status) =>
  (dispatch) => {
    dispatch({ type: LOADING_UI });
    var url =
      "/machine/get-category?page=" +
      page +
      "&size=" +
      ItemperPage +
      "&search=" +
      search;
    if (status) {
      url = url + "&status=" + status;
    }
    axios
      .get(url)
      .then((res) => {
        dispatch({
          type: GET_CATEGORY,
          payload: res.data.data,
        });
        dispatch({ type: CLEAR_ERRORS });
        return res;
      })

      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response ? err.response.data : err.response,
        });
      });
  };

export const addCategory = (values) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .post("/machine/save-category", values)
    .then((res) => {
      toast.success(`${res.data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(res.data.data);
      dispatch({
        type: ADD_CATEGORY,
        payload: res.data.data,
      });
      dispatch({ type: CLEAR_ERRORS });
    })

    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response ? err.response.data : err.response,
      });
    });
};

export const editCategory = (values) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .post("/machine/update-category", values)
    .then((res) => {
      toast.success(`${res.data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch({
        type: EDIT_CATEGORY,
        payload: values,
      });
      dispatch({ type: CLEAR_ERRORS });
    })

    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response ? err.response.data : err.response,
      });
    });
};

export const getMachines =
  (page = 0, search = "", status) =>
  (dispatch) => {
    dispatch({ type: LOADING_UI });
    var url =
      "/product/product-lists?page=" +
      page +
      "&size=" +
      ItemperPage +
      "&search=" +
      search +
      "&role=" +
      localStorage.getItem("role_id") +
      "&user_id=" +
      JSON.parse(localStorage.getItem("user_data"))?.id;
    if (status) {
      url = url + "&status=" + status;
    }

    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: GET_MACHINES,
          payload: res.data.data,
        });
        dispatch({ type: CLEAR_ERRORS });
      })

      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response ? err.response.data : err.response,
        });
      });
  };

export const addMachine = (values) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .post("/product/add-product", values)
    .then((res) => {
      toast.success(`${res.data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(res.data.data);
      dispatch({
        type: ADD_MACHINE,
        payload: res.data.data,
      });
      dispatch({ type: CLEAR_ERRORS });
    })

    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response ? err.response.data : err.response,
      });
    });
};

export const editMachine = (values) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .post("/product/update-product", values)
    .then((res) => {
      toast.success(`${res.data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(values);
      dispatch({
        type: EDIT_MACHINE,
        payload: { ...res.data.data, machine_image: values.machine_image },
      });
      dispatch({ type: CLEAR_ERRORS });
    })

    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response ? err.response.data : err.response,
      });
    });
};

export const uploadImage = (file) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  var formData = new FormData();
  formData.append("file", file);
  await axios
    .post("/machine/upload-image", formData)
    .then((res) => {
      toast.success(`${res.data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch({
        type: SELECT_IMAGE,
        payload: res.data.data.file,
      });
      dispatch({ type: CLEAR_ERRORS });
      return res;
    })

    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response ? err.response.data : err.response,
      });
    });
};

export const selectImage = (data) => async (dispatch) => {
  dispatch({
    type: SELECT_IMAGE,
    payload: data,
  });
};

export const saveOrders = (values, setShow) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  const token = localStorage.getItem("access_token");
  const headers = {
    "Content-Type": "application/json",
    "x-access-token": token,
  };
  axios
    .post("/machine/save-order", values, {
      headers: headers,
    })
    .then((res) => {
      localStorage.removeItem("cart_items");
      dispatch({ type: CLEAR_ERRORS });
      setShow(true);
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response ? err.response.data : err.response,
      });
    });
};

export const getOrders = (values) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .post("/machine/orders", values)
    .then((res) => {
      dispatch({
        type: GET_ORDERS,
        payload: res.data.data,
      });

      dispatch({ type: CLEAR_ERRORS });
    })

    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response ? err.response.data : err.response,
      });
    });
};

export const updateStatus = (values) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .put("/machine/change-order-status", values)
    .then((res) => {
      toast.success(`${res.data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch({
        type: UPDATE_ORDERS_STATUS,
        payload: values,
      });
      dispatch({ type: CLEAR_ERRORS });
    })

    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response ? err.response.data : err.response,
      });
    });
};

export const makeEnquiry = (values) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  const token = localStorage.getItem("access_token");
  const headers = {
    "Content-Type": "application/json",
    "x-access-token": token,
  };
  axios
    .post("/product/inquiry", values, {
      headers: headers,
    })
    .then((res) => {
      toast.success(`${res.data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      localStorage.removeItem("cart_items");
      dispatch({ type: CLEAR_ERRORS });
    })

    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response ? err.response.data : err.response,
      });
    });
};

export const getInquiry = (values) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .post("/product/inquiry/list", values)
    .then((res) => {
      dispatch({
        type: GET_INQUIRY,
        payload: res.data.data,
      });

      dispatch({ type: CLEAR_ERRORS });
    })

    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response ? err.response.data : err.response,
      });
    });
};


export const getNotification =
  () =>
  (dispatch) => {
    

    axios
      .get(
        "/notification/notification-list"
      )
      .then((res) => {
        dispatch({
          type: GET_NOTIFICATION,
          payload: res.data.data,
        });

        dispatch({ type: CLEAR_ERRORS });
      })

      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response ? err.response.data : err.response,
        });
      });
  };

  export const updateNotification = (type,history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    const token = localStorage.getItem("access_token");
    const headers = {
      "Content-Type": "application/json",
      "x-access-token": token,
    };
    axios
      .put("/notification/update-notification-status", {
        notification_type:type
    }, {
        headers: headers,
      })
      .then((res) => {
        dispatch({ type: CLEAR_ERRORS });
        if(type === 'Register'){
          history.push('/users-list');
        }
        if(type === 'Order'){
          history.push('/orders');
        }
        if(type === 'Machines'){
          history.push('/machines');
        }
        if(type === 'Inquiries'){
          history.push('/inquiries');
        }
        
      })
  
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response ? err.response.data : err.response,
        });
      });
  };