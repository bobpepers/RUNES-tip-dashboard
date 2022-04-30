import axios from '../axios';
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_RESEND_FAILURE,
  VERIFY_EMAIL_ERROR,
  // SIGNIN_FAILURE,
  AUTH_USER,
  UNAUTH_USER,
  // EMAIL_NOT_VERIFIED,
  AUTH_USER_TFA,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

/**
 * Sign up
 */
export function signupUser(
  props,
  navigate,
) {
  const { captchaResponse } = props;

  return function (dispatch) {
    axios.post(`${window.myConfig.apiUrl}/signup`, { props, captchaResponse })
      .then(() => {
        dispatch({
          type: SIGNUP_SUCCESS,
        });
        dispatch(navigate(`/register/verify-register?email=${props.email}`));
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: SIGNUP_FAILURE,
          payload: error.reponse.data.console.error,
        });
      });
  }
}

/**
 * Sign in
 */

export function signinUser(props) {
  const {
    email,
    password,
    captchaResponse,
  } = props;

  /* Set a header including the token */
  return function (dispatch) {
    axios.post(`${window.myConfig.apiUrl}/signin`, {
      email,
      password,
      captchaResponse,
    }).then((response) => {
      dispatch({
        type: AUTH_USER,
        payload: response.data,
      });
      window.location.href = '/';
    })
      .catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
      });
  }
}

/**
 * Resend verification code
 */
export function resendVerification(props) {
  return function (dispatch) {
    axios.post(`${window.myConfig.apiUrl}/resend-verify-code`, props)
      .then(() => {
        dispatch({
          type: SIGNUP_SUCCESS,
        });
      }).catch((response) => dispatch(
        {
          type: SIGNUP_RESEND_FAILURE,
          payload: response.data,
        },
      ));
  }
}

/**
 * Verify email
 */
export function verifyEmail(props, navigate) {
  return function (dispatch) {
    axios.post(`${window.myConfig.apiUrl}/signup/verify-email`, props)
      .then((response) => {
        dispatch({
          type: AUTH_USER,
          payload: response,
        });
        navigate('/register/verified');
      })
      .catch((error) => {
        dispatch(
          {
            type: VERIFY_EMAIL_ERROR,
            payload: error.response.data.error,
          },
        );
      });
  }
}

/**
 * Sign out
 */
export function signoutUser() {
  return function (dispatch) {
    axios.get(`${window.myConfig.apiUrl}/logout`)
      .then(() => {
        dispatch({
          type: UNAUTH_USER,
        });
        window.location.href = '/';
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

/**
 * Check if user is authenticated
 */
export function authenticated() {
  return function (dispatch) {
    axios.get(`${window.myConfig.apiUrl}/authenticated`)
      .then((response) => {
        dispatch({
          type: AUTH_USER_TFA,
          payload: response.data.result,
        });
      })
      .catch((error) => {
        console.log('ERROR AUTHENTICATED');
        console.log(error);
      });
  }
}
