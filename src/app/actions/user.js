import axios from '../axios';
import {
  FETCH_USER_BEGIN,
  FETCH_USER_FAIL,
  FETCH_USER_SUCCESS,
} from './types/index';

/**
 * Fetch User Data
 */
export function fetchUserData() {
  return function (dispatch) {
    dispatch({
      type: FETCH_USER_BEGIN,
    });
    axios.get(`${window.myConfig.apiUrl}/user`)
      .then((response) => {
        dispatch({
          type: FETCH_USER_SUCCESS,
          payload: response.data,
        });
      }).catch((error) => {
        dispatch({
          type: FETCH_USER_FAIL,
          payload: error,
        });
      });
  }
}
