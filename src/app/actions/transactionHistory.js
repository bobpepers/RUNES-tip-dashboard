import axios from '../axios';
import {
  FETCH_TRANSACTION_HISTORY_BEGIN,
  FETCH_TRANSACTION_HISTORY_SUCCESS,
  FETCH_TRANSACTION_HISTORY_FAIL,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function fetchTransactionHistoryAction(
  coinId,
  offset,
  limit,
) {
  return function (dispatch, getState) {
    const { currentProject } = getState().selectedProject;
    dispatch({
      type: FETCH_TRANSACTION_HISTORY_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/management/transaction/history`, {
      coinId,
      offset,
      limit,
      project: currentProject,
    }).then((response) => {
      dispatch({
        type: FETCH_TRANSACTION_HISTORY_SUCCESS,
        payload: response.data,
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
      dispatch({
        type: FETCH_TRANSACTION_HISTORY_FAIL,
        payload: error,
      });
    });
  }
}
