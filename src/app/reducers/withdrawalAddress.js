import {
  FETCH_WITHDRAWALADDRESS_BEGIN,
  FETCH_WITHDRAWALADDRESS_SUCCESS,
  FETCH_WITHDRAWALADDRESS_FAIL,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_WITHDRAWALADDRESS_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case FETCH_WITHDRAWALADDRESS_SUCCESS:
    return {
      ...state,
      data: action.payload.result,
      isFetching: false,
    };
  case FETCH_WITHDRAWALADDRESS_FAIL:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};
