import {
  FETCH_VOICERAINS_BEGIN,
  FETCH_VOICERAINS_SUCCESS,
  FETCH_VOICERAINS_FAIL,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_VOICERAINS_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case FETCH_VOICERAINS_SUCCESS:
    return {
      ...state,
      data: action.payload.voicerains,
      count: action.payload.count,
      isFetching: false,
    };
  case FETCH_VOICERAINS_FAIL:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};
