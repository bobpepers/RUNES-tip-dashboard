import axios from '../axios';
import {
  FETCH_DEPOSITS_BEGIN,
  FETCH_DEPOSITS_SUCCESS,
  FETCH_DEPOSITS_FAIL,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

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
    axios.post(`${window.myConfig.apiUrl}/functions/deposits`, {
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
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: FETCH_DEPOSITS_FAIL,
          payload: error,
        });
      });
  }
}
