import {
  FETCH_ACTIVITY_BEGIN,
  FETCH_ACTIVITY_SUCCESS,
  FETCH_ACTIVITY_FAIL,
  INSERT_ACTIVITY,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_ACTIVITY_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case FETCH_ACTIVITY_SUCCESS:
    return {
      ...state,
      data: action.payload.result,
      count: action.payload.count,
      isFetching: false,
    };
  case FETCH_ACTIVITY_FAIL:
    console.log('Error: ', action.error);
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  case INSERT_ACTIVITY:
    return {
      ...state,
      data: [
        ...action.payload,
        ...state.data,
      ],
      isFetching: false,
    };
  default:
    return state;
  }
};
