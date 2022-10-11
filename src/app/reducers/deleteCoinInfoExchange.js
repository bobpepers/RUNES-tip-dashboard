import {
  DELETE_COININFOEXCHANGE_BEGIN,
  DELETE_COININFOEXCHANGE_SUCCESS,
  DELETE_COININFOEXCHANGE_FAIL,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case DELETE_COININFOEXCHANGE_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case DELETE_COININFOEXCHANGE_SUCCESS:
    return {
      ...state,
      data: action.payload.result,
      count: action.payload.count,
      isFetching: false,
    };
  case DELETE_COININFOEXCHANGE_FAIL:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};
