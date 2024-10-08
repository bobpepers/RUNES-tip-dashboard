import {
  POST_EDIT_GROUP_BEGIN,
  POST_EDIT_GROUP_SUCCESS,
  POST_EDIT_GROUP_FAIL,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case POST_EDIT_GROUP_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case POST_EDIT_GROUP_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isFetching: false,
    };
  case POST_EDIT_GROUP_FAIL:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};
