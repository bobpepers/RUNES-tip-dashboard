import {
  FETCH_TRIVIAQUESTIONS_BEGIN,
  FETCH_TRIVIAQUESTIONS_SUCCESS,
  FETCH_TRIVIAQUESTIONS_FAIL,
  DELETE_TRIVIAQUESTION,
  ADD_TRIVIAQUESTION,
} from '../actions/types/index';

const initialState = {
    isFetching: false, // Default to fetching..
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
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
                data: action.payload,
                isFetching: false,
            };
        case FETCH_TRIVIAQUESTIONS_FAIL:
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