import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_RESEND_FAILURE,
  VERIFY_EMAIL_ERROR,
  SIGNIN_FAILURE,
  AUTH_USER,
  UNAUTH_USER,
  EMAIL_NOT_VERIFIED,
  AUTH_USER_TFA,
} from '../actions/types/index';

export default function (state = {
  // tfa: { locked: false },
  authenticated: false,
  doneLoading: false,
}, action) {
  switch (action.type) {
  case SIGNUP_SUCCESS:
    return {
      ...state,
      tfaLocked: false,
      signup: true,
      error: {},
    };
  case SIGNUP_FAILURE:
    return {
      ...state,
      tfaLocked: false,
      signup: false,
      error: {
        signup: action.payload,
      },
    };
  case SIGNUP_RESEND_FAILURE:
    return {
      ...state,
      tfaLocked: false,
      signup: true,
      error: {
        signupResend: action.payload,
      },
    };
  case VERIFY_EMAIL_ERROR:
    return {
      ...state,
      tfaLocked: false,
      signup: true,
      error: {
        verifyEmail: action.payload,
      },
    };
  case SIGNIN_FAILURE:
    return {
      ...state,
      tfaLocked: false,
      error: {
        signin: action.payload,
      },
    };
  case EMAIL_NOT_VERIFIED:
    return {
      ...state,
      tfaLocked: false,
      error: {
        reverifyEmail: action.payload,
      },
    };
  case AUTH_USER:
    return {
      ...state,
      tfaLocked: action.payload.tfaLocked,
      authenticated: true,
      doneLoading: true,
      error: {},
    };
  case AUTH_USER_TFA:
    return {
      ...state,
      authenticated: action.payload.success,
      doneLoading: true,
      error: {},
      tfaLocked: action.payload.tfaLocked,
    };
  case UNAUTH_USER:
    return {
      ...state,
      tfaLocked: false,
      authenticated: false,
      doneLoading: true,
      error: {},
    };
  default:
    return state;
  }
}
