import axios from '../axios';
import {
  FETCH_DP_BEGIN,
  FETCH_DP_SUCCESS,
  FETCH_DP_FAIL,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function fetchDpAction(
  offset,
  limit,
) {
  return function (dispatch) {
    dispatch({
      type: FETCH_DP_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/coin/dp`, {
      offset,
      limit,
    }).then((response) => {
      console.log(response);
      dispatch({
        type: FETCH_DP_SUCCESS,
        payload: response.data,
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
      dispatch({
        type: FETCH_DP_FAIL,
        payload: error,
      });
    });
  }
}
