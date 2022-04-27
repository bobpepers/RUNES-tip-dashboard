import {
  FETCH_BOTFUNCTIONS_BEGIN,
  FETCH_BOTFUNCTIONS_SUCCESS,
  FETCH_BOTFUNCTIONS_FAIL,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (
  state = initialState,
  action,
) => {
  switch (action.type) {
  case FETCH_BOTFUNCTIONS_BEGIN:
    return {
      ...state,
      isFetching: true,
      data: null,
      error: null,
    };
  case FETCH_BOTFUNCTIONS_SUCCESS:
    return {
      ...state,
      data: action.payload.result,
      count: action.payload.count,
      isFetching: false,
    };
  case FETCH_BOTFUNCTIONS_FAIL:
    return {
      ...state,
      error: action.error,
      data: null,
      isFetching: false,
    };
  default:
    return state;
  }
};
