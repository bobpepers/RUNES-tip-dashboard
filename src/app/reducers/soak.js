import {
  FETCH_SOAK_BEGIN,
  FETCH_SOAK_SUCCESS,
  FETCH_SOAK_FAIL,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_SOAK_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case FETCH_SOAK_SUCCESS:
    return {
      ...state,
      data: action.payload.result,
      isFetching: false,
    };
  case FETCH_SOAK_FAIL:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};
