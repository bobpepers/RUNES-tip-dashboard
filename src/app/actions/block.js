import axios from 'axios';
import {
  POST_BLOCK_BEGIN,
  POST_BLOCK_SUCCESS,
  POST_BLOCK_FAIL,
  ADD_BLOCK,
  DELETE_BLOCK,
  ENQUEUE_SNACKBAR,
} from './types/index';

export function blockAction(username) {
  return function (dispatch) {
    return new Promise((resolve) => {
      dispatch({
        type: POST_BLOCK_BEGIN,
      });
      axios.post(`${process.env.API_URL}/block`, { username })
        .then((response) => {
          if (response.data.removed) {
            dispatch({
              type: DELETE_BLOCK,
              payload: response.data.removed,
            });
            dispatch({
              type: ENQUEUE_SNACKBAR,
              notification: {
                message: 'Success: Unblock',
                key: new Date().getTime() + Math.random(),
                options: {
                  variant: 'success',
                },
              },
            });
          }
          if (response.data.blocked) {
            dispatch({
              type: ADD_BLOCK,
              payload: response.data.blocked,
            });
            dispatch({
              type: ENQUEUE_SNACKBAR,
              notification: {
                message: 'Success: Block',
                key: new Date().getTime() + Math.random(),
                options: {
                  variant: 'success',
                },
              },
            });
          }
          dispatch({
            type: POST_BLOCK_SUCCESS,
            payload: response.data,
          });
          resolve();
        })
        .catch((error) => {
          console.log(error);
          dispatch({
            type: POST_BLOCK_FAIL,
            payload: error,
          });
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
          resolve();
        });
    });
  }
}
