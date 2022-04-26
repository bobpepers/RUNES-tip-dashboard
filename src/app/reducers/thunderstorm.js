import {
  FETCH_THUNDERSTORM_BEGIN,
  FETCH_THUNDERSTORM_SUCCESS,
  FETCH_THUNDERSTORM_FAIL,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_THUNDERSTORM_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case FETCH_THUNDERSTORM_SUCCESS:
    return {
      ...state,
      data: action.payload.thunderstorm,
      isFetching: false,
    };
  case FETCH_THUNDERSTORM_FAIL:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};
