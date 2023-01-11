import {
  FETCH_TRIVIACATEGORIES_BEGIN,
  FETCH_TRIVIACATEGORIES_SUCCESS,
  FETCH_TRIVIACATEGORIES_FAIL,
  DELETE_TRIVIACATEGORY,
  ADD_TRIVIACATEGORY,
  UPDATE_TRIVIACATEGORY,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case UPDATE_TRIVIACATEGORY:
    return {
      ...state,
      data: state.data.map((category) => {
        if (category.id === action.payload.id) {
          return action.payload;
        }
        return category;
      }),
      isFetching: false,
    };
  case ADD_TRIVIACATEGORY:
    return {
      ...state,
      data: [
        {
          ...action.payload,
        },
        ...state.data,
      ],
      isFetching: false,
    };

  case DELETE_TRIVIACATEGORY:
    return {
      ...state,
      data: state.data.filter((item) => item.id !== action.payload),
      isFetching: false,
    };
  case FETCH_TRIVIACATEGORIES_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case FETCH_TRIVIACATEGORIES_SUCCESS:
    return {
      ...state,
      data: action.payload.result,
      count: action.payload.count,
      isFetching: false,
    };
  case FETCH_TRIVIACATEGORIES_FAIL:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};
