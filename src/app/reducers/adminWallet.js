import {
  FETCH_ADMINWALLET_BEGIN,
  FETCH_ADMINWALLET_SUCCESS,
  FETCH_ADMINWALLET_FAIL,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_ADMINWALLET_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case FETCH_ADMINWALLET_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isFetching: false,
    };
  case FETCH_ADMINWALLET_FAIL:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};
