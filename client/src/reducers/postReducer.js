import {
  GET_POST,
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  POST_LOADING
} from "../actions/types";
// import isEmpty from "../validation/is-empty";

const initalState = {
  posts: [],
  post: {},
  loading: false
};

export default function(state = initalState, action) {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    default:
      return state;
  }
}
