import axios from '../axios';
import {
  FETCH_RAINS_BEGIN,
  FETCH_RAINS_SUCCESS,
  FETCH_RAINS_FAIL,
  FETCH_RAIN_BEGIN,
  FETCH_RAIN_SUCCESS,
  FETCH_RAIN_FAIL,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function fetchRainsAction(
  id,
  address,
  offset,
  limit,
) {
  return function (dispatch) {
    dispatch({
      type: FETCH_RAINS_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/rains`, {
      id,
      address,
      offset,
      limit,
    })
      .then((response) => {
        dispatch({
          type: FETCH_RAINS_SUCCESS,
          payload: response.data,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: FETCH_RAINS_FAIL,
          payload: error,
        });
      });
  }
}

export function fetchRainAction(
  id,
) {
  return function (dispatch) {
    dispatch({
      type: FETCH_RAIN_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/rain`, {
      id,
    }).then((response) => {
      dispatch({
        type: FETCH_RAIN_SUCCESS,
        payload: response.data,
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
      dispatch({
        type: FETCH_RAIN_FAIL,
        payload: error,
      });
    });
  }
}
