import {
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  VERIFY_RESET_PASSWORD_SUCCESS,
  VERIFY_RESET_PASSWORD_FAILURE,
} from '../actions/types/index';

export default function (state = {}, action) {
  switch (action.type) {
  case RESET_PASSWORD_SUCCESS:
    return {
      ...state,
      resetPassword: action.payload.success,
      error: {},
    };
  case RESET_PASSWORD_FAILURE:
    return {
      ...state,
      resetPassword: false,
      error: {
        resetPassword: action.payload,
      },
    };
  case VERIFY_RESET_PASSWORD_SUCCESS:
    return {
      ...state,
      verifyResetPassword: action.payload.success,
      error: {},
      resetPassword: false,
    };
  case VERIFY_RESET_PASSWORD_FAILURE:
    return {
      ...state,
      verifyResetPassword: false,
      error: {
        verifyResetPassword: action.payload,
      },
    };
  default:
    return state;
  }
}
