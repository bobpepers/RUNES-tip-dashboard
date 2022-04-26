import {
  FETCH_SLEET_BEGIN,
  FETCH_SLEET_SUCCESS,
  FETCH_SLEET_FAIL,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_SLEET_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case FETCH_SLEET_SUCCESS:
    return {
      ...state,
      data: action.payload.sleet,
      isFetching: false,
    };
  case FETCH_SLEET_FAIL:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};
