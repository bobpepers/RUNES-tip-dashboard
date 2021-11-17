import axios from 'axios';
import history from '../history';
import {
  ENABLE_2FA_IDLE,
  ENABLE_2FA_BEGIN,
  ENABLE_2FA_SUCCESS,
  ENABLE_2FA_FAIL,
  DISABLE_2FA_IDLE,
  DISABLE_2FA_BEGIN,
  DISABLE_2FA_SUCCESS,
  DISABLE_2FA_FAIL,
  FETCH_USER_SUCCESS,
  CHANGE_USER_TFA_STATE,
  AUTH_USER_TFA,
} from './types/index';

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
    axios.post(`${process.env.API_URL}/2fa/enable`, obj)
      .then((response) => {
        console.log('actions/enable tfa action Success');
        console.log(response);
        dispatch({
          type: ENABLE_2FA_SUCCESS,
          payload: response.data,
        });
        dispatch({
          type: CHANGE_USER_TFA_STATE,
          payload: response.data,
        });
      }).catch((error) => {
        console.log('actions/enable tfa action error');
        console.log(error);
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
    console.log('enbale2fa actions/tfa.js');
    axios.post(`${process.env.API_URL}/2fa/disable`, obj)
      .then((response) => {
        console.log('actions/disable tfa action Success');
        console.log(response);
        dispatch({
          type: DISABLE_2FA_SUCCESS,
          payload: response.data,
        });
        dispatch({
          type: CHANGE_USER_TFA_STATE,
          payload: response.data,
        });
      }).catch((error) => {
        console.log('actions/disable tfa action error');
        console.log(error);
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

export function unlocktfa(props) {
  const { tfa } = props;
  console.log(tfa);
  console.log(props);

  return function (dispatch) {
    axios.post(`${process.env.API_URL}/2fa/unlock`,
      { tfa })
      .then((response) => {
        console.log(response);
        console.log('unlocktfa response');
        dispatch({
          type: AUTH_USER_TFA,
          payload: response,
        });
        // history.push('/dashboard');
        window.location.href = '/advertisements';
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
