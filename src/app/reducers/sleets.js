import {
  FETCH_SLEETS_BEGIN,
  FETCH_SLEETS_SUCCESS,
  FETCH_SLEETS_FAIL,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_SLEETS_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case FETCH_SLEETS_SUCCESS:
    return {
      ...state,
      data: action.payload.sleets,
      count: action.payload.count,
      isFetching: false,
    };
  case FETCH_SLEETS_FAIL:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};
