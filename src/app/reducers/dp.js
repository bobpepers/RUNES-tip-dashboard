import {
  FETCH_DP_BEGIN,
  FETCH_DP_SUCCESS,
  FETCH_DP_FAIL,
} from '../actions/types/index';

const initialState = {
  isLoading: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_DP_BEGIN:
    return {
      ...state,
      isLoading: true,
      error: null,
    };
  case FETCH_DP_SUCCESS:
    return {
      ...state,
      data: action.payload.result,
      isLoading: false,
    };
  case FETCH_DP_FAIL:
    return {
      ...state,
      error: action.error,
      isLoading: false,
    };
  default:
    return state;
  }
};
