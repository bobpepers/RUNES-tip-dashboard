import axios from '../axios';
import {
  FETCH_ERRORS_BEGIN,
  FETCH_ERRORS_SUCCESS,
  FETCH_ERRORS_FAIL,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function fetchErrorsAction(
  offset,
  limit,
) {
  return function (dispatch) {
    dispatch({
      type: FETCH_ERRORS_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/functions/errors`, {
      offset,
      limit,
    }).then((response) => {
      dispatch({
        type: FETCH_ERRORS_SUCCESS,
        payload: response.data,
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
