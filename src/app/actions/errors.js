import axios from '../axios';
import {
  FETCH_ERRORS_BEGIN,
  FETCH_ERRORS_SUCCESS,
  FETCH_ERRORS_FAIL,
  ENQUEUE_SNACKBAR,
} from './types/index';

export function fetchErrorsAction() {
  return function (dispatch) {
    dispatch({
      type: FETCH_ERRORS_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/errors`)
      .then((response) => {
        dispatch({
          type: FETCH_ERRORS_SUCCESS,
          payload: response.data.errors,
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
          type: FETCH_ERRORS_FAIL,
          payload: error,
        });
      });
  }
}
