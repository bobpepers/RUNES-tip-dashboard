import {
  FETCH_WITHDRAWALADDRESSES_BEGIN,
  FETCH_WITHDRAWALADDRESSES_SUCCESS,
  FETCH_WITHDRAWALADDRESSES_FAIL,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_WITHDRAWALADDRESSES_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case FETCH_WITHDRAWALADDRESSES_SUCCESS:
    return {
      ...state,
      data: action.payload.result,
      count: action.payload.count,
      isFetching: false,
    };
  case FETCH_WITHDRAWALADDRESSES_FAIL:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};
