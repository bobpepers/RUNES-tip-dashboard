import {
  FETCH_LOGS_BEGIN,
  FETCH_LOGS_SUCCESS,
  FETCH_LOGS_FAIL,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_LOGS_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case FETCH_LOGS_SUCCESS:
    return {
      ...state,
      data: action.payload.result,
      count: action.payload.count,
      isFetching: false,
    };
  case FETCH_LOGS_FAIL:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};
