import axios from '../axios';
import {
  FETCH_USER_BEGIN,
  FETCH_USER_FAIL,
  FETCH_USER_SUCCESS,
} from './types/index';

/**
 * Fetch User Data
 */
export function fetchUserData(
  id,
) {
  return function (dispatch) {
    dispatch({
      type: FETCH_USER_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/user`, {
      id,
    }).then((response) => {
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
