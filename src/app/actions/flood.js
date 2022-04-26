import axios from '../axios';
import {
  FETCH_FLOODS_BEGIN,
  FETCH_FLOODS_SUCCESS,
  FETCH_FLOODS_FAIL,
  FETCH_FLOOD_BEGIN,
  FETCH_FLOOD_SUCCESS,
  FETCH_FLOOD_FAIL,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function fetchFloodsAction(
  id,
  address,
  offset,
  limit,
) {
  return function (dispatch) {
    dispatch({
      type: FETCH_FLOODS_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/floods`, {
      id,
      address,
      offset,
      limit,
    })
      .then((response) => {
        dispatch({
          type: FETCH_FLOODS_SUCCESS,
          payload: response.data,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: FETCH_FLOODS_FAIL,
          payload: error,
        });
      });
  }
}

export function fetchFloodAction(
  id,
) {
  return function (dispatch) {
    dispatch({
      type: FETCH_FLOOD_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/flood`, {
      id,
    }).then((response) => {
      dispatch({
        type: FETCH_FLOOD_SUCCESS,
        payload: response.data,
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
      dispatch({
        type: FETCH_FLOOD_FAIL,
        payload: error,
      });
    });
  }
}
