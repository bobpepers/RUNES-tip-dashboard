import axios from '../axios';
import {
  FETCH_TIPS_BEGIN,
  FETCH_TIPS_SUCCESS,
  FETCH_TIPS_FAIL,
  FETCH_TIP_BEGIN,
  FETCH_TIP_SUCCESS,
  FETCH_TIP_FAIL,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function fetchTipsAction(
  id,
  address,
  offset,
  limit,
) {
  return function (dispatch) {
    dispatch({
      type: FETCH_TIPS_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/tips`, {
      id,
      address,
      offset,
      limit,
    })
      .then((response) => {
        dispatch({
          type: FETCH_TIPS_SUCCESS,
          payload: response.data,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: FETCH_TIPS_FAIL,
          payload: error,
        });
      });
  }
}

export function fetchTipAction(
  id,
) {
  return function (dispatch) {
    dispatch({
      type: FETCH_TIP_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/tip`, {
      id,
    }).then((response) => {
      dispatch({
        type: FETCH_TIP_SUCCESS,
        payload: response.data,
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
      dispatch({
        type: FETCH_TIP_FAIL,
        payload: error,
      });
    });
  }
}
