import axios from '../axios';
import {
  FETCH_SOAKS_BEGIN,
  FETCH_SOAKS_SUCCESS,
  FETCH_SOAKS_FAIL,
  FETCH_SOAK_BEGIN,
  FETCH_SOAK_SUCCESS,
  FETCH_SOAK_FAIL,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function fetchSoaksAction(
  offset,
  limit,
) {
  return function (dispatch) {
    dispatch({
      type: FETCH_SOAKS_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/soaks`, {
      offset,
      limit,
    })
      .then((response) => {
        dispatch({
          type: FETCH_SOAKS_SUCCESS,
          payload: response.data,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: FETCH_SOAKS_FAIL,
          payload: error,
        });
      });
  }
}

export function fetchSoakAction(
  id,
) {
  return function (dispatch) {
    dispatch({
      type: FETCH_SOAK_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/soak`, {
      id,
    }).then((response) => {
      dispatch({
        type: FETCH_SOAK_SUCCESS,
        payload: response.data,
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
      dispatch({
        type: FETCH_SOAK_FAIL,
        payload: error,
      });
    });
  }
}
