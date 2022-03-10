import {
  FETCH_WITHDRAWALS_BEGIN,
  FETCH_WITHDRAWALS_SUCCESS,
  FETCH_WITHDRAWALS_FAIL,
  UPDATE_WITHDRAWAL,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case UPDATE_WITHDRAWAL:
    return {
      ...state,
      data: state.data.map(
        (withdrawal) => (withdrawal.id === action.payload.id
          ? { ...action.payload }
          : withdrawal),
      ),
      isFetching: false,
      error: null,
    };
  case FETCH_WITHDRAWALS_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case FETCH_WITHDRAWALS_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isFetching: false,
    };
  case FETCH_WITHDRAWALS_FAIL:
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
