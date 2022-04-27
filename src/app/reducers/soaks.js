import {
  FETCH_SOAKS_BEGIN,
  FETCH_SOAKS_SUCCESS,
  FETCH_SOAKS_FAIL,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_SOAKS_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case FETCH_SOAKS_SUCCESS:
    return {
      ...state,
      data: action.payload.result,
      count: action.payload.count,
      isFetching: false,
    };
  case FETCH_SOAKS_FAIL:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};
