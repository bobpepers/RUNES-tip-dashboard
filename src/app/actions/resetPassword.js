import axios from 'axios';
// import history from '../history';
import {
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  VERIFY_RESET_PASSWORD_SUCCESS,
  VERIFY_RESET_PASSWORD_FAILURE,
  // AUTH_USER,
  ENQUEUE_SNACKBAR,
} from './types/index';

/**
 * Reset password
 */
export function resetPassword(
  props,
  navigate,
) {
  // const { captchaResponse } = props;
  return function (dispatch) {
    axios.post(`${window.myConfig.apiUrl}/reset-password`, props)
      .then(() => {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
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
      .then(() => {
        dispatch({ type: VERIFY_RESET_PASSWORD_SUCCESS });
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
        if (error.response) {
          // client received an error response (5xx, 4xx)
          console.log(error.response);
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: `${error.response.status}: ${error.response.data.error.message}`,
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
        if (error.response) {
          // client received an error response (5xx, 4xx)
          console.log(error.response);
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: `${error.response.status}: ${error.response.data.error.message}`,
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
        dispatch({
          type: VERIFY_RESET_PASSWORD_FAILURE,
          payload: error.response.data.error,
        });
      });
  }
}
