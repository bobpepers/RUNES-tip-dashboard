import {
  INSERT_TRIVIA_BEGIN,
  INSERT_TRIVIA_SUCCESS,
  INSERT_TRIVIA_FAIL,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case INSERT_TRIVIA_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case INSERT_TRIVIA_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isFetching: false,
    };
  case INSERT_TRIVIA_FAIL:
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
