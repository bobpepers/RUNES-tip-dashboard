import {
  FETCH_REACTDROP_BEGIN,
  FETCH_REACTDROP_SUCCESS,
  FETCH_REACTDROP_FAIL,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_REACTDROP_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case FETCH_REACTDROP_SUCCESS:
    return {
      ...state,
      data: action.payload.reactdrop,
      isFetching: false,
    };
  case FETCH_REACTDROP_FAIL:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};
