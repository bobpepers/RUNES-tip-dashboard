import {
  COLLECT_EARNINGS_BEGIN,
  COLLECT_EARNINGS_SUCCESS,
  COLLECT_EARNINGS_FAIL,
} from '../actions/types/index';

const initialState = {
  isLoading: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case COLLECT_EARNINGS_BEGIN:
    return {
      ...state,
      isLoading: true,
      error: null,
    };
  case COLLECT_EARNINGS_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };
  case COLLECT_EARNINGS_FAIL:
    return {
      ...state,
      error: action.error,
      isLoading: false,
    };
  default:
    return state;
  }
};
