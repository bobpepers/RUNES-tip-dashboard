import {
  FETCH_REACTDROPS_BEGIN,
  FETCH_REACTDROPS_SUCCESS,
  FETCH_REACTDROPS_FAIL,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_REACTDROPS_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case FETCH_REACTDROPS_SUCCESS:
    return {
      ...state,
      data: action.payload.reactdrops,
      count: action.payload.count,
      isFetching: false,
    };
  case FETCH_REACTDROPS_FAIL:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};
