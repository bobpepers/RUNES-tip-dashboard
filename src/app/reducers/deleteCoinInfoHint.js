import {
  DELETE_COININFOHINT_BEGIN,
  DELETE_COININFOHINT_SUCCESS,
  DELETE_COININFOHINT_FAIL,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case DELETE_COININFOHINT_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case DELETE_COININFOHINT_SUCCESS:
    return {
      ...state,
      data: action.payload.result,
      count: action.payload.count,
      isFetching: false,
    };
  case DELETE_COININFOHINT_FAIL:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};
