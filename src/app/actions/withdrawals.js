import axios from 'axios';
import {
  FETCH_WITHDRAWALS_BEGIN,
  FETCH_WITHDRAWALS_SUCCESS,
  FETCH_WITHDRAWALS_FAIL,
  ENQUEUE_SNACKBAR,
  DECLINE_WITHDRAWAL_BEGIN,
  DECLINE_WITHDRAWAL_SUCCESS,
  DECLINE_WITHDRAWAL_FAIL,
  ACCEPT_WITHDRAWAL_FAIL,
  ACCEPT_WITHDRAWAL_SUCCESS,
  ACCEPT_WITHDRAWAL_BEGIN,
  UPDATE_WITHDRAWAL,
} from './types/index';

export function acceptWithdrawalAction(id) {
  return function (dispatch) {
    dispatch({
      type: ACCEPT_WITHDRAWAL_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/withdrawal/accept`, {
      id,
    })
      .then((response) => {
        console.log('SUCESSSSS');
        console.log(response);
        dispatch({
          type: ACCEPT_WITHDRAWAL_SUCCESS,
          payload: response.data.withdrawal,
        });
        dispatch({
          type: UPDATE_WITHDRAWAL,
          payload: response.data.withdrawal,
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
          type: ACCEPT_WITHDRAWAL_FAIL,
          payload: error,
        });
      });
  }
}

export function declineWithdrawalAction(id) {
  return function (dispatch) {
    dispatch({
      type: DECLINE_WITHDRAWAL_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/withdrawal/decline`, {
      id,
    })
      .then((response) => {
        console.log('SUCESSSSS');
        console.log(response);
        dispatch({
          type: DECLINE_WITHDRAWAL_SUCCESS,
          payload: response.data.withdrawal,
        });
        dispatch({
          type: UPDATE_WITHDRAWAL,
          payload: response.data.withdrawal,
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
          type: DECLINE_WITHDRAWAL_FAIL,
          payload: error,
        });
      });
  }
}

export function fetchWithdrawalsAction(
  id,
  txId,
  userId,
  username,
  to,
  offset,
  limit,
) {
  return function (dispatch) {
    dispatch({
      type: FETCH_WITHDRAWALS_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/withdrawals`, {
      id,
      txId,
      userId,
      username,
      to,
      offset,
      limit,
    })
      .then((response) => {
        dispatch({
          type: FETCH_WITHDRAWALS_SUCCESS,
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
          type: FETCH_WITHDRAWALS_FAIL,
          payload: error,
        });
      });
  }
}
