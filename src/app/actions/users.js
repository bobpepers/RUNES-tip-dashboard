import axios from '../axios';
import {
  FETCH_USERS_BEGIN,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAIL,
  UPDATE_USER,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function fetchUsersAction(
  id,
  userId,
  username,
  platform,
  banned,
  offset,
  limit,
) {
  return function (dispatch) {
    dispatch({
      type: FETCH_USERS_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/management/users`, {
      id,
      userId,
      username,
      platform,
      banned,
      offset,
      limit,
    }).then((response) => {
      dispatch({
        type: FETCH_USERS_SUCCESS,
        payload: response.data,
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
      dispatch({
        type: FETCH_USERS_FAIL,
        payload: error,
      });
    });
  }
}

export function banUserAction(
  id,
  banMessage = '',
) {
  return function (dispatch) {
    axios.post(`${window.myConfig.apiUrl}/management/user/ban`, {
      id,
      banMessage,
    }).then((response) => {
      dispatch({
        type: UPDATE_USER,
        payload: response.data.result,
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
    });
  }
}
