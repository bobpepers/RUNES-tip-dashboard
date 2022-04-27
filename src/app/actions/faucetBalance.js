import axios from '../axios';
import {
  FETCH_FAUCET_BALANCE_BEGIN,
  FETCH_FAUCET_BALANCE_SUCCESS,
  FETCH_FAUCET_BALANCE_FAIL,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function fetchFaucetBalanceAction() {
  return function (dispatch) {
    dispatch({
      type: FETCH_FAUCET_BALANCE_BEGIN,
    });
    axios.get(`${window.myConfig.apiUrl}/faucet/balance`)
      .then((response) => {
        dispatch({
          type: FETCH_FAUCET_BALANCE_SUCCESS,
          payload: response.data,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: FETCH_FAUCET_BALANCE_FAIL,
          payload: error,
        });
      });
  }
}
