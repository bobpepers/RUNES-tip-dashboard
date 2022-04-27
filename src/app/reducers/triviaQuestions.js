import {
  FETCH_TRIVIAQUESTIONS_BEGIN,
  FETCH_TRIVIAQUESTIONS_SUCCESS,
  FETCH_TRIVIAQUESTIONS_FAIL,
  DELETE_TRIVIAQUESTION,
  ADD_TRIVIAQUESTION,
  UPDATE_TRIVIAQUESTION,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case UPDATE_TRIVIAQUESTION:
    console.log(action.payload);
    const updatedChangeData = Object.values(
      []
        .concat(state.data, action.payload)
        .reduce(
          (r, c) => ((r[c.id] = Object.assign(r[c.id] || {}, c)), r),
          {},
        ),
    );
    const reverseUpdatedArray = updatedChangeData.reverse();
    return {
      ...state,
      data: reverseUpdatedArray,
      isFetching: false,
    };
  case ADD_TRIVIAQUESTION:
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

  case DELETE_TRIVIAQUESTION:
    return {
      ...state,
      data: state.data.filter((item) => item.id !== action.payload),
      isFetching: false,
    };
  case FETCH_TRIVIAQUESTIONS_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case FETCH_TRIVIAQUESTIONS_SUCCESS:
    return {
      ...state,
      data: action.payload.result,
      count: action.payload.count,
      isFetching: false,
    };
  case FETCH_TRIVIAQUESTIONS_FAIL:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};
