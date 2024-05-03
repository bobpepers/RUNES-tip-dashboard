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
  return function (dispatch, getState) {
    const { currentProject } = getState().selectedProject;
    dispatch({
      type: ACCEPT_WITHDRAWAL_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/functions/withdrawal/accept`, {
      id,
      project: currentProject,
    }).then((response) => {
      dispatch({
        type: ACCEPT_WITHDRAWAL_SUCCESS,
        payload: response.data.result,
      });
      dispatch({
        type: UPDATE_WITHDRAWAL,
        payload: response.data.result,
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
  return function (dispatch, getState) {
    const { currentProject } = getState().selectedProject;
    dispatch({
      type: DECLINE_WITHDRAWAL_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/functions/withdrawal/decline`, {
      id,
      project: currentProject,
    }).then((response) => {
      dispatch({
        type: DECLINE_WITHDRAWAL_SUCCESS,
        payload: response.data.result,
      });
      dispatch({
        type: UPDATE_WITHDRAWAL,
        payload: response.data.result,
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
  return function (dispatch, getState) {
    const { currentProject } = getState().selectedProject;
    dispatch({
      type: FETCH_WITHDRAWALS_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/functions/withdrawals`, {
      id,
      txId,
      userId,
      username,
      to,
      offset,
      limit,
      project: currentProject,
    }).then((response) => {
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
