import axios from '../axios';
import {
  FETCH_BALANCE_BEGIN,
  FETCH_BALANCE_SUCCESS,
  FETCH_BALANCE_FAIL,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function fetchBalanceAction() {
  return function (dispatch) {
    dispatch({
      type: FETCH_BALANCE_BEGIN,
    });
    axios.get(`${window.myConfig.apiUrl}/balance`)
      .then((response) => {
        dispatch({
          type: FETCH_BALANCE_SUCCESS,
          payload: response.data.result,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: FETCH_BALANCE_FAIL,
          payload: error,
        });
      });
  }
}
