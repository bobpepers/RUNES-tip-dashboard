import {
  EDIT_COININFO_BEGIN,
  EDIT_COININFO_SUCCESS,
  EDIT_COININFO_FAIL,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case EDIT_COININFO_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case EDIT_COININFO_SUCCESS:
    return {
      ...state,
      data: action.payload.result,
      count: action.payload.count,
      isFetching: false,
    };
  case EDIT_COININFO_FAIL:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};
