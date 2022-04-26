import {
  FETCH_HURRICANE_BEGIN,
  FETCH_HURRICANE_SUCCESS,
  FETCH_HURRICANE_FAIL,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_HURRICANE_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case FETCH_HURRICANE_SUCCESS:
    return {
      ...state,
      data: action.payload.hurricane,
      isFetching: false,
    };
  case FETCH_HURRICANE_FAIL:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};
