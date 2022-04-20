import axios from '../axios';
import {
  PATCH_DEPOSITS_BEGIN,
  PATCH_DEPOSITS_SUCCESS,
  PATCH_DEPOSITS_FAIL,
  ENQUEUE_SNACKBAR,
} from './types/index';

export function patchDepositsAction() {
  return function (dispatch) {
    dispatch({
      type: PATCH_DEPOSITS_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/deposits/patch`)
      .then((response) => {
        dispatch({
          type: PATCH_DEPOSITS_SUCCESS,
          payload: response.data.deposits,
        });
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
          type: PATCH_DEPOSITS_FAIL,
          payload: error,
        });
      });
  }
}
