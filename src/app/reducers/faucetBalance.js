import {
  FETCH_FAUCET_BALANCE_BEGIN,
  FETCH_FAUCET_BALANCE_SUCCESS,
  FETCH_FAUCET_BALANCE_FAIL,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_FAUCET_BALANCE_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case FETCH_FAUCET_BALANCE_SUCCESS:
    return {
      ...state,
      data: action.payload.result,
      isFetching: false,
    };
  case FETCH_FAUCET_BALANCE_FAIL:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};
