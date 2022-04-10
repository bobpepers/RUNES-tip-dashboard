import axios from 'axios';
import {
  FETCH_DEPOSITS_BEGIN,
  FETCH_DEPOSITS_SUCCESS,
  FETCH_DEPOSITS_FAIL,
  ENQUEUE_SNACKBAR,
} from './types/index';

export function fetchDepositsAction(
  id,
  txId,
  userId,
  username,
  from,
  offset,
  limit,
) {
  return function (dispatch) {
    dispatch({
      type: FETCH_DEPOSITS_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/deposits`, {
      id,
      txId,
      userId,
      username,
      from,
      offset,
      limit,
    })
      .then((response) => {
        dispatch({
          type: FETCH_DEPOSITS_SUCCESS,
          payload: response.data,
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
          type: FETCH_DEPOSITS_FAIL,
          payload: error,
        });
      });
  }
}
