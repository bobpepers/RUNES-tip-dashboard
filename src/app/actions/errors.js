import axios from '../axios';
import {
  FETCH_ERRORS_BEGIN,
  FETCH_ERRORS_SUCCESS,
  FETCH_ERRORS_FAIL,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function fetchErrorsAction() {
  return function (dispatch) {
    dispatch({
      type: FETCH_ERRORS_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/errors`)
      .then((response) => {
        dispatch({
          type: FETCH_ERRORS_SUCCESS,
          payload: response.data.errors,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: FETCH_ERRORS_FAIL,
          payload: error,
        });
      });
  }
}
