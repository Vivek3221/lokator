import {
  SET_USER,
  SET_USERS,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  UPDATE_BLOCK,
  DELETE_USER,
  GET_MATCHES,
  SET_SINGLE_USERS,
} from "../types";

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  matches: [],
  user: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        ...state,
        authenticated: true,
        loading: false,
        ...action.payload,
      };
    case SET_USERS:
      return {
        ...state,
        authenticated: true,
        loading: false,
        user: action.payload,
      };
   
    case GET_MATCHES:
      return {
        ...state,
        authenticated: true,
        loading: false,
        matches: action.payload,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case DELETE_USER:
      var { users } = state;
      var updateuser = [...users].filter((item) => {
        return item._id !== action.payload;
      });
      return {
        ...state,
        users: updateuser,
      };
    case UPDATE_BLOCK:
      var { users } = state;

      var updateuser = [...users].map((item) => {
        if (item._id == action.payload) {
          item.isBlocked = !item.isBlocked;
        }
        return item;
      });

      return {
        ...state,
      };
    default:
      return state;
  }
}
