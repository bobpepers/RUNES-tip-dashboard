import {
  FETCH_USER_BEGIN,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
  CHANGE_USER_TFA_STATE,
} from '../actions/types/index';

const initialState = {
  data: {
    user: {
      webslots: [],
      wallet: {
        available: 0,
        locker: 0,
      },
    },
  },
  loading: false,
  error: null,
};

export default function userReducer(
  state = initialState,
  action,
) {
  switch (action.type) {
  case FETCH_USER_BEGIN:
    return {
      ...state,
      loading: true,
      error: null,
    };

  case FETCH_USER_SUCCESS:
    return {
      ...state,
      loading: false,
      data: action.payload,
    };

  case FETCH_USER_FAIL:
    return {
      ...state,
      loading: false,
      error: action.payload.error,
      data: null,
    };

  case CHANGE_USER_TFA_STATE:
    return {
      ...state,
      data: {
        ...state.data,
        tfa: action.payload.tfa,
      },
      loading: false,
      error: null,
    };

  default:
    return state;
  }
}
