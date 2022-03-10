import {
  ACCEPT_WITHDRAWAL_FAIL,
  ACCEPT_WITHDRAWAL_SUCCESS,
  ACCEPT_WITHDRAWAL_BEGIN,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case ACCEPT_WITHDRAWAL_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case ACCEPT_WITHDRAWAL_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isFetching: false,
    };
  case ACCEPT_WITHDRAWAL_FAIL:
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
