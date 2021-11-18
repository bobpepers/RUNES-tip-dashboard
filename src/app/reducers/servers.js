import {
    FETCH_SERVERS_BEGIN,
    FETCH_SERVERS_SUCCESS,
    FETCH_SERVERS_FAIL,
} from '../actions/types/index';

const initialState = {
    isFetching: false, // Default to fetching..
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SERVERS_BEGIN:
            return {
                ...state,
                isFetching: true,
                error: null,
            };
        case FETCH_SERVERS_SUCCESS:
            return {
                ...state,
                data: action.payload,
                isFetching: false,
            };
        case FETCH_SERVERS_FAIL:
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