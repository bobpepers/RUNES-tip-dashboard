import {
  FETCH_BOTSETTINGS_BEGIN,
  FETCH_BOTSETTINGS_SUCCESS,
  FETCH_BOTSETTINGS_FAIL,
  UPDATE_BOTSETTINGS,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case UPDATE_BOTSETTINGS:
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
  case FETCH_BOTSETTINGS_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case FETCH_BOTSETTINGS_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isFetching: false,
    };
  case FETCH_BOTSETTINGS_FAIL:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};
