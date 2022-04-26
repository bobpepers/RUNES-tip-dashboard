import axios from '../axios';
import {
  FETCH_THUNDERS_BEGIN,
  FETCH_THUNDERS_SUCCESS,
  FETCH_THUNDERS_FAIL,
  FETCH_THUNDER_BEGIN,
  FETCH_THUNDER_SUCCESS,
  FETCH_THUNDER_FAIL,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function fetchThundersAction(
  id,
  address,
  offset,
  limit,
) {
  return function (dispatch) {
    dispatch({
      type: FETCH_THUNDERS_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/thunders`, {
      id,
      address,
      offset,
      limit,
    })
      .then((response) => {
        dispatch({
          type: FETCH_THUNDERS_SUCCESS,
          payload: response.data,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: FETCH_THUNDERS_FAIL,
          payload: error,
        });
      });
  }
}

export function fetchThunderAction(
  id,
) {
  return function (dispatch) {
    dispatch({
      type: FETCH_THUNDER_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/thunder`, {
      id,
    }).then((response) => {
      dispatch({
        type: FETCH_THUNDER_SUCCESS,
        payload: response.data,
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
      dispatch({
        type: FETCH_THUNDER_FAIL,
        payload: error,
      });
    });
  }
}
