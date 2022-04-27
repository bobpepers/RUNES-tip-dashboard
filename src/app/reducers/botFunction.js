import {
  FETCH_BOTFUNCTION_BEGIN,
  FETCH_BOTFUNCTION_SUCCESS,
  FETCH_BOTFUNCTION_FAIL,
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
  case FETCH_BOTFUNCTION_BEGIN:
    return {
      ...state,
      isFetching: true,
      data: null,
      error: null,
    };
  case FETCH_BOTFUNCTION_SUCCESS:
    return {
      ...state,
      data: action.payload.result,
      isFetching: false,
    };
  case FETCH_BOTFUNCTION_FAIL:
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
