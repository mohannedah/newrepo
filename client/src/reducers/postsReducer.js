import {
  GET_ALL_POSTS_FAIL,
  GET_ALL_POSTS_REQUEST,
  GET_ALL_POSTS_SUCCESS,
  REPLY_POST_FAIL,
  REPLY_POST_REQUEST,
  REPLY_POST_SUCCESS,
  RETWEET_POST_FAIL,
  RETWEET_POST_REQUEST,
  RETWEET_POST_SUCCESS,
  USER_POST_FAIL,
  USER_POST_REQUEST,
  USER_POST_SUCCESS,
  LIKE_POST_FAIL,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  GET_ALL_PROFILE_POSTS_REQUEST,
  GET_ALL_PROFILE_POSTS_SUCCESS,
  GET_ALL_PROFILE_POSTS_FAIL,
} from "../constants/postsConstants";

export const getAllPostsReducer = (
  state = { posts: [], loading: true, error: null },
  action
) => {
  switch (action.type) {
    case GET_ALL_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
        posts: [],
        error: null,
      };

    case GET_ALL_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload,
        error: null,
      };

    case GET_ALL_POSTS_FAIL:
      return {
        ...state,
        error: action.payload,
        posts: [],
        loading: false,
      };

    default:
      return state;
  }
};

export const userPostReducer = (
  state = { post: {}, loading: true, error: null },
  action
) => {
  switch (action.type) {
    case USER_POST_REQUEST:
      return {
        ...state,
        loading: true,
        post: {},
        error: null,
      };

    case USER_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        post: action.payload,
        error: null,
      };

    case USER_POST_FAIL:
      return {
        ...state,
        error: action.payload,
        post: {},
        loading: false,
      };

    default:
      return state;
  }
};

export const userRetweetPostReducer = (
  state = { post: {}, loading: true, error: null },
  action
) => {
  switch (action.type) {
    case RETWEET_POST_REQUEST:
      return {
        ...state,
        loading: true,
        post: {},
        error: null,
      };

    case RETWEET_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        post: action.payload,
        error: null,
      };

    case RETWEET_POST_FAIL:
      return {
        ...state,
        error: action.payload,
        post: {},
        loading: false,
      };

    default:
      return state;
  }
};

export const userReplyPostReducer = (
  state = { post: {}, loading: true, error: null },
  action
) => {
  switch (action.type) {
    case REPLY_POST_REQUEST:
      return {
        ...state,
        loading: true,
        post: {},
        error: null,
      };

    case REPLY_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        post: action.payload,
        error: null,
      };

    case REPLY_POST_FAIL:
      return {
        ...state,
        error: action.payload,
        post: {},
        loading: false,
      };

    default:
      return state;
  }
};

export const userLikePostReducer = (
  state = { post: {}, loading: true, error: null },
  action
) => {
  switch (action.type) {
    case LIKE_POST_REQUEST:
      return {
        ...state,
        loading: true,
        post: {},
        error: null,
      };

    case LIKE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        post: action.payload,
        error: null,
      };

    case LIKE_POST_FAIL:
      return {
        ...state,
        error: action.payload,
        post: {},
        loading: false,
      };

    default:
      return state;
  }
};
export const profilePostsReducer = (
  state = {
    userPosts: [],
    userReplyPosts: [],
    profileUser: {},
    loading: true,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case GET_ALL_PROFILE_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
        userPosts: [],
        userReplyPosts: [],
        profileUser: {},
        error: null,
      };

    case GET_ALL_PROFILE_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        userPosts: action.payload.userPosts,
        userReplyPosts: action.payload.userReplyPosts,
        profileUser: action.payload.user,
        error: null,
      };

    case GET_ALL_PROFILE_POSTS_FAIL:
      return {
        ...state,
        error: action.payload,
        userPosts: [],
        userReplyPosts: [],
        profileUser: {},
        loading: false,
      };

    default:
      return state;
  }
};
