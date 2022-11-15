import {
  POST_EDITSERVER_BEGIN,
  POST_EDITSERVER_SUCCESS,
  POST_EDITSERVER_FAIL,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case POST_EDITSERVER_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case POST_EDITSERVER_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isFetching: false,
    };
  case POST_EDITSERVER_FAIL:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};
