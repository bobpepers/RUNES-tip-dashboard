import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import history from '../history';
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
  ENQUEUE_SNACKBAR,
} from './types/index';

/**
 * Error helper
 */
export function authError(CONST, error) {
  return {
    type: CONST,
    payload: error,
  };
}

/**
 * Sign up
 */
export function signupUser(props, navigate) {
  const { captchaResponse } = props;

  return function (dispatch) {
    axios.post(`${window.myConfig.apiUrl}/signup`, { props, captchaResponse })
      .then(() => {
        dispatch({ type: SIGNUP_SUCCESS });
        dispatch(navigate(`/register/verify-register?email=${props.email}`));
      })
      .catch((error) => {
        if (error.response) {
          // client received an error response (5xx, 4xx)
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: `${error.response.status}: ${error.response.data.error}`,
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else if (error.request) {
          // client never received a response, or request never left
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Connection Timeout',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else {
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Unknown Error',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        }
        dispatch(authError(SIGNUP_FAILURE, error.reponse.data.error));
      });
  }
}

/**
 * Sign in
 */

export function signinUser(props) {
  const { email, password, captchaResponse } = props;

  /* Set a header including the token */
  return function (dispatch) {
    axios.post(
      `${window.myConfig.apiUrl}/signin`,
      { email, password, captchaResponse },
    )
      .then((response) => {
        console.log(response);
        console.log('response');

        dispatch({
          type: AUTH_USER,
          payload: response,
        });
        window.location.href = '/';
        // history.push('/dashboard');
      })
      .catch((error) => {
        if (error.response) {
          // client received an error response (5xx, 4xx)
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: `${error.response.status}: ${error.response.data.error}`,
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else if (error.request) {
          // client never received a response, or request never left
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Connection Timeout',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else {
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Unknown Error',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        }
        console.log('some err');
        console.log(error);
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
        dispatch({ type: SIGNUP_SUCCESS });
      })
      .catch((response) => dispatch(authError(SIGNUP_RESEND_FAILURE, response.data)));
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
        dispatch(authError(VERIFY_EMAIL_ERROR, error.response.data.error));
      });
  }
}

/**
 * Sign out
 */
export function signoutUser() {
  return function (dispatch) {
    console.log('signout user');
    axios.get(`${window.myConfig.apiUrl}/logout`)
      .then((response) => {
        dispatch({ type: UNAUTH_USER });
        // history.push('/');
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
        // if (response.data.success === true) {
        console.log('AUTHENTICATION PASSED');
        dispatch({
          type: AUTH_USER_TFA,
          payload: response,
        });
        // }
        // history.push('/');
      })
      .catch((error) => {
        console.log('ERROR AUTHENTICATED');
        console.log(error);
      });
  }
}
