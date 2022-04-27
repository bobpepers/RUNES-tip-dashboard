import {
  FETCH_CHANNELS_BEGIN,
  FETCH_CHANNELS_SUCCESS,
  FETCH_CHANNELS_FAIL,
  UPDATE_CHANNEL,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case UPDATE_CHANNEL:
    return {
      ...state,
      data: state.data.map(
        (channel) => (channel.id === action.payload.id
          ? { ...action.payload }
          : channel),
      ),
      isFetching: false,
      error: null,
    };
  case FETCH_CHANNELS_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case FETCH_CHANNELS_SUCCESS:
    return {
      ...state,
      data: action.payload.result,
      count: action.payload.count,
      isFetching: false,
    };
  case FETCH_CHANNELS_FAIL:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};
