import {
  GET_ALL_POSTS_FAIL,
  GET_ALL_POSTS_REQUEST,
  GET_ALL_POSTS_SUCCESS,
  GET_ALL_PROFILE_POSTS_FAIL,
  GET_ALL_PROFILE_POSTS_REQUEST,
  GET_ALL_PROFILE_POSTS_SUCCESS,
  LIKE_POST_FAIL,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  REPLY_POST_FAIL,
  REPLY_POST_REQUEST,
  REPLY_POST_SUCCESS,
  RETWEET_POST_FAIL,
  RETWEET_POST_REQUEST,
  RETWEET_POST_SUCCESS,
  USER_POST_FAIL,
  USER_POST_REQUEST,
  USER_POST_SUCCESS,
} from "../constants/postsConstants";
import axios from "axios";
export const getAllPostsAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ALL_POSTS_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().userLoginAndRegister.user.token}`,
      },
    };
    const { data } = await axios.get("/api/posts", config);
    dispatch({
      type: GET_ALL_POSTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error(error.message);
    dispatch({
      type: GET_ALL_POSTS_FAIL,
      payload: error.response ? error.response.data.msg : error.message,
    });
  }
};

export const postUserAction = (content) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_POST_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().userLoginAndRegister.user.token}`,
      },
    };
    const { data } = await axios.post(
      "/api/posts",
      {
        content,
      },
      config
    );
    dispatch({
      type: USER_POST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error(error.message);
    dispatch({
      type: USER_POST_FAIL,
      payload: error.response ? error.response.data.msg : error.message,
    });
  }
};

export const retweetPost = (postId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: RETWEET_POST_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().userLoginAndRegister.user.token}`,
      },
    };
    const { data } = await axios.get(`/api/posts/retweet/${postId}`, config);
    dispatch({
      type: RETWEET_POST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error(error.message);
    dispatch({
      type: RETWEET_POST_FAIL,
      payload: error.response ? error.response.data.msg : error.message,
    });
  }
};

export const replyPostAction = (content, postId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: REPLY_POST_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().userLoginAndRegister.user.token}`,
      },
    };
    const { data } = await axios.post(
      `/api/posts/reply/${postId}`,
      {
        content,
      },
      config
    );
    dispatch({
      type: REPLY_POST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error(error.message);
    dispatch({
      type: REPLY_POST_FAIL,
      payload: error.response ? error.response.data.msg : error.message,
    });
  }
};

export const likePostAction = (postId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LIKE_POST_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().userLoginAndRegister.user.token}`,
      },
    };
    const { data } = await axios.get(`/api/posts/like/${postId}`, config);
    dispatch({
      type: LIKE_POST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error(error.message);
    dispatch({
      type: LIKE_POST_FAIL,
      payload: error.response ? error.response.data.msg : error.message,
    });
  }
};

export const getAllProfilePostsAction = (userID) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: GET_ALL_PROFILE_POSTS_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().userLoginAndRegister.user.token}`,
      },
    };
    const { data } = await axios.get(`/api/posts/profile/${userID}`, config);
    dispatch({
      type: GET_ALL_PROFILE_POSTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error(error.message);
    dispatch({
      type: GET_ALL_PROFILE_POSTS_FAIL,
      payload: error.response ? error.response.data.msg : error.message,
    });
  }
};
