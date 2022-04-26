import {
  FETCH_TRIVIA_BEGIN,
  FETCH_TRIVIA_SUCCESS,
  FETCH_TRIVIA_FAIL,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_TRIVIA_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case FETCH_TRIVIA_SUCCESS:
    return {
      ...state,
      data: action.payload.trivia,
      isFetching: false,
    };
  case FETCH_TRIVIA_FAIL:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};
