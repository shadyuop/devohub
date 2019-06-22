import axios from "axios";
import {
  // GET_ERRORS,
  // GET_POST,
  // GET_POSTS,
  ADD_POST,
  GET_ERRORS
  // DELETE_POST,
  // POST_LOADING
} from "./types";

// Add Post
export const addPost = postData => dispatch => {
  axios
    .post("/api/posts", postData)
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.respond.data
      })
    );
};
