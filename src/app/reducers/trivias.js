import {
  FETCH_TRIVIAS_BEGIN,
  FETCH_TRIVIAS_SUCCESS,
  FETCH_TRIVIAS_FAIL,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_TRIVIAS_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case FETCH_TRIVIAS_SUCCESS:
    return {
      ...state,
      data: action.payload.trivias,
      count: action.payload.count,
      isFetching: false,
    };
  case FETCH_TRIVIAS_FAIL:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};
