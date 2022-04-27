import {
  FETCH_RAIN_BEGIN,
  FETCH_RAIN_SUCCESS,
  FETCH_RAIN_FAIL,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_RAIN_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case FETCH_RAIN_SUCCESS:
    return {
      ...state,
      data: action.payload.result,
      isFetching: false,
    };
  case FETCH_RAIN_FAIL:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};
