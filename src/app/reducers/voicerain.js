import {
  FETCH_VOICERAIN_BEGIN,
  FETCH_VOICERAIN_SUCCESS,
  FETCH_VOICERAIN_FAIL,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_VOICERAIN_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case FETCH_VOICERAIN_SUCCESS:
    return {
      ...state,
      data: action.payload.voicerain,
      isFetching: false,
    };
  case FETCH_VOICERAIN_FAIL:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};
