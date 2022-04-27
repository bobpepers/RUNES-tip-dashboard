import {
  FETCH_PRICECURRENCIES_BEGIN,
  FETCH_PRICECURRENCIES_SUCCESS,
  FETCH_PRICECURRENCIES_FAIL,
  UPDATE_PRICECURRENCIES,
  REMOVE_PRICECURRENCIES,
  ADD_PRICECURRENCIES,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case ADD_PRICECURRENCIES:
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
  case REMOVE_PRICECURRENCIES:
    return {
      ...state,
      data: state.data.filter((item) => item.id !== action.payload.id),
      isFetching: false,
    };
  case UPDATE_PRICECURRENCIES:
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
  case FETCH_PRICECURRENCIES_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case FETCH_PRICECURRENCIES_SUCCESS:
    return {
      ...state,
      data: action.payload.result,
      isFetching: false,
    };
  case FETCH_PRICECURRENCIES_FAIL:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};
