import {
  FETCH_THUNDER_BEGIN,
  FETCH_THUNDER_SUCCESS,
  FETCH_THUNDER_FAIL,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_THUNDER_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case FETCH_THUNDER_SUCCESS:
    return {
      ...state,
      data: action.payload.thunder,
      isFetching: false,
    };
  case FETCH_THUNDER_FAIL:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};
