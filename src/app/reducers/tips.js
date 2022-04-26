import {
  FETCH_TIPS_BEGIN,
  FETCH_TIPS_SUCCESS,
  FETCH_TIPS_FAIL,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_TIPS_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case FETCH_TIPS_SUCCESS:
    return {
      ...state,
      data: action.payload.tips,
      count: action.payload.count,
      isFetching: false,
    };
  case FETCH_TIPS_FAIL:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};
