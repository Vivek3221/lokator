import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  TOGGLE_SIDEBAR,
  STOP_LOADING_UI,
  SHOW_SUCCESS,
} from "../types";

const initialState = {
  loading: false,
  errors: null,
  sidebarShow: true,
  sucesss: "",
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null,
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true,
      };
    case STOP_LOADING_UI:
      return {
        ...state,
        loading: false,
      };
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebarShow: action.payload,
      };
    case SHOW_SUCCESS:
      return {
        ...state,
        sucesss: action.payload,
      };
    default:
      return state;
  }
}
