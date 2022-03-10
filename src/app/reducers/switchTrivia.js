import {
  SWITCH_TRIVIA_BEGIN,
  SWITCH_TRIVIA_SUCCESS,
  SWITCH_TRIVIA_FAIL,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case SWITCH_TRIVIA_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case SWITCH_TRIVIA_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isFetching: false,
    };
  case SWITCH_TRIVIA_FAIL:
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
