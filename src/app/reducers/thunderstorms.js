import {
  FETCH_THUNDERSTORMS_BEGIN,
  FETCH_THUNDERSTORMS_SUCCESS,
  FETCH_THUNDERSTORMS_FAIL,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_THUNDERSTORMS_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case FETCH_THUNDERSTORMS_SUCCESS:
    return {
      ...state,
      data: action.payload.thunderstorms,
      count: action.payload.count,
      isFetching: false,
    };
  case FETCH_THUNDERSTORMS_FAIL:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};
