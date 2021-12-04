import {
  FETCH_FEATURES_BEGIN,
  FETCH_FEATURES_SUCCESS,
  FETCH_FEATUERS_FAIL,
  UPDATE_FEATURE,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FEATURE:
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
    case FETCH_FEATURES_BEGIN:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case FETCH_FEATURES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isFetching: false,
      };
    case FETCH_FEATUERS_FAIL:
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