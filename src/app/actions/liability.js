import axios from '../axios';
import {
  FETCH_LIABILITY_BEGIN,
  FETCH_LIABILITY_SUCCESS,
  FETCH_LIABILITY_FAIL,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function fetchLiabilityAction() {
  return function (dispatch) {
    dispatch({
      type: FETCH_LIABILITY_BEGIN,
    });
    axios.get(`${window.myConfig.apiUrl}/liability`)
      .then((response) => {
        dispatch({
          type: FETCH_LIABILITY_SUCCESS,
          payload: response.data.result,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: FETCH_LIABILITY_FAIL,
          payload: error,
        });
      });
  }
}
