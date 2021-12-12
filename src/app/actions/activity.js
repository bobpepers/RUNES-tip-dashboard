import axios from 'axios';
import {
  FETCH_ACTIVITY_BEGIN,
  FETCH_ACTIVITY_SUCCESS,
  FETCH_ACTIVITY_FAIL,
  ENQUEUE_SNACKBAR,
} from './types/index';

export function fetchActivityAction(id, spender, earner, type, amount) {
  return function (dispatch) {
    dispatch({
      type: FETCH_ACTIVITY_BEGIN,
    });
    axios.post(`${window.config.apiUrl}/activity`, {
      id, spender, earner, type, amount,
    })
      .then((response) => {
        console.log('SUCESSSSS');
        console.log(response);
        dispatch({
          type: FETCH_ACTIVITY_SUCCESS,
          payload: response.data.activity,
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
          type: FETCH_ACTIVITY_FAIL,
          payload: error,
        });
      });
  }
}
