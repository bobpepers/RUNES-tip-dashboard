import {
  FETCH_USERS_BEGIN,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAIL,
  UPDATE_USER,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case UPDATE_USER:
    return {
      ...state,
      data: state.data.map(
        (user) => (user.id === action.payload.id
          ? { ...action.payload }
          : user),
      ),
      isFetching: false,
      error: null,
    };
  case FETCH_USERS_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case FETCH_USERS_SUCCESS:
    return {
      ...state,
      data: action.payload.result,
      count: action.payload.count,
      isFetching: false,
    };
  case FETCH_USERS_FAIL:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};
