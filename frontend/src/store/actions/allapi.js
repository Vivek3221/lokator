import {
  GET_COUNTRY,
  SET_ERRORS,
  CLEAR_ERRORS,
  GET_LOCATIONS,
  ADD_COUNTRY,
  LOADING_UI,
  DELETE_PASSION,
  DELETE_SUBSCRIPTION,
  GET_CONTACT,
  ADD_ADVERTISMENT,
  GET_USERS,
  GET_CAPACITY,
  DELETE_ADVERTISMENT,
  SHOW_SUCCESS,
  EDIT_ADVERTISMENT,
  EDIT_COUNTRY,
  GET_DASHBOARD,
  ADD_CAPACITY,
  EDIT_CAPACITY,
  GET_REPORT,
  GET_TYPE,
  ADD_TYPE,
  EDIT_TYPE,
  GET_CATEGORY,
  ADD_CATEGORY,
  EDIT_CATEGORY,
  SELECT_IMAGE,
  GET_MACHINES,
  ADD_MACHINE,
  EDIT_MACHINE
} from "../types";

import axios from "axios";
import { toast } from "react-toastify";
import {ItemperPage } from '../../utils/constants'
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
    .post ("/user/contactUs",values)
    .then((res) => {
      

      dispatch({ type: CLEAR_ERRORS });
      return true
    })

    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response ? err.response.data : err.response,
      });
      toast.error(`Someting Went Wrong`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return false
    });
};

export const getLocations = (id) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .get("/country/get-location?search="+id)
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
    .post("/country/update",values)
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



export const getContact = (page=0) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .get("/user/contactUsLists?page="+page+"&size="+ItemperPage)
    .then((res) => {
      console.log(res)
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




// export const sendNotification = (data, history) => (dispatch) => {
//   dispatch({ type: LOADING_UI });

//   axios
//     .post("/admin/send-notification", data)
//     .then((res) => {
//       dispatch({ type: CLEAR_ERRORS });

//       toast.info(`${res.data.message}`, {
//         position: toast.POSITION.TOP_RIGHT,
//       });
//     })

//     .catch((err) => {
//       dispatch({
//         type: SET_ERRORS,
//         payload: err.response ? err.response.data : err.response,
//       });
//     });
// };

export const getUsers = (page=0) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .get("/user/usersLists?page="+page+"&size="+ItemperPage)
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











export const getCapacity = (page=0,search='') => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .get("/machine/get-capacity?page="+page+"&size="+ItemperPage+"&search="+search)
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
      console.log(res.data.data)
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
    .post("/machine/update-capacity",values)
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



export const getType = (page=0,search='') => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .get("/machine/get-type?page="+page+"&size="+ItemperPage+"&search="+search)
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
      console.log(res.data.data)
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
    .post("/machine/update-type",values)
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

export const getCategory = (page=0,search='',status) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  var url = "/machine/get-category?page="+page+"&size="+ItemperPage+"&search="+search
  if(status){
    url = url + "&status="+status
  } 
  axios
    .get(url)
    .then((res) => {
      dispatch({
        type: GET_CATEGORY,
        payload: res.data.data,
      });
      dispatch({ type: CLEAR_ERRORS });
      return res
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
      console.log(res.data.data)
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
    .post("/machine/update-category",values)
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


export const getMachines = (page=0,search='',status) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  var url = "/product/product-lists?page="+page+"&size="+ItemperPage+"&search="+search
  if(status){
    url = url + "&status="+status
  } 
  
  axios
    .get(url)
    .then((res) => {
      console.log(res.data)
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
      console.log(res.data.data)
      dispatch({
        type: ADD_MACHINE,
        payload: res.data,
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
    .post("/product/update-product",values)
    .then((res) => {
      toast.success(`${res.data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      }); 
      dispatch({
        type: EDIT_MACHINE,
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







export const uploadImage =   (file) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  var formData = new FormData();
  formData.append("file", file);
  await axios
    .post("/machine/upload-image",formData)
    .then((res) => {
      toast.success(`${res.data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      }); 
      dispatch({
        type: SELECT_IMAGE,
        payload: res.data.data.file,
      });
      dispatch({ type: CLEAR_ERRORS });
      return res
    })

    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response ? err.response.data : err.response,
      });
    });
};

export const selectImage =   (data) => async (dispatch) => {
  dispatch({
    type: SELECT_IMAGE,
    payload: data,
  });
  
};

