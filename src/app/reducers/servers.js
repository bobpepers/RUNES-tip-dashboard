import {
  FETCH_SERVERS_BEGIN,
  FETCH_SERVERS_SUCCESS,
  FETCH_SERVERS_FAIL,
  UPDATE_SERVER,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case UPDATE_SERVER:
    return {
      ...state,
      data: state.data.map(
        (server) => (server.id === action.payload.id
          ? { ...action.payload }
          : server),
      ),
      isFetching: false,
      error: null,
    };
  case FETCH_SERVERS_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case FETCH_SERVERS_SUCCESS:
    return {
      ...state,
      data: action.payload.result,
      count: action.payload.count,
      isFetching: false,
    };
  case FETCH_SERVERS_FAIL:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};
