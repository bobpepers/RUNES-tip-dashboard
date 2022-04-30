import axios from '../axios';
import {
  ENABLE_2FA_IDLE,
  ENABLE_2FA_BEGIN,
  ENABLE_2FA_SUCCESS,
  ENABLE_2FA_FAIL,
  DISABLE_2FA_IDLE,
  DISABLE_2FA_BEGIN,
  DISABLE_2FA_SUCCESS,
  DISABLE_2FA_FAIL,
  CHANGE_USER_TFA_STATE,
  AUTH_USER_TFA,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function idleDisabletfa() {
  return function (dispatch) {
    dispatch({
      type: DISABLE_2FA_IDLE,
      payload: {
        data: 0,
        isFetching: false,
        phase: 0,
        error: null,
      },
    });
  }
}

export function idleEnabletfa() {
  return function (dispatch) {
    dispatch({
      type: ENABLE_2FA_IDLE,
      payload: {
        data: 0,
        isFetching: false,
        phase: 0,
        error: null,
      },
    });
  }
}

export function enabletfa(obj) {
  return function (dispatch) {
    dispatch({
      type: ENABLE_2FA_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/2fa/enable`, obj)
      .then((response) => {
        dispatch({
          type: ENABLE_2FA_SUCCESS,
          payload: response.data.result,
        });
        dispatch({
          type: CHANGE_USER_TFA_STATE,
          payload: response.data.result,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: ENABLE_2FA_FAIL,
          payload: error,
        });
      });
  }
}

export function disabletfa(obj) {
  return function (dispatch) {
    dispatch({
      type: DISABLE_2FA_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/2fa/disable`, obj)
      .then((response) => {
        dispatch({
          type: DISABLE_2FA_SUCCESS,
          payload: response.data.result,
        });
        dispatch({
          type: CHANGE_USER_TFA_STATE,
          payload: response.data.result,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: DISABLE_2FA_FAIL,
          payload: error,
        });
      });
  }
}

/**
 * Unlock 2FA
 */

export function unlocktfa(
  props,
  navigate,
) {
  const { tfa } = props;
  return function (dispatch) {
    axios.post(
      `${window.myConfig.apiUrl}/2fa/unlock`,
      { tfa },
    )
      .then((response) => {
        dispatch({
          type: AUTH_USER_TFA,
          payload: response.data.result,
        });
        navigate('/');
        // window.location.href = '/';
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        console.log(error);
      });
  }
}
