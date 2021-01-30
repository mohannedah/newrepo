import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginAndRegisterReducer } from "./reducers/userReducer";
import {
  getAllPostsReducer,
  profilePostsReducer,
  userLikePostReducer,
  userPostReducer,
  userReplyPostReducer,
  userRetweetPostReducer,
} from "./reducers/postsReducer";

const reducer = combineReducers({
  userLoginAndRegister: userLoginAndRegisterReducer,
  userLikePost: userLikePostReducer,
  userReplyPost: userReplyPostReducer,
  userRetweetPost: userRetweetPostReducer,
  userPost: userPostReducer,
  getAllPosts: getAllPostsReducer,
  profilePosts: profilePostsReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : {};
const initialState = {
  user: { userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
