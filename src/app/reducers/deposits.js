import {
  FETCH_DEPOSITS_BEGIN,
  FETCH_DEPOSITS_SUCCESS,
  FETCH_DEPOSITS_FAIL,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_DEPOSITS_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case FETCH_DEPOSITS_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isFetching: false,
    };
  case FETCH_DEPOSITS_FAIL:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};
