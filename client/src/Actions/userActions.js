import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
  USER_UPLOAD_PROFILE_IMAGE_REQUEST,
  USER_UPLOAD_PROFILE_IMAGE_FAIL,
} from "../constants/userConstants";
import axios from "axios";
export const userRegisterAction = (
  name,
  email,
  password,
  passwordConfirm
) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users/register",
      {
        email,
        name,
        password,
        passwordConfirm,
      },
      config
    );
    dispatch({ type: REGISTER_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    console.error(error.message);
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response ? error.response.data.msg : error.message,
    });
  }
};
export const userLoginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users/login",
      {
        email,
        password,
      },
      config
    );
    dispatch({ type: LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    console.error(error.message);
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response ? error.response.data.msg : error.message,
    });
  }
};

export const logOutAction = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

export const uploadProfileImage = (image) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPLOAD_PROFILE_IMAGE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().userInfo.user.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/users/updateProfileImage`,
      image,
      config
    );
    dispatch({ type: USER_UPLOAD_PROFILE_IMAGE_REQUEST, payload: data });
  } catch (error) {
    console.error(error.message);
    dispatch({
      type: USER_UPLOAD_PROFILE_IMAGE_FAIL,
      payload: error.response ? error.response.data.msg : error.message,
    });
  }
};
