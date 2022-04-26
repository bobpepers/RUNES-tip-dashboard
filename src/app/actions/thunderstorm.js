import axios from '../axios';
import {
  FETCH_THUNDERSTORMS_BEGIN,
  FETCH_THUNDERSTORMS_SUCCESS,
  FETCH_THUNDERSTORMS_FAIL,
  FETCH_THUNDERSTORM_BEGIN,
  FETCH_THUNDERSTORM_SUCCESS,
  FETCH_THUNDERSTORM_FAIL,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function fetchThunderstormsAction(
  id,
  address,
  offset,
  limit,
) {
  return function (dispatch) {
    dispatch({
      type: FETCH_THUNDERSTORMS_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/thunderstorms`, {
      id,
      address,
      offset,
      limit,
    })
      .then((response) => {
        dispatch({
          type: FETCH_THUNDERSTORMS_SUCCESS,
          payload: response.data,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: FETCH_THUNDERSTORMS_FAIL,
          payload: error,
        });
      });
  }
}

export function fetchThunderstormAction(
  id,
) {
  return function (dispatch) {
    dispatch({
      type: FETCH_THUNDERSTORM_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/thunderstorm`, {
      id,
    }).then((response) => {
      dispatch({
        type: FETCH_THUNDERSTORM_SUCCESS,
        payload: response.data,
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
      dispatch({
        type: FETCH_THUNDERSTORM_FAIL,
        payload: error,
      });
    });
  }
}
