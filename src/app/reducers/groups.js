import {
  FETCH_GROUPS_BEGIN,
  FETCH_GROUPS_SUCCESS,
  FETCH_GROUPS_FAIL,
  UPDATE_GROUP,
  POST_LEAVE_GROUP,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case UPDATE_GROUP:
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
  case POST_LEAVE_GROUP:
    return {
      ...state,
      data: state.data.map(
        (group) => (group.id === action.payload.id
          ? {
            ...group,
            isBotInGroup: false,
          }
          : group),
      ),
      isFetching: false,
      error: null,
    };
  case FETCH_GROUPS_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case FETCH_GROUPS_SUCCESS:
    return {
      ...state,
      data: action.payload.result,
      count: action.payload.count,
      isFetching: false,
    };
  case FETCH_GROUPS_FAIL:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};
