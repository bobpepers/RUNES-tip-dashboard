import axios from '../axios';
import {
  FETCH_WITHDRAWALS_BEGIN,
  FETCH_WITHDRAWALS_SUCCESS,
  FETCH_WITHDRAWALS_FAIL,
  DECLINE_WITHDRAWAL_BEGIN,
  DECLINE_WITHDRAWAL_SUCCESS,
  DECLINE_WITHDRAWAL_FAIL,
  ACCEPT_WITHDRAWAL_FAIL,
  ACCEPT_WITHDRAWAL_SUCCESS,
  ACCEPT_WITHDRAWAL_BEGIN,
  UPDATE_WITHDRAWAL,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

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
        notistackErrorAdd(
          dispatch,
          error,
        );
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
        notistackErrorAdd(
          dispatch,
          error,
        );
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
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: FETCH_WITHDRAWALS_FAIL,
          payload: error,
        });
      });
  }
}
