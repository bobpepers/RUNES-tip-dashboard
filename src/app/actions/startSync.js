import axios from '../axios';
import {
  START_SYNCBLOCKS_BEGIN,
  START_SYNCBLOCKS_SUCCESS,
  START_SYNCBLOCKS_FAIL,
  ENQUEUE_SNACKBAR,
} from './types/index';

export function startSyncAction() {
  return function (dispatch) {
    dispatch({
      type: START_SYNCBLOCKS_BEGIN,
    });
    axios.get(`${window.myConfig.apiUrl}/sync/blocks`)
      .then((response) => {
        dispatch({
          type: START_SYNCBLOCKS_SUCCESS,
          payload: response.data.sync,
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
          type: START_SYNCBLOCKS_FAIL,
          payload: error,
        });
      });
  }
}
