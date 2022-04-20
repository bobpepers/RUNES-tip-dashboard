import axios from '../axios';
import {
  ENABLE_2FA_IDLE,
  ENABLE_2FA_BEGIN,
  ENABLE_2FA_SUCCESS,
  ENABLE_2FA_FAIL,
  DISABLE_2FA_IDLE,
  DISABLE_2FA_BEGIN,
  DISABLE_2FA_SUCCESS,
  DISABLE_2FA_FAIL,
  CHANGE_USER_TFA_STATE,
  AUTH_USER_TFA,
  ENQUEUE_SNACKBAR,
} from './types/index';

export function idleDisabletfa() {
  return function (dispatch) {
    dispatch({
      type: DISABLE_2FA_IDLE,
      payload: {
        data: 0,
        isFetching: false,
        phase: 0,
        error: null,
      },
    });
  }
}

export function idleEnabletfa() {
  return function (dispatch) {
    dispatch({
      type: ENABLE_2FA_IDLE,
      payload: {
        data: 0,
        isFetching: false,
        phase: 0,
        error: null,
      },
    });
  }
}

export function enabletfa(obj) {
  return function (dispatch) {
    dispatch({
      type: ENABLE_2FA_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/2fa/enable`, obj)
      .then((response) => {
        dispatch({
          type: ENABLE_2FA_SUCCESS,
          payload: response.data,
        });
        dispatch({
          type: CHANGE_USER_TFA_STATE,
          payload: response.data,
        });
      }).catch((error) => {
        if (error.response) {
          // client received an error response (5xx, 4xx)
          console.log(error.response);
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
          type: ENABLE_2FA_FAIL,
          payload: error,
        });
      });
  }
}

export function disabletfa(obj) {
  return function (dispatch) {
    dispatch({
      type: DISABLE_2FA_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/2fa/disable`, obj)
      .then((response) => {
        console.log('actions/disable tfa action Success');
        console.log(response);
        dispatch({
          type: DISABLE_2FA_SUCCESS,
          payload: response.data,
        });
        dispatch({
          type: CHANGE_USER_TFA_STATE,
          payload: response.data,
        });
      }).catch((error) => {
        if (error.response) {
          // client received an error response (5xx, 4xx)
          console.log(error.response);
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
          type: DISABLE_2FA_FAIL,
          payload: error,
        });
      });
  }
}

/**
 * Unlock 2FA
 */

export function unlocktfa(
  props,
  navigate,
) {
  const { tfa } = props;
  return function (dispatch) {
    axios.post(
      `${window.myConfig.apiUrl}/2fa/unlock`,
      { tfa },
    )
      .then((response) => {
        dispatch({
          type: AUTH_USER_TFA,
          payload: response,
        });
        navigate('/');
        // window.location.href = '/';
      }).catch((error) => {
        if (error.response) {
          // client received an error response (5xx, 4xx)
          console.log(error.response);
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
        console.log(error);
      });
  }
}
