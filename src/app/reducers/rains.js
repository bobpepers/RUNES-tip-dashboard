import {
  FETCH_RAINS_BEGIN,
  FETCH_RAINS_SUCCESS,
  FETCH_RAINS_FAIL,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_RAINS_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case FETCH_RAINS_SUCCESS:
    return {
      ...state,
      data: action.payload.rains,
      count: action.payload.count,
      isFetching: false,
    };
  case FETCH_RAINS_FAIL:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};
