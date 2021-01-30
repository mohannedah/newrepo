import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
  USER_RESET,
  USER_UPLOAD_PROFILE_IMAGE_REQUEST,
  USER_UPLOAD_PROFILE_IMAGE_SUCCESS,
  USER_UPLOAD_PROFILE_IMAGE_FAIL,
} from "../constants/userConstants";

export const userLoginAndRegisterReducer = (
  state = { user: {}, loggedIn: false, error: null, loading: false },
  action
) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        loggedIn: false,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: action.payload,
        loading: false,
      };

    case REGISTER_FAIL:
      localStorage.removeItem("userInfo");
      return {
        ...state,
        loggedIn: false,
        user: {},
        loading: false,
        error: action.payload,
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        loggedIn: false,
        error: null,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: action.payload,
        loading: false,
        error: null,
      };

    case LOGIN_FAIL:
      localStorage.removeItem("userInfo");
      return {
        ...state,
        loggedIn: false,
        user: {},
        loading: false,
        error: action.payload,
      };

    case LOGOUT:
      localStorage.removeItem("userInfo");
      return {
        ...state,
        loggedIn: false,
        user: {},
        loading: false,
        error: null,
      };

    case USER_RESET:
      return {
        ...state,
        error: null,
        loading: false,
        user: {},
        loggedIn: false,
      };

    default:
      return state;
  }
};

export const uploadProfileImageReducer = (
  state = { profileImage: undefined },
  action
) => {
  switch (action.type) {
    case USER_UPLOAD_PROFILE_IMAGE_REQUEST:
      return {
        ...state,
        profileImage: undefined,
      };

    case USER_UPLOAD_PROFILE_IMAGE_SUCCESS:
      return {
        ...state,
        profileImage: action.payload,
      };

    case USER_UPLOAD_PROFILE_IMAGE_FAIL:
      return {
        ...state,
        profileImage: undefined,
      };

    default:
      return state;
  }
};
