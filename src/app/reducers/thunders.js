import {
  FETCH_THUNDERS_BEGIN,
  FETCH_THUNDERS_SUCCESS,
  FETCH_THUNDERS_FAIL,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_THUNDERS_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case FETCH_THUNDERS_SUCCESS:
    return {
      ...state,
      data: action.payload.thunders,
      count: action.payload.count,
      isFetching: false,
    };
  case FETCH_THUNDERS_FAIL:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};
