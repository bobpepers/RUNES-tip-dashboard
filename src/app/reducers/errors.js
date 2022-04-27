import {
  FETCH_ERRORS_BEGIN,
  FETCH_ERRORS_SUCCESS,
  FETCH_ERRORS_FAIL,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_ERRORS_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case FETCH_ERRORS_SUCCESS:
    return {
      ...state,
      data: action.payload.result,
      count: action.payload.count,
      isFetching: false,
    };
  case FETCH_ERRORS_FAIL:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};
