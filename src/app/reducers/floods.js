import {
  FETCH_FLOODS_BEGIN,
  FETCH_FLOODS_SUCCESS,
  FETCH_FLOODS_FAIL,

} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_FLOODS_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case FETCH_FLOODS_SUCCESS:
    return {
      ...state,
      data: action.payload.floods,
      count: action.payload.count,
      isFetching: false,
    };
  case FETCH_FLOODS_FAIL:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};
