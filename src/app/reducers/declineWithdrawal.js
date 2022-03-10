import {
  DECLINE_WITHDRAWAL_BEGIN,
  DECLINE_WITHDRAWAL_SUCCESS,
  DECLINE_WITHDRAWAL_FAIL,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case DECLINE_WITHDRAWAL_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case DECLINE_WITHDRAWAL_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isFetching: false,
    };
  case DECLINE_WITHDRAWAL_FAIL:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};
