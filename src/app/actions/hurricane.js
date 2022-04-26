import axios from '../axios';
import {
  FETCH_HURRICANES_BEGIN,
  FETCH_HURRICANES_SUCCESS,
  FETCH_HURRICANES_FAIL,
  FETCH_HURRICANE_BEGIN,
  FETCH_HURRICANE_SUCCESS,
  FETCH_HURRICANE_FAIL,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function fetchHurricanesAction(
  id,
  address,
  offset,
  limit,
) {
  return function (dispatch) {
    dispatch({
      type: FETCH_HURRICANES_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/hurricanes`, {
      id,
      address,
      offset,
      limit,
    })
      .then((response) => {
        dispatch({
          type: FETCH_HURRICANES_SUCCESS,
          payload: response.data,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: FETCH_HURRICANES_FAIL,
          payload: error,
        });
      });
  }
}

export function fetchHurricaneAction(
  id,
) {
  return function (dispatch) {
    dispatch({
      type: FETCH_HURRICANE_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/hurricane`, {
      id,
    }).then((response) => {
      dispatch({
        type: FETCH_HURRICANE_SUCCESS,
        payload: response.data,
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
      dispatch({
        type: FETCH_HURRICANE_FAIL,
        payload: error,
      });
    });
  }
}
