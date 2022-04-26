import {
  FETCH_TIP_BEGIN,
  FETCH_TIP_SUCCESS,
  FETCH_TIP_FAIL,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_TIP_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case FETCH_TIP_SUCCESS:
    return {
      ...state,
      data: action.payload.tip,
      isFetching: false,
    };
  case FETCH_TIP_FAIL:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};
