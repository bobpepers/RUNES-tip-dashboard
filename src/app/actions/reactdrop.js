import axios from '../axios';
import {
  FETCH_REACTDROPS_BEGIN,
  FETCH_REACTDROPS_SUCCESS,
  FETCH_REACTDROPS_FAIL,
  FETCH_REACTDROP_BEGIN,
  FETCH_REACTDROP_SUCCESS,
  FETCH_REACTDROP_FAIL,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function fetchReactdropsAction(
  id,
  address,
  offset,
  limit,
) {
  return function (dispatch) {
    dispatch({
      type: FETCH_REACTDROPS_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/reactdrops`, {
      id,
      address,
      offset,
      limit,
    })
      .then((response) => {
        dispatch({
          type: FETCH_REACTDROPS_SUCCESS,
          payload: response.data,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: FETCH_REACTDROPS_FAIL,
          payload: error,
        });
      });
  }
}

export function fetchReactdropAction(
  id,
) {
  return function (dispatch) {
    dispatch({
      type: FETCH_REACTDROP_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/reactdrop`, {
      id,
    }).then((response) => {
      dispatch({
        type: FETCH_REACTDROP_SUCCESS,
        payload: response.data,
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
      dispatch({
        type: FETCH_REACTDROP_FAIL,
        payload: error,
      });
    });
  }
}
