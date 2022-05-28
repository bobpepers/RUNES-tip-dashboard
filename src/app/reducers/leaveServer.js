import {
  POST_LEAVESERVER_BEGIN,
  POST_LEAVESERVER_SUCCESS,
  POST_LEAVESERVER_FAIL,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case POST_LEAVESERVER_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case POST_LEAVESERVER_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isFetching: false,
    };
  case POST_LEAVESERVER_FAIL:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};
