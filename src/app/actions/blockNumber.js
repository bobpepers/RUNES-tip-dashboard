import axios from '../axios';
import {
  FETCH_BLOCKNUMBER_BEGIN,
  FETCH_BLOCKNUMBER_SUCCESS,
  FETCH_BLOCKNUMBER_FAIL,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function fetchBlockNumberAction() {
  return function (dispatch) {
    dispatch({
      type: FETCH_BLOCKNUMBER_BEGIN,
    });
    axios.get(`${window.myConfig.apiUrl}/blocknumber`)
      .then((response) => {
        dispatch({
          type: FETCH_BLOCKNUMBER_SUCCESS,
          payload: response.data.result,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: FETCH_BLOCKNUMBER_FAIL,
          payload: error,
        });
      });
  }
}
