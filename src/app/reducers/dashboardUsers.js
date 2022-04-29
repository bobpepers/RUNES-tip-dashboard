import {
  FETCH_DASHBOARDUSERS_BEGIN,
  FETCH_DASHBOARDUSERS_SUCCESS,
  FETCH_DASHBOARDUSERS_FAIL,
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
  case FETCH_DASHBOARDUSERS_BEGIN:
    return {
      ...state,
      isFetching: true,
      data: null,
      count: 0,
      error: null,
    };
  case FETCH_DASHBOARDUSERS_SUCCESS:
    return {
      ...state,
      data: action.payload.result,
      count: action.payload.count,
      isFetching: false,
    };
  case FETCH_DASHBOARDUSERS_FAIL:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};
