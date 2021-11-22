import {
  FETCH_CHANNELS_BEGIN,
  FETCH_CHANNELS_SUCCESS,
  FETCH_CHANNELS_FAIL,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHANNELS_BEGIN:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case FETCH_CHANNELS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isFetching: false,
      };
    case FETCH_CHANNELS_FAIL:
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