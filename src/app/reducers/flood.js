import {
  FETCH_FLOOD_BEGIN,
  FETCH_FLOOD_SUCCESS,
  FETCH_FLOOD_FAIL,

} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_FLOOD_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case FETCH_FLOOD_SUCCESS:
    return {
      ...state,
      data: action.payload.flood,
      isFetching: false,
    };
  case FETCH_FLOOD_FAIL:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};
