import {
  PATCH_DEPOSITS_BEGIN,
  PATCH_DEPOSITS_SUCCESS,
  PATCH_DEPOSITS_FAIL,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case PATCH_DEPOSITS_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case PATCH_DEPOSITS_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isFetching: false,
    };
  case PATCH_DEPOSITS_FAIL:
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
