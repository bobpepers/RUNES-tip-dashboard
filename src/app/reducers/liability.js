import {
  FETCH_LIABILITY_BEGIN,
  FETCH_LIABILITY_SUCCESS,
  FETCH_LIABILITY_FAIL,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_LIABILITY_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case FETCH_LIABILITY_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isFetching: false,
    };
  case FETCH_LIABILITY_FAIL:
    console.log('Error: ', action.error);
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};
