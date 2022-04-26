import axios from '../axios';
import {
  FETCH_SLEETS_BEGIN,
  FETCH_SLEETS_SUCCESS,
  FETCH_SLEETS_FAIL,
  FETCH_SLEET_BEGIN,
  FETCH_SLEET_SUCCESS,
  FETCH_SLEET_FAIL,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function fetchSleetsAction(
  id,
  address,
  offset,
  limit,
) {
  return function (dispatch) {
    dispatch({
      type: FETCH_SLEETS_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/rains`, {
      id,
      address,
      offset,
      limit,
    })
      .then((response) => {
        dispatch({
          type: FETCH_SLEETS_SUCCESS,
          payload: response.data,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: FETCH_SLEETS_FAIL,
          payload: error,
        });
      });
  }
}

export function fetchSleetAction(
  id,
) {
  return function (dispatch) {
    dispatch({
      type: FETCH_SLEET_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/rain`, {
      id,
    }).then((response) => {
      dispatch({
        type: FETCH_SLEET_SUCCESS,
        payload: response.data,
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
      dispatch({
        type: FETCH_SLEET_FAIL,
        payload: error,
      });
    });
  }
}
