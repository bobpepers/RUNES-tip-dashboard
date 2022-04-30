import axios from '../axios';
import {
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  VERIFY_RESET_PASSWORD_SUCCESS,
  VERIFY_RESET_PASSWORD_FAILURE,
  // AUTH_USER,
  ENQUEUE_SNACKBAR,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

/**
 * Reset password
 */
export function resetPassword(
  props,
  navigate,
) {
  return function (dispatch) {
    console.log(props);
    axios.post(`${window.myConfig.apiUrl}/reset-password`, props)
      .then((response) => {
        console.log(response);
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
          payload: response.data.result,
        });
        dispatch({
          type: ENQUEUE_SNACKBAR,
          notification: {
            message: 'Success: reset password email sent',
            key: new Date().getTime() + Math.random(),
            options: {
              variant: 'success',
            },
          },
        });
        navigate(`/reset-password/verify?email=${props.email}`);
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: RESET_PASSWORD_FAILURE,
          payload: error.response.data.error,
        });
      });
  }
}

/**
 * Verify Reset password
 */
export function verifyResetPassword(props) {
  return function (dispatch) {
    axios.post(`${window.myConfig.apiUrl}/reset-password/verify`, props)
      .then((response) => {
        dispatch({
          type: VERIFY_RESET_PASSWORD_SUCCESS,
          payload: response.data.result,
        });
        dispatch({
          type: ENQUEUE_SNACKBAR,
          notification: {
            message: 'Success: token is valid',
            key: new Date().getTime() + Math.random(),
            options: {
              variant: 'success',
            },
          },
        });
      })
      .catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: VERIFY_RESET_PASSWORD_FAILURE,
          payload: error.response.data.error,
        });
      });
  }
}

/**
 * Reset password new
 */
export function resetPasswordNew(
  props,
  navigate,
) {
  return function (dispatch) {
    axios.post(`${window.myConfig.apiUrl}/reset-password/new`, props)
      .then((response) => {
        console.log(response.data);
        // dispatch({ type: AUTH_USER });
        dispatch({
          type: ENQUEUE_SNACKBAR,
          notification: {
            message: 'Success: Password has been reset.',
            key: new Date().getTime() + Math.random(),
            options: {
              variant: 'success',
            },
          },
        });
        navigate('/login');
      })
      .catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: VERIFY_RESET_PASSWORD_FAILURE,
          payload: error.response.data.error,
        });
      });
  }
}
