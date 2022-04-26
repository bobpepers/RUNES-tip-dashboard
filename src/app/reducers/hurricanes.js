import {
  FETCH_HURRICANES_BEGIN,
  FETCH_HURRICANES_SUCCESS,
  FETCH_HURRICANES_FAIL,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_HURRICANES_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case FETCH_HURRICANES_SUCCESS:
    return {
      ...state,
      data: action.payload.hurricanes,
      count: action.payload.count,
      isFetching: false,
    };
  case FETCH_HURRICANES_FAIL:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};
